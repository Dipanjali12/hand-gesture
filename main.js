prediction1 = "";
prediction2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function capture() {
    Webcam.snap(function (data) {
        document.getElementById("result").innerHTML = "<img src=" + data + " id='img'>"
    });
}

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/xQRttb4CE/model.json", modelLoaded)
console.log(ml5.version);

function modelLoaded() {
    console.log("modelLoded");
}

function check() {
    img=document.getElementById("img");
    classifier.classify(img,gotResult);
}

function speak() {
    synth = window.speechSynthesis;
    s1 = "The first prediction is " + prediction1;
    s2 = "And the second prediction is " + prediction2;
    utter = new SpeechSynthesisUtterance(s1 + s2);
    synth.speak(utter);
}


function gotResult(error,result){
if (error){
    console.error(error);
}else{
console.log(result);
prediction1=result[0].label;
prediction2=result[1].label;
document.getElementById("hand1").innerHTML=prediction1;
document.getElementById("hand2").innerHTML=prediction2;
speak();
if(prediction1=="ok"){
    document.getElementById("emoji1").innerHTML="👌";
}else if(prediction1=="thumbs-up"){
    document.getElementById("emoji1").innerHTML="👍";
}else{
    document.getElementById("emoji1").innerHTML="✌";
}

if(prediction2=="ok"){
    document.getElementById("emoji2").innerHTML="👌";
}else if(prediction2=="thumbs-up"){
    document.getElementById("emoji2").innerHTML="👍";
}else{
    document.getElementById("emoji2").innerHTML="✌";
}

}

}







































