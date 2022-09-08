const ready = () => {
    const addToCart = document.getElementsByClassName('itemimage');
    for (let i = 0; i < addToCart.length; i++) {
        let button = addToCart[i];
        button.addEventListener('click', addToCartClicked);
    };
    const removeFromCart = document.getElementsByClassName('remove');
    console.log(removeFromCart);
    for (let i = 0; i < removeFromCart.length; i++) {
        let button = removeFromCart[i]
        button.addEventListener('click', removeCartItem);
    };
    document.getElementsByClassName('button')[0].addEventListener('click', purchaseClicked);
};

const purchaseClicked = () => {
    alert('Дякую ща покупку');
    
}

const addToCartClicked = (ev) => {
    let button = ev.target;
    let imgSrc = button.src;
    addItemToCart(imgSrc);
    updateCartTotal();
};

const addItemToCart = (imgSrc) => {
    const cartCard = document.createElement('div');
    cartCard.classList.add('cartselection');
    const cartItem = document.getElementsByClassName('cartcontains')[0];
    const cartCardContent = `
        <div class="cartimg">
            <img src="${imgSrc}" alt="" width="135" height="90">
        </div>
        <div class="options">
            <div class="selectors">
                <div class="size">
                    <label for="size">Розмір</label><br>
                    <select class="sizevalue" name="size" id="">
                        <option value="20">9X13</option>
                        <option value="40">10X15</option>
                        <option value="60">20X30</option>
                    </select>
                </div>
                <div class="surface">
                    <label for="surface">Поверхня</label><br>
                    <select name="surface" id="">
                        <option value="glossy">Глянець</option>
                        <option value="mat">Мат</option>
                    </select>    
                </div>                        
            </div>
        </div>
        <div class="price">50грн</div>
        <div class="remove"><img src="/img/icons/remove.png" alt="">
        </div>`;
    cartCard.innerHTML = cartCardContent;
    cartItem.append(cartCard);
    cartCard.getElementsByClassName('remove')[0].addEventListener('click', removeCartItem);
    cartCard.getElementsByClassName('sizevalue')[0].addEventListener('change', updateCartTotal);
}

const removeCartItem = (ev) => {
    const buttonClicked = ev.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}



    const updateCartTotal = () => {
        const cartContainer = document.getElementsByClassName('cartcontains')[0];
        const cartCards = cartContainer.getElementsByClassName('cartselection');
        let total = 0;
        for (let i = 0; i < cartCards.length; i++) {
            let cartCard = cartCards[i];
            const priceEl = cartCard.getElementsByClassName('price')[0];
            const sizeEl = cartCard.getElementsByClassName('sizevalue')[0];
            let price = parseFloat(priceEl.innerText.replace('грн', ''));
            let sizePrice = Number(sizeEl.value);
            total = total + sizePrice;
            
        };
        document.getElementsByClassName('totalvalue')[0].innerText = total + 'грн';
    };


    if (document.readyState == 'loading') {
        document.addEventListener('DOMContentLoaded', ready)
    } else {
        ready();
    };