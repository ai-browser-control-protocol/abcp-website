@echo off
chcp 65001 >nul
cd /d "C:\Users\69537\Desktop\abcp-website"
echo ============================================
echo  WebCross Production Server
echo  http://localhost:3500/zh
echo  Keep this window open. Ctrl+C to stop.
echo ============================================
if exist "node_modules\next\dist\bin\next" (
  node node_modules\next\dist\bin\next start -p 3500
) else (
  echo node_modules\next not found, please run install.bat first
  pause
)
