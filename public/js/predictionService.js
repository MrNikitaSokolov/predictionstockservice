var median;
var mean;
var time = 1/7;
var predictClicked = false;


function loadData(){
    var select = document.getElementById('companyList');
    var stock = select.options[select.selectedIndex].value;
    var dataFile;

    dataFile = "js/test-data/test-" + stock + ".js";

    $.getScript(dataFile, function(){
        predictStock();
    });
}

function setTime(){
    var radio = document.getElementsByName('time');

    if (radio[0].checked)
        //1/7 of a week
        time = 1/7;
    else if (radio[1].checked)
        //1 week
        time = 1;
    else if (radio[2].checked)
        //52 weeks
        time = 52;
    else {
        //error
    }

    //after the user has clicked predict stock, automatically call it when the time is changed
    if (predictClicked){
        //based on the stock chosen, load the data file
        loadData();
    }
}

function predictStock(){

    var total = 0;
    var value;
    var splitValue;

    predictClicked = true;

    //go through the data file and get the accumulated value of the stock over time
    for (var i = 0; i < data.length; i++){
        value = data[i] + '';
        splitValue = value.split(',');
        total = total + parseInt(splitValue[1]);
    }

    //calculate the average price
    mean = total / data.length;

    //call function to find the median value
    findMedian();

    //apply a change over time to the most recent stock price
    var lastValue = parseInt(splitValue[1]);
    var prediction = lastValue + ((mean - median) * time * 0.1);

    //value cannot be negative
    if (prediction < 0)
        prediction = 0;

    //round the numbers
    lastValue = Math.round(lastValue * 100) / 100;
    prediction = Math.round(prediction * 100) / 100;

    //call function to update the prediction value
    updatePrediction(prediction, lastValue);
}

function findMedian(){
    var middle;

    if (data.length % 2 == 1){
        middle = (data.length + 1) / 2;
    }
    else
        middle = data.length / 2;

    var value;
    var splitValue;

    value = data[middle] + '';
    splitValue = value.split(',');
    median = parseInt(splitValue[1]);

}

function updatePrediction(prediction, current){
    document.getElementById('prediction').innerHTML = "Projected Stock Value: $" + prediction;
    document.getElementById('current').innerHTML = "Current Stock Value: $" + current;
}

function clearPrediction(){
    document.getElementById('prediction').innerHTML = "Projected Stock Value: n/a"
    document.getElementById('current').innerHTML = "Current Stock Value: n/a"
    predictClicked = false;
}

