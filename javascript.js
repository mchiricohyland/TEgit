function main(){
    var myDiv = document.getElementById("myDropdown");
    var array = [{html: "index.html", title: "Home"}, 
    {html: "TestCaseDataInfo.html", title: "Test Case Data Info"}, 
    {html: "AssertINFO.html", title: "Assert Info"}, 
    {html: "configquestions.html", title: "Config Q1-3"},
    {html: "actquestions.html", title: "Act Q4-6"},
    {html: "assertquestions.html", title: "Assert Q7-9"},
    {html: "configuration.html", title: "Config A1-3"},
    {html: "actanswers.html", title: "Act A4-6"},
    {html: "assertanswers.html", title: "Assert A7-9"},
    {html: "GeneralQuestions.html", title: "General Q10"},
    {html: "GeneralAnswers.html", title: "General A10"},
    ];

    for(var item of array)
    {
        var anchorEl = document.createElement("a");
        anchorEl.setAttribute("href", item.html);
        anchorEl.innerHTML = item.title;

        myDiv.appendChild(anchorEl);
    }
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
    else if(img.getAttribute("src") === "Q4.png")
    {
        img.setAttribute("src", "Q5.png");
        document.getElementById("previous").style.backgroundColor = "black";
    }
    else if(img.getAttribute("src") === "Q5.png")
    {
        img.setAttribute("src", "Q6.png");
        document.getElementById("next").style.backgroundColor = "grey";
    }
    else if(img.getAttribute("src") === "Q7.png")
    {
        img.setAttribute("src", "Q8.png");
        document.getElementById("previous").style.backgroundColor = "black";
    }
    else if(img.getAttribute("src") === "Q8.png")
    {
        img.setAttribute("src", "Q9.png");
        document.getElementById("next").style.backgroundColor = "grey";
    }
    else if(img.getAttribute("src") === "Q10.png")
    {
        img.setAttribute("src", "Q10-Tips.png");
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
    else if(img.getAttribute("src") === "Q5.png")
    {
        img.setAttribute("src", "Q4.png");
        document.getElementById("previous").style.backgroundColor = "grey";
    }
    else if(img.getAttribute("src") === "Q6.png")
    {
        img.setAttribute("src", "Q5.png");
        document.getElementById("next").style.backgroundColor = "black";
    }
    else if(img.getAttribute("src") === "Q8.png")
    {
        img.setAttribute("src", "Q7.png");
        document.getElementById("previous").style.backgroundColor = "grey";
    }
    else if(img.getAttribute("src") === "Q9.png")
    {
        img.setAttribute("src", "Q8.png");
        document.getElementById("next").style.backgroundColor = "black";
    }
    else if(img.getAttribute("src") === "Q10-Tips.png")
    {
        img.setAttribute("src", "Q10.png");
        document.getElementById("next").style.backgroundColor = "black";
    }
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }


