(function(root, factory) {

    var isNode = typeof module !== "undefined" && module.exports,
        isAMD = typeof define === 'function' && typeof define.amd === 'object' && define.amd;

    if (isNode) {
        var $ = require("jquery");
        module.exports = factory($);
    } else if (isAMD) {
        define(['jquery'], function($) {
            return factory($);
        });
    } else {
        factory(root.jQuery);
    }

}(this, function($, undefined) {

    "use strict";

    function isFunction(obj) {
        return Object.prototype.toString.call(obj) === "[object Function]";
    }

    /**
     * Mega constructor.
     *
     * @constructor
     */
    var Megamask = function() {

        $.extend(this, {
            $el:     null,
            length:  0,
            value:   [],
            rules:   [],
            masked:  [],
            options: {
                regexMap: {
                    '9': '[0-9]',
                    'x': '[a-zA-Z]',
                    '*': '.'
                },
                placeholder: '_',
                jumpToFirstEmpty: true
            }
        });

        this.initialize.apply(this, arguments);
    };

    Megamask.EVENT_NAMESPACE = '.megamask';

    /**
     * Mixin necessary functions in Megamask prototype.
     */
    $.extend(Megamask.prototype, {

        /**
         * Events for bind on.
         */
        events: {
            'keydown' : 'keydown',
            'keypress': 'keypress',
            'blur'    : 'blur',
            'focus'   : 'focus',
            'click'   : 'focus',
            'paste'   : 'paste'
        },

        /**
         * Initialization.
         * Called after instantiating Megamask.
         *
         * @param {Element} $element
         * @param {string}  mask
         * @param {object}  [options={}]
         */
        initialize: function($element, mask, options)
        {
            options || (options = {});

            $.extend(this.options, options, true);

            this.$el = $element;
            this.el  = $element.get(0);

            this.mask = mask;

            this.refresh();

            for (var e in this.events) {
                if (this.events.hasOwnProperty(e)) {
                    $element.on(e + Megamask.EVENT_NAMESPACE, $.proxy(this[this.events[e]], this));
                }
            }
        },

        remove: function() {
            this.$el.off(Megamask.EVENT_NAMESPACE);
        },

        refresh: function() {
            var lastFilled;

            this.resolveMask(this.mask, this.$el.val());

            if (typeof (lastFilled = this.indexOfLastFilled()) === "number") {
                this.setPosition(lastFilled);
            }
        },

        /**
         * Flushes current state of Megamask into the input.
         */
        flush: function()
        {
            var output = '';

            for (var x = 0; x < this.length; x++) {
                if (this.value.hasOwnProperty(x)) {
                    output = output.concat(this.get(x) || this.options.placeholder)
                } else {
                    output = output.concat(this.masked[x]);
                }
            }

            this.$el.val(output);
        },

        /**
         * Clears value of the input (but not of mask);
         */
        clear: function()
        {
            this.$el.val('');
        },

        /**
         * Checks if current value of input is empty.
         *
         * @return {Boolean}
         */
        isEmpty: function()
        {
            for (var x in this.value) {
                if (this.value.hasOwnProperty(x)) {
                    if (this.get(x) != undefined) return false;
                }
            }

            return true;
        },

        /**
         * Returns raw value of input.
         *
         * @return {String}
         */
        getRaw: function()
        {
            var raw = '';

            $.each(this.value, function(key, symbol) {
                if (symbol != undefined) {
                    raw = raw.concat(symbol);
                }
            });

            return raw;
        },

        /**
         * Parses given mask into the groups of symbols.
         *
         * @param {string} mask
         * @param {string} value
         * @return {Megamask}
         */
        resolveMask: function(mask, value)
        {
            value || (value = '');

            this.length = mask.length;

            for (var x = 0, y = 0; x < mask.length; x++) {
                var symbol = mask.charAt(x);

                if (this.options.regexMap.hasOwnProperty(symbol)) {
                    this.value[x] = value.charAt(y) || null;
                    this.rules[x] = new RegExp(this.options.regexMap[symbol]);
                    y++;
                } else {
                    this.masked[x] = symbol;
                }
            }

            if (!this.isEmpty()) {
                this.flush();
            }

            return this;
        },

        /**
         * Calculates current position of the caret inside the input.
         *
         * @return {Object}
         */
        resolvePosition: function()
        {
            var start = 0, end = 0, normalizedValue, range,
                textInputRange, len, endRange;

            if (typeof this.el.selectionStart == "number" && typeof this.el.selectionEnd == "number") {
                start = this.el.selectionStart;
                end   = this.el.selectionEnd;
            } else {
                range = document.selection.createRange();

                if (range && range.parentElement() == this.el) {
                    len = this.el.value.length;
                    normalizedValue = this.el.value.replace(/\r\n/g, "\n");

                    // Create a working TextRange that lives only in the input
                    textInputRange = this.el.createTextRange();
                    textInputRange.moveToBookmark(range.getBookmark());

                    // Check if the start and end of the selection are at the very end
                    // of the input, since moveStart/moveEnd doesn't return what we want
                    // in those cases
                    endRange = this.el.createTextRange();
                    endRange.collapse(false);

                    if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                        start = end = len;
                    } else {
                        start = -textInputRange.moveStart("character", -len);
                        start += normalizedValue.slice(0, start).split("\n").length - 1;

                        if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                            end = len;
                        } else {
                            end = -textInputRange.moveEnd("character", -len);
                            end += normalizedValue.slice(0, end).split("\n").length - 1;
                        }
                    }
                }
            }

            var editableLength = end - start;

            for (var x = start; x < end; x++) {
                if (!this.value.hasOwnProperty(x)) {
                    editableLength--;
                }
            }

            return {
                start:          start,
                end:            end,
                length:         end-start,
                editableLength: editableLength
            };
        },

        /**
         * Sets the caret position inside the input.
         *
         * @param {number} key
         */
        setPosition: function(key)
        {
            if (this.el.setSelectionRange) {
                this.el.setSelectionRange(key, key);
            } else if (this.el.createTextRange) {
                var range = this.el.createTextRange();
                range.moveStart('character', key);
                range.collapse();
                range.select();
            }
        },

        /**
         * Returns index of the nearest writable symbol using direction (left -1; right: 1).
         *
         * @param {number} key
         * @param {number} [direction=1]
         * @return {number|boolean}
         */
        indexOfWritable: function(key, direction)
        {
            direction || (direction = 1);

            while (key >= 0 && key <= this.length) {
                if (this.value.hasOwnProperty(key)) {
                    return key;
                }
                key+= direction;
            }

            return false;
        },

        /**
         * Seeks index to given delta in the given direction.
         *
         * @param {number} key
         * @param {number} [delta=1]
         * @param {number} [direction=1]
         *
         * @return {number|boolean}
         */
        seek: function (key, delta, direction)
        {
            delta     || (delta = 1);
            direction || (direction = 1);

            while (key >= 0 && key <= this.length) {

                key+= direction;

                if (this.value.hasOwnProperty(key)) {
                    delta--;

                    if (delta == 0) {
                        return key;
                    }
                }
            }

            return false;
        },

        /**
         * Returns index of the last filled symbol.
         *
         * @deprecated
         *
         * @return {Number}
         */
        indexOfLastFilled: function()
        {
            var key = 0;

            while (key < this.length) {
                if (key = this.indexOfWritable(key)) {
                    if (this.get(key) != undefined) {
                        key++;
                    } else {
                        return key;
                    }
                } else {
                    return null;
                }
            }

            return key;
        },

        /**
         * Unsets value of the symbol having given index.
         *
         * @deprecated
         *
         * @param {number} key
         */
        unset: function(key)
        {
            var next;

            if (this.indexOfWritable(key, -1) === false) return;

            for (var x = key; x < this.length; x++) {
                if (this.value.hasOwnProperty(x)) {
                    next = this.indexOfWritable(x + 1);

                    if (next !== false) {
                        this.set(x, this.get(next));
                    } else {
                        this.set(x, null);
                    }
                }
            }
        },

        /**
         * Sets value of the symbol having given index.
         *
         * @param {number} key
         * @param {string} value
         */
        set: function(key, value)
        {
            if (this.value.hasOwnProperty(key)) {
                this.value[key] = value;
            }
        },

        /**
         * Inserts value in index, shifts other symbols to the right.
         *
         * @param {number} key
         * @param {string} value
         */
        insert: function(key, value)
        {
            this.shift(key, 1, 1);
            this.set(key, value);
        },

        /**
         * Shifts elements of this.value from the given key on the given length in the given direction.
         *
         * @param {number} key
         * @param {number} [length=1]
         * @param {number} [direction=1]
         */
        shift: function(key, length, direction)
        {
            var temp = this.value.slice(0);

            length    || (length = 1);
            direction || (direction = 1);

            for (var x in this.value) {
                if (this.value.hasOwnProperty(x) && x >= key) {
                    x = parseInt(x);

                    var next = this.seek(x, length, direction);

                    (next !== false) && (temp[next] = this.value[x]);
                }
            }

            if (direction < 0) {
                var last = this.value.lastIndexOf(this.value.slice(-1)[0]);

                for (var z = length; z > 0; z--) {
                    temp[last] = null;
                    last = this.seek(last, 1, -1);
                }
            }

            this.value = temp;
        },

        /**
         * Returns current value of the symbol by index.
         *
         * @param {number} key
         * @return {string}
         */
        get: function(key)
        {
            return this.value[key];
        },

        /**
         *  Sets characted at given position and moves caret
         */
        setCharAt: function(char, position) {
            var next, key;

            key = this.indexOfWritable(position.start);

            if (key !== false) {
                if (this.test(key, char)) {

                    if (position.editableLength > 0) {
                        this.shift(position.end, position.editableLength, -1);
                    }

                    this.insert(key, char);

                    this.flush();

                    next = this.indexOfWritable(key+1);

                    if (next !== false) {
                        this.setPosition(next);
                    }

                    return true;
                }
            }

            return false;
        },

        /**
         * Event handler.
         *
         * @event
         *
         * @param {Event} event
         */
        keydown: function(event)
        {
            if (event.which == 8 || event.which == 46) {

                var key,
                    next,
                    position = this.resolvePosition();

                if (event.which == 8) {
                    next = position.editableLength == 0 ? this.indexOfWritable(position.start - 1, -1) : this.indexOfWritable(position.start, -1);
                    key = position.end;
                } else {
                    next = this.indexOfWritable(position.start);
                    key = position.editableLength == 0 ? position.end + 1 : position.end;
                }

                if (next !== false) {
                    this.shift(key, position.editableLength, -1);

                    this.flush();

                    if (next !== false) {
                        this.setPosition(next);
                    }
                }

                event.preventDefault();
            }
        },

        /**
         * Event handler.
         *
         * @event
         *
         * @param {Event} event
         */
        keypress: function(event)
        {
            event.preventDefault();
            this.setCharAt(String.fromCharCode(event.which), this.resolvePosition())
        },

        /**
         * Tests given symbol having given index.
         *
         * @param {number} key
         * @param {string} symbol
         *
         * @return {Boolean}
         */
        test: function(key, symbol)
        {
            return this.rules.hasOwnProperty(key) && this.rules[key].test(symbol);
        },

        /**
         * Event handler.
         *
         * @event
         *
         * @param {Event} event
         */
        focus: function(event)
        {
            if (this.isEmpty()) {
                this.flush();
                this.setPosition(this.indexOfWritable(0));
            }
        },

        /**
         * Event handler.
         *
         * @event
         *
         * @param {Event} event
         */
        blur: function(event)
        {
            if (this.isEmpty()) {
                this.clear();
            }
        },

        /**
         * Event handler.
         *
         * @event
         *
         * @param {Event} event
         */
        paste: function(event)
        {
            var self = this,
                i, text;

            event.preventDefault();

            try {
                text = event.originalEvent.clipboardData.getData("Text");
            } catch (err) {
                return;
            }
            
            for (i = 0, text = text.split(''); i < text.length; i++) {
                if (!self.setCharAt(text[i], self.resolvePosition())) {
                    break;
                }
            }
        }
    });

    /**
     * Extending jQuery functions list.
     *
     * @param {string} definition
     * @param {object} [options={}]
     */
    $.fn.megamask = function(definition, options)
    {
        var result, $context;

        $context = $(this);

        options || (options = {});

        result = $context.map(function() {
            var $el, mask, method;

            $el = $(this);

            if (!(mask = $el.data('mask'))) {
                $el.data('mask', (mask = new Megamask($el, definition, options)));
                return $el;
            } else if (isFunction((method = mask[definition]))) {
                return method.call(mask, options);
            }
        });

        return $context.length > 1 ? result : result[0];
    };


    return Megamask;
}));