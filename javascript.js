function main(){
    
}

function NavigateRight(){
    var img = document.getElementById("q");

    if(img.getAttribute("src") === "Q1.png")
    {
        img.setAttribute("src", "Q2.png");
    }
    else if(img.getAttribute("src") === "Q2.png")
    {
        img.setAttribute("src", "Q3.png");
    }
}

function NavigateLeft(){
    var img = document.getElementById("q");

    if(img.getAttribute("src") === "Q2.png")
    {
        img.setAttribute("src", "Q1.png");
    }
    else if(img.getAttribute("src") === "Q3.png")
    {
        img.setAttribute("src", "Q2.png");
    }
}

