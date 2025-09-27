export class Drawer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.ctx.strokeStyle = '#FFFFFF';
        this.ctx.lineWidth = 3;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.base();
    }

    base() {
        this.ctx.beginPath();
        this.ctx.moveTo(40, 330);
        this.ctx.lineTo(260, 330);
        this.ctx.moveTo(80, 330);
        this.ctx.lineTo(80, 50);
        this.ctx.lineTo(200, 50);
        this.ctx.lineTo(200, 100);
        this.ctx.stroke();
    }

    cabeza() {
        this.ctx.beginPath();
        this.ctx.arc(200, 130, 30, 0, Math.PI * 2);
        this.ctx.stroke();
    }

    torso() {
        this.ctx.beginPath();
        this.ctx.moveTo(200, 160);
        this.ctx.lineTo(200, 250);
        this.ctx.stroke();
    }

    brazoIzq() {
        this.ctx.beginPath();
        this.ctx.moveTo(200, 180);
        this.ctx.lineTo(150, 230);
        this.ctx.stroke();
    }

    brazoDer() {
        this.ctx.beginPath();
        this.ctx.moveTo(200, 180);
        this.ctx.lineTo(250, 230);
        this.ctx.stroke();
    }

    piernaIzq() {
        this.ctx.beginPath();
        this.ctx.moveTo(200, 250);
        this.ctx.lineTo(150, 300);
        this.ctx.stroke();
    }

    piernaDer() {
        this.ctx.beginPath();
        this.ctx.moveTo(200, 250);
        this.ctx.lineTo(250, 300);
        this.ctx.stroke();
    }

    rostro() {
        this.ctx.beginPath();
        this.ctx.moveTo(190, 125); this.ctx.lineTo(200, 135);
        this.ctx.moveTo(200, 125); this.ctx.lineTo(190, 135);
        this.ctx.moveTo(210, 125); this.ctx.lineTo(220, 135);
        this.ctx.moveTo(220, 125); this.ctx.lineTo(210, 135);
        this.ctx.arc(205, 145, 10, 0, Math.PI, true);
        this.ctx.stroke();
    }

    dibujar(intentos) {
        switch (intentos) {
            case 1: this.cabeza(); break;
            case 2: this.torso(); break;
            case 3: this.brazoIzq(); break;
            case 4: this.brazoDer(); break;
            case 5: this.piernaIzq(); break;
            case 6: this.piernaDer(); break;
            case 7: this.rostro(); break;
        }
    }
}