# ====================================================================
# HOPEHUB Secure Database Setup Script
# Creates the dedicated database and application user on MySQL 8.
# Generates backend/.env with secure random secrets.
# ====================================================================

param (
    [string]$DbName = "hopehub_db",
    [string]$DbUser = "hopehub_user",
    [int]$DbPort = 3306
)

$ErrorActionPreference = "Stop"

# Prevent native command stderr warnings from automatically becoming
# terminating PowerShell errors on supported PowerShell versions.
if (Get-Variable -Name PSNativeCommandUseErrorActionPreference `
        -ErrorAction SilentlyContinue) {
    $PSNativeCommandUseErrorActionPreference = $false
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " HOPEHUB - Secure Database & User Initializer" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Database : $DbName"
Write-Host "App user : $DbUser"
Write-Host ""

# Locate mysql.exe
$mysqlPath = "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"

if (-not (Test-Path $mysqlPath)) {
    $cmd = Get-Command mysql -ErrorAction SilentlyContinue

    if ($cmd) {
        $mysqlPath = $cmd.Source
    }
    else {
        Write-Host "[ERROR] mysql.exe was not found." -ForegroundColor Red
        exit 1
    }
}

# Generate a secure random application password
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()

$bytes = New-Object byte[] 24
$rng.GetBytes($bytes)

$appPassword = [Convert]::ToBase64String($bytes).
    Replace('+', 'X').
    Replace('/', 'Y').
    Replace('=', 'Z')

# Generate a secure random JWT secret
$jwtBytes = New-Object byte[] 32
$rng.GetBytes($jwtBytes)

$jwtSecret = -join (
    $jwtBytes | ForEach-Object {
        "{0:x2}" -f $_
    }
)

$rng.Dispose()

# Request the MySQL root password
Write-Host "Enter your MySQL root password." -ForegroundColor Yellow

$secureRootPwd = Read-Host `
    -Prompt "MySQL root password" `
    -AsSecureString

$bstr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR(
    $secureRootPwd
)

$plainRootPwd = $null

try {
    $plainRootPwd = [System.Runtime.InteropServices.Marshal]::PtrToStringBSTR(
        $bstr
    )
}
finally {
    [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
}

# Create/configure only the HOPEHUB database and its application user.
# This script does not drop databases or delete tables.
$sqlSetup = @"
CREATE DATABASE IF NOT EXISTS $DbName
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS '$DbUser'@'localhost'
    IDENTIFIED BY '$appPassword';

ALTER USER '$DbUser'@'localhost'
    IDENTIFIED BY '$appPassword';

GRANT ALL PRIVILEGES ON $DbName.* TO '$DbUser'@'localhost';

FLUSH PRIVILEGES;
"@

$tempSql = [System.IO.Path]::GetTempFileName()

try {
    Set-Content -Path $tempSql -Value $sqlSetup -Encoding UTF8

    # Run the setup SQL as root.
    $previousMysqlPwd = $env:MYSQL_PWD

    try {
        $env:MYSQL_PWD = $plainRootPwd

        $setupOutput = & $mysqlPath `
            -u root `
            "--port=$DbPort" `
            -e "source $tempSql" 2>&1

        $setupExitCode = $LASTEXITCODE
    }
    finally {
        $env:MYSQL_PWD = $previousMysqlPwd
        $plainRootPwd = $null
    }

    if ($setupExitCode -ne 0) {
        Write-Host "[ERROR] Database setup failed." -ForegroundColor Red
        Write-Host ($setupOutput | Out-String)
        exit 1
    }

    # Verify the new application user's database connection.
    # MYSQL_PWD avoids putting the application password in the
    # mysql.exe command-line arguments.
    $previousMysqlPwd = $env:MYSQL_PWD
    $previousErrorActionPreference = $ErrorActionPreference

    try {
        $env:MYSQL_PWD = $appPassword
        $ErrorActionPreference = "Continue"

        $testOutput = & $mysqlPath `
            -u $DbUser `
            "--port=$DbPort" `
            -e "USE $DbName; SELECT 1;" 2>&1

        $verifyExitCode = $LASTEXITCODE
    }
    finally {
        $env:MYSQL_PWD = $previousMysqlPwd
        $ErrorActionPreference = $previousErrorActionPreference
    }

    if ($verifyExitCode -ne 0) {
        Write-Host "[ERROR] Application-user verification failed." -ForegroundColor Red
        Write-Host ($testOutput | Out-String)
        Write-Host "No .env file was generated." -ForegroundColor Yellow
        exit 1
    }

    # Generate backend/.env only after successful verification.
    $backendDir = Split-Path -Parent $MyInvocation.MyCommand.Path
    $envFile = Join-Path $backendDir ".env"

    $envContent = @"
# HOPEHUB Backend Environment Configuration (Generated)
SERVER_PORT=8080
DB_HOST=localhost
DB_PORT=$DbPort
DB_NAME=$DbName
DB_USERNAME=$DbUser
DB_PASSWORD=$appPassword
JPA_DDL_AUTO=validate
JPA_SHOW_SQL=false
FLYWAY_ENABLED=true
JWT_SECRET=$jwtSecret
JWT_EXPIRATION_MS=86400000
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
APP_SIMULATED_PAYMENTS=true
"@

    Set-Content -Path $envFile -Value $envContent -Encoding UTF8

    Write-Host ""
    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host " SUCCESS: HOPEHUB Database & User Configured!" -ForegroundColor Green
    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host "Database : $DbName"
    Write-Host "App user : $DbUser"
    Write-Host "Config   : $envFile"
    Write-Host ""
    Write-Host "IMPORTANT: Keep backend/.env private." -ForegroundColor Yellow
    Write-Host "The backend must load these environment variables before starting."
    Write-Host ""
}
catch {
    Write-Host "[ERROR] $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
finally {
    $plainRootPwd = $null

    if (Test-Path $tempSql) {
        Remove-Item -Path $tempSql -Force -ErrorAction SilentlyContinue
    }
}