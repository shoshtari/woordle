word = "salam";
current_row = 0;
current_col  = 0;
running = 1;
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
    elm.classList.add("zoom-apply");

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
  if(!running){
    return;
  }
  if (!insertChar(a.key) && current_col>4 && a.key=="Enter"){
    win_check();
    update_cells()
    current_row += 1;
    current_col = 0;
  }
  if (current_row<6 && a.key=="Backspace"){
    popChar();
  }
}
function win_check(){
  let ans = "";
  for(let i=0;i<5;i++){
    let cell = document.getElementById(''.concat(current_row, ':', i));

    ans = ''.concat(ans, cell.innerText);
  }
  if(ans.toLowerCase()!=word){
    if(current_row==5){
      document.getElementById('lose_modal').style.display='block';
    }
    return 0;
  }
  running = 0;
  document.getElementById('win_modal').style.display='block';
}
document.addEventListener("keydown", op);
