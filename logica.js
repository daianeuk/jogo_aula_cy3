var barraAltura, barraLargura, jogadorPosicaoX, velocidadeJogador,
bolaDiametro, bolaPosX, bolaPosY, velocidadeBola, vidas,
pontosJogador,
colisao;

        
function inicializar(){
	barraAltura = 15;
    barraLargura = 90;
    velocidadeJogador = 20;
    jogadorPosicaoX = (canvas.width - barraLargura)/2;
	
	bolaDiametro = 10;
    bolaPosX = canvas.width / 2;
    bolaPosY = 20;
    velocidadeBola = 5;
	
	pontosJogador = 0;
	vidas = 3;
	colisao = false;

    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
	
    context.fillRect(jogadorPosicaoX, canvas.height - barraAltura, barraLargura, barraAltura);
	
    document.addEventListener('keydown', keyDown);
	setInterval(gameLoop, 30);
}
            
function keyDown(e){
    if(e.keyCode == 37){
        if(jogadorPosicaoX > 0){
            jogadorPosicaoX -= velocidadeJogador;
        }
    }
    if(e.keyCode == 39){
        if(jogadorPosicaoX < (canvas.width - barraLargura)){
            jogadorPosicaoX += velocidadeJogador;
        }
    }
}

function gameLoop(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(jogadorPosicaoX, canvas.height - barraAltura, barraLargura, barraAltura);
	if(bolaPosY <= canvas.height){
		bolaPosY += velocidadeBola;
	}
	else{
		bolaPosX = Math.random() * 600;
		bolaPosY = -10;
		colisao = false;
	}
	
	context.beginPath();
    context.arc(bolaPosX, bolaPosY, bolaDiametro, 0, Math.PI * 2, true);
    context.fill();
	
	if((bolaPosX > jogadorPosicaoX && bolaPosX < jogadorPosicaoX + barraLargura) && bolaPosY >= canvas.height - barraAltura 
	&& colisao == false){
		pontosJogador++;
		colisao = true;
		velocidadeBola+=velocidadeBola*(pontosJogador/500);
	}
	
	if((bolaPosX < jogadorPosicaoX || bolaPosX > jogadorPosicaoX + barraLargura) && bolaPosY >= canvas.height 
	&& colisao == false){
		vidas--;
		colisao = true;
	}
	
	if(vidas<1){
		context.font = "30pt Comic Sans MS";
		context.fillText("Pontos: "+pontosJogador+" -  Game Over! ", 0, 50);
		velocidadeBola=0;
	}
	else{
		context.font = "30pt Comic Sans MS";
		context.fillText("Pontos: "+pontosJogador+" - Vidas: "+ vidas, 0, 50);
	}
}

function start() {
    window.location.reload();
}
