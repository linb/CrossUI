set relPath=..\
set compressTool=%relPath%tools/yuicompressor.jar
set compressTool2=%relPath%tools/closure-compiler.jar
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
copy %relPath%xui\js\_begin.js /b ^
+ %relPath%xui\js\xui.js /b ^
+ %relPath%xui\js\APICaller.js /b ^
+ %relPath%xui\js\MQTT.js /b ^
+ %relPath%xui\js\DataBinder.js /b ^
+ %relPath%xui\js\Event.js /b ^
+ %relPath%xui\js\CSS.js /b ^
+ %relPath%xui\js\Dom.js /b  ^
+ %relPath%xui\js\Template.js /b ^
+ %relPath%xui\js\DragDrop.js /b ^
+ %relPath%xui\js\Cookies.js /b ^
+ %relPath%xui\js\History.js /b ^
+ %relPath%xui\js\Tips.js /b ^
+ %relPath%xui\js\_end.js /b ^
xui.js

java -jar %compressTool2% --js xui.js --js_output_file %outPath%xui\js%miniPath% --compilation_level WHITESPACE_ONLY --strict_mode_input false

del /q xui.js

rem ==================
rem for all xui code
rem ==================
copy %relPath%xui\js\_begin.js /b ^
+ %relPath%xui\js\xui.js /b ^
+ %relPath%xui\js\APICaller.js /b ^
+ %relPath%xui\js\MQTT.js /b ^
+ %relPath%xui\js\DataBinder.js /b ^
+ %relPath%xui\Locale\en.js /b ^
+ %relPath%xui\js\Event.js /b  ^
+ %relPath%xui\js\Date.js /b ^
+ %relPath%xui\js\CSS.js /b ^
+ %relPath%xui\js\Dom.js /b ^
+ %relPath%xui\js\Template.js /b  ^
+ %relPath%xui\js\Module.js /b ^
+ %relPath%xui\js\Cookies.js /b ^
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
+ %relPath%xui\js\UI\Slider.js /b ^
+ %relPath%xui\js\UI\Input.js /b ^
+ %relPath%xui\js\UI\CheckBox.js /b ^
+ %relPath%xui\js\UI\HiddenInput.js /b ^
+ %relPath%xui\js\UI\RichEditor.js /b ^
+ %relPath%xui\js\UI\ComboInput.js /b ^
+ %relPath%xui\js\UI\ColorPicker.js /b ^
+ %relPath%xui\js\UI\DatePicker.js /b ^
+ %relPath%xui\js\UI\TimePicker.js /b ^
+ %relPath%xui\js\UI\List.js /b ^
+ %relPath%xui\js\UI\Gallery.js /b ^
+ %relPath%xui\js\UI\Panel.js /b ^
+ %relPath%xui\js\UI\Group.js /b  ^
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
+ %relPath%xui\js\UI\FusionChartsXT.js /b ^
+ %relPath%xui\js\UI\ECharts.js /b ^
+ %relPath%xui\js\UI\FormLayout.js /b ^
+ %relPath%xui\js\_end.js /b ^
xui-all.js

java -jar %compressTool2% --js xui-all.js --js_output_file %outPath%xui\js%allPath% --compilation_level WHITESPACE_ONLY --strict_mode_input false
java -jar %compressTool2% --js xui-all.js --js_output_file %rawPath% --compilation_level WHITESPACE_ONLY  --strict_mode_input false 

copy xui-all.js %outPath%xui\js%debugPath%

rem ==================
rem for extra classes
rem ==================

rem copy %relPath%xui\js\UI\FusionChartsXT.js  %outPath%xui\js\UI\FusionChartsXT.js
rem copy %relPath%xui\js\UI\ECharts.js  %outPath%xui\js\UI\ECharts.js

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

del /q xui-all.js
 
cd C:/nodejs
call compress.xui.bat

cd C:/nodejs
call compress.xui-all.bat

pause
 