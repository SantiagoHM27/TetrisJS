class Tetrimino {
    constructor(nombre = random(["Z", "S", "J", "L", "O", "I"])) {
        this.nombre = nombre;
        let base = tetriminosBase[nombre];
        this.color = base.color;
        this.mapa = [];
        for (const pmino of base.mapa) {
            this.mapa.push(pmino.copy());
        }
        this.posición = createVector(int(tablero.columnas / 2), -1);
    }
    moverDerecha(){
        this.posición.x++;
        if ( this.movimientoErroneo) {
            this.moverIzquierda();
        }
    }
    moverIzquierda(){
        this.posición.x--;
        if ( this.movimientoErroneo) {
            this.moverDerecha();
        }
    }
    moverAbajo() {
        this.posición.y++;
        if ( this.movimientoErroneo) {
            this.moverArriba();
            if (tetrimino == this) {
                tablero.almacernarMino = this;
                tetrimino = new Tetrimino();
            }
            return false
        }
        return true
    }
    
    moverArriba() {
        this.posición.y--;
    }

    ponerEnElFondo(){
        this.posición = this.espectro.posición
        this.moverAbajo()
    }

    girar(){
        for ( const pmino of this.mapa) {
            pmino.set(pmino.y, -pmino.x);
        }
        if ( this.movimientoErroneo){
            this.desgirar();
        }
    }

    desgirar() {
        for ( const pmino of this.mapa) {
            pmino.set(-pmino.y, pmino.x);
        }
    }
    
    
}