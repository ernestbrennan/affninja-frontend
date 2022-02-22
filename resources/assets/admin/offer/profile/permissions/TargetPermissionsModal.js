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
//         ref: 'target-permissions-modal',
//     }
// )

Vue.component('target-permissions-modal', {
    functional: true,
    render(createElement, context) {
        let title = '';

        if (context.parent.selected_target && context.parent.selected_target.template) {
            title = context.parent.selected_target.template.title + ' ' + context.parent.selected_target.label;
        }

        return createElement('permissions-modal', {
            props: {
                api_sync_groups: '/target.syncUserGroups',
                api_sync_publishers: '/target.syncPublishers',
                id_title: 'target_id',
                title: title,
                id: context.parent.selected_target.id ? context.parent.selected_target.id : 0,
                selected_publishers: context.parent.selected_target.publishers,
                selected_groups: context.parent.selected_target.user_groups,
                user_groups: context.parent.user_groups,
            },
            ref: 'target-permissions-modal',
        })
    },
});