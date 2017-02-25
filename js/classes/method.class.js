/**
 * 生成PHP Method
 * @param  array  args 要用到method的設定
 * @return string      PHP Method
 */
function generatorPHPMethod(args) {

    var code = '';
    var num = args.length;

    for(i = 0; i < num; i++) {

        permission = $.trim(args[i]).split(':')[0];
        methodName = $.trim(args[i]).split(':')[1];
        description = $.trim(args[i]).split(':')[2];
        params = $.trim(args[i]).split(':')[3].split('|');
        returnType = $.trim(args[i]).split(':')[4];
        returnTypeDescription = '';

        if('+' === permission) {
            permission = '    public';
        }
        else if('+s' === permission) {
            permission = '    public static ';
        }
        else if('-' === permission) {
            permission = '    private';
        }
        else if('-s' === permission) {
            permission = '    private static ';
        }
        else if('*' === permission) {
            permission = '    protected';
        }
        else if('*s' === permission) {
            permission = '    protected static ';
        }

        paramsNum = params.length;
        paramsArray = [];
        paramsString = '';

        for(j = 0; j < paramsNum; j++) {
            tmp = params[j].split('>');
            paramDescription = tmp[0].split('=')[0] + ' ' + tmp[1];
            if('' !== paramDescription) {
                paramsArray.push();
            }
            paramsString += tmp[0] + ', ';
        }
        paramsString = paramsString.substr(0, paramsString.length - 2);

        if('undefined' === typeof(returnType) || '' === returnType) {
            returnType = ''
            returnTypeDescription = 'void';
        }
        else {
            returnTypeDescription = returnType;
            returnType = ' : ' + returnType;
        }

        code += generatorMethodDocBlock(description, paramsArray, returnTypeDescription, '');
        code += permission + ' function ' + methodName + '(' + paramsString + ')' + returnType + ' {\n';
        code += '        /** @todo 要新增的程式碼 **/\n';
        code += '    }\n';
        code += '\n';
    }

    return code;
}
