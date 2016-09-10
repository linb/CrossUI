document.open();
document.writeln(xui_ini.nodeid);
document.writeln(xui.serialize(xui.merge({},xui.ini)));    
document.close();