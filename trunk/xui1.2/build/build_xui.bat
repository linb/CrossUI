set relPath=..\
set compressTool=%relPath%tools/yuicompressor.jar
set outPath=runtime\
set miniPath=\xui.js
set allPath=\xui-all.js
set rawPath=\xui-raw.js
set debugPath=\xui-debug.js
set advAllPath=\adv-all.js
set advRawPath=\adv-raw.js
set advDebugPath=\adv-debug.js


mkdir %outPath%
mkdir %outPath%xui
mkdir %outPath%xui\js
mkdir %outPath%xui\Locale
mkdir %outPath%xui\appearance


rem ==================
rem for xui source code
rem ==================
rem xcopy %relPath%xui\js\*.* %outPath%xui\js\ /E /Y

xcopy %relPath%xui\appearance\*.* %outPath%xui\appearance\ /E /Y
xcopy %relPath%xui\Locale\*.* %outPath%xui\Locale\ /E /Y
copy  %relPath%xui\ondrag.gif %outPath%xui\ondrag.gif
copy  %relPath%xui\bg.gif %outPath%xui\bg.gif
copy  %relPath%xui\busy.gif %outPath%xui\busy.gif

rem ==================
rem for mini xui code
rem ==================
copy %relPath%xui\js\xui.js /b + %relPath%xui\js\DataBinder.js /b + %relPath%xui\js\Event.js /b + %relPath%xui\js\CSS.js /b + %relPath%xui\js\Dom.js /b  + %relPath%xui\js\Template.js /b + %relPath%xui\js\DragDrop.js /b+ %relPath%xui\js\Cookies.js /b + %relPath%xui\js\History.js /b + %relPath%xui\js\Tips.js /b xui.js

java -jar %compressTool% -o  %outPath%xui\js%miniPath% xui.js
 
del /q xui.js


rem ==================
rem for all xui code
rem ==================
copy %relPath%xui\js\xui.js /b + %relPath%xui\js\DataBinder.js /b +  %relPath%xui\Locale\en.js /b + %relPath%xui\js\Event.js /b  + %relPath%xui\js\Date.js /b + %relPath%xui\js\CSS.js /b + %relPath%xui\js\Dom.js /b + %relPath%xui\js\Template.js /b  + %relPath%xui\js\Com.js /b + %relPath%xui\js\Cookies.js /b + %relPath%xui\js\MessageService.js /b+ %relPath%xui\js\XML.js /b + %relPath%xui\js\XMLRPC.js /b + %relPath%xui\js\SOAP.js /b + %relPath%xui\js\DragDrop.js /b + %relPath%xui\js\Tips.js /b + %relPath%xui\js\History.js /b + %relPath%xui\js\ComFactory.js /b  + %relPath%xui\js\Debugger.js /b + %relPath%xui\js\UI.js /b + %relPath%xui\js\ThirdParty\raphael.js /b + %relPath%xui\js\svg.js /b + %relPath%xui\js\UI\SVGPaper.js /b + %relPath%xui\js\UI\Image.js /b +%relPath%xui\js\UI\Flash.js /b + %relPath%xui\js\UI\Border.js /b + %relPath%xui\js\UI\Shadow.js /b + %relPath%xui\js\UI\Resizer.js /b  + %relPath%xui\js\UI\Block.js /b + %relPath%xui\js\UI\Label.js /b + %relPath%xui\js\UI\ProgressBar.js /b + %relPath%xui\js\UI\Button.js /b + %relPath%xui\js\UI\CheckBox.js /b+ %relPath%xui\js\UI\Slider.js /b + %relPath%xui\js\UI\Input.js /b + %relPath%xui\js\UI\RichEditor.js /b + %relPath%xui\js\UI\ComboInput.js /b + %relPath%xui\js\UI\Group.js /b  + %relPath%xui\js\UI\ColorPicker.js /b + %relPath%xui\js\UI\DatePicker.js /b + %relPath%xui\js\UI\TimePicker.js /b + %relPath%xui\js\UI\List.js /b + %relPath%xui\js\UI\Gallery.js /b + %relPath%xui\js\UI\IconList.js /b + %relPath%xui\js\UI\Panel.js /b + %relPath%xui\js\UI\PageBar.js /b + %relPath%xui\js\UI\Tabs.js /b + %relPath%xui\js\UI\Stacks.js /b + %relPath%xui\js\UI\ButtonViews.js /b + %relPath%xui\js\UI\FoldingTabs.js /b + %relPath%xui\js\UI\RadioBox.js /b + %relPath%xui\js\UI\StatusButtons.js /b + %relPath%xui\js\UI\TreeBar.js /b + %relPath%xui\js\UI\TreeView.js /b + %relPath%xui\js\UI\PopMenu.js /b + %relPath%xui\js\UI\MenuBar.js /b + %relPath%xui\js\UI\ToolBar.js /b + %relPath%xui\js\UI\Layout.js /b+ %relPath%xui\js\UI\ColLayout.js /b + %relPath%xui\js\UI\TreeGrid.js /b + %relPath%xui\js\UI\Slider.js /b + %relPath%xui\js\UI\Dialog.js /b xui.js

java -jar %compressTool% -o  %outPath%xui\js%allPath% xui.js
java -jar %compressTool% -o  %outPath%xui\js%rawPath%   --nomunge  xui.js
copy xui.js  %outPath%xui\js%debugPath%

rem ==================
rem for adv code
rem ==================
copy %relPath%xui\js\UI\TextEditor.js /b + %relPath%xui\js\UI\TimeLine.js /b +  %relPath%xui\js\UI\TagEditor.js /b + %relPath%xui\js\UI\Poll.js /b + %relPath%xui\js\UI\FoldingList.js /b + %relPath%xui\js\UI\Range.js /b  + %relPath%xui\js\UI\Calendar.js /b + %relPath%xui\js\ThirdParty\jquery.min.js /b + %relPath%xui\js\ThirdParty\FusionCharts.js /b + %relPath%xui\js\ThirdParty\FusionCharts.HC.js /b + %relPath%xui\js\ThirdParty\FusionCharts.HC.Charts.js /b + %relPath%xui\js\UI\FusionChartsXT.js /b adv.js

java -jar %compressTool% -o  %outPath%xui\js%advAllPath% adv.js
java -jar %compressTool% -o  %outPath%xui\js%advRawPath%   --nomunge  adv.js
copy adv.js  %outPath%xui\js%advDebugPath%


rem ==================
rem for Coder.js
rem ==================
java -jar %compressTool% -o  %outPath%xui\js\Coder.js %relPath%xui\js\Coder.js
copy %relPath%xui\js\Coder.js  %outPath%xui\js\Coder-debug.js



rem =======================
rem copy to other dir
rem =======================

set oPath=..\

rem rd %oPath%%outPath% /S /Q
rem mkdir %oPath%%outPath%

xcopy %outPath%*.* %oPath%%outPath% /E /Y

rd %outPath% /S /Q

del /q xui.js
del /q adv.js

pause