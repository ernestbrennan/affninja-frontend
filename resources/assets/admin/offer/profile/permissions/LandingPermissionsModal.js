// Функциональный компонент:
// - не обладает собственным экземпляром this
// - компонент, который рендерится в нем ('permissions-modal'), рендерится в области видимости #offer_profile
// - для передачи параметров в функцию render используется свойство context. Где одно из её свойств:
//     parent: Ссылка на родительский компонент (извлекаем необходимую нам информацию из #offer_profile)

// Функциональные компоненты рекомендуется использовать, если необходимо:
// - Выбрать один из компонентов для последующего рендеринга в данной точке
// - Произвести манипуляции над дочерними элементами, входными параметрами или данными,
//   перед тем как передать их в дочерний компонент

// @returns {VNode}
// createElement(
//     {String | Object | Function}
//     Название тега HTML, опции компонента, или async функция, возвращающая один из них. Обязательный параметр.
//     'permissions-modal',
//
//     {Object}
//     Объект данных, содержащий атрибуты,
//     который вы бы указали в шаблоне. Опциональный параметр. Используемые здесь свойства:
//     {
//         Передает в создаваемый виртуальный узел объект сформированных параметров
//         props: {}
//         Задает ссылку на компонент, которая доступна в области видимости #offer_profile
//         ref: 'offer-permissions-modal',
//     }
// )

Vue.component('landing-permissions-modal', {
    functional: true,
    render(createElement, context) {
        let landing = _.find(context.parent.landings, {hash: context.parent.active_landing_hash});

        return createElement('permissions-modal', {
            props: {
                api_sync_groups: '',
                api_sync_publishers: '/landing.syncPublishers',
                id_title: 'id',
                title: landing ? landing.title : '',
                id: landing ? landing.id : 0,
                selected_publishers: landing ? landing.publishers : [],
                selected_groups: [],
                user_groups: [],
                only_publishers: true,
            },

            ref: 'landing-permissions-modal',
        })
    },
});