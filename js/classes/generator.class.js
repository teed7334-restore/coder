/**
 * 生成PHP Class
 * @param  array  args        要用到的變數
 * @param  string className   物件名
 * @param  string namespace   命名空間
 * @return string             PHP程式碼
 */
function generatorClass(args, className, namespace) {

    var code = '';

    code += generatorPHPClassHeader(namespace, className);
    code += generatorPHPDataVaildateRules(args);
    code += generatorPHPFailureMessage(args);
    code += generatorPHPClassProperty(args);
    code += generatorPHPDataVaildate(args);
    code += generatorPHPGetMethod(args);
    code += generatorPHPSetMethod(args);
    code += generatorPHPClassFooter();

    return code;
}

/**
 * 生成php類別標頭設定
 * @param  string namespace 命名空間
 * @param  string className 類別名稱
 * @return string           php標頭設定
 */
function generatorPHPClassHeader(namespace, className) {

    var code = '';

    code += '<' + '?php' + '\n';
    code += 'namespace ' + namespace + ';\n';
    code += '\n';
    code += "defined('BASEPATH') or exit('No direct script access allowed');\n";
    code += '\n';
    code += generatorPackageDocBlock('class ' + className, namespace);
    code += 'class ' + className + ' {\n';
    code += '\n';

    return code;
}

/**
 * 生成驗証規則
 * @param  array  args    屬性設定
 * @return string         驗証規則
 */
function generatorPHPDataVaildateRules(args) {

    var code = '';
    var num = args.length;

    for(i = 0; i < num; i++) {

        name = args[i].split(':')[0];
        description = args[i].split(':')[1];

        code += generatorConstDocBlock(description + '欄位驗証規則', 'string', "VALIDATE_" + name.toUpperCase() + "_RULE");
        code += "    const VALIDATE_" + name.toUpperCase() + "_RULES = '';\n";
        code += '\n';
    }

    return code;
}

/**
 * 生成驗証失敗訊息內容
 * @param  array  args    屬性設定
 * @return string         驗証失敗訊息內容
 */
function generatorPHPFailureMessage(args) {

    var code = '';
    var num = args.length;

    code += '\n';
    for(i = 0; i < num; i++) {

        name = args[i].split(':')[0];
        description = args[i].split(':')[1];
        type = args[i].split(':')[2];
        bigFirstName = name.replace(/^\S/g,function(s){return s.toUpperCase();});

        code += generatorConstDocBlock(description + '欄位驗証失敗訊息', 'string', "VALIDATE_" + name.toUpperCase() + "_MESSAGE", '');
        code += "    const VALIDATE_" + name.toUpperCase() + "_MESSAGE = '';\n";
        code += '\n';
    }

    return code;
}

/**
 * 生成類別屬性
 * @param  array  args    屬性設定
 * @return string         類別屬性
 */
function generatorPHPClassProperty(args) {

    var code = '';
    var num = args.length;

    for(i = 0; i < num; i++) {

        name = args[i].split(':')[0];
        description = args[i].split(':')[1];
        type = args[i].split(':')[2];
        bigFirstName = name.replace(/^\S/g,function(s){return s.toUpperCase();});

        /** 生成屬性值 **/
        code += '\n';
        code += generatorVarDocBlock(description, type, '$' + name);
        code += '    public $' + name + ';\n';
    }

    return code;
}

/**
 * 生成資料驗証
 * @return string 資料驗証函式
 */
function generatorPHPDataVaildate(args) {

    var code = '';
    var num = args.length;

    code += '\n';
    code += generatorMethodDocBlock('資料驗証函式', ['array $deny 要排除的驗証'], 'array', '未通過驗証的欄位');
    code += '    public function validator(array $deny = array()) : array {\n';
    code += '\n';
    code += '        $failure = array();\n';
    code += '\n';

    for(i = 0; i < num; i++) {

        name = args[i].split(':')[0];
        description = args[i].split(':')[1];
        bigFirstName = name.replace(/^\S/g,function(s){return s.toUpperCase();});
        bigName = name.toUpperCase();

        code += '        /** 驗証' + description + '欄位資料格式 **/\n';
        code += '        $pattern = VALIDATE_' + bigName + '_RULE;\n';
        code += '        $errorMessage = VALIDATE_' + bigName + '_MESSAGE;\n';
        code += "        if(!in_array('" + name + "', $deny) && 1 !== preg_match($pattern, $this->" + name + ")) { /** " + description + "欄位驗証失敗 **/\n";
        code += "            $failure['" + name + "'] = $errorMessage;\n";
        code += '        }\n';
        code += '\n';
    }
    code += '\n';
    code += '        return $failure;\n';
    code += '    }\n';

    return code;
}

/**
 * 生成類別get方法
 * @param  array  args    屬性設定
 * @return string         get方法
 */
function generatorPHPGetMethod(args) {

    var code = '';
    var num = args.length;

    for(i = 0; i < num; i++) {

        name = args[i].split(':')[0];
        description = args[i].split(':')[1];
        type = args[i].split(':')[2];
        bigFirstName = name.replace(/^\S/g,function(s){return s.toUpperCase();});

        /** 生成get函數 **/
        code += '\n';
        code += generatorMethodDocBlock('取得' + description, [''], type, '取得' + description);
        code += '    public function get' + bigFirstName + '() : ' + type + ' {\n';
        code += '        return $this->' + name + ';\n';
        code += '    }\n';
    }

    return code;
}

/**
 * 生成類別set方法
 * @param  array  args    屬性設定
 * @return string         set方法
 */
function generatorPHPSetMethod(args) {

    var code = '';
    var num = args.length;

    for(i = 0; i < num; i++) {

        name = args[i].split(':')[0];
        description = args[i].split(':')[1];
        type = args[i].split(':')[2];
        bigFirstName = name.replace(/^\S/g,function(s){return s.toUpperCase();});

        code += '\n';
        code += generatorMethodDocBlock('設定' + description, [type + ' ' + description], 'void', '');
        code += '    public function set' + bigFirstName + '(' + type + ' $' + name + ') {\n';
        code += '        $this->' + name + ' = $' + name + ';\n';
        code += '    }\n';
    }

    return code;
}

function generatorPHPClassFooter() {

    var code = '';

    code += '\n';
    code += '}\n';

    return code;
}
