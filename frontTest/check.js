function toArray(a) {
  const ans = [];
  for (let i = 0; i < a.length; i++) {
    ans.push(a[i]);
  }
  return ans;
}
function contain(a, x) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] == x) {
      return true;
    }
  }
  return false;
}
function check(A, B) {
  let a = toArray(A);
  let b = toArray(B);
  let ans = [0, 0, 0, 0, 0];
  console.log(a, b);
  for (let i = 0; i < 5; i++) {
    if (a[i] == b[i]) {
      ans[i] = 2;
      b[i] = ".";
    }
  }
  for (let i = 0; i < 5; i++) {

    let ind = a.indexOf(b[i]);
    if(ans[i]!=2 && ind!=-1){
      b[ind] = ".";
      ans[i] = 1;
    }
  }
  return ans;
}
function correctCell(r, c) {
  elm_id = "".concat(r, ":", c);
  element = document.getElementById(elm_id);
  element.style.backgroundColor = "green";
  element.style.color = "white"
}
function wrongCell(r, c) {
  elm_id = "".concat(r, ":", c);
  element = document.getElementById(elm_id);
  element.style.backgroundColor = "#787c7e";
  element.style.color = "white"
}
function halfCell(r, c) {
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
  insertedWord = "";
  for (let i = 0; i < 5; i++) {
    cell_id = "".concat(current_row, ":", i);
    elm = document.getElementById(cell_id);
    insertedWord = "".concat(insertedWord, elm.innerText)
  }
  console.log(insertedWord);
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
  console.log(check(word, insertedWord));
}
