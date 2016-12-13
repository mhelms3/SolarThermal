/* 
 * Copyright CEISMC, 2015
 */


var insulation = function(context){
    
    ///need to account for a choice of "0" thickness -- currently screwing up, pipe graphics and insulation color, and maybe calculations
    this.insulationNames = [];
    this.cost = [];
    this.R_value = [];
    this.linearStop = [];
    this.choice = 0;
    this.thickness = 0;
    this.currentVolume = 0;
    this.pipeDiameter = 12;
    this.colors = ["Brown", "ForestGreen", "Sienna", "#AB694F", "DarkRed", "HotPink", "LightGray", "DeepSkyBlue"];
    
    this.insulationPosX = 120;
    this.insulationPosY1 = 370;
    this.insulationPosY2 = 380;
    this.insulationLength = 210;
    
    //for accessing insulation context canvas
    this.insulationContext = context;
};

insulation.prototype.initNames = function()
{
    var opt = document.getElementById('insulationPicker');
    var listLength = opt.length;
    
    for(i=0; i<listLength; i++)
    {
        this.insulationNames.push(opt.options[i].text);
    }
};    

insulation.prototype.initCosts = function()
{
    this.cost[0] = [0.000, 0.000, 0.00, 0.00, 0.0, 0.0, 0, 0.0];
    this.cost[1] = [0.001, 0.003, 0.01, 0.03, 0.4, 0.7, 2.2, 14.0];
    this.cost[2] = [0.002, 0.004, 0.02, 0.04, 0.5, 0.8, 2.3, 14.1];
    this.cost[3] = [0.003, 0.005, 0.03, 0.05, 0.6, 0.9, 2.4, 14.2];
    this.cost[4] = [0.004, 0.006, 0.04, 0.06, 0.7, 1.0, 2.5, 14.3]; 
    this.cost[5] = [0.005, 0.007, 0.05, 0.07, 0.8, 1.1, 2.6, 14.4]; 
};    
 
 //("Mud", "Hay/Grass", "Wood", "Adobe", "Brick", "Fiberglass", "Vacuum Panels", "Aerogels");
insulation.prototype.initR_values = function()
{
    this.R_value = [0.035,0.0125,0.025,0.06,0.0475,0.1,0.1475,0.172];
    //this.linearStop = [8,8,7,8,7,6,5,3];
    //this was changed to make Aeorgels linear at 1 through 5 (previously it was linear at 1 -3)
    //maybe should change R-value of Aeorgels so that it doesn't cap out so fast.
    
    //this.linearStop = [8,8,7,8,7,6,5,5];
    this.linearStop = [10,10,10,10,10,10,10,10]; //changed 12-13-16 to make all progressions linear
};

insulation.prototype.getChoice = function()
{
    console.log("Insulation Choice="+this.choice+" Thickness="+this.thickness);
    this.choice =  document.getElementById('insulationPicker').value;
};  

insulation.prototype.getThickness = function(thicknessOpt)
{
    
    console.log("Insulation Choice="+this.choice+" Thickness="+this.thickness);
    
    if (thicknessOpt>0)
    {
        var picker = 'thicknessPicker'+thicknessOpt;
        this.thickness =  document.getElementById(picker).value;
    }
    else
        this.thickness =  0;
};  

insulation.prototype.getName = function()
{
    //return(this.insulationNames[this.choice-1]);
    return(this.insulationNames[this.choice]);
};

insulation.prototype.getR = function()
{
    //return(this.R_value[this.choice-1]);
    return(this.R_value[this.choice]);
};
insulation.prototype.getLinearStop = function()
{
    //return(this.linearStop[this.choice-1]);
    return(this.linearStop[this.choice]);
};

insulation.prototype.calculateHeatRetained = function()
{
    var nonLinearThickness = this.thickness - this.linearStop[this.choice-1];
    var linearHeatRetained = 0;
    var nonLinearHeatRetained = 0;
    var heatRetained = 0;
    if (nonLinearThickness>0)
    {
        //Math.e
        var factor = (1-(1/(Math.pow(2,nonLinearThickness))));
        //linearHeatRetained = this.linearStop[this.choice-1] * this.R_value[this.choice-1];
        //nonLinearHeatRetained = this.R_value[this.choice-1] * factor;
        linearHeatRetained = this.linearStop[this.choice] * this.R_value[this.choice];
        nonLinearHeatRetained = this.R_value[this.choice] * factor;
    }
    else
    {
        //linearHeatRetained = this.thickness * this.R_value[this.choice-1];
        linearHeatRetained = this.thickness * this.R_value[this.choice];
        nonLinearHeatRetained = 0;
    }
    //console.log(this.thickness, nonLinearThickness, this.R_value[this.choice-1], linearHeatRetained, nonLinearHeatRetained, factor);
    heatRetained = 0.1 + linearHeatRetained + nonLinearHeatRetained; 
    
    
    //THIS CAPS HEAT RETAINED AT 100% -- nothing should really reach this, but this was added because of the changes to make everything linear for 1-5" of insulation.
    if (heatRetained>1)
    {
        console.log("Heat retained greater than 100%: " + heatRetained);
        heatRetained = 1;
    }
        
    return(heatRetained);
    
};



insulation.prototype.calculateVolume = function(pickerIndicator)
{
    var volume = 0;
    var voidVolume = calcCircleArea(this.pipeDiameter);
    this.getThickness(pickerIndicator);
    var insulationDiameter = (this.pipeDiameter + parseInt(this.thickness));
    var fillVolume = calcCircleArea(insulationDiameter);
    this.currentVolume = (fillVolume - voidVolume) * 12000/1728;

};

insulation.prototype.drawInsulation = function(context)
{
    
        var thick = this.thickness;
        console.log("Thickness ="+this.thickness);
        var color = this.colors[this.choice];
        console.log("Colors #"+this.choice+" Color="+color);
        
        var splitThick = Math.floor(thick/2);
    
    
    context.save();
        context.lineWidth = thick;
        context.strokeStyle = color;
        
        if(thick>0)
        {
            context.beginPath();
                context.moveTo(115, 371-splitThick);
                context.lineTo(310, 371-splitThick);
            context.stroke();

            context.beginPath();
                context.moveTo(115, 384+splitThick);
                context.lineTo(310, 384+splitThick);
            context.stroke();
        }
    context.restore();
    
    //drawCrossSection
    iContext = this.insulationContext;
    
    
    iContext.save();        
        iContext.rect(0,0,400,300);    
        iContext.fillStyle = "white";
        iContext.fill();
        iContext.translate(100, 100);
        
        //Pipe
        iContext.beginPath();
            iContext.arc(0,0,30,0,2*Math.PI);
            iContext.strokeStyle = "gray";
            iContext.lineWidth = 10;
        iContext.stroke();
        
        //insulation
        if (thick>0)
        {
            var insulationHeight = thick*6;
            var radius= 35+insulationHeight/2;
            iContext.lineWidth = insulationHeight;
            iContext.strokeStyle = color;
            iContext.setLineDash([]);
            iContext.beginPath();
                iContext.arc(0,0,radius,0,2*Math.PI);
            iContext.stroke();
            
        }
        iContext.lineWidth = 1;
        iContext.strokeStyle = "black";
        iContext.setLineDash([3]);
        
        //Pipe void
        //iContext.beginPath();
        //    iContext.arc(0,0,5,0,2*Math.PI);
        //iContext.stroke();
        
        
        iContext.beginPath();
            iContext.moveTo(0, -34);    
            iContext.lineTo (150, -34);
            iContext.moveTo(0, 34);
            iContext.lineTo(150, 34);
            iContext.moveTo(0, -35-insulationHeight);
            iContext.lineTo(150, -35-insulationHeight);
        iContext.stroke();
        
        iContext.font = "16px Rockwell";
        iContext.fillStyle = "black";
        iContext.fillText("pipe diameter, 10cm", 120, 5);
        var message = " cm";
        message = thick+message;
        iContext.fillText(message, 155, -radius+5);
        
        
    
    iContext.restore();
    
    
};
