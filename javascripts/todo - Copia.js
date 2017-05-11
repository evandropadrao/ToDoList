/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
    
    var $lastClicked;
    
    $('#tarefa').off();

    $('#tarefa').keydown(function(event) {
        
        //console.log(event.which, String.fromCharCode(event.which));
        
        if (event.which === 13) {
            console.log("Aqui vamos adicionar nossa tarefa");
        }
    });

    function onTarefaDeleteClick() {
        
        console.log($(this).parent('.tarefa-item').text().trim());
        
        $(this).parent('.tarefa-item').off('click').hide('slow' , function() {
            $(this).remove();
        });
        
    }   // onTarefaDeleteClick
    
    
    function onTarefaItemClick() {
        
        if (!$(this).is($lastClicked)) {
            
            if ($lastClicked !== undefined) {
                savePendingEdition($lastClicked);
            }
        }

        $lastClicked = $(this);
        
        var text = $lastClicked.children('.tarefa-texto').text();
        
        var content = "<input type='text' " +
                        "class='tarefa-edit' value='" +
                        text + "'>";
                
        $lastClicked.html(content);
        
         $(".tarefa-edit").keydown(onTarefaEditKeydown);
        
    }   // onTarefaItemClick

    
    function addTarefa(text) {
        var $tarefa = $("<div />")
                .addClass("tarefa-item")
                .append($("<div />")
                        .addClass("tarefa-texto")
                        .text(text))
                .append($("<div />")
                        .addClass("tarefa-delete"))
                .append($("<div />")
                        .addClass("clear"));

        $("#tarefa-list").append($tarefa);

        $(".tarefa-delete").click(onTarefaDeleteClick);

        $(".tarefa-item").click(onTarefaItemClick);
    }   // addTarefa


    function onTarefaKeydown(event) {
          
        if(event.which === 13) {
            
            console.log("Fim da modificacao de uma tarefa!");

            addTarefa($("#tarefa").val());
            $("#tarefa").val("");
        }
    }


    function onTarefaEditKeydown(event) {
    
        if (event.which === 13) {

            console.log("Fim da edicao de uma nova tarefa!");
            
            savePendingEdition($lastClicked);
            $lastClicked = undefined;
        }
    }   // onTarefaEditKeydown


    function savePendingEdition($tarefa) {
    
        console.log("E aqui vamos salvar nossa tarefa");

        var texto = $tarefa.children('.tarefa-edit').val();
    
        $tarefa.empty();
        
        $tarefa.append("<div class='tarefa-texto'>" + texto + "</div>")
                    .append("<div class='tarefa-delete'></div>")
                    .append("<div class='clear'></div>");
            
        $tarefa.append($("<div />").addClass("tarefa-texto").text("Lavar o banheiro"))
               .append($("<div />").addClass("tarefa-delete"))
               .append($("<div />").addClass("clear"));
    
    }   // savePendingEdition

    
    $(".tarefa-delete").click(onTarefaDeleteClick);

    $(".tarefa-item").click(onTarefaItemClick);

    $("#tarefa").keydown(onTarefaKeydown);
});
