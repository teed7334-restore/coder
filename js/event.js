$(document).ready(function()
{
    $('button[data-id=go]').click(function()
    {
        let gaEvent = new Event();

        let domId = $('input[data-id=domId]').val();
        let domName = $('input[data-id=domName]').val();
        let domEvent = $('select[data-id=event]').val();
        let category = $('input[data-id=category]').val();
        let action = $('input[data-id=action]').val();
        let label = $('input[data-id=label]').val();

        let params = {
            domId: domId,
            domName: domName,
            domEvent: domEvent,
            category: category,
            action: action,
            label: label
        }
        let eventCode = gaEvent.generatorEvent(params);

        $('pre[data-id=display-event]')
            .text(eventCode)
            .removeClass('prettyprinted')
            .addClass('prettyprint');

        prettyPrint();
    });
});
