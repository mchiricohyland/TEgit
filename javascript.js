function main(){
    document.getElementById("previous").style.backgroundColor = "grey";
}

function NavigateRight(){
    var img = document.getElementById("q");

    if(img.getAttribute("src") === "Q1.PNG")
    {
        img.setAttribute("src", "Q2.png");
        document.getElementById("previous").style.backgroundColor = "black";
    }
    else if(img.getAttribute("src") === "Q2.png")
    {
        img.setAttribute("src", "Q3.png");
        document.getElementById("next").style.backgroundColor = "grey";
    }
}

function NavigateLeft(){
    var img = document.getElementById("q");

    if(img.getAttribute("src") === "Q2.png")
    {
        img.setAttribute("src", "Q1.PNG");
        document.getElementById("previous").style.backgroundColor = "grey";
    }
    else if(img.getAttribute("src") === "Q3.png")
    {
        img.setAttribute("src", "Q2.png");
        document.getElementById("next").style.backgroundColor = "black";
    }
}

