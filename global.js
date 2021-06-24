jQuery(function ($) 
{
  $('body').on('click', '.form_send_bt', function (){
        var $form     = $(this).closest('form');
        var form_id   = $form.attr('id');
        var form_url  = $form.attr('action');
        var form = $("#"+form_id);  
        var dados = $("#"+form_id).serialize();

              var erros = 0;
              $.each(dados.split('&'), function (index, elem)
              {
                  var vals          = elem.split('=');
                  var input_id      = $("#"+vals[0]);
                  var conteudo      = vals[1];
                  var form_id       = input_id.attr('id');
                  var obrigatorio   = input_id.attr('required');
                  var mensagem      = input_id.attr('required_message');

                  if ( (obrigatorio != undefined) && (input_id.val()=="" ) ){
                      Notificacao('error',mensagem,'Campo obrigatório'); 
                      input_id.focus();
                      erros = 1;
                  }
              });
                if(erros == 0)
                {
                    $.ajax({
                      type: "POST",
                      url: form_url,
                      data: dados,
                      success: function( data )
                      {
                          if(tipo_retorno=='erro')
                          {
                            Notification('error',mensagem_retorno,'Houve algo de errado'); 
                          }
                          else
                          {
                            Notification('success',mensagem_retorno,'Tudo certo');
                          }
                      }
                    });
                }
    });
});



//function notifications
  function Notification(typeToastr, title, message)
  {
    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": true,
      "progressBar": true,
      "positionClass": "toast-top-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "3000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
    
    toastr[typeToastr](message, title);
    
  }
