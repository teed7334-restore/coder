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

function generatorPHPResultObject() {

    var code = '';

    code += "class ResultObject {\n";
    code += "\n";
    code += generatorConstDocBlock('資料待輸入系統代號', 'string', "DATA_WAIT_CODE");
    code += "    const DATA_WAIT_CODE = '100';\n";
    code += "\n";
    code += generatorConstDocBlock('資料待輸入系統訊息', 'string', "DATA_WAIT");
    code += "    const DATA_WAIT = '資料待輸入';\n";
    code += "\n";
    code += generatorConstDocBlock('資料處理完成系統代號', 'string', "SUCCESS_CODE");
    code += "    const SUCCESS_CODE = '200';\n";
    code += "\n";
    code += generatorConstDocBlock('資料處理完成系統訊息', 'string', "SUCCESS");
    code += "    const SUCCESS = '資料處理完成';\n";
    code += "\n";
    code += generatorConstDocBlock('參數驗証失敗系統代號', 'string', "INVALIDATE_PARAMS_CODE");
    code += "    const INVALIDATE_PARAMS_CODE = '201';\n";
    code += "\n";
    code += generatorConstDocBlock('參數驗証失敗系統訊息', 'string', "INVALIDATE_PARAMS");
    code += "    const INVALIDATE_PARAMS = '參數驗証失敗';\n";
    code += "\n";
    code += generatorConstDocBlock('無任何資料系統代號', 'string', "DATABASE_EMPTY_CODE");
    code += "    const DATABASE_EMPTY_CODE = '301';\n";
    code += "\n";
    code += generatorConstDocBlock('無任何資料系統訊息', 'string', "DATABASE_EMPTY");
    code += "    const DATABASE_EMPTY = '無任何資料';\n";
    code += "\n";
    code += generatorConstDocBlock('資料寫入失敗系統代號', 'string', "DATABASE_WRITE_FAILURE_CODE");
    code += "    const DATABASE_WRITE_FAILURE_CODE = '302';\n";
    code += "\n";
    code += generatorConstDocBlock('資料寫入失敗系統訊息', 'string', "DATABASE_WRITE_FAILURE");
    code += "    const DATABASE_WRITE_FAILURE = '資料寫入失敗';\n";
    code += "\n";
    code += generatorVarDocBlock('系統代號', 'string', "$resultCode");
    code += "    private $resultCode;\n";
    code += "\n";
    code += generatorVarDocBlock('系統訊息', 'string', "$resultMessage");
    code += "    private $resultMessage;\n";
    code += "\n";
    code += generatorMethodDocBlock('建構式', [''], 'void', '');
    code += "    public function __construct() {\n";
    code += "        $this->resultCode = self::SUCCESS_CODE;\n";
    code += "        $this->resultMessage = self::SUCCESS;\n";
    code += "    }\n";
    code += "\n";
    code += generatorMethodDocBlock('取得系統代號', [''], 'string', '系統代號');
    code += "    public function getResultCode() {\n";
    code += "        return $this->resultCode;\n";
    code += "    }\n";
    code += "\n";
    code += generatorMethodDocBlock('取得系統訊息', [''], 'string', '系統訊息');
    code += "    public function getResultMessage() {\n";
    code += "        return $this->resultMessage;\n";
    code += "    }\n";
    code += "\n";
    code += generatorMethodDocBlock('指定系統代號', ['string $resultCode = self::SUCCESS_CODE'], 'void', '');
    code += "    public function setResultCode(string $resultCode = self::SUCCESS_CODE) {\n";
    code += "        $this->resultCode = $resultCode;\n";
    code += "    }\n";
    code += "\n";
    code += generatorMethodDocBlock('指定系統訊息', ['string $resultCode = self::SUCCESS'], 'void', '');
    code += "    public function setResultMessage(string $resultMessage = self::SUCCESS) {\n";
    code += "        $this->resultMessage = $resultMessage;\n";
    code += "    }\n";
    code += "}\n";

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
