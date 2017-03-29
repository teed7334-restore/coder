var Event = function()
{

};

/**
 * 生成自訂事件程式碼
 * @param  object      params
 * @return string      UTM網址
 */
Event.prototype.generatorEvent = function(params)
{
    let code = '';
    let id = params.domId;
    let name = params.domName;
    let domEvent = params.domEvent;
    let category = params.category;
    let action = params.action;
    let label = params.label;

    if ('' === $.trim(domEvent)) { /** 檢查是否有選擇 Event 事件 **/
        return;
    }

    if ('' !== $.trim(id)) { /** 確認 Dom Id 是否有輸入 **/
        code += "$('#" + id + "')";
    }
    else if ('' !== $.trim(name)) { /** 確認 Dom Name 是否有輸入 **/
        code += "$('[name=" + name + "]')";
    }
    else { /** 當 Dom Id 與 Dom Name 都沒輸入時 **/
        return;
    }

    code += '.' + domEvent + '(function(event) {\n';
    code += "    ga('send', 'event', {\n";
    code += "        eventCategory: '" + category + "',\n";
    code += "        eventAction: '" + action + "',\n";
    code += "        eventLabel: '" + label + "'\n";
    code += '    });\n';
    code += '});\n';

    return code;
};
