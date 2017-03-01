/**
 * 生成PHP Controller
 * @param  array  args 要用到的變數
 * @param  string className 類別名稱
 * @param  string namespace 命名空間
 * @return string           CI Controller
 */
function generatorController(args, className, namespace) {

    /** 初始化參數 **/
    var code = '';

    /** 生成屬性值 **/
    name = args[0].split(':')[0];
    description = args[0].split(':')[1];
    bigFirstName = name.replace(/^\S/g,function(s){return s.toUpperCase();});

    code += generatorPHPControllerHeader(namespace, className);
    code += generatorPHPControllerInit();
    code += generatorPHPControllerGetAllList(className);
    code += generatorPHPControllerInsert(args, className, namespace);
    code += generatorPHPControllerFooter();

    return code;
}

/**
 * 生成php類別標頭設定
 * @return string php類別標頭設定
 */
function generatorPHPControllerHeader(namespace, className) {

    var code = '';

    code += '<' + '?php' + '\n';
    code += "defined('BASEPATH') or exit('No direct script access allowed');\n";
    code += '\n';
    code += 'use ' + namespace + '\\' + className + ' as ' + className + ';\n';
    code += '\n';
    code += 'class ' + className.toLowerCase() + ' extends CI_Controller {\n';
    code += '\n';
    code += '    public $' + className + ';\n';
    code += '\n';

    return code;
}

/**
 * 生成建構式
 * @return void
 */
function generatorPHPControllerInit() {

    var code = '';

    code += '\n';
    code += generatorMethodDocBlock('建構式', [''], 'void', '');
    code += '    public function __construct() {\n';
    code += "        parent::__construct();\n";
    code += '    }\n';
    code += '\n';

    return code;
}

/**
 * 生成新增單筆資料頁面
 * @param  string className 類別名稱
 * @return string           取得所有資料函數
 */
function generatorPHPControllerGetAllList(className) {

    var code = '';

    code += '\n';
    code += generatorMethodDocBlock('查詢所有資料頁面', [''], 'void', className + '所有資料');
    code += '    public function index() {\n';
    code += '\n';
    code += '        $this->' + className + ' = new ' + className + '();\n';
    code += '\n';
    code += '        $response = array();\n';
    code += "        $response['" + className + "'] = array();\n";
    code += "        $this->load->model('" + className + "_model', null, '" + className + "_model');\n";
    code += "        $response['" + className + "'] = $this->" + className + "_model->getAllList();\n";
    code += '\n';
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
function generatorPHPControllerInsert(args, className, namespace) {

    var code = '';
    var num = args.length;
    var pkName = args[0].split(':')[0];

    code += '\n';
    code += generatorMethodDocBlock('新增單筆資料頁面', [''], 'void', className + '單筆資料');
    code += '    public function insert() {\n';
    code += '\n';
    code += '        $this->' + className + ' = new ' + className + '();\n';
    code += '\n';
    code += '        $response = array();\n';
    code += "        $response['" + className + "'] = $this->" + className + ";\n";
    code += "        $response['validateResult'] = array();\n";
    code += "        $response['databaseResult'] = '';\n";
    code += "        $response['isPost'] = '0';\n";
    code += "\n";
    code += "        if(!empty($_POST)) {\n";
    code += '        \n';
    for(i = 1; i < num; i++) {

        /** 生成屬性值 **/
        name = args[i].split(':')[0];
        description = args[i].split(':')[1];
        type = args[i].split(':')[2];
        bigFirstName = name.replace(/^\S/g,function(s){return s.toUpperCase();});

        code += '            $this->' + className + '->set' + bigFirstName + '((' + type + ') $_POST[\'' + name + '\']);\n';
    }
    code += "\n";
    code += "            $deny = array('" + pkName + "');\n";
    code += "            $response['validateResult'] = $this->" + className + '->validator();\n';
    code += "            if(empty($response['validateResult'])) {\n";
    code += "                $this->load->model('" + className + "_model', null, '" + className + "_model');\n";
    code += '                unset($' + className + '->' + pkName + ');\n';
    code += "                $response['databaseResult'] = $this->" + className + "->insert($" + className + ");\n";
    code += "            }\n";
    code += "            $response['validateResult'] = json_encode($response['validateResult']);\n";
    code += "            $response['isPost'] = '1';\n";
    code += '        }\n';
    code += '\n';
    code += "        $this->load->view('" + className + "/insert', $response);\n";
    code += '\n';
    code += '    }\n';
    code += '\n';

    return code;
}

/**
 * 生成PHP Model檔尾
 * @return string PHP Model檔尾
 */
function generatorPHPControllerFooter() {

    var code = '';

    code += '}\n';

    return code;
}
