/**
 * Created by fjc
 */

var Book = (function () {
    var bookNum = 0;

    function checkBook() {

    }

    var _o = function (newID, newName, newPrice) {
        var name, price;

        function checkId(id) {

        }

        this.getName = function () {

        }
        this.id = newID;

        this.copy = function () {

        }
    }
    //静态共有属性(如果是引用类型可以这么叫，如果是值类型，就不是共有的，有点不严谨)
    _o.prototype = {
        //静态共有属性
        staticReferenceProperty: {"flag": "1"},
        staticCommonProperty: "静态共有属性",
        //静态共有方法
        staticCommonMethod: function () {
            //_o.prototype.staticCommonProperty = "213";
            this.staticReferenceProperty.flag = "2";
            console.log("静态共有方法");
        }
    }
    /*
     *
     * */
    return _o;

})();
var _book = new Book(1001, "Javascript", "180.99");
var _book2 = new Book(1002, "C#", "180.99");
console.log(Book);
console.log(_book.staticReferenceProperty.flag);
_book.staticCommonMethod();
console.log(_book2.staticReferenceProperty.flag);
