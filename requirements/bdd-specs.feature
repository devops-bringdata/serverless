#language: pt-br

Funcionalidade: Enriquecimento

  MVP do sistema para disparo de emails ou mensagens de texto (sms)
  para coleta de dados faltantes nas bases de dados enviadas por clientes do sistema Bringdata.

  Cenário: Salvar Campanha
    Dado que o cliente tenha enviado a requisição para salvar a campanha

    # done
    Quando o campo name estiver vazio
    Então salvaremos um valor default para o nome da campanha com o valor (Nova Campanha dd/mm/yyyy - HH:MM)

    # done
    Quando o campo variaveis não possuir nenhuma variavel
    Então emitiremos um erro do tipo parametro inválido

    # done
    Quando o campo variavel correspondente ao email estiver vazio
    Então emitiremos um erro do tipo parametro faltante

    # done
    Quando o campo texto do botão, no template de email estiver vazio
    Então salvaremos como ATUALIZAR MINHAS INFORMAÇÕES (traduzido)


    Quando o campo email do remetente do template de email estiver vazio
    Então salvaremos como 'NOME DA EMPRESA@bringdata.co'


    Quando o campo nome do remetente do template de email estiver vazio
    Então salvaremos como 'NOME DA EMPRESA'


    Quando o campo saudação do template de email estiver vazio
    Então salvaremos como 'Oi NOME'


    Quando o campo logo do template de email estiver vazio
    Então salvaremos como 'url da logo default'


    Quando o campo assunto do template de email estiver vazio
    Então salvaremos como 'Diga mais sobre você - NOME DA EMPRESA'


    Quando o campo texto do template de email estiver vazio
    Então salvaremos como 'Para conseguirmos nos comunicar melhor com você gostaríamos de atualizar algumas informações do seu cadastro rapidamente, vamos lá?'


    Quando o campo titulo do template de email estiver vazio
    Então salvaremos como 'Queremos saber mais sobre você! :)'


