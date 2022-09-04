$(document).ready(function () {
    var data1 = [];
    var seriesName = 'plot';
    $('#ajax_data_load').click(function () {
        clicked = $(this).attr('name');
        $.ajax({
            url: '/get_data',
            dataSrc: 'data',
            type: 'POST',
            dataType: 'json',
            data: $('form').serialize(),
            success: function (data) {
                console.log('Success Hit');
                console.log(data);
                $('#jds-example').html('');

                var column_data = '';
                column_data += '<tr>';

                for (var key in data[0]) {
                    column_data += '<th>' + key + '</th>'
                };

                column_data += '</tr>';
                $('#jds-example').append(column_data),
                    $('th').css({ 'background-color': '#FFA500', 'color': 'white' });

                var row_data = '';
                for (var arr in data) {
                    var obj = data[arr];
                    row_data += '<tr class="trRowData">';
                    for (var key in obj) {
                        var value = obj[key];
                        row_data += '<td>' + value + '</td>';                        
                    };
                    row_data += '</tr>'
                };
                $('#jds-example').append(row_data);

            },
            error: function (data) {
                console.log('Error Hit');
                console.log(data);
            }
        });
    });
    $(".trRowData").click(function (val) {
        var $row = $(this).closest("tr"), $tds = $row.find("td:nth-child(2)");
        var numbers = $tds[0].innerText.split(",");
        numbers = numbers.map(x => parseFloat(x.replace('[', '').replace(']', '')));
        data1 = [...numbers];
       
        // Data retrieved from https://netmarketshare.com
         Highcharts.chart('pieChart', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height: 900,
            },
            title: {
                text: 'data'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: seriesName,
                colorByPoint: true,
                data: data1
            }]
        });
        Highcharts.chart('histoChart', {
            title: {
                text: 'Highcharts Histogram'
            },

            xAxis: [{
                title: { text: 'Data' },
                alignTicks: false
            }, {
                title: { text: 'Histogram' },
                alignTicks: false,
                opposite: true
            }],

            yAxis: [{
                title: { text: 'Data' }
            }, {
                title: { text: 'Histogram' },
                opposite: true
            }],

            plotOptions: {
                histogram: {
                    accessibility: {
                        point: {
                            valueDescriptionFormat: '{index}. {point.x:.3f} to {point.x2:.3f}, {point.y}.'
                        }
                    }
                }
            },

            series: [{
                name: 'Histogram',
                type: 'histogram',
                xAxis: 1,
                yAxis: 1,
                baseSeries: 's1',
                zIndex: -1
            }, {
                name: 'Data',
                type: 'scatter',
                data: data1,
                id: 's1',
                marker: {
                    radius: 50
                }
            }]
        });
     
    });
  

});
