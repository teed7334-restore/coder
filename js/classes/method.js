var Method = function(docblock)
{
    this.docblock = docblock;
};

/**
 * 生成PHP Method
 * @param  array  args 要用到method的設定
 * @return string      PHP Method
 */
Method.prototype.generatorPHPMethod = function(args)
{
    let code = '';
    let num = args.length;

    for(i = 0; i < num; i++) {

        let permission = $.trim(args[i]).split(':')[0];
        let methodName = $.trim(args[i]).split(':')[1];
        let description = $.trim(args[i]).split(':')[2];
        let params = $.trim(args[i]).split(':')[3].split('|');
        let returnType = $.trim(args[i]).split(':')[4];
        let returnTypeDescription = '';

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

        let paramsNum = params.length;
        let paramsArray = [];
        let paramsString = '';

        for(j = 0; j < paramsNum; j++) {

            let tmp = params[j].split('>');
            let paramDescription = tmp[0].split('=')[0] + ' ' + tmp[1];

            if('' !== paramDescription) {
                paramsArray.push();
            }
            
            paramsString += tmp[0] + ', ';
            paramsArray.push(tmp[0]);
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

        code += '    /**\n';
        code += '     * ' + description + '\n';

        for(j = 0; j < paramsNum; j++) {
            code += '     * @params ' + paramsArray[j] + '\n';
        }

        code += '     * @return ' + returnTypeDescription + '\n';
        code += '    */\n';
        code += permission + ' function ' + methodName + '(' + paramsString + ')' + returnType + ' \n';
        code += '    {\n';
        code += '        /** @todo 要新增的程式碼 **/\n';
        code += '    }\n';
        code += '\n';
    }

    return code;
}
