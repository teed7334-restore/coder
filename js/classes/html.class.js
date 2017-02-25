/**
 * 生成HTML INPUT
 * @param  array  args 要用到的變數
 * @return string      HTML標記
 */
function generatorHTML(args, className) {

    /** 初始化參數 **/
    var num = args.length;
    var html = '';

    /** 生成標頭設定 **/
    html += '<form action="" method="post">\n';

    for(i = 0; i < num; i++) {

        /** 生成HTML INPUT **/
        name = $.trim(args[i]).split(':')[0];
        description = $.trim(args[i]).split(':')[1];
        bigFirstName = name.replace(/^\S/g,function(s){return s.toUpperCase();});
        html += '\n';
        html += '    <' + '?php /** ' + description + ' **/ ?' + '>\n';
        html += '    <input type="text" name="' + name + '" value="<' + '?php' + ' echo $' + className + '->get' + bigFirstName + '(); ?>" />\n';
    }

    /** 生成檔尾設定 **/
    html += '</form>';

    return html;
}
