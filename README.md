# HOPEHUB — Intelligent Online Charity Management System

> **A modern, transparent, full-stack charity platform connecting Donors, NGOs, Beneficiaries, and Volunteers.**

---

## 🌟 Overview & Key Architecture

HOPEHUB unites the entire charitable ecosystem under a secure, role-based platform with radical transparency, simulated demo payment guarantees, and strict confidentiality protections for beneficiaries.

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide Icons, Recharts (`http://localhost:5173`)
- **Backend**: Java Spring Boot 3.4.3 (Java 25 compatible, Maven Wrapper `mvnw.cmd`) (`http://localhost:8080/api`)
- **Database**: Dedicated MySQL 8 database (`hopehub_db`) managed with Flyway migrations
- **Security**: Spring Security 6 stateless JWT authentication, BCrypt password hashing, and Role-Based Access Control (RBAC)

---

## 👥 Supported Roles & Demonstration Credentials

All pre-seeded demo accounts share the password: `password123`

| Role | Demo Email | Password | Access & Responsibilities |
| :--- | :--- | :--- | :--- |
| **ADMIN** | `admin@hopehub.org` | `password123` | Platform oversight, NGO verification, campaign moderation, audit ledgers |
| **NGO** | `ngo@hopehub.org` | `password123` | Campaign creation, donation tracking, volunteer opportunity drives |
| **DONOR** | `donor@hopehub.org` | `password123` | Campaign browsing, simulated contributions, official PDF receipt retrieval |
| **VOLUNTEER** | `volunteer@hopehub.org` | `password123` | Browsing initiatives, applying for volunteer slots, hour tracking |
| **BENEFICIARY** | `beneficiary@hopehub.org` | `password123` | Submitting confidential assistance requests, tracking review status |

> [!IMPORTANT]
> **DEMO MODE NOTICE**: HOPEHUB operates with simulated donations only (`DEMO MODE — No real money has been transferred`). No credit card numbers, CVVs, or bank secrets are ever requested, processed, or stored.

---

## 🚀 Quick Start Guide

### Step 1: Database Setup (One-Time)

To ensure maximum security, credentials are never written in source code. Run the automated setup script in your local PowerShell terminal. It will prompt for your MySQL `root` password privately (input is masked, never logged or stored):

```powershell
cd C:\Users\HANISHA\Desktop\HOPEHUB\backend
.\setup-db.ps1
```

This script safely performs:
1. Creates dedicated `hopehub_db` (never modifies or resets other databases).
2. Creates dedicated application user `hopehub_user` with access restricted to `hopehub_db.*`.
3. Generates a cryptographically strong 256-bit JWT secret.
4. Generates `backend/.env` with these configurations (git-ignored).

---

### Step 2: Start Spring Boot Backend

Using the included Maven Wrapper:

```powershell
cd C:\Users\HANISHA\Desktop\HOPEHUB\backend
.\mvnw.cmd spring-boot:run
```

Or run the pre-built standalone JAR directly:

```powershell
cd C:\Users\HANISHA\Desktop\HOPEHUB\backend
java -jar target/backend-1.0.0-SNAPSHOT.jar
```

The backend starts at `http://localhost:8080/api`.
- Health check: `http://localhost:8080/api/health`
- Platform stats: `http://localhost:8080/api/stats/overview`

---

### Step 3: Start React Frontend

In a separate terminal:

```powershell
cd C:\Users\HANISHA\Desktop\HOPEHUB
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 📡 API Reference Overview

All backend endpoints are prefixed with `/api`.

### 1. Authentication & Profile (`/api/auth`)
- `POST /api/auth/register` — Register new user (self-registration as ADMIN is strictly prohibited)
- `POST /api/auth/login` — Authenticate and receive stateless JWT token
- `GET /api/auth/me` — Retrieve current authenticated user profile
- `PUT /api/auth/profile` — Update bio, contact details, and avatar
- `PUT /api/auth/change-password` — Change password securely

### 2. Campaigns & Initiatives (`/api/campaigns`)
- `GET /api/campaigns` — Public list of all active verified campaigns
- `GET /api/campaigns/featured` — Featured high-priority campaigns
- `GET /api/campaigns/{id}` — Campaign details and live progress
- `GET /api/campaigns/search?q={query}` — Search campaigns by title/description/location
- `POST /api/campaigns` — Create new campaign (Verified NGO role required)
- `GET /api/campaigns/my-campaigns` — Campaigns belonging to authenticated NGO

### 3. Simulated Donations & Receipts (`/api/donations`)
- `POST /api/donations` — Process simulated donation, atomically credit campaign, issue receipt
- `GET /api/donations/receipt/{receiptNumber}` — Public receipt verification
- `GET /api/donations/my-donations` — Donor contribution history

### 4. Confidential Beneficiary Requests (`/api/beneficiaries`)
- `POST /api/beneficiaries/requests` — Submit confidential assistance request
- `GET /api/beneficiaries/my-requests` — View own private requests
- `GET /api/beneficiaries/requests/{id}` — Private access restricted to owner or ADMIN

### 5. Volunteer Drives & Applications (`/api/volunteers`)
- `GET /api/volunteers/opportunities` — Public listing of open volunteer drives
- `POST /api/volunteers/apply/{oppId}` — Submit application (prevents duplicates)
- `GET /api/volunteers/my-applications` — Volunteer's active applications
- `PUT /api/volunteers/applications/{id}/status` — NGO / Admin application review & hour logging

### 6. In-Kind Material Philanthropy (`/api/resources`)
- `POST /api/resources` — Schedule doorstep collection for books, food, blankets, or medicine
- `GET /api/resources/my-resources` — Track pledge status

### 7. Governance & Administration (`/api/admin`)
- `GET /api/admin/stats` — Executive aggregated KPIs and platform metrics
- `GET /api/admin/users` & `PUT /api/admin/users/{id}/status` — User moderation
- `GET /api/admin/ngos` & `PUT /api/admin/ngos/{id}/verify` — NGO verification queue
- `GET /api/admin/campaigns` & `PUT /api/admin/campaigns/{id}/status` — Campaign moderation
- `GET /api/admin/requests` & `PUT /api/admin/requests/{id}/status` — Beneficiary review
- `GET /api/admin/audit-logs` — Immutable audit trail of administrative actions

---

## 🧪 Testing & Verification

### Running Backend Unit & Security Tests

```powershell
cd C:\Users\HANISHA\Desktop\HOPEHUB\backend
.\mvnw.cmd test
```

**Test Coverage**:
- `HopeHubSecurityTests`: BCrypt hashing verification, JWT token lifecycle, token tampering rejection, and admin self-registration blockage.
- `DonationServiceTests`: Simulated donation calculation, atomic campaign updates, and demo disclaimer enforcement.
- `BeneficiaryPrivacyTests`: Confidentiality safeguards preventing unauthorized users from accessing private beneficiary records.

### Building Frontend Production Bundle

```powershell
cd C:\Users\HANISHA\Desktop\HOPEHUB
npm run build
```

---

## 🔒 Security Commitments

1. **Least-Privilege Database User**: Dedicated `hopehub_user` used exclusively for `hopehub_db`. Root account is never used for runtime database queries.
2. **Zero Plaintext Secrets**: Passwords, DB credentials, and JWT keys are strictly externalized in `.env` (git-ignored).
3. **Privacy First**: Beneficiary assistance requests are inaccessible through public endpoints.
4. **Demonstration Integrity**: All financial simulations are explicitly labeled with `"DEMO MODE — No real money has been transferred."`
