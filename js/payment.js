// Dapatkan elemen-elemen yang diperlukan
var openModalButton = document.getElementById("checkoutButton");
var closeModalButton = document.getElementById("closePaymentModal");
var paymentModal = document.getElementById("paymentModal");

// Ketika tombol "Bayar dengan Virtual Bank" ditekan, tampilkan modal
openModalButton.addEventListener("click", function () {
  paymentModal.style.display = "block";
});

// Ketika tombol penutup di modal ditekan, sembunyikan modal
closeModalButton.addEventListener("click", function () {
  paymentModal.style.display = "none";
});

// Juga sembunyikan modal jika pengguna mengklik di luar modal
window.addEventListener("click", function (event) {
  if (event.target == paymentModal) {
    paymentModal.style.display = "none";
  }
});

var paymentForm = document.getElementById("paymentForm");
paymentForm.addEventListener("submit", function (event) {
  event.preventDefault();
  alert("Pembayaran berhasil!");
  paymentModal.style.display = "none";
});

$(function() {
  $.ajax({
    url: `https://dailydeals-api-production.up.railway.app/keranjang/user/${localStorage.getItem('id')}`,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function(response) {
      console.log(response[0]['payload'])
      const jumlahItem = response[0]['payload'].map(val => val.jumlah_item).reduce((partialSum, a) => partialSum + a, 0);
      $('span#cart-count').text(response[0]['payload'].length);
      $('p#my-order').text(`My Order ( ${jumlahItem} )`);
      let html = '';
      $.each(response[0]['payload'], function(i, val) {
        html += `<div id="cartItem">
        <div class='row-img'>
            <img class='rowimg-payment' src='${val.gambar}'>
        </div>
        <div class='item-description'>
            <p class='burger-name'>${val.nama} ( ${val.jumlah_item}x )</p>
            <p class='price-payment'>Rp ${new Intl.NumberFormat("id", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })
              .format(val.total_harga)
              .replace(",", ".")}</p>
        </div>
    </div>`;
      })
      $('#all-menu').html(html);
      $('#total-menu').text(jumlahItem);
      $('#total-harga').text(new Intl.NumberFormat("id", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
        .format(response[0]['payload'].map(value => value.total_harga).reduce((partialSum, a) => partialSum + a, 0) + 12000)
        .replace(",", "."))
    }
  })
})

$('.submit-payment').on('click', function() {
  $.ajax({
    url: 'https://dailydeals-api-production.up.railway.app/checkout',
    type: 'POST',
    dataType: "json",
    data: JSON.stringify({
      id_user: localStorage.getItem('id'),
      payment_method: $('#payment').find(':selected').val(),
      alamat: $('#shippingAdress').val()
    }),
    contentType: "application/json; charset=utf-8",
    success: function() {
      window.location.href = 'receipt.html';
    }
  })
})