let gridItems = document.getElementsByClassName("square")
let boardArray = [
    "0", "1", "2",
    "3", "4", "5",
    "6", "7", "8"
]

for (const item of gridItems) {
    item.addEventListener("click", function () {
        let value = item.getAttribute("value")
        let index = value - 1

        let squareContent = document.querySelector(`.square[value="${value}"]`);

        squareContent.innerHTML = "x"

    })
}