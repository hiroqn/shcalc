function View(){

}

View.prototype.setData=function(){
  this.Data = {

  }
}

//文字列表示
View.prototype.printStr=function(pos,str){
  $(pos).text(str);
}

//グラフ表示
View.prototype.drawChart=function(result) {

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

//インスタンス生成
View.create=function(haishi){
  var sh = new ShCalc(haishi);
  return sh;
};