function load_webcam(){

    Webcam.set({
        width:350,
        height:300,
        img_format:"png",
        png_quality:90
    });

    camera = document.getElementById("camera");

    Webcam.attach("#camera");

}

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img src='" + data_uri + "' id='captured_image'>";
    });
}

console.log("ml5 version: ", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/gF4fcUdkWj/model.json",modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}

function classify(){
    image = document.getElementById("captured_image");
    classifier.classify(image, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("emoji_name").innerHTML = results[0].label;
        prediction = results[0].label;
        if(results[0].label == "Best"){
            document.getElementById("emoji").innerHTML = "&#128077";
        }else if(results[0].label == "Victory"){
            document.getElementById("emoji").innerHTML = "&#9996";
        }else if(results[0].label == "Amazing"){
            document.getElementById("emoji").innerHTML = "&#128076";
        }else if(results[0].label == "Punch"){
            document.getElementById("emoji").innerHTML = "&#9994";
        }else{
            document.getElementById("emoji").innerHTML = "&#128075";
        }
    }
}