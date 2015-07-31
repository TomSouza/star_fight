var DIRECAO_ESQUERDA = 1;
var DIRECAO_DIREITA = 2;
var DIRECAO_CIMA = 3;
var DIRECAO_BAIXO = 4;

function Heroi(context, teclado, animacao, imagem) {
    this.context = context;
    this.teclado = teclado;
    this.animacao = animacao;
    this.imagem = imagem;

    // Desenhar
    this.imgPosX = 0;
    this.imgPosY = 0;
    this.imgSizeX = 0;
    this.imgSizeY = 0;
    
    // Andar  
    this.velocidade = 0;
    
    // Criando a spritesheet a partir da imagem recebida
    this.sheet = new SpriteSheet(this.context, this.imagem, 4, 4);
    this.sheet.intervalo = 150;
    
    this.andando = false;
    this.direcao = DIRECAO_DIREITA;
    
}

Heroi.prototype = {
    atualizar: function() {

    // retorno no outo canto da tela
        if(this.imgPosX > this.context.canvas.width) {
            this.imgPosX = 0;
        } else if (this.imgPosX < 0) {
            this.imgPosX = this.context.canvas.width;
        } 
        
        if(this.imgPosY > this.context.canvas.height) {
            this.imgPosY = 0;
        } else if (this.imgPosY < 0) {
            this.imgPosY = this.context.canvas.height;
        }
        
    // Movimentos
        if(this.teclado.pressionada(SETA_ESQUERDA)) {
            
            if (!this.andando || this.direcao != DIRECAO_ESQUERDA) {
                // Seleciono o quadro da spritesheet
                this.sheet.linha = 0;
                this.sheet.coluna = 1;
            }
            
            this.andando = true;
            this.direcao = DIRECAO_ESQUERDA;
            this.sheet.proximoQuadro();
            
            this.imgPosX -= this.velocidade;
            
        } else if(this.teclado.pressionada(SETA_DIREITA)) {
            
            if (!this.andando || this.direcao != DIRECAO_DIREITA) {
                // Seleciono o quadro da spritesheet
                this.sheet.linha = 0;
                this.sheet.coluna = 2;
            }
            
            this.andando = true;
            this.direcao = DIRECAO_DIREITA;
            this.sheet.proximoQuadro();
            
            this.imgPosX += this.velocidade;
            
        }  else if(this.teclado.pressionada(SETA_CIMA)) {
            
            if (!this.andando || this.direcao != DIRECAO_CIMA) {
                // Seleciono o quadro da spritesheet
                this.sheet.linha = 0;
                this.sheet.coluna = 3;
            }

            this.andando = true;
            this.direcao = DIRECAO_CIMA;
            this.sheet.proximoQuadro();
            
            this.imgPosY -= this.velocidade;
            
        }  else if(this.teclado.pressionada(SETA_BAIXO)) {
            
            if (!this.andando || this.direcao != DIRECAO_BAIXO) {
                // Seleciono o quadro da spritesheet
                this.sheet.linha = 0;
                this.sheet.coluna = 0;
            }

            this.andando = true;
            this.direcao = DIRECAO_BAIXO;
            this.sheet.proximoQuadro();
            
            this.imgPosY += this.velocidade;

        } else {
            this.sheet.linha = 0;
            this.sheet.coluna = 0;
            this.andando = false;
        }
        
    },
    
    desenhar: function() {
        this.sheet.desenhar(this.imgPosX, this.imgPosY, this.imgSizeX, this.imgSizeY);
    },
    
    atirar: function() {
        var tiro = new Bola(this.context);
        tiro.x = this.imgPosX + 10;
        tiro.y = this.imgPosY + 10;
        tiro.raio = 4;
        tiro.cor = 'red';
        
        if (this.direcao == DIRECAO_ESQUERDA) {
            tiro.velocidadeX = -8;
        } else if(this.direcao == DIRECAO_DIREITA) {
            tiro.velocidadeX = 8;
        } else if(this.direcao == DIRECAO_CIMA) {
            tiro.velocidadeY = -8;
        } else if(this.direcao == DIRECAO_BAIXO) {
            tiro.velocidadeY = 8;
        }
        
        // Não tenho como incluir nada na animação!
        this.animacao.novoSprite(tiro);
        
    }
}