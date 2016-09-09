Class('App', 'xui.Module',{
    Instance:{
        //Com events
        events:{},
        iniComponents:function(){
            // [[Code created by CrossUI RAD Studio
            var host=this, children=[], append=function(child){children.push(child.get(0));};
            
            append(
                xui.create("xui.UI.Pane")
                .setHost(host,"pane4")
                .setDock("top")
                .setWidth("8.333333333333334em")
                .setHeight("4.166666666666667em")
            );
            
            host.pane4.append(
                xui.create("xui.UI.Label")
                .setHost(host,"label6")
                .setLeft("0.75em")
                .setTop("1em")
                .setWidth("6.41675em")
                .setHeight("2.5em")
                .setCaption("Theme")
                .setFontSize("1.5em")
                .setFontWeight("bold")
                );
            
            host.pane4.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"ctl_comboinput61")
                .setDirtyMark(false)
                .setLeft("8.33333em")
                .setTop("1.1666666666666667em")
                .setLabelSize("0em")
                .setLabelGap("0.3333333333333333em")
                .setType("listbox")
                .setItems([{
                    "id" : "default",
                    "caption" : "default"
                },
                {
                    "id" : "aqua",
                    "caption" : "aqua"
                },
                {
                    "id" : "army",
                    "caption" : "army"
                },
                {
                    "id" : "blackwhite",
                    "caption" : "blackwhite"
                },
                {
                    "id" : "darkblue",
                    "caption" : "darkblue"
                },
                {
                    "id" : "electricity",
                    "caption" : "electricity"
                },
                {
                    "id" : "lightblue",
                    "caption" : "lightblue"
                },
                {
                    "id" : "moonify",
                    "caption" : "moonify"
                },
                {
                    "id" : "orange",
                    "caption" : "orange"
                },
                {
                    "id" : "pink",
                    "caption" : "pink"
                },
                {
                    "id" : "red",
                    "caption" : "red"
                },
                {
                    "id" : "vista",
                    "caption" : "vista"
                }])
                .setValue("default")
                .afterUIValueSet("_ctl_comboinput61_afteruivalueset")
                );
            
            host.pane4.append(
                xui.create("xui.UI.Label")
                .setHost(host,"xui_ui_label3")
                .setLeft("19.1667em")
                .setTop("1em")
                .setWidth("8.33341em")
                .setHeight("2.5em")
                .setCaption("Font Size")
                .setFontSize("1.5em")
                .setFontWeight("bold")
                );
            
            host.pane4.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput32")
                .setDirtyMark(false)
                .setLeft("28.416700000000002em")
                .setTop("1.16667em")
                .setLabelSize("0em")
                .setLabelGap("0.3333333333333333em")
                .setType("listbox")
                .setItems([{
                    "id" : "12px",
                    "caption" : "12px"
                },
                {
                    "id" : "14px",
                    "caption" : "14 px"
                },
                {
                    "id" : "1rem",
                    "caption" : "1 rem"
                },
                {
                    "id" : "1.125rem",
                    "caption" : "1.125 rem"
                },
                {
                    "id" : "1.25rem",
                    "caption" : "1.25 rem"
                }])
                .setValue("12px")
                .afterUIValueSet("_xui_ui_comboinput32_afteruivalueset")
                );
            
            append(
                xui.create("xui.UI.Tabs")
                .setHost(host,"tabs2")
                .setItems([{
                    "id" : "1",
                    "caption" : "page 1",
                    "image" : "img/demo.gif",
                    "closeBtn" : true,
                    "popBtn" : true
                },
                {
                    "id" : "2",
                    "caption" : "page 2",
                    "image" : "img/demo.gif",
                    "closeBtn" : true,
                    "popBtn" : true
                },
                {
                    "id" : "3",
                    "caption" : "page 3"
                },
                {
                    "id" : "4",
                    "caption" : "page 4"
                },
                {
                    "id" : "5",
                    "caption" : "page 5"
                },
                {
                    "id" : "6",
                    "caption" : "page 6"
                },
                {
                    "id" : "7",
                    "caption" : "page 7"
                }])
                .setValue("1")
            );
            
            host.tabs2.append(
                xui.create("xui.UI.Pane")
                .setHost(host,"xui_ui_pane75")
                .setLeft("3.3333333333333335em")
                .setTop("1.6666666666666667em")
                .setWidth("17.5em")
                .setHeight("16.666666666666668em")
                , "7");
            
            host.tabs2.append(
                xui.create("xui.UI.Pane")
                .setHost(host,"xui_ui_pane77")
                .setLeft("1.6666666666666667em")
                .setTop("21.666666666666668em")
                .setWidth("27.5em")
                .setHeight("16.666666666666668em")
                , "7");
            
            host.tabs2.append(
                xui.create("xui.UI.SVGPaper")
                .setHost(host,"ctl_svgpaper1")
                .setLeft("0.8333333333333334em")
                .setTop("2.5em")
                .setWidth("63.333333333333336em")
                .setHeight("30.833333333333332em")
                , "7");
            
            host.ctl_svgpaper1.append(
                xui.create("xui.svg.path")
                .setHost(host,"ctl_path2")
                .setSvgTag("Shapes:Triangle")
                .setAttr({
                    "path" : "M,360,231L,390,171L,420,231Z",
                    "stroke" : "#004A7F",
                    "stroke-width" : 2,
                    "fill" : "39-#ffffff:0-#4B0082:100"
                }
                )
                .setShadow(true)
                );
            
            host.ctl_svgpaper1.append(
                xui.create("xui.svg.path")
                .setHost(host,"ctl_path1")
                .setSvgTag("Shapes:Line")
                .setAttr({
                    "path" : "M,70,91L,623,294",
                    "stroke" : "#004A7F",
                    "stroke-width" : 5,
                    "fill" : "none",
                    "stroke-dasharray" : "- ."
                }
                )
                );
            
            host.ctl_svgpaper1.append(
                xui.create("xui.svg.circle")
                .setHost(host,"ctl_circle1")
                .setSvgTag("Shapes:Circle")
                .setAttr({
                    "cx" : 51.5,
                    "cy" : 80.5,
                    "r" : 50.5,
                    "stroke" : "#004A7F",
                    "stroke-width" : 2,
                    "fill" : "r(0.5,0.5)#FFD700:0-#8A2BE2:29-#FF0000:65-#7FFF00:100"
                }
                )
                .setShadow(true)
                );
            
            host.ctl_svgpaper1.append(
                xui.create("xui.svg.ellipse")
                .setHost(host,"ctl_ellipse1")
                .setSvgTag("Shapes:Ellipse")
                .setAttr({
                    "cx" : 151,
                    "cy" : 121,
                    "rx" : 20,
                    "ry" : 40,
                    "stroke" : "#004A7F",
                    "stroke-width" : 2,
                    "fill-opacity" : 0.5,
                    "fill" : "#FFA500",
                    "transform" : "r18"
                }
                )
                .setShadow(true)
                );
            
            host.ctl_svgpaper1.append(
                xui.create("xui.svg.rect")
                .setHost(host,"ctl_rect1")
                .setSvgTag("Shapes:Rect")
                .setAttr({
                    "x" : 180,
                    "y" : 140,
                    "r" : 12,
                    "width" : 159,
                    "height" : 57,
                    "stroke" : "#004A7F",
                    "stroke-width" : 2,
                    "fill" : "none",
                    "transform" : "r116"
                }
                )
                .setShadow(true)
                );
            
            host.ctl_svgpaper1.append(
                xui.create("xui.svg.path")
                .setHost(host,"ctl_path3")
                .setSvgTag("Shapes:Start5points")
                .setAttr({
                    "path" : "M,505.363415104801,267.62455005945844L,471.1359565250479,291.3171120334797L,484.2197531635937,252.9919885428101L,450,229.29942656878887L,492.29888200665323,229.30676854646907L,503.54108418311887,196.35230172886935L,505.3749732290397,191L,518.4356536191075,229.29942656878887H,560.74609375L,526.5109297540877,252.9919885428101L,539.5985791007131,291.328125L,505.363415104801,267.62455005945844L,505.363415104801,267.62455005945844Z",
                    "stroke" : "#004A7F",
                    "stroke-width" : 2,
                    "fill" : "113-#ffffff:0-#7CFC00:100",
                    "cursor" : "pointer",
                    "opacity" : 0.5
                }
                )
                .setShadow(true)
                .onClick("_ctl_path3_onclick")
                );
            
            host.ctl_svgpaper1.append(
                xui.create("xui.svg.path")
                .setHost(host,"ctl_path4")
                .setSvgTag("Shapes:Bezier")
                .setAttr({
                    "path" : "M,556,270C,535.3877596103372,352,767.1708155364125,174,669,349",
                    "stroke" : "#8B0000",
                    "stroke-width" : 4,
                    "fill" : "none",
                    "stroke-linejoin" : "round",
                    "stroke-linecap" : "round",
                    "arrow-end" : "open-narrow-short",
                    "arrow-start" : "oval-midium-midium"
                }
                )
                .setShadow(true)
                );
            
            host.ctl_svgpaper1.append(
                xui.create("xui.svg.text")
                .setHost(host,"ctl_text1")
                .setSvgTag("Shapes:Text")
                .setAttr({
                    "x" : 392,
                    "y" : 34.5,
                    "text" : "xui svg shapes",
                    "font-size" : "34pt",
                    "font-weight" : "bold",
                    "font-family" : "arial black,avant garde",
                    "fill" : "8-#8B008B:0-#ADFF2F:29-#556B2F:68-#FF0000:100"
                }
                )
                );
            
            host.ctl_svgpaper1.append(
                xui.create("xui.svg.image")
                .setHost(host,"ctl_image1")
                .setAttr({
                    "src" : "http://www.crossui.com/img/logo.png",
                    "x" : 479.9999967285156,
                    "y" : 110,
                    "width" : 200.00120544433594,
                    "height" : 60
                }
                )
                );
            
            host.ctl_svgpaper1.append(
                xui.create("xui.svg.path")
                .setHost(host,"ctl_path90")
                .setSvgTag("Arrow:1")
                .setAttr({
                    "path" : "M,30,334.67153788042486C,30.046524097927033,326.4508018426711,29.970231295607995,318.21907778045613,30.38259100328144,310.0128000431346C,40.51503901983225,312.7123080867385,50.52798224881252,317.1293661799664,60.48969018511178,321.1015902478224C,61.02447713271653,317.0706317000202,60.7727666467984,313.7269037068743,61.23741809688556,310C,67.63723605718056,317.84243101129476,73.97934566077247,325.7965400925181,80.06153,334.1294178498871C,74.22626433256113,343.5817706789562,67.53300360255045,351.79048730825184,60.96201559200142,360.19629999999995C,60.749232507442684,356.2818358015243,60.53641079276652,352.3673999897642,60.32362434906713,348.45293579128855C,50.63895481914591,352.2399980450036,40.39709455309111,356.1554534129624,30.649808961985137,359.61755400977773C,29.986946379455276,351.6288982957808,30.00642939519367,342.92901815584435,30,334.67153788042486Z",
                    "stroke" : "#004A7F",
                    "stroke-width" : 2,
                    "fill" : "0-#BA55D3:0-#9400D3:57-#ffffff:100"
                }
                )
                );
            
            host.ctl_svgpaper1.append(
                xui.create("xui.svg.path")
                .setHost(host,"ctl_path91")
                .setSvgTag("Arrow:2")
                .setAttr({
                    "path" : "M,132.7279607332132,350.7241909422821L,140.65567894939448,341.11511391140783L,125.32782269565155,341.11511391140783L,110,341.11511391140783L,110,335.16664006710903L,110,329.2181601422794L,125.15198165236345,329.2181601422794C,133.48555981583135,329.2181601422794,140.3039515593949,328.91666310247314,140.3039515593949,328.54816469364414C,140.3039515593949,328.17967439218955,136.98638018359884,323.8555880054791,132.93157948668306,318.93908968961347L,125.55918392330724,310L,132.37353023894883,310L,139.1878513860218,310L,149.59486320986775,322.5953716456248L,160.00186999999994,335.1907372107189L,149.57489950127558,347.76200360535944L,139.14793235836035,360.33327L,131.97408324293468,360.33327L,124.80021734846326,360.33327L,132.72795737740404,350.7241889154385Z",
                    "stroke" : "#004A7F",
                    "stroke-width" : 2,
                    "fill" : "0-#BA55D3:0-#9400D3:57-#ffffff:100"
                }
                )
                );
            
            host.ctl_svgpaper1.append(
                xui.create("xui.svg.path")
                .setHost(host,"ctl_path92")
                .setSvgTag("Arrow:8")
                .setAttr({
                    "path" : "M,203.22863113865475,335.4999958557046L,193.78598438469646,326.05734739033716L,193.78598438469646,330.77867162302084L,190,330.77867162302084L,190,310L,210.77867162302084,310L,210.77867162302084,313.78598438469646L,206.05734567892802,313.78598438469646L,215.49999585570458,323.228634561473L,224.9426460324811,313.78598438469646L,220.22132008838827,313.78598438469646L,220.22132008838827,310L,240.99999000000003,310L,240.99999000000003,330.77867162302084L,237.21400390389442,330.77867162302084L,237.21400390389442,326.05734739033716L,227.77135543852705,335.4999958557046L,237.21400390389442,344.9426460324811L,237.21400390389442,340.22132008838827L,240.99999000000003,340.22132008838827L,240.99999000000003,360.99999L,220.22132008838827,360.99999L,220.22132008838827,357.2140039038944L,224.9426460324811,357.2140039038944L,215.49999585570458,347.7713588613453L,206.05734567892802,357.2140039038944L,210.77867162302084,357.2140039038944L,210.77867162302084,360.99999L,190,360.99999L,190,340.22132008838827L,193.78598438469646,340.22132008838827L,193.78598438469646,344.9426460324811L,203.22863113865475,335.4999958557046Z",
                    "stroke" : "#004A7F",
                    "stroke-width" : 2
                }
                )
                );
            
            host.ctl_svgpaper1.append(
                xui.create("xui.svg.path")
                .setHost(host,"ctl_path93")
                .setSvgTag("Arrow:10")
                .setAttr({
                    "path" : "M,297.6865925119343,315.5959191153157C,295.5067433274538,312.6916337820127,299.9067621879363,307.7769562280208,301.8847299680123,311.1247705494435C,303.57303939440544,314.026434440884,299.82024641629624,317.7156487679635,297.6865925119343,315.5959191153157ZM,303.52355085149935,322.2057084278075C,301.74223887250315,319.0081392314223,306.6163776862664,315.5918002959612,308.1582468067438,318.78590654908334C,309.98843195510676,322.1259493575727,305.04274413328585,325.9405102682537,303.52355085149935,322.2057084278075ZM,310.16851831646323,330.2030015493791C,307.9430942971635,328.3651336158047,310.15470960473374,324.12576712316354,312.4590518992836,324.5038611273865C,315.6599173642887,325.0998854317883,314.80445009054637,331.6074488241561,311.6825705242574,331.2884207932306C,311.0765526913951,331.2026742755315,310.5366367964151,330.7828269518228,310.16851831646323,330.2030015493791ZM,315.7267969720284,337.26427492572935C,313.86572311504534,334.3774961215606,318.15727900804154,330.5860579368604,319.9613733326874,333.33485319889735C,321.9236575404429,336.39257022504097,317.544311173475,340.4286110043081,315.7267969720284,337.26427492572935ZM,304.93343925364957,337.422572064167C,302.8645060778796,335.0332381503446,305.9013609699508,331.17262360052126,308.1861397958262,332.18035040257723C,311.50593803142,333.47676993507474,309.03777450964066,339.70986568317426,306.07504169850324,338.2938085765762C,305.66748521325934,338.05828305961535,305.3025146056434,337.73429677043833,304.93343925364957,337.422572064167ZM,296.1333288374587,337.422572064167C,293.7016481755131,334.65196376582884,298.14467217911204,330.1005900039461,300.22580462812385,332.998883764778C,302.3372881792023,336.01990266734873,298.3749047215801,340.3063561133519,296.1333288374587,337.422572064167ZM,287.4407532566852,337.26427492572935C,285.57853149136906,334.3783396854645,289.87243222804415,330.5847461846774,291.6747243873247,333.33597726326803C,293.6314381120796,336.3985597350087,289.26430116187356,340.4272105644775,287.4407532566852,337.26427492572935ZM,279.16168164497833,337.422572064167C,276.7300026736194,334.65196376582884,281.173028367805,330.1005900039461,283.25416250740346,332.998883764778C,285.3656409867219,336.01990266734873,281.4032592196864,340.3063561133519,279.1616816449784,337.422572064167ZM,270.4698363976362,337.26671074228307C,268.3360658427956,333.86048013614413,274.10691886330505,330.1431827623289,275.0690469391684,334.4162505610556C,275.780379867181,337.27588063254353,271.92802993203986,339.7660317766457,270.4698363976362,337.26671074228307ZM,309.81609186176513,344.8381649676748C,307.7426701784484,342.21358809986174,311.43051250818166,337.62851303189336,313.6432030288591,340.01737875743663C,316.375738799848,342.3971591553601,312.75508038345095,347.9110455190535,310.24636306919285,345.3663205341297C,310.1048728009784,345.1879923623565,309.9598880901655,345.01377888493096,309.81609186176513,344.8381649676748ZM,303.52355085149935,351.3464770487885C,301.77569558223945,348.30486404944514,306.3187397636115,344.9665042437566,307.959820961445,347.81883717810064C,310.1004992533237,350.8487454704651,305.8009621007688,354.97690590303745,303.8210721236756,351.94999030315347L,303.52355085149935,351.3464770487885ZM,297.8950300113543,359.4407511442555C,296.0066447270953,357.3331943868658,298.6005337966094,354.01383230029325,300.6561924860302,354.57839930234394C,303.78512517980886,355.5631869412246,301.8133703056591,361.68517150441323,298.9434439390738,360.5233633209355C,298.4987520275505,360.33697694825184,298.1379199760455,359.92284688405783,297.8950300113543,359.4407511442555Z",
                    "stroke" : "#004A7F",
                    "stroke-width" : 2
                }
                )
                );
            
            host.ctl_svgpaper1.append(
                xui.create("xui.svg.path")
                .setHost(host,"ctl_path94")
                .setSvgTag("Arrow:14")
                .setAttr({
                    "path" : "M,739.9999700000001,147.86310376825102C,739.9999700000001,139.31401601179178,717.6142160771885,132.38360149008616,690,132.38360149008616L,690,120L,690,120C,717.6142160771885,120,739.9999700000001,126.93040787279116,739.9999700000001,135.47950227816486L,739.9999700000001,147.86310376825102C,739.9999700000001,154.9217309694127,724.5759021983312,161.08641162355218,702.4999920805371,162.8510684238426L,702.4999920805371,169.04287L,690,157.1508061324871L,702.4999920805371,144.27566701982767L,702.4999920805371,150.46746859598505L,702.4999920805371,150.46746859598505C,717.3859460569422,149.27754894693675,729.6760724704593,146.03362503881556,735.8257355071358,141.67130551655086",
                    "stroke" : "#004A7F",
                    "stroke-width" : 2
                }
                )
                );
            
            host.ctl_svgpaper1.append(
                xui.create("xui.svg.path")
                .setHost(host,"ctl_path95")
                .setSvgTag("Arrow:4")
                .setAttr({
                    "path" : "M,387.94246499385395,335.4971668450056L,360,310L,410.24145,335.4971668450056L,360,360.99432L,387.94246499385395,335.4971668450056Z",
                    "stroke" : "#004A7F",
                    "stroke-width" : 2
                }
                )
                );
            
            host.ctl_svgpaper1.append(
                xui.create("xui.svg.path")
                .setHost(host,"ctl_path96")
                .setSvgTag("Arrow:15")
                .setAttr({
                    "path" : "M,570,89.99995999999999L,570,61.874983758388424L,570,61.874983758388424C,570,49.79376529166245,579.7937636138113,40,591.8749854362396,40L,591.8749854362396,40L,591.8749854362396,40C,597.676590634094,40,603.240578540483,42.3046796736617,607.3429382253528,46.40703432497776C,611.44529455452,50.50938897629382,613.7499691946281,56.0733768826828,613.7499691946281,61.874983758388424L,613.7499691946281,64.99998167785122L,619.99996,64.99998167785122L,607.4999767114049,77.49997671140491L,594.9999816778512,64.99998167785122L,601.2499775167769,64.99998167785122L,601.2499775167769,61.874983758388424C,601.2499775167769,56.69731942029925,597.0526480964776,52.499993355702465,591.8749871140909,52.499993355702465L,591.8749871140909,52.499993355702465L,591.8749871140909,52.499993355702465C,586.6973194202992,52.499993355702465,582.4999933557025,56.69731942029925,582.4999933557025,61.874983758388424L,582.4999933557025,89.99995999999999Z",
                    "stroke" : "#004A7F",
                    "stroke-width" : 2,
                    "fill" : "0-#BA55D3:0-#9400D3:57-#ffffff:100"
                }
                )
                .setShadow(true)
                );
            
            host.tabs2.append(
                xui.create("xui.UI.Group")
                .setHost(host,"xui_ui_group18")
                .setLeft("15.833333333333334em")
                .setTop("23.333299999999998em")
                .setWidth("15em")
                .setHeight("8.333333333333334em")
                .setCaption("Group")
                .setToggle(false)
                , "2");
            
            host.xui_ui_group18.append(
                xui.create("xui.UI.ProgressBar")
                .setHost(host,"xui_ui_progressbar44")
                .setLeft("0.8333333333333334em")
                .setTop("0.8333333333333334em")
                .setWidth("12.5em")
                .setHeight("5em")
                .setValue(50)
                );
            
            host.tabs2.append(
                xui.create("xui.UI.Group")
                .setHost(host,"xui_ui_group19")
                .setLeft("15.833333333333334em")
                .setTop("2.75em")
                .setWidth("26.6662em")
                .setHeight("8.333333333333334em")
                .setCaption("Group")
                , "2");
            
            host.xui_ui_group19.append(
                xui.create("xui.UI.Button")
                .setHost(host,"xui_ui_button5")
                .setLeft("1.6666666666666667em")
                .setTop("1.6666666666666667em")
                .setCaption("xui_ui_button5")
                );
            
            host.tabs2.append(
                xui.create("xui.UI.Group")
                .setHost(host,"xui_ui_group20")
                .setLeft("15.833333333333334em")
                .setTop("12.75em")
                .setWidth("26.6662em")
                .setHeight("8.333333333333334em")
                .setCaption("Group")
                , "2");
            
            host.xui_ui_group20.append(
                xui.create("xui.Module.JSONEditor", "xui.Module")
                .setHost(host,"xui_module_jsoneditor2")
                );
            
            host.tabs2.append(
                xui.create("xui.UI.Pane")
                .setHost(host,"pane16")
                .setDock("top")
                .setDockStretch("fixed")
                .setLeft("0.8333333333333334em")
                .setWidth("66.66666666666667em")
                .setHeight("11em")
                , "3");
            
            host.pane16.append(
                xui.create("xui.UI.MenuBar")
                .setHost(host,"menubar2")
                .setItems([{
                    "id" : "menu1",
                    "sub" : [{
                        "id" : "normal",
                        "caption" : "normal"
                    },
                    {
                        "id" : "disabled",
                        "caption" : "disabled",
                        "disabled" : true
                    },
                    {
                        "id" : "image",
                        "caption" : "iimage"
                    },
                    {
                        "id" : "sub menu 1",
                        "caption" : "sub menu 1",
                        "sub" : [{
                            "id" : "sub 1",
                            "type" : "radiobox"
                        },
                        {
                            "id" : "sub 2",
                            "type" : "radiobox"
                        },
                        {
                            "id" : "sub 3"
                        }]
                    },
                    {
                        "id" : "sub menu 2",
                        "caption" : "sub menu 2",
                        "sub" : ["sub 3","sub 4"]
                    },
                    {
                        "type" : "split"
                    },
                    {
                        "id" : "checkbox 1",
                        "caption" : "checkbox 1",
                        "type" : "checkbox"
                    },
                    {
                        "id" : "checkbox 2",
                        "caption" : "checkbox 2",
                        "type" : "checkbox"
                    },
                    {
                        "type" : "split"
                    },
                    {
                        "id" : "date",
                        "caption" : "date ",
                        "sub" : true
                    },
                    {
                        "id" : "time",
                        "caption" : "time ",
                        "sub" : true
                    },
                    {
                        "id" : "color",
                        "caption" : "color ",
                        "sub" : true
                    },
                    {
                        "id" : "customized pop",
                        "caption" : "customized pop",
                        "sub" : true
                    }],
                    "caption" : "advanced pop"
                },
                {
                    "id" : "lots items",
                    "sub" : ["item 1","item 2","item 3","item 4","item 5","item 6","item 7","item 8","item 9","item 10","item 11","item 12","item 13","item 14","item 15","item 16","item 17","item 18","item 19"],
                    "caption" : "more items"
                }])
                .setLeft("auto")
                .onShowSubMenu("_menubar2_onshowsubmenu")
                .onMenuSelected("_menubar2_onmenuselected")
                );
            
            host.pane16.append(
                xui.create("xui.UI.ToolBar")
                .setHost(host,"toolbar5")
                .setItems([{
                    "id" : "grp1",
                    "sub" : [{
                        "id" : "a",
                        "label" : "normal button:",
                        "caption" : "button"
                    },
                    {
                        "id" : "b",
                        "label" : "image button:",
                        "caption" : "button",
                        "image" : "img/demo.gif"
                    },
                    {
                        "id" : "c",
                        "label" : "image only:",
                        "image" : "img/demo.gif",
                        "caption" : ""
                    },
                    {
                        "id" : "btn",
                        "object" : new xui.UI.CheckBox({
                            "alias" : "xui_ui_checkbox1",
                            "key" : "xui.UI.CheckBox",
                            "properties" : {
                                "caption" : "checkbox",
                                "position" : "relative"
                            },
                            "CC" : {
                                "KEY" : " xui-toolbar-item-object"
                            }
                        })
                    }],
                    "caption" : "grp1"
                },
                {
                    "id" : "grp2",
                    "sub" : [{
                        "id" : "d",
                        "label" : "status button:",
                        "caption" : "status",
                        "type" : "statusButton"
                    },
                    {
                        "id" : "e",
                        "label" : "drop button:",
                        "caption" : "drop",
                        "type" : "dropButton"
                    },
                    {
                        "type" : "split"
                    },
                    {
                        "id" : "clr",
                        "object" : new xui.UI.ComboInput({
                            "alias" : "xui_ui_comboinput6",
                            "key" : "xui.UI.ComboInput",
                            "properties" : {
                                "type" : "color",
                                "position" : "relative",
                                "labelSize" : "0em"
                            },
                            "CC" : {
                                "KEY" : " xui-toolbar-item-object"
                            }
                        })
                    },
                    {
                        "type" : "split"
                    },
                    {
                        "id" : "date",
                        "object" : new xui.UI.ComboInput({
                            "alias" : "xui_ui_comboinput7",
                            "key" : "xui.UI.ComboInput",
                            "properties" : {
                                "type" : "date",
                                "position" : "relative",
                                "labelSize" : "0em"
                            },
                            "CC" : {
                                "KEY" : " xui-toolbar-item-object"
                            }
                        })
                    },
                    {
                        "type" : "split"
                    },
                    {
                        "id" : "date",
                        "object" : new xui.UI.ComboInput({
                            "alias" : "xui_ui_comboinput8",
                            "key" : "xui.UI.ComboInput",
                            "properties" : {
                                "type" : "time",
                                "position" : "relative",
                                "labelSize" : "0em"
                            },
                            "CC" : {
                                "KEY" : " xui-toolbar-item-object"
                            }
                        })
                    }],
                    "caption" : "grp2"
                },
                {
                    "id" : "grp3",
                    "sub" : [{
                        "id" : "radio",
                        "object" : new xui.UI.ProgressBar({
                            "alias" : "xui_ui_progressbar2",
                            "key" : "xui.UI.ProgressBar",
                            "properties" : {
                                "value" : 75,
                                "position" : "relative"
                            },
                            "CC" : {
                                "KEY" : " xui-toolbar-item-object"
                            }
                        })
                    },
                    {
                        "id" : "btn",
                        "object" : new xui.UI.Button({
                            "alias" : "xui_ui_button4",
                            "key" : "xui.UI.Button",
                            "properties" : {
                                "caption" : "status button",
                                "type" : "status",
                                "position" : "relative"
                            },
                            "CC" : {
                                "KEY" : " xui-toolbar-item-object"
                            }
                        })
                    },
                    {
                        "id" : "btn2",
                        "object" : new xui.UI.Button({
                            "alias" : "xui_ui_button6",
                            "key" : "xui.UI.Button",
                            "properties" : {
                                "caption" : "drop button",
                                "type" : "drop",
                                "position" : "relative"
                            },
                            "CC" : {
                                "KEY" : " xui-toolbar-item-object"
                            }
                        })
                    }],
                    "caption" : "grp3"
                },
                {
                    "id" : "grp4",
                    "sub" : [{
                        "id" : "radio",
                        "object" : new xui.UI.RadioBox({
                            "alias" : "xui_ui_radiobox1",
                            "key" : "xui.UI.RadioBox",
                            "properties" : {
                                "width" : "auto",
                                "height" : "auto",
                                "items" : [{
                                    "id" : "radio1",
                                    "caption" : "radio1"
                                },
                                {
                                    "id" : "radio2",
                                    "caption" : "radio2"
                                },
                                {
                                    "id" : "radio3",
                                    "caption" : "radio3"
                                },
                                {
                                    "id" : "radio4",
                                    "caption" : "radio4"
                                }],
                                "position" : "relative",
                                "labelSize" : "0em"
                            },
                            "events" : {
                                "onRender" : function (prf){
                                    prf.getRoot().setInlineBlock();
                                }
                            },
                            "CC" : {
                                "KEY" : " xui-toolbar-item-object"
                            }
                        })
                    }],
                    "caption" : "grp4"
                }])
                .setLeft("auto")
                .onClick("_toolbar5_onclick")
                );
            
            host.tabs2.append(
                xui.create("xui.UI.Panel")
                .setHost(host,"xui_ui_panel25")
                .setDock("none")
                .setLeft("0.833333em")
                .setTop("26.583299999999998em")
                .setWidth("17.4999em")
                .setHeight("15.9166em")
                .setZIndex(1)
                .setCaption("panel sample")
                .setOptBtn(true)
                .setToggleBtn(true)
                .setCloseBtn(true)
                .setPopBtn(true)
                , "4");
            
            host.xui_ui_panel25.append(
                xui.create("xui.UI.Stacks")
                .setHost(host,"xui_ui_stacks20")
                .setItems([{
                    "id" : "a",
                    "caption" : "page1",
                    "image" : "{xui.ini.img_icon}"
                },
                {
                    "id" : "b",
                    "caption" : "page2",
                    "image" : "{xui.ini.img_icon}"
                },
                {
                    "id" : "c",
                    "caption" : "page3",
                    "image" : "{xui.ini.img_icon}"
                }])
                .setLeft("0em")
                .setTop("0em")
                .setBorderType("none")
                .setValue("a")
                );
            
            host.xui_ui_stacks20.append(
                xui.create("xui.UI.Button")
                .setHost(host,"xui_ui_button80")
                .setLeft("2.5em")
                .setTop("1.6666666666666667em")
                .setCaption("Drop Button'")
                .setType("drop")
                , "a");
            
            host.tabs2.append(
                xui.create("xui.UI.Pane")
                .setHost(host,"xui_ui_pane76")
                .setLeft("31.666666666666668em")
                .setTop("20em")
                .setWidth("24.166666666666668em")
                .setHeight("16.666666666666668em")
                , "7");
            
            host.tabs2.append(
                xui.create("xui.UI.Div")
                .setHost(host,"div11")
                .setLeft("2.5em")
                .setTop("0.8333333333333334em")
                .setWidth("5.833333333333333em")
                .setHeight("2.5em")
                .setHtml("div")
                , "1");
            
            host.tabs2.append(
                xui.create("xui.UI.Span")
                .setHost(host,"xui_ui_span5")
                .setLeft("6.666666666666667em")
                .setTop("0.75em")
                .setWidth("2.1666666666666665em")
                .setHeight("1.3333333333333333em")
                .setHtml("span")
                , "1");
            
            host.tabs2.append(
                xui.create("xui.UI.FusionChartsXT")
                .setHost(host,"xui_ui_fusionchartsxt4")
                .setLeft("46.6667em")
                .setTop("25em")
                .setWidth("19.1671em")
                .setHeight("17.5003em")
                .setChartType("Thermometer")
                .setJSONData({
                    "chart" : {
                        "caption" : "Central cold storage",
                        "subcaption" : "Bakersfield Central",
                        "subcaptionFontBold" : "0",
                        "lowerLimit" : "-20",
                        "upperLimit" : "20",
                        "numberSuffix" : "°C",
                        "bgColor" : "#ffffff",
                        "showBorder" : "0",
                        "thmFillColor" : "#008ee4"
                    },
                    "value" : "-10"
                }
                )
                , "6");
            
            host.tabs2.append(
                xui.create("xui.UI.FusionChartsXT")
                .setHost(host,"xui_ui_fusionchartsxt14")
                .setLeft("27.5em")
                .setTop("24.916700000000002em")
                .setWidth("15.0006em")
                .setHeight("17.5836em")
                .setChartType("Cylinder")
                .setJSONData({
                    "chart" : {
                        "caption" : "Fuel Meter",
                        "subcaption" : "Diesel level in generator Bakersfield Central",
                        "subcaptionFontBold" : "0",
                        "lowerLimit" : "0",
                        "upperLimit" : "120",
                        "lowerLimitDisplay" : "Empty",
                        "upperLimitDisplay" : "Full",
                        "numberSuffix" : " ltrs",
                        "showValue" : "0",
                        "showhovereffect" : "1",
                        "bgCOlor" : "#ffffff",
                        "borderAlpha" : "0",
                        "cylFillColor" : "#008ee4"
                    },
                    "value" : "110"
                }
                )
                , "6");
            
            host.tabs2.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block56")
                .setLeft("0.833333em")
                .setTop("1.58333em")
                .setWidth("21.667em")
                .setHeight("22.5835em")
                .setBorderType("flat")
                .setOverflow("overflow-y:auto")
                , "6");
            
            host.xui_ui_block56.append(
                xui.create("xui.UI.FoldingTabs")
                .setHost(host,"xui_ui_foldingtabs8")
                .setItems([{
                    "id" : "a",
                    "caption" : "tab1",
                    "message" : "normal"
                },
                {
                    "id" : "b",
                    "caption" : "tab2",
                    "message" : "with image",
                    "image" : "img/demo.gif"
                },
                {
                    "id" : "c",
                    "caption" : "tab3",
                    "message" : "height:100",
                    "height" : 100
                },
                {
                    "id" : "d",
                    "caption" : "tab4",
                    "message" : "with commands",
                    "closeBtn" : true,
                    "optBtn" : true,
                    "popBtn" : true
                }])
                .setValue("a")
                );
            
            host.tabs2.append(
                xui.create("xui.UI.FoldingList")
                .setHost(host,"xui_ui_foldinglist17")
                .setItems([{
                    "id" : "a",
                    "caption" : "tab1",
                    "title" : "title1",
                    "text" : "text1"
                },
                {
                    "id" : "b",
                    "caption" : "tab2",
                    "title" : "title2",
                    "text" : "text2"
                },
                {
                    "id" : "c",
                    "caption" : "tab3",
                    "title" : "title3",
                    "text" : "text3"
                },
                {
                    "id" : "d",
                    "caption" : "tab4",
                    "title" : "title4",
                    "text" : "text4"
                },
                {
                    "id" : "e",
                    "caption" : "tab5",
                    "title" : "title5",
                    "text" : "text5"
                }])
                .setLeft("45em")
                .setTop("1.41667em")
                .setWidth("20.833333333333332em")
                .setHeight("22.333em")
                .setTagCmds(["#","x"])
                .setLabelSize("0em")
                , "6");
            
            host.tabs2.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block98")
                .setLeft("24.166700000000002em")
                .setTop("1.58333em")
                .setWidth("19.9996em")
                .setHeight("22.582800000000002em")
                .setBorderType("flat")
                , "6");
            
            host.xui_ui_block98.append(
                xui.create("xui.UI.TreeView")
                .setHost(host,"xui_ui_treeview10")
                .setItems([{
                    "id" : "node1",
                    "sub" : ["node11",{
                        "id" : "node12",
                        "image" : "{xui.ini.img_icon}"
                    },
                    "node13","node14"],
                    "caption" : "node1"
                },
                {
                    "id" : "node2",
                    "iniFold" : false,
                    "caption" : "node2",
                    "sub" : [{
                        "id" : "node21",
                        "caption" : "node21"
                    },
                    {
                        "id" : "node22",
                        "caption" : "node22"
                    },
                    {
                        "id" : "node23",
                        "caption" : "node23"
                    },
                    {
                        "id" : "node24",
                        "caption" : "node24"
                    }]
                }])
                .setLeft("0em")
                .setTop("0em")
                .setSelMode("multibycheckbox")
                .setValue("a")
                );
            
            host.tabs2.append(
                xui.create("xui.UI.Button")
                .setHost(host,"xui_ui_button229")
                .setLeft("0.8333333333333334em")
                .setTop("11em")
                .setWidth("12.5em")
                .setHeight("4.583333333333333em")
                .setImage("img/demo.gif")
                .setCaption("HTML content </br> in button")
                , "2");
            
            host.tabs2.append(
                xui.create("xui.UI.Button")
                .setHost(host,"xui_ui_button230")
                .setLeft("0.8333333333333334em")
                .setTop("16.6667em")
                .setWidth("12.5em")
                .setCaption("status button")
                .setType("status")
                , "2");
            
            host.tabs2.append(
                xui.create("xui.UI.Button")
                .setHost(host,"xui_ui_button231")
                .setLeft("0.8333333333333334em")
                .setTop("0.75em")
                .setCaption("Button (auto width)")
                , "2");
            
            host.tabs2.append(
                xui.create("xui.UI.Button")
                .setHost(host,"xui_ui_button232")
                .setLeft("0.8333333333333334em")
                .setTop("4.16667em")
                .setWidth("12.5em")
                .setCaption("Button - align left")
                .setHAlign("left")
                , "2");
            
            host.tabs2.append(
                xui.create("xui.UI.Button")
                .setHost(host,"xui_ui_button233")
                .setLeft("0.8333333333333334em")
                .setTop("7.5em")
                .setWidth("12.5em")
                .setCaption("Button - align center")
                , "2");
            
            host.tabs2.append(
                xui.create("xui.UI.CheckBox")
                .setHost(host,"xui_ui_checkbox43")
                .setLeft("1.6666666666666667em")
                .setTop("30em")
                .setWidth("11em")
                .setCaption("Checkbox")
                , "2");
            
            host.tabs2.append(
                xui.create("xui.UI.ProgressBar")
                .setHost(host,"xui_ui_progressbar43")
                .setLeft("15.833333333333334em")
                .setTop("0.75em")
                .setWidth("49.999em")
                .setValue(80)
                , "2");
            
            host.tabs2.append(
                xui.create("xui.UI.RichEditor")
                .setHost(host,"xui_ui_richeditor14")
                .setLeft("32.5em")
                .setTop("25.833333333333332em")
                .setHeight("15em")
                .setLabelSize("1.6666666666666667em")
                .setLabelPos("top")
                .setLabelCaption("Rich Editor")
                .setLabelHAlign("left")
                , "2");
            
            host.tabs2.append(
                xui.create("xui.UI.StatusButtons")
                .setHost(host,"xui_ui_statusbuttons18")
                .setItems([{
                    "id" : "a",
                    "caption" : "link list a",
                    "disabled" : true
                },
                {
                    "id" : "b",
                    "caption" : "link list v"
                },
                {
                    "id" : "c",
                    "caption" : "link list c"
                },
                {
                    "id" : "d",
                    "caption" : "link list d"
                }])
                .setLeft("1.6666666666666667em")
                .setTop("34.916666666666664em")
                .setWidth("25.833333333333332em")
                .setHeight("4.25em")
                .setBorderType("none")
                .setLabelSize("0em")
                , "2");
            
            host.tabs2.append(
                xui.create("xui.UI.PageBar")
                .setHost(host,"xui_ui_pagebar18")
                .setLeft("1.6666666666666667em")
                .setTop("39.166666666666664em")
                .setWidth("29.166666666666668em")
                .setHeight("2.5em")
                .setValue("1:100:200")
                , "2");
            
            host.tabs2.append(
                xui.create("xui.UI.Gallery")
                .setHost(host,"xui_ui_gallery18")
                .setItems([{
                    "id" : "a",
                    "caption" : "item a",
                    "image" : "img/demo.gif"
                },
                {
                    "id" : "b",
                    "caption" : "item b",
                    "image" : "img/demo.gif"
                },
                {
                    "id" : "c",
                    "caption" : "item c",
                    "image" : "img/demo.gif"
                }])
                .setLeft("44.166599999999995em")
                .setTop("15em")
                .setWidth("21.666700000000002em")
                .setHeight("11em")
                .setLabelSize("0em")
                , "2");
            
            host.tabs2.append(
                xui.create("xui.UI.IconList")
                .setHost(host,"xui_ui_iconlist19")
                .setItems([{
                    "id" : "a",
                    "caption" : "a",
                    "image" : "img/demo.gif"
                },
                {
                    "id" : "b",
                    "caption" : "b",
                    "image" : "img/demo.gif"
                },
                {
                    "id" : "c",
                    "caption" : "c",
                    "image" : "img/demo.gif"
                }])
                .setLeft("44.166599999999995em")
                .setTop("3.33333em")
                .setWidth("21.6662em")
                .setHeight("11em")
                .setLabelSize("0em")
                , "2");
            
            host.tabs2.append(
                xui.create("xui.UI.Button")
                .setHost(host,"xui_ui_button109")
                .setLeft("0.833333em")
                .setTop("20.8333em")
                .setWidth("12.4713em")
                .setCaption("Drop Button")
                .setType("drop")
                , "2");
            
            host.tabs2.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput243")
                .setLeft("0.833333em")
                .setTop("25em")
                .setWidth("12.499900000000002em")
                .setHeight("1.74667em")
                .setLabelSize("0em")
                .setType("dropbutton")
                .setValue("Drop Button 2")
                , "2");
            
            host.tabs2.append(
                xui.create("xui.UI.RadioBox")
                .setHost(host,"xui_ui_radiobox24")
                .setItems([{
                    "id" : "1",
                    "image" : "img/demo.gif",
                    "caption" : "radio 1"
                },
                {
                    "id" : "2",
                    "image" : "img/demo.gif",
                    "caption" : "radio 2"
                },
                {
                    "id" : "3",
                    "caption" : "radio 3"
                },
                {
                    "id" : "4",
                    "caption" : "radio 4"
                },
                {
                    "id" : "5",
                    "caption" : "radio 5"
                }])
                .setLeft("0.833333em")
                .setTop("24.833299999999998em")
                .setHeight("17.6662em")
                .setLabelSize("0em")
                , "6");
            
            host.tabs2.append(
                xui.create("xui.UI.RadioBox")
                .setHost(host,"xui_ui_radiobox26")
                .setItems([{
                    "id" : "1",
                    "image" : "img/demo.gif",
                    "caption" : "radio 1"
                },
                {
                    "id" : "2",
                    "image" : "img/demo.gif",
                    "caption" : "radio 2"
                },
                {
                    "id" : "3",
                    "caption" : "radio 3"
                },
                {
                    "id" : "4",
                    "caption" : "radio 4"
                },
                {
                    "id" : "5",
                    "caption" : "radio 5"
                }])
                .setLeft("13.3333em")
                .setTop("25em")
                .setHeight("17.6662em")
                .setSelMode("multibycheckbox")
                .setLabelSize("0em")
                .setCheckBox(true)
                , "6");
            
            host.tabs2.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block138")
                .setLeft("0.8333333333333334em")
                .setTop("12em")
                .setWidth("23.333333333333332em")
                .setHeight("19.166666666666668em")
                .setBorderType("groove")
                , "3");
            
            host.xui_ui_block138.append(
                xui.create("xui.UI.TreeBar")
                .setHost(host,"xui_ui_treebar16")
                .setItems([{
                    "id" : "a",
                    "caption" : "tree<br/> item <br/>a",
                    "image" : "img/demo.gif"
                },
                {
                    "id" : "b",
                    "caption" : "tree item b",
                    "image" : "img/demo.gif",
                    "disabled" : true
                },
                {
                    "id" : "c",
                    "caption" : "tree item c",
                    "image" : "img/demo.gif",
                    "disabled" : true
                },
                {
                    "id" : "d",
                    "caption" : "tree d",
                    "sub" : [{
                        "id" : "sub d a"
                    },
                    {
                        "id" : "sub d b"
                    },
                    {
                        "id" : "sub d c"
                    }]
                },
                {
                    "id" : "e",
                    "caption" : "tree group e",
                    "group" : true,
                    "sub" : [{
                        "id" : "sub e 1",
                        "caption" : "sub e 1"
                    },
                    {
                        "id" : "sub e 2",
                        "caption" : "sub e 2"
                    }]
                },
                {
                    "id" : "f",
                    "caption" : "tree group f",
                    "group" : true,
                    "iniFold" : false,
                    "sub" : [{
                        "id" : "sub f 1",
                        "caption" : "sub f 1"
                    },
                    {
                        "id" : "sub f 2",
                        "caption" : "sub f 2"
                    }]
                }])
                .setPosition("relative")
                );
            
            host.tabs2.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block139")
                .setLeft("25em")
                .setTop("12em")
                .setWidth("20.833333333333332em")
                .setHeight("19.25em")
                .setBorderType("groove")
                , "3");
            
            host.xui_ui_block139.append(
                xui.create("xui.UI.TreeView")
                .setHost(host,"xui_ui_treeview26")
                .setItems([{
                    "id" : "node1",
                    "caption" : "node1",
                    "sub" : [{
                        "id" : "node11"
                    },
                    {
                        "id" : "node12",
                        "image" : "img/demo.gif"
                    },
                    {
                        "id" : "node13"
                    },
                    {
                        "id" : "node14"
                    }]
                },
                {
                    "id" : "node2",
                    "caption" : "node2",
                    "iniFold" : false,
                    "sub" : [{
                        "id" : "node21",
                        "caption" : "node21"
                    },
                    {
                        "id" : "node22",
                        "caption" : "node22"
                    },
                    {
                        "id" : "node23",
                        "caption" : "node23",
                        "disabled" : true
                    },
                    {
                        "id" : "node24",
                        "caption" : "node24"
                    }]
                }])
                .setLeft("7.5em")
                .setTop("9.166666666666666em")
                );
            
            host.tabs2.append(
                xui.create("xui.UI.FoldingList")
                .setHost(host,"xui_ui_foldinglist40")
                .setItems([{
                    "id" : "a",
                    "caption" : "caption a",
                    "title" : "title a",
                    "text" : "detail 1"
                },
                {
                    "id" : "b",
                    "caption" : "caption b",
                    "title" : "title b"
                },
                {
                    "id" : "c",
                    "caption" : "caption c",
                    "title" : "title c",
                    "text" : "detail 2"
                }])
                .setLeft("0.8333333333333334em")
                .setTop("32.416666666666664em")
                .setWidth("44.666666666666664em")
                .setHeight("9.25em")
                .setTagCmds([{
                    "id" : "cmd_1",
                    "caption" : "cmd 1"
                },
                {
                    "id" : "cmd_2",
                    "caption" : "cmd 2"
                }])
                .setLabelSize("0em")
                , "3");
            
            host.tabs2.append(
                xui.create("xui.UI.List")
                .setHost(host,"xui_ui_list139")
                .setItems([{
                    "imageClass" : "xui-icon-none",
                    "caption" : "xui-icon-none",
                    "id" : "er"
                },
                {
                    "imageClass" : "xui-ui-busy",
                    "caption" : "xui-ui-busy",
                    "id" : "es"
                },
                {
                    "imageClass" : "xui-icon-empty",
                    "caption" : "xui-icon-empty",
                    "id" : "et"
                },
                {
                    "imageClass" : "xui-uicmd-helpinput",
                    "caption" : "xui-uicmd-helpinput",
                    "id" : "eu"
                },
                {
                    "imageClass" : "xui-icon-zoomin",
                    "caption" : "xui-icon-zoomin",
                    "id" : "ev"
                },
                {
                    "imageClass" : "xui-icon-zoomout",
                    "caption" : "xui-icon-zoomout",
                    "id" : "ew"
                },
                {
                    "imageClass" : "xui-icon-bullet",
                    "caption" : "xui-icon-bullet",
                    "id" : "ex"
                },
                {
                    "imageClass" : "xui-icon-minus",
                    "caption" : "xui-icon-minus",
                    "id" : "ey"
                },
                {
                    "imageClass" : "xui-uicmd-add",
                    "caption" : "xui-uicmd-add",
                    "id" : "ez"
                },
                {
                    "imageClass" : "xui-icon-star",
                    "caption" : "xui-icon-star",
                    "id" : "fa"
                },
                {
                    "imageClass" : "xui-icon-dragmove",
                    "caption" : "xui-icon-dragmove",
                    "id" : "fb"
                },
                {
                    "imageClass" : "xui-uicmd-check",
                    "caption" : "xui-uicmd-check",
                    "id" : "fc"
                },
                {
                    "imageClass" : "xui-uicmd-date",
                    "caption" : "xui-uicmd-date",
                    "id" : "fd"
                },
                {
                    "imageClass" : "xui-icon-number",
                    "caption" : "xui-icon-number",
                    "id" : "fe"
                },
                {
                    "imageClass" : "xui-uicmd-pop",
                    "caption" : "xui-uicmd-pop",
                    "id" : "ff"
                },
                {
                    "imageClass" : "xui-icon-mouse",
                    "caption" : "xui-icon-mouse",
                    "id" : "fg"
                },
                {
                    "imageClass" : "xui-icon-prev",
                    "caption" : "xui-icon-prev",
                    "id" : "fh"
                },
                {
                    "imageClass" : "xui-icon-question",
                    "caption" : "xui-icon-question",
                    "id" : "fi"
                },
                {
                    "imageClass" : "xui-icon-loading",
                    "caption" : "xui-icon-loading",
                    "id" : "fj"
                },
                {
                    "imageClass" : "xui-icon-indent",
                    "caption" : "xui-icon-indent",
                    "id" : "fk"
                },
                {
                    "imageClass" : "xui-icon-outdent",
                    "caption" : "xui-icon-outdent",
                    "id" : "fl"
                },
                {
                    "imageClass" : "xui-icon-strikethrough",
                    "caption" : "xui-icon-strikethrough",
                    "id" : "fm"
                },
                {
                    "imageClass" : "xui-icon-inserthr",
                    "caption" : "xui-icon-inserthr",
                    "id" : "fn"
                },
                {
                    "imageClass" : "xui-uicmd-remove",
                    "caption" : "xui-uicmd-remove",
                    "id" : "fo"
                },
                {
                    "imageClass" : "xui-icon-super",
                    "caption" : "xui-icon-super",
                    "id" : "fp"
                },
                {
                    "imageClass" : "xui-icon-sub",
                    "caption" : "xui-icon-sub",
                    "id" : "fq"
                },
                {
                    "imageClass" : "xui-icon-alignjustify",
                    "caption" : "xui-icon-alignjustify",
                    "id" : "fr"
                },
                {
                    "imageClass" : "xui-icon-alignright",
                    "caption" : "xui-icon-alignright",
                    "id" : "fs"
                },
                {
                    "imageClass" : "xui-uicmd-arrowdrop",
                    "caption" : "xui-uicmd-arrowdrop",
                    "id" : "ft"
                },
                {
                    "imageClass" : "xui-icon-upload",
                    "caption" : "xui-icon-upload",
                    "id" : "fu"
                },
                {
                    "imageClass" : "xui-icon-formatbrush",
                    "caption" : "xui-icon-formatbrush",
                    "id" : "fv"
                },
                {
                    "imageClass" : "xui-refresh",
                    "caption" : "xui-refresh",
                    "id" : "fw"
                },
                {
                    "imageClass" : "xui-icon-undo",
                    "caption" : "xui-icon-undo",
                    "id" : "fx"
                },
                {
                    "imageClass" : "xui-uicmd-refresh",
                    "caption" : "xui-uicmd-refresh",
                    "id" : "fy"
                },
                {
                    "imageClass" : "xui-icon-date",
                    "caption" : "xui-icon-date",
                    "id" : "fz"
                },
                {
                    "imageClass" : "xui-icon-trash",
                    "caption" : "xui-icon-trash",
                    "id" : "ga"
                },
                {
                    "imageClass" : "xui-icon-alignleft",
                    "caption" : "xui-icon-alignleft",
                    "id" : "gb"
                },
                {
                    "imageClass" : "xui-icon-singleright",
                    "caption" : "xui-icon-singleright",
                    "id" : "gc"
                },
                {
                    "imageClass" : "xui-icon-singleleft",
                    "caption" : "xui-icon-singleleft",
                    "id" : "gd"
                },
                {
                    "imageClass" : "xui-uicmd-max",
                    "caption" : "xui-uicmd-max",
                    "id" : "ge"
                },
                {
                    "imageClass" : "xui-icon-last",
                    "caption" : "xui-icon-last",
                    "id" : "gf"
                },
                {
                    "imageClass" : "xui-icon-error",
                    "caption" : "xui-icon-error",
                    "id" : "gg"
                },
                {
                    "imageClass" : "xui-icon-remove",
                    "caption" : "xui-icon-remove",
                    "id" : "gh"
                },
                {
                    "imageClass" : "xui-uicmd-pin",
                    "caption" : "xui-uicmd-pin",
                    "id" : "gi"
                },
                {
                    "imageClass" : "xui-icon-link",
                    "caption" : "xui-icon-link",
                    "id" : "gj"
                },
                {
                    "imageClass" : "xui-icon-forecolor",
                    "caption" : "xui-icon-forecolor",
                    "id" : "gk"
                },
                {
                    "imageClass" : "xui-uicmd-time",
                    "caption" : "xui-uicmd-time",
                    "id" : "gl"
                },
                {
                    "imageClass" : "xui-icon-aligncenter",
                    "caption" : "xui-icon-aligncenter",
                    "id" : "gm"
                },
                {
                    "imageClass" : "xui-uicmd-check-checked",
                    "caption" : "xui-uicmd-check-checked",
                    "id" : "gn"
                },
                {
                    "imageClass" : "xui-uicmd-cmdbox",
                    "caption" : "xui-uicmd-cmdbox",
                    "id" : "go"
                },
                {
                    "imageClass" : "xui-uicmd-toggle",
                    "caption" : "xui-uicmd-toggle",
                    "id" : "gp"
                },
                {
                    "imageClass" : "xui-uicmd-getter",
                    "caption" : "xui-uicmd-getter",
                    "id" : "gq"
                },
                {
                    "imageClass" : "xui-uicmd-save",
                    "caption" : "xui-uicmd-save",
                    "id" : "gr"
                },
                {
                    "imageClass" : "xui-icon-dragcopy",
                    "caption" : "xui-icon-dragcopy",
                    "id" : "gs"
                },
                {
                    "imageClass" : "xui-icon-dropdown",
                    "caption" : "xui-icon-dropdown",
                    "id" : "gt"
                },
                {
                    "imageClass" : "xui-uicmd-popbox",
                    "caption" : "xui-uicmd-popbox",
                    "id" : "gu"
                },
                {
                    "imageClass" : "xui-uicmd-close",
                    "caption" : "xui-uicmd-close",
                    "id" : "gv"
                },
                {
                    "imageClass" : "xui-uicmd-datetime",
                    "caption" : "xui-uicmd-datetime",
                    "id" : "gw"
                },
                {
                    "imageClass" : "xui-icon-arrowright",
                    "caption" : "xui-icon-arrowright",
                    "id" : "gx"
                },
                {
                    "imageClass" : "xui-icon-font",
                    "caption" : "xui-icon-font",
                    "id" : "gy"
                },
                {
                    "imageClass" : "xui-icon-bgcolor",
                    "caption" : "xui-icon-bgcolor",
                    "id" : "gz"
                },
                {
                    "imageClass" : "xui-icon-mobile",
                    "caption" : "xui-icon-mobile",
                    "id" : "ha"
                },
                {
                    "imageClass" : "xui-icon-clock",
                    "caption" : "xui-icon-clock",
                    "id" : "hb"
                },
                {
                    "imageClass" : "xui-icon-circledown",
                    "caption" : "xui-icon-circledown",
                    "id" : "hc"
                },
                {
                    "imageClass" : "xui-icon-circleleft",
                    "caption" : "xui-icon-circleleft",
                    "id" : "hd"
                },
                {
                    "imageClass" : "xui-icon-circleright",
                    "caption" : "xui-icon-circleright",
                    "id" : "he"
                },
                {
                    "imageClass" : "xui-icon-circleup",
                    "caption" : "xui-icon-circleup",
                    "id" : "hf"
                },
                {
                    "imageClass" : "xui-uicmd-opt",
                    "caption" : "xui-uicmd-opt",
                    "id" : "hg"
                },
                {
                    "imageClass" : "xui-icon-italic",
                    "caption" : "xui-icon-italic",
                    "id" : "hh"
                },
                {
                    "imageClass" : "xui-icon-redo",
                    "caption" : "xui-icon-redo",
                    "id" : "hi"
                },
                {
                    "imageClass" : "xui-icon-bold",
                    "caption" : "xui-icon-bold",
                    "id" : "hj"
                },
                {
                    "imageClass" : "xui-icon-bigup",
                    "caption" : "xui-icon-bigup",
                    "id" : "hk"
                },
                {
                    "imageClass" : "xui-icon-doubledown",
                    "caption" : "xui-icon-doubledown",
                    "id" : "hl"
                },
                {
                    "imageClass" : "xui-icon-doubleleft",
                    "caption" : "xui-icon-doubleleft",
                    "id" : "hm"
                },
                {
                    "imageClass" : "xui-icon-doubleright",
                    "caption" : "xui-icon-doubleright",
                    "id" : "hn"
                },
                {
                    "imageClass" : "xui-icon-doubleup",
                    "caption" : "xui-icon-doubleup",
                    "id" : "ho"
                },
                {
                    "imageClass" : "xui-uicmd-color",
                    "caption" : "xui-uicmd-color",
                    "id" : "hp"
                },
                {
                    "imageClass" : "xui-icon-breaklink",
                    "caption" : "xui-icon-breaklink",
                    "id" : "hq"
                },
                {
                    "imageClass" : "xui-icon-picture",
                    "caption" : "xui-icon-picture",
                    "id" : "hr"
                },
                {
                    "imageClass" : "xui-icon-back",
                    "caption" : "xui-icon-back",
                    "id" : "hs"
                },
                {
                    "imageClass" : "xui-icon-dragadd",
                    "caption" : "xui-icon-dragadd",
                    "id" : "ht"
                },
                {
                    "imageClass" : "xui-icon-formatclear",
                    "caption" : "xui-icon-formatclear",
                    "id" : "hu"
                },
                {
                    "imageClass" : "xui-uicmd-select",
                    "caption" : "xui-uicmd-select",
                    "id" : "hv"
                },
                {
                    "imageClass" : "xui-uicmd-file",
                    "caption" : "xui-uicmd-file",
                    "id" : "hw"
                },
                {
                    "imageClass" : "xui-icon-triangle-up",
                    "caption" : "xui-icon-triangle-up",
                    "id" : "hx"
                },
                {
                    "imageClass" : "xui-icon-dragstop",
                    "caption" : "xui-icon-dragstop",
                    "id" : "hy"
                },
                {
                    "imageClass" : "xui-uicmd-dotted",
                    "caption" : "xui-uicmd-dotted",
                    "id" : "hz"
                },
                {
                    "imageClass" : "xui-icon-dialog",
                    "caption" : "xui-icon-dialog",
                    "id" : "ia"
                },
                {
                    "imageClass" : "xui-icon-print",
                    "caption" : "xui-icon-print",
                    "id" : "ib"
                },
                {
                    "imageClass" : "xui-icon-right",
                    "caption" : "xui-icon-right",
                    "id" : "ic"
                },
                {
                    "imageClass" : "xui-icon-file",
                    "caption" : "xui-icon-file",
                    "id" : "id"
                },
                {
                    "imageClass" : "xui-uicmd-info",
                    "caption" : "xui-uicmd-info",
                    "id" : "ie"
                },
                {
                    "imageClass" : "xui-icon-smill",
                    "caption" : "xui-icon-smill",
                    "id" : "if"
                },
                {
                    "imageClass" : "xui-icon-sort",
                    "caption" : "xui-icon-sort",
                    "id" : "ig"
                },
                {
                    "imageClass" : "xui-icon-arrowtop",
                    "caption" : "xui-icon-arrowtop",
                    "id" : "ih"
                },
                {
                    "imageClass" : "xui-icon-file-fold",
                    "caption" : "xui-icon-file-fold",
                    "id" : "ii"
                },
                {
                    "imageClass" : "xui-icon-circle",
                    "caption" : "xui-icon-circle",
                    "id" : "ij"
                },
                {
                    "imageClass" : "xui-icon-underline",
                    "caption" : "xui-icon-underline",
                    "id" : "ik"
                },
                {
                    "imageClass" : "xui-uicmd-radio",
                    "caption" : "xui-uicmd-radio",
                    "id" : "il"
                },
                {
                    "imageClass" : "xui-uicmd-radio-checked",
                    "caption" : "xui-uicmd-radio-checked",
                    "id" : "im"
                },
                {
                    "imageClass" : "xui-uicmd-restore",
                    "caption" : "xui-uicmd-restore",
                    "id" : "in"
                },
                {
                    "imageClass" : "xui-uicmd-toggle-checked",
                    "caption" : "xui-uicmd-toggle-checked",
                    "id" : "io"
                },
                {
                    "imageClass" : "xui-icon-smallup",
                    "caption" : "xui-icon-smallup",
                    "id" : "ip"
                },
                {
                    "imageClass" : "xui-icon-smalldown",
                    "caption" : "xui-icon-smalldown",
                    "id" : "iq"
                },
                {
                    "imageClass" : "xui-icon-html",
                    "caption" : "xui-icon-html",
                    "id" : "ir"
                },
                {
                    "imageClass" : "xui-icon-code",
                    "caption" : "xui-icon-code",
                    "id" : "is"
                },
                {
                    "imageClass" : "xui-uicmd-min",
                    "caption" : "xui-uicmd-min",
                    "id" : "it"
                },
                {
                    "imageClass" : "xui-uicmd-location",
                    "caption" : "xui-uicmd-location",
                    "id" : "iu"
                },
                {
                    "imageClass" : "xui-icon-file-expand",
                    "caption" : "xui-icon-file-expand",
                    "id" : "iv"
                },
                {
                    "imageClass" : "xui-uicmd-delete",
                    "caption" : "xui-uicmd-delete",
                    "id" : "iw"
                },
                {
                    "imageClass" : "xui-uicmd-land",
                    "caption" : "xui-uicmd-land",
                    "id" : "ix"
                },
                {
                    "imageClass" : "xui-icon-arrowbottom",
                    "caption" : "xui-icon-arrowbottom",
                    "id" : "iy"
                },
                {
                    "imageClass" : "xui-icon-arrowleft",
                    "caption" : "xui-icon-arrowleft",
                    "id" : "iz"
                },
                {
                    "imageClass" : "xui-icon-next",
                    "caption" : "xui-icon-next",
                    "id" : "ja"
                },
                {
                    "imageClass" : "xui-icon-first",
                    "caption" : "xui-icon-first",
                    "id" : "jb"
                },
                {
                    "imageClass" : "xui-icon-triangle-left",
                    "caption" : "xui-icon-triangle-left",
                    "id" : "jc"
                },
                {
                    "imageClass" : "xui-icon-triangle-down",
                    "caption" : "xui-icon-triangle-down",
                    "id" : "jd"
                },
                {
                    "imageClass" : "xui-icon-triangle-right",
                    "caption" : "xui-icon-triangle-right",
                    "id" : "je"
                },
                {
                    "imageClass" : "xui-icon-sort-checked",
                    "caption" : "xui-icon-sort-checked",
                    "id" : "jf"
                }])
                .setLeft("48.333333333333336em")
                .setTop("11em")
                .setWidth("16.666666666666668em")
                .setHeight("29.8334em")
                .setLabelSize("1.6666666666666667em")
                .setLabelPos("top")
                .setLabelCaption("Icons")
                .setLabelHAlign("left")
                .setValue("a")
                , "3");
            
            host.tabs2.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block176")
                .setLeft("19.166666666666668em")
                .setTop("2.49997em")
                .setWidth("47.5em")
                .setHeight("39.9166em")
                .setBorderType("ridge")
                , "4");
            
            host.xui_ui_block176.append(
                xui.create("xui.UI.Layout")
                .setHost(host,"xui_ui_layout32")
                .setItems([{
                    "id" : "before",
                    "pos" : "before",
                    "min" : 10,
                    "size" : 80,
                    "locked" : false,
                    "folded" : false,
                    "hidden" : false,
                    "cmd" : true
                },
                {
                    "id" : "main",
                    "min" : 10,
                    "size" : 80
                },
                {
                    "id" : "after",
                    "pos" : "after",
                    "min" : 10,
                    "size" : 80,
                    "locked" : false,
                    "folded" : false,
                    "hidden" : false,
                    "cmd" : true
                }])
                .setLeft("0em")
                .setTop("0em")
                );
            
            host.xui_ui_layout32.append(
                xui.create("xui.UI.Layout")
                .setHost(host,"xui_ui_layout33")
                .setItems([{
                    "id" : "before",
                    "pos" : "before",
                    "size" : 80,
                    "min" : 10,
                    "locked" : false,
                    "folded" : false,
                    "hidden" : false,
                    "cmd" : true
                },
                {
                    "id" : "main",
                    "size" : 80,
                    "min" : 10
                },
                {
                    "id" : "after",
                    "pos" : "after",
                    "size" : 80,
                    "min" : 10,
                    "locked" : false,
                    "folded" : false,
                    "hidden" : false,
                    "cmd" : true
                }])
                .setLeft("0em")
                .setTop("0em")
                .setType("horizontal")
                , "before");
            
            host.xui_ui_layout33.append(
                xui.create("xui.UI.ButtonViews")
                .setHost(host,"xui_ui_buttonviews2")
                .setItems([{
                    "id" : "a",
                    "caption" : "page1",
                    "image" : "{xui.ini.img_icon}"
                },
                {
                    "id" : "b",
                    "caption" : "page2",
                    "image" : "{xui.ini.img_icon}"
                },
                {
                    "id" : "c",
                    "caption" : "page3",
                    "image" : "{xui.ini.img_icon}"
                },
                {
                    "id" : "d",
                    "caption" : "page4",
                    "image" : "{xui.ini.img_icon}",
                    "closeBtn" : true,
                    "optBtn" : true,
                    "popBtn" : true
                }])
                .setLeft("0em")
                .setTop("0em")
                .setBarSize(28)
                .setValue("a")
                , "main");
            
            host.xui_ui_layout32.append(
                xui.create("xui.UI.Layout")
                .setHost(host,"xui_ui_layout35")
                .setItems([{
                    "id" : "before",
                    "pos" : "before",
                    "size" : 80,
                    "min" : 10,
                    "locked" : false,
                    "folded" : true,
                    "hidden" : false,
                    "cmd" : true
                },
                {
                    "id" : "main",
                    "size" : 80,
                    "min" : 10
                },
                {
                    "id" : "after",
                    "pos" : "after",
                    "size" : 120,
                    "min" : 10,
                    "locked" : false,
                    "folded" : false,
                    "hidden" : false,
                    "cmd" : false
                }])
                .setLeft("0em")
                .setTop("0em")
                .setType("horizontal")
                .setFlexSize(true)
                , "main");
            
            host.xui_ui_layout35.append(
                xui.create("xui.UI.ButtonViews")
                .setHost(host,"xui_ui_buttonviews5")
                .setItems([{
                    "id" : "a",
                    "caption" : "page1",
                    "image" : "{xui.ini.img_icon}"
                },
                {
                    "id" : "b",
                    "caption" : "page2",
                    "image" : "{xui.ini.img_icon}"
                },
                {
                    "id" : "c",
                    "caption" : "page3",
                    "image" : "{xui.ini.img_icon}"
                },
                {
                    "id" : "d",
                    "caption" : "page4",
                    "image" : "{xui.ini.img_icon}",
                    "closeBtn" : true,
                    "optBtn" : true,
                    "popBtn" : true
                }])
                .setLeft("0em")
                .setTop("0em")
                .setBarLocation("left")
                .setBarSize(140)
                .setValue("a")
                , "main");
            
            host.xui_ui_layout35.append(
                xui.create("xui.UI.ButtonViews")
                .setHost(host,"xui_ui_buttonviews20")
                .setItems([{
                    "id" : "a",
                    "caption" : "page1",
                    "image" : "{xui.ini.img_icon}"
                },
                {
                    "id" : "b",
                    "caption" : "page2",
                    "image" : "{xui.ini.img_icon}"
                },
                {
                    "id" : "c",
                    "caption" : "page3",
                    "image" : "{xui.ini.img_icon}"
                },
                {
                    "id" : "d",
                    "caption" : "page4",
                    "image" : "{xui.ini.img_icon}",
                    "closeBtn" : true,
                    "optBtn" : true,
                    "popBtn" : true
                }])
                .setLeft("0em")
                .setTop("0em")
                .setBarLocation("right")
                .setBarSize(140)
                .setValue("a")
                , "after");
            
            host.xui_ui_layout32.append(
                xui.create("xui.UI.Layout")
                .setHost(host,"xui_ui_layout36")
                .setItems([{
                    "id" : "before",
                    "pos" : "before",
                    "size" : 80,
                    "min" : 10,
                    "locked" : false,
                    "folded" : false,
                    "hidden" : false,
                    "cmd" : false
                },
                {
                    "id" : "main",
                    "size" : 80,
                    "min" : 10
                },
                {
                    "id" : "after",
                    "pos" : "after",
                    "size" : 80,
                    "min" : 10,
                    "locked" : false,
                    "folded" : false,
                    "hidden" : false,
                    "cmd" : false
                }])
                .setLeft("0em")
                .setTop("0em")
                .setType("horizontal")
                , "after");
            
            host.xui_ui_layout36.append(
                xui.create("xui.UI.ButtonViews")
                .setHost(host,"xui_ui_buttonviews4")
                .setItems([{
                    "id" : "a",
                    "caption" : "page1",
                    "image" : "{xui.ini.img_icon}"
                },
                {
                    "id" : "b",
                    "caption" : "page2",
                    "image" : "{xui.ini.img_icon}"
                },
                {
                    "id" : "c",
                    "caption" : "page3",
                    "image" : "{xui.ini.img_icon}"
                },
                {
                    "id" : "d",
                    "caption" : "page4",
                    "image" : "{xui.ini.img_icon}",
                    "closeBtn" : true,
                    "optBtn" : true,
                    "popBtn" : true
                }])
                .setLeft("0em")
                .setTop("0em")
                .setBarLocation("bottom")
                .setBarSize(28)
                .setValue("a")
                , "main");
            
            host.tabs2.append(
                xui.create("xui.UI.Stacks")
                .setHost(host,"xui_ui_stacks17")
                .setItems([{
                    "id" : "a",
                    "caption" : "stack a",
                    "popBtn" : true,
                    "closeBtn" : true,
                    "image" : "img/demo.gif"
                },
                {
                    "id" : "b",
                    "caption" : "stack b",
                    "popBtn" : true,
                    "closeBtn" : true,
                    "image" : "img/demo.gif"
                },
                {
                    "id" : "c",
                    "caption" : "stack c"
                }])
                .setDock("none")
                .setLeft("0.8333333333333334em")
                .setTop("2.4166666666666665em")
                .setWidth("17.5em")
                .setHeight("23.417em")
                .setValue("a")
                , "4");
            
            host.xui_ui_stacks17.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block177")
                .setLeft("1.6666666666666667em")
                .setTop("1.6666666666666667em")
                .setWidth("5em")
                .setHeight("5em")
                , "a");
            
            host.xui_ui_stacks17.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block178")
                .setLeft("1.6666666666666667em")
                .setTop("7.5em")
                .setWidth("5em")
                .setHeight("5em")
                .setBorderType("ridge")
                , "a");
            
            host.xui_ui_stacks17.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block179")
                .setLeft("1.6666666666666667em")
                .setTop("13.333333333333334em")
                .setWidth("5em")
                .setHeight("5em")
                .setBorderType("groove")
                , "a");
            
            host.xui_ui_stacks17.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block180")
                .setLeft("9.16667em")
                .setTop("13.333333333333334em")
                .setWidth("5em")
                .setHeight("5em")
                .setBorderType("inset")
                , "a");
            
            host.xui_ui_stacks17.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block208")
                .setLeft("9.16667em")
                .setTop("1.6666666666666667em")
                .setWidth("5em")
                .setHeight("5em")
                .setBorderType("flat")
                , "a");
            
            host.xui_ui_stacks17.append(
                xui.create("xui.UI.Block")
                .setHost(host,"xui_ui_block209")
                .setLeft("9.16667em")
                .setTop("7.5em")
                .setWidth("5em")
                .setHeight("5em")
                .setBorderType("none")
                , "a");
            
            host.tabs2.append(
                xui.create("xui.UI.TreeGrid")
                .setHost(host,"xui_ui_tgbig")
                .setDock("none")
                .setLeft("0em")
                .setTop("0em")
                .setWidth("67em")
                .setHeight("20em")
                .setHeader([{
                    "id" : "a3-1",
                    "caption" : "col 1",
                    "cellStyle" : "text-align:center;cursor:pointer;",
                    "width" : "4.899746666666666em",
                    "type" : "input"
                },
                {
                    "id" : "a3-2",
                    "caption" : "col 2",
                    "cellStyle" : "text-align:center;cursor:pointer;",
                    "width" : "6.751316666666668em",
                    "type" : "input"
                },
                {
                    "id" : "a3-3",
                    "caption" : "col 3",
                    "cellStyle" : "text-align:center;cursor:pointer;",
                    "width" : "5.999993333333333em",
                    "type" : "input"
                },
                {
                    "id" : "a3-4",
                    "caption" : "col 4",
                    "cellStyle" : "text-align:center;cursor:pointer;",
                    "width" : "4.751310000000001em",
                    "disabled" : true,
                    "type" : "input"
                },
                {
                    "id" : "a3-5",
                    "caption" : "col 5",
                    "cellStyle" : "text-align:center;cursor:pointer;",
                    "width" : "5.499993333333333em",
                    "type" : "input"
                },
                {
                    "id" : "a3-6",
                    "caption" : "col 6",
                    "cellStyle" : "text-align:center;cursor:pointer;",
                    "width" : "5.08333em",
                    "type" : "input"
                },
                {
                    "id" : "a3-7",
                    "caption" : "col 7",
                    "cellStyle" : "text-align:center;cursor:pointer;",
                    "width" : "4.667996666666664em",
                    "type" : "input"
                },
                {
                    "id" : "a3-8",
                    "caption" : "col 8",
                    "cellStyle" : "text-align:center;cursor:pointer;",
                    "width" : "7.583330000000004em",
                    "readonly" : true,
                    "type" : "input"
                },
                {
                    "id" : "a3-9",
                    "caption" : "col 9",
                    "cellStyle" : "text-align:center;cursor:pointer;",
                    "width" : "3.58466333333333em",
                    "type" : "input"
                },
                {
                    "id" : "a3-10",
                    "caption" : "col 10",
                    "cellStyle" : "text-align:center;cursor:pointer;",
                    "width" : "4.666663333333333em",
                    "type" : "input"
                },
                {
                    "id" : "a3-11",
                    "caption" : "col 11",
                    "cellStyle" : "text-align:center;cursor:pointer;",
                    "width" : "4.584663333333331em",
                    "type" : "input"
                },
                {
                    "id" : "a3-12",
                    "caption" : "col 12",
                    "cellStyle" : "text-align:center;cursor:pointer;",
                    "width" : "4.249996666666667em",
                    "type" : "input"
                },
                {
                    "id" : "a3-13",
                    "caption" : "col 13",
                    "cellStyle" : "text-align:center;cursor:pointer;",
                    "width" : "4.668329999999998em",
                    "type" : "input"
                }])
                .setGrpCols([{
                    "from" : 0,
                    "id" : "a1-1",
                    "caption" : "col grp 1",
                    "to" : 3
                },
                {
                    "from" : 0,
                    "id" : "a2-1",
                    "caption" : "col grp 11",
                    "to" : 0
                },
                {
                    "from" : 1,
                    "id" : "a2-2",
                    "caption" : "col grp 12",
                    "to" : 3
                },
                {
                    "from" : 4,
                    "id" : "a1-2",
                    "caption" : "col grp 2",
                    "to" : 8
                },
                {
                    "from" : 4,
                    "id" : "a2-3",
                    "caption" : "col grp 21",
                    "to" : 6
                },
                {
                    "from" : 7,
                    "id" : "a2-4",
                    "caption" : "col grp 22",
                    "to" : 8
                },
                {
                    "from" : 9,
                    "id" : "a2-5",
                    "caption" : "col grp 3",
                    "to" : 12
                },
                {
                    "from" : 9,
                    "id" : "a1-3",
                    "caption" : "col grp 31",
                    "to" : 12
                }])
                .setRows([{
                    "id" : "s1-1",
                    "caption" : "Row 1",
                    "iniFold" : false,
                    "cells" : [{
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    }],
                    "sub" : [{
                        "caption" : "Row 1 sub 1",
                        "cells" : [{
                            "value" : "10",
                            "caption" : "✓"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖",
                            "disabled" : true
                        },
                        {
                            "value" : "0",
                            "caption" : "✖",
                            "readonly" : true
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        }]
                    },
                    {
                        "id" : "s3-2",
                        "caption" : "Row 1 sub 2",
                        "cells" : [{
                            "value" : "10",
                            "caption" : "✓"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        }]
                    }]
                },
                {
                    "id" : "s2-1",
                    "caption" : "Row 2",
                    "iniFold" : false,
                    "cells" : [{
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    }],
                    "sub" : [{
                        "id" : "s23-1",
                        "caption" : "Row 2 sub 1",
                        "cells" : [{
                            "value" : "10",
                            "caption" : "✓"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        }]
                    },
                    {
                        "id" : "s23-2",
                        "caption" : "Row 2 sub 2",
                        "cells" : [{
                            "value" : "10",
                            "caption" : "✓"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        }]
                    }]
                },
                {
                    "id" : "s3-1",
                    "caption" : "Row 3",
                    "cells" : [{
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    },
                    {
                        "value" : "1",
                        "caption" : "↻"
                    }],
                    "sub" : [{
                        "id" : "s33-1",
                        "caption" : "Row 3 sub 1",
                        "cells" : [{
                            "value" : "10",
                            "caption" : "✓"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        }]
                    },
                    {
                        "id" : "s33-2",
                        "caption" : "Row 3 sub 2",
                        "cells" : [{
                            "value" : "10",
                            "caption" : "✓"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        },
                        {
                            "value" : "0",
                            "caption" : "✖"
                        }]
                    }]
                }])
                , "5");
            
            host.tabs2.append(
                xui.create("xui.UI.Dialog")
                .setHost(host,"xui_ui_dialog27")
                .setLeft("11em")
                .setTop("20.833333333333332em")
                .setWidth("25.833333333333332em")
                .setHeight("15.833333333333334em")
                .setShadow(false)
                .setResizer(false)
                .setInitPos("auto")
                .setCaption("dialog3")
                .setMovable(false)
                .setMinBtn(false)
                .setMaxBtn(false)
                .setRestoreBtn(false)
                , "5");
            
            host.xui_ui_dialog27.append(
                xui.create("xui.UI.Input")
                .setHost(host,"xui_ui_input85")
                .setLeft("3.3333333333333335em")
                .setTop("0.8333333333333334em")
                .setLabelSize("0em")
                .setLabelGap("0.3333333333333333em")
                );
            
            host.xui_ui_dialog27.append(
                xui.create("xui.UI.Button")
                .setHost(host,"xui_ui_button191")
                .setLeft("3.3333333333333335em")
                .setTop("3.3333333333333335em")
                .setCaption("button18")
                );
            
            host.tabs2.append(
                xui.create("xui.UI.Button")
                .setHost(host,"xui_ui_button271")
                .setLeft("0.8333333333333334em")
                .setTop("22.416666666666668em")
                .setCaption("alert window")
                .onClick("_sbutton11_onclick")
                , "5");
            
            host.tabs2.append(
                xui.create("xui.UI.Button")
                .setHost(host,"xui_ui_button272")
                .setLeft("0.8333333333333334em")
                .setTop("25.75em")
                .setCaption("confirm window")
                .onClick("_sbutton12_onclick")
                , "5");
            
            host.tabs2.append(
                xui.create("xui.UI.Button")
                .setHost(host,"xui_ui_button273")
                .setLeft("0.8333333333333334em")
                .setTop("29.083333333333332em")
                .setCaption("prompt window")
                .onClick("_sbutton13_onclick")
                , "5");
            
            host.tabs2.append(
                xui.create("xui.UI.Button")
                .setHost(host,"xui_ui_button274")
                .setLeft("0.8333333333333334em")
                .setTop("32.416666666666664em")
                .setCaption("pop window")
                .onClick("_sbutton14_onclick")
                , "5");
            
            host.tabs2.append(
                xui.create("xui.UI.Dialog")
                .setHost(host,"xui_ui_dialog41")
                .setLeft("37.5em")
                .setTop("20.833333333333332em")
                .setWidth("25.833333333333332em")
                .setHeight("15.833333333333334em")
                .setCaption("dialog3")
                .setOptBtn(true)
                .setLandBtn(true)
                , "5");
            
            host.xui_ui_dialog41.append(
                xui.create("xui.UI.List")
                .setHost(host,"xui_ui_list122")
                .setItems([{
                    "id" : "item a",
                    "caption" : "item a"
                },
                {
                    "id" : "item b",
                    "caption" : "item b"
                },
                {
                    "id" : "item c",
                    "caption" : "item c"
                },
                {
                    "id" : "item d",
                    "caption" : "item d"
                }])
                .setLeft("2.0833333333333335em")
                .setTop("2.3333333333333335em")
                .setWidth("20.833333333333332em")
                .setHeight("auto")
                .setLabelSize("0em")
                .setLabelGap("0.3333333333333333em")
                );
            
            host.tabs2.append(
                xui.create("xui.UI.Label")
                .setHost(host,"label5")
                .setLeft("2.5em")
                .setTop("6.666666666666667em")
                .setCaption("Label")
                .setImage("img/demo.gif")
                .setFontColor("#4B0082")
                .setFontSize("1.5em")
                .setFontWeight("bold")
                , "1");
            
            host.tabs2.append(
                xui.create("xui.UI.ColorPicker")
                .setHost(host,"color1")
                .setLeft("0em")
                .setTop("19.5em")
                .setZIndex(1002)
                , "1");
            
            host.tabs2.append(
                xui.create("xui.UI.Link")
                .setHost(host,"link1")
                .setLeft("2.5em")
                .setTop("3.3333333333333335em")
                .setCaption("link")
                .setTarget("crossui.com")
                , "1");
            
            host.tabs2.append(
                xui.create("xui.UI.TimePicker")
                .setHost(host,"time1")
                .setLeft("23.833299999999998em")
                .setTop("23.25em")
                , "1");
            
            host.tabs2.append(
                xui.create("xui.UI.DatePicker")
                .setHost(host,"date1")
                .setLeft("45em")
                .setTop("25.666666666666668em")
                .setValue(new Date(2013,4,22,0,0,0,0))
                , "1");
            
            host.tabs2.append(
                xui.create("xui.UI.Slider")
                .setHost(host,"slider2")
                .setLeft("62.416666666666664em")
                .setTop("1.0833333333333333em")
                .setWidth("2.6666666666666665em")
                .setHeight("40em")
                .setZIndex(0)
                .setSteps(100)
                .setType("vertical")
                .setLabelSize("0em")
                .setLabelGap("0.3333333333333333em")
                .setValue("30:60")
                , "1");
            
            host.tabs2.append(
                xui.create("xui.UI.Slider")
                .setHost(host,"slider1")
                .setLeft("2.5em")
                .setTop("42em")
                .setWidth("60em")
                .setHeight("2.5em")
                .setIsRange(false)
                .setLabelSize("0em")
                .setLabelGap("0.3333333333333333em")
                .setValue("20")
                , "1");
            
            host.tabs2.append(
                xui.create("xui.UI.Image")
                .setHost(host,"xui_ui_image3")
                .setLeft("2.5em")
                .setTop("11em")
                .setWidth("7em")
                .setHeight("6.75em")
                .setSrc("{xui.ini.img_pic}")
                , "1");
            
            host.tabs2.append(
                xui.create("xui.UI.Input")
                .setHost(host,"xui_ui_input62")
                .setLeft("11.666666666666666em")
                .setTop("0.8333333333333334em")
                .setWidth("16.666666666666668em")
                .setLabelSize("8.333333333333334em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("Input")
                , "1");
            
            host.tabs2.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput290")
                .setDisabled(true)
                .setLeft("11.666666666666666em")
                .setTop("5.75em")
                .setWidth("16.666666666666668em")
                .setLabelSize("8.333333333333334em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("Pop btn")
                .setType("popbox")
                .setValue("disabled")
                , "1");
            
            host.tabs2.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput294")
                .setReadonly(true)
                .setLeft("11.666666666666666em")
                .setTop("8.25em")
                .setWidth("16.666666666666668em")
                .setLabelSize("8.333333333333334em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("Getter btn")
                .setType("getter")
                .setValue("readonly")
                , "1");
            
            host.tabs2.append(
                xui.create("xui.UI.Input")
                .setHost(host,"xui_ui_input63")
                .setLeft("28.333333333333332em")
                .setTop("0.8333333333333334em")
                .setWidth("16.666666666666668em")
                .setLabelSize("8.333333333333334em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("Password")
                .setType("password")
                .setValue("pwd")
                , "1");
            
            host.tabs2.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput318")
                .setLeft("28.333333333333332em")
                .setTop("3.3333333333333335em")
                .setWidth("16.666666666666668em")
                .setLabelSize("8.333333333333334em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("Number")
                .setType("number")
                , "1");
            
            host.tabs2.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput322")
                .setLeft("28.333333333333332em")
                .setTop("5.75em")
                .setWidth("16.666666666666668em")
                .setLabelSize("8.333333333333334em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("Currency")
                .setType("currency")
                , "1");
            
            host.tabs2.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput326")
                .setLeft("28.333333333333332em")
                .setTop("8.333333333333334em")
                .setWidth("16.666666666666668em")
                .setLabelSize("8.333333333333334em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("Spin")
                .setType("spin")
                , "1");
            
            host.tabs2.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput454")
                .setLeft("45em")
                .setTop("0.75em")
                .setWidth("16.666666666666668em")
                .setLabelSize("8.333333333333334em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("Combo")
                .setItems([{
                    "id" : "a",
                    "caption" : "item a",
                    "image" : "{xui.ini.img_icon}"
                },
                {
                    "id" : "b",
                    "caption" : "item b",
                    "image" : "{xui.ini.img_icon}"
                },
                {
                    "id" : "c",
                    "caption" : "item c",
                    "image" : "{xui.ini.img_icon}"
                },
                {
                    "id" : "d",
                    "caption" : "item d",
                    "image" : "{xui.ini.img_icon}",
                    "disabled" : true
                }])
                , "1");
            
            host.tabs2.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput455")
                .setLeft("45em")
                .setTop("3.25em")
                .setWidth("16.666666666666668em")
                .setLabelSize("8.333333333333334em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("Drop List")
                .setType("listbox")
                .setItems([{
                    "id" : "a",
                    "caption" : "item a",
                    "image" : "{xui.ini.img_icon}"
                },
                {
                    "id" : "b",
                    "caption" : "item b",
                    "image" : "{xui.ini.img_icon}"
                },
                {
                    "id" : "c",
                    "caption" : "item c",
                    "image" : "{xui.ini.img_icon}"
                },
                {
                    "id" : "d",
                    "caption" : "item d",
                    "image" : "{xui.ini.img_icon}",
                    "disabled" : true
                }])
                , "1");
            
            host.tabs2.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput456")
                .setLeft("45em")
                .setTop("5.75em")
                .setWidth("16.666666666666668em")
                .setLabelSize("8.333333333333334em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("Help Combo")
                .setType("helpinput")
                .setItems([{
                    "id" : "item 1 text",
                    "caption" : "item 1"
                },
                {
                    "id" : "item 2 text",
                    "caption" : "item 2"
                }])
                , "1");
            
            host.tabs2.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput457")
                .setLeft("45em")
                .setTop("8.333333333333334em")
                .setWidth("16.666666666666668em")
                .setLabelSize("8.333333333333334em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("Date")
                .setType("date")
                , "1");
            
            host.tabs2.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput507")
                .setLeft("45em")
                .setTop("11em")
                .setWidth("16.666666666666668em")
                .setLabelSize("8.333333333333334em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("Time")
                .setType("time")
                , "1");
            
            host.tabs2.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput511")
                .setLeft("45em")
                .setTop("13.333333333333334em")
                .setWidth("16.666666666666668em")
                .setLabelSize("8.333333333333334em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("Date & Time")
                .setType("datetime")
                , "1");
            
            host.tabs2.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput515")
                .setLeft("45em")
                .setTop("15.833333333333334em")
                .setWidth("16.666666666666668em")
                .setLabelSize("8.333333333333334em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("Color")
                .setType("color")
                , "1");
            
            host.tabs2.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput636")
                .setLeft("11.666666666666666em")
                .setTop("10.75em")
                .setWidth("16.666666666666668em")
                .setLabelSize("8.333333333333334em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("File")
                .setType("file")
                , "1");
            
            host.tabs2.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput637")
                .setLeft("28.333333333333332em")
                .setTop("11em")
                .setWidth("16.666666666666668em")
                .setLabelSize("8.333333333333334em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("Combo Button")
                .setType("dropbutton")
                .setCaption("Combo")
                , "1");
            
            host.tabs2.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput638")
                .setLeft("45em")
                .setTop("18.333333333333332em")
                .setWidth("16.666666666666668em")
                .setLabelSize("8.333333333333334em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("Combo & save")
                .setItems([{
                    "id" : "a",
                    "caption" : "item a",
                    "image" : "{xui.ini.img_icon}"
                },
                {
                    "id" : "b",
                    "caption" : "item b",
                    "image" : "{xui.ini.img_icon}"
                },
                {
                    "id" : "c",
                    "caption" : "item c",
                    "image" : "{xui.ini.img_icon}"
                },
                {
                    "id" : "d",
                    "caption" : "item d",
                    "image" : "{xui.ini.img_icon}",
                    "disabled" : true
                }])
                .setCommandBtn("save")
                , "1");
            
            host.tabs2.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput639")
                .setLeft("45em")
                .setTop("20.833333333333332em")
                .setWidth("16.666666666666668em")
                .setLabelSize("8.333333333333334em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("Combo & del")
                .setItems([{
                    "id" : "a",
                    "caption" : "item a",
                    "image" : "{xui.ini.img_icon}"
                },
                {
                    "id" : "b",
                    "caption" : "item b",
                    "image" : "{xui.ini.img_icon}"
                },
                {
                    "id" : "c",
                    "caption" : "item c",
                    "image" : "{xui.ini.img_icon}"
                },
                {
                    "id" : "d",
                    "caption" : "item d",
                    "image" : "{xui.ini.img_icon}",
                    "disabled" : true
                }])
                .setCommandBtn("delete")
                , "1");
            
            host.tabs2.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput640")
                .setLeft("45em")
                .setTop("23.333333333333332em")
                .setWidth("16.666666666666668em")
                .setLabelSize("8.333333333333334em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("Combo & pop")
                .setItems([{
                    "id" : "a",
                    "caption" : "item a",
                    "image" : "{xui.ini.img_icon}"
                },
                {
                    "id" : "b",
                    "caption" : "item b",
                    "image" : "{xui.ini.img_icon}"
                },
                {
                    "id" : "c",
                    "caption" : "item c",
                    "image" : "{xui.ini.img_icon}"
                },
                {
                    "id" : "d",
                    "caption" : "item d",
                    "image" : "{xui.ini.img_icon}",
                    "disabled" : true
                }])
                .setCommandBtn("pop")
                , "1");
            
            host.tabs2.append(
                xui.create("xui.UI.Input")
                .setHost(host,"xui_ui_input86")
                .setLeft("20em")
                .setTop("13.25em")
                .setWidth("25em")
                .setHeight("6.00008em")
                .setLabelSize("1.6666666666666667em")
                .setLabelPos("top")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("Multi-lines Input (Textarea)")
                .setLabelHAlign("left")
                .setMultiLines(true)
                , "1");
            
            host.tabs2.append(
                xui.create("xui.UI.ComboInput")
                .setHost(host,"xui_ui_comboinput286")
                .setLeft("11.666666666666666em")
                .setTop("3.25em")
                .setWidth("16.666666666666668em")
                .setLabelSize("8.333333333333334em")
                .setLabelGap("0.3333333333333333em")
                .setLabelCaption("Command btn")
                .setType("cmdbox")
                , "1");
            
            append(
                xui.create("xui.UI.PopMenu")
                .setHost(host,"pop")
                .setItems([{
                    "id" : "item 1",
                    "caption" : "item 1"
                },
                {
                    "id" : "item 2",
                    "caption" : "item 2"
                },
                {
                    "id" : "item 3",
                    "caption" : "item 3"
                }])
            );
            
            return children;
            // ]]Code created by CrossUI RAD Studio
        },
        _menubar2_onshowsubmenu:function (profile, popProfile, item, src) {
            var menubar=profile.boxing(),
                obj=(this._cache||(this._cache={}))[item.id];
            if(!obj){
                switch(item.id){
                    case 'date':
                        obj=(new xui.UI.DatePicker).render(true);
                        obj.beforeClose(function(p){ 
                           p.boxing().hide(); 
                           return false; 
                        })
                        .afterUIValueSet(function(p, old, n){ 
                           menubar.onMenuSelected(profile,p,{
                              id : item.id, 
                              value : n 
                           });
                           menubar.hide(); 
                        });
                    break;
                    case 'time':
                        obj=(new xui.UI.TimePicker).render(true);
                        obj.beforeClose(function(p){ 
                           p.boxing().hide(); 
                           return false; 
                        })
                        .afterUIValueSet(function(p, old, n){ 
                           menubar.onMenuSelected(profile,p,{
                              id : item.id, 
                              value : n 
                           });
                           menubar.hide(); 
                        });
                    break;
                    case 'color':
                        obj=(new xui.UI.ColorPicker).render(true);
                        obj.beforeClose(function(p){ 
                           p.boxing().hide(); 
                           return false; 
                        })
                        .afterUIValueSet(function(p, old, n){ 
                           menubar.onMenuSelected(profile,p,{
                              id : item.id, 
                              value : n 
                           });
                           menubar.hide(); 
                        });
                    break;
                    case 'customized pop':
                        obj=xui.create({key:'xui.UI.Panel',properties:{dock:'none',width:200,heihgt:300},children:[[{
                            key:'xui.UI.TreeBar',
                            properties:{
                                items:['a','b',{id:'c',sub:['c1', 'c2']}]
                            },
                            events:{
                                onItemSelected:function(p, item){
                                   menubar.onMenuSelected(profile,p,{
                                      id : 'customized pop',
                                      value : item.id
                                   });
                                   menubar.hide();
                                }
                            }
                        }]]});
                    break;
                }
                this._cache[item.id]=obj;
            }
            return obj;
        }, 
        _menubar2_onmenuselected:function (profile, subprf, item, src) {
            xui.message((item.id||'')+ ' ' + (item.value||''));
        }, 
        _toolbar5_onclick:function (profile, item, group, e, src) {
            switch(item.id){
                case 'd':
                    xui.message(item.caption + " was clicked!" + " value was changed to " + item.value);
                break;
                case 'e':
                    this.pop.pop(src);
                break;
                default:
                    xui.message(item.caption + " was clicked!");
            }
        },        
        _sbutton11_onclick:function (profile, e, src, value) {
            xui.UI.Dialog.alert('alert window', 'alert');
        },
        _sbutton12_onclick:function (profile, e, src, value) {
            xui.UI.Dialog.confirm('confirm?', 'confirm');
        },
        _sbutton13_onclick:function (profile, e, src, value) {
            xui.UI.Dialog.prompt('specify','prompt');
        },
        _sbutton14_onclick:function (profile, e, src, value) {
            xui.UI.Dialog.pop('pop message', 'pop');
        },
        _ctl_comboinput61_afteruivalueset:function (profile,oldValue,newValue){
            xui.setTheme(newValue);
            this.xui_ui_comboinput32.setUIValue('12px',true);
        },
        _xui_ui_comboinput32_afteruivalueset:function (profile,oldValue,newValue){
            xui.CSS.setStyleRules(".xui-node",{'font-size': newValue});
            xui.CSS.adjustFont();
        }
        
    },
    Static:{
        viewStyles:{}
    }
});