/**
 *  Created by ailsabe@126.com on 2016-08-16.
 *
 *   创建验证码
 */

/**
 * 验证码构造函数(验证码验证时不涉及大小写)
 * @param args
 * @constructor
 */
function VerificationCode(args) {
    //定义函数的属性
    this.Code = "";     //验证码值
    this.Length = 4;     //默认长度
    //成员变量(私有属性)
    var _disturbance = 10;  //设置验证码的干扰值
    var _arr = ["Q", "A", "Z", "W", "S", "X", "E", "D", "C", "R", "F", "V", "T", "G", "B", "Y", "H", "N", "U", "J", "M", "I", "K", "O", "L", "P",
        "q", "a", "z", "w", "s", "x", "e", "d", "c", "r", "f", "v", "t", "g", "b", "y", "h", "n", "u", "j", "m", "i", "k", "o", "l", "p",
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];  //验证码随机取值内容


    /**
     *  从_arr随机因子集合中与指定个数的值生成一个验证码字符串
     * @param number 随机个数
     */
    function getRandom(number) {
        var n = number || this.Length; //当前随机验证码长度
        var _cache = [];           // 用于存储随机取出的字符
        for (var  i = 0; i<= n; i++){
            var _index = getRandomFactor(0, 59);  //随机取0-59是随机值
            _cache.push(_arr[_index]);  //写入临时存储区
        }
        return _cache;
    }

    /**
     *  获取n至m之间是随机数，包含n，
     * @param n 起始
     * @param m 结束
     * @returns {number} 随机数
     */
    function getRandomFactor(n, m) {
        var c = m - n + 1;
        return Math.floor(Math.random() * c + n)
    }

    
}


/**
 * 创建新的验证码图片
 * @constructor
 */
VerificationCode.Create = function () {

};

