Class('App', 'xui.Com',{
    Instance:{
        iniComponents : function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0));};
            
            append((new xui.UI.SVGPaper())
            .setHost(host,"ctl_svgpaper1")
            .setLeft(40)
            .setTop(0)
            .setWidth(710)
            .setHeight(710)
            );
            
            host.ctl_svgpaper1.append((new xui.svg.connector())
            .setHost(host,"ctl_connector5")
            .setSvgTag("Connectors:Straight")
            .setAttr({"KEY":{"path":"M,240,580L,240.001953125,610", "stroke":"#BDB76B", "stroke-width":2, "arrow-end":"block-midium-midium", "fill":"none"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setFromObj("ctl_rectcomb30")
            .setFromPoint("bottom")
            .setToObj("ctl_pathcomb6")
            .setToPoint("top")
            );
            
            host.ctl_svgpaper1.append((new xui.svg.connector())
            .setHost(host,"ctl_connector2")
            .setSvgTag("Connectors:Straight")
            .setAttr({"KEY":{"path":"M,240,400L,240,430", "fill":"none", "stroke":"#BDB76B", "stroke-width":2, "arrow-end":"block-midium-midium"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setFromObj("ctl_rectcomb28")
            .setFromPoint("bottom")
            .setToObj("ctl_rectcomb29")
            .setToPoint("top")
            );
            
            host.ctl_svgpaper1.append((new xui.svg.connector())
            .setHost(host,"ctl_connector6")
            .setSvgTag("Connectors:Straight")
            .setAttr({"KEY":{"path":"M,240.29296875,310.73046875L,240,340", "stroke":"#BDB76B", "stroke-width":2, "arrow-end":"block-midium-midium", "fill":"none"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setFromObj("ctl_pathcomb1")
            .setFromPoint("bottom")
            .setToObj("ctl_rectcomb28")
            .setToPoint("top")
            );
            
            host.ctl_svgpaper1.append((new xui.svg.connector())
            .setHost(host,"ctl_connector7")
            .setSvgTag("Connectors:Straight")
            .setAttr({"KEY":{"path":"M,240,240L,240.29296875,270", "stroke":"#BDB76B", "stroke-width":2, "arrow-end":"block-midium-midium", "fill":"none"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setFromObj("ctl_rectcomb6")
            .setFromPoint("bottom")
            .setToObj("ctl_pathcomb1")
            .setToPoint("top")
            );
            
            host.ctl_svgpaper1.append((new xui.svg.connector())
            .setHost(host,"ctl_connector8")
            .setSvgTag("Connectors:Straight")
            .setAttr({"KEY":{"path":"M,240,150L,240,180", "stroke":"#BDB76B", "stroke-width":2, "arrow-end":"block-midium-midium", "fill":"none"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setFromObj("ctl_rectcomb3")
            .setFromPoint("bottom")
            .setToObj("ctl_rectcomb6")
            .setToPoint("top")
            );
            
            host.ctl_svgpaper1.append((new xui.svg.connector())
            .setHost(host,"ctl_connector12")
            .setSvgTag("Connectors:Straight")
            .setAttr({"KEY":{"path":"M,240,60L,240,90", "fill":"none", "stroke":"#BDB76B", "stroke-width":2, "arrow-end":"block-midium-midium"}, "BG":{"fill":"none", "stroke":"#fff", "stroke-width":4}})
            .setFromObj("ctl_rectcomb1")
            .setFromPoint("bottom")
            .setToObj("ctl_rectcomb3")
            .setToPoint("top")
            );
            
            host.ctl_svgpaper1.append((new xui.svg.path())
            .setHost(host,"ctl_path1")
            .setSvgTag("Shapes:Line")
            .setAttr({"path":"M,340,10L,340,530", "stroke":"#ECECEC", "fill":"none", "stroke-width":3})
            );
            
            host.ctl_svgpaper1.append((new xui.svg.rectComb())
            .setHost(host,"ctl_rectcomb1")
            .setSvgTag("FlowChart:Process")
            .setAttr({"KEY":{"x":190, "y":20, "width":100, "height":40, "r":13, "fill":"90-#D7E4BD:0-#B2CA7E:60-#B2CA7E:70-#D7E4BD:100", "stroke":"#B2CA7E", "stroke-width":0}, "TEXT":{"text":"Start", "fill":"#000000", "font-size":"13px", "font-weight":"bold"}})
            );
            
            host.ctl_svgpaper1.append((new xui.svg.rectComb())
            .setHost(host,"ctl_rectcomb2")
            .setSvgTag("FlowChart:Process")
            .setAttr({"KEY":{"x":390, "y":20, "width":100, "height":40, "r":13, "fill":"90-#D7E4BD:0-#B2CA7E:60-#B2CA7E:70-#D7E4BD:100", "stroke":"#B2CA7E", "stroke-width":0}, "TEXT":{"text":"Start", "fill":"#000000", "font-size":"13px", "font-weight":"bold"}})
            );
            
            host.ctl_svgpaper1.append((new xui.svg.rectComb())
            .setHost(host,"ctl_rectcomb3")
            .setSvgTag("FlowChart:Process")
            .setAttr({"KEY":{"x":190, "y":90, "width":100, "height":60, "r":13, "fill":"90-#FFC1E0:0-#FF69B4:60-#FF69B4:70-#FFC1E0:100", "stroke":"#FF69B4", "stroke-width":0}, "TEXT":{"text":"Take kit\nfrom rack", "fill":"#000000", "font-size":"13px", "font-weight":"bold"}})
            );
            
            host.ctl_svgpaper1.append((new xui.svg.rectComb())
            .setHost(host,"ctl_rectcomb4")
            .setSvgTag("FlowChart:Process")
            .setAttr({"KEY":{"x":390, "y":90, "width":100, "height":60, "r":13, "fill":"90-#FFC1E0:0-#FF69B4:60-#FF69B4:70-#FFC1E0:100", "stroke":"#FF69B4", "stroke-width":0}, "TEXT":{"text":"Take kit\nfrom rack", "fill":"#000000", "font-size":"13px", "font-weight":"bold"}})
            );
            
            host.ctl_svgpaper1.append((new xui.svg.rectComb())
            .setHost(host,"ctl_rectcomb5")
            .setSvgTag("FlowChart:Process")
            .setAttr({"KEY":{"x":390, "y":180, "width":100, "height":60, "r":13, "fill":"90-#F6BEF6:0-#EE82EE:60-#EE82EE:70-#F6BEF6:100", "stroke":"#EE82EE", "stroke-width":0}, "TEXT":{"text":"Assemble\nbase", "fill":"#000000", "font-size":"13px", "font-weight":"bold"}})
            );
            
            host.ctl_svgpaper1.append((new xui.svg.rectComb())
            .setHost(host,"ctl_rectcomb6")
            .setSvgTag("FlowChart:Process")
            .setAttr({"KEY":{"x":190, "y":180, "width":100, "height":60, "r":13, "fill":"90-#FFC1E0:0-#FF69B4:60-#FF69B4:70-#FFC1E0:100", "stroke":"#FF69B4", "stroke-width":0}, "TEXT":{"text":"Check part\nvs.assy.\ndiagram", "fill":"#000000", "font-size":"13px", "font-weight":"bold"}})
            );
            
            host.ctl_svgpaper1.append((new xui.svg.pathComb())
            .setHost(host,"ctl_pathcomb1")
            .setSvgTag("FlowChart:Decision")
            .setAttr({"KEY":{"fill":"90-#D7E4BD:0-#B2CA7E:60-#B2CA7E:70-#D7E4BD:100", "stroke":"#B2CA7E", "path":"M,180,290.36476L,240.2936,270L,300.58739,290.36476L,240.2936,310.72952L,180,290.36476Z", "stroke-width":0}, "TEXT":{"text":"All there?", "fill":"#000000", "font-size":"13px", "font-weight":"bold"}})
            );
            
            host.ctl_svgpaper1.append((new xui.svg.rectComb())
            .setHost(host,"ctl_rectcomb25")
            .setSvgTag("FlowChart:Process")
            .setAttr({"KEY":{"x":390, "y":270, "width":100, "height":60, "r":13, "fill":"90-#F6BEF6:0-#EE82EE:60-#EE82EE:70-#F6BEF6:100", "stroke":"#EE82EE", "stroke-width":0}, "TEXT":{"text":"Fit reel to \nbase", "fill":"#000000", "font-size":"13px", "font-weight":"bold"}})
            );
            
            host.ctl_svgpaper1.append((new xui.svg.rectComb())
            .setHost(host,"ctl_rectcomb26")
            .setSvgTag("FlowChart:Process")
            .setAttr({"KEY":{"x":390, "y":360, "width":100, "height":60, "r":13, "fill":"90-#F6BEF6:0-#EE82EE:60-#EE82EE:70-#F6BEF6:100", "stroke":"#EE82EE", "stroke-width":0}, "TEXT":{"text":"Fit band to \nreel", "fill":"#000000", "font-size":"13px", "font-weight":"bold"}})
            );
            
            host.ctl_svgpaper1.append((new xui.svg.pathComb())
            .setHost(host,"ctl_pathcomb5")
            .setSvgTag("FlowChart:Termination")
            .setAttr({"KEY":{"fill":"90-#5198D3-#A1C8F6", "stroke":"#004A7F", "path":"M,416.2622060278105,450L,463.7416827215469,450L,463.7416827215469,450C,469.9616444406108,450,475.00390625,459.1239884830489,475.00390625,470.3789462494234C,475.00390625,481.6338940159421,469.96165027415833,490.7578125,463.7416827215469,490.7578125L,416.2622060278105,490.7578125L,416.2622060278105,490.7578125C,410.0422443087466,490.7578125,405,481.6338940159421,405,470.3789462494234C,405,459.1239884830489,410.0422443087466,450.00004999927927,416.2622060278105,450.00004999927927Z", "stroke-width":0}, "TEXT":{"text":"End", "fill":"#000000", "font-size":"13px", "font-weight":"bold"}})
            );
            
            host.ctl_svgpaper1.append((new xui.svg.rectComb())
            .setHost(host,"ctl_rectcomb28")
            .setSvgTag("FlowChart:Process")
            .setAttr({"KEY":{"x":190, "y":340, "width":100, "height":60, "r":13, "fill":"90-#F6BEF6:0-#EE82EE:60-#EE82EE:70-#F6BEF6:100", "stroke":"#EE82EE", "stroke-width":0}, "TEXT":{"text":"Assemble\nbase", "fill":"#000000", "font-size":"13px", "font-weight":"bold"}})
            );
            
            host.ctl_svgpaper1.append((new xui.svg.connector())
            .setHost(host,"ctl_connector1")
            .setSvgTag("Connectors:Straight")
            .setAttr({"KEY":{"path":"M,240,490L,240,520", "fill":"none", "stroke":"#BDB76B", "stroke-width":2, "arrow-end":"block-midium-midium"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setFromObj("ctl_rectcomb29")
            .setFromPoint("bottom")
            .setToObj("ctl_rectcomb30")
            .setToPoint("top")
            );
            
            host.ctl_svgpaper1.append((new xui.svg.rectComb())
            .setHost(host,"ctl_rectcomb29")
            .setSvgTag("FlowChart:Process")
            .setAttr({"KEY":{"x":190, "y":430, "width":100, "height":60, "r":13, "fill":"90-#F6BEF6:0-#EE82EE:60-#EE82EE:70-#F6BEF6:100", "stroke":"#EE82EE", "stroke-width":0}, "TEXT":{"text":"Fit reel to \nbase", "fill":"#000000", "font-size":"13px", "font-weight":"bold"}})
            );
            
            host.ctl_svgpaper1.append((new xui.svg.rectComb())
            .setHost(host,"ctl_rectcomb30")
            .setSvgTag("FlowChart:Process")
            .setAttr({"KEY":{"x":190, "y":520, "width":100, "height":60, "r":13, "fill":"90-#F6BEF6:0-#EE82EE:60-#EE82EE:70-#F6BEF6:100", "stroke":"#EE82EE", "stroke-width":0}, "TEXT":{"text":"Fit band to \nreel", "fill":"#000000", "font-size":"13px", "font-weight":"bold"}})
            );
            
            host.ctl_svgpaper1.append((new xui.svg.pathComb())
            .setHost(host,"ctl_pathcomb6")
            .setSvgTag("FlowChart:Termination")
            .setAttr({"KEY":{"fill":"90-#5198D3-#A1C8F6", "stroke":"#004A7F", "path":"M,216.26220602781052,610L,263.7416827215469,610L,263.7416827215469,610C,269.9616444406108,610,275.00390625,619.1239884830488,275.00390625,630.3789462494234C,275.00390625,641.6338940159421,269.96165027415833,650.7578125,263.7416827215469,650.7578125L,216.26220602781052,650.7578125L,216.26220602781052,650.7578125C,210.0422443087466,650.7578125,205,641.6338940159421,205,630.3789462494234C,205,619.1239884830488,210.0422443087466,610.0000499992793,216.26220602781052,610.0000499992793Z", "stroke-width":0}, "TEXT":{"text":"End", "fill":"#000000", "font-size":"13px", "font-weight":"bold"}})
            );
            
            host.ctl_svgpaper1.append((new xui.svg.connector())
            .setHost(host,"ctl_connector3")
            .setSvgTag("Connectors:Straight")
            .setAttr({"KEY":{"path":"M,440,420L,440.001953125,450", "fill":"none", "stroke":"#BDB76B", "stroke-width":2, "arrow-end":"block-midium-midium"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setFromObj("ctl_rectcomb26")
            .setFromPoint("bottom")
            .setToObj("ctl_pathcomb5")
            .setToPoint("top")
            );
            
            host.ctl_svgpaper1.append((new xui.svg.connector())
            .setHost(host,"ctl_connector4")
            .setSvgTag("Connectors:Straight")
            .setAttr({"KEY":{"path":"M,440,330L,440,360", "stroke":"#BDB76B", "stroke-width":2, "arrow-end":"block-midium-midium", "fill":"none"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setFromObj("ctl_rectcomb25")
            .setFromPoint("bottom")
            .setToObj("ctl_rectcomb26")
            .setToPoint("top")
            );
            
            host.ctl_svgpaper1.append((new xui.svg.connector())
            .setHost(host,"ctl_connector9")
            .setSvgTag("Connectors:Straight")
            .setAttr({"KEY":{"path":"M,440,150L,440,180", "stroke":"#BDB76B", "stroke-width":2, "arrow-end":"block-midium-midium", "fill":"none"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setFromObj("ctl_rectcomb4")
            .setFromPoint("bottom")
            .setToObj("ctl_rectcomb5")
            .setToPoint("top")
            );
            
            host.ctl_svgpaper1.append((new xui.svg.connector())
            .setHost(host,"ctl_connector10")
            .setSvgTag("Connectors:Straight")
            .setAttr({"KEY":{"path":"M,440,240L,440,270", "stroke":"#BDB76B", "stroke-width":2, "arrow-end":"block-midium-midium", "fill":"none"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setFromObj("ctl_rectcomb5")
            .setFromPoint("bottom")
            .setToObj("ctl_rectcomb25")
            .setToPoint("top")
            );
            
            host.ctl_svgpaper1.append((new xui.svg.connector())
            .setHost(host,"ctl_connector11")
            .setSvgTag("Connectors:Straight")
            .setAttr({"KEY":{"path":"M,440,60L,440,90", "stroke":"#BDB76B", "stroke-width":2, "arrow-end":"block-midium-midium", "fill":"none"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setFromObj("ctl_rectcomb2")
            .setFromPoint("bottom")
            .setToObj("ctl_rectcomb4")
            .setToPoint("top")
            );
            
            host.ctl_svgpaper1.append((new xui.svg.connector())
            .setHost(host,"ctl_connector193")
            .setSvgTag("Connectors:Bezier")
            .setAttr({"KEY":{"path":"M,490,210C,560,209,560,301,490,300", "fill":"none", "stroke":"#004A7F", "stroke-width":2, "arrow-start":"block-midium-midium", "arrow-end":"block-midium-midium"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setType("bezier")
            .setFromObj("ctl_rectcomb5")
            .setFromPoint("right")
            .setToObj("ctl_rectcomb25")
            .setToPoint("right")
            );
            
            host.ctl_svgpaper1.append((new xui.svg.path())
            .setHost(host,"ctl_path25")
            .setSvgTag("Arrow:14")
            .setAttr({"path":"M,521,257.068543414926C,521,251.83149312997506,511.5979777112058,247.58601918238293,500,247.58601918238293L,500,240L,500,240C,511.5979777112058,240,521,244.24546987456114,521,249.4825242325431L,521,257.068543414926C,521,261.3925586371673,514.5218876364316,265.16895484411936,505.2499998238255,266.2499586496797L,505.2499998238255,270.04296875L,500,262.75805856540654L,505.2499998238255,254.87093038523415L,505.2499998238255,258.66394048555446L,505.2499998238255,258.66394048555446C,511.50210424517826,257.93501253269676,516.6639604359691,255.9478306120819,519.2468204610893,253.2755353511212", "stroke":"#004A7F", "stroke-width":2, "fill":"#004A7F"})
            );
            
            host.ctl_svgpaper1.append((new xui.svg.text())
            .setHost(host,"ctl_text2")
            .setSvgTag("Shapes:Text")
            .setAttr({"x":571, "y":458.5, "text":"After improvement", "font-size":"13px", "font-weight":"bold"})
            );
            
            host.ctl_svgpaper1.append((new xui.svg.text())
            .setHost(host,"ctl_text3")
            .setSvgTag("Shapes:Text")
            .setAttr({"x":565.5, "y":478.5002899169922, "text":"average assembly \ntime=2.9 minutes", "font-size":"13px", "font-weight":"normal"})
            );
            
            host.ctl_svgpaper1.append((new xui.svg.text())
            .setHost(host,"ctl_text4")
            .setSvgTag("Shapes:Text")
            .setAttr({"x":101.5, "y":468.5, "text":"Before improvement", "font-size":"13px", "font-weight":"bold"})
            );
            
            host.ctl_svgpaper1.append((new xui.svg.text())
            .setHost(host,"ctl_text5")
            .setSvgTag("Shapes:Text")
            .setAttr({"x":95.5, "y":490.1002960205078, "text":"average assembly \ntime=5.6 minutes", "font-size":"13px", "font-weight":"normal"})
            );
            
            host.ctl_svgpaper1.append((new xui.svg.text())
            .setHost(host,"ctl_text6")
            .setSvgTag("Shapes:Text")
            .setAttr({"x":263, "y":326.1002960205078, "text":"Yes", "font-size":"13px", "font-weight":"normal"})
            );
            
            host.ctl_svgpaper1.append((new xui.svg.text())
            .setHost(host,"ctl_text7")
            .setSvgTag("Shapes:Text")
            .setAttr({"x":607.5, "y":165.5, "text":"", "font-size":"13px", "font-weight":""})
            );
            
            host.ctl_svgpaper1.append((new xui.svg.path())
            .setHost(host,"ctl_path28")
            .setSvgTag("Arrow:16")
            .setAttr({"path":"M,490,165.3225102608304L,500.001953125,150L,510.00390625,165.32251044619218L,505.0029293507162,165.3225102608304L,505.00292927927717,180.71875L,495.0009768992634,180.71875L,495.0009768992634,165.3225102608304Z", "stroke":"#004A7F", "stroke-width":2, "transform":"r270", "fill":"#004A7F"})
            );
            
            host.ctl_svgpaper1.append((new xui.svg.rectComb())
            .setHost(host,"ctl_rectcomb235")
            .setSvgTag("FlowChart:Process")
            .setAttr({"KEY":{"x":20, "y":260, "width":110, "height":60, "r":13, "fill":"90-#7B68EE:0-#0000CD:60-#0000CD:70-#7B68EE:100", "stroke":"#EE82EE", "stroke-width":0}, "TEXT":{"text":"Take kit back to \nassembly line", "fill":"#ffffff", "font-size":"13px", "font-weight":"bold"}})
            );
            
            host.ctl_svgpaper1.append((new xui.svg.connector())
            .setHost(host,"ctl_connector233")
            .setSvgTag("Connectors:Straight")
            .setAttr({"KEY":{"path":"M,180,290.365234375L,130,290", "stroke":"#BDB76B", "stroke-width":2, "arrow-end":"block-midium-midium", "fill":"none"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setFromObj("ctl_pathcomb1")
            .setFromPoint("left")
            .setToObj("ctl_rectcomb235")
            .setToPoint("right")
            );
            
            host.ctl_svgpaper1.append((new xui.svg.text())
            .setHost(host,"ctl_text29")
            .setSvgTag("Shapes:Text")
            .setAttr({"x":162.5, "y":278.10028076171875, "text":"No", "font-size":"13px", "font-weight":"normal"})
            );
            
            host.ctl_svgpaper1.append((new xui.svg.circleComb())
            .setHost(host,"ctl_circlecomb1")
            .setSvgTag("FlowChart:OnPageRefrence")
            .setAttr({"KEY":{"cx":75, "cy":150, "r":40, "fill":"r(0.5,0.15)#D7E4BD:0-#B2CA7E:48", "stroke":"#B2CA7E", "stroke-width":0}, "TEXT":{"text":"Wait for\nreplacement", "font-size":"12px", "font-weight":"bold"}})
            );
            
            host.ctl_svgpaper1.append((new xui.svg.connector())
            .setHost(host,"ctl_connector234")
            .setSvgTag("Connectors:Straight")
            .setAttr({"KEY":{"path":"M,75,260L,75,190", "fill":"none", "stroke":"#BDB76B", "stroke-width":2, "arrow-end":"block-midium-midium"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setFromObj("ctl_rectcomb235")
            .setFromPoint("top")
            .setToObj("ctl_circlecomb1")
            .setToPoint("bottom")
            );
            
            host.ctl_svgpaper1.append((new xui.svg.connector())
            .setHost(host,"ctl_connector235")
            .setSvgTag("Connectors:flowchart")
            .setAttr({"KEY":{"path":"M,75,110V,73H,241", "fill":"none", "stroke":"#BDB76B", "stroke-width":2, "arrow-end":"block-midium-midium"}, "BG":{"stroke":"#fff", "stroke-width":4}})
            .setType("flowchart")
            .setFromObj("ctl_circlecomb1")
            .setFromPoint("top")
            );
            
            host.ctl_svgpaper1.append((new xui.svg.pathComb())
            .setHost(host,"ctl_pathcomb65")
            .setSvgTag("Tips:Ellipse")
            .setAttr({"KEY":{"fill":"90-#008B8B:0-#A1C8F6:89", "stroke":"#004A7F", "path":"M,550,257L,576.3808310544604,241.70176503051997L,576.3808310544604,241.70176503051997C,557.8192589355725,233.06033532586147,552.5227376806656,216.78172923930893,564.144405228453,204.0939705387636C,575.7658547016381,191.4062852907081,600.5025736349795,186.46192071327172,621.2916433856886,192.67130311374606C,642.0807071617511,198.8806501482068,652.1191650469325,214.21147699482142,644.4823717176391,228.08947344283567C,636.8459816769935,241.9674644499248,614.0339413854076,249.85070939320167,591.7808681217609,246.30157486002838L,552,256Z", "stroke-width":0}, "TEXT":{"fill":"#fff", "font-size":"12px", "font-weight":"bold", "text":"Swapped"}})
            .setVAlign("33.33%")
            );
            
            host.ctl_svgpaper1.append((new xui.svg.rectComb())
            .setHost(host,"ctl_rectcomb248")
            .setSvgTag("Tips:Simple")
            .setAttr({"KEY":{"stroke":"#000000", "fill":"#ffffff", "width":120, "height":30, "x":540, "y":150}, "TEXT":{"fill":"#000000", "font-size":"12px", "text":"Inspection removed"}})
            .setShadow(false)
            );
            
            host.ctl_svgpaper1.append((new xui.svg.path())
            .setHost(host,"ctl_path41")
            .setSvgTag("Shapes:Start5points")
            .setAttr({"path":"M,340.37,22.873l,-8.884,6.454l,3.396,-10.44l,-8.882,-6.454l,10.979,0.002l,2.918,-8.977l,0.476,-1.458l,3.39,10.433h,10.982l,-8.886,6.454l,3.397,10.443L,340.37,22.873L,340.37,22.873z", "stroke":"#004A7F", "fill":"#1E90FF", "stroke-width":0})
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        }
    },
    Static:{
        viewSize:{"width":800, "height":900}
    }
});