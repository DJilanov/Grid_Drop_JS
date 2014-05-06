$( document ).ready(function() {
  /* global variables */
  var selectedColor = "";
  var isIe = true;
  isOdd = true;
  oldLeft = undefined;
  var makeDraggable = function(el){
    el.draggable({
          start:function( event, ui ) {
            /* activated when the dragging starts */
            window.startCoordsX = ui.offset.left;
            window.startCoordsY = ui.offset.top;
            $('.box').addClass("magnetPointer");
            $('body').addClass("magnetPointer");
          },
          drag:function( event, ui ) {
            /* 
              activated when you move the mouse after dragging starts , 
              the vibrating will be feature in the future
            */
            /*
            oldLeft = parseInt($(this).css('left'));
            if(isOdd)
            {
              $(this).css('left',oldLeft-5 + "px");
            }
            else
            {
              $(this).css('left',oldLeft+5  + "px");
            }
            */
            
            
          },
          stop: function( event, ui ) {
            /* remove the magnet cursor */
            $('.box').removeClass("magnetPointer");
            $('body').removeClass("magnetPointer");
            /*used to calculate hwo much is scrolled from top*/
            posTop = $(window).scrollTop() - $('body').offset().top;
            /* fetch the element initial position so it can return to it */
            var tester = $(document.elementFromPoint(ui.offset.left+30, ui.offset.top - posTop ));
            /* check is it moved or it is still into the starting position */
            //check is it moved
            if(((window.startCoordsY - ui.offset.top < 20)&&(window.startCoordsY -ui.offset.top >-20))&&((window.startCoordsX-ui.offset.left<20)&&(window.startCoordsX-ui.offset.left>-20)))
            {
                $(".ui-draggable-dragging").css('left',"0px").css('top','0px');
                $(".ui-draggable-dragging").removeClass(".ui-draggable-dragging");
            }
            else
            {
              if(tester.hasClass("ui-draggable-dragging"))
              {
                /* if it thinks that the nearest element is the current moved rectangle we use the plugin */
                var tester = tester.nearest('.box')[0];
              }
              /* after change color it returns to its begining position */
              $(tester).css("background-color",$(this).css("background-color")).after(function() {
                $(".ui-draggable-dragging").css('left',"0px").css('top','0px');
                $(".ui-draggable-dragging").removeClass(".ui-draggable-dragging");
              });
            }
          }
    });
  };
  /*check is there any saved info( like last session ) and check do we use retarded IE ( on IE the localStorage mostly doesnt work ) */
    if (!(window.navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)))
    {
      isIe= false;
    }
    if(localStorage&&((localStorage.save)&&(!isIe)&&(localStorage.save.indexOf("div")!=-1)))
    {
      /* isnert into the html the saved data  */
      $(".table").append(localStorage.save);
      selectedColor = localStorage.selectedColor;
      $(".preview").css("background-color",selectedColor);
      $('.table .box').each(function(){
        /* make each box draggable */
        makeDraggable($(this));
        $(this).droppable({hoverClass: "highlight"});
      });
      
    }
    else{
    	for(var rowCounter =0; rowCounter<20; rowCounter++)
    	{
    		$(".table").append("<div class='row-fluid center' data-number="+rowCounter+">");
    		for(var colCounter =0; colCounter<20; colCounter++)
  	  	{
          /* construct the first build of the grid */
  	  		$(".table").find("[data-number='"+rowCounter+"']").append("<div class='box' data-boxnumber='"+colCounter+" "+rowCounter+"'></div>");
          if(colCounter==9)
          {
              /* will help us for teh responsive */
              $(".table").find("[data-boxnumber='"+colCounter+" "+rowCounter+"']").addClass("cutInHalf");
          }
  	  		makeDraggable($(".table").find("[data-boxnumber='"+colCounter+" "+rowCounter+"']"));
          $(".table").find("[data-boxnumber='"+colCounter+" "+rowCounter+"']").droppable({hoverClass: "highlight"});
  	  	}
    	}
    }

    /* fetch the change into the typeInColor change */
    $('.typeInColor').on('blur',function(){
      $('.preview').css('background-color',$('.custom input').val());

      if ((($('.custom .preview').css('backgroundColor') == 'rgb(255, 255, 255)')||($('.custom .preview').css('backgroundColor') == 'rgba(0, 0, 0, 0)'))&&($('.typeInColor').val()!="white")) {
        $('.typeInColor').popover({
            html : true, 
            content: function() {
              return $('#popoverCustomColorHiddenContent').html();
            },
            title: function() {
              return $('#popoverCustomColorHiddenTitle').html();
            }
        });
        $('.typeInColor').popover('show');
      }
      else
      {
        $('.typeInColor').popover('hide');
        selectedColor=$('.custom .preview').css('backgroundColor');
      }
    });

    /*the lucky code */
    $(".lucky .btn-primary").click(function(){
      selectedColor="rgb("+parseInt(((Math.random()*255)))+","+parseInt(((Math.random()*255)))+","+parseInt(((Math.random()*255)))+")"
      $(".preview").css("background-color",selectedColor);
      $('.custom input').val(selectedColor);
    });

    /* painting code */
    $('.palette .color').click(function(){
      selectedColor=$(this).css('background-color');
      $(".preview").css("background-color",selectedColor);
      $('.custom input').val(selectedColor);
    });

    /* click on the grid boxes */
    $('.box').click(function(){
      $(this).css("background-color",selectedColor);
    });

});
/* check the scroller for the nav */
$( window ).scroll(function() {
  if($(document).scrollTop()>0)
  {
  	$('.customNav').css("box-shadow","10px 10px 5px #888888");
  }
  else
  {
  	$('.customNav').css("box-shadow","none");
  }
});
/* save after close */
$( window ).unload(function() {
  if(localStorage)
  {
    localStorage.selectedColor=$(".preview").css("background-color");
    /* after each leave save the table and color into the storage */
    localStorage.setItem("save",$('.table').html());
  }
});