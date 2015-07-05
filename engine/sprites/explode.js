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
}

Explode.prototype = {
    atualizar: function() {
        var ctx = this.context;
        
        if(this.framePosY > 960) {
            this.framePosY = 0;
        }
        
        if(this.framePosX > 960) {
            this.framePosX = 0;
            this.framePosY += 192;
        }
        
        this.framePosX = this.framePosX + this.frameSize;

    },
    
    desenhar: function() {
        var ctx = this.context;

        ctx.drawImage(
            this.imagem,
            this.framePosX, this.framePosY, this.frameSize, this.frameSize, // Área de recorte (clipping)
            this.imgPosX, this.imgPosY, this.imgSize, this.imgSize // Desenho no Canvas
        );
        
        // var velocidade = 50;
            // // Momento inicial
            // var anterior = new Date().getTime();
            
            // var span_x = document.getElementById('x');
            // var span_y = document.getElementById('y');
            // var movimento = {first:true, second:false, third:false, fourth:false}
            // var fill = {azul: "blue", verm: "red", verde: "green", amar: "gold"}
            
            // var agora = new Date().getTime();
                // var decorrido = agora - anterior;

                // anterior = agora;
        
        // Voltar às configurações anteriores
        
    }
}