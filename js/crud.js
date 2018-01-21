let crud = new Vue({
    el: '#crud',
    data: {
        class_: 'User',
        controller_name: '',
        params: 'name:string:姓名,\npassword:password:密碼,\nborn:date:生日,\ndescription:text:敘述,\ngender:int:姓別,\nemail:email:個人信箱,\nwebsite:url:個人網址,\ncreateAt:datetime:新增日期,\nupdateAt:datetime:修改日期\n',
        php_tag: '<?php',
        vue_model: '',
        migration: '',
        result_object: '',
        model: '',
        service: '',
        controller: '',
        list: '',
        add_form: '',
        vue_model_data: '',
        migration_data: '',
        result_object_data: '',
        controller_data: '',
        model_data: '',
        list_title_data: '',
        list_data: '',
        add_form_data: ''
    },
    methods: {
        reset: function() {
            this.class_ = 'User'
            this.params = 'name:string:姓名,\npassword:password:密碼,\nborn:date:生日,\ndescription:text:敘述,\ngender:int:姓別,\nemail:email:個人信箱,\nwebsite:url:個人網址,\ncreateAt:datetime:新增日期,\nupdateAt:datetime:修改日期\n'
            this.vue_model = ''
            this.migration = ''
            this.result_object = ''
            this.model = ''
            this.service = ''
            this.controller = ''
            this.list = ''
            this.add_form = ''
        },
        generate_code: function() {
            let params = crud.do_normalization()
            let data = ''
            let total_rows = params.length
            crud.clear_code()
            this.controller_name = this.class_.toLowerCase()
            if (0 === total_rows) {
                return
            }
            for (i = 0; i < total_rows; i++) {
                data = params[i].split(':')
                if (0 === data.length) {
                    return
                }
                crud.generate_vue_mode_code(data, i, total_rows)
                crud.generate_migration_code(data, i, total_rows)
                crud.generate_result_object_code(data)
                crud.generate_model_code(data)
                crud.generate_service_code()
                crud.generate_controller_code()
                crud.generate_list_code(data, i, total_rows)
                crud.generate_add_form_code(data, i, total_rows)
            }
        },
        clear_code: function() {
            this.vue_model_data = ''
            this.migration_data = ''
            this.result_object_data = ''
            this.model_data = ''
            this.controller_data = ''
            this.list_title_data = ''
            this.list_data = ''
            this.add_form_data = ''
        },
        do_normalization: function() {
            let params = this.params.split(',')
            if (0 === params.length) {
                return []
            }
            for (index in params) {
                params[index] = params[index].trim()
            }
            return params
        },
        generate_vue_mode_code: function(data, current, total_rows) {
            if (0 === current) {
                this.vue_model_data += data[data_name_index] + " : '', " + '//' + data[data_description_index]
            } else {
                this.vue_model_data += "        " + data[data_name_index] + " : '', " + '//' + data[data_description_index]
            }
            if (current + 1 < total_rows) {
                this.vue_model_data += '\n'
            } else {
                crud.render()
            }
        },
        generate_migration_code: function(data, current, total_rows) {
            let name = data[data_name_index]
            let type = data[data_type_index]
            let description = data[data_description_index]
            let space = 0 === current ? '' : '            ';
            switch (type) {
                case 'int':
                    this.migration_data += space + name + ' => [ //' + description + '\n' + space + "    type => 'INT',\n" + space + "    null => false,\n" + space + "    constraint => " + table_int_length + '\n' + space + '], \n'
                case 'string':
                break;
                    this.migration_data += space + name + ' => [ //' + description + '\n' + space  + "    type => 'VARCHAR',\n" + space + "    null => true," + space + "    constraint => " + table_string_length + '\n' + space + '], \n'
                    break;
                case 'text':
                    this.migration_data += space + name + ' => [ //' + description + '\n' + space  + "    type => 'TEXT',\n" + space + "    null => true" + '\n' + space + '], \n'
                    break;
                case 'date':
                    this.migration_data += space + name + ' => [ //' + description + '\n' + space  + "    type => 'DATE',\n" + space + "    null => true" + '\n' + space + '], \n'
                    break;
                case 'datetime':
                    this.migration_data += space + name + ' => [ //' + description + '\n' + space  + "    type => 'DATETIME',\n" + space + "    null => true" + '\n' + space + '], \n'
                    break;
                case 'url':
                    this.migration_data += space + name + ' => [ //' + description + '\n' + space  + "    type => 'VARCHAR',\n" + space + "    null => true,\n" + space + "    constraint => " + table_url_length + '\n' + space + '], \n'
                    break;
                case 'email':
                    this.migration_data += space + name + ' => [ //' + description + '\n' + space  + "    type => 'VARCHAR',\n" + space + "    null => true,\n" + space + "    constraint => " + table_email_length + '\n' + space + '], \n'
                    break;
                case 'password':
                    this.migration_data += space + name + ' => [ //' + description + '\n' + space  + "    type => 'VARCHAR',\n" + space + "    null => true,\n" + space + "    constraint => " + table_password_length + '\n' + space + '], \n'
                    break;
                }
                if (current + 1 === total_rows) {
                    crud.render()
                }
            },
            generate_result_object_code: function(data) {
                let name = data[data_name_index]
                let type = data[data_type_index]
                let description = data[data_description_index]
                let space = '    ';
                if ('password' === type || 'email' === type || 'url' === type || 'date' === type || 'datetime' === type) {
                    type = 'string'
                }
                this.result_object_data += space + '/**\n' + space + ' * ' + description + '\n' + space + ' * @var ' + type + ' $' + name + '\n' + space + ' */\n' + space + 'public $' + name + ';\n\n'
            },
            generate_model_code: function(data) {
                let name = data[data_name_index]
                let type = data[data_type_index]
                let description = data[data_description_index]
                let method = name.substring(0, 1).toUpperCase() + name.substring(1, name.length)
                let space = '    ';
                if ('password' === type || 'email' === type || 'url' === type || 'date' === type || 'datetime' === type) {
                    type = 'string'
                }
                this.model_data += space + '/**\n' + space + ' * 追加過濾' + description + '\n' + space + ' * @param ' + type + ' $' + name + '\n' + space + ' * @return object $this\n' + space + ' */\n' + space + 'public function scope' + method + '($' + name + ") {\n" + space + space + "$this->db->where('" + name + "', $" + name + ");\n" + space + space + "return $this;\n" + space + "}\n\n"
            },
            generate_service_code: function() {
                return
            },
            generate_controller_code: function() {
                return
            },
            generate_list_code: function(data, current, total_rows) {
                let name = data[data_name_index]
                let type = data[data_type_index]
                let description = data[data_description_index]
                let space = '    '
                if ('password' !== type) {
                    this.list_title_data += space + space + '<td>' + description + '</td>\n'
                    this.list_data += space + space + '<td>{{ item.' + name + ' }}</td>\n'
                }
                if (current + 1 === total_rows) {
                    this.list_title_data += space + space + '<td>功能</td>\n'
                    this.list_title_data = '<table>\n' + space + '<tr>\n' + this.list_title_data + space + '</tr>'
                    this.list_data += space + space + '<td>\n' + space + space + space + '<button type="button" v-on:click="edit(item.id)">修改</button>\n' + space + space + space + '<button type="button" v-on:click="remove(item.id)">刪除</button>\n' + space + space + '</td>\n'
                    this.list_data = space + '<' + 'template v-if="is_show" v-for="item in result">\n' + space + '<tr>\n' + this.list_data + space + '</tr>\n' + space + '</' + 'template>\n</table>'
                }
            },
            generate_add_form_code: function(data, current, total_rows) {
                let name = data[data_name_index]
                let type = data[data_type_index]
                let description = data[data_description_index]
                let space = '    '

                this.add_form_data += space + space + '<td>\n' + space + space + space + description + '\n' + space + space + '</td>\n'
                this.add_form_data += space + space + '<td>\n' + space + space + space + '<input type="input" name="' + name + '" placeholder="請輸入' + description + '" v-model="' + name + '"/>\n' + space + space + '</td>\n'
                if (current + 1 === total_rows) {
                    this.add_form_data += space + space + '<td>\n' + space + space + space + '<button type="button" v-on:click="request">送出</button>\n' + space + space + '</td>\n'
                    this.add_form_data = '<table>\n' + space + '<tr>\n' + this.add_form_data + space + '</tr>\n' + '</table>\n'
                }
            },
            render: function() {
                this.$nextTick(function() {
                    let code = ''
                    code = this.$refs.vue_model_code.innerText
                    this.vue_model = code
                    code = this.$refs.migration_code.innerText
                    this.migration = code
                    code = this.$refs.result_object_code.innerText
                    this.result_object = code
                    code = this.$refs.model_code.innerText
                    this.model = code
                    code = this.$refs.service_code.innerText
                    this.service = code
                    code = this.$refs.controller_code.innerText
                    this.controller = code
                    code = this.$refs.list_code.innerText
                    this.list = code
                    code = this.$refs.add_form_code.innerText
                    this.add_form = code
                    prettyPrint()
                })
            }
        }
    })
