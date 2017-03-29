$(document).ready(function()
{
    $('button[data-id=go]').click(function()
    {
        let annotations = new Annotations();

        let name = $('input[data-id=objectName]').val();
        let json = JSON.parse($('textarea[data-id=json]').val());
        let io = $('input[name=IO]:checked').val();

        let jsonCode = annotations.generatorAnnotations(name, json, io);

        $('pre[data-id=display-annotations]')
            .text(jsonCode)
            .removeClass('prettyprinted')
            .addClass('prettyprint');
            
        prettyPrint();
    });
});
