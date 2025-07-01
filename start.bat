@echo off
SETLOCAL

:: Step 1: Go to Angular client folder
cd /d "C:\Projects\apartment-expense-tracker\client" || (
  echo Failed to access Angular folder.
  pause
  exit /b
)

:: Step 2: Build Angular
echo Building Angular app...
call ng build --configuration production || (
  echo Angular build failed.
  pause
  exit /b
)

:: Step 3: Wait 10 seconds
echo Waiting 10 seconds...
timeout /t 10 /nobreak > nul

:: Step 4: Go to NestJS server folder
cd /d "C:\Projects\apartment-expense-tracker\server" || (
  echo Failed to access NestJS folder.
  pause
  exit /b
)

:: Step 5: Run NestJS server
echo Starting NestJS server...
call npm run start:dev

:: Keep window open
pause
