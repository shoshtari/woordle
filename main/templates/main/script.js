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
async function check_word(word){
  const responce = await fetch("/main/word_checker/", {
    method: 'POST',
    body : JSON.stringify({
      word: word
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'X-CSRFToken': csrftoken
    }
    });
  const data = await responce.json();
  return data;
}
async function keypressHandler(event) {
  if(!running){
    return;
  }
  if (!insertChar(event.key) && current_col>4 && event.key=="Enter"){
    let ans = "";
    for(let i=0;i<5;i++){
        let cell = document.getElementById(''.concat(current_row, ':', i));
        ans = ''.concat(ans, cell.innerText);
    }
    let is_valid = (await check_word(ans)).valid;
    if(is_valid){
      win_check();
      update_cells()

      current_row += 1;
      current_col = 0;
    }
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
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
const csrftoken = getCookie('csrftoken');
current_row = 0;
current_col  = 0;
running = 1;
document.addEventListener("keydown", keypressHandler);
