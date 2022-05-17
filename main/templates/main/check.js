function textToArray(text) {
  const ans = [];
  console.log(text);
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
    if(ans[i]!=2 && ind!=-1){
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
  element.style.color = "white"
}
function wrongCell(r, c) {
  /*
  apply the style for a cell that it's letter is not in key at all
  */
  elm_id = "".concat(r, ":", c);
  element = document.getElementById(elm_id);
  element.style.backgroundColor = "#787c7e";
  element.style.color = "white"
}
function halfCell(r, c) {
  /*
  apply the style for a cell that it's letter is in key but not in same place
  */
  elm_id = "".concat(r, ":", c);
  element = document.getElementById(elm_id);
  element.style.backgroundColor = "#c9b458";
  element.style.color = "white"
  
}
function end(win){
    if(win){
      
    }
}
function update_cells() {
  let insertedWord = "";
  for (let i = 0; i < 5; i++) {
    cell_id = "".concat(current_row, ":", i);
    elm = document.getElementById(cell_id);
    insertedWord = "".concat(insertedWord, elm.innerText)
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
  if( stat.reduce(function(a, b){return a && b;}, true)){
      end();
  }
}
