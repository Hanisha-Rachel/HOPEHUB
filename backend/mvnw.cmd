@echo off
set DIR=%~dp0
call "%DIR%.mvn\apache-maven-3.9.9\bin\mvn.cmd" %*
