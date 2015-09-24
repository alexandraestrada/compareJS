
$(document).ready(function() {	
	  var slider = new Slider($('#slideContainer'),$('#rightImg'),$('#leftImg'),$('#dragbar'))
	  slider.init();
	  slider.slide();
});



function Slider(container, rightImg, leftImg, dragbar) {
	this.dragPosition= 0;
	this.resizeImg = false;
	this.container = container;
	this.rightImg = rightImg;
	this.leftImg = leftImg;
	this.dragbar = dragbar;	
	  
}

Slider.prototype.retract = function(times, distance1, distance2, speed) {
	for(var i = 0; i < times; i++) {
        this.dragbar.animate({left: '+='+distance1}, speed)
        this.rightImg.animate({width: '-='+distance2}, speed)
    } 
}
Slider.prototype.init = function() {
	var slider = this;
	slider.rightImg.animate({'width': '70%'}, "slow");
	slider.dragbar.animate({'left': '30%'}, "slow");
	slider.retract(1, '20%', '21%', 600);
	
	
}


Slider.prototype.slide = function() {

     var self=this;
     this.dragbar.bind('mousedown',function (e) {
         e.preventDefault();
         self.resizeImg = true;     
		self.container.bind('mousemove', function(e) {
			console.log("testing");
		   if (!self.resizeImg) {
		 	  return;
		   }          
		   var dragWidth= self.dragbar.outerWidth(),
		     //X position of dragbar relecent to screen
		     dragPosition= e.clientX,
		     //container width
		     containerWidth = self.container.outerWidth(),
		     //left position of container relative to document
		     containerOffset= self.container.offset().left,
		     //amount of space between the dragbar and the container left border.
		     leftWidth= dragPosition - containerOffset,
		     //amount of space between the dragbar and right container border.
		     rightWidth= containerWidth - (dragPosition - containerOffset);

		   self.leftImg.css('width', leftWidth); //increase or decrese width of left image
		   self.rightImg.css('width', rightWidth); //increase or decrease width of right image  
		   self.dragbar.css('left', leftWidth);	

		 })
 		//stop scrolling on mouseup.
 		$(document).bind('mouseup', function (e) {
	 	self.resizeImg= false;
   		});
	});          

};

   