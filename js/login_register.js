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

$(function() {
    if (localStorage.getItem('uname')) {
        $('span.account-button').removeClass('hide');
        $('span.account-button').text(localStorage.getItem('uname'));
    } else {
        $('span.account-button').addClass('hide');
        $('span.account-button').text('');
    }
})

$('#btnLogin').on('click',function() {
    $.ajax({
        url: 'https://dailydeals-api-production.up.railway.app/login',
        type: 'POST',
        data: JSON.stringify({
            username: $('#usernameLogin').val(),
            password: $('#passwordLogin').val()
        }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            // console.log(response)
            if (response[0]['message'] === 'Login Successful') {
                localStorage.setItem('uname', response[0]['payload']['username']);
                localStorage.setItem('id', response[0]['payload']['id']);
                window.location.href = 'FE-Palembang-3/index.html'
            }
        }
    })
})

$('#btnRegister').on('click', function() {
    $.ajax({
        url: 'https://dailydeals-api-production.up.railway.app/register',
        type: 'POST',
        data: JSON.stringify({
            username: $('#usernameRegister').val(),
            password: $('#passwordRegister').val(),
            email: $('#emailRegister').val()
        }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            console.log(response);
        }
    })
})