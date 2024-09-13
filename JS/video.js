var timer = false;

var video = document.getElementById('video');
var playpause = document.getElementById('playpause');
var stop = document.getElementById('stop');

playpause.addEventListener('click', PlayPauseVideo);
stop.addEventListener('click', StopVideo);

video.addEventListener('ended', FinLectureVideo);

function FinLectureVideo() {
  video.currentTime = 0;
  playpause.src = "play.png";
  if(timer != false)
  {
    clearInterval(timer);
    timer = false;
  }
  MesEffets();
}

function PlayPauseVideo()
{
  if (video.paused || video.ended){
    video.play();
    playpause.src = "pause.png";
    timer = setInterval(MesEffets, 100);
  }
  else {
    video.pause();
    playpause.src = "play.png";
    clearInterval(timer);
    timer = false;
  }
}

function StopVideo()
{
  video.pause();
  playpause.src = "play.png";
  video.currentTime = 0;
  if(timer != false)
  {
    clearInterval(timer);
    timer = false;
  }
  MesEffets();
}

function MesEffets()
{
  console.debug("Lecture : " + video.currentTime);
  if((video.currentTime > 1.0) && (video.currentTime < 1.6))
  {
    document.getElementById("mon_entete_cv").style.backgroundColor = "#C0C0C0";
  }
  if((video.currentTime > 3.5) && (video.currentTime < 4.2))
  {
    document.getElementById("mon_entete_cv").style.backgroundColor = "#F0F0F0";
    document.getElementById("titre_competences").style.backgroundColor = "#C0C0C0";

  }
  if((video.currentTime > 5.5) && (video.currentTime < 6.2))
  {
        document.getElementById("titre_competences").style.backgroundColor = "#F0F0F0";
        document.getElementById("titre_formations").style.backgroundColor = "#C0C0C0";
  }
  if((video.currentTime > 7.5) && (video.currentTime < 8.2))
  {
        document.getElementById("titre_formations").style.backgroundColor = "#F0F0F0";
  }
  if(video.currentTime == 0)
  {
    document.getElementById("mon_entete_cv").style.backgroundColor = "#F0F0F0";
    document.getElementById("titre_competences").style.backgroundColor = "#F0F0F0";
    document.getElementById("titre_formations").style.backgroundColor = "#F0F0F0";
  }
}
