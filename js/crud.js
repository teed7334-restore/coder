$(document).ready(function() {
    $('button[data-id=go]').click(function() {

        let docblock = new Docblock();
        let controller = new Controller(docblock);
        let generator = new Generator(docblock);
        let html = new Html();
        let js = new Js(docblock);
        let model = new Model(docblock);
        let repository = new Repository(docblock);

        let namespace = $('input[data-id=namespace]').val();
        let className = $('input[data-id=class]').val();
        let args = $('input[data-id=args]').val().split(',');

        let htmlGetAllList = html.generatorHTMLGetAllList(args, className);
        let jsGetAllListForm = js.generatorJSGetAllList(args, className);
        let htmlInsertForm = html.generatorHTMLInsertForm(args, className);
        let jsInsertForm = js.generatorJSInsertForm(args, className);
        let htmlEditForm = html.generatorHTMLEditForm(args, className);
        let jsEditForm = js.generatorJSEditForm(args, className);
        let controllerCode = controller.generatorPHPController(args, className, namespace);
        let classCode = generator.generatorClass(args, className, namespace);
        let modelCode = model.generatorModel(args, className, namespace);
        let repositoryCode = repository.generatorRepository(args, className, namespace);
        let resultObject = generator.generatorPHPResultObject();

        $('pre[data-id=display-generatorHTMLGetListForm]')
            .text(htmlGetAllList)
            .removeClass('prettyprinted')
            .addClass('prettyprint');

        $('pre[data-id=display-generatorJSGetListForm]')
            .text(jsGetAllListForm)
            .removeClass('prettyprinted')
            .addClass('prettyprint');

        $('pre[data-id=display-generatorHTMLInsertForm]')
            .text(htmlInsertForm)
            .removeClass('prettyprinted')
            .addClass('prettyprint');

        $('pre[data-id=display-generatorJSInsertForm]')
            .text(jsInsertForm)
            .removeClass('prettyprinted')
            .addClass('prettyprint');

        $('pre[data-id=display-generatorHTMLEditForm]')
            .text(htmlEditForm)
            .removeClass('prettyprinted')
            .addClass('prettyprint');

        $('pre[data-id=display-generatorJSEditForm]')
            .text(jsEditForm)
            .removeClass('prettyprinted')
            .addClass('prettyprint');

        $('pre[data-id=display-controller]')
            .text(controllerCode)
            .removeClass('prettyprinted')
            .addClass('prettyprint');

        $('pre[data-id=display-class]')
            .text(classCode)
            .removeClass('prettyprinted')
            .addClass('prettyprint');

        $('pre[data-id=display-model]')
            .text(modelCode)
            .removeClass('prettyprinted')
            .addClass('prettyprint');

        $('pre[data-id=display-repository]')
            .text(repositoryCode)
            .removeClass('prettyprinted')
            .addClass('prettyprint');

        $('pre[data-id=display-resultObject]')
            .text(resultObject)
            .removeClass('prettyprinted')
            .addClass('prettyprint');

        prettyPrint();
    });
});
