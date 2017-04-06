var time;
var stock;

var median;
var mean;

function setTime(){
    var radio = document.getElementsByName('time');

    if (radio[0].checked)
        time = 1/7;
    else if (radio[1].checked)
        time = 1;
    else if (radio[2].checked)
        time = 52;
    else {
        //error
    }
}

function predictStock(){

    var total = 0;
    var value;
    var splitValue;

    setTime();

    for (var i = 0; i < data.length; i++){
        value = data[i] + '';
        splitValue = value.split(',');
        total = total + parseInt(splitValue[1]);
    }

    mean = total / data.length;

    findMedian();

    var prediction = mean + ((mean - median) * time * 0.1);
    updatePrediction(prediction);
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

function updatePrediction(prediction){
    document.getElementById('prediction').innerHTML = prediction;
}