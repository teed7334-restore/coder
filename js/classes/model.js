var Model = function(docblock)
{
    this.docblock = docblock;
};

/**
 * 生成PHP Model
 * @param  array  args 要用到的變數
 * @param  string className 類別名稱
 * @param  string namespace 命名空間
 * @return string           PHP Model
 */
Model.prototype.generatorModel = function(args, className, namespace)
{
    /** 初始化參數 **/
    let code = '';

    /** 生成屬性值 **/
    let name = args[0].split(':')[0];
    let description = args[0].split(':')[1];
    let bigFirstName = name.replace(/^\S/g,function(s){return s.toUpperCase();});

    code += this.generatorPHPModelHeader(namespace, className);
    code += this.generatorPHPModelInit(className);
    code += this.generatorPHPModelGetAllList(className);
    code += this.generatorPHPModelGetList(className, namespace, bigFirstName);
    code += this.generatorPHPModelInsertBatch(className, namespace);
    code += this.generatorPHPModelInsert(className, namespace);
    code += this.generatorPHPModelEdit(className, namespace, name, bigFirstName);
    code += this.generatorPHPModelRemove(className, namespace, name, bigFirstName);
    code += this.generatorPHPModelFooter();

    return code;
}

/**
 * 生成php類別標頭設定
 * @return string php類別標頭設定
 */
Model.prototype.generatorPHPModelHeader = function(namespace, className)
{
    let code = '';
    let shortClassName = className.toLowerCase();

    code += '<' + '?php' + '\n';
    code += "defined('BASEPATH') or exit('No direct script access allowed');\n";
    code += '\n';
    code += 'class ' + shortClassName + 'Model extends CI_Model \n';
    code += '{\n';
    code += '\n';
    code += this.docblock.generatorConstDocBlock('對應的資料表', 'string', 'TABLE', '');
    code += "    const TABLE = '" + className + "';\n";
    code += '\n';

    return code;
}

/**
 * 生成建構式
 * @return void
 */
Model.prototype.generatorPHPModelInit = function(className)
{
    let code = '';
    let shortClassName = className.toLowerCase();

    code += '\n';
    code += this.docblock.generatorMethodDocBlock('建構式', [''], 'void', '');
    code += '    public function __construct() \n';
    code += '    {\n';
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
Model.prototype.generatorPHPModelGetAllList = function(className)
{
    let code = '';

    code += '\n';
    code += this.docblock.generatorMethodDocBlock('取得所有資料', [''], 'object', className + '所有資料');
    code += '    public function getAllList() : array \n';
    code += '    {\n';
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
Model.prototype.generatorPHPModelGetList = function(className, namespace, bigFirstName)
{
    let code = '';
    let shortClassName = className.toLowerCase();

    code += this.docblock.generatorMethodDocBlock('透過主鍵取得資料', ['$' + shortClassName], 'object', className + '單筆資料');
    code += '    public function getList($' + shortClassName + ') : array \n';
    code += '    {\n';
    code += "        $this->db->where('" + name + "', $" + shortClassName + '->get' + bigFirstName + '());\n';
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
Model.prototype.generatorPHPModelInsertBatch = function(className, namespace)
{
    let code = '';

    code += this.docblock.generatorMethodDocBlock('插入多筆資料', ['array $data 物件陣列'], 'int', '影響的資料筆數');
    code += '    public function insertBatch(array $data = array()) : int \n';
    code += '    {\n';
    code += '        $this->db->insert_batch(self::TABLE, $data);\n';
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
Model.prototype.generatorPHPModelInsert = function(className, namespace)
{
    let code = '';
    let shortClassName = className.toLowerCase();

    code += this.docblock.generatorMethodDocBlock('插入一筆資料', ['$' + shortClassName], 'int', '影響的資料筆數');
    code += '    public function insert($' + shortClassName + ') : int \n';
    code += '    {\n';
    code += '        $this->db->insert(self::TABLE, $' + shortClassName + ');\n';
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
Model.prototype.generatorPHPModelEdit = function(className, namespace, name, bigFirstName)
{
    let code = '';
    let shortClassName = className.toLowerCase();

    code += this.docblock.generatorMethodDocBlock('透過主鍵修改資料', ['$' + shortClassName], 'int', '影響的資料筆數');
    code += '    public function edit($' + shortClassName + ') : int \n';
    code += '    {\n';
    code += "        $this->db->where('" + name + "', $" + shortClassName + '->get' + bigFirstName + '());\n';
    code += "        $this->db->update(self::TABLE, $" + shortClassName + "); \n";
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
Model.prototype.generatorPHPModelRemove = function(className, namespace, name, bigFirstName)
{
    let code = '';
    let shortClassName = className.toLowerCase();

    code += this.docblock.generatorMethodDocBlock('透過主鍵刪除資料', ['$' + shortClassName], 'int', '影響的資料筆數');
    code += '    public function remove($' + shortClassName + ') : int \n';
    code += '    {\n';
    code += "        $this->db->where('" + name + "', $" + shortClassName + '->get' + bigFirstName + '());\n';
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
Model.prototype.generatorPHPModelFooter = function()
{
    let code = '';

    code += '}\n';

    return code;
}
