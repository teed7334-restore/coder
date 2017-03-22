var Generator = function(docblock) {
    this.docblock = docblock;
};

/**
 * 生成PHP Class
 * @param  array  args        要用到的變數
 * @param  string className   物件名
 * @param  string namespace   命名空間
 * @return string             PHP程式碼
 */
Generator.prototype.generatorClass = function(args, className, namespace) {

    code = '';

    code += this.generatorPHPClassHeader(namespace, className);
    code += this.generatorPHPDataVaildateRules(args);
    code += this.generatorPHPFailureMessage(args);
    code += this.generatorPHPClassProperty(args);
    code += this.generatorPHPDataBind(args);
    code += this.generatorPHPDataVaildate(args);
    code += this.generatorPHPGetMethod(args);
    code += this.generatorPHPSetMethod(args);
    code += this.generatorPHPClassFooter();

    return code;
}

/**
 * 生成php類別標頭設定
 * @param  string namespace 命名空間
 * @param  string className 類別名稱
 * @return string           php標頭設定
 */
Generator.prototype.generatorPHPClassHeader = function(namespace, className) {

    code = '';

    code += '<' + '?php' + '\n';
    code += 'namespace viewModel\\' + namespace + ';\n';
    code += '\n';
    code += "defined('BASEPATH') or exit('No direct script access allowed');\n";
    code += '\n';
    code += this.docblock.generatorPackageDocBlock('class ' + className, 'viewModel\\' + namespace);
    code += 'class ' + className + ' \n';
    code += '{\n';
    code += '\n';

    return code;
}

/**
 * 生成驗証規則
 * @param  array  args    屬性設定
 * @return string         驗証規則
 */
Generator.prototype.generatorPHPDataVaildateRules = function(args) {

    code = '';
    num = args.length;

    for(i = 0; i < num; i++) {

        name = args[i].split(':')[0];
        description = args[i].split(':')[1];

        code += '    /**\n';
        code += '     * @const string VALIDATE_' + name.toUpperCase() + '_RULE ' + description + '欄位驗証規則\n';
        code += '    */\n';
        code += "    const VALIDATE_" + name.toUpperCase() + "_RULE = '';\n";
        code += '\n';
    }

    return code;
}

/**
 * 生成驗証失敗訊息內容
 * @param  array  args    屬性設定
 * @return string         驗証失敗訊息內容
 */
Generator.prototype.generatorPHPFailureMessage = function(args) {

    code = '';
    num = args.length;

    code += '\n';
    for(i = 0; i < num; i++) {

        name = args[i].split(':')[0];
        description = args[i].split(':')[1];
        type = args[i].split(':')[2];
        bigFirstName = name.replace(/^\S/g,function(s){return s.toUpperCase();});

        code += '    /**\n';
        code += '     * @const string VALIDATE_' + name.toUpperCase() + '_MESSAGE ' + description + '欄位驗証失敗訊息\n';
        code += '    */\n';
        code += "    const VALIDATE_" + name.toUpperCase() + "_MESSAGE = '" + description + "資料有誤';\n";
        code += '\n';
    }

    return code;
}

/**
 * 生成類別屬性
 * @param  array  args    屬性設定
 * @return string         類別屬性
 */
Generator.prototype.generatorPHPClassProperty = function(args) {

    code = '';
    num = args.length;

    for(i = 0; i < num; i++) {

        name = args[i].split(':')[0];
        description = args[i].split(':')[1];
        type = args[i].split(':')[2];
        bigFirstName = name.replace(/^\S/g,function(s){return s.toUpperCase();});

        /** 生成屬性值 **/
        code += '\n';
        code += '    /**\n';
        code += '     * @var ' + type + ' $' + name + ' ' + description + '\n';
        code += '    */\n';
        code += '    public $' + name + ';\n';
    }

    return code;
}

/**
 * 生成資料綁定
 * @return string 資料綁定函式
 */
Generator.prototype.generatorPHPDataBind = function(args) {

    code = '';
    num = args.length;

    code += '\n';
    code += this.docblock.generatorMethodDocBlock('資料綁定函式', ['array $data 要綁定的資料'], 'void', '');
    code += '    public function bind(array $data = array()) \n';
    code += '    {\n';
    code += '        foreach ($data as $key => $value) {\n';
    code += '            if (property_exists($this, $key)) {\n';
    code += '                $this->{$key} = $value;\n';
    code += '            }\n';
    code += '        }\n';
    code += '    }\n';

    return code;
}

/**
 * 生成資料驗証
 * @return string 資料驗証函式
 */
Generator.prototype.generatorPHPDataVaildate = function(args) {

    code = '';
    num = args.length;

    code += '\n';
    code += this.docblock.generatorMethodDocBlock('資料驗証函式', ['array $deny 要排除的驗証'], 'array', '未通過驗証的欄位');
    code += '    public function validator(array $deny = array()) : array \n';
    code += '    {\n';
    code += '\n';
    code += '        $failure = array();\n';
    code += '\n';
    code += '        foreach ($this as $key => $value) {\n';
    code += '            $bigName = strtoupper($key);\n';
    code += '            $pattern = constant("self::VALIDATE_{$bigName}_RULE");\n';
    code += '            $errorMessage = constant("self::VALIDATE_{$bigName}_MESSAGE");\n';
    code += '            if (!in_array($key, $deny) && 1 !== preg_match($pattern, $value)) { /** 主鍵欄位驗証失敗 **/\n';
    code += '                $failure[$key] = $errorMessage;\n';
    code += '            }\n';
    code += '        }\n';
    code += '\n';
    code += '        return $failure;\n';
    code += '    }\n';

    return code;
}

Generator.prototype.generatorPHPResultObject = function() {

    code = '';

    code += '<' + '?php' + '\n';
    code += 'namespace classes\\resultObject;\n';
    code += '\n';
    code += "defined('BASEPATH') or exit('No direct script access allowed');\n";
    code += '\n';
    code += this.docblock.generatorPackageDocBlock('class resultObject', 'classes\\resultObject');
    code += "class resultObject \n";
    code += '{\n';
    code += "\n";
    code += this.docblock.generatorConstDocBlock('資料待輸入系統代號', 'string', "DATA_WAIT_CODE");
    code += "    const DATA_WAIT_CODE = '100';\n";
    code += "\n";
    code += this.docblock.generatorConstDocBlock('資料待輸入系統訊息', 'string', "DATA_WAIT");
    code += "    const DATA_WAIT = '資料待輸入';\n";
    code += "\n";
    code += this.docblock.generatorConstDocBlock('資料處理完成系統代號', 'string', "SUCCESS_CODE");
    code += "    const SUCCESS_CODE = '200';\n";
    code += "\n";
    code += this.docblock.generatorConstDocBlock('資料處理完成系統訊息', 'string', "SUCCESS");
    code += "    const SUCCESS = '資料處理完成';\n";
    code += "\n";
    code += this.docblock.generatorConstDocBlock('參數驗証失敗系統代號', 'string', "INVALIDATE_PARAMS_CODE");
    code += "    const INVALIDATE_PARAMS_CODE = '201';\n";
    code += "\n";
    code += this.docblock.generatorConstDocBlock('參數驗証失敗系統訊息', 'string', "INVALIDATE_PARAMS");
    code += "    const INVALIDATE_PARAMS = '參數驗証失敗';\n";
    code += "\n";
    code += this.docblock.generatorConstDocBlock('無任何資料系統代號', 'string', "DATABASE_EMPTY_CODE");
    code += "    const DATABASE_EMPTY_CODE = '301';\n";
    code += "\n";
    code += this.docblock.generatorConstDocBlock('無任何資料系統訊息', 'string', "DATABASE_EMPTY");
    code += "    const DATABASE_EMPTY = '無任何資料';\n";
    code += "\n";
    code += this.docblock.generatorConstDocBlock('資料寫入失敗系統代號', 'string', "DATABASE_WRITE_FAILURE_CODE");
    code += "    const DATABASE_WRITE_FAILURE_CODE = '302';\n";
    code += "\n";
    code += this.docblock.generatorConstDocBlock('資料寫入失敗系統訊息', 'string', "DATABASE_WRITE_FAILURE");
    code += "    const DATABASE_WRITE_FAILURE = '資料寫入失敗';\n";
    code += "\n";
    code += this.docblock.generatorVarDocBlock('系統代號', 'string', "$resultCode");
    code += "    private $resultCode;\n";
    code += "\n";
    code += this.docblock.generatorVarDocBlock('系統訊息', 'string', "$resultMessage");
    code += "    private $resultMessage;\n";
    code += "\n";
    code += this.docblock.generatorMethodDocBlock('建構式', [''], 'void', '');
    code += "    public function __construct() \n";
    code += '    {\n';
    code += "        $this->resultCode = self::SUCCESS_CODE;\n";
    code += "        $this->resultMessage = self::SUCCESS;\n";
    code += "    }\n";
    code += "\n";
    code += this.docblock.generatorMethodDocBlock('取得系統代號', [''], 'string', '系統代號');
    code += "    public function getResultCode() : string \n";
    code += '    {\n';
    code += "        return (string) $this->resultCode;\n";
    code += "    }\n";
    code += "\n";
    code += this.docblock.generatorMethodDocBlock('取得系統訊息', [''], 'string', '系統訊息');
    code += "    public function getResultMessage() : string \n";
    code += '    {\n';
    code += "        return (string) $this->resultMessage;\n";
    code += "    }\n";
    code += "\n";
    code += this.docblock.generatorMethodDocBlock('指定系統代號', ["string $resultCode = ''"], 'void', '');
    code += "    public function setResultCode(string $resultCode = '') \n";
    code += '    {\n';
    code += "        $this->resultCode = $resultCode;\n";
    code += "    }\n";
    code += "\n";
    code += this.docblock.generatorMethodDocBlock('指定系統訊息', ["string $resultCode = ''"], 'void', '');
    code += "    public function setResultMessage(string $resultMessage = '') \n";
    code += '    {\n';
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
Generator.prototype.generatorPHPGetMethod = function(args) {

    code = '';
    num = args.length;

    for(i = 0; i < num; i++) {

        name = args[i].split(':')[0];
        description = args[i].split(':')[1];
        type = args[i].split(':')[2];
        bigFirstName = name.replace(/^\S/g,function(s){return s.toUpperCase();});

        /** 生成get函數 **/
        code += '\n';
        code += '    /**\n';
        code += '     * 取得' + description + '\n';
        code += '     * @return ' + type + ' $this->' + name + ' 取得' + description + '\n';
        code += '    */\n';
        code += '    public function get' + bigFirstName + '() : ' + type + ' \n';
        code += '    {\n';
        code += '        return (' + type + ') $this->' + name + ';\n';
        code += '    }\n';
    }

    return code;
}

/**
 * 生成類別set方法
 * @param  array  args    屬性設定
 * @return string         set方法
 */
Generator.prototype.generatorPHPSetMethod = function(args) {

    code = '';
    num = args.length;

    for(i = 0; i < num; i++) {

        name = args[i].split(':')[0];
        description = args[i].split(':')[1];
        type = args[i].split(':')[2];
        bigFirstName = name.replace(/^\S/g,function(s){return s.toUpperCase();});

        code += '\n';
        code += '    /**\n';
        code += '     * 設定' + description + '\n';
        code += '     * @param ' + type + ' $' + name + ' 設定' + description + '\n';
        code += '     * @return void \n';
        code += '    */\n';
        code += '    public function set' + bigFirstName + '(' + type + ' $' + name + ') \n';
        code += '    {\n';
        code += '        $this->' + name + ' = $' + name + ';\n';
        code += '    }\n';
    }

    return code;
}

Generator.prototype.generatorPHPClassFooter = function() {

    code = '';

    code += '\n';
    code += '}\n';

    return code;
}
