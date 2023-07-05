const postAddToCart = btn => {
    const prodId = btn.parentNode.querySelector('[name=productId]').value;
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value;

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
}

const deleteUserProduct = btn => {
    const prodId = btn.parentNode.querySelector('[name=productId]').value;
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value;

    const productElement = btn.closest('article');

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
}

const deleteCartProduct = btn => {
    const prodId = btn.parentNode.querySelector('[name=productId]').value;
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value;

    const cartElement = btn.closest('li');

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
}

const patchChangeUserBlockStatus = btn => {
    if (btn.classList.contains('danger')) {
        btn.innerText = 'Block user';
    } else {
        btn.innerText = 'Unblock user';
    }
    btn.classList.toggle('danger');


    const userId = btn.parentNode.querySelector('[name=userId]').value;
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value;

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
}

const pushCheckoutLink = () => {
    const inputArr = document.querySelectorAll('input.quantityInput');
    let checkoutHref = '/checkout?';
    inputArr.forEach(i => {
        checkoutHref += i.name + '=' + i.value + '&';
    });
    window.location.href = checkoutHref.slice(0, -1);
}
