@echo off
chcp 65001 >nul
cd /d "C:\Users\69537\Desktop\abcp-website"
echo ============================================
echo  Step 1/3: removing old node_modules
echo  (WSL-installed ones are invisible to Windows)
echo ============================================
if exist node_modules (
  rmdir /s /q node_modules
  echo removed
) else (
  echo no node_modules found
)
echo.
echo ============================================
echo  Step 2/3: clean install via pnpm
echo  (this writes node_modules to Windows disk)
echo ============================================
where pnpm >nul 2>nul
if errorlevel 1 (
  call npx -y pnpm@11.20.0 install
) else (
  call pnpm install
)
if errorlevel 1 (
  echo INSTALL FAILED
  pause
  exit /b 1
)
echo.
echo ============================================
echo  Step 3/3: verifying next module
echo ============================================
if exist "node_modules\next\dist\bin\next" (
  echo OK - next module is ready
) else (
  echo ERROR: next module still not found
  dir node_modules\next 2>nul
  pause
  exit /b 1
)
echo.
echo ============================================
echo  Install complete!
echo  Now run start-server.bat
echo ============================================
pause
