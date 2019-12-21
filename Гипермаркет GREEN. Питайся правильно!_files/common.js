$(document).ready(function() {
    $.ajaxSetup({
        type: 'post',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        error: function () {
            noty({
                width: 200,
                text: 'Произошла ошибка. Обратитесь к администратору сайта.',
                type: 'error',
                dismissQueue: true,
                timeout: 5000,
                layout: 'topRight'
            });

            $('div.progress').addClass('hidden');
            $('button').attr('disabled', false);
        }
    });

    /* Манипуляции с модальными окнами. */
    $('[data-open-modal]').on('click', function() {
        var modal = $(this).attr('data-open-modal');

        $('#loginModal').modal('hide').on('hidden.bs.modal', function () {
            $('#' + modal).modal('show');
        });
    });

    /* Получение данных клиента и их заполнение в форме. */
    $('#card_number').on('change', function(e) {
        var card = $(e.target).val();

        //$.ajax({
        //    url: '/account/get-profile-by-card',
        //    data: {
        //        card: card
        //    },
        //    success: function(data) {
        //        if (data) {
        //            $('#name').val(data.name);
        //            $('#surname').val(data.surname);
        //            $('#birthday').val(data.birthday);
        //           $('#patronymic').val(data.patronymic);
        //       }
        //    }
        //});
    });

    /* Авторизация. */
    $('#account-login').ajaxForm({
        beforeSubmit: function() {
            $('#account-form-login').attr('disabled', true);
            $('form#account-login div.progress').removeClass('hidden');
        },
        success: function(notice) {
            $('#account-form-login').attr('disabled', false);
            $('form#account-login div.progress').addClass('hidden');

            $.each(notice, function(type, value) {
                noty({
                    width: 200,
                    text: value,
                    type: type,
                    dismissQueue: true,
                    timeout: 4000,
                    layout: 'topRight'
                });

                if (type === 'success') {
                    $('#loginModal').modal('hide');
                    $('#account-login').find('input').val('');

                    window.location.href = '/account';
                }
            });
        }
    });

    /* Регистрация. */
    $('#account-registration').ajaxForm({
        beforeSubmit: function() {
            $('#account-registration').attr('disabled', true);
            if($('#account-registration .checkboxCustom').hasClass('checked')){
              $('#account-registration .rules-check').text('');
            } else {
              $('#account-registration .rules-check').text('Необходимо принять условия');
              return false;
            }
            $('form#account-registration div.progress').removeClass('hidden');

            $('input, label.input-group-addon').removeClass('border-red');
            $('p.help-block.req-color').text('');
            $('button').button('loading');

        },
        success: function(notice) {
            var type = '',
                value = '';

            $('#account-form-registration').attr('disabled', false);
            $('form#account-registration div.progress').addClass('hidden');
            $('#account-registration .rules-check').text('');
            if (notice.success) {
                type = 'success';
                value = notice.success;

                $('#registrationModal').modal('hide');
                $('#account-registration').find('input').val('');

                window.location.href = '/account';
            } else {
                type = 'error';
                value = 'Проверьте правильность заполнения полей.';

                $.each(notice.error, function(field, message) {
                    var $field = $('#' + field);

                    $field.addClass('border-red').closest('.form-group').find('.help-block').text(message);
                    $field.closest('.form-group').find('.input-group-addon').addClass('border-red');
                });
            }

            noty({
                width: 200,
                text: value,
                type: type,
                dismissQueue: true,
                timeout: 4000,
                layout: 'topRight'
            });
            $('button').button('reset');
        }
    });

    $('#forget-password').ajaxForm({
        beforeSubmit: function() {
            $('#button-forget-password').attr('disabled', true);
            $('form#forget-password div.progress').removeClass('hidden');

            $('#forget_email').removeClass('border-red');
            $('p.help-block.req-color').text('');
        },
        success: function(notice) {
            $('#button-forget-password').attr('disabled', false);
            $('form#forget-password div.progress').addClass('hidden');

            var type = notice.success ? 'success' : 'error';
            var message = notice.success ? notice.success : notice.error;

            if (notice.success) {
                $('#forgetPasswordModal').modal('hide');
                $('#forget_email').val('');
            }

            noty({
                width: 200,
                text: message,
                type: type,
                dismissQueue: true,
                timeout: 4000,
                layout: 'topRight'
            });
        }
    });

    $('.eye-icon-grey').on('click', function() {
        var $input = $(this).closest('.input-group').find('input');
        var type = $input.attr('type') === 'password' ? 'text' : 'password';

        $input.attr('type', type);
    });
});
