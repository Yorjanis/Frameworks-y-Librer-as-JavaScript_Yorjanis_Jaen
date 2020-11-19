function Amarillo() {
        j$(".main-titulo").animate({
            color: "#DCFF0E"
          }, 1000,
          function () {
            Blanco();
          }
        )
      }
  
      function Blanco() {
        j$(".main-titulo").animate({
          color: "white"
        }, 1000, 
          function () {
            Amarillo();
          }
        );
      }
      j$(document).ready(function () {
  
        Blanco();
})

var rbh=0;
var rbv=0;
var bnewd=0;
var lencol=["","","","","","",""];
var lenres=["","","","","","",""];
var maximo=0;
var matriz=0;

var intervalo=0;  
var eliminar=0;   
var newdulces=0;  
var tiempo=0;     

var i=0;
var contador=0;  
var conc1=0;    

var initialPos;
var espera=0;
var score=0;
var mov=0;

var min=2;
var seg=0;

j$(".btn-reinicio").click(function(){
  i=0;
  score=0;
  mov=0;
  j$(".panel-score").css("width","25%");
  j$(".panel-tablero").show();
  j$(".time").show();

  j$("#score-text").html("0")
  j$("#movimientos-text").html("0")
  j$(this).html("REINICIAR")
  clearInterval(intervalo);
  clearInterval(eliminar);
  clearInterval(newdulces);
  clearInterval(tiempo);
  min=2;  
  seg=0;  
  borrartotal()
  intervalo=setInterval(function(){desplazamiento()},600)
  tiempo=setInterval(function(){timer()},1000)
})




function timer()
{
  if(seg!=0)
  {
    seg=seg-1;
  }
  if(seg==0)
  {
    if(min==0)
    {
      clearInterval(eliminar);
      clearInterval(newdulces);
      clearInterval(intervalo);
      clearInterval(tiempo);
      j$( ".panel-tablero" ).hide("drop","slow",callback);
      j$( ".time" ).hide();
    }
    seg=59;
    min=min-1;
  }
  j$("#timer").html("0"+min+":"+seg)
}


function callback()
{
    j$( ".panel-score" ).animate({width:'100%'},4000);
}

function borrartotal()
{
  for(var j=1;j<8;j++)
  {
    j$(".col-"+j).children("img").detach();
  }
}




function desplazamiento()
{
  i=i+1
  var numero=0;
  var imagen=0;

  j$(".elemento").draggable({ disabled: true });
  if(i<8)
  {
    for(var j=1;j<8;j++)
    {
      if(j$(".col-"+j).children("img:nth-child("+i+")").html()==null)
      {
        numero=Math.floor(Math.random() * 4) + 1 ;
        imagen="image/"+numero+".png";
        j$(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>").css("justify-content","flex-start")
      }
    }
  }
  if(i==8)
  {
    clearInterval(intervalo);   
    eliminar=setInterval(function(){eliminarhorver()},150)  
  }
}


function eliminarhorver()
{
  matriz=0;
  rbh=horizontal()  
  rbv=vertical()    

  for(var j=1;j<8;j++)
  {
      matriz=matriz+j$(".col-"+j).children().length;
  }

  if(rbh==0 && rbv==0 && matriz!=49)  
  {
      clearInterval(eliminar);
      bnewd=0;
      newdulces=setInterval(function()
      {
        nuevosdulces()  
      },600)
  }
  if(rbh==1 || rbv==1)
  {
    j$(".elemento").draggable({ disabled: true });
    j$("div[class^='col']").css("justify-content","flex-end")
    j$(".activo").hide("pulsate",1000,function(){
      var scoretmp=j$(".activo").length;
      j$(".activo").remove("img")
      score=score+scoretmp;
      j$("#score-text").html(score)  
    })
  }

  if(rbh==0 && rbv==0 && matriz==49)
  {
    j$(".elemento").draggable({
      disabled: false,
      containment: ".panel-tablero",
      revert: true,
      revertDuration: 0,
      snap: ".elemento",
      snapMode: "inner",
      snapTolerance: 40,
      start: function(event, ui){
        mov=mov+1;
        j$("#movimientos-text").html(mov)
      }
    });
  }

  j$(".elemento").droppable({
    drop: function (event, ui) {
      var dropped = ui.draggable;
      var droppedOn = this;
      espera=0;
      do{
        espera=dropped.swap(j$(droppedOn));
      }while(espera==0)
      rbh=horizontal()  
      rbv=vertical()    
      if(rbh==0 && rbv==0)
      {
        dropped.swap(j$(droppedOn));
      }
      if(rbh==1 || rbv==1)
      {
        clearInterval(newdulces);
        clearInterval(eliminar);   
        eliminar=setInterval(function(){eliminarhorver()},150)  
      }
    },
  });
}




jQuery.fn.swap = function(b)
{
    b = jQuery(b)[0];
    var a = this[0];
    var t = a.parentNode.insertBefore(document.createTextNode(''), a);
    b.parentNode.insertBefore(a, b);
    t.parentNode.insertBefore(b, t);
    t.parentNode.removeChild(t);
    return this;
};


function nuevosdulces()
{
  j$(".elemento").draggable({ disabled: true });
  
  j$("div[class^='col']").css("justify-content","flex-start")
  for(var j=1;j<8;j++)
  {
      lencol[j-1]=j$(".col-"+j).children().length;
  }
  if(bnewd==0)
  {
    for(var j=0;j<7;j++)
    {
      lenres[j]=(7-lencol[j]);
    }
    maximo=Math.max.apply(null,lenres);
    contador=maximo;
  }
  if(maximo!=0)
  {
    if(bnewd==1)
    {
      for(var j=1;j<8;j++)
      {
        if(contador>(maximo-lenres[j-1]))
        {
          j$(".col-"+j).children("img:nth-child("+(lenres[j-1])+")").remove("img")
        }
      }
    }
    if(bnewd==0)
    {
      bnewd=1;
      for(var k=1;k<8;k++)
      {
        for(var j=0;j<(lenres[k-1]-1);j++)
        {
            j$(".col-"+k).prepend("<img src='' class='elemento' style='visibility:hidden'/>")
        }
      }
    }
    for(var j=1;j<8;j++)
    {
      if(contador>(maximo-lenres[j-1]))
      {
        numero=Math.floor(Math.random() * 4) + 1 ;
        imagen="image/"+numero+".png";
        j$(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>")
      }
    }
  }
  if(contador==1)
  {
      clearInterval(newdulces);
      eliminar=setInterval(function(){eliminarhorver()},150)
  }
  contador=contador-1;
}
						

function horizontal()
{
  var bh=0;
  for(var j=1;j<8;j++)
  {
    for(var k=1;k<6;k++)
    {
      var res1=j$(".col-"+k).children("img:nth-last-child("+j+")").attr("src")
      var res2=j$(".col-"+(k+1)).children("img:nth-last-child("+j+")").attr("src")
      var res3=j$(".col-"+(k+2)).children("img:nth-last-child("+j+")").attr("src")
      if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null))
      {
          j$(".col-"+k).children("img:nth-last-child("+(j)+")").attr("class","elemento activo")
          j$(".col-"+(k+1)).children("img:nth-last-child("+(j)+")").attr("class","elemento activo")
          j$(".col-"+(k+2)).children("img:nth-last-child("+(j)+")").attr("class","elemento activo")
          bh=1;
      }
    }
  }
  return bh;
}


function vertical()
{
  var bv=0;
  for(var l=1;l<6;l++)
  {
    for(var k=1;k<8;k++)
    {
      var res1=j$(".col-"+k).children("img:nth-child("+l+")").attr("src")
      var res2=j$(".col-"+k).children("img:nth-child("+(l+1)+")").attr("src")
      var res3=j$(".col-"+k).children("img:nth-child("+(l+2)+")").attr("src")
      if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null))
      {
          j$(".col-"+k).children("img:nth-child("+(l)+")").attr("class","elemento activo")
          j$(".col-"+k).children("img:nth-child("+(l+1)+")").attr("class","elemento activo")
          j$(".col-"+k).children("img:nth-child("+(l+2)+")").attr("class","elemento activo")
          bv=1;
      }
    }
  }
  return bv;
}