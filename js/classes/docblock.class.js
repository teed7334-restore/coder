function generatorPackageDocBlock(className, namespace) {

    var code = '';

    code += '/**\n';
    code += ' * ' + className + '\n';
    code += ' * @package ' + namespace + '\n';
    code += '**/\n';

    return code;
}

function generatorConstDocBlock(description, type, varName, spaceLength) {

    var code = '';
    var addSpace = '';

    if('undefined' === typeof(spaceLength) || '' === spaceLength) {
        spaceLength = 4;
    }

    for(i = 0; i < spaceLength; i++) {
        addSpace += ' ';
    }

    code += addSpace + '/**\n';
    code += addSpace + ' * ' + description + '\n';
    code += addSpace + ' * @const ' + type + ' ' + varName + '\n';
    code += addSpace + '**/\n';

    return code;
}

function generatorVarDocBlock(description, type, varName, spaceLength) {

    var code = '';
    var addSpace = '';

    if('undefined' === typeof(spaceLength) || '' === spaceLength) {
        spaceLength = 4;
    }

    for(i = 0; i < spaceLength; i++) {
        addSpace += ' ';
    }

    code += addSpace + '/**\n';
    code += addSpace + ' * ' + description + '\n';
    code += addSpace + ' * @var ' + type + ' ' + varName + '\n';
    code += addSpace + '**/\n';

    return code;
}

function generatorMethodDocBlock(description, params, rtn, returnDescription, spaceLength) {

    var code = '';
    var num = params.length;
    var addSpace = '';

    if('undefined' === typeof(spaceLength) || '' === spaceLength) {
        spaceLength = 4;
    }

    for(i = 0; i < spaceLength; i++) {
        addSpace += ' ';
    }

    code += addSpace + '/**\n';
    code += addSpace + ' * ' + description + '\n';
    for(var i = 0; i < num; i++) {
        if('' != params[i]) {
            code += addSpace + ' * @param ' + params[i] + '\n';
        }
    }
    code += addSpace + ' * @return ' + rtn + ' ' + returnDescription + '\n';
    code += addSpace + '**/\n';

    return code;
}
