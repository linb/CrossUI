xui.Class('App', 'xui.Module',{
    Instance:{
        iniComponents : function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0));};
            
            append((new xui.UI.SVGPaper())
            .setHost(host,"ctl_svgpaper29")
            .setLeft(20)
            .setTop(20)
            .setWidth(830)
            .setHeight(1050)
            );
            
            host.ctl_svgpaper29.append((new xui.UI.Panel())
            .setHost(host,"ctl_panel5")
            .setDock("none")
            .setLeft(504)
            .setTop(190)
            .setWidth(130)
            .setHeight(130)
            .setZIndex(1)
            .setCaption("Applications")
            .setToggleBtn(true)
            );
            
            host.ctl_panel5.append((new xui.UI.List())
            .setHost(host,"ctl_list25")
            .setDirtyMark(false)
            .setItems([{"id":"a", "caption":"Tom", "image":""}, {"id":"b", "caption":"Jack", "image":""}, {"id":"c", "caption":"Smith", "image":""}])
            .setDock("fill")
            .setSelMode("none")
            .setBorderType("none")
            .setValue("")
            .onClick("_ctl_list25_onclick")
            );
            
            host.ctl_svgpaper29.append((new xui.svg.rect())
            .setHost(host,"ctl_rect25")
            .setSvgTag("Shapes:Rect")
            .setAttr({"x":1, "y":1, "r":22, "width":820, "height":1020, "stroke":"#FF00FF", "stroke-dasharray":"- ", "fill":"none"})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.path())
            .setHost(host,"ctl_path108")
            .setSvgTag("Shapes:Line")
            .setAttr({"path":"M20,60L780,60", "stroke":"#004A7F", "fill":"none", "stroke-dasharray":"--.."})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.path())
            .setHost(host,"ctl_path110")
            .setSvgTag("Shapes:Line")
            .setAttr({"path":"M120,10L120,1000", "stroke":"#004A7F", "fill":"none", "stroke-dasharray":"--.."})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.path())
            .setHost(host,"ctl_path117")
            .setSvgTag("Shapes:Line")
            .setAttr({"path":"M480,10L480,1000", "stroke":"#004A7F", "fill":"none", "stroke-dasharray":"--.."})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.path())
            .setHost(host,"ctl_path118")
            .setSvgTag("Shapes:Line")
            .setAttr({"path":"M660,10L660,1000", "stroke":"#004A7F", "fill":"none", "stroke-dasharray":"--.."})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.text())
            .setHost(host,"ctl_text26")
            .setSvgTag("Shapes:Text")
            .setAttr({"x":64, "y":48.5, "text":"Customer", "font-size":"13px", "font-weight":"bold"})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.text())
            .setHost(host,"ctl_text27")
            .setSvgTag("Shapes:Text")
            .setAttr({"x":302.5, "y":48.5, "text":"Company", "font-size":"13px", "font-weight":"bold"})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.text())
            .setHost(host,"ctl_text28")
            .setSvgTag("Shapes:Text")
            .setAttr({"x":741, "y":48.5, "text":"Third service provider", "font-size":"13px", "font-weight":"bold"})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.image())
            .setHost(host,"ctl_image24")
            .setAttr({"src":"image/user.png", "x":30, "y":70, "width":64, "height":64})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.text())
            .setHost(host,"ctl_text41")
            .setSvgTag("Shapes:Text")
            .setAttr({"x":64, "y":149, "text":"End user", "font-size":"13px", "font-weight":"normal"})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.image())
            .setHost(host,"ctl_image29")
            .setAttr({"src":"image/service.png", "x":178, "y":70, "width":64, "height":64})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.text())
            .setHost(host,"ctl_text42")
            .setSvgTag("Shapes:Text")
            .setAttr({"x":212, "y":149, "text":"Customer service", "font-size":"13px", "font-weight":"normal"})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.image())
            .setHost(host,"ctl_image30")
            .setAttr({"src":"image/manager.png", "x":530, "y":70, "width":64, "height":64})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.text())
            .setHost(host,"ctl_text43")
            .setSvgTag("Shapes:Text")
            .setAttr({"x":562, "y":149, "text":"Site service manager", "font-size":"13px", "font-weight":"normal"})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.image())
            .setHost(host,"ctl_image31")
            .setAttr({"src":"image/third.png", "x":690, "y":78, "width":64, "height":64})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.text())
            .setHost(host,"ctl_text44")
            .setSvgTag("Shapes:Text")
            .setAttr({"x":730.5, "y":149, "text":"Service manager", "font-size":"13px", "font-weight":"normal"})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.rectComb())
            .setHost(host,"ctl_rectcomb1")
            .setSvgTag("FlowChart:Process")
            .setAttr({"KEY":{"x":10, "y":180, "width":100, "height":40, "fill":"90-#5198D3-#A1C8F6", "stroke":"#004A7F", "cursor":"pointer"}, "TEXT":{"text":"Service\nrequirement", "fill":"#fff", "font-size":"12px", "font-weight":"bold", "cursor":"pointer", "title":"Click event"}})
            .onClick("_ctl_rectcomb1_onclick")
            );
            
            host.ctl_svgpaper29.append((new xui.svg.rectComb())
            .setHost(host,"ctl_rectcomb2")
            .setSvgTag("FlowChart:Process")
            .setAttr({"KEY":{"x":150, "y":180, "width":130, "height":40, "fill":"90-#5198D3-#A1C8F6", "stroke":"#004A7F", "title":"Click event", "cursor":"pointer"}, "TEXT":{"text":"User \ncertification", "fill":"#fff", "font-size":"12px", "font-weight":"bold", "cursor":"pointer"}})
            .onClick("_ctl_rectcomb1_onclick")
            );
            
            host.ctl_svgpaper29.append((new xui.svg.pathComb())
            .setHost(host,"ctl_pathcomb6")
            .setSvgTag("FlowChart:Decision")
            .setAttr({"KEY":{"stroke":"#004A7F", "fill":"90-#5198D3-#A1C8F6", "path":"M,145.20703125,285.365234375L,215.4998892449363,250L,285.79296875,285.365234375L,215.4998892449363,320.73046875L,145.20703125,285.365234375Z"}, "TEXT":{"fill":"#fff", "font-size":"12px", "font-weight":"bold", "text":"Begin to \nservice\ncoverage"}})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.pathComb())
            .setHost(host,"ctl_pathcomb7")
            .setSvgTag("FlowChart:Document")
            .setAttr({"KEY":{"stroke":"#004A7F", "fill":"90-#5198D3-#A1C8F6", "path":"M,156.5,949.91796875L,276.5,949.91796875L,276.5,998.7890982953757C,216.5,998.7890982953757,216.5,1017.4098956270653,156.5,1006.8298981979149Z"}, "TEXT":{"fill":"#fff", "font-size":"12px", "font-weight":"bold", "text":"Hiring system\ndeployed service \nengineers"}})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.rectComb())
            .setHost(host,"ctl_rectcomb3")
            .setSvgTag("FlowChart:Process")
            .setAttr({"KEY":{"stroke":"#004A7F", "fill":"90-#5198D3-#A1C8F6", "width":130, "height":40, "x":151, "y":530}, "TEXT":{"fill":"#fff", "font-size":"12px", "font-weight":"bold", "text":"Online software\nsolution"}})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.pathComb())
            .setHost(host,"ctl_pathcomb8")
            .setSvgTag("FlowChart:Decision")
            .setAttr({"KEY":{"stroke":"#004A7F", "fill":"90-#5198D3-#A1C8F6", "path":"M,145.20703125,465.365234375L,215.4998892449363,440L,285.79296875,465.365234375L,215.4998892449363,490.73046875L,145.20703125,465.365234375Z"}, "TEXT":{"fill":"#fff", "font-size":"12px", "font-weight":"bold", "text":"Hardware\nproblem"}})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.pathComb())
            .setHost(host,"ctl_pathcomb10")
            .setSvgTag("FlowChart:Decision")
            .setAttr({"KEY":{"fill":"90-#CD5C5C:0-#FFB6C1:100", "stroke":"#004A7F", "path":"M,145.70703125,645.5L,215.9998892449363,610.134765625L,286.29296875,645.5L,215.9998892449363,680.865234375L,145.70703125,645.5Z"}, "TEXT":{"fill":"#fff", "font-size":"12px", "font-weight":"bold", "text":"Problem\nresolved"}})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.pathComb())
            .setHost(host,"ctl_pathcomb11")
            .setSvgTag("FlowChart:Decision")
            .setAttr({"KEY":{"stroke":"#004A7F", "fill":"90-#5198D3-#A1C8F6", "path":"M,130.70703125,765.5L,215.99986561062428,720.134765625L,301.29296875,765.5L,215.99986561062428,810.865234375L,130.70703125,765.5Z"}, "TEXT":{"fill":"#fff", "font-size":"12px", "font-weight":"bold", "text":"Judge \nwhether third service\n provider  issues"}})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.pathComb())
            .setHost(host,"ctl_pathcomb14")
            .setSvgTag("FlowChart:Decision")
            .setAttr({"KEY":{"stroke":"#004A7F", "fill":"90-#5198D3-#A1C8F6", "path":"M,131.20703125,875.365234375L,216.49986561062428,840L,301.79296875,875.365234375L,216.49986561062428,910.73046875L,131.20703125,875.365234375Z"}, "TEXT":{"fill":"#fff", "font-size":"12px", "font-weight":"bold", "text":"Customer need \nsite services?"}})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.pathComb())
            .setHost(host,"ctl_pathcomb15")
            .setSvgTag("FlowChart:Document")
            .setAttr({"KEY":{"stroke":"#004A7F", "fill":"90-#5198D3-#A1C8F6", "path":"M,155.5,360L,275.5,360L,275.5,400.74815255302656C,215.5,400.74815255302656,215.5,416.27394656247714,155.5,407.45247357292055Z"}, "TEXT":{"fill":"#fff", "font-size":"12px", "font-weight":"bold", "text":"Problem record"}})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.pathComb())
            .setHost(host,"ctl_pathcomb16")
            .setSvgTag("FlowChart:Document")
            .setAttr({"KEY":{"stroke":"#004A7F", "fill":"90-#5198D3-#A1C8F6", "path":"M,510.5,949.91796875L,630.5,949.91796875L,630.5,998.7890982953757C,570.5,998.7890982953757,570.5,1017.4098956270653,510.5,1006.8298981979149Z"}, "TEXT":{"fill":"#fff", "font-size":"12px", "font-weight":"bold", "text":"System engineers\navailable"}})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.pathComb())
            .setHost(host,"ctl_pathcomb17")
            .setSvgTag("FlowChart:Decision")
            .setAttr({"KEY":{"stroke":"#004A7F", "fill":"90-#5198D3-#A1C8F6", "path":"M,490.20703125,875.365234375L,570.4998734887282,840L,650.79296875,875.365234375L,570.4998734887282,910.73046875L,490.20703125,875.365234375Z"}, "TEXT":{"fill":"#fff", "font-size":"12px", "font-weight":"bold", "text":"Judge\nwhether third service\ncoverage"}})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.rectComb())
            .setHost(host,"ctl_rectcomb4")
            .setSvgTag("FlowChart:Process")
            .setAttr({"KEY":{"x":340, "y":745.5, "width":130, "height":40, "r":6, "fill":"90-#B22222:0-#A1C8F6:100", "stroke":"#004A7F", "cursor":"pointer"}, "TEXT":{"text":"Service provider", "fill":"#fff", "font-size":"12px", "font-weight":"bold", "cursor":"pointer"}})
            .onClick("_ctl_rectcomb4_onclick")
            );
            
            host.ctl_svgpaper29.append((new xui.svg.pathComb())
            .setHost(host,"ctl_pathcomb18")
            .setSvgTag("FlowChart:Termination")
            .setAttr({"KEY":{"stroke":"#004A7F", "fill":"90-#5198D3-#A1C8F6", "path":"M,364.30593,625.12109375L,445.69633,625.12109375L,445.69633,625.12109375C,456.35873000000004,625.12109375,465.00229,634.2452137500001,465.00229,645.50033375C,465.00229,656.75544375,456.35874,665.87949375,445.69633,665.87949375L,364.30593,665.87949375L,364.30593,665.87949375C,353.64353,665.87949375,345,656.75544375,345,645.50033375C,345,634.2452137500001,353.64353,625.12114375,364.30593,625.12114375Z"}, "TEXT":{"fill":"#fff", "font-size":"12px", "font-weight":"bold", "text":"Service complete"}})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.rectComb())
            .setHost(host,"ctl_rectcomb33")
            .setSvgTag("FlowChart:Process")
            .setAttr({"KEY":{"x":680, "y":745.5, "width":130, "height":40, "r":6, "fill":"90-#B22222:0-#A1C8F6:100", "stroke":"#004A7F", "cursor":"pointer"}, "TEXT":{"text":"Service provider", "fill":"#fff", "font-size":"12px", "font-weight":"bold", "cursor":"pointer"}})
            .onClick("_ctl_rectcomb4_onclick")
            );
            
            host.ctl_svgpaper29.append((new xui.svg.connector())
            .setHost(host,"ctl_connector11")
            .setSvgTag("Connectors:Straight")
            .setAttr({"KEY":{"path":"M,110,200L,150,200", "stroke":"#004A7F", "stroke-width":2, "arrow-start":"oval-midium-midium", "arrow-end":"classic-wide-long", "fill":"none"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setFromObj("ctl_rectcomb1")
            .setFromPoint("right")
            .setToObj("ctl_rectcomb2")
            .setToPoint("left")
            );
            
            host.ctl_svgpaper29.append((new xui.svg.connector())
            .setHost(host,"ctl_connector12")
            .setSvgTag("Connectors:Straight")
            .setAttr({"KEY":{"path":"M,215,220L,215.5,250", "stroke":"#004A7F", "stroke-width":2, "arrow-start":"oval-midium-midium", "arrow-end":"classic-wide-long", "fill":"none"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setFromObj("ctl_rectcomb2")
            .setFromPoint("bottom")
            .setToObj("ctl_pathcomb6")
            .setToPoint("top")
            );
            
            host.ctl_svgpaper29.append((new xui.svg.connector())
            .setHost(host,"ctl_connector13")
            .setSvgTag("Connectors:Straight")
            .setAttr({"KEY":{"path":"M,215.5,320.73046875L,215.5,360", "stroke":"#004A7F", "stroke-width":2, "arrow-start":"oval-midium-midium", "arrow-end":"classic-wide-long", "fill":"none"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setFromObj("ctl_pathcomb6")
            .setFromPoint("bottom")
            .setToObj("ctl_pathcomb15")
            .setToPoint("top")
            );
            
            host.ctl_svgpaper29.append((new xui.svg.text())
            .setHost(host,"ctl_text105")
            .setSvgTag("Shapes:Text")
            .setAttr({"x":234, "y":338, "text":"Yes", "font-size":"13px", "font-weight":"normal"})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.connector())
            .setHost(host,"ctl_connector14")
            .setSvgTag("Connectors:Straight")
            .setAttr({"KEY":{"path":"M,215.5,410.1640625L,215.5,440", "stroke":"#004A7F", "stroke-width":2, "arrow-start":"oval-midium-midium", "arrow-end":"classic-wide-long", "fill":"none"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setFromObj("ctl_pathcomb15")
            .setFromPoint("bottom")
            .setToObj("ctl_pathcomb8")
            .setToPoint("top")
            );
            
            host.ctl_svgpaper29.append((new xui.svg.connector())
            .setHost(host,"ctl_connector15")
            .setSvgTag("Connectors:Straight")
            .setAttr({"KEY":{"path":"M,215.5,490.73046875L,216,530", "stroke":"#004A7F", "stroke-width":2, "arrow-start":"oval-midium-midium", "arrow-end":"classic-wide-long", "fill":"none"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setFromObj("ctl_pathcomb8")
            .setFromPoint("bottom")
            .setToObj("ctl_rectcomb3")
            .setToPoint("top")
            );
            
            host.ctl_svgpaper29.append((new xui.svg.text())
            .setHost(host,"ctl_text106")
            .setSvgTag("Shapes:Text")
            .setAttr({"x":229.5, "y":508, "text":"No", "font-size":"13px", "font-weight":"normal"})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.connector())
            .setHost(host,"ctl_connector16")
            .setSvgTag("Connectors:Straight")
            .setAttr({"KEY":{"path":"M,216,570L,216,610.1328125", "stroke":"#004A7F", "stroke-width":2, "arrow-start":"oval-midium-midium", "arrow-end":"classic-wide-long", "fill":"none"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setFromObj("ctl_rectcomb3")
            .setFromPoint("bottom")
            .setToObj("ctl_pathcomb10")
            .setToPoint("top")
            );
            
            host.ctl_svgpaper29.append((new xui.svg.connector())
            .setHost(host,"ctl_connector17")
            .setSvgTag("Connectors:Straight")
            .setAttr({"KEY":{"path":"M,216,680.8671875L,216,720.1328125", "stroke":"#004A7F", "stroke-width":2, "arrow-start":"oval-midium-midium", "arrow-end":"classic-wide-long", "fill":"none"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setFromObj("ctl_pathcomb10")
            .setFromPoint("bottom")
            .setToObj("ctl_pathcomb11")
            .setToPoint("top")
            );
            
            host.ctl_svgpaper29.append((new xui.svg.text())
            .setHost(host,"ctl_text107")
            .setSvgTag("Shapes:Text")
            .setAttr({"x":229.5, "y":698, "text":"No", "font-size":"13px", "font-weight":"normal"})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.connector())
            .setHost(host,"ctl_connector18")
            .setSvgTag("Connectors:Straight")
            .setAttr({"KEY":{"path":"M,216,810.8671875L,216.5,840", "stroke":"#004A7F", "stroke-width":2, "arrow-start":"oval-midium-midium", "arrow-end":"classic-wide-long", "fill":"none"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setFromObj("ctl_pathcomb11")
            .setFromPoint("bottom")
            .setToObj("ctl_pathcomb14")
            .setToPoint("top")
            );
            
            host.ctl_svgpaper29.append((new xui.svg.text())
            .setHost(host,"ctl_text108")
            .setSvgTag("Shapes:Text")
            .setAttr({"x":229.5, "y":821, "text":"No", "font-size":"13px", "font-weight":"normal"})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.connector())
            .setHost(host,"ctl_connector19")
            .setSvgTag("Connectors:Straight")
            .setAttr({"KEY":{"path":"M,216.5,910.73046875L,216.5,949.91796875", "stroke":"#004A7F", "stroke-width":2, "arrow-start":"oval-midium-midium", "arrow-end":"classic-wide-long", "fill":"none"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setFromObj("ctl_pathcomb14")
            .setFromPoint("bottom")
            .setToObj("ctl_pathcomb7")
            .setToPoint("top")
            );
            
            host.ctl_svgpaper29.append((new xui.svg.text())
            .setHost(host,"ctl_text109")
            .setSvgTag("Shapes:Text")
            .setAttr({"x":233, "y":928, "text":"Yes", "font-size":"13px", "font-weight":"normal"})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.connector())
            .setHost(host,"ctl_connector20")
            .setSvgTag("Connectors:Straight")
            .setAttr({"KEY":{"path":"M,276.5,980L,510.5,980", "stroke":"#004A7F", "stroke-width":2, "arrow-start":"oval-midium-midium", "arrow-end":"classic-wide-long", "fill":"none"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setFromObj("ctl_pathcomb7")
            .setFromPoint("right")
            .setToObj("ctl_pathcomb16")
            .setToPoint("left")
            );
            
            host.ctl_svgpaper29.append((new xui.svg.connector())
            .setHost(host,"ctl_connector21")
            .setSvgTag("Connectors:Straight")
            .setAttr({"KEY":{"path":"M,570.5,949.91796875L,570.5,910.73046875", "stroke":"#004A7F", "stroke-width":2, "arrow-start":"oval-midium-midium", "arrow-end":"classic-wide-long", "fill":"none"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setFromObj("ctl_pathcomb16")
            .setFromPoint("top")
            .setToObj("ctl_pathcomb17")
            .setToPoint("bottom")
            );
            
            host.ctl_svgpaper29.append((new xui.svg.connector())
            .setHost(host,"ctl_connector22")
            .setSvgTag("Connectors:flowchart")
            .setAttr({"KEY":{"path":"M,490.20703125,875.365234375H,405V,785.5", "stroke":"#004A7F", "stroke-width":2, "arrow-start":"oval-midium-midium", "arrow-end":"classic-wide-long", "fill":"none"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setType("flowchart")
            .setFromObj("ctl_pathcomb17")
            .setFromPoint("left")
            .setToObj("ctl_rectcomb4")
            .setToPoint("bottom")
            );
            
            host.ctl_svgpaper29.append((new xui.svg.text())
            .setHost(host,"ctl_text110")
            .setSvgTag("Shapes:Text")
            .setAttr({"x":430, "y":868, "text":"Yes", "font-size":"13px", "font-weight":"normal"})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.connector())
            .setHost(host,"ctl_connector23")
            .setSvgTag("Connectors:Straight")
            .setAttr({"KEY":{"path":"M,405,745.5L,405.001953125,665.87890625", "stroke":"#004A7F", "stroke-width":2, "arrow-start":"oval-midium-midium", "arrow-end":"classic-wide-long", "fill":"none"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setFromObj("ctl_rectcomb4")
            .setFromPoint("top")
            .setToObj("ctl_pathcomb18")
            .setToPoint("bottom")
            );
            
            host.ctl_svgpaper29.append((new xui.svg.connector())
            .setHost(host,"ctl_connector24")
            .setSvgTag("Connectors:flowchart")
            .setAttr({"KEY":{"path":"M,570.5,840V,645.5H,465.00390625", "stroke":"#004A7F", "stroke-width":2, "arrow-start":"oval-midium-midium", "arrow-end":"classic-wide-long", "fill":"none"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setType("flowchart")
            .setFromObj("ctl_pathcomb17")
            .setFromPoint("top")
            .setToObj("ctl_pathcomb18")
            .setToPoint("right")
            );
            
            host.ctl_svgpaper29.append((new xui.svg.text())
            .setHost(host,"ctl_text111")
            .setSvgTag("Shapes:Text")
            .setAttr({"x":561, "y":808, "text":"No", "font-size":"13px", "font-weight":"normal"})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.connector())
            .setHost(host,"ctl_connector25")
            .setSvgTag("Connectors:Straight")
            .setAttr({"KEY":{"path":"M,470,765.5L,680,765.5", "fill":"none", "stroke":"#004A7F", "stroke-width":2, "arrow-start":"oval-midium-midium", "arrow-end":"classic-wide-long", "stroke-dasharray":"-"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setFromObj("ctl_rectcomb4")
            .setFromPoint("right")
            .setToObj("ctl_rectcomb33")
            .setToPoint("left")
            );
            
            host.ctl_svgpaper29.append((new xui.svg.connector())
            .setHost(host,"ctl_connector26")
            .setSvgTag("Connectors:flowchart")
            .setAttr({"KEY":{"path":"M,285.79296875,465.365234375H,745V,745.5", "stroke":"#004A7F", "stroke-width":2, "arrow-start":"oval-midium-midium", "arrow-end":"classic-wide-long", "fill":"none"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setType("flowchart")
            .setFromObj("ctl_pathcomb8")
            .setFromPoint("right")
            .setToObj("ctl_rectcomb33")
            .setToPoint("top")
            );
            
            host.ctl_svgpaper29.append((new xui.svg.connector())
            .setHost(host,"ctl_connector27")
            .setSvgTag("Connectors:flowchart")
            .setAttr({"KEY":{"path":"M,301.79296875,875.365234375H,331.79296875V,464H,331", "stroke":"#004A7F", "stroke-width":2, "arrow-start":"oval-midium-midium", "arrow-end":"classic-wide-long", "fill":"none"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setType("flowchart")
            .setFromObj("ctl_pathcomb14")
            .setFromPoint("right")
            );
            
            host.ctl_svgpaper29.append((new xui.svg.pathComb())
            .setHost(host,"ctl_pathcomb96")
            .setSvgTag("Tips:CloudBalloon")
            .setAttr({"KEY":{"fill":"90-#7B68EE:0-#C0C0C0:100", "stroke":"#B22222", "path":"M,410.36500814317327,620.3881542316283C,410.36500814317327,619.8062314321526,411.23905192447603,619.3348833808036,412.31811750132215,619.3348833808036C,413.39718307816855,619.3348833808036,414.2712268594712,619.8062314321526,414.2712268594712,620.3881542316283C,414.2712268594712,620.9700581986511,413.39718307816855,621.4414062499999,412.31811750132215,621.4414062499999C,411.23905192447603,621.4414062499999,410.36500814317327,620.9700581986511,410.36500814317327,620.3881542316283ZM,414.3688823273787,612.8204208552653C,414.3688823273787,611.365582469154,416.55398982752604,610.1871950776998,419.2516596289698,610.1871950776998C,421.94932552419476,610.1871950776998,424.1344330243421,611.365582469154,424.1344330243421,612.8204208552653C,424.1344330243421,614.2751933277908,421.94932552419476,615.4535995516982,419.2516596289698,615.4535995516982C,416.55398982752604,615.4535995516982,414.3688823273787,614.2752121602439,414.3688823273787,612.8204208552653ZM,423.6461556848049,601.3466735001901C,423.6461556848049,597.3244318986916,431.2503330665414,594.0664457684288,440.6382149131385,594.0664457684288C,450.0260694162042,594.0664457684288,457.6302507041592,597.3244318986916,457.6302507041592,601.3466735001901C,457.6302507041592,605.368886853009,450.0260694162042,608.6268447345922,440.6382149131385,608.6268447345922C,431.2503330665414,608.6268447345922,423.6461556848049,605.368886853009,423.6461556848049,601.3466735001901ZM,477.2865816302726,510.0053800204106C,477.0472877693729,510.01305834670484,476.8160402259929,510.0335138878477,476.5757595176987,510.0577898462236C,472.7312644889328,510.4462239261543,469.33808397251437,512.9211232026518,467.6143092102368,516.6088868514441L,466.70038872939983,519.3996547755372C,466.89755862118045,518.4325193397493,467.20031009599666,517.4945675425712,467.6143092102368,516.6088868514441C,464.5401834789599,513.3780623499873,460.2253392409131,511.88683990361824,455.9618812924736,512.5865161396177C,451.69841964797644,513.2861886264343,447.995790400267,516.0921894800845,445.97227645016346,520.1595841276851C,440.259856714432,516.5907483052473,433.1392131389046,516.8068961897719,427.630494228834,520.7229813195129C,422.12177531876335,524.6390627000711,419.18563820406047,531.5728012978567,420.0779958845252,538.5681652126812L,420.6618879850358,541.4113429625872C,420.3980338210043,540.4798884991337,420.2009858991261,539.5323050514432,420.0779958845252,538.5681652126812L,419.9891426584463,538.8302105925632C,415.20063015134133,539.3595577065577,411.27345800884166,543.1283224488964,410.2534015363206,548.1720792710594C,409.23334506379985,553.2158323440393,411.3544201518227,558.3910692564399,415.5084156566864,560.9991245078692L,421.9946789841052,562.597596076293C,419.7298457335058,562.7867011055639,417.4687011484483,562.2298762311157,415.5084156566864,560.9991245078692C,412.3042921854914,564.6398734048413,411.5669767316302,570.029915994338,413.6805857831856,574.4812869435667C,415.79419113868283,578.9326503944297,420.3080902579164,581.4957641921056,424.96490483858014,580.9144609034124L,427.7955047229396,580.1545315512643C,426.8847480674573,580.5412222612113,425.9388677760584,580.7928824048456,424.96490483858014,580.9144609034124C,427.60854334240787,585.8511148216478,431.99203815538004,589.4522386060214,437.1377524587071,590.8852249965671C,442.2834667620341,592.3182151362957,447.7490859437646,591.4713047440976,452.30621415335617,588.5399387172926C,456.02392331630693,594.4870873699444,462.62232872910295,597.6107564789155,469.2390444115324,596.5584733534477C,475.8557563979041,595.5061902279797,481.31389475893616,590.4601913945259,483.2524178632124,583.6135125696284L,483.92515949374473,579.7876702689392C,483.82442713835513,581.087425700898,483.60584228850865,582.3652634104373,483.2524178632124,583.6135125696284C,487.803480842189,586.6409364079475,493.5281936656887,586.8115429694767,498.23048084370913,584.0589867160814C,502.9327680217294,581.3064304626862,505.8668686086628,576.0576495812501,505.90991289613885,570.3409931863655L,504.2241114302306,561.7994925452748L,497.58312373716666,556.0202960327576C,502.7182747077092,559.2832735255708,505.9557292268572,564.2547348565577,505.90991289613885,570.3409931863655C,512.0158740669782,570.4059027875028,517.2024482877055,565.0986309058159,519.5297966575187,559.0075998663536C,521.8571450273315,552.9165613285257,520.9767514855033,545.9724374944926,517.2196127794656,540.7562445096136C,518.778007441872,536.8725673156566,518.6855505595775,532.454909017813,516.9657564513964,528.6498184437046C,515.2459512550422,524.8447278695965,512.0736471442177,522.0165993392923,508.2581624720034,520.9064213336325C,507.4043066241534,515.8632418856147,503.88470615162845,511.8065474056133,499.23324715850936,510.47707595109284C,494.58178816539066,509.14760449657206,489.628830661002,510.7869609030022,486.51458791991394,514.6959825724218L,484.623289344324,517.9322246429682C,485.1065599711752,516.7619247425563,485.737728345179,515.6710887707593,486.51458791991394,514.6959825724218C,484.3192812099045,511.623782244391,480.8760302004039,509.8902426178273,477.28657423815747,510.00539501714184Z"}, "TEXT":{"fill":"#fff", "font-size":"12px", "font-weight":"bold", "text":"We can \ndo it better"}})
            .setVAlign("33.33%")
            );
            
            host.ctl_svgpaper29.append((new xui.svg.text())
            .setHost(host,"ctl_text187")
            .setSvgTag("Shapes:Text")
            .setAttr({"x":562.5, "y":48.5, "text":"Site service", "font-size":"13px", "font-weight":"bold"})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.text())
            .setHost(host,"ctl_text556")
            .setSvgTag("Shapes:Text")
            .setAttr({"x":320.5, "y":858, "text":"No", "font-size":"13px", "font-weight":"normal"})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.connector())
            .setHost(host,"ctl_connector504")
            .setSvgTag("Connectors:Straight")
            .setAttr({"KEY":{"path":"M,301.29296875,765.5L,340,765.5", "stroke":"#004A7F", "stroke-width":2, "arrow-start":"oval-midium-midium", "arrow-end":"classic-wide-long", "fill":"none"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setFromObj("ctl_pathcomb11")
            .setFromPoint("right")
            .setToObj("ctl_rectcomb4")
            .setToPoint("left")
            );
            
            host.ctl_svgpaper29.append((new xui.svg.connector())
            .setHost(host,"ctl_connector505")
            .setSvgTag("Connectors:Straight")
            .setAttr({"KEY":{"path":"M,286.29296875,645.5L,345,645.5", "stroke":"#004A7F", "stroke-width":2, "arrow-start":"oval-midium-midium", "arrow-end":"classic-wide-long", "fill":"none"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setFromObj("ctl_pathcomb10")
            .setFromPoint("right")
            .setToObj("ctl_pathcomb18")
            .setToPoint("left")
            );
            
            host.ctl_svgpaper29.append((new xui.svg.text())
            .setHost(host,"ctl_text557")
            .setSvgTag("Shapes:Text")
            .setAttr({"x":316.5, "y":754, "text":"Yes", "font-size":"13px", "font-weight":"normal"})
            );
            
            host.ctl_svgpaper29.append((new xui.svg.text())
            .setHost(host,"ctl_text558")
            .setSvgTag("Shapes:Text")
            .setAttr({"x":316.5, "y":636, "text":"Yes", "font-size":"13px", "font-weight":"normal"})
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        },
        _ctl_list25_onclick:function (profile, item, e, src){
            xui.alert(item.caption + "'s application.");
        },
        _ctl_rectcomb4_onclick:function (profile, e, src){
            xui.alert("OK");
        },
        _ctl_rectcomb1_onclick:function (profile, e, src){
            xui.alert("Click event!");
        }
    }
});