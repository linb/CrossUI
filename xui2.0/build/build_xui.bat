set relPath=..\
set compressTool=%relPath%tools/yuicompressor.jar
set outPath=runtime\
set miniPath=\xui.js

set allPath=\xui-all.js
set debugPath=\xui-debug.js

set rawPath=%relPath%API\App\js\xui-raw.js


mkdir %outPath%
mkdir %outPath%xui
mkdir %outPath%xui\js
mkdir %outPath%xui\js\UI
mkdir %outPath%xui\js\Module
mkdir %outPath%xui\Locale
mkdir %outPath%xui\appearance
mkdir %outPath%xui\iconfont


rem ==================
rem for xui source code
rem ==================
xcopy %relPath%xui\js\Module\*.* %outPath%xui\js\Module\ /E /Y

xcopy %relPath%xui\appearance\*.* %outPath%xui\appearance\ /E /Y
xcopy %relPath%xui\Locale\*.* %outPath%xui\Locale\ /E /Y
xcopy %relPath%xui\iconfont\*.* %outPath%xui\iconfont\ /E /Y

rem ==================
rem for mini xui code
rem ==================
copy %relPath%xui\js\xui.js /b ^
+ %relPath%xui\js\APICaller.js /b ^
+ %relPath%xui\js\DataBinder.js /b ^
+ %relPath%xui\js\Event.js /b ^
+ %relPath%xui\js\CSS.js /b ^
+ %relPath%xui\js\Dom.js /b  ^
+ %relPath%xui\js\Template.js /b ^
+ %relPath%xui\js\DragDrop.js /b ^
+ %relPath%xui\js\Cookies.js /b ^
+ %relPath%xui\js\History.js /b ^
+ %relPath%xui\js\Tips.js /b ^
xui.js

java -jar  -Xmn128m -Xms512m -Xmx1024m  %compressTool% -o  %outPath%xui\js%miniPath% xui.js
 
del /q xui.js


rem ==================
rem for all xui code
rem ==================
copy %relPath%xui\js\xui.js /b ^
+ %relPath%xui\js\APICaller.js /b ^
+ %relPath%xui\js\DataBinder.js /b ^
+ %relPath%xui\Locale\en.js /b ^
+ %relPath%xui\js\Event.js /b  ^
+ %relPath%xui\js\Date.js /b ^
+ %relPath%xui\js\CSS.js /b ^
+ %relPath%xui\js\Dom.js /b ^
+ %relPath%xui\js\Template.js /b  ^
+ %relPath%xui\js\Module.js /b ^
+ %relPath%xui\js\Cookies.js /b ^
+ %relPath%xui\js\MessageService.js /b ^
+ %relPath%xui\js\XML.js /b ^
+ %relPath%xui\js\XMLRPC.js /b ^
+ %relPath%xui\js\SOAP.js /b ^
+ %relPath%xui\js\DragDrop.js /b ^
+ %relPath%xui\js\Tips.js /b ^
+ %relPath%xui\js\History.js /b ^
+ %relPath%xui\js\ModuleFactory.js /b  ^
+ %relPath%xui\js\Debugger.js /b ^
+ %relPath%xui\js\UI.js /b ^
+ %relPath%xui\js\UI\Image.js /b ^
+ %relPath%xui\js\UI\Flash.js /b ^
+ %relPath%xui\js\UI\Audio.js /b ^
+ %relPath%xui\js\UI\Video.js /b ^
+ %relPath%xui\js\UI\Resizer.js /b  ^
+ %relPath%xui\js\UI\Block.js /b ^
+ %relPath%xui\js\UI\Label.js /b ^
+ %relPath%xui\js\UI\ProgressBar.js /b ^
+ %relPath%xui\js\UI\CheckBox.js /b ^
+ %relPath%xui\js\UI\Slider.js /b ^
+ %relPath%xui\js\UI\Input.js /b ^
+ %relPath%xui\js\UI\HiddenInput.js /b ^
+ %relPath%xui\js\UI\RichEditor.js /b ^
+ %relPath%xui\js\UI\ComboInput.js /b ^
+ %relPath%xui\js\UI\Group.js /b  ^
+ %relPath%xui\js\UI\ColorPicker.js /b ^
+ %relPath%xui\js\UI\DatePicker.js /b ^
+ %relPath%xui\js\UI\TimePicker.js /b ^
+ %relPath%xui\js\UI\List.js /b ^
+ %relPath%xui\js\UI\Gallery.js /b ^
+ %relPath%xui\js\UI\Panel.js /b ^
+ %relPath%xui\js\UI\PageBar.js /b ^
+ %relPath%xui\js\UI\Tabs.js /b ^
+ %relPath%xui\js\UI\Stacks.js /b ^
+ %relPath%xui\js\UI\ButtonViews.js /b  ^
+ %relPath%xui\js\UI\RadioBox.js /b ^
+ %relPath%xui\js\UI\StatusButtons.js /b ^
+ %relPath%xui\js\UI\TreeBar.js /b ^
+ %relPath%xui\js\UI\TreeView.js /b ^
+ %relPath%xui\js\UI\PopMenu.js /b ^
+ %relPath%xui\js\UI\MenuBar.js /b ^
+ %relPath%xui\js\UI\ToolBar.js /b ^
+ %relPath%xui\js\UI\Layout.js /b  ^
+ %relPath%xui\js\UI\TreeGrid.js /b ^
+ %relPath%xui\js\UI\Dialog.js /b ^
+ %relPath%xui\js\UI\TextEditor.js /b ^
+ %relPath%xui\js\UI\FoldingList.js /b ^
+ %relPath%xui\js\UI\FoldingTabs.js /b ^
+ %relPath%xui\js\ThirdParty\raphael.js /b ^
+ %relPath%xui\js\svg.js /b ^
+ %relPath%xui\js\UI\SVGPaper.js /b ^
xui.js

java -jar  -Xmn128m -Xms512m -Xmx1024m  %compressTool% -o  %outPath%xui\js%allPath% xui.js  --charset utf-8
java -jar  -Xmn128m -Xms512m -Xmx1024m   %compressTool% -o  %rawPath%   --nomunge  xui.js  --charset utf-8
copy xui.js  %outPath%xui\js%debugPath%

rem ==================
rem for extra classes
rem ==================
rem -----------------------
rem for FusionChartsXT.js
rem -----------------------
copy %relPath%xui\js\UI\FusionChartsXT.js /b ^
+ %relPath%xui\js\ThirdParty\fusioncharts.js /b ^
+ %relPath%xui\js\ThirdParty\fusioncharts.charts.js /b ^
+ %relPath%xui\js\ThirdParty\fusioncharts.widgets.js /b ^
+ %relPath%xui\js\ThirdParty\fusioncharts.powercharts.js /b ^
+ %relPath%xui\js\ThirdParty\themes\fusioncharts.theme.carbon.js /b ^
+ %relPath%xui\js\ThirdParty\themes\fusioncharts.theme.fint.js /b ^
+ %relPath%xui\js\ThirdParty\themes\fusioncharts.theme.ocean.js /b ^
+ %relPath%xui\js\ThirdParty\themes\fusioncharts.theme.zune.js /b ^
FusionChartsXT.js

copy FusionChartsXT.js  %outPath%xui\js\UI\FusionChartsXT.js

rem -----------------------
rem for Coder.js
rem -----------------------
copy %relPath%xui\js\Coder.js  %outPath%xui\js\Coder.js

rem =======================
rem copy to other dir
rem =======================

set oPath=..\

rd %oPath%%outPath%xui /S /Q
rem mkdir %oPath%%outPath%

xcopy %outPath%*.* %oPath%%outPath% /E /Y

rd %outPath% /S /Q

del /q xui.js
del /q FusionChartsXT.js

if %errorlevel% == 0 goto done
pause
:done