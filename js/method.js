$(document).ready(function()
{
    $('button[data-id=go]').click(function()
    {
        let docblock = new Docblock();
        let method = new Method(docblock);

        let methods = $('input[data-id=methods]').val().split(',');

        let methodCode = method.generatorPHPMethod(methods);

        $('pre[data-id=display-method]')
            .text(methodCode)
            .removeClass('prettyprinted')
            .addClass('prettyprint');

        prettyPrint();
    });
});
