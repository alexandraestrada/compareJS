$(document).ready(function() {
  
  $('#rightImg').animate({'width': '70%'}, "slow");
  $('#dragbar').animate({'left': '30%'}, "slow");
  var resizeImg = false;
  var dragPosition= 0;
  retractImg($('#dragbar'), $('#rightImg'), 1, '20%', '21%', 600);
  resize()
});

function retractImg(element, element2, times, distance1, distance2, speed) {
    for(var i = 0; i < times; i++) {
        element.animate({left: '+='+distance1}, speed)
        element2.animate({width: '-='+distance2}, speed)
    }        
}
var resize = function() {
    var container = $('#imgContainer');
    var leftImg = $('#leftImg');
    var rightImg = $('#rightImg');
    var dragbar = $('#dragbar');
    
     dragbar.bind('mousedown',function (e) {
            e.preventDefault();
            resizeImg = true;
            // frame = $(this).parent();
        
    $(container).bind('mousemove', function(e) {
      if (!resizeImg) 
             return;
      var dragWidth= dragbar.outerWidth(),
        //X position of dragbar relecent to screen
        dragPosition= e.clientX,
        //container width
        containerWidth = container.outerWidth(),
        //left position of container relative to document
        containerOffset= container.offset().left,
        //amount of space between the dragbar and the container left border.
        leftWidth= dragPosition - containerOffset,
        //amount of space between the dragbar and right container border.
        rightWidth= containerWidth - (dragPosition - containerOffset);

        leftImg.css('width', leftWidth); //increase or decrese width of left image
        rightImg.css('width', rightWidth); //increase or decrease width of right image  
        dragbar.css('left', leftWidth)

    })
    //stop scrolling on mouseup.
    $(document).bind('mouseup', function (e) {
        resizeImg= false;
      });
  });       
};

