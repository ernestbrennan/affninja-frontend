$(document).ready(function () {

    //Редактирование названия категории вопросов
    $('.editable_category').editable({
        params: function (params) {
            params.category_id = $(this).data('category_id');
            params.title = params.value;

            return params;
        }
    });

    //Редактирование вопросов
    $('.editable_question_title').editable({
        params: function (params) {
            params.question_id = $(this).data('question_id');
            params.title = params.value;

            return params;
        }
    });

    //Редактирование вопросов
    $('.editable_question_answer').editable({
        params: function (params) {
            params.question_id = $(this).data('question_id');
            params.body = params.value;

            return params;
        }
    });
});