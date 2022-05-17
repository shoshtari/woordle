// Get the modal
var modal = document.getElementById("id01");
// When the user clicks anywhere outside of the modal, close it
hide_modal = function(modal_name){
    m = document.getElementById(modal_name);
    m.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
