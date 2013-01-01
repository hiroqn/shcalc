function ShCalc(){
  this.errmsg = [['順位の書き方が間違ってるよ(*´ω｀*) (順位の合計は1000になっていますか？入力は半角数字ですか？'],
                 ['ptの書き方が間違ってるよ(*´ω｀*) (ptは5の倍数ですか？段位のptの範囲内に入っていますか？']];
}

/*setData(Data):入力データのセッター
 * Data:各入力データのオブジェクト
 * degree:int 段位
 * pt:int[4] [0]:1位のポイント [1]:2位のポイント ...
 * p:double[4] [0]:1位率 ...
 * es:char[] 'e':東風 's':東南
 * vn:int 規定試合数
 * 返り値:成型したデータオブジェクト
 */
ShCalc.prototype.setData=function(Data){
  var I = {
      degree:parseInt(Data.degree, 10),
      pt:Pt.getPt(Data.taku,parseInt(Data.degree, 10)+1,Data.es),
      p:Data.p,
      es:Data.es,
      vn:Data.vn,
      pt_pre:Data.pt_pre
  }
  return I;
}

//行列のセッター
ShCalc.prototype.setAb=function(I){

//  var I = this.I;
  var A = new Array(I.degree*80);
  var b = new Array(I.degree*80);

  var l;//昇段判定に使う
  for (i = 0; i < A.length; i++) {
      A[i] = new Array(I.degree*80);
      for(j = 0; j<A[i].length; j++){
        A[i][j] = 0;
      }
      A[i][i] = 1;
      b[i] = 0;
      for(k = 0; k < I.pt.length; k++){
        l = i + I.pt[k];
        if(l>=0&&l<I.degree*80){
          A[i][l] = A[i][l] - I.p[k];
        }
        else if(I.pt[k]>0){
          b[i] = b[i] + I.p[k];
        }
      }
  }

  return {
    A:A,
    b:b
  };
};

//掃き出し法
ShCalc.prototype.hakidashi=function(I,AB){

//  var I = this.I;
  var A=AB.A;
  var b=AB.b;
  var normal;
  var n;
  var result = new Array(b.length);
  for(i=0;i<b.length;i++){
    normal = 1.0/A[i][i];
    for(j=i+1;j<b.length;j++){
      n = A[j][i] * normal;
      //TODO
      if(n==0) continue;
      b[j] = b[j] - b[i] * n;
      for(k=i;k<b.length;k++){
        A[j][k] = A[j][k] - A[i][k] * n;
      }
    }
  }

  for(i=b.length-1;i>=0;i--){
    result[i]=b[i]
    for(j=i+1;j<b.length;j++){
      result[i] = result[i] - result[j] * A[i][j];
    }
    result[i] = result[i] / A[i][i];
  }

  this.result=result;
}


//規定試合後のpt確率密度関数
ShCalc.prototype.funcPt = function(I){

  var fpt = new Array(I.degree*80+1);//+2は昇段降段の確率
  var fpt_tmp = new Array(I.degree*80 + 1);
  var pt_pre = I.pt_pre/5; //現在のpt
  var vn = I.vn; //規定試合数
  var e_fpt=0;

  for(i=0;i<fpt.length;i++){
    fpt[i]=0;
    if(i==pt_pre) fpt[i]++;
  }
  for(i=0;i<vn;i++){
    for(j=0;j<fpt.length;j++){
      fpt_tmp[j] = 0;
    }
    for(j=1;j<fpt.length-1;j++){
      for(k=0;k<I.pt.length;k++){
        if(j+I.pt[k]>=fpt.length-1){//昇段時
          fpt_tmp[fpt.length-1]+=I.p[k]*fpt[j];
        }
        else if(j+I.pt[k]<0){//降段時
          fpt_tmp[0]+=I.p[k]*fpt[j];
        }
        else{//それ以外
          fpt_tmp[j+I.pt[k]]+=I.p[k]*fpt[j];
        }
      }
    }
    for(j=0;j<fpt.length;j++){
      if(j==0||j==fpt.length-1){
        fpt[j] += fpt_tmp[j];
      }
      else{
        fpt[j] = fpt_tmp[j];
      }
    }
  }//試合数におけるループ終了位置

  for(i=1;i<fpt.length-1;i++){
    e_fpt+=fpt[i]*i*5;
  };

  return {
    fpt:fpt,
    e_fpt:e_fpt
  };
}

//文字列表示
ShCalc.prototype.printStr=function(pos,str){
  $(pos).text(str);
}

//グラフ表示
ShCalc.prototype.drawChart=function(result) {

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
ShCalc.create=function(haishi){
  var sh = new ShCalc(haishi);
  return sh;
};