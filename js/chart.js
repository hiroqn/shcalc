    // Load the Visualization API and the piechart package.
    google.load('visualization', '1.0', {'packages':['corechart']});

    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
/*    function drawChart(result) {

    // Create the data table.
    var data = new google.visualization.DataTable();
    var pt;
    data.addColumn('string', 'pt');
    data.addColumn('number', '昇段率');

    for(i=0;i<result.length;i++){
      pt = i*5 + 'pt';
      data.addRows([[pt,result[i]]]);
    }

    // Set chart options
    var options = {'title':'各ptにおける昇段率',
                   'width':800,
                   'height':600};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, options);
    }
*/