class MyHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header>
                <nav>
                    <div class="top-menu">
                        <div class="top-menu__perfil">
                            <img class="top-menu__perfil-img" src="media/img/mini/Mayano_Top_Gun.webp" alt="Perfil">
                            <p class="top-menu__perfil-name"> | Yer</p>
                        </div>
                        <div class="top-menu__links">
                            <a href="/" class="top-menu__link">Inicio</a>
                            <a href="signup" class="top-menu__link">Noticias</a>
                            <a href="#" class="top-menu__link">Comandos</a>
                            <a href="home" class="top-menu__link">Más</a>
                        </div>
                        <div class="top-menu__login">
                            <a href="#" class="top-menu__login-lang">ESP</a>
                            <a href="login" class="top-menu__login-button">Iniciar Sesión</a>
                        </div>
                    </div>
                </nav>
            </header>
        `;
    }
}

customElements.define('my-header', MyHeader);