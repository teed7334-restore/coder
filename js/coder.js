/**
 * 碼農主程式
 *
 * @version 0.2
 * @author Peter teed7334@gmail.com
 */


$(document).ready(function() {
    $('button[data-id=go]').click(function() {
        var namespace = $('input[data-id=namespace]').val();
        var className = $('input[data-id=class]').val();
        var args = $('input[data-id=args]').val().split(',');
        var methods = $('input[data-id=methods]').val().split(',');
        var htmlGetAllList = generatorHTMLGetAllList(args, className);
        var jsGetAllListForm = generatorJSGetAllList(args, className);
        var htmlInsertForm = generatorHTMLInsertForm(args, className);
        var jsInsertForm = generatorJSInsertForm(args, className);
        var htmlEditForm = generatorHTMLEditForm(args, className);
        var jsEditForm = generatorJSEditForm(args, className);
        var controller = generatorController(args, className, namespace);
        var classCode = generatorClass(args, className, namespace);
        var model = generatorModel(args, className, namespace);
        var method = generatorPHPMethod(methods);
        var resultObject = generatorPHPResultObject();
        $('pre[data-id=display-generatorHTMLGetListForm]').text(htmlGetAllList).addClass('prettyprint');
        $('pre[data-id=display-generatorJSGetListForm]').text(jsGetAllListForm).addClass('prettyprint');
        $('pre[data-id=display-generatorHTMLInsertForm]').text(htmlInsertForm).addClass('prettyprint');
        $('pre[data-id=display-generatorJSInsertForm]').text(jsInsertForm).addClass('prettyprint');
        $('pre[data-id=display-generatorHTMLEditForm]').text(htmlEditForm).addClass('prettyprint');
        $('pre[data-id=display-generatorJSEditForm]').text(jsEditForm).addClass('prettyprint');
        $('pre[data-id=display-controller]').text(controller).addClass('prettyprint');
        $('pre[data-id=display-class]').text(classCode).addClass('prettyprint');
        $('pre[data-id=display-model]').text(model).addClass('prettyprint');
        $('pre[data-id=display-method]').text(method).addClass('prettyprint');
        $('pre[data-id=display-resultObject]').text(resultObject).addClass('prettyprint');
        prettyPrint();
    });
});
