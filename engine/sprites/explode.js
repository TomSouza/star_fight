function Explode(context) {
    
    this.context = context;
    this.imagem = "";
    this.src = "";
    this.imgSize = 0;
    this.imgPosX = 0;
    this.imgPosY = 0;
    this.frameSize = 0;
    this.framePosX = 192;
    this.framePosY = 192;
    
    this.intervalo = 45;
}

Explode.prototype = {
    atualizar: function() {
        
        if(this.framePosY > 960) {
            this.framePosY = 0;
        }
        if(this.framePosX > 960) {
            this.framePosX = 0;
            this.framePosY += 192;
        }
        
        this.proximoQuadro();

    },
    
    proximoQuadro: function() {
        // Momento atual
        
        var agora = new Date().getTime();
        
        // Se ainda não tem último tempo medido
        if (! this.ultimoTempo) {
            this.ultimoTempo = agora;
        }
        var stop = agora - this.ultimoTempo;
        // Já é hora de mudar de coluna?
        if (stop < this.intervalo) {
            return;
        } else {
            this.framePosX = this.framePosX + this.frameSize;
        }

        // Guardar hora da última mudança
        this.ultimoTempo = agora;
    },
    
    desenhar: function() {
        this.context.drawImage(
            this.imagem,
            this.framePosX, this.framePosY, this.frameSize, this.frameSize, // �rea de recorte (clipping)
            this.imgPosX, this.imgPosY, this.imgSize, this.imgSize // Desenho no Canvas
        );
    }
}