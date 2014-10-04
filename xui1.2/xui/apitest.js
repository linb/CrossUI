document.open();
document.writeln(xui_ini.nodeid);
document.writeln(_.serialize(_.merge({},xui.ini)));    
document.close();