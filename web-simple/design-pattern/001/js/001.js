/**
 * 灵活的JavaScript语言
 * Created by fjc
 */



//----------------------------------v1.0----------------------------------
/*
 * 我们做一个注册界面时，需要验证登录名称、邮箱、密码的正确性，以及用户名有效性，密码的复杂程度等
 */

/**
 * 检测用户有效性
 * @param name
 */
function checkName(name) {

}
/**
 * 检测邮箱的有效性
 * @param email
 */
function checkEmail(email) {

}
/**
 * 检测密码的有效性、复杂度等
 * @param password
 */
function checkPassword(password) {

}


//----------------------------------v2.0----------------------------------

var checkName = function (name) {

}
var checkEmail = function (email) {

}
var checkPassword = function (password) {

}


//----------------------------------v3.0----------------------------------

var checkObj = {
    checkName: function (name) {

    },
    checkEmail: function (email) {

    },
    checkPassword: function (password) {

    }
}
//----------------------------------v4.0----------------------------------
// 这种写法还有另外一种叫法，静态函数
var checkObj = function () {
}

checkObj.checkName = function () {

}
checkObj.checkEmail = function () {

}
checkObj.checkPassword = function () {

}

//----------------------------------v5.0----------------------------------

var checkObj = function () {
    var _o = new Object();
    _o.checkName = function () {

    }
    _o.checkEmail = function () {

    }
    _o.checkPassword = function () {

    }
    return _o;
}

var _o = new checkObj();
_o.checkName();


//----------------------------------v6.0----------------------------------

var checkObj = function () {

}

checkObj.prototype = {
    checkName: function (name) {

    },
    checkEmail: function (email) {

    },
    checkPassword: function (password) {

    }
};

//通过原型链实现对函数的创建和封装


//链式添加...