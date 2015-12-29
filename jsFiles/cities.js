/* 
 * Copyright CEISMC, 2015
 */
var cityLocation = function(){
    this.cityNames = [];
    this.choice = 0;
    this.energyGenerated = [];
    this.energyCosts = [];
    this.currentCost = 0;
    this.poweredHouses = 0;
    
};

cityLocation.prototype.initCityNames= function()
{
    var opt = document.getElementById('locationPicker');
    var listLength = opt.length;
    
    for(i=0; i<listLength; i++)
    {
        this.cityNames.push(opt.options[i].text);
    }
};    

cityLocation.prototype.getChoice = function()
{
    this.choice =  document.getElementById('locationPicker').value;
};  

cityLocation.prototype.initEnergy = function()
{
    this.energyCosts =  [0.5, 0.1, 0.20, 0.30, 0.40, 0.50, .60, .70];
    this.energyGenerated = [100000, 75000, 85000, 47000, 12500];
};  

cityLocation.prototype.getName = function()
{
    return(this.cityNames[this.choice-1]);
};

cityLocation.prototype.calculateCost = function(myInsulation)
{
    myInsulation.getChoice();
    this.getChoice();
    this.currentCost = myInsulation.cost[this.choice][myInsulation.choice-1]*1728;
};

cityLocation.prototype.therms = function()
{
    this.getChoice();
    return this.energyGenerated[this.choice-1];
};

