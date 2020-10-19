(function (root, factory) {
  if(typeof define === "function" && define.amd) {
    define(function() { return factory.call(root) });
  } else if(typeof module === "object" && module.exports) {
    module.exports = factory.call(root);
  } else {
    root.xui = factory.call(root);
  }
}(this, function() {