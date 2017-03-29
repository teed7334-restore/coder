var Repository = function(docblock)
{
    this.docblock = docblock;
};

/**
 * 生成PHP Repository
 * @param  array  args 要用到的變數
 * @param  string className 類別名稱
 * @param  string namespace 命名空間
 * @return string           PHP Repository
 */
Repository.prototype.generatorRepository = function(args, className, namespace)
{
    /** 初始化參數 **/
    let code = '';

    /** 生成屬性值 **/
    let name = args[0].split(':')[0];
    let description = args[0].split(':')[1];
    let bigFirstName = name.replace(/^\S/g,function(s){return s.toUpperCase();});

    code += this.generatorPHPRepositoryHeader(namespace, className);
    code += this.generatorPHPRepositoryInit(className);
    code += this.generatorPHPRepositoryGetAllList(className);
    code += this.generatorPHPRepositoryGetList(className, namespace, bigFirstName);
    code += this.generatorPHPRepositoryInsertBatch(className, namespace);
    code += this.generatorPHPRepositoryInsert(className, namespace);
    code += this.generatorPHPRepositoryEdit(className, namespace, name, bigFirstName);
    code += this.generatorPHPRepositoryRemove(className, namespace, name, bigFirstName);
    code += this.generatorPHPRepositoryFooter();

    return code;
}

/**
 * 生成php類別標頭設定
 * @return string php類別標頭設定
 */
Repository.prototype.generatorPHPRepositoryHeader = function(namespace, className)
{
    let code = '';
    let shortClassName = className.toLowerCase();

    code += '<' + '?php' + '\n';
    code += '\n';
    code += 'namespace repository\\' + namespace + ';\n';
    code += '\n';
    code += "defined('BASEPATH') or exit('No direct script access allowed');\n";
    code += '\n';
    code += this.docblock.generatorPackageDocBlock('class ' + shortClassName + 'Repository', 'repository\\' + namespace);
    code += 'class ' + shortClassName + 'Repository \n';
    code += '{\n';
    code += '\n';
    code += this.docblock.generatorVarDocBlock('注入用容器', 'object', '$' + shortClassName, '');
    code += "    protected $" + shortClassName + "Model;\n";
    code += '\n';

    return code;
}

/**
 * 生成建構式
 * @return void
 */
Repository.prototype.generatorPHPRepositoryInit = function(className)
{
    let code = '';
    let shortClassName = className.toLowerCase();

    code += '\n';
    code += this.docblock.generatorMethodDocBlock('建構式', ['$' + shortClassName], 'void', '');
    code += '    public function __construct($' + shortClassName + 'Model) \n';
    code += '    {\n';
    code += "        $this->" + shortClassName + "Model = $" + shortClassName + "Model;\n";
    code += '    }\n';
    code += '\n';

    return code;
}

/**
 * 生成取得所有資料函數
 * @param  string className 類別名稱
 * @return string           取得所有資料函數
 */
Repository.prototype.generatorPHPRepositoryGetAllList = function(className)
{
    let code = '';
    let shortClassName = className.toLowerCase();

    code += '\n';
    code += this.docblock.generatorMethodDocBlock('取得所有資料', [''], 'object', className + '所有資料');
    code += '    public function getAllList() : array \n';
    code += '    {\n';
    code += "        return $this->" + shortClassName + "Model->getAllList(); \n";
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
Repository.prototype.generatorPHPRepositoryGetList = function(className, namespace, bigFirstName)
{
    let code = '';
    let shortClassName = className.toLowerCase();

    code += this.docblock.generatorMethodDocBlock('透過主鍵取得資料', ['$' + shortClassName], 'object', className + '單筆資料');
    code += '    public function getList($' + shortClassName + ') \n';
    code += '    {\n';
    code += "        return $this->" + shortClassName + "Model->getList($" + shortClassName + ");\n";
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
Repository.prototype.generatorPHPRepositoryInsertBatch = function(className, namespace)
{
    let code = '';
    let shortClassName = className.toLowerCase();

    code += this.docblock.generatorMethodDocBlock('插入多筆資料', ['array $data 物件陣列'], 'int', '影響的資料筆數');
    code += '    public function insertBatch(array $data = array()) : int \n';
    code += '    {\n';
    code += '        return $this->' + shortClassName + 'Model->insertBatch($data);\n';
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
Repository.prototype.generatorPHPRepositoryInsert = function(className, namespace)
{
    let code = '';
    let shortClassName = className.toLowerCase();

    code += this.docblock.generatorMethodDocBlock('插入一筆資料', ['$' + shortClassName], 'int', '影響的資料筆數');
    code += '    public function insert($' + shortClassName + ') : int \n';
    code += '    {\n';
    code += '        return $this->' + shortClassName + 'Model->insert($' + shortClassName + ');\n';
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
Repository.prototype.generatorPHPRepositoryEdit = function(className, namespace, name, bigFirstName)
{
    let code = '';
    let shortClassName = className.toLowerCase();

    code += this.docblock.generatorMethodDocBlock('透過主鍵修改資料', ['$' + shortClassName], 'int', '影響的資料筆數');
    code += '    public function edit($' + shortClassName + ') : int \n';
    code += '    {\n';
    code += "        return $this->" + shortClassName + "Model->edit($" + shortClassName + "); \n";
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
Repository.prototype.generatorPHPRepositoryRemove = function(className, namespace, name, bigFirstName)
{
    let code = '';
    let shortClassName = className.toLowerCase();

    code += this.docblock.generatorMethodDocBlock('透過主鍵刪除資料', ['$' + shortClassName], 'int', '影響的資料筆數');
    code += '    public function remove($' + shortClassName + ') : int \n';
    code += '    {\n';
    code += '        return $this->' + shortClassName + 'Model->remove($' + shortClassName + ');\n';
    code += '    }\n';
    code += '\n';

    return code;
}

/**
 * 生成PHP Repository檔尾
 * @return string PHP Repository檔尾
 */
Repository.prototype.generatorPHPRepositoryFooter = function()
{
    let code = '';

    code += '}\n';

    return code;
}
