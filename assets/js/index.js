const video = document.createElement("video");

const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d", {willReadFrequently: true});

const btnScanQR= document.getElementById("btn-scan-qr");

let scanning = false;
let scannedURL = "";
let windowOpened = false;

const encenderCamara = ()=>{
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
        scanning = true;
        btnScanQR.hidden = true;
        canvasElement.hidden = false;
        video.setAttribute("playsinline", true); 
        video.srcObject = stream;
        video.play();
        tick();
        scan();
    });
};

const cerrarCamara = () => {
  video.srcObject.getTracks().forEach((track) => {
    track.stop();
  });
  canvasElement.hidden = true;
  btnScanQR.hidden = false;
  windowOpened = false;

};

function tick(){
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

    scanning && requestAnimationFrame(tick);
}

function scan(){
    try{
        qrcode.decode();
    }catch(e){
        setTimeout(scan, 300);
    }
}

  
  const activarSonido = () => {
    var audio = document.getElementById('audioScaner');
    audio.play();
  };

    qrcode.callback = (respuesta) => {
    if (respuesta && !windowOpened) {
     /*  Swal.fire({
        text: respuesta,
        icon:'success',
        confirmButtonText: 'Aceptar'
      }) */
     window.open(respuesta);
     windowOpened = true;
      activarSonido();   
      cerrarCamara();
      scannedURL = respuesta;
    
      
    }
  };



  window.addEventListener('load', (e) => {
    encenderCamara();
  })
  
  
  