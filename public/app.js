$( document ).ready(function(){
    $("#modal1").click(function() {
        $('.modal1').modal('show');
    });  
    $(".modal").modal({
        closable: true
    }); 
});