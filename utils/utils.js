const remainingSlots = (event) => {
  let count = 0;
  for (var x = 0; x < event.slotNumber; x++) {
    if (event.slots[x].title != undefined) {
      count++;
    }
  }
  return event.slotNumber - count;
};

const calculateSignupDate = (event, slotsLeft, signupIntervals) => {
  signupIntervals.sort(function (a, b) {
    return b - a;
  });

  Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
  };

  let signupDate;

  eventDate = new Date(event.date.toDateString());

  if (slotsLeft >= 3) {
    signupDate = eventDate.addDays(signupIntervals[2]);
  }
  if (slotsLeft === 2) {
    signupDate = eventDate.addDays(signupIntervals[1]);
  }
  if (slotsLeft === 1) {
    signupDate = eventDate.addDays(signupIntervals[0]);
  }

  return signupDate;
};

module.exports.remainingSlotLengths = (defaultSlotTimes, slots, slotNo) => {
  const remainingSlotTimes = [];

  defaultSlotTimes.sort((a, b) => b - a);

  // populate remainingSlotTimes with all potential slots
  for (let i = 0; i < slotNo; i++) {
    let index = i >= defaultSlotTimes.length ? defaultSlotTimes.length - 1 : i;
    remainingSlotTimes.push(defaultSlotTimes[index]);
  }

  // remove already booked slots
  slots.forEach((slot) => {
    if (slot.duration !== null) {
      remainingSlotTimes.splice(remainingSlotTimes.indexOf(slot.duration), 1);
    }
  });

  return remainingSlotTimes;
};

module.exports.generateCountdownMessage = (event, signupIntervals) => {
  let slotsLeft = remainingSlots(event);
  let signupDate = calculateSignupDate(event, slotsLeft, signupIntervals);

  let countdown = signupDate - new Date();

  let seconds = (countdown / 1000) | 0;
  countdown -= seconds * 1000;

  let minutes = (seconds / 60) | 0;
  seconds -= minutes * 60;

  let hours = (minutes / 60) | 0;
  minutes -= hours * 60;

  let days = (hours / 24) | 0;
  hours -= days * 24;

  let weeks = (days / 7) | 0;
  days -= weeks * 7;

  if (slotsLeft === 0) {
    message = 'sorry, this event is full';
    signupLink = false;
  } else {
    message =
      'next signup in ' +
      weeks +
      ' weeks, ' +
      days +
      ' days and ' +
      hours +
      ' hours.';
    signupLink = false;
  }

  if (countdown <= 0) {
    message = 'sign-up now!';
    signupLink = true;
  }

  return { message, signupLink };
};

module.exports.filterFutureEvents = (events) => {
  const today = new Date();
  const oneDay = 86400000;
  const yesterday = new Date(today - 1 * oneDay);
  return events.filter((event) => yesterday.getTime() <= event.date.getTime());
};
