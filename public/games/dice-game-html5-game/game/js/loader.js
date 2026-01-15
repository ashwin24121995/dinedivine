////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

 /*!
 * 
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 * 
 */
function initPreload(){
	toggleLoader(true);
	checkMobileEvent();
	
	$(window).resize(function(){
		resizeGameFunc();
	});
	resizeGameFunc();
	
	loader = new createjs.LoadQueue(false);
	manifest=[{src:'assets/board.png', id:'board'},
			{src:'assets/button_start.png', id:'buttonStart'},
			{src:'assets/button_roll.png', id:'buttonRoll'},
			{src:'assets/button_roll_disabled.png', id:'buttonRollDisabled'},
			{src:'assets/button_history.png', id:'buttonHistory'},
			{src:'assets/overlayHistory.png', id:'overlayHistory'},
			{src:'assets/dice_Spritesheet6x1.png', id:'dice'},
			{src:'assets/overlayBet.png', id:'overlayBet'},
			{src:'assets/button_bet.png', id:'buttonBet'},
			{src:'assets/button_plus.png', id:'buttonPlus'},
			{src:'assets/button_minus.png', id:'buttonMinus'},
			{src:'assets/button_replay.png', id:'buttonReplay'},
			{src:'assets/result.png', id:'result'},
			
			{src:'assets/button_share.png', id:'buttonShare'},
			{src:'assets/button_save.png', id:'buttonSave'},
			{src:'assets/social/button_facebook.png', id:'buttonFacebook'},
			{src:'assets/social/button_twitter.png', id:'buttonTwitter'},
			{src:'assets/social/button_whatsapp.png', id:'buttonWhatsapp'},
			{src:'assets/social/button_telegram.png', id:'buttonTelegram'},
			{src:'assets/social/button_reddit.png', id:'buttonReddit'},
			{src:'assets/social/button_linkedin.png', id:'buttonLinkedin'},
			
			  
			{src:'assets/button_confirm.png', id:'buttonConfirm'},
			{src:'assets/button_cancel.png', id:'buttonCancel'},
			{src:'assets/item_exit.png', id:'itemExit'},
			{src:'assets/button_fullscreen.png', id:'buttonFullscreen'},
			{src:'assets/button_sound_on.png', id:'buttonSoundOn'},
			{src:'assets/button_sound_off.png', id:'buttonSoundOff'},
			{src:'assets/button_music_on.png', id:'buttonMusicOn'},
			{src:'assets/button_music_off.png', id:'buttonMusicOff'},
			{src:'assets/button_exit.png', id:'buttonExit'},
			{src:'assets/button_settings.png', id:'buttonSettings'}
		];

	//memberpayment
	if(typeof memberData != 'undefined' && memberSettings.enableMembership){
		addMemberRewardAssets();
	}
	
	sortOnObject(gameSettings.token_arr, 'credit');
	
	for(n=0;n<gameSettings.token_arr.length;n++){
		manifest.push({src:gameSettings.token_arr[n].src, id:'token'+n})
	}
	
	if ( typeof addScoreboardAssets == 'function' ) { 
		addScoreboardAssets();
	}
	
	audioOn = true;
	if(!isDesktop){
		if(!enableMobileAudio){
			audioOn=false;
		}
	}else{
		if(!enableDesktopAudio){
			audioOn=false;
		}
	}
	
	if(audioOn){
		manifest.push({src:'assets/sounds/button.ogg', id:'soundButton'})
		manifest.push({src:'assets/sounds/chips.ogg', id:'soundChips'})
		manifest.push({src:'assets/sounds/chips_collect.ogg', id:'soundChipsCollect'})
		manifest.push({src:'assets/sounds/chips_place.ogg', id:'soundChipsPlace'})
		manifest.push({src:'assets/sounds/dice.ogg', id:'soundDice'})
		manifest.push({src:'assets/sounds/music.ogg', id:'music'})
		manifest.push({src:'assets/sounds/win1.ogg', id:'soundWin1'})
		manifest.push({src:'assets/sounds/win2.ogg', id:'soundWin2'})
		manifest.push({src:'assets/sounds/start.ogg', id:'soundStart'})
		manifest.push({src:'assets/sounds/result.ogg', id:'soundResult'})
		manifest.push({src:'assets/sounds/tone.ogg', id:'soundTone'})
		manifest.push({src:'assets/sounds/tone2.ogg', id:'soundTone2'})
		
		createjs.Sound.alternateExtensions = ["mp3"];
		loader.installPlugin(createjs.Sound);
	}
	
	loader.addEventListener("complete", handleComplete);
	loader.on("progress", handleProgress, this);
	loader.loadManifest(manifest);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
	$('#mainLoader').html(Math.round(loader.progress/1*100)+'%');
}

/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
	toggleLoader(false);
	initMain();
};

/*!
 * 
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 * 
 */
function toggleLoader(con){
	if(con){
		$('#mainLoader').show();
	}else{
		$('#mainLoader').hide();
	}
}