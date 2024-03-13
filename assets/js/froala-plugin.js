(function($) {
    $.extend($.FroalaEditor.DEFAULTS, {
        counterEnabled: false,
        counterMinLength: null,
        counterMaxLength: null,
        counterOptimalMinLength: null,
        counterOptimalMaxLength: null
    });

    $.FroalaEditor.PLUGINS.inetisCharCounter = function(editor) {
        var $counterElement;
        var counter;

        function valueLength() {
            return (editor.el.textContent || "").replace(/\u200B/g, "").length
        }

        function onUpdate() {
            if (editor.opts.counterEnabled) {
                counter.refresh(valueLength());
            }
        }

        function _init() {
            if (!editor.$wp || !editor.opts.counterEnabled) {
                return;
            }

            $counterElement = $('<div class="input-counter small"></div>');
            $counterElement.insertBefore(editor.$box.closest('[data-control=richeditor]'));

            counter = new InputCounter($counterElement, {
                minLength: editor.opts.counterMinLength,
                maxLength: editor.opts.counterMaxLength,
                optimalMinLength: editor.opts.counterOptimalMinLength,
                optimalMaxLength: editor.opts.counterOptimalMaxLength,
            });

            editor.events.on("keyup contentChanged input html.set", function() {
                editor.events.trigger("charCounter.update");
            });

            editor.events.on("charCounter.update", onUpdate);
            editor.events.trigger("charCounter.update")

            editor.events.on("destroy", function() {
                $(editor.o_win).off("resize.char" + editor.id);
                $counterElement.removeData().remove();
                $counterElement = null;
            });
        }

        return {
            _init: _init,
            count: valueLength
        };
    }
})(window.jQuery);
