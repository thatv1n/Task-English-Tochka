document.addEventListener('DOMContentLoaded', () => {
  const url = `http://task-english-tochka`;

  const modal = document.querySelector('#modal'),
    modal_close = document.querySelector('#modal_close'),
    modal_open = document.querySelector('#modal_open'),
    btn_search = document.querySelector('#btn_search'),
    input_search = document.querySelector('#input_search'),
    balance = document.querySelector('#balance'),
    products = document.querySelector('#products');

  let user = false,
    balance_user = 0;

  input_search.focus();

  get_products();

  //START---------- Получние продуктов
  function get_products() {
    products.innerHTML = '';
    const res = fetch(`${url}/php/get_products.php`);
    res
      .then((res) => res.json())
      .then((res) => {
        res.map((item) => {
          const filterOreder = user && user[2]?.filter((order) => order.product_id == item.id);
          const desc = item.description.split(' ').slice(1).join(' ');

          products.innerHTML += `<div class="block">
          <div class="block-header">
            <img src="./img/min-Монета ET 3.png" alt="coin" />
            <span>${item.price}</span>
            <img src="./img/min-Mask group.png" alt="currency" />
          </div>
          <div class="block-body">
            <img src="./img/phone.png" alt="phone" />
            <div>x2</div>
          </div>
          <div class="block-footer__text"><span class="footer__text-procent">${
            item.description.split(' ')[0]
          }</span> ${desc}</div>
          ${
            filterOreder[0]?.product_id === item.id
              ? ` <div class="block-btn  block-btn__afteruse">Уже использовано</div>`
              : ` <div class="block-btn  block-btn__use" data-id="${item.id}" data-price="${item.price}"> Использовать скидку
             </div>`
          }
        </div>`;
        });

        const btn_buy = document.querySelectorAll('.block-btn__use');

        btn_buy.forEach((item) => {
          //START---------- Нажатие на кнопку "ИСПОЛЬЗОВАТЬ СКИДКУ"
          item.addEventListener('click', (e) => {
            const id_product = e.target.getAttribute('data-id');
            const price = e.target.getAttribute('data-price');
            if (id_product) {
              if (!user) {
                input_search.focus();
              } else {
                if (Number(balance.textContent) >= Number(price)) {
                  const fd = new FormData();
                  fd.append('id_user', user[0].id);
                  fd.append('id_product', id_product);
                  fd.append('price', price);
                  const res = fetch(`${url}/php/buy_product.php`, {
                    method: 'POST',
                    body: fd,
                  });
                  res
                    .then((res) => res.json())
                    .then((res) => {
                      orders_user = res;
                      get_coin();
                    });
                } else {
                  alert('Недостаточно баланса!');
                }
              }
            }
          });
          //END---------- Нажатие на кнопку "ИСПОЛЬЗОВАТЬ СКИДКУ"
        });
      });
  }
  //END---------- Получние продуктов

  //START---------- Открытие закрытие модального окна
  modal_close.addEventListener('click', () => {
    modal.style.display = 'none';
    document.querySelector('body').style.overflow = 'auto';
  });
  modal_open.addEventListener('click', () => {
    modal.style.display = 'block';
    document.querySelector('body').style.overflow = 'hidden';
  });
  //END---------- Открытие закрытие модального окна

  btn_search.addEventListener('click', (e) => {
    get_coin();
  });
  input_search.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      get_coin();
    }
  });

  //START----------Получение баланса
  function get_coin() {
    const fd = new FormData();
    balance_user = 0;

    fd.append('login', input_search.value);
    const res = fetch(`${url}/php/get_user.php`, {
      method: 'POST',
      body: fd,
    });
    res
      .then((res) => res.json())
      .then((res) => {
        user = res;
        if (res.length) {
          res[1].map((item) => {
            balance_user += Number(item.price);
          });
          balance.innerHTML = balance_user;
          const fd = new FormData();
          fd.append('id_user', user[0].id);
          get_products();
        } else {
          alert('Пользователь не найден');
        }
      });
  }
  //END----------Получение баланса
});
