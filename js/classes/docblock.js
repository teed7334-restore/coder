var Docblock = function()
{

}

Docblock.prototype.generatorPackageDocBlock = function(className, namespace)
{
    let code = '';

    code += '/**\n';
    code += ' * ' + className + '\n';
    code += ' * @package ' + namespace + '\n';
    code += '**/\n';

    return code;
}

Docblock.prototype.generatorConstDocBlock = function(description, type, varName, spaceLength)
{
    let code = '';
    let addSpace = '';

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

Docblock.prototype.generatorVarDocBlock = function(description, type, varName, spaceLength)
{
    let code = '';
    let addSpace = '';

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

Docblock.prototype.generatorMethodDocBlock = function(description, params, rtn, returnDescription, spaceLength)
{
    let code = '';
    let num = params.length;
    let addSpace = '';

    if('undefined' === typeof(spaceLength) || '' === spaceLength) {
        spaceLength = 4;
    }

    for(i = 0; i < spaceLength; i++) {
        addSpace += ' ';
    }

    code += addSpace + '/**\n';
    code += addSpace + ' * ' + description + '\n';

    for(i = 0; i < num; i++) {
        if('' != params[i]) {
            code += addSpace + ' * @param ' + params[i] + '\n';
        }
    }

    code += addSpace + ' * @return ' + rtn + ' ' + returnDescription + '\n';
    code += addSpace + '**/\n';

    return code;
}
