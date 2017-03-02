function generatorJSGetAllList(args, className) {

    var code = '';

    code += '<script>\n';
    code += generatorJSDocumentReadyTitle();
    code += generatorJSInsertClick(className);
    code += generatorJSEditClick(className);
    code += generatorJSRemoveClick(className);
    code += generatorJSDocumentReadyFooter();
    code += '</script>\n';

    return code;
}

function generatorJSInsertForm(args, className) {

    var code = '';

    code += '<script>\n';
    code += generatorJSDocumentReadyTitle();
    code += generatorJSCheckData(className);
    code += generatorJSInsertSubmitClick(className);
    code += generatorJSRunInsertIsPost();
    code += generatorJSDocumentReadyFooter();
    code += generatorJSInsertFormValidate(args);
    code += generatorJSInsertIsPost();
    code += '</script>\n';

    return code;
}

function generatorJSEditForm(args, className) {

    var code = '';

    code += '<script>\n';
    code += generatorJSDocumentReadyTitle();
    code += generatorJSEditSubmitClick();
    code += generatorJSRunEditIsPost();
    code += generatorJSDocumentReadyFooter();
    code += generatorJSEditFormValidate(args);
    code += generatorJSEditIsPost();
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
    code += '        var errorMessage = insertFormValidate();\n';
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

function generatorJSCheckData(className) {

    var code = '';

    code += generatorConstDocBlock('代入的參數有誤', 'string', 'INVALIDATE_PARAMS');
    code += "    const INVALIDATE_PARAMS = '代入的參數有誤';\n";
    code += '\n';
    code += generatorVarDocBlock('無效的主鍵', 'string', 'invalidatePK');
    code += "    var invalidatePK = '<?php echo $invalidatePK; ?>';\n";
    code += '\n';
    code += "    if('' !== invalidatePK) { /** 無效的主鍵 **/\n";
    code += '        alert(INVALIDATE_PARAMS);\n';
    code += "        location.href = '/" + className + "/index';\n";
    code += "        return;\n";
    code += "    }\n";
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
    code += '        var errorMessage = editFormValidate();\n';
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

function generatorJSRunInsertIsPost() {

    var code = '';

    code += '\n';
    code += '    insertIsPost();\n';
    code += '\n';

    return code;
}

function generatorJSRunEditIsPost() {

    var code = '';

    code += '\n';
    code += '    editIsPost();\n';
    code += '\n';

    return code;
}

function generatorJSInsertIsPost() {

    var code = '';

    code += '\n';
    code += generatorMethodDocBlock('處裡伺服器端回傳錯誤', [''], 'void', '', 0);
    code += 'function insertIsPost() {\n';
    code += '\n';
    code += generatorConstDocBlock('資料寫入成功', 'string', 'DATABASE_WRITE_SUCCESS_MESSAGE');
    code += "    const DATABASE_WRITE_SUCCESS_MESSAGE = '資料寫入成功';\n";
    code += '\n';
    code += generatorConstDocBlock('資料寫入失敗', 'string', 'DATABASE_WRITE_FAILURE_MESSAGE');
    code += "    const DATABASE_WRITE_FAILURE_MESSAGE = '資料寫入失敗';\n";
    code += '\n';
    code += generatorVarDocBlock('己Post過', 'string', 'isPost');
    code += "    var isPost = '<?php echo $isPost; ?>';\n";
    code += '\n';
    code += generatorVarDocBlock('驗証失敗資訊', 'string', 'validateResult');
    code += "    var validateResult = '<?php echo $validateResult; ?>';\n";
    code += '\n';
    code += generatorVarDocBlock('資料庫寫入資訊', 'string', 'databaseResult');
    code += "    var databaseResult = '<?php echo $databaseResult; ?>';\n";
    code += '\n';
    code += generatorVarDocBlock('存放驗証失敗訊息', 'string', 'errorMessage');
    code += "    var errorMessage = '';\n";
    code += "\n";
    code += "    if('1' === isPost) { /** 己POST過 **/\n";
    code += '        /** 取得表單驗証失敗訊息 **/\n';
    code += "        errorMessage = insertFormValidate();\n";
    code += "        if('' !== errorMessage) { /** 表單驗証失敗 **/\n";
    code += "            alert(errorMessage);\n";
    code += "        }\n";
    code += "        else { /** 表單驗証成功 **/\n";
    code += "            if('1' !== databaseResult) { /** 資料庫寫入失敗 **/\n";
    code += "                alert(DATABASE_WRITE_FAILURE_MESSAGE);\n";
    code += "            }\n";
    code += "            else { /** 資料庫寫入成功 **/\n";
    code += "                alert(DATABASE_WRITE_SUCCESS_MESSAGE);\n";
    code += "            }\n";
    code += "        }\n";
    code += "    }\n";
    code += '}\n';
    code += '\n';

    return code;
}

function generatorJSEditIsPost() {

    var code = '';

    code += '\n';
    code += generatorMethodDocBlock('處裡伺服器端回傳錯誤', [''], 'void', '', 0);
    code += 'function editIsPost() {\n';
    code += '\n';
    code += generatorConstDocBlock('資料寫入成功', 'string', 'DATABASE_WRITE_SUCCESS_MESSAGE');
    code += "    const DATABASE_WRITE_SUCCESS_MESSAGE = '資料寫入成功';\n";
    code += '\n';
    code += generatorConstDocBlock('資料寫入失敗', 'string', 'DATABASE_WRITE_FAILURE_MESSAGE');
    code += "    const DATABASE_WRITE_FAILURE_MESSAGE = '資料寫入失敗';\n";
    code += '\n';
    code += generatorVarDocBlock('己Post過', 'string', 'isPost');
    code += "    var isPost = '<?php echo $isPost; ?>';\n";
    code += '\n';
    code += generatorVarDocBlock('驗証失敗資訊', 'string', 'validateResult');
    code += "    var validateResult = '<?php echo $validateResult; ?>';\n";
    code += '\n';
    code += generatorVarDocBlock('資料庫寫入資訊', 'string', 'databaseResult');
    code += "    var databaseResult = '<?php echo $databaseResult; ?>';\n";
    code += '\n';
    code += generatorVarDocBlock('存放驗証失敗訊息', 'string', 'errorMessage');
    code += "    var errorMessage = '';\n";
    code += "\n";
    code += "    if('1' === isPost) { /** 己POST過 **/\n";
    code += '        /** 取得表單驗証失敗訊息 **/\n';
    code += "        errorMessage = editFormValidate();\n";
    code += "        if('' !== errorMessage) { /** 表單驗証失敗 **/\n";
    code += "            alert(errorMessage);\n";
    code += "        }\n";
    code += "        else { /** 表單驗証成功 **/\n";
    code += "            if('1' !== databaseResult) { /** 資料庫寫入失敗 **/\n";
    code += "                alert(DATABASE_WRITE_FAILURE_MESSAGE);\n";
    code += "            }\n";
    code += "            else { /** 資料庫寫入成功 **/\n";
    code += "                alert(DATABASE_WRITE_SUCCESS_MESSAGE);\n";
    code += "            }\n";
    code += "        }\n";
    code += "    }\n";
    code += '}\n';
    code += '\n';

    return code;
}

function generatorJSInsertFormValidate(args) {

    var code = '';
    var num = args.length;

    code += '\n';
    code += generatorMethodDocBlock('表單資料驗証', [''], 'string', '驗証失敗訊息', 0);
    code += 'function insertFormValidate() {\n';
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
    code += 'function editFormValidate() {\n';
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
