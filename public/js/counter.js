counter = function (eventDate, slotNumber, count){

	Date.prototype.addDays = function(days) {
	  var dat = new Date(this.valueOf());
	  dat.setDate(dat.getDate() + days);
	  return dat;
	}

	var message
	var countdown = {}
	var signupDate
	var slotsLeft = slotNumber - count

	var now = new Date()
	eventDate = new Date(eventDate)

	if (slotsLeft >= 3) {signupDate = eventDate.addDays(-32)}
	if (slotsLeft === 2) {signupDate = eventDate.addDays(-7)}
	if (slotsLeft === 1) {signupDate = eventDate.addDays(-1)}

	var mil = signupDate - now 
	var seconds = (mil / 1000) | 0;
	mil -= seconds * 1000;

	var minutes = (seconds / 60) | 0;
	seconds -= minutes * 60;

	var hours = (minutes / 60) | 0;
	minutes -= hours * 60;

	var days = (hours / 24) | 0;
	hours -= days * 24;

	var weeks = (days / 7) | 0;
	days -= weeks * 7; 

	if (slotsLeft === 0){message = "sorry, this event is full"; signupLink = false} else {
		message = "next signup in " + weeks + " weeks, " + days + " days and " + hours + " hours.";
		signupLink = false
	}

	if (mil <= 0) {message = "sign-up now!"; signupLink = true}

	countdown.message = message
    countdown.signupLink = signupLink
	return countdown
}
