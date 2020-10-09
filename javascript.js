function main(){
    ShowQuestion("Q1");
}

function Answer(currentQuestion, nextQuestion){
    HideQuestion(currentQuestion);
    ShowQuestion(nextQuestion);

    if(nextQuestion === "FINAL")
    {
        DisplayAnswer();
    }
}

function HideQuestion(question){
    document.getElementById(question).style.display = "none";
}

function ShowQuestion(question){
    document.getElementById(question).style.display = "block";
}
