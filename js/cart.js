const cartButton = document.getElementsByClassName("fa-cart-shopping")[0];
const cartContainer = document.getElementById("cart-container");

cartButton.addEventListener('click', () => {
    if (cartContainer.classList.contains('hidden')){
        cartContainer.classList.remove('hidden');
    } else {
        cartContainer.classList.add('hidden');
    }
});

const product = [
    {
        id: 0,
        image: 'assets/Cheeseburger.jpg',
        title: 'Cheese Burger',
        detail: 'A mouthwatering beef patty grilled to perfection, adorned with melty cheese, served on a soft, toasted bun with fresh lettuce, tomato, and our special sauce.',
        price: 65,
    },
    {
        id: 1,
        image: 'assets/BurgerBacon.jpg',
        title: 'Burger bacon',
        detail: 'A juicy, flame-grilled patty topped with crispy bacon strips, lettuce, tomato, and our signature sauce, all served on a warm, toasted bun.',
        price: 75,
    },
    {
        id: 2,
        image: 'assets/BurgerAyam.jpg',
        title: 'Chicken Burger',
        detail: 'Enjoy our Chicken Burger, featuring a tender and perfectly seasoned chicken patty, topped with fresh lettuce, ripe tomatoes.',
        price: 55,
    },
];

// Tambahan JavaScript untuk tombol close
const closeButton = document.getElementById("closeButton");

closeButton.addEventListener('click', () => {
    cartContainer.classList.add('hidden');
});

const categories = [...new Set(product.map((item)=>
    {return item}))]
    let i=0;

// document.getElementsByClassName('card-container')[0].innerHTML = categories.map((item)=>
// {
//     var {image, title, detail, price} = item;
//     return(
//         `<div class="card text-center card-food2 mt-5">
//         <div class="justify-content-center">
//         <img src=${image} class="card-img-top" alt="burger">
//     </div>
//         <div class="card-body">
//         <h5 class="card-title title2">${title}</h5>
//         <p class="price">Rp ${price}.000</p>
//         <p class="card-text">${detail}</p>
//         <a class='btn-box' onclick='addtocart("${i++}")'><i class='fa-solid fa-cart-shopping' style='color: #ffffff; margin-right: 7px;'></i> Add to Cart </a>                                        
//         </div>
//         </div>`
//     )
// }).join('')

var cart=[];

function addtocart(a){
    cart.push({...categories[a]});
    displaycart();
}

function delElement(a){
    cart.splice(a, 1);
    displaycart();
}

//Menampilkan cart sesuai dengan  pesanan dari user
function displaycart() {
    let j = 0, total = 0;
    document.getElementById("cart-count").innerHTML = cart.length;
    if (cart.length == 0) {
        document.getElementById('cartItem').innerHTML = "The cart is empty";
        document.getElementById("total").innerHTML = "Rp " +0+ ".000";
        document.getElementById("cart-count").innerHTML = "";
    } else {
        document.getElementById('cartItem').innerHTML = cart.map((items) => 
        {
            var {image, title, price} = items;
            total=total+price;
            document.getElementById("total").innerHTML = "Rp " + total + ".000";
            return (
                `<div class='cart-item'>
                    <div class='row-img'>
                        <img class='rowimg' src=${image}>
                    </div>
                    <p style='font-size: 15px;'>${title}</p>
                    <h2 style='font-size: 18px;'>Rp ${price}.000</h2>
                    <div style='display: flex; flex-direction: row; gap: 0.8rem'>
                        <button><i class="fa-solid fa-plus"></i></button>
                        <p>1</p>
                        <button><i class="fa-solid fa-minus"></i></button>
                    </div>
                    <i class='fa-solid fa-trash' onclick='delElement("+ (j++) +")'></i>
                </div>`
            );
        }).join('');
    }
}