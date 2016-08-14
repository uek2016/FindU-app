$(function(){
	var meiyuetianshu = [31,28,31,30,31,30,31,31,30,31,30,31];
	var currentdate = new Date();
  	var date = new Date();
  	var cells = document.getElementsByClassName('cell');

  	var $$ = function(id){
	    return document.getElementById(id);
	};

	var isToday = function(){
	    var now = new Date();
	    if(date.getFullYear() == now.getFullYear()
	       &&date.getMonth() == now.getMonth()
	       &&date.getDate() == now.getDate()){
	      return true;
	    }
	    return false;
	};
	
	var addClass = function(el,c){
	    var t = el.className.split(' ');
	    var dict = {};   
	    for(var i = 0; i<t.length; i++){
	      dict[t[i]] = true;
	    }
	    if( !dict[c] ){
	      el.className += ' ' + c;
	    }
	};
	var removeClass = function(el,c){
	    var t = el.className.split(' ');
	    var dict = {};
	    for(var i = 0; i<t.length; i++){
	      dict[t[i]] = true;
	    } 
	    delete dict[c]; var n = '';
	    for (var name in dict){n += name + ' ';}
	    el.className = n;
	};
	
	//是否为闰年
	var isLeapYear = function(Year) {
	    if (  Year % 4 == 0 && Year % 100 != 0 || Year % 400==0 ){
	    	return true;
	    } else { 
	    	return false;
	    }
	};
	var setmeiyuetianshu = function(year){
	    if( isLeapYear(year) ){
	    	meiyuetianshu[1] = 29;
	    }
	};
	
	//页面刷新再画日历之前应该调用一下
	setmeiyuetianshu();
	//前一月
	var previousMonth = function(){
	    date.setMonth(date.getMonth()-1);
    	var d = date.getDate();
		date.setDate(date.getDate()-d+1)
	};
	//后一月
	var nextMonth = function(){
	    date.setMonth(date.getMonth()+1);
	    var d = date.getDate();
		date.setDate(date.getDate()-d+1)
	};
	
  var today;
  var ondatechange = (function(){
    var currentcell;
    var dict = {1:'一',2:'二',3:'三',4:'四',5:'五',6:'六',0:'日'};
    var formate = function(){
      return date.getFullYear() + ' 年 ' + (date.getMonth() + 1) + '月 '
    };
    return function(){
      var el = $$('day_'+date.getDate() );
      var now = new Date();
      if( isToday() ){ 
        addClass(el,'today');
        removeClass(el,'today-leave');
        today = el;
      }else{
        removeClass(today,'today');
        addClass(today,'today-leave');
      }
      if( String(date.getFullYear()+date.getMonth()) !== String(now.getFullYear()+now.getMonth()) ){
        removeClass(today,'today');
        removeClass(today,'today-leave');
      }

      if( currentcell ){
        removeClass( currentcell,'cell-hover' );
      }
      addClass( el ,'cell-hover');
      currentcell = el;
//    daydate.innerHTML   = date.getDate();
//    titledate.innerHTML = formate().slice(0,-3);
      $(".lxr_extra_month")[0].innerHTML = formate();
	
    }; 
  })();
   
    var drawcalender = function(){
    setmeiyuetianshu();
    var d = date.getDate();
    var month  = date.getMonth(); date.setDate(1);
    var xingqi = date.getDay();   date.setDate(d);
    var L =  ( xingqi - 1 ) == -1 ? 6 : ( xingqi - 1 ); var i;
    //画前一个月的天
    for (  i = 0;  i < L;  i++){
      cells[i].removeAttribute('prev'); cells[i].removeAttribute('next');
      cells[i].setAttribute('prev',true);
      if( month - 1 == -1){
        cells[i].innerHTML = 31 - (L-i-1);
      }else{
        setmeiyuetianshu(date.getFullYear());
        cells[i].innerHTML = meiyuetianshu[month-1] - (L-i-1);
      }
      addClass(cells[i].parentElement,'off-month');
      cells[i].id = '';
    }
    //画本月的天;
    var tmp = new Date();
    for (  ; i < meiyuetianshu[month] + L;  i++){
      var day = i - L + 1;
      cells[i].removeAttribute('prev'); cells[i].removeAttribute('next');
      cells[i].innerHTML = day;
      cells[i].id = 'day_'+ day;
      removeClass(cells[i].parentElement,'off-month');
    }
    
    console.log(date.getDay())
    
    //画下月的天
    var left = 42 - i;
    for ( ;  i < 42;  i++){
      cells[i].removeAttribute('prev'); cells[i].removeAttribute('next');
      cells[i].id = ''; cells[i].innerHTML = left- (42-i-1);
      cells[i].setAttribute('next',true);
      addClass(cells[i].parentElement,'off-month');
    }
  }; 
  
  drawcalender();
  ondatechange();
  
  //日历月份跳转
   	touch.on('#monthbody', 'touchstart', function(ev){

	});
	
	var dx;
	var flag = 0;
	touch.on('#monthbody', 'drag', function(ev){
		dx = dx || 0;
		var offx = dx + ev.x;
		$("#monthbody")[0].style.transform = "translate3d(" + offx + "px,0,0)";
	});
	
	touch.on('#monthbody', 'dragend', function(ev){
		$("#monthbody")[0].style.transform = "translate3d(0,0,0)";

		dx += ev.x;

		if(dx < -50){
			nextMonth();
			drawcalender();
  			ondatechange();
		}else if(dx > 50){
			previousMonth();
			drawcalender();
			ondatechange();
		}
		dx = 0;
	});
   	
  
  //点击每天
   for ( var i = 0;  i < cells.length;  i++){

    cells[i].onclick = function(){
		var currentYear = date.getFullYear();
      	var currentMonth = date.getMonth();
      	var currentDate = date.getDate();
      	var targetYear,targetMonth,targetDate;
      	targetDate = Number(this.innerHTML);
      	if(this.hasAttribute('prev')){
        	targetMonth = currentMonth - 1;
        	if(targetMonth == -1){
          		targetYear = currentYear - 1;
          		setmeiyuetianshu(targetYear);
        	}
        	targetYear = currentYear;
      	}else if( this.hasAttribute('next') ){
        	targetMonth = currentMonth + 1;
        	if(targetMonth == 12){
          		argetYear = currentYear + 1;
          		setmeiyuetianshu(targetYear);
        	}
        	targetYear = currentYear;
      	}else{
        	targetYear = currentYear;
        	targetMonth = currentMonth;
      	}
      	date = new Date(targetYear,targetMonth,targetDate);
      	drawcalender();
      	ondatechange();
    }
  }
   
  var lxr_gotoday = document.getElementsByClassName("lxr_gotoday")[0];
  lxr_gotoday.onclick = function(){
    date = new Date();
    drawcalender();
    ondatechange();
  };
   
   
   
})
