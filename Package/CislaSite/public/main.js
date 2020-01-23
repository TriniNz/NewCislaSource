function abrir() {
    document.getElementById('standardpop-up').style.width = '590';
	setTimeout(() => {
		document.getElementById('btn_fechar1').style.display = 'block';
	}, 200);
}

function fechar() {
    document.getElementById('standardpop-up').style.width = '0';
    document.getElementById('btn_fechar1').style.display = 'none';
}

function fechou() {
    let div = $("#standardpop-up"); // seleciona a div espec�fica
    $("body").on("click", function (e) {
        
        alert("Voc� clicou fora da div!");
    });
}
