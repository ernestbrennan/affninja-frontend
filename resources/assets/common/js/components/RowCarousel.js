// @todo Отрефакторить компонент (сделать проще) Уровни абстракции не очевидны
// @todo в методе initRowCarousel необходимо указать только методы
// @todo если один метод зависит от другого, то передавать/возвращать параметры
// @todo некоторые ссылки типа this.row_carousel_width вполне можно заменить на this.$el.clientWidth

Vue.component('row-carousel', {
    props: {
        value: {
            type: String, Number,
            default: '',
        },
    },
    data() {
        return {
            YET_MSG: LANG_MESSAGES.yet,

            buttons: [],
            buttons_data: [],
            current_button_index: 0,
            visible_buttons_count: null,

            row_carousel_width: 0,
            row_carousel_inner_width: null,

            current_shift: 0,
            max_shift: null,

            show_tools: true,
            buttons_count_shift: null,
            shift: 1,

            init_row_carousel: false,
        }
    },

    mounted() {
        setTimeout(() => {
            this.$nextTick(() => {
                this.init();
            });
        }, 0);
    },

    watch: {
        'value'() {
            if (!this.buttons.length) {
                return;
            }

            this.$nextTick(() => {
                this.setActiveClass();
            });
        },
    },

    methods: {
        init() {
            this.initRowCarousel();
            this.initDomObserver();
            this.addResizeListener();
        },

        initRowCarousel() {
            this.buttons = this.$refs['row-carousel-inner'].children;
            this.row_carousel_width = this.$el.clientWidth;
            this.row_carousel_inner_width = this.$refs['row-carousel-inner'].scrollWidth;
            this.show_tools = this.shouldShowTools(this.row_carousel_width, this.row_carousel_inner_width);
            this.setActiveClass();

            if (!this.buttons.length || !this.show_tools) {
                return this.$refs['row-carousel-inner'].style.left = -1 + 'px';
            }

            if (!isset(this.buttons_data[this.current_button_index])) {
                this.current_button_index = 0;
            }

            this.calcRowCarouselInfo();
            this.calcMaxShift();
            this.setCurrentShift();

            this.findMaxButtonNumbersShift();
            this.showActiveButton();

            this.init_row_carousel = true;
        },

        initDomObserver() {
            let target = this.$refs['row-carousel-inner'],
                config = {childList: true, subtree: true, characterData: true},
                observer = new MutationObserver((mutations) => {
                    this.$nextTick(() => {
                        this.initRowCarousel();
                    });
                });

            observer.observe(target, config);
        },

        addResizeListener() {
            let scheduled = false, lastEvent;

            window.addEventListener('resize', () => {
                lastEvent = event;

                if (!scheduled) {
                    scheduled = true;

                    setTimeout(() => {
                        scheduled = false;

                        this.$nextTick(() => {
                            this.initRowCarousel();
                        });
                    }, 800);
                }
            });
        },

        shouldShowTools(row_carousel_width, row_carousel_inner_width) {
            return row_carousel_inner_width >= row_carousel_width - this.$refs['arrow-container'].offsetWidth;
        },

        calcRowCarouselInfo() {
            let buttons_data = [],
                shift = 0,
                len = this.buttons.length;

            for (let i = 0; i < len; i++) {
                let width = this.buttons.item(i).offsetWidth;

                shift += i === 0 ? 1 : this.buttons.item(i - 1).offsetWidth - 1;

                buttons_data.push({
                    id: i,
                    width: width,
                    shift: shift,
                });
            }

            this.buttons_data = buttons_data;
        },

        calcMaxShift() {
            let last_button_index = this.buttons_data.length - 1;

            this.max_shift = this.row_carousel_inner_width
                - this.row_carousel_width + this.$refs['arrow-container'].clientWidth;
        },

        findMaxButtonNumbersShift() {
            let max_visible_width = this.row_carousel_width - this.$refs['arrow-container'].clientWidth
                - this.$refs['row-carousel-more'].offsetWidth,
                sum = 0,
                button_widths = _.map(this.buttons_data, 'width', []);

            this.buttons_count_shift = -1;

            while (sum < max_visible_width) {
                let max_button_width = Math.max.apply(null, button_widths),
                    index = button_widths.indexOf(max_button_width);

                sum += max_button_width;

                button_widths.splice(index, 1);

                this.buttons_count_shift++;
            }
        },

        slideRight() {
            if (this.buttons_data[this.current_button_index].shift < this.max_shift) {
                this.current_button_index += this.buttons_count_shift;
            }

            this.setMaxCurrentButtonIndex();
            this.setCurrentShift();
        },

        setMaxCurrentButtonIndex() {
            if (this.current_button_index <= 0) {
                return this.current_button_index = 0;
            }

            while (this.buttons_data[this.current_button_index - 1].shift > this.max_shift) {
                this.current_button_index--;
            }
        },

        slideLeft() {
            this.current_button_index -= this.buttons_count_shift;

            if (this.current_button_index < 0) {
                this.current_button_index = 0;
            }

            this.setCurrentShift();
        },

        setCurrentShift() {
            this.current_shift = 0;

            if (this.buttons_data[this.current_button_index].shift > this.max_shift) {
                this.current_shift = this.max_shift;
            } else {
                this.current_shift = this.buttons_data[this.current_button_index].shift;
            }

            this.$refs['row-carousel-inner'].style.left = -this.current_shift + 'px';

            this.calcVisibleButtonsCount();
        },

        calcVisibleButtonsCount() {
            let len = this.buttons.length,
                max_visible_shift = this.current_shift + this.row_carousel_width
                    - this.$refs['arrow-container'].clientWidth
                    + (this.$refs['arrow-container'].offsetWidth - this.$refs['arrow-container'].clientWidth);

            for (let i = 0; i < len; i++) {
                if (this.buttons_data[i].shift + this.buttons_data[i].width > max_visible_shift) {
                    return this.visible_buttons_count = len - this.buttons_data[i].id;
                } else if (i + 1 === len) {
                    this.visible_buttons_count = 0;
                }
            }
        },

        showActiveButton() {
            let len = this.buttons.length;

            for (let i = 0; i < len; i++) {
                if (this.buttons.item(i).dataset.id === this.value) {
                    this.current_button_index = i++;

                    this.setMaxCurrentButtonIndex();
                    this.setCurrentShift();
                }
            }
        },

        onClick(target) {
            let data_id = this.findDataId(target);

            if (isset(data_id)) {
                this.$emit('input', data_id);
            }

            this.setActiveClass();
        },

        findDataId(target) {
            let data_id;

            while (target !== this.$el) {
                if (target.dataset.id) {
                    data_id = target.dataset.id;
                    break;
                }

                target = target.parentElement;
            }

            return data_id;
        },

        setActiveClass() {
            let len = this.buttons.length;

            for (let i = 0; i < len; i++) {
                if (this.buttons.item(i).classList.contains('active')) {
                    this.buttons.item(i).classList.remove('active');
                }

                if (this.buttons.item(i).dataset.id === this.value) {
                    this.buttons.item(i).classList.add('active');
                }
            }
        },
    },

    template: `
    <div :class="['row-carousel-container', init_row_carousel ? 'init' : '']">
        <div :style="{visibility: show_tools && visible_buttons_count ? '' : 'hidden'}"
             ref="row-carousel-more"
             class="row-carousel-more">
            {{ YET_MSG + ' ' + visible_buttons_count }}
        </div>
        <div :style="{visibility: show_tools ? '' : 'hidden'}"
             class="row-carousel-arrow-container" 
             ref="arrow-container">
            <div @click="slideRight" :disabled="!visible_buttons_count" class="row-carousel-arrow-right">
                <i class="fa fa-caret-right"></i>
            </div>
            <div @click="slideLeft" :disabled="!current_button_index" class="row-carousel-arrow-left">
                <i class="fa fa-caret-left"></i>
            </div>
        </div>
        <div @click="onClick($event.target)" ref="row-carousel-inner" 
             class="row-carousel-inner btn-group" role="group">
            <slot></slot>
        </div>
    </div>`,
});