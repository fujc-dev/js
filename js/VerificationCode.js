/**
 *  Created by ailsabe@126.com on 2016-08-16.
 */

(function () {

    /**
     * 随机字符串
     * @param length 字符串长度
     * @returns {length} 指定字符串长度的随机字符串
     */
    var randstr = function (length) {

        var key = {
            //验证码源集合
            str: ["Q", "A", "Z", "W", "S", "X", "E", "D", "C", "R", "F", "V", "T", "G", "B", "Y", "H", "N", "U", "J", "M", "I", "K", "O", "L", "P",
                "q", "a", "z", "w", "s", "x", "e", "d", "c", "r", "f", "v", "t", "g", "b", "y", "h", "n", "u", "j", "m", "i", "k", "o", "l", "p",
                "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            /**
             *  取n至m间的随机值
             *  @returns {*}
             */
            randint: function (n, m) {
                var c = m - n + 1;
                return Math.floor(Math.random() * c + n);
            },

            /**
             * 通过随机因子获取随机字符
             * @returns {*}
             */
            randStr: function () {
                var _this = this;
                var leng = _this.str.length - 1;
                var randkey = _this.randint(0, leng);
                return _this.str[randkey];
            },

            /**
             * 获取指定长度的验证码字符串
             * @param len
             * @returns {string}
             */
            create: function (len) {
                var _this = this;
                var l = len || 10;
                var str = "";
                for (var i = 0; i < l; i++) {
                    str += _this.randStr();
                }
                return str;
            }
        };

        //length = length ? length : 10;
        //返回随机字符串
        return key.create(length);
    };
    /**
     *  取n至m间的随机值
     *  @returns {*}
     */
    var randint = function (n, m) {
        var c = m - n + 1;
        return Math.floor(Math.random() * c + n);
    };

    /**
     *  验证码函数
     * @param dom 现实验证码的DOM对象
     * @param options 验证码相关选项设置
     */
    var vCode = function (dom, options) {
        this.code ="";  //缓存生成的验证码字符
        this.codeDoms = [];             // 验证码DOM对象
        this.lineDoms = [];               //干扰线DOM对象
        this.dom = dom;

        this.initOptions(options);  //初始化默认属性
        this.init();                            //
        this.addEvent();                  //
        this.update();                      //
        this.mask();                         //
    };

    vCode.prototype.init = function () {
        this.dom.style.position = "relative";
        this.dom.style.overflow = "hidden";
        this.dom.style.cursor = "pointer";
        this.dom.title = "点击更换验证码";
        this.dom.style.background = this.options.bgColor;
        this.w = this.dom.clientWidth;
        this.h = this.dom.clientHeight;
        this.uW = this.w / this.options.len;
    };

    vCode.prototype.mask = function () {
        var dom = document.createElement("div");
        dom.style.cssText = [
            "width: 100%",
            "height: 100%",
            "left: 0",
            "top: 0",
            "position: absolute",
            "cursor: pointer",
            "z-index: 9999999"
        ].join(";");

        dom.title = "点击更换验证码";

        this.dom.appendChild(dom);
    };

    vCode.prototype.addEvent = function () {
        var _this = this;
        _this.dom.addEventListener("click", function () {
            _this.update.call(_this);
        });
    };

    /**
     *  初始化验证码相关选项设置
     * @param options 自定义验证码选项属性对象
     */
    vCode.prototype.initOptions = function (options) {

        //默认属性对象
        var default_options = function () {
            this.len = 4;      //字符串长度4
            this.fontSizeMin = 20;   //显示最大的字体大小
            this.fontSizeMax = 48;  //显示最小的字体大小
            //用于显示字符的颜色集合
            this.colors = [
                "green",
                "red",
                "blue",
                "#53da33",
                "#AA0000",
                "#FFBB00"
            ];
            //验证码背景颜色
            this.bgColor = "#FFF";
            //用于显示字符的字体集合
            this.fonts = [
                "Times New Roman",
                "Georgia",
                "Serif",
                "sans-serif",
                "arial",
                "tahoma",
                "Hiragino Sans GB"
            ];
            //干扰线条数
            this.lines = 8;
            //干扰线显示颜色集合
            this.lineColors = [
                "#888888",
                "#FF7744",
                "#888800",
                "#008888"
            ];
            //干扰线最小高度以及最大高度
            this.lineHeightMin = 1;
            this.lineHeightMax = 3;
            //干扰线最小宽度以及最大宽度
            this.lineWidthMin = 1;
            this.lineWidthMax = 60;
        };
        //生成默认的验证码选项
        this.options = new default_options();
        //当自定义的验证码选项包含有效值时，替换默认的验证码选项
        if (typeof options === "object") {
            for (i in options) {
                this.options[i] = options[i];
            }
        }
    };

    /**
     *  更新验证码
     */
    vCode.prototype.update = function () {
        for (var i = 0; i < this.codeDoms.length; i++) {
            this.dom.removeChild(this.codeDoms[i]);
        }
        for (var i = 0; i < this.lineDoms.length; i++) {
            this.dom.removeChild(this.lineDoms[i]);
        }
        this.createCode();
        this.draw();
    };
    /**
     * 创建验证字符串
     */
    vCode.prototype.createCode = function () {
        this.code = randstr(this.options.len);
    };
    /**
     * 比较
     * @param code
     * @returns {boolean}
     */
    vCode.prototype.verify = function (code) {
        return this.code === code;
    };
    /**
     * 绘制验证码
     */
    vCode.prototype.draw = function () {
        this.codeDoms = [];
        for (var i = 0; i < this.code.length; i++) {
            this.codeDoms.push(this.drawCode(this.code[i], i));
        }
        this.drawLines();
    };

    /**
     * 绘制验证字符
     * @param code
     * @param index
     * @returns {Element}
     */
    vCode.prototype.drawCode = function (code, index) {
        var dom = document.createElement("span");

        dom.style.cssText = [
            "font-size:" + randint(this.options.fontSizeMin, this.options.fontSizeMax) + "px",
            "color:" + this.options.colors[randint(0, this.options.colors.length - 1)],
            "position: absolute",
            "left:" + randint(this.uW * index, this.uW * index + this.uW - 10) + "px",
            "top:" + randint(0, this.h - 30) + "px",
            "transform:rotate(" + randint(-30, 30) + "deg)",
            "-ms-transform:rotate(" + randint(-30, 30) + "deg)",
            "-moz-transform:rotate(" + randint(-30, 30) + "deg)",
            "-webkit-transform:rotate(" + randint(-30, 30) + "deg)",
            "-o-transform:rotate(" + randint(-30, 30) + "deg)",
            "font-family:" + this.options.fonts[randint(0, this.options.fonts.length - 1)],  //取随机字体
            "font-weight:" + randint(400, 900)   //
        ].join(";");

        dom.innerHTML = code;
        this.dom.appendChild(dom);

        return dom;
    };

    /**
     *  绘制干扰线
     */
    vCode.prototype.drawLines = function () {
        this.lineDoms = [];
        for (var i = 0; i < this.options.lines; i++) {
            var dom = document.createElement("div");

            dom.style.cssText = [
                "position: absolute",
                "opacity: " + randint(3, 8) / 10,
                "width:" + randint(this.options.lineWidthMin, this.options.lineWidthMax) + "px",
                "height:" + randint(this.options.lineHeightMin, this.options.lineHeightMax) + "px",
                "background: " + this.options.lineColors[randint(0, this.options.lineColors.length - 1)],
                "left:" + randint(0, this.w - 20) + "px",
                "top:" + randint(0, this.h) + "px",
                "transform:rotate(" + randint(-30, 30) + "deg)",
                "-ms-transform:rotate(" + randint(-30, 30) + "deg)",
                "-moz-transform:rotate(" + randint(-30, 30) + "deg)",
                "-webkit-transform:rotate(" + randint(-30, 30) + "deg)",
                "-o-transform:rotate(" + randint(-30, 30) + "deg)",
                "font-family:" + this.options.fonts[randint(0, this.options.fonts.length - 1)],
                "font-weight:" + randint(400, 900)
            ].join(";");
            this.dom.appendChild(dom);

            this.lineDoms.push(dom);
        }
    };

    this.vCode = vCode;

}).call(this);

