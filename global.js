    $('.form_send_bt').on('click',function()
    {
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

                  if ( (obrigatorio != undefined) && (input_id.val()=="" ) )
                  {
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
                          Notificacao('error',mensagem_retorno,'Houve algo de errado'); 
                        }
                        else
                        {
                          Notificacao('success',mensagem_retorno,'Tudo certo');
                        }
                    }
                  });
              }
    });
