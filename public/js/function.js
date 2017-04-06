$(function(){

    $('#select-company').click(function(){
        var company = $('#company-list').find(":selected").text();

        $.get('/getdata/' + company, function(dataset){
            Highcharts.stockChart('chart-container', {
                rangeSelector: {
                    selected: 1
                },
                title: {
                    text: company + ' - ' + 'Test Stock Price'
                },
                series: [{
                    name: 'price',
                    data: dataset,
                    tooltip: {
                        valueDecimals: 2
                    }
                }]
            });
        }); //end of getdata

    });//end of select-company.click

});//end of document.ready