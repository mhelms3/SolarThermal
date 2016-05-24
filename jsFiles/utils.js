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
            initialScreen(context, myScreen)
    };
    
function updateCost(myInsulation, myCityLocation)
{
    myCityLocation.calculateCost(myInsulation);
    outputText = "$ "+myCityLocation.currentCost.toFixed(2);
    document.getElementById('insulationCostDynamic').innerHTML=outputText;
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
    document.getElementById('insulationVolumeDynamic').innerHTML=outputText;
    
};

function updateTitleRow (myInsulation, myCityLocation)
{
    var cityName = myCityLocation.getName();
    var insulationName = myInsulation.getName();
    outputText = "LOCATION:"+cityName +"--->MATERIAL:" +insulationName;
    document.getElementById('insulationDataTitleRow').innerHTML=outputText;
};


function displayPercent(context, percent, randomMode)
{
    if (randomMode)
        percent = Math.random();
    percent = Math.round(percent*1000);
    percent = percent/10;
    context.save();
        textString = "Generator Capacity ";
        textString += percent;
        textString += "%"; 
        context.font = "14px Rockwell";
        context.fillStyle = "#00BD5C";
        context.fillText(textString, 470, 425);
        context.fillStyle = "#003313";
        context.fillText(textString, 471, 426);
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
                
                document.getElementById('clearTable').disabled=true;
                //document.getElementById('velocityGraph').disabled=true;
                //document.getElementById('forceGraph').disabled=true;
                
                document.getElementById('scenario1').disabled=true;
                document.getElementById('scenario2').disabled=true;
                document.getElementById('scenario3').disabled=true;
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
                
                
                document.getElementById('clearTable').disabled=false;  
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
