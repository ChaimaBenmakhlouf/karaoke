window.addEventListener('DOMContentLoaded', function () {
  var lyrics = document.querySelector(".lyrics")
	let ajax = new XMLHttpRequest()
	var paroles = ""
  var parolesMap = new Map()
	ajax.addEventListener('readystatechange', function() {
    if (this.readyState == 4 && this.status == 200) {
    	paroles = this.responseText
          var array = paroles.split('\n')
    array.forEach(function(line) {
      let myLine = line.substr(1)
      let tab = myLine.split(']')
      let rightTime = tab[0].slice(0, -3)
      parolesMap.set(rightTime, tab[1])
    });
    }
  })
  ajax.open("GET", "parole.txt", true);
  ajax.send()
  audio.addEventListener('play', function() {
  })

  audio.addEventListener('timeupdate',function(){
    var currentTime = audio.currentTime;
    let time = msToTime(currentTime * 1000);
    let time1 = msToTime((currentTime - 1) * 1000);
    let time2 = msToTime((currentTime - 2) * 1000);
    let time3 = msToTime((currentTime - 3) * 1000);
    let time4 = msToTime((currentTime - 4) * 1000);

      lyrics.innerText = ""
    if (parolesMap.has(time)) {
      lyrics.innerText = parolesMap.get(time)
    } else if (parolesMap.has(time1)) {
      lyrics.innerText = parolesMap.get(time1)
    } else if (parolesMap.has(time2)) {
      lyrics.innerText = parolesMap.get(time2)
    } else if (parolesMap.has(time3)) {
      lyrics.innerText = parolesMap.get(time3)
    } else if (parolesMap.has(time4)) {
      lyrics.innerText = parolesMap.get(time4)
    }
  },false);

  function msToTime(duration) {

    var seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),

  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return minutes + ":" + seconds;
}

})


       