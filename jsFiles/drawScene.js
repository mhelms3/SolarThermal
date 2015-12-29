/* 
 * Copyright CEISMC, 2015
 */
function initialScreen (context, screen)
{
    var logoImage = new Image();
    logoImage.src = "imageFiles/logoImage.png";
       context.save();  
          context.lineWidth = 10;
          context.strokeRect(5,5,screen.boxWidth-5,screen.boxHeight-5);
          //context.fillStyle = "rgba(0,0,255,1)";
          context.fillStyle = "rgba(207,181,59,1)";
          context.fillRect(10, 10, screen.boxWidth-15, screen.boxHeight-15);
          logoImage.addEventListener("load", function() {
            context.drawImage(logoImage, 240, 100, 200, 100);      
          }, false);
          
          context.font = '12pt Calibri';
          context.fillStyle = 'white';
          context.fillText("Welcome to the Solar Thermal Challenge", 200, 350);
          context.fillText("brought to you by CEISMC at Georgia Tech", 200, 365);
          context.fillText("Click on a button below to begin.", 200, 390);
          context.fillStyle = 'blue';
          
          context.fillText("*TEST ONLY* To unlock all of the buttons below, enter passcode 'five' *TEST ONLY*", 100, 420);
          context.fillText("     The passcode will change, and this message will go away when we go live.", 100, 435);
  context.restore();
 }
 
 function drawPowerBoard(context, screen)
 {
     context.save();
        context.drawImage(screen.controlPanelImage, screen.lightArrayLeft-15, screen.lightArrayTop-35, 245, 335);
        context.fillStyle = "#00BD5C";
        context.font = "20px Rockwell";
        context.fillText("Houses Powered", screen.lightArrayLeft+35, screen.lightArrayTop-5);
        context.fillStyle = "#003313";
        context.fillText("Houses Powered", screen.lightArrayLeft+34, screen.lightArrayTop-4);
     context.restore();
 }
 
 function drawBackground(context, screen, myFlags)
{
    var imageNumber;
    context.save();
        context.fillStyle = "lightblue";
        context.fillRect(10, 10, screen.boxWidth-15, screen.boxHeight-15);
        if (myFlags.showInsulation)
            imageNumber = 1;
        else
            imageNumber = 0;
        context.drawImage(screen.backGroundImage[imageNumber], 10, 10, screen.boxWidth-15, screen.boxHeight-15);  
        manageBlades(context, screen);
        drawPowerBoard(context, screen);
    context.restore();
}


function initHouses(context, screen)
{
    for(i=0; i<screen.columns; i++)
        for(j=0; j<screen.rows; j++)
        {
           lightBulb (context, screen, i,j, "off");
        }
}




function lightBulb(context, screen, row, column, state)
{
 
    var sparkRandom;
    var size = screen.lightBulbSize;
    var spacing = screen.lightBulbSpacing;
    context.save();
    context.globalCompositeOperation="source-over";
        if (state == "on")
            drawLightBulb(screen.houseLightImage);
        else if (state == "off")
            drawLightBulb(screen.houseDarkImage);
        else if (state == "mid")
            drawLightBulb(screen.houseFlickerImage);
        else
        {
            sparkRandom = Math.random();
            if (sparkRandom < .33)
                drawLightBulb(screen.houseLightImage);
            else if (sparkRandom < .66)
                drawLightBulb(screen.houseDarkImage);
            else
                drawLightBulb(screen.houseFlickerImage);
        }
    context.restore();
    
    function drawLightBulb (image)
    {   
        context.drawImage(image, screen.lightArrayLeft+(row*spacing), screen.lightArrayTop+(column*spacing), size, size);  
    }
}

function manageChevrons(context, screen, timeSteps)
{
    var thisImageMod = timeSteps%3;
    var chevronPosX = 0;
    var chevronImageSelect;
    
    if(screen.chevronCount<21)
        screen.chevronCount += 3;
    
    for (i=0; i<screen.chevronCount; i++)
    {
        chevronPosX = 9*i+120;
        chevronImageSelect = (i+(3-thisImageMod))%3;
        context.drawImage(screen.chevronImages[chevronImageSelect], chevronPosX, 373, 10, 10);
    }
}


function manageBlades(context, screen)
{
    screen.calculateBladeSpeed();
    screen.calculateBladeRotation();
    //console.log(screen.bladeSpeed, screen.bladeRotation);
    var bladeOffset = Math.floor(screen.bladeSize/2);
    context.save();
        context.globalAlpha = .21;
        context.drawImage(screen.bladeBackground, 310,280, 113, 110);
        context.translate(screen.bladePosX+bladeOffset, screen.bladePosY+bladeOffset);
        context.rotate(screen.bladeRotation);
        context.globalAlpha = 1;
        context.drawImage(screen.bladeImage, -bladeOffset,-bladeOffset, screen.bladeSize, screen.bladeSize);
    context.restore();
}

function animateFinal(context, screen, percent, count, insulation, myFlags)
{
    if(myFlags.showInsulation)
            manageChevrons(context, screen, count);
    manageBlades(context, screen);
    count++;
    if(count>10000)
        count = 0;

    if (myFlags.animationFlag)
        setTimeout(function()
        {
            animateFinal(context, screen, percent, count, insulation, myFlags);
        }, screen.delay);
        
}

function animateHouse(context, screen, percent, count, column, insulation, myFlags)
{   
    
    var rowCount = 10;

    if(column===0)
    {
        if(myFlags.showInsulation)
            manageChevrons(context, screen, count);
        manageBlades(context, screen);
    }
     
    if(myFlags.animationFlag)
    {
        setTimeout(function()
        {
            var countTotal = column * rowCount + count;
            for (kfor = count; kfor <rowCount; kfor++)
            {
                if (countTotal<percent && kfor == count)
                    lightBulb(context, screen, kfor, column, "on");
                else if (countTotal>=percent && kfor == count)    
                    lightBulb(context, screen, kfor, column, "off");
                else if (countTotal<percent && kfor == count+1)
                    lightBulb(context, screen, kfor, column, "mid");
                else
                    lightBulb(context, screen, kfor, column, "rand");
            }

            count++;
            if (count < rowCount)
                animateHouse(context, screen, percent, count, column, insulation, myFlags);
            else
                animateFinal(context, screen, percent, count, insulation, myFlags);
        }, screen.delay);
    }
}



function beginAnimation (context, screen, timeSteps, percent, insulation, myFlags)
{
    var timeMax = 40;
    var sparkRandom;
    if(myFlags.animationFlag)
    {
        setTimeout(function()
        {

            if(myFlags.showInsulation)
                manageChevrons(context, screen, timeSteps);
            manageBlades(context, screen);
            drawPowerBoard(context, screen)
            if (timeSteps<timeMax-1)
                displayPercent(context, myFlags.genPercent, true);
            else
                displayPercent(context, myFlags.genPercent, false);
            for(i=0; i<10; i++)
                for(j=0; j<12; j++)
                {
                    lightBulb(context, screen, i, j, "rand");
                }
                timeSteps+=1;

                if (timeSteps<timeMax)
                    beginAnimation(context, screen, timeSteps, percent, insulation, myFlags);
                else
                {
                    for (ifor=0; ifor< 12; ifor++)
                        animateHouse(context, screen, percent, 0, ifor, insulation, myFlags);
                }
        }, screen.delay);
    }
}


function powerHouses(context, screen, percent, insulation, myFlags)
{   
    screen.setMaxSpeed(percent);
    beginAnimation(context, screen, 0, percent, insulation, myFlags);
}

 function drawSceneOne (context, screen, myFlags)
 {
     var blur=1;
     context.save();
        context.lineWidth = 10;
        context.strokeRect(5,5,screen.boxWidth-5,screen.boxHeight-5);
        context.fillStyle = "rgba(255,255,255,"+blur+")"; //defines fade out for motion blur
        drawBackground(context, screen, myFlags);
        initHouses(context, screen);
     context.restore();
     
 }

