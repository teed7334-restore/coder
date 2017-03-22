$(document).ready(function() {
    $('button[data-id=go]').click(function() {
        var docblock = new Docblock();
        var method = new Method(docblock);
        var methods = $('input[data-id=methods]').val().split(',');
        var methodCode = method.generatorPHPMethod(methods);
        $('pre[data-id=display-method]').text(methodCode).addClass('prettyprint');
        prettyPrint();
    });
});
