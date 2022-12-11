let shop = document.getElementById("shop");

/**
 * ! Basket to hold all the selected items
 * ? the getItem part is retrieving data from the local storage
 * ? if local storage is blank, basket becomes an empty array
 */

let basket = JSON.parse(localStorage.getItem("data")) || [];

/**
 * ! Generates the shop with product cards composed of
 * ! images, title, price, buttons, description
 */

let generateShop = () => {
    return (shop.innerHTML = shopItemsData
        .map((x) => {
            let { id, name, desc, img, price } = x;
            let search = basket.find((y) => y.id === id) || [];
            return `
            
            <div class="card__produ mt-5">
            <div id=product-id-${id} class="item">
                <img src="${img}" class="card-img-top mt-2" alt="...">
                    <div class="card-body text-center details">
                        <h5 class="card-title mt-3">${name}</h5>
                        <p class="card-text">${desc}</p>
                        <div class="price-quantity m-2">
                            <h2>R$ ${price} </h2>
                            <div class="buttons">
                                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                                <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                            </div>
                        </div>
                    </div>
            </div>
            </div>              
`;
    })
    .join(""));
};

generateShop();
            

/*
------
<div id=product-id-${id} class="item">
                        <img src="${img}" class="card-img-top img-fluid
                        " alt="...">
                        <div class="card-content card-body details">
                            <h5 class="card-title">${name}</h5>
                            <p class="card-text">${desc}</p>
                            <div class="price-quantity">
                                <h2>R$ ${price} </h2>
                                <div class="buttons">
                                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                                        <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                                </div>
                            </div>
                        </div>
                    </div>
------
<div class="card-wrapper">
    <div class="card-item">
        <div id=product-id-${id} class="item">
            <img src="${img}" class="card-img-top" alt="...">
        <div class="card-content card-body details">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${desc}</p>
            <div class="price-quantity">
                <h2>R$ ${price} </h2>
            <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
        </div>
    </div>
</div>

          ---------
          <div class="card__prod">
                        <div id=product-id-${id} class="item">
                            <img src="${img}" class="card-img-top" alt="...">
                                <div class="card-body details">
                                    <h5 class="card-title">${name}</h5>
                                    <p class="card-text">${desc}</p>
                                    <div class="price-quantity">
                                        <h2>R$ ${price} </h2>
                                        <div class="buttons">
                                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                                            <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        </div>
          -------------
<div class="row row-cols-1 row-cols-md-3 g-2">
                <div class="row">
<div class="row row-cols-1 row-cols-md-3 g-4">
  <div class="col">
    <div class="card">
    <div id=product-id-${id} class="item">
      <img src="..." class="card-img-top" alt="...">
      <div class="card-body details">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">${desc}</p>
        <div class="price-quantity">
                <h2>$ ${price} </h2>
                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
      </div>
    </div>
  </div>
  </div>
  --------
  <div id=product-id-${id} class="item card" style="width: 18rem;">
        <img src=${img} alt="" class="card-img-top">
        <div class="details card-body">
            <h3 class="card-title">${name}</h3>
            <p class="card-text">${desc}</p>
            <div class="price-quantity">
                <h2>$ ${price} </h2>
                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
            </div>
        </div>
    </div>
*/

/**
 * ! used to increase the selected product item quantity by 1
 */

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else {
        search.item += 1;
    }

    console.log(basket);
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! used to decrease the selected product item quantity by 1
 */

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }

    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    console.log(basket);
    localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! To update the digits of picked items on each item card
 */

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

/**
 * ! To calculate total amount of selected Items
 */

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
