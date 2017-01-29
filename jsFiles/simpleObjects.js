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
        
        this.controlPanelTop = 60;
        this.controlPanelLeft = 434;
        this.lightArrayTop = 100;
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
        
    
        this.workerImage = new Image();
        this.workerImage.src = "imageFiles/WorkerImage3.png";
        
        
        this.temperatureBarImage = new Image();
        this.temperatureBarImage.src = "imageFiles/TempGradient.png";
        
        
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
        this.controlPanelImage.src = "imageFiles/READOUTBOARD.png";
        
        this.chevronImages = [];
        this.chevronImages[0] = new Image ();
        this.chevronImages[1] = new Image ();
        this.chevronImages[2] = new Image ();
        this.chevronImages[0].src = "imageFiles/HeatChevron2.png";
        this.chevronImages[1].src = "imageFiles/HeatChevron3.png";
        this.chevronImages[2].src = "imageFiles/HeatChevron1.png";
        this.newChevrons = [];

        this.backGroundImage = [];
        this.backGroundImage[0] = new Image();
        this.backGroundImage[0].src = "imageFiles/STATIC-BACKGROUND-NOSUN.png";
        this.backGroundImage[1] = new Image();
        this.backGroundImage[1].src = "imageFiles/STATIC-BACKGROUND.png";
        this.altLabel = "";
     };
     
screenObject.prototype.updateChevrons = function(temp)
{
    var offScreenCanvas = document.getElementById('offScreenCanvas');
    var offScreenContext = offScreenCanvas.getContext('2d');  
    var chevOld = [];
    
    var chevBase = [255, 20, 0, 255, 0, 20, 255, 106, 0];
    var chevMid = [200, 80, 125, 255, 0, 110, 255, 130, 230];
    var chevEnd = [157, 21, 255, 160, 0, 200, 40, 106, 235];
    
    var reds = [];
    var greens = [];
    var blues = [];
    
    if(temp>.40)
    {
        range = 1-(temp-.40)/.57;
        for (icolor=0; icolor<3;icolor++)
        {
            ci = icolor*3;
            reds[icolor] = chevBase[ci]-(chevBase[ci]-chevMid[ci])*range;
            greens[icolor] = chevBase[ci+1]-(chevBase[ci+1]-chevMid[ci+1])*range;
            blues[icolor] = chevBase[ci+2]-(chevBase[ci+2]-chevMid[ci+2])*range;
        }
    }
    else
    {
    range = 1-(temp-.10)/.30;
        for (icolor=0; icolor<3;icolor++)
        {
            ci = icolor*3;
            reds[icolor] = chevMid[ci]-(chevMid[ci]-chevEnd[ci])*range;
            greens[icolor] = chevMid[ci+1]-(chevMid[ci+1]-chevEnd[ci+1])*range;
            blues[icolor] = chevMid[ci+2]-(chevMid[ci+2]-chevEnd[ci+2])*range;
        }
    }
        
        
        
    for(var k = 0; k<3; k++)
    {
        offScreenContext.drawImage(this.chevronImages[k],0,0,10,10);  
        chevOld[k] = offScreenContext.getImageData(0,0,10,10);
        offScreenContext.clearRect(0,0,20,20);

        for (var i=0;i<this.newChevrons[k].data.length;i+=4)
            {
                if(chevOld[k].data[i]>200)
                {
                    this.newChevrons[k].data[i+0]=reds[k];
                    this.newChevrons[k].data[i+1]=greens[k];
                    this.newChevrons[k].data[i+2]=blues[k];
                    this.newChevrons[k].data[i+3]=255;
                    //console.log("Old#"+k+":  "+chevOld[k].data[i]+" "+chevOld[k].data[i+1]+" "+chevOld[k].data[i+2]);
                    //console.log("New:"+temp+"%  "+this.newChevrons[k].data[i]+" "+this.newChevrons[k].data[i+1]+" "+this.newChevrons[k].data[i+2]);
                }
                else
                {
                    this.newChevrons[k].data[i+0]=0;
                    this.newChevrons[k].data[i+1]=0;
                    this.newChevrons[k].data[i+2]=125;
                    this.newChevrons[k].data[i+3]=125;
                    
                }
            }
        }
};
screenObject.prototype.setMaxSpeed = function(percent)
{
    //console.log("%"+percent);
    var factor = 1+percent/100;
    
    this.bladeMaxSpeed = (percent * Math.PI *factor*factor*factor)/60000;
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
    //this.passcode = 0;
    this.passcode = 4;
    this.displayRightFlag = false;
    this.showInsulation = false;
    this.animationFlag = false;
    this.connectFlag = true;
    this.pickerIndicator = 0;
    this.genPercent = 0;
};

 


            
