var div = document.createElement("div");
div.setAttribute("id", "se-pre-con");
document.body.appendChild(div);
document.getElementById("se-pre-con").innerHTML = "<br><br><br><br><h1>Warning!!</h1><br><img src='http://pluspng.com/img-png/png-wrong-cross-clear-cross-empty-incorrect-red-wrong-icon-512.png'></img><br><p>This Page is suspected as Phishing Site.</p>";
var div2 = document.createElement("div");
div2.setAttribute("id", "del");
document.getElementById('se-pre-con').appendChild(div2);
document.getElementById("del").innerHTML = "<a>Click Here to Close the Message.</a>"
div2.onclick = function() {this.parentNode.removeChild(this);document.getElementById('se-pre-con').remove();
}

