(function($) {
  $.fancySelect = function(element, options) {

    var defaults = {
      // placeholder: "Choose an item..."
    };

    var plugin = this;

    plugin.settings = {};

    var $select = $(element);
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
        $select.change();
        $select.click();
      });

      $(plugin.el).on("click",".SelectedItem a", function(){
        clearSelection();
      });

      $(plugin.el).find("input").focus(function(){
        showList();
      });

      $(plugin.el).find("input").click(function(){
        showList();
      });

      $(plugin.el).find("input").on("keyup", function(e) {
        var $target = $(e.target);
        if (e.keyCode == 27) {
          clearSelection();
          hideList();
        } else {
          search($target.val());
        }
      });
    };

    var showList = function(){
      plugin.list.show();
      plugin.innerWrapper.addClass("Open")
      $(".FancySelect").css("z-index",0);
      plugin.wrapper.css("z-index", 9999);
    };

    var hideList = function(){
      plugin.list.hide();
      plugin.innerWrapper.removeClass("Open")
    };

    var clearSelection = function(){
      plugin.input.show().val("");
      search("");
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

      var wrapper = document.createElement("div");        //  Outer wrapper for positioning
      plugin.wrapper = $(wrapper);
      $(wrapper).addClass("FancySelect");

      var innerWrapper = document.createElement("div")    //  Inner wrapper for all the elements
      plugin.innerWrapper = $(innerWrapper);
      $(innerWrapper).addClass("InnerWrapper");

      //Create the input
      var input = document.createElement("input");
      
      var placeholder = $select.find("option").not("[value]").text();

      $(input).attr("placeholder",placeholder);

      plugin.input = $(input);

      //Create selected item markup
      var selectedItem = document.createElement("div");
      $(selectedItem).append("<span class='name'>Selected Name</span>").addClass("SelectedItem").append("<a title='Remove' href='#'></a>").hide();
      plugin.selectedItem = $(selectedItem);

      //List markup
      var list = document.createElement("ul");
      plugin.list = $(list);

      //Add only items that have a value attribute
      $select.find("option[value]").each(function(){

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

      $(wrapper).append(innerWrapper);
      $(innerWrapper).append(selectedItem);
      $(innerWrapper).append(input).append(list);
      $select.after(wrapper);
      
      //$select.hide();

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
