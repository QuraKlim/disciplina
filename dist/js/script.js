'use strict'

const btn = document.querySelector('.btn_modal'),
      modal = document.querySelector('.feedback'),
      close = document.querySelector('.close_modal'),
      body = document.querySelector('body'),
      form = document.querySelector('form'),
      submit = document.querySelector('#submit'),
      thanks = document.querySelector('.thanks'),
      closeThanks = document.querySelector('.close_thanks'), 
      thanksSubitle = document.querySelector('.thanks h2');


function openModal() {
    modal.classList.remove('hide');
    modal.classList.add('active');
    body.classList.add('overflow');
}

function closeModal() {
    modal.classList.remove('active');
    modal.classList.add('hide');
    body.classList.remove('overflow');
}

function closeThankScreen() {
    thanks.classList.remove('active');
    thanks.classList.add('hide');
    body.classList.remove('overflow');
}

function openThanksScreen () {
    closeThanks.classList.remove('hide');
    closeThanks.classList.add('active');
    body.classList.add('overflow');
}

closeThanks.addEventListener('click', () => {
    closeThankScreen();
});

closeThanks.addEventListener('click', (e) => {
    if (e.target === thanks) {
        closeThankScreen();
    }
});

function sendMessage(message) {
    thanks.classList.remove('hide');
    thanks.classList.add('active');    
    body.classList.add('overflow');
    thanksSubitle.innerHTML = message;
};

btn.addEventListener('click', () => {
    openModal();
});

close.addEventListener('click', () => {
    closeModal();
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

closeThanks.addEventListener('click', () => {
    closeThankScreen();
});

closeThanks.addEventListener('click', (e) => {
    if (e.target === thanks) {
        closeThankScreen();
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    sendForm(form);
    form.reset();
    closeModal();
    openThanksScreen();
});

function sendForm () {
    const formData = new FormData(form);
    const json = JSON.stringify(Object.fromEntries(formData.entries()));

    fetch('http://localhost:3000/posts', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: json
    }).then(data => {
        console.log(data.json());
        sendMessage('We will contact you by email or mobile phone.');
    }).catch(() => {
        console.log('Error');
        sendMessage('Something goes wrong...<br>Sorry. Try again later');
    });
}