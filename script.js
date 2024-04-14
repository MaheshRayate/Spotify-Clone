
console.log("JS code");

let currentSong=new Audio();

function formatSecondsToMinutesAndSeconds(totalSeconds) {
    totalSeconds=Math.floor(totalSeconds);
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = Math.floor(totalSeconds % 60);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

//returns all the songs in the playlist
async function getSongs(){
    // let a=await fetch("http://127.0.0.1:5501/Songs1/");
    // let a = await fetch("https://github.com/MaheshRayate/Spotify-Clone/tree/main/Songs1");
    console.log("Hello");
    let a=await fetch("../songs1/");
    let response = await a.text();
    // console.log(response);
    // The songs will be in the format of ul we need to parse each song

    // console.log(response);
    let songsFile=document.createElement("div");
    // console.log(songsFile);
    songsFile.innerHTML=response;

    let as=songsFile.getElementsByTagName("a");
    // console.log(as);

    let songs=[];

    for(let i=0;i<as.length;i++)
    {
        const element=as[i];

        if(element.href.endsWith(".mp3"))
        {
            // console.log(element);
            // let a=element.href.split("/Songs1/")[1];
            // console.log(a);
            songs.push(element.href.split("/songs1/")[1]);
            // console.group(element.href);
        }
    }

    return songs;

}

const playSong=(song)=>
{
    // let audio=new Audio("/55.SPOTIFY%20CLONE/Songs1/"+song);
    // currentSong.src="/Songs1/"+song;
    // currentSong.src = "https://github.com/MaheshRayate/Spotify-Clone/tree/main/Songs1" + song;
    currentSong.src = "/songs1/" + song;
    
    currentSong.play();

    play.src="pause.svg";
    document.querySelector(".song-info").innerHTML=song;
    document.querySelector(".song-time").innerHTML="";

}

async function main()
{

    //Get the list of all the songs
    let songs=await getSongs();
    // console.log(songs);
    // currentSong.src=songs[0];
    console.log(songs[0]);
    // playSong(songs[0]);
    // currentSong.src="http://127.0.0.1:5501/Songs1/ArjanVailly.mp3";

    // currentSong.src = "https://maheshrayate.github.io/Spotify-Clone/Songs1/ArjanVailly.mp3" ;
    currentSong.src = "/songs1/ArjanVailly.mp3" ;

    document.querySelector(".song-info").innerHTML="ArjanVaily.mp3";
    document.querySelector(".song-time").innerHTML="00:00/03:02";


    let songUL=document.querySelector(".songlist").getElementsByTagName("ul")[0];
    console.log(songUL);

    for (const song of songs) {

        songUL.innerHTML=songUL.innerHTML+`<li><img src="music.svg" alt="music svg" class="invert">
        <div class="songNameAndArtist">
            <div class="songname">${song.replaceAll("http://127.0.0.1:5501/","")}</div>
            <div class="artist">Artist Name</div>
        </div>
        <img src="play3.svg" alt="playbutton" class="invert play"></img> </li>`
        ;

        
    }

    //Attaching an event listener to each song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",element=>{
            console.log(e.querySelector(".songNameAndArtist").firstElementChild.innerHTML)
            e.querySelector(".songNameAndArtist").firstElementChild.innerHTML=e.querySelector(".songNameAndArtist").firstElementChild.innerHTML;

            playSong(e.querySelector(".songNameAndArtist").firstElementChild.innerHTML);
        });

    })

    play.addEventListener("click",()=>{
        if(currentSong.paused)
        {
            currentSong.play();
            play.src="pause.svg"
        }

        else
        {
            currentSong.pause();
            play.src="play3.svg"
        }
    })

    //Listen for time update event
    currentSong.addEventListener("timeupdate",()=>
    {
        // currentSong.duration=;
        // console.log(Math.floor(currentSong.currentTime), Math.floor(currentSong.duration));
        document.querySelector(".song-time").innerHTML=`${formatSecondsToMinutesAndSeconds(Math.floor(currentSong.currentTime))}/${formatSecondsToMinutesAndSeconds(Math.floor(currentSong.duration))}`;
        document.querySelector(".circle").style.left=(currentSong.currentTime/currentSong.duration)*100+"%";
    })

    //Adding an event listener to seekbar
    document.querySelector(".seekbar").addEventListener("click",e=>{
        // console.log(e);
        // currentSong.currentTime=
        let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100;

        document.querySelector(".circle").style.left=percent+"%";

        currentSong.currentTime=((currentSong.duration)*percent)/100;
    })

    //Adding an event listener for hamburger button
    document.querySelector(".hamburger").addEventListener("click",()=>{
        document.querySelector(".left").style.left="0";

    })

    //Adding an event listener to cancel button
    document.querySelector(".cancel").addEventListener("click",()=>{
        document.querySelector(".left").style.left="-100%";

    })


}

main();

