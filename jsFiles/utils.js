/* 
 * Copyright CEISMC, 2015
 */


function init(context, myCityLocation, myInsulation, myScreen, myFlags){                                          

            myInsulation.initNames();
            myInsulation.initCosts();
            myInsulation.initR_values();
            myCityLocation.initCityNames();
            myCityLocation.initEnergy();
            
            updateTherms(myCityLocation);
            updateCost(myInsulation, myCityLocation);
            updateVolume(myInsulation, myFlags);
            updateTitleRow(myInsulation, myCityLocation);
            disableStuff();
            enableStuff(myFlags);
            initialScreen(context, myScreen);
            initializeChevrons(context, myScreen);
    };
    
function initializeChevrons(context, myScreen)
{
    myScreen.newChevrons[0] = context.createImageData(10, 10);
    myScreen.newChevrons[1] = context.createImageData(10, 10);
    myScreen.newChevrons[2] = context.createImageData(10, 10);
}
    
function updateCost(myInsulation, myCityLocation)
{
    //myCityLocation.calculateCost(myInsulation);
    //outputText = "$ "+myCityLocation.currentCost.toFixed(2);
    //document.getElementById('insulationCostDynamic').innerHTML=outputText;
};

function updateTherms(myCityLocation)
{
    outputText = myCityLocation.therms();
    document.getElementById('thermsDynamic').innerHTML=outputText;
};

function calcCircleArea(diameter)
{
    var area = 0;
    var radius = diameter/2;
    area = Math.PI*radius*radius;
    return area;
    
}

function updateVolume(myInsulation, myFlags)
{
    myInsulation.calculateVolume(myFlags.pickerIndicator);
    outputText = myInsulation.currentVolume.toFixed(2)+" cubic feet";
    //document.getElementById('insulationVolumeDynamic').innerHTML=outputText;
    
};

function updateTitleRow (myInsulation, myCityLocation)
{
    var cityName = myCityLocation.getName();
    var insulationName = myInsulation.getName();
    outputText = "LOCATION:"+cityName +"--->MATERIAL:" +insulationName;
    //document.getElementById('insulationDataTitleRow').innerHTML=outputText;
};

function updateInsulationCost (myInsulation, calcFlag)
{
    
    if (!calcFlag)
    {
        outputText = "calculate";
    }
    else if((myInsulation.choice == 0)||(myInsulation.choice == 1)||(myInsulation.choice == 2)||(myInsulation.choice == 4))
    {
        outputText = "no data for " + myInsulation.insulationNames[myInsulation.choice];
    }
    else
    {
        myInsulation.calculateTotalCost();
        //outputText = "$ "+ myInsulation.totalCost.toFixed(0);
        outputText = myInsulation.totalCost.toLocaleString("en-US", {style: "decimal", minimumFractionDigits: 0, maximumFractionDigits: 0}) 
    }
    document.getElementById('insulationExpenseDynamic').innerHTML=outputText;
}


function displayOverage(context, percent)
{
    context.save();
        var excessCapacity = (percent-120);
        excessCapacity = Math.round(excessCapacity);
        //excessCapacity = excessCapacity/10;
        
        
        var xStart = 455;
        var yStart = 370;
        var width = 205;
        var height = 25;
        var lineW = 2;
        var xText = xStart + 5;
        var yText = yStart + 17;
        
        context.lineWidth = lineW;
        context.strokeRect(xStart,yStart,width,height);
        context.fillStyle = "#F4F400";
        context.fillRect(xStart+lineW, yStart+lineW, width-(2*lineW), height-(2*lineW));
        
        
        textString = "+";
        textString += excessCapacity;
        textString += " (x1000) additional houses"; 
        context.font = "14px Rockwell";
        //context.fillStyle = "#F4F400";
        //context.fillText(textString, xText, yText);
        context.fillStyle = "#000000";
        context.fillText(textString, xText, yText);
    context.restore();   
}

function displayGroundTemp (context, percent)
{
    var xStart = 210;
    var yStart = 265;
    var width = 85;
    var height = 40;
    var lineW = 1;
    var xText = xStart + 2;
    var yText = yStart + 14;
    
    var groundTemp = 55*(1-percent)+70;
    
    context.save();
        textString1 = "...ground temp";
        textString2 = groundTemp.toFixed(0);
        textString2 += " degrees"; 
        context.font = "10px Rockwell";
        context.fillStyle = "#00BD5C";
        //context.fillText(textString, 472, 425);
        
        context.lineWidth = lineW;
        context.strokeRect(xStart,yStart,width,height);
        context.fillStyle = "rgba(207,181,59,1)";
        context.fillRect(xStart+lineW, yStart+lineW, width-(2*lineW), height-(2*lineW));
        
        context.fillStyle = "#003313";
        context.fillText(textString1, xText,yText);
        context.font = "12px Rockwell";
        context.fillText(textString2, xText,yText+16);
        
    context.restore();
    
}


function displayPercent(context, percent, randomMode)
{
    if (randomMode)
        percent = Math.random();
    
    percent = Math.round(percent*1000);
    percent = percent/10;
    
    var xStart = 250;
    var yStart = 405;
    var width = 182;
    var height = 25;
    var lineW = 2;
    var xText = xStart + 5;
    var yText = yStart + 17;
    
    context.save();
        textString = "Generator Capacity ";
        textString += percent;
        textString += "%"; 
        context.font = "14px Rockwell";
        context.fillStyle = "#00BD5C";
        //context.fillText(textString, 472, 425);
        
        context.lineWidth = lineW;
        context.strokeRect(xStart,yStart,width,height);
        context.fillStyle = "rgba(207,181,59,1)";
        context.fillRect(xStart+lineW, yStart+lineW, width-(2*lineW), height-(2*lineW));
        
        context.fillText(textString, xText, yText);
        context.fillStyle = "#003313";
        //context.fillText(textString, 473, 426);
        context.fillText(textString, xText+1,yText+1);
        
    context.restore();
};

Number.prototype.formatCurreny = function(n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

function disableStuff()
            {                                  
                //document.getElementById('startStop').disabled=true;
                //document.getElementById('ticMessage').style.color = 'gray';                   
                //document.getElementById('dragCheck').disabled=true;   
                
                //document.getElementById('startStop').textContent="End Simulation";
                $( "#insulationPicker").attr('disabled', 'disabled');                                        
                $( "#thicknessPicker1").attr('disabled', 'disabled');      
                $( "#thicknessPicker2").attr('disabled', 'disabled');      
                $( "#capacityPicker").attr('disabled', 'disabled');    
                
                
                //document.getElementById('calculateExpense').disabled=true;
                document.getElementById('clearTable').disabled=true;
                //document.getElementById('velocityGraph').disabled=true;
                //document.getElementById('forceGraph').disabled=true;
                
                /** commented out***********/
                document.getElementById('scenario1').disabled=true;
                document.getElementById('scenario2').disabled=true;
                document.getElementById('scenario3').disabled=true;
                /** commented out***********/
                
                document.getElementById('scenario4').disabled=true;
                document.getElementById('scenario5').disabled=true;
                document.getElementById('passcodeInput').disabled=true;
            };
            
function enableStuff(myFlags)
            {                
                //document.getElementById('startStop').disabled=false;
                //document.getElementById('ticMessage').style.color = 'black';                   
                //document.getElementById('dragCheck').disabled=false;   
                
                //document.getElementById('startStop').textContent="Begin Simulation";
                $( "#insulationPicker").removeAttr('disabled');   
                $( "#thicknessPicker1").removeAttr('disabled');   
                $( "#thicknessPicker2").removeAttr('disabled');   
                $( "#capacityPicker").removeAttr('disabled');   
                $( "#calculateExpense").removeAttr('disabled');   

                
                
                document.getElementById('clearTable').disabled=false;  
                //document.getElementById('calculateExpense').disabled=false;  
                //  
                //document.getElementById('velocityGraph').disabled=false;                
               // if(myFlags.wreckageFlag)
                    //document.getElementById('forceGraph').disabled=false;
                
                if(myFlags.passcode>0)
                    document.getElementById('scenario1').disabled=false;
                if(myFlags.passcode>1)
                    document.getElementById('scenario2').disabled=false;               
                if(myFlags.passcode>2)
                    document.getElementById('scenario3').disabled=false;         
                if(myFlags.passcode>3)
                    document.getElementById('scenario4').disabled=false;  
                if(myFlags.passcode>4)
                    document.getElementById('scenario5').disabled=false;  
                
                document.getElementById('passcodeInput').disabled=false;
            };
