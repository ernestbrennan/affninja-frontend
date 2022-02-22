const FACEBOOK_PIXEL_WIDGET = 1;
const YANDEX_METRIKA_WIDGET = 2;
const CUSTOM_CODE_WIDGET = 3;
const VK_METRIKA_WIDGET = 4;
const RATING_MAIL_RU_WIDGET = 5;
const GOOGLE_ANALITYCS_WIDGET = 6;
const WIDGETS_LIST = [
    FACEBOOK_PIXEL_WIDGET,
    YANDEX_METRIKA_WIDGET,
    GOOGLE_ANALITYCS_WIDGET,
    VK_METRIKA_WIDGET,
    RATING_MAIL_RU_WIDGET,
    CUSTOM_CODE_WIDGET
];

Vue.component('flow-widgets', {
    template: '#flow-widgets-tpl',
    model: {
        prop: 'flow_widgets',
    },
    props: {
        flow_widgets: {
            type: Array,
            required: true,
        },
        flow_hash: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
            API_HOST: API_HOST,
            LANG_FLOWS: LANG_FLOWS,
            CUSTOM_CODE: CUSTOM_CODE_WIDGET,
            all_widgets: [],
            formatted_flow_widgets: [],
        }
    },

    created() {
        this.getAllWidgets();
    },

    watch: {
        'flow_widgets': {
            immediate: true,
            handler() {
                let permissions = in_array('FLOW_CUSTOM_CODE', USER_PERMISSIONS),
                    widgets = [];

                WIDGETS_LIST.forEach(widget_id => {
                    if (widget_id === CUSTOM_CODE_WIDGET && !permissions) {
                        return;
                    }

                    let widgets_by_type = _.filter(this.flow_widgets, {flow_widget_id: widget_id});

                    if (widgets_by_type.length) {
                        widgets[widget_id] = widgets_by_type;
                    }
                });

                this.formatted_flow_widgets = widgets;
            }
        }
    },

    methods: {
        getWidgetTitle(widget_id, title) {
            switch (widget_id) {
                case FACEBOOK_PIXEL_WIDGET:
                case VK_METRIKA_WIDGET:
                case RATING_MAIL_RU_WIDGET:
                    return title;

                case CUSTOM_CODE_WIDGET:
                    return LANG_FLOWS.custom_html_code;

                case YANDEX_METRIKA_WIDGET:
                case GOOGLE_ANALITYCS_WIDGET:
                    return '';

                default:
                    throw 'Undefined widget_id!';
            }
        },

        openCreateWidgetModal(widget) {
            switch (widget.id) {
                case FACEBOOK_PIXEL_WIDGET:
                    this.$refs.facebook_pixel.openCreateModal(widget, this.flow_hash);
                    break;

                case YANDEX_METRIKA_WIDGET:
                    this.$refs.yandex_metrika.openCreateModal(widget, this.flow_hash);
                    break;

                case CUSTOM_CODE_WIDGET:
                    this.$refs.custom_html.openCreateModal(widget, this.flow_hash);
                    break;

                case VK_METRIKA_WIDGET:
                    this.$refs.widget_modal.openCreateModal(widget, this.flow_hash, LANG_FLOWS.create_vk_metrika_title);
                    break;

                case RATING_MAIL_RU_WIDGET:
                    this.$refs.widget_modal.openCreateModal(widget, this.flow_hash, LANG_FLOWS.create_rating_mail_ru_title);
                    break;

                case GOOGLE_ANALITYCS_WIDGET:
                    this.$refs.widget_modal.openCreateModal(widget, this.flow_hash, LANG_FLOWS.create_google_analitycs_title);
                    break;

                default:
                    throw 'Unknown type of widget';
            }
        },

        openEditWidgetModal(widget) {
            switch (widget.widget.id) {
                case FACEBOOK_PIXEL_WIDGET:
                    this.$refs.facebook_pixel.openEditModal(widget);
                    break;

                case YANDEX_METRIKA_WIDGET:
                    this.$refs.yandex_metrika.openEditModal(widget);
                    break;

                case CUSTOM_CODE_WIDGET:
                    this.$refs.custom_html.openEditModal(widget);
                    break;

                case VK_METRIKA_WIDGET:
                    this.$refs.widget_modal.openEditModal(widget, LANG_FLOWS.edit_vk_metrika_title);
                    break;

                case RATING_MAIL_RU_WIDGET:
                    this.$refs.widget_modal.openEditModal(widget, LANG_FLOWS.edit_rating_mail_ru_title);
                    break;

                case GOOGLE_ANALITYCS_WIDGET:
                    this.$refs.widget_modal.openEditModal(widget, LANG_FLOWS.edit_google_analitycs_title);
                    break;

                default:
                    throw 'Unknown type of widget';
            }
        },

        getAllWidgets() {
            FlowWidget.getList().then(flow_widgets => {
                if (!in_array('FLOW_CUSTOM_CODE', USER_PERMISSIONS)) {
                    let index = _.findIndex(flow_widgets, ['id', CUSTOM_CODE_WIDGET]);

                    if (index !== -1) {
                        flow_widgets.splice(index, 1);
                    }
                }

                this.all_widgets = flow_widgets;
            });
        },

        createWidget(widget_info) {
            return new Promise((resolve, reject) => {
                FlowWidget.create(widget_info.flow_widget_id, widget_info.flow_hash, widget_info.attributes).then(data => {
                    let widget = data.response;

                    // Записываем в созданный виджет потока инфу по виджету
                    widget.widget = _.find(this.all_widgets, {id: widget.flow_widget_id});

                    this.flow_widgets.push(widget);

                    showMessage('success', data.message);
                    resolve();
                }).catch(() => {
                    reject();
                });
            });
        },

        editWidget(widget_info) {
            return new Promise((resolve, reject) => {
                FlowWidget.edit(widget_info.hash, widget_info.attributes).then(data => {
                    let widget = data.response;

                    // Записываем в отредактированный виджет потока инфу по виджету
                    widget.widget = _.find(this.all_widgets, {id: widget.flow_widget_id});

                    let index = _.findIndex(this.flow_widgets, ['hash', widget_info.hash]);

                    this.flow_widgets.splice(index, 1, widget);

                    showMessage('success', data.message);
                    resolve();
                }).catch(() => {
                    reject();
                });
            });
        },

        deleteWidget(widget_id, widget_hash) {
            return new Promise((resolve, reject) => {

                Swal.show(this.getDeleteMessageTitle(widget_id)).then(() => {
                    FlowWidget.delete(widget_hash).then((message) => {
                        let index = _.findIndex(this.flow_widgets, {'hash': widget_hash});

                        this.flow_widgets.splice(index, 1);

                        showMessage('success', message);
                        resolve();
                    });
                }).catch(() => {
                    reject();
                });
            });
        },

        getDeleteMessageTitle(widget_id) {
            switch (widget_id) {
                case FACEBOOK_PIXEL_WIDGET:
                    return LANG_FLOWS.on_delete_facebook;

                case YANDEX_METRIKA_WIDGET:
                    return LANG_FLOWS.on_delete_yandex;

                case CUSTOM_CODE_WIDGET:
                    return LANG_FLOWS.on_delete_widget_msg;

                case RATING_MAIL_RU_WIDGET:
                    return LANG_FLOWS.on_delete_rating_mail_ru;

                case VK_METRIKA_WIDGET:
                    return LANG_FLOWS.on_delete_vk_metrik;

                case GOOGLE_ANALITYCS_WIDGET:
                    return LANG_FLOWS.on_delete_google_analitycs;

                default:
                    throw 'Unknown type of widget';
            }
        }
    },
});