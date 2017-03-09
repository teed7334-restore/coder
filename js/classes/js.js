var Js = function(docblock) {
    this.docblock = docblock;
};

Js.prototype.generatorJSGetAllList = function(args, className) {

    code = '';

    code += '<script>\n';
    code += this.generatorJSDocumentReadyTitle();
    code += this.generatorJSInsertClick(className);
    code += this.generatorJSEditClick(className);
    code += this.generatorJSRemoveClick(className);
    code += this.generatorJSRunResultObject();
    code += this.generatorJSDocumentReadyFooter();
    code += this.generatorJSResultObject();
    code += '</script>\n';

    return code;
}

Js.prototype.generatorJSInsertForm = function(args, className) {

    code = '';

    code += '<script>\n';
    code += this.generatorJSDocumentReadyTitle();
    code += this.generatorJSRunResultObjectAndReDirect(className);
    code += this.generatorJSDocumentReadyFooter();
    code += this.generatorJSResultObject();
    code += '</script>\n';

    return code;
}

Js.prototype.generatorJSEditForm = function(args, className) {

    code = '';

    code += '<script>\n';
    code += this.generatorJSDocumentReadyTitle();
    code += this.generatorJSRunResultObjectAndReDirect(className);
    code += this.generatorJSDocumentReadyFooter();
    code += this.generatorJSResultObject();
    code += '</script>\n';

    return code;
}

Js.prototype.generatorJSDocumentReadyTitle = function() {

    code = '';

    code += '$(document).ready(function() {\n';
    code += '\n';

    return code;
}

Js.prototype.generatorJSRunResultObjectAndReDirect = function(className) {

    code = '';

    code += '\n';
    code += '    result = resultObject();\n';
    code += '    if(result) {\n';
    code += "        location.href = '/" + className + "/index';\n";
    code += '    }\n';
    code += '\n';

    return code;
}

Js.prototype.generatorJSRunResultObject = function() {

    code = '';

    code += '\n';
    code += '    resultObject();\n';
    code += '\n';

    return code;
}

Js.prototype.generatorJSResultObject = function() {

    code = '';

    code += '\n';
    code += this.docblock.generatorMethodDocBlock('處理伺服器端回傳訊息', [''], 'void', '', 0);
    code += 'function resultObject() {\n';
    code += '\n';
    code += this.docblock.generatorConstDocBlock('資料待輸入系統代號', 'string', "DATA_WAIT_CODE");
    code += "    const DATA_WAIT_CODE = '100';\n";
    code += '\n';
    code += this.docblock.generatorConstDocBlock('資料處理完成系統代號', 'string', "SUCCESS_CODE");
    code += "    const SUCCESS_CODE = '200';\n";
    code += '\n';
    code += this.docblock.generatorConstDocBlock('參數驗証失敗系統代號', 'string', "INVALIDATE_PARAMS_CODE");
    code += "    const INVALIDATE_PARAMS_CODE = '201';\n";
    code += '\n';
    code += this.docblock.generatorConstDocBlock('系統代號', 'string', "RESULT_CODE");
    code += "    const RESULT_CODE = '<" + '?php' + " $resultObject->getResultCode(); ?>';\n";
    code += '\n';
    code += this.docblock.generatorConstDocBlock('系統訊息', 'string', "RESULT_MESSAGE");
    code += "    const RESULT_MESSAGE = '<" + '?php' + " $resultObject->getResultMessage(); ?>';\n";
    code += '\n';
    code += '    if(INVALIDATE_PARAMS_CODE === RESULT_CODE) { /** PHP資料驗証失敗時 **/\n';
    code += "        $('button[data-id=coder-submit]').trigger('click');\n";
    code += '        return false;\n';
    code += '    }\n';
    code += '    elseif(SUCCESS_CODE !== RESULT_CODE && DATA_WAIT_CODE !== RESULT_CODE) { /** 其他問題導致無法成功時 **/\n';
    code += '        alert(RESULT_MESSAGE);\n';
    code += '        return false;\n';
    code += '    }\n';
    code += '\n';
    code += '    return true;;\n'
    code += '}\n';
    code += '\n';

    return code;
}

Js.prototype.generatorJSDocumentReadyFooter = function() {

    code = '';

    code += '});\n';

    return code;
}

Js.prototype.generatorJSInsertClick = function(className) {

    code = '';

    code += this.docblock.generatorMethodDocBlock('新增按鈕被按下時觸發跳去新增頁面', [''], 'void', '', 4);
    code += "    $('button[data-group=insert]').click(function() {\n";
    code += "        location.href = '/" + className + "/Insert';\n";
    code += '    })\n';
    code += '\n';

    return code;
}

Js.prototype.generatorJSEditClick = function(className) {

    code = '';

    code += this.docblock.generatorMethodDocBlock('修改按鈕被按下時觸發跳去修改頁面', [''], 'void', '', 4);
    code += "    $('button[data-group=edit]').click(function() {\n";
    code += "        pk = $(this).attr('data-id');\n";
    code += "        location.href = '/" + className + "/edit/' + pk;\n";
    code += '    })\n';
    code += '\n';

    return code;
}

Js.prototype.generatorJSRemoveClick = function(className) {

    code = '';

    code += this.docblock.generatorMethodDocBlock('刪除按鈕被按下時觸發跳去刪除頁面', [''], 'void', '', 4);
    code += "    $('button[data-group=remove]').click(function() {\n";
    code += '\n';
    code += this.docblock.generatorVarDocBlock('資料主鍵', 'string', 'pk', 8);
    code += "        pk = $(this).attr('data-id');\n";
    code += '\n';
    code += this.docblock.generatorVarDocBlock('確認是否要刪除', 'bool', 'r', 8);
    code += "        r = confirm('請問您是否要刪除此筆資料');";
    code += '\n';
    code += '\n';
    code += '        if(r) { /** 跳去刪除頁面 **/\n';
    code += "            location.href = '/" + className + "/remove/' + pk;\n";
    code += '        }\n'
    code += '    })\n';
    code += '\n';

    return code;
}
