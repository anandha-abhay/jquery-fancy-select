(function($) {
  $.fancySelect = function(element, options) {

    var defaults = {
    };

    var plugin = this;

    plugin.settings = {};

    var $element = $(element);
    var element = element;

    plugin.init = function() {
      plugin.settings = $.extend({}, defaults, options);
      plugin.el = $(buildFancy());
    };

    var buildFancy = function() {
      var wrapper = document.createElement("div");
      var input = document.createElement("input");
      var list = document.createElement("ul");

      $element.find("option").each(function(){

        //Set up wrapper element
        var item = document.createElement("li");

        //Set the primary field based on the <option> text
        $(item).append($("<div class='primary'></div>").text($(this).text()));

        //Set additional fields based on the data attributes, adding classname
        var data = $(this).data();
        for (var key in data){
          $(item).append($("<div></div>").addClass(key).text(data[key]));
        }

        $(list).append(item);
      });

      $(wrapper).addClass("FancySelect").append(input).append(list);
      $element.after(wrapper);
      $element.before("<span>Original select: </span>");
      return wrapper;
    };

    var search = function(input) {
      var searchRegex = new RegExp(input, "gi");

      // reset the dom
      plugin.el.$("li").removeClass("no-match");
      plugin.el.$("li").removeClass("match");

      // add classes based on matches
      plugin.el.$("li").each(function(index) {
        var $this = $(this);
        var searchableText = $this.$(".primary").html();
        var searchResult = searchRegex.exec(searchableText);
        if(searchResult === null) {
          $this.addClass("no-match");
        } else {
          $this.addClass("match");
        }
      });
    };

    plugin.init();
  };

$.fn.fancySelect = function(options) {
  return this.each(function() {
    if (undefined == $(this).data('fancySelect')) {
      var plugin = new $.fancySelect(this, options);
      $(this).data('fancySelect', plugin);
    }
  });
};

})(jQuery);
