
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
burger_menu.addEventListener('click', function () {
    openCloseMenu();
});

window.addEventListener('resize',() => {
    if (window.innerWidth >= 768 && burger_menu.parentElement.classList.contains('block')) {
        openCloseMenu();
    }
});

// burger

// carousel

let slideWidth = window.innerWidth < 768 ? 350 : 477;
window.addEventListener('resize',() => {
    if (window.innerWidth < 768) {
        slideWidth = 350;
        pos = 0;
        skip(pos);
        remAll();
        nav_btns[Math.abs(pos/slideWidth)].classList.add('current');
        alarm.setup();
    } else {
        slideWidth = 477;
        pos = 0;
        skip(pos);
        remAll();
        nav_btns[Math.abs(pos/slideWidth)].classList.add('current');
        alarm.setup();
    }
});

let left_btn = document.getElementsByClassName('arrow')[0];
let right_btn = document.getElementsByClassName('arrow')[1];
let line = document.getElementsByClassName('line')[0];
let pos = 0;

function goLeft() {
    if (pos == 0) {
        pos = -slideWidth*2;
    }else {
        pos += slideWidth;
    }
    skip(pos);
    remAll();
    nav_btns[Math.abs(pos/slideWidth)].classList.add('current');
    alarm.setup();
}
function goRight() {
    if (pos == -slideWidth*2) {
        pos = 0;
    }else {
        pos -= slideWidth;
    }
    skip(pos);
    remAll();
    nav_btns[Math.abs(pos/slideWidth)].classList.add('current');
    alarm.setup();
}

left_btn.onclick = () => {
    goLeft();
}
right_btn.onclick = () => {
    goRight();
}

function skip(pos) {
    line.style.marginLeft = pos + 'px';
}

let nav_btns = document.getElementsByClassName('nav_load');
let nav_btns_empty = document.getElementsByClassName('nav__btn');


function remAll() {
    for (let i = 0; i<nav_btns.length; i++) {
        nav_btns[i].classList.remove('current');
    }
}
for (let i = 0; i<nav_btns.length; i++) {
    nav_btns_empty[i].onclick = () => {
        remAll();
        pos = -slideWidth*i;
        skip(pos);
        setTimeout(() => nav_btns[i].classList.add('current'), 1);
        setTimeout(() => alarm.setup(), 1);
    }
}



const alarm = {
    setup() {
      if (typeof this.timeoutID === "number") {
        this.cancel();
      }
      this.timeoutID = setTimeout(() =>
      goRight(), 5000);
      start = Date.now();
    },
    cancel() {
      clearTimeout(this.timeoutID);
    },
    pause() {
        clearTimeout(this.timeoutID);
        remaining = 5000 - (Date.now() - start);
        console.log(remaining);
    },
    resume() {
        if (typeof this.timeoutID === "number") {
            this.cancel();
        }
        this.timeoutID = setTimeout(() =>
        goRight(), remaining);
    }
};
alarm.setup();

let viewPort = document.getElementsByClassName('cards')[0];
viewPort.addEventListener('mouseover', function () {
    let loadLine = document.getElementsByClassName('current')[0];
    loadLine.style.animationPlayState = "paused";
    console.log('mouseover');
    alarm.pause();
});
viewPort.addEventListener('mouseout', function () {
    let loadLine = document.getElementsByClassName('current')[0];
    loadLine.style.animationPlayState = "running";
    console.log('mouseout');
    alarm.resume();
});

let touchstartX = 0
let touchendX = 0

function checkDirection() {
  if (touchendX < touchstartX) goRight();
  if (touchendX > touchstartX) goLeft();
}


viewPort.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX
})
viewPort.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX
    checkDirection()
})
// carousel