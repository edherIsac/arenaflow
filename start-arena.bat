@echo off
cls
echo ===================================
echo    ArenaFlow - NestJS Launcher
echo ===================================
echo.

:: Verificar si MongoDB está corriendo
echo Verificando MongoDB...
netstat -an | findstr /C:":27017" >nul
if errorlevel 1 (
    echo [ADVERTENCIA] MongoDB no parece estar ejecutandose en el puerto 27017
    echo Asegurate de iniciar MongoDB antes de continuar
    echo.
    pause
)

:: Cambiar al directorio del backend
cd /d "%~dp0backend"

:: Mostrar información
echo Iniciando ArenaFlow en modo desarrollo...
echo - API: http://localhost:3000/api/v1
echo - Swagger Docs: http://localhost:3000/api
echo.
echo Presiona Ctrl+C para detener el servidor
echo.

:: Iniciar la aplicación
npm run start:dev

:: En caso de error
if errorlevel 1 (
    echo.
    echo [ERROR] Hubo un problema al iniciar la aplicación
    echo Verifica que:
    echo 1. Todas las dependencias estén instaladas (npm install)
    echo 2. El archivo .env esté configurado correctamente
    echo 3. MongoDB esté corriendo
    pause
)
