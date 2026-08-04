class TopMenu extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
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
        `;
    }
}

customElements.define('top-menu', TopMenu);

class SideMenu extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div id="sideMenu" class="side-menu">
                <div class="side-menu__logo">
                    <img class="side-menu__logo-img" src="media/img/mini/Kitasan_Black.webp" alt="Uma">
                    <h1 class="side-menu__title">Sambot</h1>
                </div>
                <div class="side-menu__links">
                <a href="#" class="side-menu__link">
                    <svg class="side-menu__link-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 16C15 15.2044 14.6839 14.4413 14.1213 13.8787C13.5587 13.3161 12.7957 13 12 13C11.2044 13 10.4413 13.3161 9.87868 13.8787C9.31607 14.4413 9 15.2043 9 16V20H4L4 10L8 6.5M12 3L20 10L20 20H15" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p class="side-menu__title">Home</p>
                </a>
                </div>
            </div>
            <div class="side-menu__activator">
                <button data-status="off" id="sideMenuBtn" class="side-menu__btn-activator">
                    ...
                </button>
            </div>
        `;
    }
}

customElements.define('side-menu', SideMenu);
