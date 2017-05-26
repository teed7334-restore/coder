new Vue({
    el: '#js-event-app',
    data: {
        element: '',
        event: '',
        eventCategory: '',
        eventAction: '',
        eventLabel: '',
        eventValue: '',
        code: '<xmp></xmp>',
        method: ''
    },
    methods: {
        eventOnChange: function() { /** 處理觸發條件 **/
            switch (this.event) {
                case 'blur':
                    this.method = 'onBlur';
                    break;
                case 'change':
                    this.method = 'onChange';
                    break;
                case 'click':
                    this.method = 'onClick';
                    break;
                case 'dblclick':
                    this.method = 'onDblclick';
                    break;
                case 'focus':
                    this.method = 'onFocus';
                    break;
                case 'mouseenter':
                    this.method = 'onMouseEnter';
                    break;
                case 'mouseover':
                    this.method = 'onMouseOver';
                    break;
                case 'mouseleave':
                    this.method = 'onMouseLeave';
                    break;
                default:
                    break;
            }
        },
        generateEvent: function() { /** 產出GA 自訂事件原始碼 **/

            /** 未選擇觸發條件與未輸入網址不處理 **/
            if('' === this.element || '' === this.event) {
                alert('請觸發條件與輸入網址');
                return;
            }

            let code = this.$refs.hiddenCodeUI.innerText;
            this.code = '<xmp class="prettyprint">' + code + '</xmp>';
            prettyPrint();
        }
    }
});
