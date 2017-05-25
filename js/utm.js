new Vue({
    el: '#js-utm-app',
    data: {
        url: '',
        utmTemplate: '',
        source: '',
        medium: '',
        term: '',
        content: '',
        campaign: '',
        code: '<xmp></xmp>'
    },
    methods: {
        utmTemplateChange: function() { /** 處理腳本選擇 **/
            switch (this.utmTemplate) {
                case 'facebook_cbc':
                    this.source = 'Facebook';
                    this.medium = 'cbc';
                    this.term = '';
                    this.content = '';
                    this.campaign = 'Promotion';
                    break;
                case 'facebook_page':
                    this.source = 'Facebook';
                    this.medium = 'Social';
                    this.term = '';
                    this.content = '';
                    this.campaign = 'Promotion';
                    break;
                case 'outbrain':
                    this.source = 'Outbrain';
                    this.medium = 'Content Discovery';
                    this.term = '{{ad_title}}';
                    this.content = '{{origsrcname}}';
                    this.campaign = 'Promotion';
                    break;
                case 'taboola':
                    this.source = 'Taboola';
                    this.medium = 'Content Discovery';
                    this.term = '{title}';
                    this.content = '{site}';
                    this.campaign = 'Promotion';
                    break;
                case 'newsletter':
                    this.source = 'Newsletter';
                    this.medium = 'email';
                    this.term = 'List Name';
                    this.content = '';
                    this.campaign = 'Promotion';
                    break;
                default:
                    break;
            }
        },
        generateGaUtm: function() { /** 產出GA UTM URL **/

            /** 未選擇腳本與未輸入網址不處理 **/
            if ('' === this.utmTemplate && '' === this.url) {
                alert('請選擇腳本與輸入網址');
                return;
            }

            /** 將空白轉成+ **/
            let url = this.url.replace(/\s+/g, '+');
            let source = this.source.replace(/\s+/g, '+');
            let medium = this.medium.replace(/\s+/g, '+');
            let term = this.term.replace(/\s+/g, '+');
            let content = this.content.replace(/\s+/g, '+');
            let campaign = this.campaign.replace(/\s+/g, '+');

            /** 在網址最後面加上? **/
            this.code = url + '?';

            /** 將UTM屬性加上網址 **/
            if ('' !== source) {
                this.code += 'utm_source=' + encodeURI(source) + '&';
            }
            if ('' !== medium) {
                this.code += 'utm_medium=' + encodeURI(medium) + '&';
            }
            if ('' !== term) {
                this.code += 'utm_term=' + encodeURI(term) + '&';
            }
            if ('' !== content) {
                this.code += 'utm_content=' + encodeURI(content) + '&';
            }
            if ('' !== campaign) {
                this.code += 'utm_campaign=' + encodeURI(campaign) + '&';
            }

            /** 移除網址參數最後一個& **/
            this.code = this.code.substring(0, this.code.length -1);

            /** 將結果輸出，並啟用程式碼上色 **/
            this.code = '<xmp class="prettyprint">' + this.code + '</xmp>';
            prettyPrint();
        }
    }
});
