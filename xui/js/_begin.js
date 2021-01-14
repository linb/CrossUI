(function (root, factory) {
  if(typeof define === "function" && define.amd) {
    define(function() { return factory.call(root) });
  } else if(typeof module === "object" && module.exports) {
      module.exports = root && root.document ? factory.call(root) :
        function(w) {
          if(!w.document){
            throw new Error( "xui requires a window with a document" );
          }
          return factory.call(w);
        };
  } else {
    root.xui = factory.call(root);
  }
}(typeof window !== "undefined" ? window : this, function() {