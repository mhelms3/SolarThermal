/* 
 * Copyright CEISMC, 2015
 */

var screenObject = function(bh, bw){
        this.boxHeight = bh;
        this.boxWidth = bw;
        this.yArcEdge = 0;
        this.xArcEdge = 0;
        
        this.rows = 12;
        this.columns = 10;
        this.houses = 120;
        
        this.delay = 50;
        
        this.lightArrayTop = 150;
        this.lightArrayLeft = 450;
        this.lightBulbSize = 18;
        this.lightBulbSpacing = 22;
        
        this.bladePosX = 331;
        this.bladePosY = 306;
        this.bladeRotation = 0;
        this.bladeSpeed = 0;
        this.bladeSize = 70;
        this.bladeMaxSpeed = 0;
        
        this.chevronCount = 0;
        
        this.houseDarkImage = new Image();
        //this.houseDarkImage.src = "imageFiles/LED-OFF3.png";
        //this.houseDarkImage.src = "imageFiles/ButtonGreenOff.png";
        this.houseDarkImage.src = "imageFiles/HouseGray.png";
        
        this.houseLightImage = new Image();
        //this.houseLightImage.src = "imageFiles/LED-ON3.png";
        //this.houseLightImage.src = "imageFiles/ButtonGreen.png";
        this.houseLightImage.src = "imageFiles/HouseGreen.png";
        
        this.houseFlickerImage = new Image();
        //this.houseFlickerImage.src = "imageFiles/LED-OFF3.png";
        //this.houseFlickerImage.src = "imageFiles/ButtonYellow.png";
        this.houseFlickerImage.src = "imageFiles/HouseYellow.png";
        
        this.bladeImage = new Image();
        this.bladeImage.src = "imageFiles/FANBLADES_4.png";
        this.bladeBackground = new Image();
        this.bladeBackground.src = "imageFiles/BLADE_BACKGROUND.png";
        
        
        
        this.controlPanelImage = new Image();
        this.controlPanelImage.src = "imageFiles/READOUTBOARD.png"
        
        this.chevronImages = []
        this.chevronImages[0] = new Image ();
        this.chevronImages[1] = new Image ();
        this.chevronImages[2] = new Image ();
        this.chevronImages[0].src = "imageFiles/HeatChevron2.png";
        this.chevronImages[1].src = "imageFiles/HeatChevron3.png";
        this.chevronImages[2].src = "imageFiles/HeatChevron1.png";
        
                
        this.backGroundImage = [];
        this.backGroundImage[0] = new Image();
        this.backGroundImage[0].src = "imageFiles/STATIC-BACKGROUND-NOSUN.png";
        this.backGroundImage[1] = new Image();
        this.backGroundImage[1].src = "imageFiles/STATIC-BACKGROUND.png";

        
        this.altLabel = "";
     };
     
screenObject.prototype.setMaxSpeed = function(percent)
{
    this.bladeMaxSpeed = (percent * Math.PI *2)/10000;
};

screenObject.prototype.clearChevrons = function()
{
    this.chevronCount = 0;
};   

screenObject.prototype.calculateBladeSpeed = function()
{
    this.bladeSpeed += 1/3600 * (Math.PI * 2);
    if (this.bladeSpeed > this.bladeMaxSpeed)
        this.bladeSpeed = this.bladeMaxSpeed;
};

screenObject.prototype.calculateBladeRotation = function()
{
    this.bladeRotation += this.bladeSpeed;
    if (this.bladeRotation > (Math.PI * 2))
        this.bladeRotation -= (Math.PI * 2);      
};

screenObject.prototype.resetBlades = function()
{
  this.bladeRotation = 0;
  this.bladeSpeed = 0;
  this.maxBladeSpeed = 0;
};

var flags = function(){
    this.passcode = 0;
    this.displayRightFlag = false;
    this.showInsulation = false;
    this.animationFlag = false;
    this.connectFlag = true;
    this.pickerIndicator = 0;
    this.genPercent = 0;
};

 


            
