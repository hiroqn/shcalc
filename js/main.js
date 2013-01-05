var AppModel = Backbone.Model.extend({

});
var AppView = Backbone.View.extend({
  el : $('body'),

  events: {
    'click button#view': 'viewGraph',
    'click button#explain' : 'viewExplain'
  },
  initialize : function() {
    _.bindAll(this,'render','viewGraph','viewExplain');
    this.render();
  },
  render : function() {
    this.calc = ShCalc.create();
    this.view = View.create();

  },

  viewGraph: function(){
    var plot = this.calc;
    var view = this.view;
    var p=new Array(4);
    p[0]=parseInt($('input.r1').val(),10)/1000;
    p[1]=parseInt($('input.r2').val(),10)/1000;
    p[2]=parseInt($('input.r3').val(),10)/1000;
    p[3]=parseInt($('input.r4').val(),10)/1000;
    var data = plot.setData({
      degree:$('#degree').val(),
      p:p,
      taku:$('#taku').val(),
      es:$('#es').val(),
      vn:parseInt($('input.vn').val(),10),
      pt_pre:parseInt($('input.pt').val(),10)
    });
    var shmsg;
    if(parseInt($('input.r1').val(),10)+parseInt($('input.r2').val(),10)+parseInt($('input.r3').val(),10)+parseInt($('input.r4').val(),10)!=1000){ //pの和が1を超えた時のエラー処理
      plot.printStr('#err',plot.errmsg[0]);
    }
    else if(parseInt($('input.pt').val(),10)%5!=0||parseInt($('input.pt').val(),10)<0||parseInt($('input.pt').val(),10)>parseInt($('#degree').val(),10)*400){ //ptが範囲ないでないときのエラー処理
      plot.printStr('#err',plot.errmsg[1]);
    }
    else{
      plot.printStr('#err','');
      plot.hakidashi(data,plot.setAb(data));
      plot.drawChart(plot.funcPT().fpt);

      shmsg =$('input.pt').val() + 'ptにおける昇段確率は ' + Math.floor(plot.result[parseInt($('input.pt').val(),10)/5]*10000)/100+'%';
      plot.printStr('#sh',shmsg);
      plot.printStr('#check',plot.funcPT().e_fpt);
    }


  },

  viewExplain:function(){
    //$('#dialog').dialog("open");
  }
});

$(document).ready(function() {
  var app=new AppView();
  $( ".button-id" ).button();
  $( "#dialog" ).dialog({
    autoOpen: false,
    width: 400,
    buttons: [
      {
        text: "Ok",
        click: function() {
          $( this ).dialog( "close" );
        }
      },
      {
        text: "Cancel",
        click: function() {
          $( this ).dialog( "close" );
        }
      }
    ]
  });

  // Link to open the dialog
  $( "#dialog-link" ).click(function( event ) {
    $( "#dialog" ).dialog( "open" );
    event.preventDefault();
  });

  // Hover states on the static widgets
  $( "#dialog-link, span.bmargin, input.ui-input").hover(
    function() {
      $( this ).addClass( "ui-state-hover" );
    },
    function() {
      $( this ).removeClass( "ui-state-hover" );
    }
  );
});