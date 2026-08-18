@echo off
REM 启动 WebCross 开发服务器（Windows 原生，避免 WSL 进程残留）
REM 改代码后浏览器自动刷新；要看正式构建版本请用 start-server.bat
chcp 65001 >nul
cd /d "C:\Users\69537\Desktop\abcp-website"
echo ============================================
echo  WebCross Dev Server (hot reload)
echo  http://localhost:3000/zh
echo  Keep this window open. Ctrl+C to stop.
echo ============================================
if exist "node_modules\next\dist\bin\next" (
  node node_modules\next\dist\bin\next dev -p 3000
) else (
  echo node_modules\next not found, please run install.bat first
  pause
)
