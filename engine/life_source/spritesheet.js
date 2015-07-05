function SpriteSheet(context, imagem, linhas, colunas) {
    this.context = context;
    this.imagem = imagem;
    this.numLinhas = linhas;
    this.numColunas = colunas;
    
    this.intervalo = 0;
    
    this.linha = 0;
    this.coluna = 0;
}
SpriteSheet.prototype = {
    proximoQuadro: function() {
        // Momento atual
        var agora = new Date().getTime();
        
        // Se ainda n�o tem �ltimo tempo medido
        if (! this.ultimoTempo) {
            this.ultimoTempo = agora;
        }
        
        // J� � hora de mudar de coluna?
        if (agora - this.ultimoTempo < this.intervalo) {
            return;
        }
        
        if (this.linha < this.numLinhas - 1) {
            this.linha++;
        } else {
            this.linha = 0;
        }
        
        // Guardar hora da �ltima mudan�a
        this.ultimoTempo = agora;
    },
    
    desenhar: function(x, y, imgSizeX, imgSizeY) {
        
        var frameSizeX = this.imagem.width / this.numLinhas;
        var frameSizeY = this.imagem.height / this.numColunas;
        
        var framePosX = frameSizeX * this.linha;
        var framePosY = frameSizeY * this.coluna;
        
        this.context.drawImage(
            this.imagem,
            framePosX, framePosY, frameSizeX, frameSizeY, // �rea de recorte (clipping)
            x, y, imgSizeX, imgSizeY // Desenho no Canvas
        );
        
    }
}