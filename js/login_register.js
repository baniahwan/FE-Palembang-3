// Mengambil elemen tombol sign-in dan sign-up
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
// Mengambil elemen container
const container = document.querySelector(".container");
// Mengambil elemen tombol sign-in dan sign-up yang kedua
const sign_in_btn2 = document.querySelector("#sign-in-btn2");
const sign_up_btn2 = document.querySelector("#sign-up-btn2");
// Menambahkan event listener untuk tombol sign-up
sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});
// Menambahkan event listener untuk tombol sign-in
sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});
// Menambahkan event listener untuk tombol sign-up yang kedua
sign_up_btn2.addEventListener("click", () => {
    container.classList.add("sign-up-mode2");
});
// Menambahkan event listener untuk tombol sign-in yang kedua
sign_in_btn2.addEventListener("click", () => {
    container.classList.remove("sign-up-mode2");
});