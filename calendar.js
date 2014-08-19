//Requires timewarp.js
//Requires jQuery.js

(function ($) {
 window.timewarp = (window.timewarp || {}); var timewarp = window.timewarp;

 timewarp.calendar = {months:{January:0,February:1,March:2,April:3,May:4,June:5,July:6,August:7,September:8,October:9,November:10,December:11},events:{}};

 timewarp.calendar.batch = function(debug) {
  var now = new Date(), evt;
  debug = !!debug;
  for (evt in timewarp.calendar.events) {
   if (timewarp.calendar.events.hasOwnProperty(evt)) {
    if (timewarp.calendar.events[evt].inclusive === undefined) {
     timewarp.calendar.events[evt].inclusive = true; /*defaults to true*/
    }

    if (timewarp.calendar.events[evt].inclusive) {
     /*Inclusive: Check from start date through the end-of-day on End date*/
     if (debug || (now >= timewarp.calendar.events[evt].startdate && now < timewarp.calendar.events[evt].enddate.addInterval(0,0,1) ) ){
      /*date match successful*/
      $('body').addClass(evt);

      if (timewarp.calendar.events[evt].init && typeof timewarp.calendar.events[evt].init === 'function'){
       timewarp.calendar.events[evt].init();
      }
     }
    } else {
     /*Exclusive: Check from start date Through End date ONLY (not including the rest of day) */
     if (debug || (now >= timewarp.calendar.events[evt].startdate && now <= timewarp.calendar.events.enddate ) ){
      /*date match successful*/
      $('body').addClass(evt);

      if (timewarp.calendar.events[evt].init && typeof timewarp.calendar.events[evt].init === 'function'){
       timewarp.calendar.events[evt].init();
      }
     }
    }
   }
  }
 };

 /*Define Events*/
 timewarp.calendar.events.mosslaborday = {
  startdate: new Date(2014,timewarp.calendar.months.August,18),
  enddate: new Date(2014,timewarp.calendar.months.September,2),
  inclusive: true,
  init: function (){ $('<a id="moss-labor-day-banner" class="ad banner vertical" href="/new-inventory/index.htm" ><img src="[BANNER_GRAPHIC_HERE]" alt="Moss Bros. Labor Day Sales Event" ></a>').css({position:'fixed',right:'10px',top:'50%','margin-top':'-250px',display:'none'}).find('img').css({height:'500px'}).end().appendTo('body').fadeIn(1000,function(){window.setTimeout(function(){$('#moss-labor-day-banner').fadeOut(1000);},25000);});}
};

 timewarp.calendar.events.megausedcarsale = {
  startdate: new Date(2014,timewarp.calendar.months.September,5),
  enddate: new Date(2014,timewarp.calendar.months.September,12),
  inclusive: true,
  init: function (){ $('<a id="moss-mega-used-car-sale-banner" class="ad banner vertical" href="/used-inventory/index.htm" ><img src="[BANNER_GRAPHIC_HERE]" alt="Moss Bros. MEGA Used Car Sales Event" ></a>').css({position:'fixed',right:'10px',top:'50%','margin-top':'-250px',display:'none'}).find('img').css({height:'500px'}).end().appendTo('body').fadeIn(1000,function(){window.setTimeout(function(){$('#moss-mega-used-car-sale-banner').fadeOut(1000);},25000);});}
};

/* //Expired Events
 timewarp.calendar.events.gmopenhouse = {startdate:new Date(2014,timewarp.calendar.months.March,1), enddate:new Date(2014,timewarp.calendar.months.March,31), inclusive:true};
 timewarp.calendar.events.ramtruckmonth = {startdate:new Date(2014,timewarp.calendar.months.February,1), enddate:new Date(2014,timewarp.calendar.months.March,31), inclusive:true};
 timewarp.calendar.events.hondagolgol = {
  startdate: new Date(2014,timewarp.calendar.months.March,1),
  enddate: new Date(2014,timewarp.calendar.months.March,31),
  inclusive: true,
  init: function (){ $('<a id="hondaadbannervert" class="ad banner vertical" href="http://www.mossbroshondamorenovalley.com/new-inventory/index.htm?year=2014&make=Honda&model=Civic&bodyStyle=Coupe" ><img src="http://pictures.dealer.com/m/mossbrosgroup/0446/66c9105180265d50b662c268acb3b1dcx.jpg" alt="" ></a>').css({position:'fixed',right:'10px',top:'50%','margin-top':'-250px',display:'none'}).find('img').css({height:'500px'}).end().appendTo('body').fadeIn(1000,function(){window.setTimeout(function(){$('#hondaadbannervert').fadeOut(1000);},15000);});}
 };
*/



 /*Run the Events*/
 timewarp.calendar.batch();
}(jQuery));
