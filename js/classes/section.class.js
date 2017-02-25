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
    var code = '';
    var classVar = className.replace(/^\S/g,function(s){return s.toLowerCase();});

    /** 生成標頭設定 **/
    classVar += ''
    code += '    /** 取得表單資料 **/\n';

    for(i = 0; i < num; i++) {

        /** 生成屬性值 **/
        name = $.trim(args[i]).split(':')[0];
        description = $.trim(args[i]).split(':')[1];
        bigFirstName = args[i].split(':')[0].replace(/^\S/g,function(s){return s.toUpperCase();});
        code += '    $' + name + " = $_POST['" + name  + "']; \n";
    }

    code += '\n';
    code += '    /** 將表單資料注入容器 **/\n';
    code += '    $' + classVar + ' = new ' + className + ';\n';

    for(i = 0; i < num; i++) {

        /** 生成屬性值 **/
        name = $.trim(args[i]).split(':')[0];
        description = $.trim(args[i]).split(':')[1];
        bigFirstName = args[i].split(':')[0].replace(/^\S/g,function(s){return s.toUpperCase();});
        code += '    $' + classVar + '->set' + bigFirstName + '($' + name + ');\n';
    }

    code += '\n';
    code += '    /** 進行資料驗証 **/\n';
    code += '    $deny = array(); /** 要排除驗証的欄位 **/\n';
    code += '    $result = $' + classVar + '->validator($deny);\n';
    code += '    if(!empty($result)) { /** 有欄位驗証沒過時 **/\n';
    code += '        /** @todo 驗証沒過時處裡程式碼 **/\n';
    code += '    }\n';

    return code;
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
    var num = args.length;
    var code = '';
    var classVar = className.replace(/^\S/g,function(s){return s.toLowerCase();});

    /** 生成標頭設定 **/
    classVar += ''
    code += '    $' + classVar + ' = new ' + className + ';\n';

    for(i = 0; i < num; i++) {

        /** 生成屬性值 **/
        name = $.trim(args[i]).split(':')[0];
        description = $.trim(args[i]).split(':')[1];
        bigFirstName = name.replace(/^\S/g,function(s){return s.toUpperCase();});
        code += '    $' + classVar + '->set' + bigFirstName + '($' + classVar + '->get' + bigFirstName + '());\n';
    }

    return code;
}
