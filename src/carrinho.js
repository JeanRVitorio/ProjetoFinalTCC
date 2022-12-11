let ShoppingCart = document.getElementById("shopping-cart");
let label = document.getElementById("label");

/**
-->Basket to hold all the selected items - Cesta para armazenar todos os itens selecionados a parte getItem está recuperando dados do armazenamento local se o armazenamento local estiver em branco, a cesta se tornará uma matriz vazia
*/

let basket = JSON.parse(localStorage.getItem("data")) || [];

/**
-->Para calcular a quantidade total de itens selecionados
*/

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

/**
--> Gera a Página do Carrinho com cartões de produtos compostos por imagens, título, preço, botões e preço total

Quando a cesta está em branco -> mostre que o carrinho está vazio
*/

let generateCartItems = () => {
    if (basket.length !== 0) {
        return (ShoppingCart.innerHTML = basket
            .map((x) => {
                let { id, item } = x;
                let search = shopItemsData.find((x) => x.id === id) || [];
                let { img, price, name } = search;
                return `
                <div class="card_carrinho bg-sucess mt-5">
                    <div class"item">
                        <img src="${img}" class="card-img-top mt-2" alt="...">
                        <div class="card-body text-center details">
                            <h5 class="card-title">${name}</h5>
                            <p class="card-text">R$ ${price}</p>
                            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                                <div class="cart-buttons">
                                    <div class="buttons">
                                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                                        <div id=${id} class="quantity">Quantidade: ${item}</div>
                                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                                    </div>
                                </div>
                                    <h3>R$ ${item * price}</h3>
                        </div>
                    </div>
                </div>
        `;
            })
            .join(""));
    } else {
        ShoppingCart.innerHTML = "";
        label.innerHTML = `
    <h2 class="label__carrinho">Carrinho Vazio</h2>
    <a href="index.html">
        <button class="HomeBtn">Voltar para Home</button>
    </a>
    <a href="produtos.html">
        <button class="HomeBtn">Voltar para Produtos</button>
    </a>
    `;
    }
};

/**
<div class="row row-cols-1 row-cols-md-3 g-4">
  <div class="col">
    <div class="card">
      <img src="${img}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">{name}</h5>
        <p class="card-text">R$ ${price}</p>
        <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
        <div class="cart-buttons">
            <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">Quantidade: ${item}</div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
            </div>
            <h3>R$ ${item * price}</h3>
      </div>
    </div>
  </div>
  -----
  <div class="card">
        <div class="cart-item">
            <img width="100" src=${img} alt="" class="img-fluid" />
            <div class="details">
            <div class="title-price-x">
                <h4 class="title-price">
                <p>${name}</p>
                <p class="cart-item-price">R$ ${price}</p>
                </h4>
                <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
            </div>
            <div class="cart-buttons">
            <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">Quantidade: ${item}</div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
            </div>
            <h3>R$ ${item * price}</h3>
            </div>
        </div>
        </div>
 */

generateCartItems();

/**
--> Usado para aumentar a quantidade do item do produto selecionado em 1
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

    generateCartItems();
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
};

/**
--> Usado para diminuir a quantidade do item do produto selecionado em 1
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
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};

/**
--> 
Para atualizar os dígitos dos itens selecionados em cada cartão de item
*/

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
};

/**
-->Usado para remover 1 cartão de produto selecionado da cesta usando o botão X [cruz]
*/

let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);
    calculation();
    generateCartItems();
    TotalAmount();
    localStorage.setItem("data", JSON.stringify(basket));
};

/**

--> Usado para calcular a quantidade total dos produtos selecionados com quantidade específica Quando a cesta estiver em branco, não mostrará nada
*/
function funcao1() {
    alert("Sua compra foi finalizada com sucesso, NotethField agradece sua preferência e aguardamos seu retorno.");
}

let TotalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket
            .map((x) => {
                let { id, item } = x;
                let filterData = shopItemsData.find((x) => x.id === id);
                return filterData.price * item;
            })
            .reduce((x, y) => x + y, 0);

        return (label.innerHTML = `
    <h2 class="label">Total a Pagar : R$ ${amount}</h2>
    <button class="checkout" onclick="funcao1()" value="Exibir alert">Finalizar Compra</button>
    <button onclick="clearCart()" class="removeAll">Limpar Carrinho</button>
    `);
    } else return;
};

TotalAmount();

/**
-->Usado para limpar o carrinho e remover tudo do armazenamento local
*/

let clearCart = () => {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};