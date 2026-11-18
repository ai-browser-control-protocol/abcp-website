@echo off
rem 双击这个文件即可启动「文案修改器」。
rem 它会打开一个本地网页：可以改文案、改字号，保存后直接写回源码。
setlocal
cd /d "%~dp0..\.."
where node >nul 2>nul
if errorlevel 1 (
  echo [x] 没有找到 Node.js，请先安装 Node 20+
  pause
  exit /b 1
)
title WebCross 文案修改器
node tools\copy-editor\server.mjs --open
echo.
echo [copy-editor] 已退出。
pause
