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
