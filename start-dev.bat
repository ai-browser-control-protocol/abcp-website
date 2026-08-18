@echo off
REM 启动 WebCross 开发服务器（Windows 原生，避免 WSL 进程残留）
chcp 65001 >nul
cd /d "C:\Users\69537\Desktop\abcp-website"
echo ============================================
echo  WebCross Dev Server
echo  http://localhost:3000/zh
echo  Ctrl+C to stop
echo ============================================
call npx -y pnpm@11.20.0 start
