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
    let code = '';
    let source = params.source.replace(/\s+/g, '+');
    let medium = params.medium.replace(/\s+/g, '+');
    let term = params.term.replace(/\s+/g, '+');
    let content = params.content.replace(/\s+/g, '+');
    let campaign = params.campaign.replace(/\s+/g, '+');
    let url = params.url;

    code += url + '?';

    if ('' !== $.trim(source)) { /** 檢查source是否有輸入 **/
        code += 'utm_source=' + encodeURI(source) + '&';
    }
    if ('' !== $.trim(medium)) { /** 檢查medium是否有輸入 **/
        code += 'utm_medium=' + encodeURI(medium) + '&';
    }
    if ('' !== $.trim(term)) { /** 檢查term是否有輸入 **/
        code += 'utm_term=' + encodeURI(term) + '&';
    }
    if ('' !== $.trim(content)) { /** 檢查content是否有輸入 **/
        code += 'utm_content=' + encodeURI(content) + '&';
    }
    if ('' !== $.trim(campaign)) { /** 檢查campaign是否有輸入 **/
        code += 'utm_campaign=' + encodeURI(campaign) + '&';
    }

    code = code.substring(0, code.length -1);

    return code;
};
