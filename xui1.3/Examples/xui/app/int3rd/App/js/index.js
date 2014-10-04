Class('App', 'xui.Com',{
    Instance:{
        iniComponents : function(){
            // [[Code created by CrossUI RAD Tools
            var host=this, children=[], append=function(child){children.push(child.get(0));};
            
            append((new xui.UI.Div())
            .setHost(host,"ctl_div15")
            .setDomId("map")
            .setLeft(10)
            .setTop(10)
            .setWidth(600)
            .setHeight(280)
            .setHtml("Loading...")
            .onRender("_ctl_div15_onrender")
            );
            
            return children;
            // ]]Code created by CrossUI RAD Tools
        },
        _ctl_div15_onrender:function (profile){
            var map = L.map('map').setView([51.505, -0.09], 13);

            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([51.5, -0.09]).addTo(map)
            .bindPopup('A pretty CSS3 popup. <br> Easily customizable.')
            .openPopup();

        }
    }
});