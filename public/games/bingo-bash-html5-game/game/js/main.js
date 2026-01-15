////////////////////////////////////////////////////////////
// MAIN
////////////////////////////////////////////////////////////
var stageW=1280;
var stageH=768;
var contentW = 1024;
var contentH = 576;

/*!
 * 
 * START BUILD GAME - This is the function that runs build game
 * 
 */
function initMain(){
	if(isDesktop){
		$('#canvasHolder').show();	
	}
		
	initGameCanvas(stageW,stageH);
	buildGameCanvas();
	buildGameButton();
	if ( typeof buildScoreBoardCanvas == 'function' ) { 
		buildScoreBoardCanvas();
	}
	
	//memberpayment
	if(typeof memberData != 'undefined' && memberSettings.enableMembership){
		buildMemberRewardCanvas();
	}

	generateBingoNumbers();
	
	goPage('main');
	playMusicLoop('musicGame');
	setMusicVolume('musicGame', .5)

	if ( typeof initSocket == 'function' && multiplayerSettings.enable) {
		initSocket("bingobash");
	}
	
	resizeCanvas();
}

var windowW=windowH=0;
var scalePercent=0;
const dpr = window.devicePixelRatio || 1;
const offset = {x:0,y:0,left:0,top:0};

/*!
 * 
 * GAME RESIZE - This is the function that runs to resize and centralize the game
 * 
 */
function resizeGameFunc(){
	setTimeout(function() {
		$('.mobileRotate').css('left', checkContentWidth($('.mobileRotate')));
		$('.mobileRotate').css('top', checkContentHeight($('.mobileRotate')));
		
		windowW = window.innerWidth;
		windowH = window.innerHeight;
		scalePercent = Math.min(windowW/contentW,windowH/contentH);
		scalePercent = scalePercent > 1 ? 1 : scalePercent;
		
		if(windowW > stageW && windowH > stageH){
			if(windowW > stageW){
				scalePercent = windowW/stageW;
				if((stageH*scalePercent)>windowH){
					scalePercent = windowH/stageH;
				}	
			}
		}
		
		const cssWidth = stageW * scalePercent;
		const cssHeight = stageH * scalePercent;
		
		offset.left = 0;
		offset.top = 0;
		
		if(cssWidth > windowW){
			offset.left = -((cssWidth) - windowW);
		}else{
			offset.left = windowW - (cssWidth);
		}
		
		if(cssHeight > windowH){
			offset.top = -((cssHeight) - windowH);
		}else{
			offset.top = windowH - (cssHeight);	
		}
		
		offset.x = 0;
		offset.y = 0;
		
		if(offset.left < 0){
			offset.x = Math.abs((offset.left/scalePercent)/2);
		}
		if(offset.top < 0){
			offset.y = Math.abs((offset.top/scalePercent)/2);
		}
		
		//room
		if ( typeof initSocket == 'function' && multiplayerSettings.enable) {
			$('.resizeFont').each(function(index, element) {
				$(this).css('font-size', Math.round(Number($(this).attr('data-fontsize'))*scalePercent));
			});
	
			$('#roomWrapper').css('width', cssWidth);
			$('#roomWrapper').css('height', cssHeight);
	
			$('#roomWrapper').css('left', (offset.left/2));
			$('#roomWrapper').css('top', (offset.top/2));

			$('#notificationHolder').css('width', cssWidth);
			$('#notificationHolder').css('height', cssHeight);
	
			$('#notificationHolder').css('left', (offset.left/2));
			$('#notificationHolder').css('top', (offset.top/2));
		}
		
		$(window).scrollTop(0);
		
		resizeCanvas();
		if ( typeof resizeScore == 'function' ) { 
			resizeScore();
		}

		//memberpayment
		if(typeof memberData != 'undefined' && memberSettings.enableMembership){
			resizeMemberReward();
		}
	}, 100);	
}