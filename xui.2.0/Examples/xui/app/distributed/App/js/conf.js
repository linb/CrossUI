CONF={
    //Dynamic Injector Mechanism for xui.ModuleFactory
    ModuleFactoryProfile:{
        module1:{
            cls:'App.Module1',
            children:{
                tag_SubModule1:'submodule1'
            }
        },
        submodule1:{
            cls:'App.SubModule1'
        }
    }
};