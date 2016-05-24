/* 
 * Copyright CEISMC, 2015
 */
"use strict";
function enableButtons(context, myCityLocation, myInsulation, myScreen, myFlags)
{
    
                function checkVisible(myFlags)
                {
                    if (myFlags.displayRightFlag)
                        document.getElementById('rightPane').style.display = "block";  
                    else
                        document.getElementById('rightPane').style.display = "none";  
                }
                
                startStop.addEventListener('click', function(evt) {       
                        myFlags.animationFlag = !myFlags.animationFlag;
                        myFlags.connectFlag = !myFlags.connectFlag;
                        if(myFlags.connectFlag)
                        {
                            this.innerHTML="Connect the Power";
                            enableStuff(myFlags);
                        }
                        else
                        {
                            this.innerHTML="Disconnect Power";
                            disableStuff();
                        }
                        
                        drawBackground(context, myScreen, myFlags);
                        myScreen.clearChevrons();
                        myScreen.resetBlades();
                        initHouses(context, myScreen);

                        var housePercent = 0;
                        var genPercent = 0;
                        
                        if(!myFlags.showInsulation)
                        {
                            myFlags.genPercent = document.getElementById('capacityPicker').value/10;   
                        }
                        else
                        {
                            myInsulation.drawInsulation(context);
                            myFlags.genPercent = myInsulation.calculateHeatRetained();
                            if (genPercent > 1)
                                genPercent = 1;
                        }
                        
                        housePercent = genPowerToHouses(myFlags.genPercent);
                        powerHouses(context, myScreen, housePercent, myInsulation, myFlags);
                    }, false);
                    
                fillTable.addEventListener('click', function(evt) {                                  
                     cheatCalculateSim(myInsulation, myCityLocation);
                    }, false);
                    
                locationPicker.addEventListener('change', function(evt) {
                    updateCost(myInsulation, myCityLocation);
                    updateTitleRow(myInsulation, myCityLocation);
                    updateTherms(myCityLocation);
                }, false);
                
                insulationPicker.addEventListener('change', function(evt) {            
                    myInsulation.choice = document.getElementById('insulationPicker').value;   
                    drawSceneOne(context, myScreen, myFlags);
                    myInsulation.drawInsulation(context);
                    updateCost(myInsulation, myCityLocation);
                    updateTitleRow(myInsulation, myCityLocation);
                }, false);
                
                thicknessPicker1.addEventListener('change', function(evt) {            
                    myInsulation.thickness = document.getElementById('thicknessPicker1').value;   
                    drawSceneOne(context, myScreen, myFlags);
                    myInsulation.drawInsulation(context);
                    updateVolume(myInsulation, myFlags);
                }, false);
                
                thicknessPicker2.addEventListener('change', function(evt) {            
                    myInsulation.thickness = document.getElementById('thicknessPicker2').value;   
                    drawSceneOne(context, myScreen, myFlags);
                    myInsulation.drawInsulation(context);
                    updateVolume(myInsulation, myFlags);
                }, false);
                
                function clearColumn(column, rows)
                {
                    for(i=1; i<rows+1; i++)
                    {
                        var clearCell = i+column;                    
                        //console.log(clearCell);
                        document.getElementById(clearCell).textContent="--" ;
                    }
                };
                
                function clearAllElements()
                {
                    $(".hidable").hide();  
                };
                
                clearTable.addEventListener('click', function(evt) {            
                    //document.getElementById('velocityGraph').disabled=true;         
                    //document.getElementById('forceGraph').disabled=true;
                    var opt = document.getElementById('thicknessPicker');
                    clearColumn("c", opt.length);
                    clearColumn("sh", opt.length);
                    clearColumn("ht", opt.length);
                    clearColumn("hl", opt.length);
                    clearColumn("eg", opt.length);
                    clearColumn("el", opt.length);
                    clearColumn("houses", opt.length);
                }, false);
                
                function checkPasscode(n)
                {
                    if (n>myFlags.passcode)
                    {
                        myFlags.passcode = n;
                        enableStuff(myFlags);
                    }
                    document.getElementById('passcodeInput').style.color = "green";  
                };

                passcodeInput.addEventListener('click', function(evt) {
                    this.value = "";
                    this.style.color = "blue";
                }, false);
                
                passcodeInput.addEventListener('keyup', function(evt) {
                    var strng = this.value;
                    var inputString = strng.toUpperCase();
                    switch (inputString) {
                    case "SOLAR":
                        checkPasscode(1);
                        break;
                    case "THERMAL":
                        checkPasscode(2);
                        break;
                    case "ENERGY":
                        checkPasscode(3);
                        break;
                    case "RENEWABLE":
                        checkPasscode(4);
                        break;
                    default:
                        this.style.color = "blue";  
                    }
                }, false);
                
                //generator power capacity
                scenario1.addEventListener('click', function(evt) {
                     myFlags.displayRightFlag = true;
                     myFlags.showInsulation = false;
                     myFlags.pickerIndicator = 0;
                     clearAllElements();
                     document.getElementById('capacitySpan').style.display = "block";
                     document.getElementById('capacityMessage').innerHTML = "Choose generator capacity";  
                     document.getElementById('variableTitle').innerHTML = "<h3>Investigating Generator Capacity</h3>"; 
                     checkVisible(myFlags);
                     drawSceneOne(context, myScreen, myFlags);
                    
                   
                }, false);

                //insulation 1-5cm
                 scenario2.addEventListener('click', function(evt) {
                    myFlags.displayRightFlag = true;
                    myFlags.showInsulation = true;
                    myFlags.pickerIndicator = 1;
                    checkVisible(myFlags);
                    clearAllElements();
                    document.getElementById('capacityMessage').innerHTML = "Generator capacity depends on heat received";  
                    document.getElementById('variableTitle').innerHTML = "<h3>Investigating Insulation: 1 - 5cm</h3>"; 
                    document.getElementById('insulationSpan').style.display = "block";  
                    document.getElementById('thicknessSpan1').style.display = "block";  
                    document.getElementById('insulationDisplay').style.display = "block";  
                    myInsulation.choice = document.getElementById('insulationPicker').value;
                    myInsulation.thickness = document.getElementById('thicknessPicker1').value;
                    drawSceneOne(context, myScreen, myFlags);
                    myInsulation.drawInsulation(context);
                    
                }, false);
                
                ///insulation 1-10cm
                scenario3.addEventListener('click', function(evt) {
                    myFlags.displayRightFlag = true;
                    myFlags.showInsulation = true;
                    myFlags.pickerIndicator = 2;
                    checkVisible(myFlags);
                    clearAllElements();
                    document.getElementById('capacityMessage').innerHTML = "Generator capacity depends on heat received";  
                    document.getElementById('variableTitle').innerHTML = "<h3>Investigating Insulation: 1 - 10cm</h3>"; 
                    document.getElementById('insulationSpan').style.display = "block";  
                    document.getElementById('thicknessSpan2').style.display = "block";  
                    document.getElementById('insulationDisplay').style.display = "block";  
                    myInsulation.choice = document.getElementById('insulationPicker').value;
                    myInsulation.thickness = document.getElementById('thicknessPicker2').value;
                    drawSceneOne(context, myScreen, myFlags);
                    myInsulation.drawInsulation(context);
                    
                }, false);
                
                //helmet Sim
                scenario4.addEventListener('click', function(evt) {
                   myFlags.displayRightFlag = false;
                   checkVisible(myFlags); 
                }, false);
                
                
                 scenario5.addEventListener('click', function(evt) {
                    myFlags.displayRightFlag = false;
                    checkVisible(myFlags);
                    
                }, false);

                
              
};
