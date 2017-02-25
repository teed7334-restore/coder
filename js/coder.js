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
        var html = generatorHTML(args, className);
        var classCode = generatorClass(args, className, namespace);
        var formToObject = generatorFormToObject(args, className, namespace);
        var getToSet = generatorGetToSet(args, className, namespace);
        var model = generatorModel(args, className, namespace);
        var method = generatorPHPMethod(methods);
        $('pre[data-id=display-html]').text(html).addClass('prettyprint');
        $('pre[data-id=display-class]').text(classCode).addClass('prettyprint');
        $('pre[data-id=display-from2object]').text(formToObject).addClass('prettyprint');
        $('pre[data-id=display-get2set]').text(getToSet).addClass('prettyprint');
        $('pre[data-id=display-model]').text(model).addClass('prettyprint');
        $('pre[data-id=display-method]').text(method).addClass('prettyprint');
        prettyPrint();
    });

    $('button[data-id=reset]').click(function() {
        var namespace = $('input[data-id=namespace]').val('Linux/Groups');
        var className = $('input[data-id=class]').val('Users');
        var args = $('input[data-id=args]').val('id:使用者id:int,name:使用者名稱:string,account:使用者帳號:string,password:使用者密碼:string');

        $('pre[data-id=display-html]').text('');
        $('pre[data-id=display-class]').text('');
        $('pre[data-id=display-from2object]').text('');
        $('pre[data-id=display-get2set]').text('');
        $('pre[data-id=display-model]').text('');
    });
});
