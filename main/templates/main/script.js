function getword(){
  return new Promise((resolve, reject) => {
    request = new XMLHttpRequest();
    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4 && request.status === 200) {
        resolve(JSON.parse(request.responseText).word);
      }
      if (request.readyState === 4 && request.status !== 200) {
        reject("Can't connect to server!, please try again later");
      }
      
    });
    
    request.open('GET', '/main/word_generator/');
    request.send()
  });
}
// const word = getword();
getword().then(data => {
  word = data;
});

function insertChar(charachter){
  if(charachter.length>1 || current_col>4 || current_row>5){
    return false;
  }
  charachter = charachter.toLowerCase();
  row = current_row.toString()
  col = current_col.toString()
  cell_id = ''.concat(row, ":", col);
  if (charachter.charCodeAt(0) >= 'a'.charCodeAt(0) && charachter.charCodeAt(0)<='z'.charCodeAt(0)){
    elm = document.getElementById(cell_id);
    
    elm.classList.add("zoom-apply");

    elm.innerText = charachter;
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
  elm.classList.remove("zoom-apply")
  elm.innerText = "";
  return 
}
function op(event) {
  if(!running){
    return;
  }
  if (!insertChar(event.key) && current_col>4 && event.key=="Enter"){
    win_check();
    update_cells()
    current_row += 1;
    current_col = 0;
  }
  if (current_row<6 && event.key=="Backspace"){
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
current_row = 0;
current_col  = 0;
running = 1;
document.addEventListener("keydown", op);
