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

    get movimientoErroneo(){
        let salióDelTablero = !this.estáDentroDelTablero;
        return salióDelTablero || this.colisiónConMinosAlmacenados;
    }

    get colisiónConMinosAlmacenados() {
        for (const pmino of this.mapaTablero) {
            if (tablero.minosAlmacenados[pmino.x][pmino.y]) {
                return true;
            }
        }
        return false;
    }

    get estáDentroDelTablero() {
        for (const pmino of this.mapaTablero) {
            if (pmino.x < 0) {
                return true;
            }
            if (pmino.x >= tablero.columnas) {
                return false;
            }
            if (pmino.y >= tablero.filas) {
                return false;
            }
        }
        return false;
    }

    get mapaTablero() {
        let retorno = [];
        for (const pmino of this.mapa) {
            let copy = pmino.copy().add(this.posición);
            retorno.push(copy);
        }
        return retorno;
    }

    dibujar() {
        push();
        fill(this.color);
        for ( const pmino of this.mapaCanvas) {
            Tetrimino.dibujarMino(pmino);
        }
        pop();
        if ( tetrimino == this) {
            this.dibujarEspectro();
        }
    }

    dibujarEspectro(){
        this.espectro = new Tetrimino(this.nombre);
    this.espectro.posición = this.posición.copy()
    for (let i = 0; i < this.mapa.length; i++) {
      this.espectro.mapa[i] = this.mapa[i].copy()
    }
    while (this.espectro.moverAbajo());
    push()
    drawingContext.globalAlpha = 0.3
    this.espectro.dibujar();
    pop()

    

    }

     
    
    
}