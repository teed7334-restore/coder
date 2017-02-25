function generatorPackageDocBlock(className, namespace) {

    var code = '';

    code += '/**\n';
    code += ' * ' + className + '\n';
    code += ' * @package ' + namespace + '\n';
    code += '**/\n';

    return code;
}

function generatorConstDocBlock(description, type, varName, returnType) {

    var code = '';

    code += '    /**\n';
    code += '     * ' + description + '\n';
    code += '     * @const ' + type + ' ' + varName + ' ' + returnType + '\n';
    code += '    **/\n';

    return code;
}

function generatorVarDocBlock(description, type, varName, returnType) {

    var code = '';

    code += '    /**\n';
    code += '     * ' + description + '\n';
    code += '     * @var ' + type + ' ' + varName + ' ' + returnType + '\n';
    code += '    **/\n';

    return code;
}

function generatorMethodDocBlock(description, params, rtn, returnDescription) {

    var code = '';
    var num = params.length;

    code += '    /**\n';
    code += '     * ' + description + '\n';
    for(var i = 0; i < num; i++) {
        if('' != params[i]) {
            code += '     * @param ' + params[i] + '\n';
        }
    }
    code += '     * @return ' + rtn + ' ' + returnDescription + '\n';
    code += '     */\n';

    return code;
}
