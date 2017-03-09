var Controller = function(docblock){
    this.docblock = docblock;
};

/**
 * 生成PHP Controller
 * @param  array  args 要用到的變數
 * @param  string className 類別名稱
 * @param  string namespace 命名空間
 * @return string           CI Controller
 */
Controller.prototype.generatorPHPController = function(args, className, namespace) {

    /** 初始化參數 **/
    code = '';

    /** 生成屬性值 **/
    name = args[0].split(':')[0];
    description = args[0].split(':')[1];
    bigFirstName = name.replace(/^\S/g,function(s){return s.toUpperCase();});

    code += this.generatorPHPControllerHeader(namespace, className);
    code += this.generatorPHPControllerInit(className);
    code += this.generatorPHPControllerGetAllList(className);
    code += this.generatorPHPControllerInsert(args, className, namespace);
    code += this.generatorPHPControllerEdit(args, className);
    code += this.generatorPHPControllerRemove(args, className);
    code += this.generatorPHPControllerCheckData(args, className);
    code += this.generatorPHPControllerFooter();

    return code;
}

/**
 * 生成php類別標頭設定
 * @return string php類別標頭設定
 */
Controller.prototype.generatorPHPControllerHeader = function(namespace, className) {

    code = '';
    shortClassName = className.toLowerCase();

    code += '<' + '?php' + '\n';
    code += "defined('BASEPATH') or exit('No direct script access allowed');\n";
    code += '\n';
    code += 'use ' + namespace + '\\' + className + ' as ' + className + ';\n';
    code += '\n';
    code += 'class ' + shortClassName + ' extends CI_Controller {\n';
    code += '\n';

    return code;
}

/**
 * 生成建構式
 * @return void
 */
Controller.prototype.generatorPHPControllerInit = function(className) {

    code = '';
    shortClassName = className.toLowerCase();

    code += '\n';
    code += this.docblock.generatorConstDocBlock('參數驗証失敗系統代號', 'string', "INVALIDATE_PARAMS_CODE");
    code += "    const INVALIDATE_PARAMS_CODE = '-1';\n";
    code += '\n';
    code += this.docblock.generatorConstDocBlock('資料寫入失敗系統代號', 'string', "DATABASE_WRITE_FAILURE_CODE");
    code += "    const DATABASE_WRITE_FAILURE_CODE = '-2';\n";
    code += '\n';
    code += this.docblock.generatorConstDocBlock('無任何資料系統代號', 'string', "DATABASE_EMPTY_CODE");
    code += "    const DATABASE_EMPTY_CODE = '-3';\n";
    code += '\n';
    code += this.docblock.generatorVarDocBlock('要注入的Repository容器', 'object', shortClassName + "Repository");
    code += "    protected $" + shortClassName + "Repository;\n";
    code += '\n';
    code += this.docblock.generatorMethodDocBlock('建構式', [''], 'void', '');
    code += '    public function __construct() {\n';
    code += "        parent::__construct();\n";
    code += "        $this->load->model('" + shortClassName + "Model', null, '" + shortClassName + "Model');\n";
    code += "        $this->" + shortClassName + "Repository = new " + shortClassName + "Repository($this->" + shortClassName + "Model);\n";
    code += '    }\n';
    code += '\n';

    return code;
}

/**
 * 生成新增單筆資料頁面
 * @param  string className 類別名稱
 * @return string           取得所有資料函數
 */
Controller.prototype.generatorPHPControllerGetAllList = function(className) {

    code = '';
    shortClassName = className.toLowerCase();

    code += '\n';
    code += this.docblock.generatorMethodDocBlock('查詢所有資料頁面', [''], 'void', className + '所有資料');
    code += '    public function index() {\n';
    code += '\n';
    code += '        $resultObject = new resultObject;\n';
    code += '\n';
    code += '        $response = array();\n';
    code += "        $response['resultObject'] = '';\n";
    code += "        $response['" + className + "'] = '';\n";
    code += '\n';
    code += "        $" + className + " = $this->" + shortClassName + "Repository->getAllList();\n";
    code += '\n';
    code += '        if(0 >= count($' + className + ')) { /** 檢查是否有資料 **/\n';
    code += '            $resultObject->setResultCode($resultObject::DATABASE_EMPTY_CODE);\n';
    code += '            $resultObject->setResultMessage($resultObject::DATABASE_EMPTY);\n';
    code += '        }\n';
    code += '\n';
    code += "        $response['" + className + "'] = $" + className + ";\n";
    code += "        $response['resultObject'] = $resultObject;\n";
    code += "        $this->load->view('" + className + "/index', $response);\n";
    code += '    }\n';
    code += '\n';

    return code;
}

/**
 * 生成修改資料頁面
 * @param  string className 類別名稱
 * @return string           取得所有資料函數
 */
Controller.prototype.generatorPHPControllerEdit = function(args, className) {

    code = '';
    num = args.length;
    pkName = args[0].split(':')[0];
    shortClassName = className.toLowerCase();

    code += '\n';
    code += this.docblock.generatorMethodDocBlock('生成修改資料頁面', ['string $pk'], 'void', className + '所有資料');
    code += "    public function edit(string $pk = '') {\n";
    code += '\n';
    code += '        $' + className + ' = new ' + className + ';\n';
    code += '        $resultObject = new resultObject;\n';
    code += '\n';
    code += '        $response = array();\n';
    code += "        $response['resultObject'] = '';\n";
    code += "        $response['" + className + "'] = '';\n";
    code += '\n';
    code += '        try {\n';
    code += '\n';
    code += "            $result = $this->checkData($pk);\n";
    code += '            if(0 === count($result)) { /** 無效的主鍵 **/\n';
    code += "                throw new Exception(self::INVALIDATE_PARAMS_CODE);\n";
    code += '            }\n';
    code += '\n';
    code += '            if(!empty($_POST)) { /** 透過表單POST時 **/\n';
    code += '\n';
    code += "                /** 將POST過來的資料扔進容器 **/\n";
    for(i = 0; i < num; i++) {

        /** 生成屬性值 **/
        name = args[i].split(':')[0];
        description = args[i].split(':')[1];
        type = args[i].split(':')[2];
        bigFirstName = name.replace(/^\S/g,function(s){return s.toUpperCase();});

        code += "                $" + className + "->set" + bigFirstName + "((" + type + ") $_POST['" + name + "']);\n";
    }
    code += '\n';
    code += "                $result = $" + className + "->validator();\n";
    code += "                if(!empty($result)) { /** 表單驗証失敗 **/\n";
    code += "                    throw new Exception(self::INVALIDATE_PARAMS_CODE);\n";
    code += '                }\n';
    code += '\n';
    code += "                $result = $this->" + shortClassName + "Repository->edit($" + className + ");\n";
    code += '\n';
    code += '                if(0 >= $result) { /** 資料寫入失敗 **/\n';
    code += "                    throw new Exception(self::DATABASE_WRITE_FAILURE_CODE);\n";
    code += '                }\n';
    code += '            }\n';
    code += '        }\n';
    code += '        catch (Exception $e) {\n';
    code += '            if(self::INVALIDATE_PARAMS_CODE === $e->getMessage()) {\n';
    code += '                $resultObject->setResultCode($resultObject::INVALIDATE_PARAMS_CODE);\n';
    code += '                $resultObject->setResultMessage($resultObject::INVALIDATE_PARAMS);\n';
    code += '            }\n';
    code += '            elseif(self::DATABASE_WRITE_FAILURE_CODE === $e->getMessage()) {\n';
    code += '                $resultObject->setResultCode($resultObject::DATABASE_WRITE_FAILURE_CODE);\n';
    code += '                $resultObject->setResultMessage($resultObject::DATABASE_WRITE_FAILURE);\n';
    code += '            }\n';
    code += '        }\n';
    code += '\n';
    code += "        $response['resultObject'] = $resultObject;\n";
    code += "        $response['" + className + "'] = $" + className + ";\n";
    code += "        $this->load->view('" + className + "/edit', $response);\n";
    code += '\n';
    code += '    }\n';
    code += '\n';

    return code;
}

/**
 * 生成刪除資料頁面
 * @param  string className 類別名稱
 * @return string           取得所有資料函數
 */
Controller.prototype.generatorPHPControllerRemove = function(args, className) {

    code = '';
    num = args.length;
    pkName = args[0].split(':')[0];
    pkType = args[0].split(':')[2];
    shortClassName = className.toLowerCase();

    code += '\n';
    code += this.docblock.generatorMethodDocBlock('生成刪除資料頁面', ['string $pk'], 'void', className + '所有資料');
    code += "    public function remove(string $pk = '') {\n";
    code += '\n';
    code += '        $' + className + ' = new ' + className + '();\n';
    code += '        $resultObject = new resultObject;\n';
    code += '\n';
    code += '        $response = array();\n';
    code += "        $response['resultObject'] = '';\n";
    code += '\n';
    code += '        try {\n';
    code += '\n';
    code += "            $result = $this->checkData($pk);\n";
    code += '            if(0 === count($result)) { /** 無效的主鍵 **/\n';
    code += "                throw new Exception(self::INVALIDATE_PARAMS_CODE);\n";
    code += '            }\n';
    code += '\n';
    code += "            $result = $this->" + shortClassName + "Repository->remove($" + className + ");\n";
    code += '            if(0 >= $result) { /** 資料寫入失敗 **/\n';
    code += "                throw new Exception(self::DATABASE_WRITE_FAILURE_CODE);\n";
    code += '            }\n';
    code += '        }\n';
    code += '        catch (Exception $e) {\n';
    code += '            if(self::INVALIDATE_PARAMS_CODE === $e->getMessage()) { /** 資料驗証失敗 **/\n';
    code += '                $resultObject->setResultCode($resultObject::INVALIDATE_PARAMS_CODE);\n';
    code += '                $resultObject->setResultMessage($resultObject::INVALIDATE_PARAMS);\n';
    code += '            }\n';
    code += '            elseif(self::DATABASE_WRITE_FAILURE_CODE === $e->getMessage()) { /** 資料寫入失敗 **/\n';
    code += '                $resultObject->setResultCode($resultObject::DATABASE_WRITE_FAILURE_CODE);\n';
    code += '                $resultObject->setResultMessage($resultObject::DATABASE_WRITE_FAILURE);\n';
    code += '            }\n';
    code += '        }\n';
    code += '\n';
    code += "        $response['resultObject'] = $resultObject;\n";
    code += "        $this->load->view('" + className + "/index', $response);\n";
    code += '\n';
    code += '    }\n';
    code += '\n';

    return code;
}

/**
 * 生成新增單筆資料頁面
 * @param  string className 類別名稱
 * @return string           取得所有資料函數
 */
Controller.prototype.generatorPHPControllerInsert = function(args, className, namespace) {

    code = '';
    num = args.length;
    pkName = args[0].split(':')[0];
    shortClassName = className.toLowerCase();

    code += '\n';
    code += this.docblock.generatorMethodDocBlock('新增單筆資料頁面', [''], 'void', className + '單筆資料');
    code += '    public function insert() {\n';
    code += '\n';
    code += '        $' + className + ' = new ' + className + '();\n';
    code += '        $resultObject = new resultObject;\n';
    code += '\n';
    code += '        $response = array();\n';
    code += "        $response['resultObject'] = '';\n";
    code += "        $response['" + className + "'] = '';\n";
    code += '\n';
    code += '        try {\n';
    code += '\n';
    code += "            if(!empty($_POST)) { /** 透過表單POST時 **/\n";
    code += '\n';
    code += "                /** 將POST過來的資料扔進容器 **/\n";
    for(i = 1; i < num; i++) {

        /** 生成屬性值 **/
        name = args[i].split(':')[0];
        description = args[i].split(':')[1];
        type = args[i].split(':')[2];
        bigFirstName = name.replace(/^\S/g,function(s){return s.toUpperCase();});

        code += '                $' + className + '->set' + bigFirstName + '((' + type + ') $_POST[\'' + name + '\']);\n';
    }
    code += "\n";
    code += "                $deny = array('" + pkName + "');\n";
    code += "                $result = $" + className + "->validator();\n";
    code += "                if(!empty($result)) { /** 表單驗証失敗 **/\n";
    code += "                    throw new Exception(self::INVALIDATE_PARAMS_CODE);\n";
    code += '                }\n';
    code += '\n';
    code += '                unset($' + className + '->' + pkName + ');\n';
    code += "                $result = $this->" + shortClassName + "Repository->insert($" + className + ");\n";
    code += '\n';
    code += '                if(0 >= $result) { /** 資料寫入失敗 **/\n';
    code += "                    throw new Exception(self::DATABASE_WRITE_FAILURE_CODE);\n";
    code += '                }\n';
    code += "            }\n";
    code += '        }\n';
    code += '        catch (Exception $e) {\n';
    code += '            if(self::INVALIDATE_PARAMS_CODE === $e->getMessage()) { /** 資料驗証失敗 **/\n';
    code += '                $resultObject->setResultCode($resultObject::INVALIDATE_PARAMS_CODE);\n';
    code += '                $resultObject->setResultMessage($resultObject::INVALIDATE_PARAMS);\n';
    code += '            }\n';
    code += '            elseif(self::DATABASE_WRITE_FAILURE_CODE === $e->getMessage()) { /** 資料寫入失敗 **/\n';
    code += '                $resultObject->setResultCode($resultObject::DATABASE_WRITE_FAILURE_CODE);\n';
    code += '                $resultObject->setResultMessage($resultObject::DATABASE_WRITE_FAILURE);\n';
    code += '            }\n';
    code += '        }\n';
    code += '\n';
    code += "        $response['resultObject'] = $resultObject;\n";
    code += "        $response['" + className + "'] = $" + className + ";\n";
    code += "        $this->load->view('" + className + "/insert', $response);\n";
    code += '\n';
    code += '    }\n';
    code += '\n';

    return code;
}

/**
 * 生成檢查資料頁面
 * @param  string className 類別名稱
 * @return string           取得所有資料函數
 */
Controller.prototype.generatorPHPControllerCheckData = function (args, className) {

    code = '';
    pkName = args[0].split(':')[0];
    shortClassName = className.toLowerCase();

    code += '\n';
    code += this.docblock.generatorMethodDocBlock('生成檢查資料頁面', ['string $pk'], 'int', className + '所有資料');
    code += "    private function checkData(string $pk = '') : int {\n";
    code += '\n';
    code += '        $' + className + ' = new ' + className + '();\n';
    code += '        $' + className + '->set' + pkName + '($pk);\n';
    code += '\n';
    code += "        $result = $this->" + shortClassName + "Repository->getList($" + className + ");\n";
    code += "        return $result;\n";
    code += '\n';
    code += '    }\n';
    code += '\n';

    return code;
}

/**
 * 生成PHP Model檔尾
 * @return string PHP Model檔尾
 */
Controller.prototype.generatorPHPControllerFooter = function () {

    code = '';

    code += '}\n';

    return code;
}
