$(document).ready(function() {
    $('button[data-id=go]').click(function() {
        var namespace = $('input[data-id=namespace]').val();
        var className = $('input[data-id=class]').val();
        var args = $('input[data-id=args]').val().split(',');
        var html = generatorHTML(args, className);
        var classCode = generatorClass(args, className, namespace);
        var formToObject = generatorFormToObject(args, className, namespace);
        var getToSet = generatorGetToSet(args, className, namespace);
        var model = generatorModel(args, className, namespace);
        $('pre[data-id=display-html]').text(html);
        $('pre[data-id=display-class]').text(classCode);
        $('pre[data-id=display-from2object]').text(formToObject);
        $('pre[data-id=display-get2set]').text(getToSet);
        $('pre[data-id=display-model]').text(model);
    });

    $('button[data-id=reset]').click(function() {
        var namespace = $('input[data-id=namespace]').val('Linux/Groups');
        var className = $('input[data-id=class]').val('Users');
        var args = $('input[data-id=args]').val('id:使用者id:int,name:使用者名稱:string,account:使用者帳號:string,password:使用者密碼:string');

        $('pre[data-id=display-html]').text('');
        $('pre[data-id=display-class]').text('');
        $('pre[data-id=display-from2object]').text('');
        $('pre[data-id=display-get2set]').text('');
        $('pre[data-id=display-model]').text('');
    });
});

/**
 * 生成HTML INPUT
 * @param  array  args 要用到的變數
 * @return string      HTML標記
 */
function generatorHTML(args, className) {

    /** 初始化參數 **/
    var num = args.length;
    var html = '';

    /** 生成標頭設定 **/
    html += '<form action="" method="post">\n';

    for(i = 0; i < num; i++) {

        /** 生成HTML INPUT **/
        name = $.trim(args[i]).split(':')[0];
        description = $.trim(args[i]).split(':')[1];
        bigFirstName = args[i].split(':')[0].replace(/^\S/g,function(s){return s.toUpperCase();});
        html += '\n';
        html += '\t<' + '?php /** ' + description + ' **/ ?' + '>\n';
        html += '\t<input type="text" name="' + name + '" value="<' + '?php' + ' echo $' + className + '->get' + bigFirstName + '(); ?>" />\n';
    }

    /** 生成檔尾設定 **/
    html += '</form>';

    return html;
}

/**
 * 生成PHP Class
 * @param  array  args        要用到的變數
 * @param  string className   物件名
 * @param  string namespace   命名空間
 * @return string             PHP程式碼
 */
function generatorClass(args, className, namespace) {

    /** 初始化參數 **/
    var num = args.length;
    var classCode = '';
    var get = '';
    var set = '';

    /** 生成標頭設定 **/
    classCode += '<' + '?php' + '\n';
    classCode += 'namespace ' + namespace + ';\n';
    classCode += '\n';
    classCode += "defined('BASEPATH') or exit('No direct script access allowed');\n";
    classCode += '\n';
    classCode += 'class ' + className + ' {\n';
    classCode += '\n';

    /** 生成驗証規則 **/
    classCode += '\t/**\n';
    classCode += '\t * 資料驗証規則\n';
    classCode += '\t * @var array RULES array([驗証的資料欄位] => [正規表示式])\n';
    classCode += '\t**/\n';
    classCode += '\tconst RULES = array(\n';
    for(i = 0; i < num; i++) {
        name = $.trim(args[i]).split(':')[0];
        classCode += "\t\t" + name + " => '',\n";
    }
    classCode += '\t);\n';

    /** 生成驗証函式 **/
    classCode += '\n';
    classCode += '\t/**\n';
    classCode += '\t * 資料驗証函式\n';
    classCode += '\t * @param array $deny 要排除的驗証\n';
    classCode += '\t * @return array 未通過驗証的欄位\n';
    classCode += '\t**/\n';
    classCode += '\tpublic function validator(array $deny = array()) : array {\n';
    classCode += '\t\t$failure = array();\n';
    classCode += '\t\tforeach(self::RULES as $attributes => $pattern) {\n';
    classCode += '\t\t\tif(!in_array($this->{$attributes}, $deny) && 1 !== preg_match($pattern, $this->{$attributes})) {\n';
    classCode += '\t\t\t\t$failure[] = $this->{$attributes};\n';
    classCode += '\t\t\t}\n';
    classCode += '\t\t}\n';
    classCode += '\t\treturn $failure;\n';
    classCode += '\t}\n';

    /** 生成驗証失敗訊息內容 **/
    classCode += '\n';
    for(i = 0; i < num; i++) {

        name = $.trim(args[i]).split(':')[0];
        description = $.trim(args[i]).split(':')[1];
        type = $.trim(args[i]).split(':')[2];
        bigFirstName = args[i].split(':')[0].replace(/^\S/g,function(s){return s.toUpperCase();});

        classCode += '\t/**\n';
        classCode += '\t * ' + description + '欄位驗証失敗訊息\n';
        classCode += '\t * @var string\n';
        classCode += '\t**/\n';
        classCode += "\tconst VALIDATE_" + name.toUpperCase() + "_MESSAGE = '';\n";
        classCode += '\n';
    }

    for(i = 0; i < num; i++) {

        name = $.trim(args[i]).split(':')[0];
        description = $.trim(args[i]).split(':')[1];
        type = $.trim(args[i]).split(':')[2];
        bigFirstName = args[i].split(':')[0].replace(/^\S/g,function(s){return s.toUpperCase();});

        /** 生成屬性值 **/
        classCode += '\n';
        classCode += '\t/**\n';
        classCode += '\t * ' + description + '\n';
        classCode += '\t * @var ' + type + '\n';
        classCode += '\t */\n';
        classCode += '\tpublic $' + name + ';\n';

        /** 生成get函數 **/
        get += '\n';
        get += '\t/**\n';
        get += '\t * 取得' + description + '\n';
        get += '\t * @return ' + type + ' ' + description + '\n';
        get += '\t */\n';
        get += '\tpublic function get' + bigFirstName + '() : ' + type + ' {\n';
        get += '\t\treturn $this->' + name + ';\n';
        get += '\t}\n';

        /** 生成set函數 **/
        set += '\n';
        set += '\t/**\n';
        set += '\t * 設定' + description + '\n';
        set += '\t * @param ' + type + ' ' + description + '\n';
        set += '\t * @return void';
        set += '\t */\n';
        set += '\tpublic function set' + bigFirstName + '(' + type + ' $' + name + ') {\n';
        set += '\t\t$this->' + name + ' = $' + name + ';\n';
        set += '\t}\n';
    }

    /** 生成檔尾設定 **/
    classCode += '\n';
    classCode += get;
    classCode += '\n';
    classCode += set;
    classCode += '}';

    return classCode;
}

/**
 * 生成表單資料注入物件容器程式
 * @param  array  args        要用到的變數
 * @param  string className   物件名
 * @param  string namespace  命名空間
 * @return string             PHP程式碼
 */
function generatorFormToObject(args, className, namespace) {

    /** 初始化參數 **/
    var num = args.length;
    var classCode = '';
    var classVar = className.replace(/^\S/g,function(s){return s.toLowerCase();});
    var get = '';
    var set = '';

    /** 生成標頭設定 **/
    classVar += ''
    classCode += '\t/** 取得表單資料 **/\n';

    for(i = 0; i < num; i++) {

        /** 生成屬性值 **/
        name = $.trim(args[i]).split(':')[0];
        description = $.trim(args[i]).split(':')[1];
        bigFirstName = args[i].split(':')[0].replace(/^\S/g,function(s){return s.toUpperCase();});
        classCode += '\t$' + name + " = $_POST['" + name  + "']; \n";
    }

    classCode += '\n';
    classCode += '\t/** 將表單資料注入容器 **/\n';
    classCode += '\t$' + classVar + ' = new ' + className + ';\n';

    for(i = 0; i < num; i++) {

        /** 生成屬性值 **/
        name = $.trim(args[i]).split(':')[0];
        description = $.trim(args[i]).split(':')[1];
        bigFirstName = args[i].split(':')[0].replace(/^\S/g,function(s){return s.toUpperCase();});
        classCode += '\t$' + classVar + '->set' + bigFirstName + '($' + name + ');\n';
    }

    classCode += '\n';
    classCode += '\t/** 進行資料驗証 **/\n';
    classCode += '\t$deny = array(); /** 要排除驗証的欄位 **/\n';
    classCode += '\t$result = $' + classVar + '->validator($deny);\n';
    classCode += '\tif(!empty($result)) { /** 有欄位驗証沒過時 **/\n';
    classCode += '\t\t/** To Do **/\n';
    classCode += '\t}\n';

    return classCode;
}

/**
 * 生成物件與物件間，GET注入容器程式
 * @param  array  args        要用到的變數
 * @param  string className   物件名
 * @param  string namespace  命名空間
 * @return string             PHP程式碼
 */
function generatorGetToSet(args, className, namespace) {

    /** 初始化參數 **/
    /**
     * [num description]
     * @var [type]
     */
    var num = args.length;
    var classCode = '';
    var classVar = className.replace(/^\S/g,function(s){return s.toLowerCase();});
    var get = '';
    var set = '';

    /** 生成標頭設定 **/
    classVar += ''
    classCode += '\t$' + classVar + ' = new ' + className + ';\n';

    for(i = 0; i < num; i++) {

        /** 生成屬性值 **/
        name = $.trim(args[i]).split(':')[0];
        description = $.trim(args[i]).split(':')[1];
        bigFirstName = args[i].split(':')[0].replace(/^\S/g,function(s){return s.toUpperCase();});
        classCode += '\t$' + classVar + '->set' + bigFirstName + '($' + classVar + '->get' + bigFirstName + '());\n';
    }

    return classCode;
}

function generatorModel(args, className, namespace) {

    /** 初始化參數 **/
    var num = args.length;
    var classCode = '';
    var get = '';
    var set = '';

    /** 生成標頭設定 **/
    classCode += '<' + '?php' + '\n';
    classCode += "defined('BASEPATH') or exit('No direct script access allowed');\n";
    classCode += '\n';
    classCode += 'class ' + className + '_model extends CI_Model {\n';
    classCode += '\n';
    classCode += '\t/**\n';
    classCode += '\t * 對應的資料表\n';
    classCode += '\t * @var string\n';
    classCode += '\t**/\n';
    classCode += "\tconst TABLE = '" + className + "';\n";
    classCode += '\n';

    /** 生成屬性值 **/
    name = $.trim(args[0]).split(':')[0];
    description = $.trim(args[0]).split(':')[1];
    bigFirstName = args[0].split(':')[0].replace(/^\S/g,function(s){return s.toUpperCase();});

    /** 生成建構式 **/
    classCode += '\n';
    classCode += '\t/**\n';
    classCode += '\t * 建構式\n';
    classCode += '\t * @return void\n';
    classCode += '\t */\n';
    classCode += '\tpublic function __construct() {\n';
    classCode += "\t\tparent::__construct();\n";
    classCode += '\t}\n';
    classCode += '\n';

    /** 生成取得所有資料函數 **/
    classCode += '\n';
    classCode += '\t/**\n';
    classCode += '\t * 取得所有資料\n';
    classCode += '\t * @return object ' + className + '所有資料\n';
    classCode += '\t */\n';
    classCode += '\tpublic function getAllList() {\n';
    classCode += "\t\treturn $this->db->get(self::TABLE)->result(); \n";
    classCode += '\t}\n';
    classCode += '\n';

    /** 生成透過主鍵取得資料函數 **/
    classCode += '\t/**\n';
    classCode += '\t * 透過主鍵取得資料\n';
    classCode += '\t * @return object ' + className + '單筆資料\n';
    classCode += '\t */\n';
    classCode += '\tpublic function getList(' + namespace + '/' + className + ' $' + className + ') {\n';
    classCode += "\t\t$this->db->where('" + name + "', $" + className + '->get' + bigFirstName + '());\n';
    classCode += "\t\treturn $this->db->get(self::TABLE)->result(); \n";
    classCode += '\t}\n';
    classCode += '\n';

    /** 生成插入一筆資料函數 **/
    classCode += '\t/**\n';
    classCode += '\t * 插入一筆資料\n';
    classCode += '\t * @return int ' + className + '影響的資料筆數\n';
    classCode += '\t */\n';
    classCode += '\tpublic function insert(' + namespace + '/' + className + ' $' + className + ') : int {\n';
    classCode += '\t\t$this->db->insert(self::TABLE, $' + className + ');\n';
    classCode += "\t\treturn $this->db->affected_rows(); \n";
    classCode += '\t}\n';
    classCode += '\n';

    /** 生成透過主鍵修改資料函數 **/
    classCode += '\t/**\n';
    classCode += '\t * 透過主鍵修改資料\n';
    classCode += '\t * @return int ' + className + '影響的資料筆數\n';
    classCode += '\t */\n';
    classCode += '\tpublic function update(' + namespace + '/' + className + ' $' + className + ') : int {\n';
    classCode += "\t\t$this->db->where('" + name + "', $" + className + '->get' + bigFirstName + '());\n';
    classCode += "\t\t$this->db->update(self::TABLE, $" + className + "); \n";
    classCode += "\t\treturn $this->db->affected_rows(); \n";
    classCode += '\t}\n';
    classCode += '\n';

    /** 生成透過主鍵刪除資料函數 **/
    classCode += '\t/**\n';
    classCode += '\t * 透過主鍵刪除資料\n';
    classCode += '\t * @return int ' + className + '影響的資料筆數\n';
    classCode += '\t */\n';
    classCode += '\tpublic function remove(' + namespace + '/' + className + ' $' + className + ') : int {\n';
    classCode += "\t\t$this->db->where('" + name + "', $" + className + '->get' + bigFirstName + '());\n';
    classCode += "\t\t$this->db->delete(self::TABLE); \n";
    classCode += "\t\treturn $this->db->affected_rows(); \n";
    classCode += '\t}\n';
    classCode += '\n';

    classCode += '}';

    return classCode;
}
