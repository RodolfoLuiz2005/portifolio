document.addEventListener('DOMContentLoaded', () => {
    const btnMenu = document.getElementById('btn-menu');
    const menu = document.getElementById('menu-mobile');
    const overlay = document.querySelector('.overly-menu');

    if (btnMenu && menu) {
        btnMenu.addEventListener('click', () => {
            menu.classList.add('abrir-menu');
        });

        menu.addEventListener('click', () => {
            menu.classList.remove('abrir-menu');
        });
    }

    if (overlay && menu) {
        overlay.addEventListener('click', () => {
            menu.classList.remove('abrir-menu');
        });
    }

    const form = document.getElementById('contact-form');
    if (!form) return;

    const campos = {
        nome: document.getElementById('nome'),
        email: document.getElementById('email'),
        celular: document.getElementById('celular'),
        mensagem: document.getElementById('mensagem')
    };

    const mensagemSucesso = document.getElementById('mensagem-sucesso');

    function limparMensagemSucesso() {
        if (mensagemSucesso) {
            mensagemSucesso.textContent = '';
        }
    }

    function mostrarErro(campo, mensagem) {
        const erro = document.getElementById(`${campo.id}-erro`);

        campo.classList.add('campo-invalido');
        campo.classList.remove('campo-valido');
        campo.setAttribute('aria-invalid', 'true');

        if (erro) {
            erro.textContent = mensagem;
        }
    }

    function mostrarValido(campo) {
        const erro = document.getElementById(`${campo.id}-erro`);

        campo.classList.add('campo-valido');
        campo.classList.remove('campo-invalido');
        campo.setAttribute('aria-invalid', 'false');

        if (erro) {
            erro.textContent = '';
        }
    }

    function limparValidacao() {
        Object.values(campos).forEach(campo => {
            campo.classList.remove('campo-valido', 'campo-invalido');
            campo.removeAttribute('aria-invalid');
        });

        document.querySelectorAll('.mensagem-erro').forEach(erro => {
            erro.textContent = '';
        });
    }

    function validarNome() {
        const nome = campos.nome.value.trim();

        if (!nome) {
            mostrarErro(campos.nome, 'Digite seu nome.');
            return false;
        }

        if (nome.length < 3) {
            mostrarErro(campos.nome, 'O nome deve ter pelo menos 3 caracteres.');
            return false;
        }

        mostrarValido(campos.nome);
        return true;
    }

    function validarEmail() {
        const email = campos.email.value.trim();
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

        if (!email) {
            mostrarErro(campos.email, 'Digite seu email.');
            return false;
        }

        if (!emailValido) {
            mostrarErro(campos.email, 'Digite um email valido.');
            return false;
        }

        mostrarValido(campos.email);
        return true;
    }

    function validarCelular() {
        const celular = campos.celular.value.trim();
        const celularLimpo = celular.replace(/\D/g, '');
        const celularValido = /^[1-9]{2}9?\d{8}$/.test(celularLimpo);

        if (!celular) {
            mostrarErro(campos.celular, 'Digite seu celular com DDD.');
            return false;
        }

        if (!celularValido) {
            mostrarErro(campos.celular, 'Digite um celular brasileiro valido com DDD.');
            return false;
        }

        mostrarValido(campos.celular);
        return true;
    }

    function validarMensagem() {
        const mensagem = campos.mensagem.value.trim();

        if (!mensagem) {
            mostrarErro(campos.mensagem, 'Digite sua mensagem.');
            return false;
        }

        if (mensagem.length < 10) {
            mostrarErro(campos.mensagem, 'A mensagem deve ter pelo menos 10 caracteres.');
            return false;
        }

        mostrarValido(campos.mensagem);
        return true;
    }

    function validarFormulario() {
        const nomeValido = validarNome();
        const emailValido = validarEmail();
        const celularValido = validarCelular();
        const mensagemValida = validarMensagem();

        return nomeValido && emailValido && celularValido && mensagemValida;
    }

    function validarAoDigitar(validarCampo) {
        limparMensagemSucesso();
        validarCampo();
    }

    campos.nome.addEventListener('input', () => validarAoDigitar(validarNome));
    campos.email.addEventListener('input', () => validarAoDigitar(validarEmail));
    campos.celular.addEventListener('input', () => validarAoDigitar(validarCelular));
    campos.mensagem.addEventListener('input', () => validarAoDigitar(validarMensagem));

    form.addEventListener('submit', event => {
        event.preventDefault();

        if (!validarFormulario()) {
            limparMensagemSucesso();
            return;
        }

        if (mensagemSucesso) {
            mensagemSucesso.textContent = 'Mensagem enviada com sucesso!';
        }

        form.reset();
        limparValidacao();
    });
});
