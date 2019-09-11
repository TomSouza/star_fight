import {Colisor} from './life_source/colisor.js';
import {Teclado} from './life_source/teclado.js';
import {Animate} from './life_source/animate.js';
import {Explode} from './sprites/explode.js';
import {Heroi} from './sprites/heroi.js';
import {Bola} from './sprites/bola.js';

export class Engine {
    constructor(_element, _context) {
        this.canvas = document.getElementById(_element);
        this.context = this.canvas.getContext(_context);
        this.colisor = new Colisor();
        this.animacao = new Animate(this.context);

        console.log(this);
    }

    run() {
        // Criando alguns sprites
        var b1 = new Bola(this.context);
        b1.x = 50;
        b1.y = 200;
        b1.velocidadeX = 3;
        b1.velocidadeY = -5;
        b1.cor = 'red';
        b1.raio = 15;
        b1.ident = 'b1';
        b1.bounce = true;

        var b2 = new Bola(this.context);
        b2.x = 200;
        b2.y = 100;
        b2.velocidadeX = -5;
        b2.velocidadeY = 0;
        b2.cor = 'blue';
        b2.raio = 10;
        b2.ident = 'b2';
        b2.bounce = true;

        var b3 = new Bola(this.context);
        b3.x = 50;
        b3.y = 300;
        b3.velocidadeX = 0;
        b3.velocidadeY = 5;
        b3.cor = 'green';
        b3.raio = 10;
        b3.ident = 'b3';
        b3.bounce = true;

        var expld = new Explode(this.context);
        var imagemExpl = new Image();
        imagemExpl.src = "engine/images/Fire8.png";
        expld.imagem = imagemExpl;
        expld.imgSize = 80;
        expld.frameSize = 192;
        expld.ident = "explode";

        // Criando o loop de animação

        this.animacao.novoSprite(b1);
        this.animacao.novoSprite(b2);
        this.animacao.novoSprite(b3);
        //this.animacao.novoSprite(expld);

        colisor.novoSprite(b1);
        colisor.novoSprite(b2);
        colisor.novoSprite(b3);

        this.animacao.colisor = colisor;

        b1.animacao = this.animacao;
        b2.animacao = this.animacao;
        b3.animacao = this.animacao;
        // --- //
        b1.colisor = colisor;
        b2.colisor = colisor;
        b3.colisor = colisor;

        //animacao.ligar();

        /* Movimentando personagem */

        // Posição inicial do personagem

        var teclado = new Teclado(document);
        var img = new Image();

        img.src = "engine/images/BlackMage.png";

        var personagem = new Heroi(this.context, teclado, animacao, img, colisor);
        personagem.imgPosX = 0;
        personagem.imgPosY = 150;
        personagem.imgSizeX = 42;
        personagem.imgSizeY = 58;
        personagem.velocidade = 2.5;
        personagem.ident = 'person';

        colisor.novoSprite(personagem);
        personagem.colisor = colisor;

        // Init
        animacao.novoSprite(personagem);

        img.onload = function(){
            if(!animacao.ligado) {
                animacao.colisor = colisor;
                animacao.ligar();
            }
        }

        teclado.disparou(ESPACO, function() {
            personagem.atirar(expld);
        });

        $("#char_input input").click(function(){
            img.src = $(this).val();
            personagem.sheet.update_img(img);
            $("#char_input input").blur();
        });
    }
}


