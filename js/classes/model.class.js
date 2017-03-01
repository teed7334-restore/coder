/**
 * 生成PHP Model
 * @param  array  args 要用到的變數
 * @param  string className 類別名稱
 * @param  string namespace 命名空間
 * @return string           PHP Model
 */
function generatorModel(args, className, namespace) {

    /** 初始化參數 **/
    var code = '';

    /** 生成屬性值 **/
    name = args[0].split(':')[0];
    description = args[0].split(':')[1];
    bigFirstName = name.replace(/^\S/g,function(s){return s.toUpperCase();});

    code += generatorPHPModelHeader(namespace, className);
    code += generatorPHPModelInit();
    code += generatorPHPModelGetAllList(className);
    code += generatorPHPModelGetList(className, namespace, bigFirstName);
    code += generatorPHPModelInsertBatch(className, namespace);
    code += generatorPHPModelInsert(className, namespace);
    code += generatorPHPModelUpdate(className, namespace, name, bigFirstName);
    code += generatorPHPModelRemove(className, namespace, name, bigFirstName);
    code += generatorPHPModelFooter();

    return code;
}

/**
 * 生成php類別標頭設定
 * @return string php類別標頭設定
 */
function generatorPHPModelHeader(namespace, className) {

    var code = '';

    code += '<' + '?php' + '\n';
    code += "defined('BASEPATH') or exit('No direct script access allowed');\n";
    code += '\n';
    code += 'use ' + namespace + '\\' + className + ' as ' + className + ';\n';
    code += '\n';
    code += 'class ' + className + '_model extends CI_Model {\n';
    code += '\n';
    code += generatorConstDocBlock('對應的資料表', 'string', 'TABLE', '');
    code += "    const TABLE = '" + className + "';\n";
    code += '\n';

    return code;
}

/**
 * 生成建構式
 * @return void
 */
function generatorPHPModelInit() {

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
 * 生成取得所有資料函數
 * @param  string className 類別名稱
 * @return string           取得所有資料函數
 */
function generatorPHPModelGetAllList(className) {

    var code = '';

    code += '\n';
    code += generatorMethodDocBlock('取得所有資料', [''], 'object', className + '所有資料');
    code += '    public function getAllList() {\n';
    code += "        return $this->db->get(self::TABLE)->result(); \n";
    code += '    }\n';
    code += '\n';

    return code;
}

/**
 * 生成透過主鍵取得資料函數
 * @param  string className    類別名稱
 * @param  string namespace    命名空間
 * @param  string bigFirstName 首字大寫
 * @return string              透過主鍵取得資料函數
 */
function generatorPHPModelGetList(className, namespace, bigFirstName) {

    var code = '';

    code += generatorMethodDocBlock('透過主鍵取得資料', [namespace + '\\' + className + ' $' + className], 'object', className + '單筆資料');
    code += '    public function getList(' + namespace + '\\' + className + ' $' + className + ') {\n';
    code += "        $this->db->where('" + name + "', $" + className + '->get' + bigFirstName + '());\n';
    code += "        return $this->db->get(self::TABLE)->result(); \n";
    code += '    }\n';
    code += '\n';

    return code;
}

/**
 * 生成插入多筆資料函數
 * @param  string className    類別名稱
 * @param  string namespace    命名空間
 * @return string              生成插入多筆資料函數
 */
function generatorPHPModelInsertBatch(className, namespace) {

    var code = '';

    code += generatorMethodDocBlock('插入多筆資料', ['array $data 物件陣列'], 'int', '影響的資料筆數');
    code += '    public function insertBatch(array $data = array()) : int {\n';
    code += '        $this->db->insert_batch(self::TABLE, $' + className + ');\n';
    code += "        return $this->db->affected_rows(); \n";
    code += '    }\n';
    code += '\n';

    return code;
}


/**
 * 生成插入一筆資料函數
 * @param  string className    類別名稱
 * @param  string namespace    命名空間
 * @return string              生成插入一筆資料函數
 */
function generatorPHPModelInsert(className, namespace) {

    var code = '';

    code += generatorMethodDocBlock('插入一筆資料', [namespace + '\\' + className + ' $' + className], 'int', '影響的資料筆數');
    code += '    public function insert(' + namespace + '\\' + className + ' $' + className + ') : int {\n';
    code += '        $this->db->insert(self::TABLE, $' + className + ');\n';
    code += "        return $this->db->affected_rows(); \n";
    code += '    }\n';
    code += '\n';

    return code;
}

/**
 * 生成透過主鍵修改資料函數
 * @param  string className    類別名稱
 * @param  string namespace    命名空間
 * @param  string name         欄位名稱
 * @param  string bigFirstName 首字大寫
 * @return string              透過主鍵修改資料函數
 */
function generatorPHPModelUpdate(className, namespace, name, bigFirstName) {

    var code = '';

    code += generatorMethodDocBlock('透過主鍵修改資料', [namespace + '\\' + className + ' $' + className], 'int', '影響的資料筆數');
    code += '    public function update(' + namespace + '\\' + className + ' $' + className + ') : int {\n';
    code += "        $this->db->where('" + name + "', $" + className + '->get' + bigFirstName + '());\n';
    code += "        $this->db->update(self::TABLE, $" + className + "); \n";
    code += "        return $this->db->affected_rows(); \n";
    code += '    }\n';
    code += '\n';

    return code;
}

/**
 * 生成透過主鍵刪除資料函數
 * @param  string className    類別名稱
 * @param  string namespace    命名空間
 * @param  string name         欄位名稱
 * @param  string bigFirstName 首字大寫
 * @return string              透過主鍵刪除資料函數
 */
function generatorPHPModelRemove(className, namespace, name, bigFirstName) {

    var code = '';

    code += generatorMethodDocBlock('透過主鍵刪除資料', [namespace + '\\' + className + ' $' + className], 'int', '影響的資料筆數');
    code += '    public function remove(' + namespace + '\\' + className + ' $' + className + ') : int {\n';
    code += "        $this->db->where('" + name + "', $" + className + '->get' + bigFirstName + '());\n';
    code += "        $this->db->delete(self::TABLE); \n";
    code += "        return $this->db->affected_rows(); \n";
    code += '    }\n';
    code += '\n';

    return code;
}

/**
 * 生成PHP Model檔尾
 * @return string PHP Model檔尾
 */
function generatorPHPModelFooter() {

    var code = '';

    code += '}\n';

    return code;
}
