import { Drawer } from './canvas.js';

class Game {
    constructor(drawer) {
        this.drawer = drawer;
        this.contenedorPalabra = document.getElementById('contenedor-palabras');
        this.contenedorTecla = document.getElementById('tecla-contenedor');
        this.contenedorMensaje = document.getElementById('mensaje-contenedor');

        this.palabras = [
            "PALINDROMO", "USUMACINTA", "ESTERNOCLEIDOMASTOIDEO",
            "ONOMATOPEYA", "DANTESCO", "OTORRINOLARINGOLOGO",
            "PARALELEPIPEDO", "ELECTROENCEFALOGRAMA", "ANTICONSTITUCIONALMENTE",
            "HIPOPOTOMONSTROSESQUIPEDALIOFOBIA", "AUTONOMO", "ININTELIGIBLE",
            "DESOXIRRIBONUCLEICO", "AUTOWIRED", "MURCIELAGO",
            "TERMICO", "GRAVITATORIO", "QUIMERA", "TEROPODO", "NICENOCONSTANTINOPOLITANO"
        ];

        this.intentos = 7;
        this.palabraSecreta = '';
        this.displayWord = [];
        this.errores = 0;
        this.letrasUsadas = new Set();
        this.seAcabo = false;
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    start() {
        this.seAcabo = false;
        this.errores = 0;
        this.letrasUsadas.clear();
        const randomIndex = Math.floor(Math.random() * this.palabras.length);
        this.palabraSecreta = this.palabras[randomIndex];
        this.displayWord = Array(this.palabraSecreta.length).fill('_');
        this.resetUI();
        this.updateWordDisplay(this.displayWord);
        this.createKeyboard();
        this.drawer.clear();
    }

    handleKeyPress(letter) {
        if (this.seAcabo || this.letrasUsadas.has(letter)) {
            return;
        }
        this.letrasUsadas.add(letter);
        this.disableButton(letter);
        let letterFound = false;
        for (let i = 0; i < this.palabraSecreta.length; i++) {
            if (this.palabraSecreta[i] === letter) {
                this.displayWord[i] = letter;
                letterFound = true;
            }
        }
        if (letterFound) {
            this.updateWordDisplay(this.displayWord);
            this.checkWinCondition();
        } else {
            this.errores++;
            this.drawer.dibujar(this.errores);
            this.checkLossCondition();
        }
    }

    checkWinCondition() {
        if (!this.displayWord.includes('_')) {
            this.seAcabo = true;
            
            const intentosRestantes = this.intentos - this.errores;
            let mensajeFinal = `¡Felicidades! Adivinaste. Te quedaban ${intentosRestantes} intentos`;

            if (intentosRestantes === 1) {
                mensajeFinal = `¡Felicidades! Adivinaste. Te quedaba 1 intento.`;
            }
            
            this.showMessage(mensajeFinal, 'win');
        }
    }

    checkLossCondition() {
        if (this.errores >= this.intentos) {
            this.seAcabo = true;
            this.showMessage(`Perdiste. La palabra era: ${this.palabraSecreta}`, 'loss');
        }
    }

    createKeyboard() {
        this.contenedorTecla.innerHTML = '';
        const alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
        for (let i = 0; i < alphabet.length; i++) {
            const letter = alphabet[i];
            const button = document.createElement('button');
            button.className = 'key-button';
            button.textContent = letter;
            button.addEventListener('click', () => this.handleKeyPress(letter));
            this.contenedorTecla.appendChild(button);
        }
    }

    updateWordDisplay(wordArray) {
        this.contenedorPalabra.textContent = wordArray.join(' ');
    }

    showMessage(text, type) {
        this.contenedorMensaje.textContent = text;
        this.contenedorMensaje.className = type;
    }

    disableButton(letter) {
        const buttons = this.contenedorTecla.getElementsByTagName('button');
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].textContent === letter) {
                buttons[i].disabled = true;
                break;
            }
        }
    }

    resetUI() {
        this.contenedorMensaje.textContent = '';
        this.contenedorMensaje.className = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const drawer = new Drawer('hangman-canvas');
    const game = new Game(drawer);
    const resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', () => game.start());
    game.start();
});