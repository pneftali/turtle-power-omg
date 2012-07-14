/*
(function (){

	return {

	} 
})();
*/

(function (){
	$(document).ready(function (){
		$( "#tabs" ).tabs();





		// global var inside this context,
		// use for tracking current slider shown
		var slider = 1;

		// listens on img click event and display the 
		// corresponding big image
		$( '.items img' ).on('click', scroll);
		$( '.browse' ).on('click', scroller);


		// scroll me handler
		function scroll(){
			var file 	= $( this ).data('file');

			$( '#bigImageDiv' ).html("<img src='./images/scrollable/bigpic/"+file+"' >");
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
			} else{
				slideToLeft();
			}
			updateBigImage();
		}

			// helper function sliding to right
			function slideToRight(){
				if(slider === 3){
					$( '.container'+slider ).fadeOut('fast', function (){
						slider = 1;
						$( '.container'+slider ).show('slide', {direction: 'right'}, 500);						
					});
				} else{
					$( '.container'+(slider++) ).fadeOut('fast', function (){
						$( '.container'+slider ).show('slide', {direction: 'right'}, 500);
					});
				}
			}

			// helper function sliding to right
			function slideToLeft(){
				if(slider === 1){
					console.log(slider);
					$( '.container'+slider ).fadeOut('fast', function (){
						slider = 3;
						$( '.container'+slider ).show('slide', {direction: 'left'}, 500);						
					});
				} else{
					$( '.container'+(slider--) ).fadeOut('fast', function (){
						$( '.container'+slider ).show('slide', {direction: 'left'}, 500);
					});
				}
			}

			// 
			function updateBigImage(){
				var file = $( '.container'+slider ).children().children().data('file');
				$( '#bigImageDiv' ).hide().html("<img src='./images/scrollable/bigpic/"+file+"' >").fadeIn('slow');
			}

	})
})();



