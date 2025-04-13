
const upload = document.getElementById("audioUpload")
var audio = document.getElementById("audioPlayer") 
var listeSongs = document.getElementById("ListeSongs")
listeSongs.style.textAlign = "center"
let audios = []


const progressBarli = document.getElementById("listeProgresse").querySelectorAll("li")
const waveItems = document.querySelectorAll('.wave-menu li')

const colors = ["red","green","blue","black","pink"]
const index = [0,1,2,3,4,0,1,2,3,4]
var inde = null

// ###########################################


// PArtie dyal VOlume
const volume = document.querySelector(".level") 
audio.volume = 1  // Ndiro Max d volume Howa 1.0 
volume.addEventListener('input', function() { 
    audio.volume = this.value / 100 
}) 
// End of  PArtie dyal VOlume


// ###########################################


// Kat7bs L'annimation dyal dik progrsee dyal lists
waveItems.forEach(item => {
    item.style.animationPlayState = 'paused'
}) 
// End Part of L'annimation dyal dik progrsee dyal lists


// ###########################################

// Part dyal une Fois ndkhl AY audion Yamchi liya l array 3ndi
function addToListe(elem, title) {
    const li = document.createElement("li")
    const hr = document.createElement("hr")
    li.textContent = title
    const audioIndex = audios.length 
    inde = audioIndex
    let newAudio = elem.src
    audios.push(newAudio)
    li.style.cursor = "pointer"
    li.className = "audioInter"
    for (elem of listeSongs.querySelectorAll("li")) {
        elem.style.backgroundColor = "red"
    }
    li.style.backgroundColor = "green"
    li.addEventListener("click", () => {
        stopSound()
        for (elem of listeSongs.querySelectorAll("li")) {
            elem.style.backgroundColor = "red"
        }
        li.style.backgroundColor = "green"
        audio.src = audios[audioIndex]
        audio.currentTime = 0 
        playSound()
        console.log("Playing audio", audioIndex)
    }) 
    listeSongs.appendChild(li)
    listeSongs.appendChild(hr)
}

// End of Part dyal une Fois ndkhl AY audion Yamchi liya l array 3ndi

// ###########################################


// Hadi dyal Duration bL7sabb DYalha  


const duration = document.getElementById("duration")
var currentTime = document.getElementById("currentTime")

const progDuration = document.querySelector(".progDuration")

function formatTime(s) {
    const minutes = Math.floor(s / 60)
    const seconds = Math.floor(s % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

audio.addEventListener('loadedmetadata', function() {
    let durationnIntervall = setInterval(() => { 
        duration.textContent = formatTime(audio.duration)
        progDuration.max = audio.duration
        currentTime.textContent = formatTime(audio.currentTime) 
        progDuration.value = audio.currentTime 
        if (audio.currentTime == audio.duration ){   
            waveItems.forEach(item => {
                item.style.animationPlayState = 'paused'
            }) 
            clearInterval(intervall)
            clearInterval(durationnIntervall)
        }
    }, 1000)
})
progDuration.addEventListener('input', function() {
    audio.currentTime = this.value;
})

duration.style.color = "white"
currentTime.style.color = "white"


// End of Part dyal Duration bL7sabb DYalha 


// ###########################################

// Part dyal Ano Ychd audio mn input file o ydiha l balise audio 

upload.addEventListener('change', function() { 
    const file = this.files[0] 
    if (file){
        const audioURL = URL.createObjectURL(file)  // HAdi ktkhlik t creer lien b7al li ghykoun how src
        audio.src = audioURL
        const title = file.name
        console.log(audio)
        addToListe(audio,title)
        waveItems.forEach(item => {
            item.style.animationPlayState = 'running'
        }) 
        playSound()
        
    }
}) 
// End of Part dyal Ano Ychd audio mn input file o ydiha l balise audio 
 
// ###########################################

// Part dyal Audio.play()

let intervall = null

function playSound(){
    if (audio.src){
        audio.play() 
        waveItems.forEach(item => {
            item.style.animationPlayState = 'running'
        }) 
        intervall = setInterval(()=>{
            var alea = Math.floor(Math.random() * 10)
            waveItems.forEach(item => {
                item.style.backgroundColor = colors[index[alea]]
            })
        },1500)

    }
}

// End of Part dyal Audio.play()

// ########################################### 

// End of Part dyal Audio.stop()

function stopSound(){ 
    audio.pause()  
    waveItems.forEach(item => {
        item.style.animationPlayState = 'paused'
    }) 
    clearInterval(intervall)
}
// End of Part dyal Audio.play()

// ########################################### 

// Part dyal Audio.mutes =   true / false

const muteButton = document.getElementById("MuteButton")

muteButton.addEventListener("click",()=>{
    if(audio.muted){
        audio.muted = false
    }else{
        audio.muted = true
    }
})

// End of Part dyal Audio.mutes =   true / false 

// ########################################### 

// Part dyal ano ndoz l audio li 9bl Hna khdmtt b dik lista audios li fiha les audios sf o knkhdm hna b les index

function previousSound(){ 
        if (audios.length == 1) return
        inde-- // had inde deja declarito howa l'index dyal ay audio m player
        if (inde == -1) {inde = audios.length - 1}
        if (audios[inde]) {
            stopSound()
            audio.src = audios[inde]
            audio.currentTime = 0 
            playSound()
        }
}

// End of Part dyal ano ndoz l audio li 9bl


// ########################################### 

// Part dyal ndoz l audio li 9bl nfss pricipe d li 9bal 

function nextSound(){
    if (audios.length == 1) return
    inde++
    if (inde == audios.length) {
        inde = 0
    } 
    if (audios[inde]) {
            stopSound()
            audio.src = audios[inde] 
            audio.currentTime = 0 
            playSound()
        }
}


// End of Part dyal ndoz l audio li 9bl nfss pricipe d li 9bal


// Hadchi li kyn ay copie coller nd3ik HHHH 

/*                                               
 *         .-~~~~~-.
 *       .'         '.
 *      /   O     O   \
 *     :               :
 *     |   '.      .'  |
 *     :     '---'    .'
 *      \            /
 *       '.        .'
 *         '-...-''
 */ 

/*
 *     ╭─────────────╮
 *     │  ( •_•)     │  <<< Attentio.
 *     │  (⌐■_■)     │
 *     ╰─────────────╯
 *     ︻デ═一💥      <<< Pew pew!
 */