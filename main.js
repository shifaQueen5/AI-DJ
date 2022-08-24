    scoreRightWrist = "";
    scoreLeftWrist = "";
    LeftWristX = "";
    RightWristX = "";
    LeftWristY = "";
    RightWristY = "";
    song1 = "";
function preload(){
    song1 = loadSound("music.mp3");
}
function playSong(){
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
}
function setup(){
    canvas = createCanvas(500,400);
    canvas.position(500,200);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}
function modelLoaded(){
    console.log("Posenet is Initialized");
}
function gotPoses(results){
  // console.log(results);
   if(results.length > 0){
    scoreRightWrist = results[0].pose.keypoints[10].score;
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    LeftWristX = results[0].pose.leftWrist.x;
    RightWristX = results[0].pose.rightWrist.x;
    LeftWristY = results[0].pose.leftWrist.y;
    RightWristY = results[0].pose.rightWrist.y;
}
}
function draw(){
    image(video,0,0,500,400);
    fill("#FF0000");
    stroke("#FF0000");
    //console.log("scorerightWrist ="+ scoreRightWrist);
    if(scoreRightWrist > 0.2){
        circle(RightWristX,RightWristY,30);
        if(RightWristY > 0 && RightWristY <= 100){
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song1.rate(0.5);
        }
        else if(RightWristY > 100 && RightWristY <= 200){
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song1.rate(1);
        }
        else if(RightWristY > 200 && RightWristY <= 300){
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song1.rate(1.5);
        }
        else if(RightWristY > 300 && RightWristY <= 400){
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song1.rate(2);
        }
        else if(RightWristY > 400){
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song1.rate(2.5);
        }
    }

    if (scoreLeftWrist > 0.2){
        circle(LeftWristX,LeftWristY,20);
        InNumberleftWristY = Number(LeftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song1.setVolume(volume);
    }
}