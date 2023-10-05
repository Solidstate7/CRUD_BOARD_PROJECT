let modal = document.getElementsByClassName("modal-wrap");
let modalBtn = document.getElementsByClassName("modalbtn");
let postBtn = document.getElementsByClassName("noticepost");

for (let i = 0; i < postBtn.length; i++) {
    postBtn[i].addEventListener("click", () => {
        modal[i].style.display = "block";
    });
}

for (let i = 0; i < modalBtn.length; i++) {
    modalBtn[i].addEventListener("click", () => {
        modal[i].style.display = "none";
    });
}
