// burger

let burger_btn = document.getElementsByClassName('burger-icon')[0];
let burger_menu = document.getElementsByClassName('burger__menu')[0];

function openCloseMenu() {
    if (burger_menu.parentElement.classList.contains('block')) {
        burger_menu.classList.toggle('open');
        setTimeout(() => document.getElementsByClassName('parent')[0].classList.toggle('block'), 500);
    } else {
        document.getElementsByClassName('parent')[0].classList.toggle('block');
        setTimeout(() => burger_menu.classList.toggle('open'), 1);
    }
    burger_btn.getElementsByTagName('div')[0].classList.toggle('line_one');
    burger_btn.getElementsByTagName('div')[1].classList.toggle('line_two');
    document.body.classList.toggle('hidden');
}

burger_btn.onclick = () => {
    openCloseMenu();
}
burger_menu.addEventListener('click', function (e) {
    openCloseMenu();
});

window.addEventListener('resize',() => {
    if (window.innerWidth >= 768 && burger_menu.parentElement.classList.contains('block')) {
        openCloseMenu();
    }
});

// burger

// categories
let cards_parent = document.getElementsByClassName('cards')[0];
function remAll() {
    while (cards_parent.firstChild) {
        cards_parent.removeChild(cards_parent.firstChild);
    }
}

async function fillCards(num) {
    remAll();
    let data = await fetch("products.json");
    let json = await data.json();

    let a, b;
    switch (num) {
        case 0:
            a = 0;
            b = 7;
            break;
        case 1:
            a = 8;
            b = 11;
            break;
        case 2:
            a = 12;
            b = 19;
            break;
    }

    let q = 0;
    for (let i = a; i <= b; i++) {
        let card = document.createElement('div');
        card.id = q;
        card.classList.add('card');

        let img = document.createElement('div');
        img.classList.add('img');
        img.style.backgroundImage = 'url(img/menu/'+json[i].category+'/'+json[i].category+'-'+(q+1)+'.png)';

        let card_content = document.createElement('div');
        card_content.classList.add('card__content');

        let card_title = document.createElement('h3');
        card_title.classList.add('card__title');
        card_title.innerText = json[i].name;

        let div = document.createElement('div');

        let card_text = document.createElement('p');
        card_text.classList.add('card__text');
        card_text.innerText = json[i].description;

        let card_price = document.createElement('p');
        card_price.classList.add('card__price');
        card_price.innerText = '$' + json[i].price;

        div.appendChild(card_text);
        div.appendChild(card_price);

        card_content.appendChild(card_title);
        card_content.appendChild(div);

        card.appendChild(img);
        card.appendChild(card_content);

        cards_parent.appendChild(card);
        q++;
    }
    openModal();
}


let categories = document.getElementsByClassName('nav__btn');

for (let i = 0; i < categories.length; i++) {
    categories[i].onclick = () => {
        for (let x = 0; x < categories.length; x++) {
            categories[x].classList.remove('active');
        }
        categories[i].classList.add('active');
        fillCards(parseInt(categories[i].id)-10);
        document.getElementsByClassName('more')[0].classList.remove('none');
        if (parseInt(categories[i].id) === 11) {
            document.getElementsByClassName('more')[0].classList.add('none');
        }
    }
}

let load_btn = document.getElementsByClassName('more')[0];
load_btn.onclick = () => {
    let cards = document.getElementsByClassName('card');
    for (let i = 0; i<cards.length; i++) {
        cards[i].classList.add('block');
    }
    load_btn.classList.add('none');
}

// categories

// popup
async function fillModal(card, num) {
    let sizeAdd = 0;
    let additivesAdd = 0;
    let size_btns = modal.getElementsByTagName('ol')[0].getElementsByTagName('li');
    let additives_btns = modal.getElementsByTagName('ol')[1].getElementsByTagName('li');
    for (let i = 0; i<size_btns.length; i++) {
        size_btns[i].classList.remove('size_active');
        additives_btns[i].classList.remove('size_active');
    }
    size_btns[0].classList.add('size_active');

    let data = await fetch("products.json");
    let json = await data.json();
    let img_src = card.getElementsByClassName('img')[0].style.backgroundImage;
    modal.getElementsByTagName('img')[0].src = img_src.slice(5, img_src.length-2);
    let type = img_src.slice(5, img_src.length-2).split('/')[2];
    if (type === 'tea') {
        num += 8;
    } else if (type === 'dessert') {
        num += 12;
    }
    modal.getElementsByTagName('h3')[0].innerText = json[num].name;
    modal.getElementsByTagName('p')[0].innerText = json[num].description;
    modal.getElementsByTagName('h3')[2].innerText = '$'+json[num].price;
    let sizes = modal.getElementsByTagName('ol')[0];
    sizes.getElementsByTagName('li')[0].getElementsByTagName('p')[1].innerText = json[num].sizes.s.size;
    sizes.getElementsByTagName('li')[0].getElementsByTagName('div')[0].innerText = json[num].sizes.s.add_price;
    sizes.getElementsByTagName('li')[1].getElementsByTagName('p')[1].innerText = json[num].sizes.m.size;
    sizes.getElementsByTagName('li')[1].getElementsByTagName('div')[0].innerText = json[num].sizes.m.add_price;
    sizes.getElementsByTagName('li')[2].getElementsByTagName('p')[1].innerText = json[num].sizes.l.size;
    sizes.getElementsByTagName('li')[2].getElementsByTagName('div')[0].innerText = json[num].sizes.l.add_price;

    let additives = modal.getElementsByTagName('ol')[1];
    additives.getElementsByTagName('li')[0].getElementsByTagName('p')[1].innerText = json[num].additives[0].name;
    additives.getElementsByTagName('li')[0].getElementsByTagName('div')[0].innerText = json[num].additives[0].add_price;
    additives.getElementsByTagName('li')[1].getElementsByTagName('p')[1].innerText = json[num].additives[1].name;
    additives.getElementsByTagName('li')[1].getElementsByTagName('div')[0].innerText = json[num].additives[1].add_price;
    additives.getElementsByTagName('li')[2].getElementsByTagName('p')[1].innerText = json[num].additives[2].name;
    additives.getElementsByTagName('li')[2].getElementsByTagName('div')[0].innerText = json[num].additives[2].add_price;

    for (let i = 0; i<size_btns.length; i++) {
        size_btns[i].onclick = () => {
            for (let x = 0; x<size_btns.length; x++) {
                size_btns[x].classList.remove('size_active');
            }
            size_btns[i].classList.add('size_active');
            modal.getElementsByTagName('h3')[2].innerHTML = '$' + (parseFloat(json[num].price) + (0.5*i) + additivesAdd).toFixed(2);
            sizeAdd = 0.5*i;
        }
    }

    for (let i = 0; i<additives_btns.length; i++) {
        additives_btns[i].onclick = () => {
            if (additives_btns[i].classList.contains('size_active')) {
                additives_btns[i].classList.remove('size_active');
                additivesAdd -= 0.5;
            } else {
                additives_btns[i].classList.add('size_active');
                additivesAdd += 0.5;
            }
            modal.getElementsByTagName('h3')[2].innerHTML = '$' + (parseFloat(json[num].price) + sizeAdd + additivesAdd).toFixed(2);
        }
    }
}

let modal = document.getElementsByClassName('modal')[0];
function openModal() {
    let cards = document.getElementsByClassName('card');
    for (let i = 0; i < cards.length; i++ ) {
        cards[i].onclick = () => {
            fillModal(cards[i], parseInt(cards[i].id));
            modal.classList.remove('none');
            document.body.style.overflow = 'hidden';
        }
    }
}

modal.addEventListener('click', function (e) {
    if (e.target === modal || e.target === modal.getElementsByTagName('button')[0]) {
        modal.classList.add('none');
        document.body.style.overflow = 'visible';
    }
})
openModal();
// popup