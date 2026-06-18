document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const header = document.getElementById('site-header');
    const btnMenu = document.getElementById('btn-menu');
    const menu = document.getElementById('menu-mobile');
    const overlay = document.querySelector('.overlay-menu');
    const btnFechar = document.querySelector('.btn-fechar');
    const mobileLinks = menu ? menu.querySelectorAll('a[href^="#"]') : [];

    function atualizarHeader() {
        if (!header) return;
        header.classList.toggle('scrolled', window.scrollY > 12);
    }

    function abrirMenu() {
        if (!menu || !btnMenu || !overlay || !header) return;

        menu.classList.add('abrir-menu');
        overlay.classList.add('active');
        header.classList.add('menu-active');
        body.classList.add('menu-open');
        menu.setAttribute('aria-hidden', 'false');
        btnMenu.setAttribute('aria-expanded', 'true');
    }

    function fecharMenu() {
        if (!menu || !btnMenu || !overlay || !header) return;

        menu.classList.remove('abrir-menu');
        overlay.classList.remove('active');
        header.classList.remove('menu-active');
        body.classList.remove('menu-open');
        menu.setAttribute('aria-hidden', 'true');
        btnMenu.setAttribute('aria-expanded', 'false');
    }

    atualizarHeader();
    window.addEventListener('scroll', atualizarHeader, { passive: true });

    if (btnMenu) {
        btnMenu.addEventListener('click', abrirMenu);
    }

    if (btnFechar) {
        btnFechar.addEventListener('click', fecharMenu);
    }

    if (overlay) {
        overlay.addEventListener('click', fecharMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', fecharMenu);
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            fecharMenu();
        }
    });

    document.querySelectorAll('.stagger').forEach(group => {
        Array.from(group.children).forEach((item, index) => {
            item.style.setProperty('--stagger-index', index);
        });
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealElements = document.querySelectorAll('.reveal, .stagger > *');

    function revelarElemento(element) {
        element.classList.add('reveal-visible');
    }

    function revelarTudo() {
        revealElements.forEach(revelarElemento);
    }

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        revelarTudo();
    } else {
        body.classList.add('animations-ready');

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    revelarElemento(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.16,
            rootMargin: '0px 0px -10% 0px'
        });

        revealElements.forEach(element => {
            observer.observe(element);
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
    const submitButton = document.getElementById('submit-button');
    const submitText = submitButton ? submitButton.textContent : '';

    function campoExiste(campo) {
        return campo instanceof HTMLElement;
    }

    function limparMensagemSucesso() {
        if (!mensagemSucesso) return;
        mensagemSucesso.textContent = '';
        mensagemSucesso.classList.remove('erro-envio');
    }

    function mostrarMensagemEnvio(mensagem, tipo = 'sucesso') {
        if (!mensagemSucesso) return;
        mensagemSucesso.textContent = mensagem;
        mensagemSucesso.classList.toggle('erro-envio', tipo === 'erro');
    }

    function mostrarErro(campo, mensagem) {
        if (!campoExiste(campo)) return;
        const erro = document.getElementById(`${campo.id}-erro`);

        campo.classList.add('campo-invalido');
        campo.classList.remove('campo-valido');
        campo.setAttribute('aria-invalid', 'true');

        if (erro) {
            erro.textContent = mensagem;
        }
    }

    function mostrarValido(campo) {
        if (!campoExiste(campo)) return;
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
            if (!campoExiste(campo)) return;
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
            mostrarErro(campos.nome, 'Informe seu nome.');
            return false;
        }

        if (nome.length < 3) {
            mostrarErro(campos.nome, 'O nome precisa ter pelo menos 3 caracteres.');
            return false;
        }

        mostrarValido(campos.nome);
        return true;
    }

    function validarEmail() {
        const email = campos.email.value.trim();
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

        if (!email) {
            mostrarErro(campos.email, 'Informe seu e-mail.');
            return false;
        }

        if (!emailValido) {
            mostrarErro(campos.email, 'Digite um e-mail válido.');
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
            mostrarErro(campos.celular, 'Informe seu celular com DDD.');
            return false;
        }

        if (!celularValido) {
            mostrarErro(campos.celular, 'Digite um celular brasileiro válido com DDD.');
            return false;
        }

        mostrarValido(campos.celular);
        return true;
    }

    function validarMensagem() {
        const mensagem = campos.mensagem.value.trim();

        if (!mensagem) {
            mostrarErro(campos.mensagem, 'Escreva sua mensagem.');
            return false;
        }

        if (mensagem.length < 10) {
            mostrarErro(campos.mensagem, 'A mensagem precisa ter pelo menos 10 caracteres.');
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

    if (Object.values(campos).every(campoExiste)) {
        campos.nome.addEventListener('input', () => validarAoDigitar(validarNome));
        campos.email.addEventListener('input', () => validarAoDigitar(validarEmail));
        campos.celular.addEventListener('input', () => validarAoDigitar(validarCelular));
        campos.mensagem.addEventListener('input', () => validarAoDigitar(validarMensagem));
    }

    async function enviarFormulario() {
        const endpoint = form.action;

        if (!endpoint || endpoint.includes('SEU_ID_AQUI')) {
            throw new Error('Endpoint do Formspree não configurado.');
        }

        const resposta = await fetch(endpoint, {
            method: form.method,
            body: new FormData(form),
            headers: {
                Accept: 'application/json'
            }
        });

        if (!resposta.ok) {
            throw new Error('Falha no envio do formulário.');
        }
    }

    form.addEventListener('submit', async event => {
        event.preventDefault();
        limparMensagemSucesso();

        if (!validarFormulario()) {
            const primeiroCampoInvalido = form.querySelector('.campo-invalido');
            if (primeiroCampoInvalido) {
                primeiroCampoInvalido.focus();
            }
            return;
        }

        try {
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Enviando...';
            }

            await enviarFormulario();
            mostrarMensagemEnvio('Mensagem enviada com sucesso. Obrigado pelo contato!');
            form.reset();
            limparValidacao();
        } catch (erro) {
            mostrarMensagemEnvio('Não foi possível enviar agora. Tente novamente ou chame pelo WhatsApp.', 'erro');
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = submitText;
            }
        }
    });
});
