export function Bola(context, efeito) {
    
    this.context = context;
    this.x = 0;
    this.y = 0;
    this.velocidadeX = 0;
    this.velocidadeY = 0;
    this.bounce = false;
    
    // Atributos de desenho padrão
    this.cor = 'black';
    this.raio = 10;
    this.ident = '';
    this.efeito = efeito;
}

Bola.prototype = {
    atualizar: function() {
        var ctx = this.context;
        var atual_obj = null;
        
        if (this.ident == 'tiro' && ((this.x < this.raio || this.x > ctx.canvas.width - this.raio) || (this.y < this.raio || this.y > ctx.canvas.height - this.raio))) {
            for(var i in this.animacao.sprites) {
                atual_obj = this.animacao.sprites[i];
                if((atual_obj.x < atual_obj.raio || atual_obj.x > ctx.canvas.width - atual_obj.raio) || (atual_obj.y < atual_obj.raio || atual_obj.y > ctx.canvas.height - atual_obj.raio) && atual_obj.ident == 'tiro') {
                    this.animacao.sprites.splice(i, 1);
                    this.colisor.sprites.splice(i, 1);
                }
            }
        }else if(this.bounce) {
            
            if (this.x < this.raio || this.x > ctx.canvas.width - this.raio) {
                this.velocidadeX *= -1;
            }
            
            if (this.y < this.raio || this.y > ctx.canvas.height - this.raio) {
                this.velocidadeY *= -1;
            }
        }
        
        this.x += this.velocidadeX;
        this.y += this.velocidadeY;
       
    },
    
    desenhar: function() {
        var ctx = this.context;
        
        ctx.save();
        
        ctx.fillStyle = this.cor;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.raio, 0, 2 * Math.PI, false);
        ctx.fill();
        
        ctx.restore();
        
    },
    
    retangulosColisao: function() {
        return [{ 
            x: this.x - this.raio, // this.x é o centro da bola
            y: this.y - this.raio, // this.y idem
            largura: this.raio * 2,
            altura: this.raio * 2
        }];
    },
    
    colidiuCom: function(sprite) {
        
        if(this.ident == 'tiro' && sprite.ident != "person") {
            
            for(var i in this.animacao.sprites) {
                if(this.animacao.sprites[i].ident == "explode"){
                    this.animacao.sprites.splice(i, 1);
                    this.efeito.explodiu = false;
                }
            }
            
            if(this.efeito.explodiu == false) {
                this.efeito.imgPosX = sprite.x;
                this.efeito.imgPosY = sprite.y;
                this.animacao.novoSprite(this.efeito);
            }
            
            for(var i in this.animacao.sprites) {
                if(this.animacao.sprites[i].ident == 'tiro'){
                    this.colisor.sprites.splice(i, 1);
                    this.animacao.sprites.splice(i, 1);
                }
            }
            
            if (this.x < sprite.x) // Estou na esquerda
                this.velocidadeX = -Math.abs(this.velocidadeX); // -
            else
                this.velocidadeX = this.velocidadeX *= -1; // +
            
            if (this.y < sprite.y) // Estou acima
                this.velocidadeY = -Math.abs(this.velocidadeY); // -
            else
                this.velocidadeY = Math.abs(this.velocidadeY); // + 
        }
    }
}