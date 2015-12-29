/* 
 * Copyright CEISMC, 2015
 */

$(window).load(function() {             
            
            var canvas = document.getElementById('myCanvas');
            var insulationCanvas = document.getElementById('insulationCanvas');
            var context = canvas.getContext('2d');  
            var insulationContext = insulationCanvas.getContext('2d');
            var myScreen = new screenObject(450, 695); //size of window inside of canvas (canvas width="600" height="475")
            var myFlags = new flags(); //all flags set to true by default (updated in init, when 'false' should be starting value)
            var myCityLocation = new cityLocation();
            var myInsulation = new insulation(insulationContext);
           
            init(context, myCityLocation, myInsulation, myScreen, myFlags);
            enableButtons(context, myCityLocation, myInsulation, myScreen, myFlags);
            //drawScene(context, myCityLocation, myInsulation, myScreen, myFlags);
});


function calcEnergy(thickness, r_Value, totalEnergy)
{
    var tEnergy = totalEnergy * (.44 + ((thickness * r_Value)/50));
    if (tEnergy > totalEnergy)
        tEnergy = totalEnergy;   
    return tEnergy;
};

function calculateSim (myInsulation, myCityLocation)
{
    var row = myInsulation.thickness;
    var totalCost =  myInsulation.currentVolume * myCityLocation.currentCost;
    var costRow = row + 'c';
    var transRow = row + 'ht';
    var lostRow = row + 'hl';
    
    document.getElementById(costRow).innerHTML=totalCost.formatCurreny(0,3);
    
    var tEnergy = calcEnergy(myInsulation.thickness, myInsulation.getR(), myCityLocation.therms()); 
    var lostEnergy = totalEnergy - tEnergy;
    
    
    
     document.getElementById(transRow).innerHTML=tEnergy.formatCurreny(0,3);
     document.getElementById(lostRow).innerHTML=lostEnergy.formatCurreny(0,3);
    
};

function cheatCalculateSim(myInsulation, myCityLocation)
{
    
    var totalCost =  myInsulation.currentVolume * myCityLocation.currentCost;
    var costRow = row + 'c';
    
    var transRow;
    var lostRow;
    var r_Value = myInsulation.getR();
    var totalEnergy = myCityLocation.therms();
    var tEnergy;
    var lostEnergy;
    
    for (i = 1; i<11; i++)
    {
        transRow = i + 'ht';
        lostRow = i + 'hl';
        tEnergy = calcEnergy(i, r_Value, totalEnergy); 
        lostEnergy = totalEnergy - tEnergy;
        document.getElementById(transRow).innerHTML=tEnergy.formatCurreny(0,3);
        document.getElementById(lostRow).innerHTML=lostEnergy.formatCurreny(0,3);
        
        
    }
};

function genPowerToHouses(generatorPercent)
{
    return(generatorPercent*230);
}
                       
       

