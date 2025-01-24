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
  elm.addEventListener("click", (event) => {
    const inp_elm = document.getElementById("false_input");
    inp_elm.focus();
  });
  parent.appendChild(elm);
  return elm;
}

function createTable() {
  board = document.getElementById("board");
  for (i = 0; i < 6; i++) {
    row = createButton(board, "div", ["row"]);
    rowNum = i.toString();
    for (j = 0; j < 5; j++) {
      colNum = j.toString();
      cell_id = "".concat(rowNum, ":", colNum);
      cell = createButton(
        (parent = row),
        "div",
        ["cell", "col", "square"],
        cell_id,
      );
    }
  }
}

function textToArray(text) {
  const ans = [];
  for (let i = 0; i < text.length; i++) {
    ans.push(text[i]);
  }
  return ans;
}
function contain(arr, elm) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == elm) {
      return true;
    }
  }
  return false;
}

function check(key, word) {
  /*
  word: the word to be checked
  key: our key(the word gotten from server)
  return an array of size 5 each element is 0->not in key, 1-> in key but wrong place , 2-> in key and correct place
  */

  let arr_word = textToArray(word);
  let arr_key = textToArray(key);

  let ans = [0, 0, 0, 0, 0];
  for (let i = 0; i < 5; i++) {
    if (arr_word[i] == arr_key[i]) {
      ans[i] = 2;
      arr_key[i] = ".";
    }
  }
  for (let i = 0; i < 5; i++) {
    let ind = arr_key.indexOf(arr_word[i]);
    if (ans[i] != 2 && ind != -1) {
      arr_key[ind] = ".";
      ans[i] = 1;
    }
  }
  return ans;
}
function correctCell(row, column) {
  /*
  apply the style for a cell that it's letter is exactly same with key letter on that place
  */
  elm_id = "".concat(row, ":", column);
  element = document.getElementById(elm_id);
  element.style.backgroundColor = "green";
  element.style.color = "white";
}
function wrongCell(r, c) {
  /*
  apply the style for a cell that it's letter is not in key at all
  */
  elm_id = "".concat(r, ":", c);
  element = document.getElementById(elm_id);
  element.style.backgroundColor = "#787c7e";
  element.style.color = "white";
}
function halfCell(r, c) {
  /*
  apply the style for a cell that it's letter is in key but not in same place
  */
  elm_id = "".concat(r, ":", c);
  element = document.getElementById(elm_id);
  element.style.backgroundColor = "#c9b458";
  element.style.color = "white";
}

function update_cells() {
  let insertedWord = "";
  for (let i = 0; i < 5; i++) {
    cell_id = "".concat(current_row, ":", i);
    elm = document.getElementById(cell_id);
    insertedWord = "".concat(insertedWord, elm.innerText);
  }
  stat = check(word, insertedWord);
  for (let i = 0; i < 5; i++) {
    if (stat[i] == 2) {
      correctCell(current_row, i);
    }
    if (stat[i] == 1) {
      halfCell(current_row, i);
    }
    if (stat[i] == 0) {
      wrongCell(current_row, i);
    }
  }
}
function insertChar(charachter) {
  if (charachter.length > 1 || current_col > 4 || current_row > 5) {
    return false;
  }
  charachter = charachter.toLowerCase();
  row = current_row.toString();
  col = current_col.toString();
  cell_id = "".concat(row, ":", col);
  if (
    charachter.charCodeAt(0) >= "a".charCodeAt(0) &&
    charachter.charCodeAt(0) <= "z".charCodeAt(0)
  ) {
    elm = document.getElementById(cell_id);

    elm.classList.add("zoom-apply");

    elm.innerText = charachter;
    current_col++;
    return true;
  }
  return false;
}

function popChar() {
  if (current_col == 0) {
    return;
  }
  current_col--;
  row = current_row.toString();
  col = current_col.toString();

  cell_id = "".concat(row, ":", col);
  elm = document.getElementById(cell_id);
  elm.classList.remove("zoom-apply");
  elm.innerText = "";
  return;
}
async function check_word(word) {
  const responce = await fetch("/word_checker/", {
    method: "POST",
    body: JSON.stringify({
      word: word,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "X-CSRFToken": csrftoken,
    },
  });
  const data = await responce.json();
  return data;
}

async function submitWord() {
  let ans = "";
  for (let i = 0; i < 5; i++) {
    let cell = document.getElementById("".concat(current_row, ":", i));
    ans = "".concat(ans, cell.innerText);
  }
  let is_valid = (await check_word(ans)).valid;
  if (is_valid) {
    win_check();
    update_cells();

    current_row += 1;
    current_col = 0;
  } else {
    for (let i = 0; i < 5; i++) {
      cell = document.getElementById("".concat(current_row, ":", i));
      cell.classList.add("shake-apply");
    }
    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        cell = document.getElementById("".concat(current_row, ":", i));
        cell.classList.remove("shake-apply");
        cell.classList.remove("zoom-apply");
      }
    }, 1000);
  }
}

let rowSize = 0;
function updateRow(event) {
  const text = event.target.value;
  if (text.length > rowSize) {
    insertChar(text[text.length - 1]);
    rowSize += 1;
  } else if (text.length < rowSize && rowSize > 0) {
    popChar();
    rowSize--;
  }
}

async function keypressHandler(event) {
  if (!running) {
    return;
  }
  if (current_col > 4 && event.key == "Enter") {
    submitWord();
    return;
  }

  updateRow(event);
}
function win_check() {
  let ans = "";
  for (let i = 0; i < 5; i++) {
    let cell = document.getElementById("".concat(current_row, ":", i));

    ans = "".concat(ans, cell.innerText);
  }
  if (ans.toLowerCase() != word) {
    if (current_row == 5) {
      document.getElementById("lose_modal").style.display = "block";
    }
    return 0;
  }
  running = 0;
  document.getElementById("win_modal").style.display = "block";
}
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
const csrftoken = getCookie("csrftoken");
current_row = 0;
current_col = 0;
running = 1;
window.addEventListener("load", (event) => {
  document.getElementById("false_input").focus();
  document.getElementById("false_input").value = "";
  document.getElementById("false_input").addEventListener("keyup", keypressHandler);
  // document.getElementById("false_input").addEventListener("", keypressHandler);
});
