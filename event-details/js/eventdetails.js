$(document).ready(function (){

	(function (){

		// global var inside this context,
		// use for tracking current slider shown
		var root		= '#events-slider',
			slider 		= 1,
			count		= 1,		// count per thumbnail, max is 4
			pause 		= false,
			cbox 		= false,
			timeout;

		// listens on img click event and display the 
		// corresponding big image
		$( root + ' img' ).on('hover', scroll);		
		$( root ).on('hover', 'div.thumbSelected', function(){
			//console.log('Hover on selected triggered.');			
			pause = true;
		});

		$( '.group1' ).fancybox({
			nextEffect: 'fade',
    		helpers : {
				title : {
					type : 'inside'
				}
			},
    		beforeShow : function() {
    			pause = true;
				cbox  = true;
				this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
			},
			afterClose : function() {
				pause = false;
				cbox  = false;
			}
    	});

		$( root + ' .browse' ).on('click', scroller);
		
		$( root + ' img').on('mouseleave', function(e){
			e.preventDefault();
			e.stopPropagation();
			//console.log('mouseleave trigger');
			if(!cbox){
				pause = false;
			}
		});

		// play slide
		playSlide();
		function playSlide(){

			var that 	= $( root +' .container'+slider ).children().first(), 	// init first child								
				file;

			$( that ).parent().find('div.thumbSelected').remove();
			$( that ).append("<div class='thumbSelected'></div>");	
			file = $( that ).children().children().first().data('file');
			$( '#bigImageDiv' ).hide().html("<a href='#'><img src='./images/scrollable/bigpic/"+file+"' ></a>").fadeIn();
							
			//console.log( 'slider = ' + slider );
			var play = function(x) {

				timeout = setTimeout( function(){
					if(!pause) {

						// first iteration, x should be first-child
						that = (x === undefined) ? $( that ).next() : $(x).next();						
						//console.log( that );

						// this will be epic
						$( that ).parent().find('div.thumbSelected').remove();
						$( that ).append("<div class='thumbSelected'></div>");

						file = $( that ).children().children().first().data('file');
						if(file !== undefined){
							$( '#bigImageDiv' ).hide().html("<a href='#'><img src='./images/scrollable/bigpic/"+file+"' ></a>").fadeIn('slow');
						}

						if( count > 3  ){ 				// need another iteration before going to next batch of thumbnails
							count = 0;
							$( that ).parent().find('div.thumbSelected').remove();
							//console.log('reached limit');
							slideToRight();					// after this call, slider is incremented by 1
							playSlide();
						} else{											
							play(that);
						}

						count++;
						//console.log('count = ' + count);
					} else {
						//console.log('Pause triggered');
						play(that);
					}
					
				}, 3000);	
			};
			
			return play();

		}

		// scroll me handler
		function scroll(e){
			e.preventDefault();
			e.stopPropagation();

			//console.log('Hover triggered');
			//count = $( this ).parent().data('order');
			//console.log('Count on hover = ' + count)
			pause = true;
			var file 	= $( this ).data('file'); // 'this' is referenced to <img> 

			$( '#bigImageDiv' ).html("<a href='#'><img src='./images/scrollable/bigpic/"+file+"' ></a>").fadeIn();
			thumbnailSelected(this);
		}

		// puts a dark layer on the clicked thumbnail
		function thumbnailSelected(that){
			// remove div with class thumbSelected
			$( that ).parent().parent().parent().find('div.thumbSelected').remove();
			
			// append a new div overlay to the selected thumbnail
			$( that ).parent().parent().append("<div class='thumbSelected'></div>");
		}

		// does the scrolling logic
		function scroller(){

			var direction = $( this ).data('direction');

			if(direction === 'next'){
				slideToRight();
				clearTimeout(timeout);
				count = 1;
				playSlide();
			} else{
				slideToLeft();
				clearTimeout(timeout);
				count = 1;
				playSlide();
			}
			updateBigImage();
		}

			// helper function sliding to right
			function slideToRight(){				
				if(slider === 3){
					slider = 1;
					$( root +' .container'+slider ).fadeOut('fast', function (){						
						$( root +' .container'+slider ).show('slide', {direction: 'right'}, 500);	
					});
				} else{
					$( root +' .container'+(slider++) ).fadeOut('fast', function (){
						$( root +' .container'+slider ).show('slide', {direction: 'right'}, 500);
					});
				}				
				//console.log('Exiting slide to right call. Slide = ' + slider);
			}

			// helper function sliding to right
			function slideToLeft(){
				var localSlider = slider;
				if(slider === 1){					
					slider = 3;
					$( root +' .container'+localSlider ).fadeOut('fast', function (){					
						$( root +' .container'+slider ).show('slide', {direction: 'left'}, 500);						
					});
				} else{
					$( root +' .container'+(slider--) ).fadeOut('fast', function (){
						$( root +' .container'+slider ).show('slide', {direction: 'left'}, 500);
					});
				}
			}

			// update big image every new batch
			function updateBigImage(){				
				var file = $( root +' .container'+slider ).children().children().children().data('file');
				$( '#bigImageDiv' ).html("<a href='#'><img src='./images/scrollable/bigpic/"+file+"' ></a>").fadeIn();
			}		

	})();


	/******* keeping this separated for now *********/

		(function (){
		// global var inside this context,
		// use for tracking current slider shown
		var root		= '#event-items',
			slider 		= 1,
			count		= 1,		// count per thumbnail, max is 4
			pause 		= false,
			timeout;

		// listens on img click event and display the 
		// corresponding big image
		$( root + ' img' ).on('hover', scroll);		
		$( root ).on('hover', 'div.thumbSelected', function(){
			//console.log('Hover on selected triggered.');
			pause = true;
		});
		$( root + ' .browse' ).on('click', scroller);
		
		$( root+ ' img' ).on('mouseleave', function(e){
			e.preventDefault();
			e.stopPropagation();
			//console.log('mouseleave trigger');
			pause = false;
		});	

		// play slide
		playSlide();
		function playSlide(){

			var that 	= $( root +' .container'+slider ).children().first(); 	// init first child								

			$( that ).parent().find('div.thumbSelected').remove();
			$( that ).append("<div class='thumbSelected'></div>");	
							
			//console.log( 'slider = ' + slider );
			var play = function(x) {

				timeout = setTimeout( function(){
					if(!pause) {

						// first iteration, x should be first-child
						that = (x === undefined) ? $( that ).next() : $(x).next();						
						//console.log( that );

						// this will be epic
						$( that ).parent().find('div.thumbSelected').remove();
						$( that ).append("<div class='thumbSelected'></div>");

						if( count > 3  ){ 				// need another iteration before going to next batch of thumbnails
							count = 0;
							$( that ).parent().find('div.thumbSelected').remove();
							//console.log('reached limit');
							slideToRight();					// after this call, slider is incremented by 1
							playSlide();
						} else{											
							play(that);
						}

						count++;
						//console.log('count = ' + count);
					} else {
						//console.log('Pause triggered');
						play(that);
					}
					
				}, 3000);	
			};
			
			return play();

		}

		// scroll me handler
		function scroll(e){
			e.preventDefault();
			e.stopPropagation();

			//console.log('Hover triggered');
			//count = $( this ).parent().data('order');
			//console.log('Count on hover = ' + count)
			pause = true;
			thumbnailSelected(this);
		}

		// puts a dark layer on the clicked thumbnail
		function thumbnailSelected(that){
			// remove div with class thumbSelected
			$( that ).parent().parent().find('div.thumbSelected').remove();
			
			// append a new div overlay to the selected thumbnail
			$( that ).parent().append("<div class='thumbSelected'></div>");
		}

		// does the scrolling logic
		function scroller(){

			var direction = $( this ).data('direction');

			if(direction === 'next'){
				slideToRight();
				clearTimeout(timeout);
				count = 1;
				playSlide();
			} else{
				slideToLeft();
				clearTimeout(timeout);
				count = 1;
				playSlide();
			}
		}

			// helper function sliding to right
			function slideToRight(){				
				var tmpSlider;
				if(slider === 3){
					tmpSlider = slider;
					slider = 1;
					$( root +' .container'+tmpSlider ).fadeOut('fast', function (){						
						$( root +' .container'+slider ).show('slide', {direction: 'right'}, 500);	
					});
				} else{
					$( root +' .container'+(slider++) ).fadeOut('fast', function (){
						$( root +' .container'+slider ).show('slide', {direction: 'right'}, 500);
					});
				}				
				//console.log('Exiting slide to right call. Slide = ' + slider);
			}

			// helper function sliding to right
			function slideToLeft(){
				var tmpSlider = slider;
				if(slider === 1){					
					slider = 3;
					$( root +' .container'+tmpSlider ).fadeOut('fast', function (){					
						$( root +' .container'+slider ).show('slide', {direction: 'left'}, 500);						
					});
				} else{
					$( root +' .container'+(slider--) ).fadeOut('fast', function (){
						$( root +' .container'+slider ).show('slide', {direction: 'left'}, 500);
					});
				}
			}
	})();



	// used for toggling of contents
	$( '.aToggle' ).click(function(){
		$( this ).toggleClass('aLess'); // adds or removes 'aLess' class

		if ( $( this ).data('action') === 'more' ) {
			// update arrow and text
			$( this ).text('less').append('<b>&nbsp;</b>');
			$( this ).data('action', 'less');

			// update content
			toggleContentHandler(this, 'show');			
			
		} else {
			// update arrow and text
			$( this ).text('more').append('<b>&nbsp;</b>');
			$( this ).data('action', 'more');

			// update content
			toggleContentHandler(this, 'hide');
		}
		
	});

		function toggleContentHandler(that, option){
			var content = $( that ).data('content');		

			if( option === 'show' ){
				if( content === 'important-notice' ){
					toggleContent('.impNoticeCut', '.impNoticeFull');
				} else{
					toggleContent('.synopsisContentCut', '.synopsisContentFull');
				}
			} else{
				if( content === 'important-notice' ){
					toggleContent('.impNoticeFull', '.impNoticeCut');
				} else{
					toggleContent('.synopsisContentFull', '.synopsisContentCut');
				}
			}
		}

		function toggleContent(hide, show){
			$( hide ).hide()
			$( show ).show();
		}


	// used for accordion right side pane
	$( '#eventsDetailsAccord' ).accordion({
		autoHeight: false,
		clearStyle: true,
		active: 1
	});		

	// for tooltip
	$( "#tt-image" ).tipsy({
		opacity: 1
	});

	// for tabs and jscrollpane
	$( "#tabs" ).tabs({
		show: function(){
			// used for jScrollPane
			$( '.tabs-children' ).jScrollPane({
				showArrows:true,
				verticalArrowPositions: 'after'
			});
		}
	});

	
})




