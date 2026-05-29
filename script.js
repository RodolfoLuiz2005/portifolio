let btnMenu = document.getElementById('btn-menu')
let menu = document.getElementById('menu-mobile')
let overlay = document.getElementById('overlay-menu')

btnMenu.addEventListener('click', () => {
    menu.classList.add('abrir-menu')
})

menu.addEventListener('click', () => {
    menu.classList.remove('abrir-menu')
})

overly.addEventListener('click', () => {
    menu.classList.remove('abrir-menu')
})

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', event => {
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const celular = document.getElementById('celular').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const celularLimpo = celular.replace(/\D/g, '');
        const celularValido = /^\d{8,15}$/.test(celularLimpo);

        if (!nome || !email || !celular || !mensagem) {
            alert('Por favor, preencha todos os campos.');
            event.preventDefault();
            return;
        }

        if (!emailValido) {
            alert('Digite um e-mail válido.');
            event.preventDefault();
            return;
        }

        if (!celularValido) {
            alert('Digite um número de celular válido.');
            event.preventDefault();
            return;
        }
    });
})
