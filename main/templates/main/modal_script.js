var modal = document.getElementById("id01");
function hide_modal(modal_name){
    m = document.getElementById(modal_name);
    m.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
