/**
 * copyright：Copyright © 2016 - 2020. All Rights Reserved
 * email：ailsabe@126.com
 * date：2016/12/7.
 * description：创建一个接口类，类中包含方法以及接口名称
 */


/**
 * 接口类
 * @param name 接口名称
 * @param methods 方法名称
 * @constructor
 */
var Interface = function (name, methods) {
    if (arguments.length != 2) {
        throw new Error("Interface constructor called width" + arguments.length + "arguments,butexpected exactly 2. ");
    }
    this.name = name;
    this.methods = [];
    for (var i = 1; i < methods.length; i++) {
        if (typeof methods[i] !== 'string') {
            throw new Error("interface costructorexpects method names to be passed in as a string");
        }
        this.methods.push(methods[i]);
    }
}
/**
 * 次方法是一个内部验证方法，用于验证派生类是否实现了接口里面的方法，这是一个静态方法
 * @param object
 */
Interface.ensureImplements = function (object) {
    if (arguments.length < 2) {
        throw new Error("FunctionInterface.ensureImplements called with" + arguments.length + "arguments, but expeted at least 2.");
    }
    for (var i = 1; i < arguments.lenght; i++) {
        var interfaceName = arguments[i];
        if (interfaceName.constructor !== Interface) {
            throw new Error("Function Interface.ensureImplements expects arguments two and above to be instances of  Interface.");
        }
        for (var j = 0; j < interfaceName.methods.length; j++) {
            var method = interfaceName.methods[j];
            if (!object[method] || typeof object[method] !== 'function') {
                throw new Error("Function Interface.ensureImplements:object does not implement the" + interface.name + "interface. Method" + method + " was not found.");
            }
        }
    }
}