$(document).ready(function () {
    $('.datetimepicker').datetimepicker({
        format: "DD.MM.YYYY",
        locale: 'ru',
        useCurrent: false,
        sideBySide: true,
        widgetPositioning: {
            //horizontal: 'auto',
            //vertical: 'bottom'
        },
        tooltips: {
            selectMonth: 'Выбрать месяц',
            prevMonth: 'Предыдущий месяц',
            nextMonth: 'Следующий месяц',
            selectYear: 'Выбрать год',
            prevYear: 'Предыдущий год',
            nextYear: 'Следующий год',
            selectDecade: 'Выбрать десятилетие',
            prevDecade: 'Предыдущее десятилетие',
            nextDecade: 'Следующее десятилетие',
            prevCentury: 'Предыдущий век',
            nextCentury: 'Следующий век'
        }
    });

    $('.toggle-password').on('click', function (e) {
        var $targetInput = $(this).parents('.form-group').find('input');
        var type = $targetInput.attr('type');
        if (type === 'password') {
            $targetInput.attr('type', 'text');
        } else {
            $targetInput.attr('type', 'password');
        }
    });

    var $mask = $('.phone-mask');
    if ($mask.length > 0) {
        var placeholder = $mask.attr('placeholder');
        var mask = placeholder.replace(/_/g , '0');

        if (placeholder !== '') {
            $mask.mask(mask);
        }
    }
});