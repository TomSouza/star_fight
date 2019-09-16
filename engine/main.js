import { Colisor } from "./life_source/colisor.js";
import { Teclado } from "./life_source/teclado.js";
import { Animate } from "./life_source/animate.js";
import { Explode } from "./sprites/explode.js";
import { Heroi } from "./sprites/heroi.js";
import { Bola } from "./sprites/bola.js";
import { Quadrado } from "./sprites/quadrado.js";

var currentType;
var currentForm;

export class Engine {
  constructor(_element, _context) {
    this.canvas = document.getElementById(_element);
    this.context = this.canvas.getContext(_context);
    this.colisor = new Colisor();
    this.animacao = new Animate(this.context);

    this.minhasbolas = [];

    currentType = "circulo";
    currentForm = "esfera";
  }

  drawCircle(raio) {
    var form = new Bola(this.context);
    form.lifetime = 101;
    form.raio = raio;
    form.cor = `rgb(
		   	${Math.random() * (255 - 0) + 0},
			  ${Math.random() * (255 - 0) + 0},
		    0
		)`;
    return form;
  }

  drawSquare(altura, largura) {
    var form = new Quadrado(this.context);
    form.lifetime = 101;
    form.altura = altura;
    form.largura = largura;
    form.cor = `rgb(
		   	${Math.random() * (255 - 0) + 0},
			${Math.random() * (255 - 0) + 0},
		    0
		)`;
    return form;
  }

  createSphere() {
    var rect = this.canvas.getBoundingClientRect();

    var center_X = event.clientX - rect.left;
    var center_Y = event.clientY - rect.top;

    var radius = 20;

    var angInc = (2 * Math.PI) / 20;

    var formInSpace;

    for (var i = 0; i < 2 * Math.PI; i += angInc) {
      if (currentForm == "esfera") formInSpace = this.drawCircle(5);
      else formInSpace = this.drawSquare(5, 5);
      formInSpace.x = center_X + radius * Math.cos(i);
      formInSpace.y = center_Y + radius * Math.sin(i);
      this.animacao.novoSprite(formInSpace);
    }
  }

  createSpiral() {
    var rect = this.canvas.getBoundingClientRect();

    var center_X = event.clientX - rect.left;
    var center_Y = event.clientY - rect.top;

    var spiralRadius = 0;
    var sphereRadius = 1;
    var sqrWidth = 0.5;
    var sqrHeight = 0.5;

    var angInc = (2 * Math.PI) / 20;

    var qtnCircles = 4;
    var formInSpace;

    var timer = 5;

    for (var loop = 0; loop < qtnCircles; loop++) {
      for (var i = 0; i < 2 * Math.PI; i += angInc) {
        if (currentForm == "esfera") {
          formInSpace = this.drawCircle(sphereRadius);
        } else {
          formInSpace = this.drawSquare(sqrWidth, sqrHeight);
        }

        formInSpace.lifetime = 50 + timer;

        formInSpace.x = center_X + spiralRadius * Math.cos(i);
        formInSpace.y = center_Y + spiralRadius * Math.sin(i);

        this.animacao.novoSprite(formInSpace);
        if (currentForm == "esfera") {
          sphereRadius += 0.05;
        } else {
          sqrHeight += 0.08;
          sqrWidth += 0.08;
        }

        timer += 2;
        spiralRadius += 1;
      }
    }
  }

  createSnow() {
    var rect = this.canvas.getBoundingClientRect();

    var center_X = event.clientX - rect.left;
    var center_Y = event.clientY - rect.top;

    var spiralRadius = 0;
    var sphereRadius = 5;
    var sqrWidth = 5;
    var sqrHeight = 5;

    var angInc = (2 * Math.PI) / 20;

    var timer = 5;

    var formInSpace;
    if (currentForm == "esfera") formInSpace = this.drawCircle(sphereRadius);
    else formInSpace = this.drawSquare(sqrWidth, sqrHeight);
    formInSpace.lifetime = 101 + timer * 2;

    formInSpace.x = center_X;
    formInSpace.y = center_Y;

    formInSpace.velocidadeX = formInSpace.x / 100;
    formInSpace.velocidadeY = formInSpace.y / 100;

    this.animacao.novoSprite(formInSpace);
  }

  run() {
    this.canvas.onmousemove = event => {
      var rect = this.canvas.getBoundingClientRect();
      var trail = new Bola(this.context);
      trail.lifetime = 101;
      trail.x = event.clientX - rect.left;
      trail.y = event.clientY - rect.top;
      trail.cor = `rgb(
            ${Math.random() * (255 - 0) + 0},
            ${Math.random() * (255 - 0) + 0},
            0
        )`;

      if (currentType == "mouseMovement") this.animacao.novoSprite(trail);
    };

    this.canvas.onclick = event => {
      console.log(currentType);
      if (currentType == "circulo") this.createSphere();
      if (currentType == "espiral") this.createSpiral();
      if (currentType == "neve") this.createSnow();
    };

    var b2 = new Bola(this.context);
    b2.x = 200;
    b2.y = 100;
    b2.velocidadeX = -5;
    b2.velocidadeY = 0;
    b2.cor = "blue";
    b2.raio = 10;
    b2.ident = "b2";
    b2.bounce = true;

    var expld = new Explode(this.context);
    var imagemExpl = new Image();
    imagemExpl.src = "engine/images/heal01.png";
    expld.imagem = imagemExpl;
    expld.imgSize = 80;
    expld.frameSize = 192;
    expld.ident = "explode";

    // Criando o loop de animação

    this.animacao.novoSprite(b2);
    this.colisor.novoSprite(b2);
    this.animacao.colisor = this.colisor;

    b2.animacao = this.animacao;
    b2.colisor = this.colisor;

    /* Movimentando personagem */

    // Posição inicial do personagem

    var teclado = new Teclado(document);
    var img = new Image();

    img.src = "engine/images/BlackMage.png";

    var personagem = new Heroi(
      this.context,
      teclado,
      this.animacao,
      img,
      this.colisor
    );
    personagem.imgPosX = 0;
    personagem.imgPosY = 150;
    personagem.imgSizeX = 42;
    personagem.imgSizeY = 58;
    personagem.velocidade = 2.5;
    personagem.ident = "person";

    this.colisor.novoSprite(personagem);
    personagem.colisor = this.colisor;

    // Init
    this.animacao.novoSprite(personagem);

    img.onload = () => {
      if (!this.animacao.ligado) {
        this.animacao.colisor = this.colisor;
        this.animacao.ligar();
      }
    };

    teclado.disparou(32, function() {
      personagem.atirar(expld);
    });

    $("#char_input input").click(function() {
      img.src = $(this).val();
      personagem.sheet.update_img(img);
      $("#char_input input").blur();
    });

    $("#particle_input input").click(function() {
      currentType = $(this).val();
    });

    $("#particle_form input").click(function() {
      currentForm = $(this).val();
    });
  }
}
