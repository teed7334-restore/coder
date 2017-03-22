$(document).ready(function() {
    $('button[data-id=go]').click(function() {
        var annotations = new Annotations();
        var name = $('input[data-id=objectName]').val();
        var json = JSON.parse($('textarea[data-id=json]').val());
        var jsonCode = annotations.generatorAnnotations(name, json);

        $('pre[data-id=display-annotations]').text(jsonCode).addClass('prettyprint');
        prettyPrint();
    });
});