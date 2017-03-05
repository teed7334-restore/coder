function generatorJSGetAllList(args, className) {

    var code = '';

    code += '<script>\n';
    code += generatorJSDocumentReadyTitle();
    code += generatorJSInsertClick(className);
    code += generatorJSEditClick(className);
    code += generatorJSRemoveClick(className);
    code += generatorJSRunResultObject();
    code += generatorJSDocumentReadyFooter();
    code += generatorJSResultObject();
    code += '</script>\n';

    return code;
}

function generatorJSInsertForm(args, className) {

    var code = '';

    code += '<script>\n';
    code += generatorJSDocumentReadyTitle();
    code += generatorJSInsertSubmitClick(className);
    code += generatorJSRunResultObjectAndReDirect(className);
    code += generatorJSDocumentReadyFooter();
    code += generatorJSInsertFormValidate(args);
    code += generatorJSResultObject();
    code += '</script>\n';

    return code;
}

function generatorJSEditForm(args, className) {

    var code = '';

    code += '<script>\n';
    code += generatorJSDocumentReadyTitle();
    code += generatorJSEditSubmitClick();
    code += generatorJSRunResultObjectAndReDirect(className);
    code += generatorJSDocumentReadyFooter();
    code += generatorJSEditFormValidate(args);
    code += generatorJSResultObject();
    code += '</script>\n';

    return code;
}

function generatorJSDocumentReadyTitle() {

    var code = '';

    code += '$(document).ready(function() {\n';
    code += '\n';

    return code;
}

/**
 * 生成檢查表單驗証js
 * @param  array  args 要用到的變數
 * @return string      檢查表單驗証js
 */
function generatorJSInsertSubmitClick() {

    var code = '';

    code += "    $('form[data-id=coder-form] button[data-id=coder-submit]').click(function() {\n";
    code += "\n";
    code += generatorVarDocBlock('存放驗証失敗訊息', 'string', 'errorMessage', 8);
    code += '        var errorMessage = formValidate();\n';
    code += '\n';
    code += "        /** 檢查表單所有資料是否通過驗証 **/\n";
    code += "        if('' === errorMessage) { /** 表單驗証成功 **/\n";
    code += "            $('form[data-id=coder-form]').submit();\n";
    code += "        }\n";
    code += "        else { /** 表單驗証失敗 **/\n";
    code += "            alert(errorMessage);\n";
    code += "        }\n";
    code += "    });\n";
    code += '\n';

    return code;
}

/**
 * 生成修改表單驗証js
 * @param  array  args 要用到的變數
 * @return string      檢查表單驗証js
 */
function generatorJSEditSubmitClick() {

    var code = '';

    code += "    $('form[data-id=coder-form] button[data-id=coder-submit]').click(function() {\n";
    code += "\n";
    code += generatorVarDocBlock('存放驗証失敗訊息', 'string', 'errorMessage', 8);
    code += '        var errorMessage = formValidate();\n';
    code += '\n';
    code += "        /** 檢查表單所有資料是否通過驗証 **/\n";
    code += "        if('' === errorMessage) { /** 表單驗証成功 **/\n";
    code += "            $('form[data-id=coder-form]').submit();\n";
    code += "        }\n";
    code += "        else { /** 表單驗証失敗 **/\n";
    code += "            alert(errorMessage);\n";
    code += "        }\n";
    code += "    });\n";
    code += '\n';

    return code;
}

function generatorJSRunResultObjectAndReDirect(className) {

    var code = '';

    code += '\n';
    code += '    var result = resultObject();\n';
    code += '    if(result) {\n';
    code += "        location.href = '/" + className + "/index';\n";
    code += '    }\n';
    code += '\n';

    return code;
}

function generatorJSRunResultObject() {

    var code = '';

    code += '\n';
    code += '    resultObject();\n';
    code += '\n';

    return code;
}

function generatorJSResultObject() {

    var code = '';

    code += '\n';
    code += generatorMethodDocBlock('處理伺服器端回傳訊息', [''], 'void', '', 0);
    code += 'function resultObject() {\n';
    code += '\n';
    code += generatorConstDocBlock('資料待輸入系統代號', 'string', "DATA_WAIT_CODE");
    code += "    const DATA_WAIT_CODE = '100';\n";
    code += '\n';
    code += generatorConstDocBlock('資料處理完成系統代號', 'string', "SUCCESS_CODE");
    code += "    const SUCCESS_CODE = '200';\n";
    code += '\n';
    code += generatorConstDocBlock('參數驗証失敗系統代號', 'string', "INVALIDATE_PARAMS_CODE");
    code += "    const INVALIDATE_PARAMS_CODE = '201';\n";
    code += '\n';
    code += generatorConstDocBlock('系統代號', 'string', "RESULT_CODE");
    code += "    const RESULT_CODE = '<" + '?php' + " $resultObject->getResultCode(); ?>';\n";
    code += '\n';
    code += generatorConstDocBlock('系統訊息', 'string', "RESULT_MESSAGE");
    code += "    const RESULT_MESSAGE = '<" + '?php' + " $resultObject->getResultMessage(); ?>';\n";
    code += '\n';
    code += '    if(INVALIDATE_PARAMS_CODE === RESULT_CODE) { /** PHP資料驗証失敗時 **/\n';
    code += '        formValidate();\n';
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

function generatorJSInsertFormValidate(args) {

    var code = '';
    var num = args.length;

    code += '\n';
    code += generatorMethodDocBlock('表單資料驗証', [''], 'string', '驗証失敗訊息', 0);
    code += 'function formValidate() {\n';
    code += "\n";
    code += generatorVarDocBlock('存放驗証失敗訊息', 'string', 'errorMessage');
    code += "    var errorMessage = '';\n";
    code += "\n";
    for(i = 1; i < num; i++) {
        name = $.trim(args[i]).split(':')[0];
        description = $.trim(args[i]).split(':')[1];
        code += "    /** 驗証" + description + "欄位資料格式 **/\n";
        code += "    re = $('form[data-id=coder-form] input#" + name + "').attr('data-regexp');\n";
        code += "    validateFailureMessage = $('form[data-id=coder-form] input#" + name + "').attr('data-validate-failure-message') + '\\n';\n";
        code += "    " + name + " = $('form[data-id=coder-form] input#" + name + ").val();\n";
        code += "    if(!re.test(" + name + ")) { /** " + description + "欄位驗証失敗 **/\n";
        code += "        $('form[data-id=coder-form] div[data-id=coder-" + name + "-div]').removeClass('has-success').addClass('has-error');\n";
        code += "        errorMessage += validateFailureMessage\n";
        code += "    }\n";
        code += "    else { /** " + description + "欄位驗証成功 **/\n";
        code += "        $('form[data-id=coder-form] div[data-id=coder-" + name + "-div]').removeClass('has-error').addClass('has-success');\n";
        code += "    }\n";
        code += "\n";
    }
    code += '    return errorMessage;\n';
    code += '}\n';
    code += '\n';

    return code;
}

function generatorJSEditFormValidate(args) {

    var code = '';
    var num = args.length;

    code += '\n';
    code += generatorMethodDocBlock('表單資料驗証', [''], 'string', '驗証失敗訊息', 0);
    code += 'function formValidate() {\n';
    code += "\n";
    code += generatorVarDocBlock('存放驗証失敗訊息', 'string', 'errorMessage');
    code += "    var errorMessage = '';\n";
    code += "\n";
    for(i = 0; i < num; i++) {
        name = $.trim(args[i]).split(':')[0];
        description = $.trim(args[i]).split(':')[1];
        code += "    /** 驗証" + description + "欄位資料格式 **/\n";
        code += "    re = $('form[data-id=coder-form] input#" + name + "').attr('data-regexp');\n";
        code += "    validateFailureMessage = $('form[data-id=coder-form] input#" + name + "').attr('data-validate-failure-message') + '\\n';\n";
        code += "    " + name + " = $('form[data-id=coder-form] input#" + name + ").val();\n";
        code += "    if(!re.test(" + name + ")) { /** " + description + "欄位驗証失敗 **/\n";
        code += "        $('form[data-id=coder-form] div[data-id=coder-" + name + "-div]').removeClass('has-success').addClass('has-error');\n";
        code += "        errorMessage += validateFailureMessage\n";
        code += "    }\n";
        code += "    else { /** " + description + "欄位驗証成功 **/\n";
        code += "        $('form[data-id=coder-form] div[data-id=coder-" + name + "-div]').removeClass('has-error').addClass('has-success');\n";
        code += "    }\n";
        code += "\n";
    }
    code += '    return errorMessage;\n';
    code += '}\n';
    code += '\n';

    return code;
}

function generatorJSDocumentReadyFooter() {

    var code = '';

    code += '});\n';

    return code;
}

function generatorJSInsertClick(className) {

    var code = '';

    code += generatorMethodDocBlock('新增按鈕被按下時觸發跳去新增頁面', [''], 'void', '', 4);
    code += "    $('button[data-group=insert]').click(function() {\n";
    code += "        location.href = '/" + className + "/Insert';\n";
    code += '    })\n';
    code += '\n';

    return code;
}

function generatorJSEditClick(className) {

    var code = '';

    code += generatorMethodDocBlock('修改按鈕被按下時觸發跳去修改頁面', [''], 'void', '', 4);
    code += "    $('button[data-group=edit]').click(function() {\n";
    code += "        var pk = $(this).attr('data-id');\n";
    code += "        location.href = '/" + className + "/edit/' + pk;\n";
    code += '    })\n';
    code += '\n';

    return code;
}

function generatorJSRemoveClick(className) {

    var code = '';

    code += generatorMethodDocBlock('刪除按鈕被按下時觸發跳去刪除頁面', [''], 'void', '', 4);
    code += "    $('button[data-group=remove]').click(function() {\n";
    code += '\n';
    code += generatorVarDocBlock('資料主鍵', 'string', 'pk', 8);
    code += "        var pk = $(this).attr('data-id');\n";
    code += '\n';
    code += generatorVarDocBlock('確認是否要刪除', 'bool', 'r', 8);
    code += "        var r = confirm('請問您是否要刪除此筆資料');";
    code += '\n';
    code += '\n';
    code += '        if(r) { /** 跳去刪除頁面 **/\n';
    code += "            location.href = '/" + className + "/remove/' + pk;\n";
    code += '        }\n'
    code += '    })\n';
    code += '\n';

    return code;
}
