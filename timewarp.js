/* Time Warp Script v0.1.0
 * (c)2014 Jonathan Slattery
 */

//Define a timewarp namespace for extensions
var timewarp = (window.timewarp || {});

/* Extending the base Built-in Date class with an isDate(d) detection method to identify date objects...
 */

Date.isDate = function (date d) { return (undefined !== d) && (null !== d) && !isNaN(d) && (undefined !== d.getDate); };


/* Returns a new Date based on the current Date, plus an interval.
 * 
 * This Extends Date Object instances to be able to do date math and calculate a new time based on a provided interval.
 * (Since Date objects *are* essentially just intervals in milliseconds, we can use them to represent intervals
 * for the sake of calculation purposes. Obviously, the direct Date information of an interval is meaningless, 
 * but this is just a mechanic for handling the date/time math to get useful date comparisons, calculations, etc
 * from javascript's kludgy date objects and methods.)
 * 
 * Two function signatures:
 * addInterval(date interval) :
 *   returns a new Date representing the current date plus a provided interval.
 * 
 * addInterval(int years, int months, int days, int hours, int minutes, int seconds, int milliseconds) : Generates an interval from simple 
 *   units of time (any parameters omitted are assumed zero), and returns a new Date based on the 
 *   current date plus the interval.
 */

Date.prototype.addInterval = function (years, months, days, hours, minutes, seconds, milliseconds) {
 var args = Array.prototype.slice.call(arguments), newDate, interval = 0;

 /*check for a single date param vs all; date is interval, number is interval as milliseconds;anything else gets converted interval of zero (epoch) */
 if (args.length === 1) {
  if (Date.isDate(args[0])) {
   interval = args[0];
  } else if (typeof args[0] === 'number') {
   interval = new Date(args[0]);
  } else {
   interval = new Date(0);
  }

  newDate = new Date(this.getTime()+interval.getTime());

 } else {
  years = years || 0;
  months = months || 0;
  days = days || 0;
  hours = hours || 0;
  minutes = minutes || 0;
  seconds = seconds || 0;
  milliseconds = milliseconds || 0;

  newDate = new Date(this.getFullYear()+years,this.getMonth()+months,this.getDate()+days,this.getHours()+hours,this.getMinutes()+minutes,this.getSeconds()+seconds,this.getMilliseconds()+milliseconds);

 }
 return newDate;
};

/* Returns an interval (date object) containting the time difference between the current date and the CompareDate
 * Two Function signatures:
 * getInterval(date CompareDate) : (Naturally) takes a Date Object as the compare date for calculation.
 * getInterval(int CompareDateMilliseconds) : takes an integer date representation, converts to a date, and calculates the interval. (assumed to be an interval in milliseconds from the unix epoch, usable for defining dates in Javascript).
 */
 Date.prototype.getInterval = function (compareDate) {
 var interval, cd = compareDate;
 if (typeof cd === 'number'){
  cd = new Date(cd);
 }
 interval = cd.getTime() - this.getTime();
 return new Date(interval);
};

