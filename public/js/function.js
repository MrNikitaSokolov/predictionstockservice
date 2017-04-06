$(function(){

    $('#select-company').click(function(){
        var company = $('#company-list').find(":selected").text();

        $.get('/getdata/' + company, function(dataset){

        }); //end of getdata

    });//end of select-company.click

});//end of document.ready