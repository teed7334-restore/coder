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

            if ('' === this.utmTemplate) { /** 未選擇腳本不處理 **/
                return;
            }

            /** 將空白轉成+ **/
            let url = this.url.replace(/\s+/g, '+');
            let source = this.source.replace(/\s+/g, '+');
            let medium = this.medium.replace(/\s+/g, '+');
            let term = this.term.replace(/\s+/g, '+');
            let content = this.content.replace(/\s+/g, '+');
            let campaign = this.campaign.replace(/\s+/g, '+');

            /** 組成代入Service參數 **/
            let params = {
                url: url,
                source: source,
                medium: medium,
                term: term,
                content: content,
                campaign: campaign
            };

            /** 啟用UTM Service **/
            let utm = new UTM();

            /** 將結果輸出，並啟用程式碼上色 **/
            this.code = '<xmp class="prettyprint">' + utm.generatorUTM(params) + '</xmp>';
            prettyPrint();
        }
    }
});
