document.addEventListener("DOMContentLoaded", () => {

    let products = [
        {
            name: 'Яблоки',
            src: 'img/apple.png',
            price: 120
        },
        {
            name: 'Груши',
            src: 'img/pear.png',
            price: 150
        },
        {
            name: 'Виноград',
            src: 'img/grape.png',
            price: 170
        }
    ];

    function creatingCatalog(productArray) {

        for (let i = 0; i < productArray.length; i++) {
            const catalog = document.querySelector('.catalog');

            let catalogItem = document.createElement('div');
            catalogItem.classList.add('catalog__item');
            catalog.append(catalogItem);

            catalogItem.innerHTML = `
                <div class="catalog__image">
                    <img src="${productArray[i].src}" alt="Яблоко">
                </div>
                <span class="catalog__name">${productArray[i].name}</span>
                <div class="catalog__price">
                    <span>Цена:</span>
                    <span class="catalog__price-val">${productArray[i].price}</span>
                    <sapn class="catalog__price-rub">руб.</sapn>
                </div>
                <button class="catalog__button" type="button">В корзину</button>
            `;
        }
        addInCart();
    }

    creatingCatalog(products);

    function addInCart() {
        const product = document.querySelectorAll('.catalog__item'),
            buttonProduct = document.querySelectorAll('.catalog__button'),
            productName = document.querySelectorAll('.catalog__name'),
            productPrice = document.querySelectorAll('.catalog__price-val'),
            productImage = document.querySelectorAll('.catalog__image > img'),
            productVal = {};

        product.forEach((item, num) => {
            item.addEventListener('click', (e) => {
                const target = e.target;

                if (target == buttonProduct[num]) {
                    productVal.name = productName[num].innerText;
                    productVal.price = productPrice[num].innerText;
                    productVal.img = productImage[num].attributes.src.nodeValue;
                    buttonProduct[num].classList.add('catalog__button-cart');
                    buttonProduct[num].innerText = 'В корзине';
                    buttonProduct[num].setAttribute('disabled', 'disabled');
                    creatingCart(productVal);
                }
            });
        });
    }

    function creatingCart(products) {

        const cartTitle = document.querySelector('.cart__title');
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart__item');

        cartItem.innerHTML = `
            <div class="cart__image">
                    <img src="${products.img}" alt="">
                </div>
                <div class="cart__container">
                    <span class="cart__name">${products.name}</span>
                    <div class="cart__price">
                        <span>Цена: </span>
                        <span class="cart__price-val">${products.price}</span>
                        <sapn class="cart__price-rub"> руб.</sapn>
                    </div>
                    <div class="cart__quantity">
                        <button type="button" class="cart__minus">-</button>
                        <span class="cart__quantity-val">1</span>
                        <button type="button" class="cart__plus">+</button>
                    </div>
                </div>
                <div class="cart__del">&times;</div>
            `;

        cartTitle.insertAdjacentElement('afterend', cartItem);
        productItem();
        productSum();
    }

    function productItem() {
        const productCart = document.querySelectorAll('.cart__item'),
            productCartClose = document.querySelectorAll('.cart__del'),
            producrCartPlus = document.querySelectorAll('.cart__plus'),
            productCartMinus = document.querySelectorAll('.cart__minus'),
            cartQuantity = document.querySelectorAll('.cart__quantity-val');

        const productName = document.querySelectorAll('.cart__name');

        for (let index = 0; index < productCart.length; index++) {
            productCart[index].addEventListener('click', (e) => {
                const target = e.target;

                if (target == productCartClose[index]) {
                    productCart[index].remove();
                    cartItemRemove(productName[index].innerText);
                    productSum();
                }
                if (target == producrCartPlus[index]) {
                    let quantity = cartQuantity[index].innerText;
                    ++quantity;
                    cartQuantity[index].innerText = quantity;
                    productSum();
                }
                if (target == productCartMinus[index]) {
                    let quantity = cartQuantity[index].innerText;
                    if (quantity > 1) {
                        --quantity;
                        cartQuantity[index].innerText = quantity;
                        productSum();
                    }
                }
            });
            break;
        }
    }

    function cartItemRemove(name) {
        const itemCatalog = document.querySelectorAll('.catalog__item');
        itemCatalog.forEach(i => {
            const nameProduct = i.querySelector('.catalog__name').innerText,
                buttonPrduct = i.querySelector('.catalog__button');
            if (name == nameProduct) {
                buttonPrduct.removeAttribute('disabled');
                buttonPrduct.classList.remove('catalog__button-cart');
                buttonPrduct.classList.add('catalog__button');
                buttonPrduct.innerText = 'В корзину';
            }
        });
    }

    function productSum() {
        const productSum = document.querySelector('.cart__sum-val');
        let sum = [],
            quan = [],
            total = 0;
        const priceProuct = document.querySelectorAll('.cart__price-val'),
            quantityProduct = document.querySelectorAll('.cart__quantity-val');


        priceProuct.forEach(item => {
            sum.push(item.innerText);
        });
        quantityProduct.forEach(item => {
            quan.push(item.innerText);
        });
        for (let index = 0; index < sum.length; index++) {
            total += sum[index] * quan[index];
        }
        productSum.innerText = total;
    }

});