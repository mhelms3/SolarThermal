<!DOCTYPE html>
<!--
    Copyright CEISMC, Georiga Institute of Technology, 2015
    Code Author: Michael Helms, PhD
    Last Modified: April 15, 2015
-->

<!DOCTYPE html>

<?php 


    
    $locationText = array("Napuu Village, Kenya", "Upington, South Africa", "Smara, Morroco", "Atlanta, USA", "London, UK", );
    $locationRows = count($locationText);
    
    $capacityText = array("10%","20%","30%","40%","50%","60%","70%");
    $capacityRows = count($capacityText);
    
    
    $thermalGeneratorText = array("Small", "Medium", "Large", "Mega");
    $thermalGeneratorCost = array("$100,000", "$1,000,000", "$25,000,000", "$100,000,000");
    
    
    $insulationText = array("Mud", "Grass", "Wood", "Adobe", "Brick", "Fiberglass", "Vacuum Panels", "Aerogels");
    $insultationRows = count($insulationText);
    
    $thicknessText = array(1,2,3,4,5,6,7,8,9,10);
    $thicknessRows1 = 5;
    $thicknessRows2 = 10;
    
    $insulationTableID = "insulationData";
    $insulationTableLabels = array("i", "c","ht","hl", "eg","el", "houses");
    $insulationTableHeaderText = array("Insultation Level", "Insulation Cost", "Heat Transferred", "Heat Lost", "Energy Generated", "Energy Lost", "Houses lit");
    $insulationTableColumns = count($insulationTableHeaderText);
    $insulationTableRows = $thicknessRows2;
    
    
    
    
    
    
   
function makeTable($tableID, $titleName, $colSize, $rowSize, $headerText, $rowIDs, $rowText)
{
                echo("<table id="); echo($tableID); echo('">');
                if($titleName != "")
                {
                    echo("<tr>");
                        echo("<th id="); echo($tableID); echo("TitleRow"); echo(" colspan="); echo($colSize); echo(" >"); echo($titleName);
                        echo("</th>");
                    echo("</tr>");
                }
                echo("<tr>");
                for($j=0; $j<$colSize; $j++)
                   {
                       echo('<th>');
                       echo($headerText[$j]);
                       echo('</th>');
                   }
                echo("</tr>");
                for($i=0; $i<$rowSize; $i++)
                {
                    echo("<tr>");
                    for($j=0; $j<$colSize; $j++)
                    {
                        echo('<td id="');
                        echo($i+1);
                        echo($rowIDs[$j]);
                        echo('">');
                        //kludgy -- I know that only the first two will have text, the rest is "--"
                        if($j==0)
                            {echo($rowText[$i]);}
                        else
                            {echo('--');}
                        echo('</td>');
                    }
                    echo("</tr>");
                }
                echo("</table>");
};

function makeOptionList ($listName, $listLength, $listIDs, $listText, $isVisible)
{
    echo('<select id="');
    echo($listName);
    echo('" name="');
    echo($listName);
    if(!$isVisible)
    {
        echo(' visibility="hidden"');
    }
    echo('">');
    
    for ($i=0; $i<$listLength; $i++)
    {
        echo('<option id="');
        echo($listIDs);
        echo($i+1);
        echo('" value=');
        echo($i+1);
        echo(">");
        echo($listText[$i]);
        echo("</option>");
    }
    echo("</select>");
}


?>


<html>
    <head> 
        <title>Solar Thermal Challenge</title>
        <meta charset="utf-8">
        <link rel="stylesheet" type="text/css" href="styleSheet.css">

        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
        <script src="jsFiles/main.js"></script>
        <script src="jsFiles/simpleObjects.js"></script>
        <script src="jsFiles/utils.js"></script>
        <script src="jsFiles/buttonBehaviors.js"></script>
        <script src="jsFiles/insulation.js"></script>
        <script src="jsFiles/cities.js"></script>
        <script src="jsFiles/drawScene.js"></script>
        

    </head>

    <body>
        <div id="topTitle"><h3>The Solar Thermal Challenge - Calculation Tool</h3></div>

        <div id="leftPane">
            <canvas id="myCanvas" width="700" height="475">
                <!-- Insert fallback content here -->
            </canvas>
            <div id="bottomPane">

                <button class ="progressButton" id="scenario1" >1. Powering Houses</button>
                <button class ="progressButton" id="scenario2" disabled="disabled">2. Testing Insulation I</button>
                <button class ="progressButton" id="scenario3" disabled="disabled">3. Testing Insulation II</button>
                <button class ="progressButton" id="scenario4" disabled="disabled" style="display:none;" >4. New Environments</button>
                <button class ="progressButton" id="scenario5" disabled="disabled" style="display:none;" >5. Costs and Decisions</button>
            </div>
            <div id="passcodeDiv">
                <br>
                Enter passcode here to advance to the next level of analysis     <input type="text" id="passcodeInput" value="enter passcode">
                <br>
            
            </div>
        </div>

        <div id="rightPane"  style="display:none;">

            
            <div id="variableTitle"><h3>Investigating Generator Capacity</h3></div>
            
            
            <div id="capacitySpan" class="hidable" style="display:block;">
                <text id="capacityMessage">Choose generator capacity</text>
                <?php
                    makeOptionList("capacityPicker", $capacityRows, "cap" , $capacityText, true); 
                ?>
            </div>
            
            <div id="locationSpan" class="hidable" style="display:none;">
                <text id="locationMessage">Choose city location</text>
                <?php
                    makeOptionList("locationPicker", $locationRows, "lp" , $locationText, true); 
                ?>
            </div>
            
            <div id="thermsSpan" class="hidable" style="display:none;">
                <text id="thermsMessage">Average thermal energy collected at location:</text>
                <div id="thermsDynamic">amount of thermal output</div>
            </div>
            
            <div id="insulationSpan" class="hidable" style="display:none;">
                <text id="insulationMessage">Choose insulation type</text>
                <?php
                    makeOptionList("insulationPicker", $insultationRows, "ip" , $insulationText, true); 
                ?>
            </div>
            
            <div id="insulationCostSpan" class="hidable" style="display:none;">
                <text id="costMessage">Cost per cubic foot:</text>
                <div id="insulationCostDynamic">Material cost per cubic foot</div>
            </div>
            
            <div id="thicknessSpan1" class="hidable" style="display:none;">
                <text id="thicknessMessage1">Choose insulation amount (cm)</text>
                <?php
                    makeOptionList("thicknessPicker1", $thicknessRows1, "tp" , $thicknessText, true); 
                ?>
            </div>
            
            <div id="thicknessSpan2" class="hidable" style="display:none;">
                <text id="thicknessMessage2">Choose insulation amount (cm)</text>
                <?php
                    makeOptionList("thicknessPicker2", $thicknessRows2, "tp" , $thicknessText, true); 
                ?>
            </div>
            
            
            <div id="insulationVolumeSpan" class="hidable" style="display:none;">
                <text id="volumeMessage">Number of cubic feet required:</text>
                <div id="insulationVolumeDynamic">Formula for surrounding a 12" pipe, with n" of insulation</div> 
            </div>
            
            <br>
            <br>
           
            <button id="startStop">Connect the Power</button>

            <br>
            <br>
            
            
            <span id="mainTable" style="display:none;">
                <button id="fillTable">Cheat</button>
                <?php 
                    makeTable($insulationTableID, "*insulation table*", $insulationTableColumns, $thicknessRows, $insulationTableHeaderText, $insulationTableLabels, $thicknessText)
                    
                ?>
                <button id="clearTable">Clear Table</button>

            </span>
            
            
            <div id="insulationDisplay" class="hidable" style="display:none;">
                <canvas id="insulationCanvas" width="370" height="200">
                
                </canvas>
            </div>
            
            

        </div>
    </body>
</html>

