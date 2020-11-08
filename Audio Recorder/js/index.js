let audioIN = { audio: true }; 
//  audio is true, for recording 

// Access the permission for use 
// the microphone 
navigator.mediaDevices.getUserMedia(audioIN) 

    // 'then()' method returns a Promise 
.then(function (mediaStreamObj) { 

    // Connect the media stream to the 
    // first audio element 
    let audio = document.querySelector('audio'); 
    //returns the recorded audio via 'audio' tag 

    // 'srcObject' is a property which  
    // takes the media object 
    // This is supported in the newer browsers 
    if ("srcObject" in audio) { 
        audio.srcObject = mediaStreamObj; 
    } else {   // Old version 
        audio.src = window.URL.createObjectURL(mediaStreamObj); 
    } 

    // It will play the audio 
    audio.onloadedmetadata = function (ev) { 
        // Play the audio in the 2nd audio 
        // element what is being recorded 
        // audio.play(); 
    }; 

    // start stop button
    let startStop = document.getElementById('btnStartStop'); 

    // 2nd audio tag for play the audio 
    let divPreview = document.getElementById('preview');
    let playAudio = document.getElementById('audioPlay'); 

    // download
    let autoDownload = document.getElementById('autoDownload');
    let downloadLink = document.getElementById('downloadLink');

    // This is the main thing to recorde  
    // the audio 'MediaRecorder' API 
    let mediaRecorder = new MediaRecorder(mediaStreamObj); 
    // Pass the audio stream  

    // Start event 
    startStop.addEventListener('click', function (ev) { 
        // console.log(mediaRecorder.state); 
        if (startStop.innerHTML == "►") {
            mediaRecorder.start(); 
            startStop.innerHTML = "&#9646";
            startStop.title = "Stop Recording";
        } else {
            mediaRecorder.stop(); 
            startStop.innerHTML = "&#9658";
            startStop.title = "Start Recording";
        }
    }) 

    // If audio data available then push  
    // it to the chunk array 
    mediaRecorder.ondataavailable = function (ev) { 
        dataArray.push(ev.data); 
    } 

    // Chunk array to store the audio data  
    let dataArray = []; 

    // hide some fields and restart some values
    mediaRecorder.onstart = function(ev) {
        playAudio.src = ""; 
        divPreview.style.display = "none";
    }

    // Convert the audio data in to blob  
    // after stopping the recording 
    mediaRecorder.onstop = function (ev) { 

        // blob of type mp3 
        let audioData = new Blob(dataArray,  
            { 'type': 'audio/mp3;' }); 
            
        // After fill up the chunk  
        // array make it empty 
        dataArray = []; 
        // Creating audio url with reference  
        // of created blob named 'audioData' 
        let audioSrc = window.URL.createObjectURL(audioData); 

        // Pass the audio url to the 2nd video tag 
        playAudio.src = audioSrc; 
        
        divPreview.style.display = "block";

        if (autoDownload.checked == true) {
            downloadLink.href = audioSrc;
            downloadLink.click();
        }
    } 
}) 

// If any error occurs then handles the error  
.catch(function (err) { 
    console.log(err.name, err.message); 
}); 