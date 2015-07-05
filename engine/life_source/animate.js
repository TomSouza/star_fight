function Animate(context) {
    this.sprites = [];
    this.context = context;
    this.ligado = false;
}

Animate.prototype = {
    
    novoSprite: function(sprite) {
        this.sprites.push(sprite);
    },
    
    ligar: function() {
        this.ligado = true;
        this.proximoFrame();
    },
    
    desligar: function() {
        this.ligado = false;
    },
    
    proximoFrame: function() {
        if(!this.ligado) {
            return;
        }

        this.limparTela();
        
        for(var i in this.sprites) {
            this.sprites[i].atualizar();
        }
        
        for(var i in this.sprites) {
            this.sprites[i].desenhar();
        }
        
        var animate = this;
        requestAnimationFrame(function() {
            animate.proximoFrame();
        });

    },
    
    limparTela: function() {
        var ctx = this.context; 
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },
}