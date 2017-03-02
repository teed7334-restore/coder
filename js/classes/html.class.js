/**
 * 生成新增單筆資料用表單HTML
 * @param  array  args 要用到的變數
 * @return string      HTML標記
 */
function generatorHTMLGetAllList(args, className) {

    /** 初始化參數 **/
    var num = args.length;
    var html = '';
    var pkName = '';

    pkName = $.trim(args[0]).split(':')[0];

    /** 生成標頭設定 **/
    html += '<div class="row">\n';
    html += '<button type="button" data-group="insert" class="btn btn-primary">\n'
    html += '    <i class="fa fa-plus"> 新增</i>\n'
    html += '</button>\n'
    html += '</div>\n';
    html += '<div class="row">\n';
    html += '    <table class="table table-striped">\n';
    html += '        <thead>\n';
    html += '            <tr>\n';
    for(var i = 0; i < num; i++) {
        description = $.trim(args[i]).split(':')[1];
        html += '                <td>' + description + '</td>\n';
    }
    html += '                <td>動作</td>\n';
    html += '            </tr>\n';
    html += '        </thead>\n';
    html += '        <tbody>\n';
    html += '            <' + '?php foreach($' + className + ' as $row): ?>\n';
    html += '            <tr>\n';
    for(var i = 0; i < num; i++) {
        name = $.trim(args[i]).split(':')[0];
        description = $.trim(args[i]).split(':')[1];
        html += '                <td><' + '?php echo $row->' + name + '; ?></td>\n';
    }
    html += '            <td>\n';
    html += '                <button type="button" class="btn btn-warning" data-group="edit" data-' + pkName + '="<?php echo $row->' + pkName +'; ?>">\n';
    html += '                    <i class="fa fa-check"> 修改</i>\n';
    html +=                  '</button>\n';
    html += '                <button type="button" class="btn btn-danger" data-group="remove" data-' + pkName + '="<?php echo $row->' + pkName +'; ?>">\n';
    html += '                    <i class="fa fa-close"> 刪除</i>\n';
    html +=                  '</button>\n';
    html += '            </td>\n'
    html += '            </tr>\n';
    html += '            <' + '?php endforeach; ?>\n';
    html += '        </tbody>\n';
    html += '    </table>\n';
    html += '</div>\n'

    return html;
}


/**
 * 生成新增單筆資料用表單HTML
 * @param  array  args 要用到的變數
 * @return string      HTML標記
 */
function generatorHTMLInsertForm(args, className) {

    /** 初始化參數 **/
    var num = args.length;
    var html = '';

    /** 生成標頭設定 **/
    html += '<div class="row">\n';
    html += '    <form data-id="coder-form" action="/' + className.toLowerCase() + '/insert" method="post">\n';

    for(i = 1; i < num; i++) {

        /** 生成HTML INPUT **/
        name = $.trim(args[i]).split(':')[0];
        description = $.trim(args[i]).split(':')[1];
        bigFirstName = name.replace(/^\S/g,function(s){return s.toUpperCase();});
        html += '        <div data-id="coder-' + name + '-div" class="form-group">\n'
        html += '            <label for="coder-' + name + '">' + description + '</label>\n';
        html += '            <input type="text" id="coder-' + name + '" name="' + name + '" class="form-control" data-regexp="<' + '?php' + ' echo $' + className + '::VALIDATE_' + name.toUpperCase() + '_RULE; ?>" data-validate-failure-message="<' + '?php' + ' echo $' + className + '::VALIDATE_' + name.toUpperCase() + '_MESSAGE; ?>" placeholder="' + description + '" value="<' + '?php' + ' echo $' + className + '->get' + bigFirstName + '(); ?>" />\n';
        html += '        </div>\n'
    }

    /** 生成送出/重置按鈕 **/
    html += '        <div class="form-group">\n';
    html += '            <button type="button" data-id="coder-submit" class="btn btn-success">\n';
    html += '                <i class="fa fa-check"> 送出</i>\n';
    html += '            </button>\n';
    html += '            <button type="reset" class="btn btn-danger">\n';
    html += '                <i class="fa fa-reply"> 重置</i>\n';
    html += '            </button>\n';
    html += '        </div>\n';

    /** 生成檔尾設定 **/
    html += '    </form>\n';
    html += '</div>\n'

    return html;
}

/**
 * 生成修改單筆資料用表單HTML
 * @param  array  args 要用到的變數
 * @return string      HTML標記
 */
function generatorHTMLEditForm(args, className) {

    /** 初始化參數 **/
    var num = args.length;
    var html = '';

    /** 生成標頭設定 **/
    html += '<div class="row">\n';
    html += '    <form data-id="coder-form" action="/' + className.toLowerCase() + '/insert" method="post">\n';

    for(i = 0; i < num; i++) {

        /** 生成HTML INPUT **/
        name = $.trim(args[i]).split(':')[0];
        description = $.trim(args[i]).split(':')[1];
        bigFirstName = name.replace(/^\S/g,function(s){return s.toUpperCase();});

        if(0 < i) {
            html += '        <div data-id="coder-' + name + '-div" class="form-group">\n'
            html += '            <label for="coder-' + name + '">' + description + '</label>\n';
            html += '            <input type="text" id="coder-' + name + '" name="' + name + '" class="form-control" data-regexp="<' + '?php' + ' echo $' + className + '::VALIDATE_' + name.toUpperCase() + '_RULE; ?>" data-validate-failure-message="<' + '?php' + ' echo $' + className + '::VALIDATE_' + name.toUpperCase() + '_MESSAGE; ?>" placeholder="' + description + '" value="<' + '?php' + ' echo $' + className + '->get' + bigFirstName + '(); ?>" />\n';
            html += '        </div>\n'
        }
        else {
            html += '        <input type="hidden" id="coder-' + name + '" name="' + name + '" class="form-control" data-regexp="<' + '?php' + ' echo $' + className + '::VALIDATE_' + name.toUpperCase() + '_RULE; ?>" data-validate-failure-message="<' + '?php' + ' echo $' + className + '::VALIDATE_' + name.toUpperCase() + '_MESSAGE; ?>" placeholder="' + description + '" value="<' + '?php' + ' echo $' + className + '->get' + bigFirstName + '(); ?>" />\n';
        }
    }

    /** 生成送出/重置按鈕 **/
    html += '        <div class="form-group">\n';
    html += '            <button type="button" data-id="coder-submit" class="btn btn-success">\n';
    html += '                <i class="fa fa-check"> 送出</i>\n';
    html += '            </button>\n';
    html += '            <button type="reset" class="btn btn-danger">\n';
    html += '                <i class="fa fa-reply"> 重置</i>\n';
    html += '            </button>\n';
    html += '        </div>\n';

    /** 生成檔尾設定 **/
    html += '    </form>\n';
    html += '</div>\n'

    return html;
}
