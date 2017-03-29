$(document).ready(function()
{

    let url = location.href;
    $('input[data-id=url]').val(url);

    $('select[data-id=utmTemplate]').change(function()
    {
        let utmTemplate = $(this).val();

        switch (utmTemplate) {
            case 'facebook_cbc':
                $('input[data-id=source]').val('Facebook');
                $('input[data-id=medium]').val('cbc');
                $('input[data-id=term]').val('');
                $('input[data-id=content]').val('');
                $('input[data-id=campaign]').val('Promotion');
                break;
            case 'facebook_page':
                $('input[data-id=source]').val('Facebook');
                $('input[data-id=medium]').val('Social');
                $('input[data-id=term]').val('');
                $('input[data-id=content]').val('');
                $('input[data-id=campaign]').val('Promotion');
                break;
            case 'outbrain':
                $('input[data-id=source]').val('Outbrain');
                $('input[data-id=medium]').val('Content Discovery');
                $('input[data-id=term]').val('{{ad_title}}');
                $('input[data-id=content]').val('{{origsrcname}}');
                $('input[data-id=campaign]').val('Promotion');
                break;
            case 'taboola':
                $('input[data-id=source]').val('Taboola');
                $('input[data-id=medium]').val('Content Discovery');
                $('input[data-id=term]').val('{title}');
                $('input[data-id=content]').val('{site}');
                $('input[data-id=campaign]').val('Promotion');
                break;
            case 'newsletter':
                $('input[data-id=source]').val('Newsletter');
                $('input[data-id=medium]').val('email');
                $('input[data-id=term]').val('List Name');
                $('input[data-id=content]').val('');
                $('input[data-id=campaign]').val('Promotion');
                break;
            default:
                break;
        }
    });

    $('button[data-id=go]').click(function()
    {
        let utm = new UTM();
        let url = $('input[data-id=url]').val();
        let source = $('input[data-id=source]').val();
        let medium = $('input[data-id=medium]').val();
        let term = $('input[data-id=term]').val();
        let content = $('input[data-id=content]').val();
        let campaign = $('input[data-id=campaign]').val();
        let params = {
            url: url,
            source: source,
            medium: medium,
            term: term,
            content: content,
            campaign: campaign
        };
        let code = utm.generatorUTM(params);

        $('pre[data-id=display-utm]')
            .text(code)
            .removeClass('prettyprinted')
            .addClass('prettyprint');

        prettyPrint();
    });

});
