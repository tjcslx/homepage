(function() {
    if (localStorage) {
        var article = document.getElementsByTagName("article")[0]
        var p = document.getElementsByTagName("p")[0]
        var bigFont = document.getElementById("big")
        var midFont = document.getElementById("medium")
        var smallFont = document.getElementById("small")
        var list = document.querySelectorAll("article ul li")
        var color = localStorage.getItem("color")
        var size = localStorage.getItem("size")

        if (color === null) {
            article.style.backgroundColor = "#fff"
        } else {
            article.style.backgroundColor = color
        }

        if (size === null) {
            p.style.fontSize = "14px"
        } else {
            p.style.fontSize = size
        }

        bigFont.onclick = function() {
            p.style.fontSize = "16px"
            localStorage.size = "16px"
        }

        midFont.onclick = function() {
            p.style.fontSize = "14px"
            localStorage.size = "14px"
        }

        smallFont.onclick = function() {
            p.style.fontSize = "12px"
            localStorage.size = "12px"
        }

        for (var i = 0; i < list.length; i++) {
            list[i].onclick = function() {
                console.log(i)
            }
        }
    }
}())
