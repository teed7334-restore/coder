var UTM = function()
{

};

/**
 * 生成UTM網址
 * @param  object      params
 * @return string      UTM網址
 */
UTM.prototype.generatorUTM = function(params)
{
    /** 解開帶來的參數 **/
    let code = '';
    let source = params.source
    let medium = params.medium
    let term = params.term
    let content = params.content
    let campaign = params.campaign
    let url = params.url;

    /** 在網址最後面加上? **/
    code += url + '?';

    if ('' !== $.trim(source)) { /** 檢查source是否有值 **/
        code += 'utm_source=' + encodeURI(source) + '&';
    }
    if ('' !== $.trim(medium)) { /** 檢查medium是否有值 **/
        code += 'utm_medium=' + encodeURI(medium) + '&';
    }
    if ('' !== $.trim(term)) { /** 檢查term是否有值 **/
        code += 'utm_term=' + encodeURI(term) + '&';
    }
    if ('' !== $.trim(content)) { /** 檢查content是否有值 **/
        code += 'utm_content=' + encodeURI(content) + '&';
    }
    if ('' !== $.trim(campaign)) { /** 檢查campaign是否有值 **/
        code += 'utm_campaign=' + encodeURI(campaign) + '&';
    }

    /** 移除網址參數最後一個& **/
    code = code.substring(0, code.length -1);

    return code;
};
