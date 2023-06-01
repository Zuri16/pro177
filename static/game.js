
// let words = [
//     {
//         "inputs": 7,
//         "category": "Deportes",
//         "word": "Ajedrez"
//     },
//     {
//         "inputs": 7,
//         "category": "Nombre de países europeos",
//         "word": "Francia"
//     },
//     {
//         "inputs": 4,
//         "category": "Familia",
//         "word": "hijo"
//     },
//     {
//         "inputs": 6,
//         "category": "comida",
//         "word": "cereal"
//     },
//     {
//         "inputs": 6,
//         "category": "mascotas",
//         "word": "conejo"
//     }

// ]

$(document).ready(function () {
    getWords()
})
//
function getWords(){
    $.ajax({
        url:"/get_template",
        type:"get",
        success:function(result){
            fillBlanks(result.word)
        },
        error: function (result) {
            alert(result.responseJSON.message)
        }
    })
}

function fillBlanks(palabra) {
    
    //Asegurar de que los espacios en blanco están vacíos para empezar
    $("#blanks").empty()

    //Con un ciclo for crear los espacios en blanco usando <span>, según el numero de inputs
    //NOTA: Es como en la clase se crearon los input pero aquí son span
    for (let i = 0; i < palabra.inputs; i++) {
        let html = `<span class="fill_blanks" id="input_${i}">_</span>`
        $("#hint").append(html)
    }

    //Mostrar la pista con html según el campo category
    $("#blanks").html(palabra.category)
    
    //NOTA: A partir de aquí guíarse con la imagen de referencia
    var gameOver=false
    //Rellenar los espacios en blanco solo si se encuentra la coincidencia de caracteres
    $(".clickable").click(function(){
        var correctGuess = false

        //Obtener el id del botón pulsado
        let id = $(this).attr("id")
        
        //Obtener la vida
        var life = parseInt($("#life").text())

        //Bucle por todas las letras
        for(var i = 0; i < palabra.word.length; i++){
        
            //Recorrer todas las letras
            if(palabra.word.charAt(i).toLowerCase() == id){
                //Comprobar si aún queda vida y si el espacio en blanco está vacío o ya está lleno
                if(life > 0 && ($(".fill_blanks").eq(i).html() == "_" || $(".fill_blanks").eq(i).html() == id)){

                    //Llenar el espacio en blanco
                    $(".fill_blanks").eq(i).html(id)
                    correctGuess = true
                    
                    //Comprobar si la palabra adivinada está completa y mostrar el ganaste
                    if($("#blanks").text() === palabra.word.toLowerCase()){
                        $("#result").text("¡Ganaste!")
                        correctGuess = true
                        gameOver=true
                    }
                }
            }
        }
        //Comprobar si el numero de vidas es mayor que 0 y si la palabra esta incompleta o incorrecta y si el gameover aún no es true
        //Para restar vidas
        if(life > 0 && correctGuess != true && gameOver != true){
            life = life -1
            $("#life").text(life)
        }
        //Comprobar si el numero de vidas es 0 y mostrar el perdiste
        else if(life == 0){
            $("#result").text("¡Perdiste!")
        }
    })
        
}

    
