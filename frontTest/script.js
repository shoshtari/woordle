console.log("Js loaded!");
word = "salam";
current_row = 0;
current_col  = 0;

// function update_grid(){
//   if(current_col<4){
//     current_col++;
//     return;
//   }
  
//   current_col = 0
//   current_row ++;
// }
function insertChar(a){
  if(a.length>1 || current_col>4 || current_row>5){
    return false;
  }
  a = a.toLowerCase();
  row = current_row.toString()
  col = current_col.toString()
  cell_id = ''.concat(row, ":", col);
  if (a.charCodeAt(0) >= 'a'.charCodeAt(0) && a.charCodeAt(0)<='z'.charCodeAt(0)){
    elm = document.getElementById(cell_id);
    elm.innerText = a;
    // update_grid();
    current_col ++;
    return true;
  }
  return false
}
function popChar(){
  if(current_col==0){
    return;
  }
  current_col--;
  row = current_row.toString()
  col = current_col.toString()
  
  cell_id = ''.concat(row, ":", col);
  elm = document.getElementById(cell_id);

  elm.innerText = "";
  return 
}

function op(a) {
  console.log(a.key);
  if (!insertChar(a.key) && current_col>4 && a.key=="Enter"){
    console.log("Checked!");
  }
  if (current_row<6 && a.key=="Backspace"){
    popChar();
  }
}

document.addEventListener("keydown", op);
