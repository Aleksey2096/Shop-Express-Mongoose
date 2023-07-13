Array.from(document.getElementsByClassName('addToCartButton')).forEach(btn => btn.addEventListener('click', function () {
    const prodId = this.parentNode.querySelector('[name=productId]').value;
    const csrf = this.parentNode.querySelector('[name=_csrf]').value;

    fetch('/cart', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'csrf-token': csrf
        },
        body: JSON.stringify({
            productId: prodId
        })
    })
        .then(result => {
            return result.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        })
}));

Array.from(document.getElementsByClassName('deleteUserProductButton')).forEach(btn => btn.addEventListener('click', function () {
    const prodId = this.parentNode.querySelector('[name=productId]').value;
    const csrf = this.parentNode.querySelector('[name=_csrf]').value;

    const productElement = this.closest('article');

    fetch('/product/' + prodId, {
        method: 'DELETE',
        headers: {
            'csrf-token': csrf
        }
    })
        .then(result => {
            return result.json();
        })
        .then(data => {
            console.log(data);
            productElement.parentNode.removeChild(productElement);
            if (document.getElementsByTagName('article').length === 0) {
                document.querySelectorAll('div.grid')[0].outerHTML = '<h1>No Products Found!</h1>';
            }
        })
        .catch(err => {
            console.log(err);
        })
}));

Array.from(document.getElementsByClassName('deleteFromCartButton')).forEach(btn => btn.addEventListener('click', function () {
    const prodId = this.parentNode.querySelector('[name=productId]').value;
    const csrf = this.parentNode.querySelector('[name=_csrf]').value;

    const cartElement = this.closest('li');

    fetch('/cart/' + prodId, {
        method: 'DELETE',
        headers: {
            'csrf-token': csrf
        }
    })
        .then(result => {
            return result.json();
        })
        .then(data => {
            console.log(data);
            cartElement.parentNode.removeChild(cartElement);
            if (document.querySelectorAll('li.cart__item').length === 0) {
                document.querySelectorAll('div.cart-content')[0].outerHTML = '<h1>No Products in Cart!</h1>';
            }
        })
        .catch(err => {
            console.log(err);
        })
}));

Array.from(document.getElementsByClassName('blockUserButton')).forEach(btn => btn.addEventListener('click', function () {
    if (this.classList.contains('danger')) {
        this.innerText = 'Block user';
    } else {
        this.innerText = 'Unblock user';
    }
    this.classList.toggle('danger');


    const userId = this.parentNode.querySelector('[name=userId]').value;
    const csrf = this.parentNode.querySelector('[name=_csrf]').value;

    fetch('/admin/change-user-block-status', {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            'csrf-token': csrf
        },
        body: JSON.stringify({
            userId
        })
    })
        .then(result => {
            return result.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        })
}));

Array.from(document.getElementsByClassName('pushCheckoutLinkButton')).forEach(btn => btn.addEventListener('click', function () {
    const inputArr = document.querySelectorAll('input.quantityInput');
    let checkoutHref = '/checkout?';
    inputArr.forEach(i => {
        checkoutHref += i.name + '=' + i.value + '&';
    });
    window.location.href = checkoutHref.slice(0, -1);
}));
