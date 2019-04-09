var date=[];
var value=[];
var str,str1,str2;
var array1=[];
var array2=[];
$(document).ready(function(){
    $("#firstDropDown").on('change',function(){
        var category=this.value;
        getData();
       
        $(".fourthrow").css("display","block");
    })
});

function getData(){
 
    $(document).ready(function(){
        $.ajax({
            url:'https://glacial-bayou-63601.herokuapp.com/carbonemission',
            type: 'GET',
        crossDomain: true,
        dataType: 'json',
        data:{
            format:"json"
        },
        success:function(data){
            for(var i=0;i<data.length;i++){
                date.push(data[i].YYYYMM);
                value.push(data[i].Value);
            }
            generateBarGraph(date,value);
        
            }
          
        })
    });
}

function generateBarGraph(date,value){
    Highcharts.chart('barGraph', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Carbon Emitted due to Electricity Generation'
        },
        
        xAxis: {
            categories: date,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Carbon Emitted (Million Metric Tons of Carbon)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            },
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function () {
                        var sdate= this.category
                        array1.push(sdate);
                        array1.push(this.y);
                        array2.push(array1);
                        array1=[];
                        getSpecificYear(sdate);
                        getComparisionData(array2);
                        }
                    }
                }
            }

        },
        series: [{
           
            data: value
    
        }]
    });
}


function getSpecificYear(sdate){
    $(".secondRow").css("display","block");
    $(".thirdRow").css("display","block");
    $("#valueDiv").empty();
    $("#causeDiv").empty();
    str1='';
    str2='';
    $(document).ready(function(){
        $.ajax({
            url:'https://glacial-bayou-63601.herokuapp.com/carbonemission/'+sdate,
            type: 'GET',
        crossDomain: true,
        dataType: 'json',
        data:{
            format:"json"
        },
        success:function(data){
            
            str1='<h4 class="carbonClass">Amount of carbon emitted for year:'+sdate+'</h4>';
            str1=str1+'<hr/>';
            str1=str1+'<span class="valueClass">'+data[0].Value+'</span>';
            str1=str1+'<br><span class="carbonClass">('+data[0].Unit+')</span>';
            str2='<h4 class="carbonClass">Causes</h4>';
            str2=str2+'<hr />';
            str2=str2+'<span class="causeClass">'+data[0].Description+'</span>';
            
            $("#valueDiv").append(str1);
            $("#causeDiv").append(str2);
            }
        
        })
    });
}

function getComparisionData(array2){
    $("#piechart").empty();
    Highcharts.chart('piechart', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Carbon emitted throughout years'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: array2
        }]
    });
}

