const cartButton = document.getElementsByClassName("fa-cart-shopping")[0];
const cartContainer = document.getElementById("cart-container");

cartButton.addEventListener('click', () => {
    if (cartContainer.classList.contains('hidden')){
        cartContainer.classList.remove('hidden');
    } else {
        cartContainer.classList.add('hidden');
    }
});

// Tambahan JavaScript untuk tombol close
const closeButton = document.getElementById("closeButton");
closeButton.addEventListener('click', () => {
    cartContainer.classList.add('hidden');
});

$(function () {
    //fungsi memanggil semua menu ketika halaman pertama kali ditampilkan
    getMenu("all");
    //pengecekan untuk menampilkan nama username
    if (localStorage.getItem("uname")) {
      $("span.account-button").removeClass("hide");
      $("span.account-button").text(localStorage.getItem("uname"));
    } else {
      $("span.account-button").addClass("hide");
      $("span.account-button").text("");
    }

    //menampilkan data keranjang jika user yang sudah login
    if (localStorage.getItem('uname')) {
      $.ajax({
        url: `https://dailydeals-api-production.up.railway.app/keranjang/user/${localStorage.getItem('id')}`,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
          $('span#cart-count').text(response[0]['payload'].length)
          let html = '';
          $.each(response[0]['payload'], function(i, val) {
            html += `<div class='cart-item'>
                <div class='row-img'>
                    <img class='rowimg' src=${val.gambar}>
                </div>
                <p style='font-size: 15px;'>${val.nama}</p>
                <p style='font-size: 14px;'>(${val.jumlah_item})</p>
                <h2 style='font-size: 18px;'>Rp ${new Intl.NumberFormat("id", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })
                      .format(val.total_harga)
                      .replace(",", ".")}</h2>
                <i class='fa-solid fa-trash' onclick='deleteCart(${val.id_keranjang})'></i>
            </div>`;
          })
          $('#cartItem').html(html);
          $('#total').text(`Rp ${new Intl.NumberFormat("id", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })
                      .format(response[0]['payload'].map(value => value.total_harga).reduce((partialSum, a) => partialSum + a, 0))
                      .replace(",", ".")}`)

        }
      })
    }
});

// Menampilkan parameter category = all (menampilkan semua menu), jika parameter bukan all (menampilkan setiap kategori menu )
function getMenu(category) {
    $.ajax({
      url:
        category === "all"
          ? `https://dailydeals-api-production.up.railway.app/menu`
          : `https://dailydeals-api-production.up.railway.app/menu/${category}`,
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      beforeSend: function () {
        $("#cardContent").html("");
      },
      success: function (response) {
        let html = "";
        $.each(response[0]["payload"], function (i, val) {
          html += `<div class="card text-center card-food2 mt-5">
              <div class="justify-content-center">
                  <img src="${
                    val.gambar
                  }" class="card-img-top" alt="burger">
              </div>
              <div class="card-body">
                  <h5 class="card-title title2">${val.nama}</h5>
                  <p class="price">Rp ${new Intl.NumberFormat("id", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })
                    .format(val.harga)
                    .replace(",", ".")}</p>
                  <p class="card-text">${val.deskripsi}</p>
                  ${localStorage.getItem('uname') ? `<div style='display: flex; flex-direction: row; gap: 0.8rem; justify-content:center;  align-items:center;'>
                  <button id="plus${val.id_menu}" onClick='addQty(${val.id_menu})'><i class="fa-solid fa-plus"></i></button>
                  <p id="text${val.id_menu}">1</p>
                  <button id="minus${val.id_menu}" onClick='minusQty(${val.id_menu})'><i class="fa-solid fa-minus"></i></button>
              </div>
                  <a class='btn-box' onClick='addToCart(${val.id_menu},${val.harga})'><i class='fa-solid fa-cart-shopping' style='color: #ffffff; margin-right: 7px;'></i> Add to Cart </a>` : ''}
              </div>
          </div>`;
        });

        $("#cardContent").html(html);
      },
    });
}

//menampilkan modal login
document.getElementById("loginButton").addEventListener("click", function () {
    if (!localStorage.getItem("uname")) {
      document.getElementById("loginPopup").style.display = "block";
    }
  });
document.getElementById("closeButton").addEventListener("click", function () {
    document.getElementById("loginPopup").style.display = "none";
  });

//menambahkan item kedalam keranjang 
function addToCart(id_menu, harga) {
    $.ajax({
      type: "POST",
      url:'https://dailydeals-api-production.up.railway.app/keranjang',
      data: JSON.stringify({
        id_user: localStorage.getItem("id"),
        jumlah_item: Number($(`#text${id_menu}`).text()),
        total_harga: Number($(`#text${id_menu}`).text()) * harga,
        id_menu,
      }),
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      success: function (response) {
        console.log(response);
        window.location.href = '/FE-Palembang-3/menu.html';
      },
    });
  }

// menambahkan qty setiap menu
function addQty(id_menu) {
    const qty = Number($(`#text${id_menu}`).text());
    $(`#text${id_menu}`).text(qty + 1);
  }

// mengurangi qty setiap menu
function minusQty(id_menu) {
    const qty = Number($(`#text${id_menu}`).text());
    if (qty > 1) {
      $(`#text${id_menu}`).text(qty - 1);
    }
  }

//Menghapus item di keranjang
function deleteCart(id_keranjang) {
    $.ajax({
      url: `https://dailydeals-api-production.up.railway.app/deleteitemcart/${id_keranjang}`,
      type: 'DELETE',
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      success: function (response) {
        window.location.reload();
      }
    })
  }


