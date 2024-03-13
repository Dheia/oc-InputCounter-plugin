var InputCounter = function($counter, options) {
    var self = this;
    var minLength = options.minLength;
    var maxLength = options.maxLength;
    var optimalMinLength = options.optimalMinLength;
    var optimalMaxLength = options.optimalMaxLength;

    self.refresh = refresh;

    (function () {
        refresh(0);
    })();

    function refresh(length)
    {
        var max = optimalMaxLength || maxLength;
        var min = optimalMinLength || minLength;

        if (maxLength && length > maxLength) {
            max = maxLength;
        }

        if (!max && !min) {
            $counter.text(length);
            return;
        }

        if (max) {
            $counter.text(length + ' / ' + max);
        }
        else {
            $counter.text(length + ' > ' + min);
        }

        $counter.removeClass('danger warning success');

        if ((maxLength && length > maxLength) || (minLength && length < minLength)) {
            $counter.addClass('danger');
            return;
        }

        if ((optimalMaxLength && length > optimalMaxLength) || (optimalMinLength && length < optimalMinLength)) {
            $counter.addClass('warning');
            return;
        }

        $counter.addClass('success');
    }
};


$(document).render(function() {
    $('[data-counter]').each(function(index, element) {
        if (element.hasOwnProperty('inputCounter')) {
            return;
        }

        if (element.type === 'hidden') {
            return;
        }

        var $counter = $('<div class="input-counter small"></div>');
        var $element = $(element);

        $counter.insertBefore($element);

        element.inputCounter = new InputCounter($counter, {
            minLength: $element.data('min-length'),
            maxLength: $element.data('max-length'),
            optimalMinLength: $element.data('optimal-min-length'),
            optimalMaxLength: $element.data('optimal-max-length'),
        });

        function refreshCounter() {
            element.inputCounter.refresh($element.val().length);
        }

        $element.on('input', refreshCounter);
        $(document).on('click', '[data-switch-locale]', refreshCounter);
        refreshCounter();
    });
});
