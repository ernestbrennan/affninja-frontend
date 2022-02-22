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

Vue.component('offer-permissions-modal', {
    functional: true,
    render(createElement, context) {
        return createElement('permissions-modal', {
            props: {
                api_sync_groups: '/offer.syncUserGroups',
                api_sync_publishers: '/offer.syncPublishers',
                id_title: 'offer_id',
                title: context.parent.offer_info.title,
                id: context.parent.offer_info.id ? context.parent.offer_info.id : 0,
                selected_publishers: context.parent.offer_publishers,
                selected_groups: context.parent.offer_user_groups,
                user_groups: context.parent.user_groups,
            },

            ref: 'offer-permissions-modal',
        })
    },
});