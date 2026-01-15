////////////////////////////////////////////////////////////
// GAME v2.5
////////////////////////////////////////////////////////////

/*!
 * 
 * GAME SETTING CUSTOMIZATION START
 * 
 */
var gameSettings = {
	totalScratchItem:9, //total scratch item
	scratchStrokeNum:30, //scratch stroke num
	gameCredit:100, //game credit
	maximumBet:10, //maximum game bet
	currencyStr:"$", //currency
	gameTimer:120000, //game timer, put zero to disable game timer
	enablePercentage:true, //option to have result base on percentage
};

var textStrings = {
	exitMessage:"ARE YOUR SURE\nYOU WANT TO QUIT THE GAME?", //go to main page message
	resultTitleText:"YOU WON TOTAL OF", //result complete text display
}

//icon array list
var icon_arr = [
	"assets/item_bird1.png",
	"assets/item_bird2.png",
	"assets/item_bird3.png",
	"assets/item_bird4.png",
	"assets/item_bird5.png",
	"assets/item_bird6.png",
	"assets/item_bird7.png"
];

//paytable array list					
var paytable_arr = [
	{id:0, total:3, point:10000, percent:1},
	{id:1, total:3, point:1000, percent:3},
	{id:2, total:3, point:500, percent:5},
	{id:3, total:3, point:300, percent:10},
	{id:4, total:3, point:200, percent:15},
	{id:5, total:3, point:100, percent:20}
];

//Social share, [SCORE] will replace with game score
var shareText = "SHARE THIS GAME"; //social share message
var shareSettings = {
	enable:true,
	options:['facebook','twitter','whatsapp','telegram','reddit','linkedin'],
	shareTitle:'Highscore on Jungle Scratch Game is [SCORE]PTS.',
	shareText:"[SCORE]PTS is mine new highscore on Jungle Scratch Game! Try it now!",
	customScore:true, //share a custom score to Facebook, it use customize share.php (Facebook and PHP only)
	gtag:true //Google Tag
};
				
/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */

const playerData = {credit:0, creditSum:0, paid:0, win:0, bet:0};
const gameData = {paused:true, oldX:0, oldY:0, betNumber:0, betNumberPlus:0, scratchCon:false, scratching:false, scratchItemArray:[], prizeItemArray:[], scratcCardArray:[], iconListArray:[], fixedIcons:[]};

/*!
 * 
 * GAME BUTTONS - This is the function that runs to setup button event
 * 
 */
function buildGameButton(){
	$(window).focus(function() {
		if(!buttonSoundOn.visible){
			toggleSoundInMute(false);
		}

		if (typeof buttonMusicOn != "undefined") {
			if(!buttonMusicOn.visible){
				toggleMusicInMute(false);
			}
		}
	});
	
	$(window).blur(function() {
		if(!buttonSoundOn.visible){
			toggleSoundInMute(true);
		}

		if (typeof buttonMusicOn != "undefined") {
			if(!buttonMusicOn.visible){
				toggleMusicInMute(true);
			}
		}
	});

	if(audioOn){
		if(muteSoundOn){
			toggleSoundMute(true);
		}
		if(muteMusicOn){
			toggleMusicMute(true);
		}
	}

	if(!isDesktop){
		
	}else{
		var isInIframe = (window.location != window.parent.location) ? true : false;
		if(isInIframe){
			$(window).blur(function() {
				appendFocusFrame();
			});
			appendFocusFrame();
        }
	}
	
	buttonStart.cursor = "pointer";
	buttonStart.addEventListener("click", function(evt) {
		playSound('soundClick');
		goPage('game');
	});
	
	buttonMinus.cursor = "pointer";
	buttonMinus.addEventListener("mousedown", function(evt) {
		playSound('soundChips');
		toggleBetNumber('minus');
	});
	buttonMinus.addEventListener("pressup", function(evt) {
		toggleBetNumber();
	});
	
	buttonPlus.cursor = "pointer";
	buttonPlus.addEventListener("mousedown", function(evt) {
		playSound('soundChips');
		toggleBetNumber('plus');
	});
	buttonPlus.addEventListener("pressup", function(evt) {
		toggleBetNumber();
	});
	
	buttonBuycard.cursor = "pointer";
	buttonBuycard.addEventListener("click", function(evt) {
		playSound('soundClick');
		
		//memberpayment
		if(typeof memberData != 'undefined' && memberSettings.enableMembership){
			if(!checkMemberGameType()){
				goMemberPage('user');
			}else{
				validateBet();
			}
		}else{
			validateBet();
		}
	});
	
	buttonReveal.cursor = "pointer";
	buttonReveal.addEventListener("click", function(evt) {
		playSound('soundClick');
		revealAll();
	});
	
	buttonContinue.cursor = "pointer";
	buttonContinue.addEventListener("click", function(evt) {
		playSound('soundClick');
		goPage('main');
	});
	
	if(shareSettings.enable){
		buttonShare.cursor = "pointer";
		buttonShare.addEventListener("click", function(evt) {
			playSound('soundButton');
			toggleSocialShare(true);
		});

		for(let n=0; n<shareSettings.options.length; n++){
			$.share['button'+n].cursor = "pointer";
			$.share['button'+n].addEventListener("click", function(evt) {
				shareLinks(evt.target.shareOption, addCommas(playerData.win));
			});
		}
	}
	
	buttonSoundOff.cursor = "pointer";
	buttonSoundOff.addEventListener("click", function(evt) {
		toggleSoundMute(true);
	});
	
	buttonSoundOn.cursor = "pointer";
	buttonSoundOn.addEventListener("click", function(evt) {
		toggleSoundMute(false);
	});

	if (typeof buttonMusicOff != "undefined") {
		buttonMusicOff.cursor = "pointer";
		buttonMusicOff.addEventListener("click", function(evt) {
			toggleMusicMute(true);
		});
	}
	
	if (typeof buttonMusicOn != "undefined") {
		buttonMusicOn.cursor = "pointer";
		buttonMusicOn.addEventListener("click", function(evt) {
			toggleMusicMute(false);
		});
	}
	
	buttonFullscreen.cursor = "pointer";
	buttonFullscreen.addEventListener("click", function(evt) {
		toggleFullScreen();
	});
	
	buttonExit.cursor = "pointer";
	buttonExit.addEventListener("click", function(evt) {
		togglePop(true);
	});
	
	buttonSettings.cursor = "pointer";
	buttonSettings.addEventListener("click", function(evt) {
		toggleOptions();
	});
	
	buttonConfirm.cursor = "pointer";
	buttonConfirm.addEventListener("click", function(evt) {
		togglePop(false);
		stopGame();
		goPage('main');
	});
	
	buttonCancel.cursor = "pointer";
	buttonCancel.addEventListener("click", function(evt) {
		togglePop(false);
	});
}

function appendFocusFrame(){
	$('#mainHolder').prepend('<div id="focus" style="position:absolute; width:100%; height:100%; z-index:1000;"></div');
	$('#focus').click(function(){
		$('#focus').remove();
	});	
}

/*!
 * 
 * TOGGLE SOCIAL SHARE - This is the function that runs to toggle social share
 * 
 */
function toggleSocialShare(con){
	if(!shareSettings.enable){return;}
	buttonShare.visible = con == true ? false : true;
	shareSaveContainer.visible = con == true ? false : true;
	socialContainer.visible = con;

	if(con){
		if (typeof buttonSave !== 'undefined') {
			TweenMax.to(buttonShare, 3, {overwrite:true, onComplete:toggleSocialShare, onCompleteParams:[false]});
		}
	}
}

function positionShareButtons(){
	if(!shareSettings.enable){return;}
	if (typeof buttonShare !== 'undefined') {
		if (typeof buttonSave !== 'undefined') {
			if(buttonSave.visible){
				buttonShare.x = -((buttonShare.image.naturalWidth/2) + 5);
				buttonSave.x = ((buttonShare.image.naturalWidth/2) + 5);
			}else{
				buttonShare.x = 0;
			}
		}
	}
}

/*!
 * 
 * DISPLAY PAGES - This is the function that runs to display pages
 * 
 */
var curPage=''
function goPage(page){
	curPage=page;
	
	mainContainer.visible = false;
	gameContainer.visible = false;
	resultContainer.visible = false;
	togglePop(false);
	toggleOptions(false);
	
	var targetContainer = null;
	switch(page){
		case 'main':
			targetContainer = mainContainer;
		break;
		
		case 'game':
			targetContainer = gameContainer;
			startGame();
		break;
		
		case 'result':
			targetContainer = resultContainer;
			toggleSocialShare(false);
			playSound('soundResult');
			stopGame();
			saveGame(playerData.win);
			
			resultScoreTxt.text = gameSettings.currencyStr+addCommas(playerData.win);
		break;
	}
	
	if(targetContainer != null){
		targetContainer.visible = true;
		targetContainer.alpha = 0;
		TweenMax.to(targetContainer, .5, {alpha:1, overwrite:true});
	}
	
	resizeCanvas();
}

function togglePop(con){
	exitContainer.visible = con;
	
	if(con){
		TweenMax.pauseAll(true, true);
		gameData.paused = true;
	}else{
		TweenMax.resumeAll(true, true)
		gameData.paused = false;
	}
}

/*!
 * 
 * START GAME - This is the function that runs to start play game
 * 
 */

function startGame(){
	buttonReveal.visible = false;
	buttonBuycard.visible = true;
	
	playerData.credit = gameSettings.gameCredit;
	playerData.creditSum = gameSettings.gameCredit;
	playerData.paid = 0;
	playerData.win = 0;
	playerData.bet = 0;
	gameData.betNumber = 0;
	gameData.playing = false;
	
	gameData.paused = setGameLaunch();
	gameData.scratchCon = false;
	gameData.scratching = false;
	generateScratchCard(false);

	if(gameSettings.gameTimer == 0){
		txtTimer.visible = false;
	}else{
		txtTimer.visible = true;
	}
	
	//memberpayment
	if(typeof memberData != 'undefined' && memberSettings.enableMembership){
		playerData.credit = playerData.creditSum = memberData.point;
		if(!checkMemberGameType()){
			goMemberPage('user');
		}
	}
	
	toggleBetNumber('plus');
	toggleBetNumber();
	updateStats();
	
	toggleGameTimer(true);
}


 /*!
 * 
 * STOP GAME - This is the function that runs to stop play game
 * 
 */
function stopGame(){
	toggleGameTimer(false);
	TweenMax.killAll();
	stopSoundLoop('soundScratching');
}

/*!
 * 
 * SAVE GAME - This is the function that runs to save game
 * 
 */
function saveGame(score){
	if ( typeof toggleScoreboardSave == 'function' ) { 
		$.scoreData.score = score;
		if(typeof type != 'undefined'){
			$.scoreData.type = type;	
		}
		toggleScoreboardSave(true);
	}

	/*$.ajax({
      type: "POST",
      url: 'saveResults.php',
      data: {score:score},
      success: function (result) {
          console.log(result);
      }
    });*/
}

/*!
 * 
 * BUILD PAYTABLE - This is the function that runs to build paytable
 * 
 */
function buildPaytable(){
	var startX = canvasW/100 * 66;
	var startY = canvasH/100 * 29;
	var curX = startX;
	var curY = startY;
	var spaceX = 178;
	var spaceY = 61;
	
	gameData.prizeItemArray = [];
	
	for(var n=0; n<paytable_arr.length; n++){
		var icon = $.icon[paytable_arr[n].id].clone();
		icon.scaleX = icon.scaleY = .6;
		icon.x = curX;
		icon.y = curY;
		icon.visible = true;
		
		var totalTxt = new createjs.Text();
		totalTxt.font = "28px built_titlingbold";
		totalTxt.color = "#13528c";
		totalTxt.textAlign = "left";
		totalTxt.textBaseline='alphabetic';
		totalTxt.text = 'x'+paytable_arr[n].total;
		totalTxt.x = icon.x + 40;
		totalTxt.y = icon.y + 10;
		
		var prizeTxt = new createjs.Text();
		prizeTxt.font = "30px built_titlingbold";
		prizeTxt.color = "#fff";
		prizeTxt.textAlign = "right";
		prizeTxt.textBaseline='alphabetic';
		prizeTxt.text = gameSettings.currencyStr+addCommas(paytable_arr[n].point);
		prizeTxt.x = icon.x+180;
		prizeTxt.y = icon.y + 10;
		prizeTxt.point = paytable_arr[n].point;
		curY += spaceY;
		
		gameData.prizeItemArray.push(prizeTxt);
		prizeContainer.addChild(icon, totalTxt, prizeTxt);
	}
	
	if(gameSettings.enablePercentage){
		createPercentage();	
	}
}

/*!
 * 
 * PERCENTAGE - This is the function that runs to create result percentage
 * 
 */
function createPercentage(){
	gameData.percentageArray = [];
	
	for(var n=0; n<paytable_arr.length; n++){
		if(!isNaN(paytable_arr[n].percent)){
			if(paytable_arr[n].percent > 0){
				for(var p=0; p<paytable_arr[n].percent; p++){
					gameData.percentageArray.push(n);
				}
			}
		}
	}
	
	for(var n=gameData.percentageArray.length; n<100; n++){
		gameData.percentageArray.push(-1);
	}
}

function getResultOnPercent(){	
	shuffle(gameData.percentageArray);
	return gameData.percentageArray[0];
}

/*!
 * 
 * BUILD SCRATCHCARD - This is the function that runs to build scratchcard
 * 
 */
function buildScratchCard(){
	var startX = canvasW/100 * 24.4;
	var startY = canvasH/100 * 33;
	var curX = startX;
	var curY = startY;
	var spaceX = 178;
	var spaceY = 120;
	
	gameData.scratchItemArray = [];
	
	var itemCount = 0;
	var newRowCount = 3;
	for(var n=0; n<gameSettings.totalScratchItem; n++){
		var newScratchItem = new createjs.Bitmap(loader.getResult('itemScratch'+n));
		centerReg(newScratchItem);
		newScratchItem.x = curX;
		newScratchItem.y = curY;
		newScratchItem.visible = false;
		
		var newScratchBg = itemRevealBg.clone();
		newScratchBg.x = curX;
		newScratchBg.y = curY;
		newScratchBg.visible = true;
		
		curX+=spaceX;
		itemCount++;
		if(itemCount >= newRowCount){
			itemCount = 0;
			curX=startX;
			curY+=spaceY;
		}
		
		gameData.scratchItemArray.push(newScratchItem);	
		scratchBgContainer.addChild(newScratchBg, newScratchItem);
	}
}

/*!
 * 
 * UPDATE SCRATCH - This is the function that runs toupdate scratch
 * 
 */
function updateScratchBitmap(){
	scratchContainer.cache(0,0,canvasW,canvasH);
	
	var url = scratchContainer.cacheCanvas.toDataURL();
	//var url = scratchContainer.getCacheDataURL();
	var urlImg = new Image();
	urlImg.src = url;
	scratchContainer.uncache();
	
	bitmapContainer.visible = false;
	urlImg.onload = function() {
        var bitmap = new createjs.Bitmap(urlImg);
		bitmapContainer.removeAllChildren();
		bitmapContainer.addChild(bitmap);
		
		for(var n=0; n<gameData.scratcCardArray.length; n++){
			var curCont = gameData.scratcCardArray[n].card;
			checkScratchPercent(curCont.scratchNum);
		}
		
		checkScratchMatch();
    };
}

function checkScratchPercent(scratchNum){
	var curCont = gameData.scratcCardArray[scratchNum].card;
	
	var distanceX = 35//curCont.w/scratchStrokeNum;
	var distanceY = 25//curCont.h/scratchStrokeNum;
	var totalFill = 0;
	var currentFill = 0;
	
	for(var h=0; h<curCont.h; h+=distanceY){
		for(var w=0; w<curCont.w; w+=distanceX){
			totalFill+=1;
			
			var currentX = curCont.oriX + w;
			var currentY = curCont.oriY + h;
			if(bitmapContainer.hitTest(currentX, currentY)){
				currentFill += 1;
			}
		}	
	}
	
	var fillPercent = 100 - Math.floor((currentFill/totalFill)*100);
	//console.log(scratchNum+' '+currentFill+' '+totalFill+' '+fillPercent+'%')
	if(fillPercent >= 50){
		var drawing = gameData.scratcCardArray[scratchNum].art;
		drawing.graphics.beginFill("#cc0000").drawRect(curCont.oriX,curCont.oriY,curCont.w,curCont.h);
		curCont.updateCache("destination-out");
		drawing.graphics.clear();
		
		var scratchItem = gameData.scratchItemArray[scratchNum];
		if(!scratchItem.scratched){
			playSound('soundPing');
		}
		scratchItem.scratched = true;
	}
}

/*!
 * 
 * REVEAL ALL - This is the function that runs to reveal all
 * 
 */
function revealAll(){
	playSound('soundScratch');

	var strokePosition = [{x:287,y:236},
						{x:261,y:380},
						{x:532,y:220},
						{x:248,y:533},
						{x:730,y:223},
						{x:485,y:500},
						{x:724,y:363},
						{x:671,y:515}];
	
	gameData.oldX = itemStroke.x = strokePosition[0].x;
	gameData.oldY = itemStroke.y = strokePosition[0].y;
							
	TweenMax.to(itemStroke, 1, {bezier:{type:"thru", values:strokePosition, curviness:0, autoRotate:false}, ease:Linear.easeNone, overwrite:true, onUpdate:revealUpdate, onComplete:function(){
		for(var n=0; n<gameData.scratcCardArray.length; n++){
			var curCont = gameData.scratcCardArray[n].card;
			
			var drawing = gameData.scratcCardArray[n].art;
			drawing.graphics.beginFill("#cc0000").drawRect(curCont.oriX,curCont.oriY,curCont.w,curCont.h);
			curCont.updateCache("destination-out");
			drawing.graphics.clear();
			
			var scratchItem = gameData.scratchItemArray[n];
			scratchItem.scratched = true;
		}
		
		checkScratchMatch();	
	}});
}

function revealUpdate(){
	for(var n=0; n<gameData.scratcCardArray.length; n++){
		var curCont = gameData.scratcCardArray[n].card;
		var curArt = gameData.scratcCardArray[n].art;
		curArt.graphics.ss(80,1).s('#ccff00').mt(gameData.oldX,gameData.oldY).lt(itemStroke.x, itemStroke.y);
		curCont.updateCache("destination-out");
		curArt.graphics.clear();
	}
	
	gameData.oldX = itemStroke.x;
	gameData.oldY = itemStroke.y;	
}/*!
 * 
 * GAME TIMER - This is the function that runs for game timer
 * 
 */
var gameTimerInterval = null;
var gameTimerUpdate = false;
var nowDate;
var beforeDate;

function toggleGameTimer(con){
	if(gameSettings.gameTimer == 0){
		return;
	}

	playerData.timer = 0;
	updateTimer();
		
	if(con){
		beforeDate = new Date();
	}
	gameTimerUpdate = con;
}

 /*!
 * 
 * GAME LOOP - This is the function that runs to loop game
 * 
 */
function updateGame(){
	if(gameTimerUpdate){
		nowDate = new Date();
		var elapsedTime = (nowDate.getTime() - beforeDate.getTime());
		playerData.timer = (Number(gameSettings.gameTimer) - elapsedTime);
		
		if(playerData.timer <= 0){
			playerData.timer = 0;

			//memberpayment
			if(typeof memberData != 'undefined' && memberSettings.enableMembership){
				if(!gameData.playing){
					goPage('result');
				}
			}else{
				goPage('result');
			}
		}

		updateTimer();
	}
}

 /*!
 * 
 * UPDATE GAME TIMER - This is the function that runs to update game timer
 * 
 */
function updateTimer(){
	txtTimer.text = millisecondsToTimeGame(playerData.timer);	
}

/*!
 * 
 * START BET - This is the function that runs to start bet
 * 
 */
function validateBet(){
	if(gameData.betNumber > 0){
		//memberpayment
		if(typeof memberData != 'undefined' && memberSettings.enableMembership && !memberData.ready){
			return;
		}
		
		playSound('soundCard');
		playerData.paid += playerData.newBet;
		buttonReveal.visible = true;
		buttonBuycard.visible = false;
		buttonPlus.visible = buttonMinus.visible = false;
		updateStats();
		
		gameData.fixedIcons = [];
		//memberpayment
		if(typeof memberData != 'undefined' && memberSettings.enableMembership){
			getUserResult("proceedValidateBet", playerData.newBet);
			//updateUserPoint("proceedValidateBet");
		}else{
			proceedValidateBet();
		}
	}
}

function proceedValidateBet(result){
	if(result != undefined){
		gameData.fixedIcons = result.icons;
	}
	gameData.playing = true;
	gameData.scratchCon = true;
	generateScratchCard(true);
}

function generateScratchCard(con){
	gameData.scratcCardArray = [];
	scratchLogoContainer.removeAllChildren();
	scratchContainer.removeAllChildren();
	
	gameData.iconListArray = [];
	var payIndex = -1;
	var totalPerIcon = 3;
	
	if(gameSettings.enablePercentage){
		payIndex = getResultOnPercent(); 
		totalPerIcon = 2;	
	}
	
	for(var n=0; n<icon_arr.length; n++){
		for(var t=0; t<totalPerIcon; t++){
			if(payIndex != -1){
				if(paytable_arr[payIndex].id != n){
					gameData.iconListArray.push(n);
				}
			}else{
				gameData.iconListArray.push(n);
			}
		}
	}
	
	if(gameSettings.enablePercentage){
		shuffle(gameData.iconListArray);
		gameData.iconListArray.length = Math.min(gameData.iconListArray.length, gameSettings.totalScratchItem);
		
		if(payIndex != -1){
			for(var n=0; n<paytable_arr[payIndex].total; n++){
				gameData.iconListArray[n] = paytable_arr[payIndex].id;
			}
		}
	}
	shuffle(gameData.iconListArray);

	if(gameData.fixedIcons.length > 0){
		gameData.iconListArray = gameData.fixedIcons;
	}
	
	for(var n=0; n<gameSettings.totalScratchItem; n++){
		var scratchItem = gameData.scratchItemArray[n];
		scratchItem.scratched = false;
		createScratchEffect(scratchItem, scratchItem.x, scratchItem.y, 179, 121);
		
		if(con){
			var randomIconNum = gameData.iconListArray[n];//Math.floor(Math.random()*icon_arr.length);
			scratchItem.iconNum = randomIconNum;
			var itemIcon = $.icon[randomIconNum].clone();
			itemIcon.visible = true;
			itemIcon.x = scratchItem.x;
			itemIcon.y = scratchItem.y;
			
			scratchItem.iconObj = itemIcon;
			scratchLogoContainer.addChild(itemIcon);
		}
	}
	
	gameData.fixedIcons = [];
	itemShine.x = 770;
	TweenMax.to(itemShine, .5, {x:-130, overwrite:true});
}

function createScratchEffect(obj,x,y,w,h){
	var testImg = obj.clone();
	testImg.visible = true;
	
	var cont = new createjs.Container();
	cont.scratchNum = gameData.scratcCardArray.length;
	cont.w = w;
	cont.h = h;
	cont.oriX = x-(w/2);
	cont.oriY = y-(h/2);
	var art = new createjs.Shape();

	cont.cache(cont.oriX,cont.oriY,w,h);
	cont.addChild(testImg, art);
	scratchContainer.addChild(cont);
	
	cont.updateCache("source-over");
	cont.removeChild(testImg);
	
	gameData.scratcCardArray.push({card:cont, art:art});
}

function checkScratchMatch(){
	if(!gameData.scratchCon){
		return;
	}
	
	var winAmount = 0;
	for(var n=0; n<paytable_arr.length; n++){
		var totalIconNum = 0;
		var scratchIndex = [];
		
		for(var c=0; c<gameData.scratchItemArray.length; c++){
			var scratchItem = gameData.scratchItemArray[c];
			if(scratchItem.iconNum == paytable_arr[n].id && scratchItem.scratched){
				scratchIndex.push(c);
				totalIconNum++;
			}
		}
		
		if(totalIconNum >= paytable_arr[n].total){
			playSound('soundMatch');
			for(var c=0; c<scratchIndex.length; c++){
				var scratchItem = gameData.scratchItemArray[scratchIndex[c]];
				startAnimateIcon(scratchItem.iconObj);
			}
			winAmount += Number(gameData.prizeItemArray[n].point);
		}
	}
	
	var totalScratchNum = 0;
	for(var n=0; n<gameData.scratcCardArray.length; n++){
		var scratchItem = gameData.scratchItemArray[n];
		if(scratchItem.scratched){
			totalScratchNum++;
		}
	}
	
	if(totalScratchNum == gameSettings.totalScratchItem){
		gameData.scratchCon = false;
		cardComplete(winAmount);
	}
}

function cardComplete(winRemain){
	buttonReveal.visible = false;
	buttonBuycard.visible = true;
	buttonPlus.visible = buttonMinus.visible = true;
	
	playerData.credit += winRemain;
	playerData.win += winRemain;
	playerData.credit -= playerData.newBet;
	
	if(winRemain == 0){
		playSound('soundFail');
	}else{
		playSound('soundWin');	
	}
	
	gameData.playing = false;
	playerData.bet = 0;
	playerData.creditSum = playerData.credit - playerData.newBet;
	
	updateBetNumber();
	updateStats();
	
	//memberpayment
	if(typeof memberData != 'undefined' && memberSettings.enableMembership){
		var returnPoint = {chance:0, point:playerData.credit, score:0};
		matchUserResult(undefined, returnPoint);
	}
	
	if(playerData.credit <= 0){
		TweenMax.to(gameContainer, 3, {alpha:1, overwrite:true, onComplete:function(){
			goPage('result');
		}});
	}
}

/*!
 * 
 * ADD/DEDUCT BET NUMBER - This is the function that runs to add or deduct bet number
 * 
 */
var betNumberInterval = null;
var betNumberTimer = 0;
var betNumberTimerMax = 300;
var betNumberTimerMin = 10;

function toggleBetNumber(con){
	if(gameData.scratchCon){
		return;	
	}
	
	if(con == 'plus'){
		gameData.betNumberPlus = 1;
	}else if(con == 'minus'){
		gameData.betNumberPlus = -(1);
	}else{
		gameData.betNumberPlus = 0;	
	}
	
	if(con != undefined){
		betNumberTimer = betNumberTimerMax;
		loopBetNumber();
	}else{
		clearInterval(betNumberInterval);	
		betNumberInterval = null;
	}
}

function loopBetNumber(){
	clearInterval(betNumberInterval);
	betNumberInterval = setInterval(loopBetNumber, betNumberTimer);
	betNumberTimer-=100;
	betNumberTimer=betNumberTimer<betNumberTimerMin?betNumberTimerMin:betNumberTimer;
	
	updateBetNumber();
}

function updateBetNumber(){
	var availableCredit = playerData.credit - playerData.bet;
	gameData.betNumber += gameData.betNumberPlus;

	
	gameData.betNumber = gameData.betNumber <= 0 ? 0 : gameData.betNumber;
	gameData.betNumber = gameData.betNumber >= availableCredit ? availableCredit : gameData.betNumber;
	gameData.betNumber = gameData.betNumber >= gameSettings.maximumBet ? gameSettings.maximumBet : gameData.betNumber;
	
	playerData.newBet = playerData.bet + gameData.betNumber;
	playerData.creditSum = playerData.credit - playerData.newBet;
	
	updateStats();
}

function updateStats(){
	for(var n=0; n<paytable_arr.length; n++){
		var curBetNumber = gameData.betNumber <= 0 ? 1 : gameData.betNumber;
		var prizeTxt = gameData.prizeItemArray[n];
		prizeTxt.point = paytable_arr[n].point * curBetNumber;
		prizeTxt.text = gameSettings.currencyStr+addCommas(paytable_arr[n].point * curBetNumber);
	}	
	
	txtBalance.text = gameSettings.currencyStr+addCommas(playerData.creditSum);
	txtPaid.text = gameSettings.currencyStr+addCommas(playerData.paid);
	txtWin.text = gameSettings.currencyStr+addCommas(playerData.win);
	txtStake.text = gameSettings.currencyStr+addCommas(gameData.betNumber);	
}

/*!
 * 
 * SETUP STAGE EVENTS - This is the function that runs to setup events
 * 
 */
function setupStageEvents(){
	stage.on("stagemousedown", startScratch);
	stage.on("stagemousemove", moveScratch);
	stage.on("stagemouseup", endScratch);
}

function startScratch(evt) {
	if(gameData.scratchCon){
		gameData.oldX = (evt.stageX/dpr)-0.001;
		gameData.oldY = (evt.stageY/dpr)-0.001;
		gameData.scratching = true;
		moveScratch(evt);
	}
}

function moveScratch(evt) {
	if(gameData.scratching){
		playSoundLoop('soundScratching');
		for(var n=0; n<gameData.scratcCardArray.length; n++){
			var curCont = gameData.scratcCardArray[n].card;
			var curArt = gameData.scratcCardArray[n].art;
			curArt.graphics.ss(gameSettings.scratchStrokeNum,1).s('#ccff00').mt(gameData.oldX,gameData.oldY).lt(evt.stageX/dpr, evt.stageY/dpr);
			curCont.updateCache("destination-out");
			curArt.graphics.clear();
		}
		
		gameData.oldX = evt.stageX/dpr;
		gameData.oldY = evt.stageY/dpr;
	}
}

function endScratch(evt) {
	if(gameData.scratching){
		stopSoundLoop('soundScratching');
		updateScratchBitmap();
		gameData.scratching = false;
	}
}

/*!
 * 
 * START ANIMATE BUTTON - This is the function that runs to play blinking animation
 * 
 */
function startAnimateIcon(obj){
	TweenMax.to(obj, .2, {alpha:.7, overwrite:true, onComplete:function(){
		TweenMax.to(obj, .2, {alpha:1, overwrite:true, onComplete:function(){
			startAnimateIcon(obj);
		}});	
	}});
}

/*!
 * 
 * STOP ANIMATE BUTTON - This is the function that runs to stop blinking animation
 * 
 */
function stopAnimateIcon(obj){
	TweenMax.killTweensOf(obj);
	obj.alpha = 1;
}



/*!
 * 
 * OPTIONS - This is the function that runs to toggle options
 * 
 */

function toggleOptions(con){
	if(optionsContainer.visible){
		optionsContainer.visible = false;
	}else{
		optionsContainer.visible = true;
	}
	if(con!=undefined){
		optionsContainer.visible = con;
	}
}

/*!
 * 
 * OPTIONS - This is the function that runs to mute and fullscreen
 * 
 */
function toggleSoundMute(con){
	buttonSoundOff.visible = false;
	buttonSoundOn.visible = false;
	toggleSoundInMute(con);
	if(con){
		buttonSoundOn.visible = true;
	}else{
		buttonSoundOff.visible = true;	
	}
}

function toggleMusicMute(con){
	buttonMusicOff.visible = false;
	buttonMusicOn.visible = false;
	toggleMusicInMute(con);
	if(con){
		buttonMusicOn.visible = true;
	}else{
		buttonMusicOff.visible = true;	
	}
}

function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}


/*!
 * 
 * SHARE - This is the function that runs to open share url
 * 
 */
function shareLinks(action, shareScore){
	if(shareSettings.gtag){
		gtag('event','click',{'event_category':'share','event_label':action});
	}

	var gameURL = location.href;
	gameURL = encodeURIComponent(gameURL.substring(0,gameURL.lastIndexOf("/") + 1));

	var shareTitle = shareSettings.shareTitle.replace("[SCORE]", shareScore);
	var shareText = shareSettings.shareText.replace("[SCORE]", shareScore);	

	var shareURL = '';
	if( action == 'facebook' ){
		if(shareSettings.customScore){
			gameURL = decodeURIComponent(gameURL);
			shareURL = `https://www.facebook.com/sharer/sharer.php?u=`+encodeURIComponent(`${gameURL}share.php?title=${shareTitle}&url=${gameURL}&thumb=${gameURL}share.jpg`);
		}else{
			shareURL = `https://www.facebook.com/sharer/sharer.php?u=${gameURL}`;
		}
	}else if( action == 'twitter' ){
		shareURL = `https://twitter.com/intent/tweet?text=${shareText}&url=${gameURL}`;
	}else if( action == 'whatsapp' ){
		shareURL = `https://api.whatsapp.com/send?text=${shareText}%20${gameURL}`;
	}else if( action == 'telegram' ){
		shareURL = `https://t.me/share/url?url=${gameURL}&text=${shareText}`;
	}else if( action == 'reddit' ){
		shareURL = `https://www.reddit.com/submit?url=${gameURL}&title=${shareText}`;
	}else if( action == 'linkedin' ){
		shareURL = `https://www.linkedin.com/sharing/share-offsite/?url=${gameURL}`;
	}

	window.open(shareURL);
}