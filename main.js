function preload() {
    classifier = ml5.imageClassifier("DoodleNet");
}

function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
    synth = window.SpeechSynthesis;
    canvas.mouseReleased(classifyCanvas);
}

function draw() {
    strokeWeight(13);
    stroke(0);

    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function clear() {
    background("white");
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);

    document.getElementById("label").innerHTML = "Label: " + results[0].label;
    document.getElementById("confidence").innerHTML = "Confidence: " + Math.round(results[0].confidence*100);

    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}