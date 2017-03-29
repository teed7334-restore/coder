var Annotations = function()
{

};

/**
 * 生成PHP 註解片段
 * @param  string      json
 * @return string      PHP Method
 */
Annotations.prototype.generatorAnnotations = function(name, json, io)
{
    let code = '';
    let title = '1' === io.toString() ? '@param' : '@return';
    let index = '';
    let type = '';
    let deny1 = [];
    let deny2 = [];

    code += ' * ' + title + ' object $' + name + '\n';

    for (i in json) {
        type = typeof(json[i]);

        if ('number' === type) { /** 當屬性形態為number時，轉為int **/
            type = 'int';
        }

        if ('object' !== type && 0 > jQuery.inArray(i, deny1)) { /** 當屬性不為object時，且不為重覆之屬性名時 **/

            let description = localStorage.getItem('@' + i.toLowerCase());
            description = JSON.parse(description);
            description = null !== description ? description.description : '';

            if(isNaN(i)) {
                code += ' * ' + title + ' ' + type + ' $' + name + '->' + i + ' ' + description + '\n';
            } else {
                code += ' * ' + title + ' ' + type + ' $' + name + "['" + i + "']" + ' ' + description + "\n";
            }
            deny1.push(i);
        } else {
            for (j in json[i]) {
                type = typeof(json[i][j]);

                if ('number' === type) { /** 當屬性形態為number時，轉為int **/
                    type = 'int';
                }

                if ('object' !== type && 0 > jQuery.inArray(j, deny2)) {

                    description = localStorage.getItem('@' + j.toLowerCase());
                    description = JSON.parse(description);
                    description = null !== description ? description.description : '';

                    if(isNaN(i) && isNaN(j)) { /** 當第一層與第二層皆為屬性時 **/
                        code += ' * ' + title + ' ' + type + ' $' + name + '->' + i + '->' + j + ' ' + description + ';\n';
                    } else if(!isNaN(i) && isNaN(j)) { /** 當第一層為陣列與第二層為屬性時 **/
                        code += ' * ' + title + ' ' + type + ' $' + name + "['" + i + "']->" + j + ' ' + description + ';\n';
                    } else if(isNaN(i) && !isNaN(j)) { /** 當第一層為屬性與第二層皆為陣列時 **/
                        code += ' * ' + title + ' ' + type + ' $' + name + '->' + i + "['" + j + "'];" + ' ' + description + "\n";
                    } else if(!isNaN(i) && !isNaN(j)) { /** 當第一層與第二層皆為陣列時 **/
                        code += ' * ' + title + ' ' + type + ' $' + name + "['" + i + "']['" + j + "'];" + ' ' + description + "\n";
                    }
                    deny2.push(j);
                }
            }
        }
    }

    return code;
}
