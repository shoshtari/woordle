function createButton(parent, type, classes, id) {
  if (type == undefined) {
    type = "div";
  }
  elm = document.createElement(type);

  if (classes != undefined) {
    for (w = 0; w < classes.length; w++) {
      elm.classList.add(classes[w]);
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
  row = createButton(board, "div", ["row" ]);
  rowNum = i.toString();
  for (j = 0; j < 5; j++) {
    colNum = j.toString()
    cell_id = ''.concat(rowNum, ":", colNum)
    cell = createButton((parent = row), "div", ["cell", "col", "square"], cell_id);
  }
}
