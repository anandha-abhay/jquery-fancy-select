$(document).ready(function(){
  $(".Fancy").each(function(){
    buildFancy($(this));
  })
})

function buildFancy(el){
  
  var wrapper = document.createElement("ul");
  
  el.find("option").each(function(){

    //Set up wrapper element
    var item = document.createElement("li");

    //Set the primary field based on the <option> text
    $(item).append($("<div class='primary'></div>").text($(this).text()));

    //Set additional fields based on the data attributes, adding classname
    var data = $(this).data();
    for (var key in data){
      $(item).append($("<div></div>").addClass(key).text(data[key]));
    }

    $(wrapper).append(item);

  });
  
  el.after(wrapper);
}