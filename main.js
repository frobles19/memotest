const listaEmojis = ['🍊', '🍐', '🌶️', '🥦', '🍆', '🥥', '🍄', '🌽', '🍉', '🥔', '🍊', '🍐', '🌶️', '🥦', '🍆', '🥥', '🍄', '🌽', '🍉', '🥔'];
const tarjetas = document.querySelectorAll('.tarjeta');

class Memotest {
    constructor(listaEmojis) {
        this.listaEmojis = listaEmojis;
        this.parejasEncontradas = 0;
        this.tarjetasNoEncontradas = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
        this.tarjetasVolteadas = 0;
        this.primerCartaVolteada = undefined;
        this.segundaCartaVolteada = undefined;
        this.bloquearBoton = false;
        this.cartas = Array.from(tarjetas);
    }

    comenzarJuego() {
        this.tarjetasNoEncontradas = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
        this.parejasEncontradas = 0;
        this.primerCartaVolteada = 0;
        this.tarjetasVolteadas = 0;
        this.bloquearBoton = false;
        this.mezclarCartas();
        this.cartas.forEach((carta) => {
            carta.classList.remove('tarjeta-volteada');
        })
        this.agregarOnClick();
    }

    agregarOnClick() {
        this.tarjetasNoEncontradas.forEach((noEncontrada, i) => {
            this.cartas[noEncontrada].onclick = () => this.clickBoton(i);
            this.cartas[noEncontrada].classList.add('no-volteada');
        })
    }

    mezclarCartas() {
        this.listaEmojis.sort(() => Math.random() - 0.5);
        console.log(this.listaEmojis);
        this.repartirCartas();
    }

    repartirCartas() {
        this.listaEmojis.forEach((emoji, i) => {
            this.cartas[i].textContent = emoji;
        })
    }

    clickBoton(value) {
        !this.bloquearBoton && this.voltearCarta(value);
    }

    voltearCarta(value) {
        console.log(this.cartas[value].id)
        this.cartas[value].classList.add('tarjeta-volteada');
        this.cartas[value].classList.remove('no-volteada')

        /*this.cartas[value].style.transform = 'rotateY(180deg)';
        this.cartas[value].style.transition = 'transform .3s ease-in-out';*/

        if (this.tarjetasVolteadas === 0) {
            this.tarjetasVolteadas = 1;
            this.primerCartaVolteada = this.cartas[value];
            this.primerCartaVolteada.onclick = '';
        } else {
            this.tarjetasVolteadas = 0;
            this.segundaCartaVolteada = this.cartas[value];
            this.segundaCartaVolteada.onclick = '';
            if (this.primerCartaVolteada.textContent !== this.segundaCartaVolteada.textContent) {
                this.bloquearBoton = true;
                setTimeout(() => {
                    this.primerCartaVolteada.classList.remove('tarjeta-volteada');
                    this.segundaCartaVolteada.classList.remove('tarjeta-volteada');
                    this.bloquearBoton = false;
                    this.tarjetasNoEncontradas.slice(this.primerCartaVolteada.id, this.primerCartaVolteada.id + 1);
                    this.tarjetasNoEncontradas.slice(this.segundaCartaVolteada.id, this.segundaCartaVolteada.id + 1);
                    this.agregarOnClick();
                }, 1500)
            } else {
                this.parejasEncontradas++;
                this.comprobarFin();
            }
        }
    }

    comprobarFin() {
        if (this.parejasEncontradas >= 20) {
            this.bloquearBoton = true;
            this.cartas.forEach(carta => {
                carta.classList.add('ganador');
            })
        }
    }
}

const memotest = new Memotest(listaEmojis);
memotest.comenzarJuego();

