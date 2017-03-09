/**
 * 碼農主程式
 *
 * @version 0.2
 * @author Peter teed7334@gmail.com
 */


$(document).ready(function() {
    $('button[data-id=go]').click(function() {

        var docblock = new Docblock();
        var controller = new Controller(docblock);
        var generator = new Generator(docblock);
        var html = new Html();
        var js = new Js(docblock);
        var method = new Method(docblock);
        var model = new Model(docblock);
        var repository = new Repository(docblock);

        var namespace = $('input[data-id=namespace]').val();
        var className = $('input[data-id=class]').val();
        var args = $('input[data-id=args]').val().split(',');
        var methods = $('input[data-id=methods]').val().split(',');

        var htmlGetAllList = html.generatorHTMLGetAllList(args, className);
        var jsGetAllListForm = js.generatorJSGetAllList(args, className);
        var htmlInsertForm = html.generatorHTMLInsertForm(args, className);
        var jsInsertForm = js.generatorJSInsertForm(args, className);
        var htmlEditForm = html.generatorHTMLEditForm(args, className);
        var jsEditForm = js.generatorJSEditForm(args, className);
        var controllerCode = controller.generatorPHPController(args, className, namespace);
        var classCode = generator.generatorClass(args, className, namespace);
        var modelCode = model.generatorModel(args, className, namespace);
        var repositoryCode = repository.generatorRepository(args, className, namespace);
        var methodCode = method.generatorPHPMethod(methods);
        var resultObject = generator.generatorPHPResultObject();

        $('pre[data-id=display-generatorHTMLGetListForm]').text(htmlGetAllList).addClass('prettyprint');
        $('pre[data-id=display-generatorJSGetListForm]').text(jsGetAllListForm).addClass('prettyprint');
        $('pre[data-id=display-generatorHTMLInsertForm]').text(htmlInsertForm).addClass('prettyprint');
        $('pre[data-id=display-generatorJSInsertForm]').text(jsInsertForm).addClass('prettyprint');
        $('pre[data-id=display-generatorHTMLEditForm]').text(htmlEditForm).addClass('prettyprint');
        $('pre[data-id=display-generatorJSEditForm]').text(jsEditForm).addClass('prettyprint');
        $('pre[data-id=display-controller]').text(controllerCode).addClass('prettyprint');
        $('pre[data-id=display-class]').text(classCode).addClass('prettyprint');
        $('pre[data-id=display-model]').text(modelCode).addClass('prettyprint');
        $('pre[data-id=display-repository]').text(repositoryCode).addClass('prettyprint');
        $('pre[data-id=display-method]').text(methodCode).addClass('prettyprint');
        $('pre[data-id=display-resultObject]').text(resultObject).addClass('prettyprint');
        prettyPrint();
    });
});
