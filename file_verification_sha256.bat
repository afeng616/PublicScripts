@REM 通过比对两文件的sha256值，判断文件是否一致
@echo off
@setlocal EnableDelayedExpansion

if "%1"=="" (echo usage: file_verification_sha256.bat [file1] [file2] & exit /b 1)
if "%2"=="" (echo usage: file_verification_sha256.bat [file1] [file2] & exit /b 1)


set counter=0

for /F %%i in ('7z h -scrcsha256 %1 %2') ^
do (
    set /a counter+=1
    if !counter!==6 set former=%%i
    if !counter!==7 set latter=%%i
)

echo verification...
echo file: %1 %2
echo sha256: %former% %latter%
if %former%==%latter% (echo status: OK) else (echo status: NG)
