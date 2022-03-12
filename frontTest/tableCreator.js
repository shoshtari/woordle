function createButton(parent, type, classes, id) {
  if (type == undefined) {
    type = "div";
  }
  elm = document.createElement(type);
  if (classes != undefined) {
    for (i = 0; i < classes.length; i++) {
      elm.classList.add(classes[i]);
    }
  }
  if (id != undefined) {
    elm.id = id;
  }
  parent.appendChild(elm);
  return elm;
}
board = document.getElementById("board");
for (i = 0; i < 6; i++) {
  for (j = 0; j < 6; j++) {
    cell = createButton((parent = board), "div", ["cell"]);
    cell.style.color = "red";
    cell.innerText = "A";
    console.log("ASAD");
  }
}
