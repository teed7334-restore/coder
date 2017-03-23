var Annotations = function() {};

/**
 * 生成PHP 註解片段
 * @param  string      json
 * @return string      PHP Method
 */
Annotations.prototype.generatorAnnotations = function(name, json, io) {

    let code = '';
    let title = '1' === io.toString() ? '@param' : '@return';
    let index = '';
    let type = '';
    let deny1 = [];
    let deny2 = [];

    code += ' * ' + title + ' object $' + name + '\n';

    for (i in json) {
        type = typeof(json[i]);

        if ('number' === type) {
            type = 'int';
        }

        if ('object' !== type && 0 > jQuery.inArray(i, deny1)) {
            code += ' * ' + title + ' ' + type + ' $' + name + '->' + i + '\n';
            deny1.push(i);
        } else {
            for (j in json[i]) {
                type = typeof(json[i][j]);

                if ('number' === type) {
                    type = 'int';
                }

                if ('object' !== type && 0 > jQuery.inArray(j, deny2)) {
                    code += ' * ' + title + ' ' + type + ' $' + name + '[' + i + ']->' + j + '\n';
                    deny2.push(j);
                }
            }
        }
    }

    return code;
}
