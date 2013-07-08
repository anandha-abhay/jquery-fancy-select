(functionn($) {
  $.fancySelect = function(element, options) {

    var defaults = {
    }

    var plugin = this;

    plugin.settings = {}

    var $element = $(element);
    var element = element;

    plugin.init = function() {
      plugin.settings = $.extend({}, defaults, options);
    }

    plugin.init();
  }

$.fn.fancySelect = function(options) {
  return this.each(function() {
    if (undefined == $(this).data('fancySelect')) {
      var plugin = new $.fancySelect(this, options);
      $(this).data('fancySelect', plugin);
    }
  });
}

})(jQuery);
