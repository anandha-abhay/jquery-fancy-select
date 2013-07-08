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
      addEvents();
    };

    var addEvents = function(){
      $(plugin.el).on("click","li", function(){
        var value = $(this).data("value");
        selectOption($(this),value);

        // Bubble up events
        $element.change();
        $element.click();
      });

      $(plugin.el).on("click",".SelectedItem a", function(){
        clearSelection();
      });

      $(plugin.el).find("input").focus(function(){
        showList();
      });

      $(plugin.el).find("input").on("keyup", function(e) {
        var $target = $(e.target);
        search($target.val());
      });
    };

    var showList = function(){
      plugin.list.show();
      plugin.el.addClass("Open")
    };

    var hideList = function(){
      plugin.list.hide();
      plugin.el.removeClass("Open")
    };

    var clearSelection = function(){
      plugin.input.show().val("");
      plugin.selectedItem.hide();
    };

    var selectOption = function(clickedItem, value) {
      plugin.input.hide();
      plugin.selectedItem.show();
      $(element).val(value);
      plugin.selectedItem.find(".name").text(clickedItem.find(".primary").text());
      hideList();
    };

    var buildFancy = function() {

      var wrapper = document.createElement("div");
      var input = document.createElement("input");
      $(input).attr("placeholder","Choose an item...");
      var selectedItem = document.createElement("div");

      $(selectedItem).append("<span class='name'>Selected Name</span>").addClass("SelectedItem").append("<a href='#'>X</a>").hide();

      plugin.selectedItem = $(selectedItem);
      plugin.input = $(input);

      var list = document.createElement("ul");
      plugin.list = $(list);

      $element.find("option").each(function(){

        //Set up wrapper element
        var item = document.createElement("li");

        //Set the primary field based on the <option> text
        $(item).append($("<div class='primary'></div>").text($(this).text())).data("value",$(this).attr("value"));

        //Set additional fields based on the data attributes, adding classname
        var data = $(this).data();
        for (var key in data){
          $(item).append($("<div></div>").addClass(key).text(data[key]));
        };

        $(list).append(item);
      });

      $(wrapper).append(selectedItem);
      $(wrapper).addClass("FancySelect").append(input).append(list);

      $element.after(wrapper);
      $element.before("<span>Original select: </span>");

      $(list).hide();
      return wrapper;
    };

    var search = function(input) {
      var searchRegex = new RegExp(input, "gi");

      // reset the dom
      plugin.el.find("li").removeClass("no-match");
      plugin.el.find("li").removeClass("match");

      // add classes based on matches
      plugin.el.find("li").each(function(index) {
        var $this = $(this);
        var searchableText = $this.find(".primary").html();
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
