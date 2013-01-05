var Pt = (function(){
  var pt12 = [[9,12,15,18],[0,3,6,9]];
  var pt4 = [-3,-6,-9,-12,-15,-18,-21,-24,-27,-30,-33,-36];
  var pt = [0,0,0,0];

  return {
    getPt:function(taku,degree,es){
      switch(taku){
      case 'tp':pt[0]=pt12[0][0]; pt[1]=pt12[1][0];break;
      case 'tj':pt[0]=pt12[0][1]; pt[1]=pt12[1][1];break;
      case 'tt':pt[0]=pt12[0][2]; pt[1]=pt12[1][2];break;
      case 'th':pt[0]=pt12[0][3]; pt[1]=pt12[1][3];break;
      }
      pt[3]=pt4[degree];
      if(es=='e'){
        for(i=0;i<pt.length;i++){
          pt[i] = pt[i]*2/3;
        }
      }

      return pt;
    }
  };
})();