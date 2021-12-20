prediction_2=""
prediction_1=""
Webcam.set({
    width: 350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera= document.getElementById("camera");
Webcam.attach('#camera');
function takesnap(){
    Webcam.snap(function(data_uri){
        document.getElementById("precam").innerHTML='<img id="spc" src="'+data_uri+'"/>';
    });
}
console.log('ml5 version', ml5.version);
classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/H2VOLojCC/.js.json,modelLoaded');
function modelLoaded(){
    console.log('modelLoaded');
}
 function speak(){
    var synth= window.speechSynthesis;
    speak1="The first Prediction is"+prediction_1;
    speak2="The Second Prediction is"+prediction_2;
    var utterThis= new SpeechSynthesisUtterance(speak1+speak2);
    synth.speak(utterThis)
} 
function predict(){
    img=document.getElementById("spc");
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
    if (error){
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML= results[0].label;
        document.getElementById("result_emotion_name2").innerHTML= results[1].label;
        prediction_1= results[0].label;
        prediction_2= results[1].label;
        speak();
        if (results[0].label=="happy"){
            document.getElementById("update_emoji").innerHTML="&#128522;";
}
if (results[0].label=="nice"){
    document.getElementById("update_emoji").innerHTML="&#128532;";
}
if (results[1].label=="happy"){
    document.getElementById("update_emoji2").innerHTML="&#128522;";
}
if (results[1].label=="nice"){
document.getElementById("update_emoji2").innerHTML="&#128532;";
}


    }
}
