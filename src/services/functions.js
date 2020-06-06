export const EORZEA_MULTIPLIER = 3600 / 175 // 60 minutes = 2 minutes, 55 seconds

export function addZero(num) {
  return (num >= 0 && num < 10) ? "0" + num : num + "";
}

export function nth(d) {
  if(d > 3 && d < 21) return d + 'th';
  switch(d % 10) {
    case 1:  return d + "st";
    case 2:  return d + "nd";
    case 3:  return d + "rd";
    default: return d + "th";
  }
}

export function formatTime(dt, showSeconds = false) {
  let date = new Date(dt * 1000);
  let hours = (((date.getHours() + 11) % 12) + 1);
  let minutes = addZero(date.getMinutes());
  let seconds = addZero(date.getSeconds());
  let ampm = (date.getHours() > 11 ? "p.m." : "a.m.");
  
  if(showSeconds) { 
    return `${hours}:${minutes}:${seconds} ${ampm}`;
  }

  return `${hours}:${minutes} ${ampm}`;
}

export function formatDate(dt) {
  const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  let date = new Date(dt * 1000);
  let time = formatTime(dt, true);

  let weekday = days[date.getDay()];
  let month = months[date.getMonth()];
  let day = nth(date.getDate());

  return `${weekday} ${month} ${day} at ${time}`;
}

export function formatTimeSpan(time) {
  let start = (((time[0] + 11) % 12) + 1) + (time[0] > 11 ? "pm" : "am");
  let end = (((time[1] + 11) % 12) + 1) + (time[1] > 11 ? "pm" : "am");
  return `${start} to ${end}`;     
}

export function humanizeDuration(duration) {
  var quantifiers = [
    [60, 1, "less than a minute"],
    [120, 1, "a minute"],
    [3600, 60, "%d minutes"],
    [7200, 1, "an hour"],
    [86400, 3600, "%d hours"],
    [172800, 1, "a day"],
    [604800, 86400, "%d days"],
    [1209600, 1, "a week"],
    [Infinity, 604800, "%d weeks"]
  ];

  for(var i = 0; i < quantifiers.length; i++) {
    if(duration < quantifiers[i][0]) {
      return quantifiers[i][2].replace(/%d/g, Math.floor(duration / quantifiers[i][1]));
    }
  }
  return "a really long time";
}

export function getEorzeaTime(unixSeconds = Date.now()) {
  return Math.round(unixSeconds * EORZEA_MULTIPLIER)
}

export function getEarthTime(unixSeconds) {
  return Math.round(unixSeconds / EORZEA_MULTIPLIER)
}

export function getWeatherFromTime(unixSeconds) {
  var bell = unixSeconds / 175
  var increment = (bell + 8 - (bell % 8)) % 24
  var totalDays = ((unixSeconds / 4200) << 32) >>> 0
  var calcBase = totalDays * 100 + increment
  var step1 = ((calcBase << 11) ^ calcBase) >>> 0
  var step2 = ((step1 >>> 8) ^ step1) >>> 0
  return step2 % 100
}

export function getZoneWeather(rates, date) {
  var weather = getWeatherFromTime(date)
  for (var i = 0; i < rates.length; i++) {
    if (weather < rates[i].rate) {
      return rates[i].weather
    }
  }
  return 'the fuck'
}

export function isLogTimeActive(item, now = Date.now() / 1000) {
  var eNow = getEorzeaTime(now)
  var time = Math.floor(eNow / 3600) % 24;

  var start = item.time[0]
  var end = item.time[1]

  return (
    (start <= end && start <= time && time < end) ||
    (start > end && (start <= time || time < end))
  )
}

export function isLogWeatherActive(item, now = Date.now() / 1000) {
  let weather = getZoneWeather(item.weatherRate, now);
  return item.weather.includes(weather);
}

export function isLogActive(item, now = Date.now() / 1000) {
  return isLogTimeActive(item, now) && isLogWeatherActive(item, now);
}

export function getNextActive(item, time = Date.now() / 1000) {
  const { time: [startTime, endTime] } = item;
  const baseEpoch = Math.floor(time * EORZEA_MULTIPLIER / (3600 * 24)) * (3600 * 24);
  const timeLength = endTime < startTime ? (endTime + 24) - startTime : endTime - startTime;
  for (let i = 0; i < 24 * 30; i++) {
    let eNow = baseEpoch + 3600 * 24 * Math.floor(i / timeLength) + 3600 * (startTime + (i % timeLength));
    if (isLogWeatherActive(item, eNow / EORZEA_MULTIPLIER)) {
      return eNow / EORZEA_MULTIPLIER;
    }
  }

  throw new Error('Infinite loop detected!')
}

export function getNextActiveEnd(item, time = Date.now() / 1000) {
  var eNow = isLogActive(item)
    ? Math.floor(time * EORZEA_MULTIPLIER / 3600) * 3600
    : getNextActive(item) * EORZEA_MULTIPLIER;

  while ((eNow / 3600) % 24 !== item.time[1]) {
    if (!isLogActive(item, eNow / EORZEA_MULTIPLIER)) {
      return eNow / EORZEA_MULTIPLIER;
    }

    eNow += 3600;
  }

  return eNow / EORZEA_MULTIPLIER;
}
