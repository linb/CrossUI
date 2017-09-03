    
    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = xui;
    } else if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(function() { return xui; });
    }
}).call(this || (typeof window !== 'undefined' ? window : global));