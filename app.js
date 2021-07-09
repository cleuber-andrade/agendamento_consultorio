class Agendar { //2º passo  objeto Agendar 

    constructor(name, cpf, carteira, endereco, sexo, nascimento, tel, plano, especialidades, doutor, data){
        this.name = name
        this.cpf = cpf
        this.carteira = carteira
        this.endereco = endereco
        this.sexo = sexo
        this.nascimento = nascimento
        this.tel = tel
        this.plano = plano
        this.especialidades = especialidades
        this.doutor = doutor
        this.data = data
    }

    validarDados(){ // 7º passo      validar os dados na app
        for(let i in this){ //recuperando os atributos 
            if (this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }           
        }
        return true
    }    
}

class Bd { //3º passo criando banco de dados

    constructor(){ //6º passo       verificar se o id existe

        let id = localStorage.getItem('id') //recuperando o id do getProximoId e testando

        if (id === null){
            localStorage.setItem('id', 0) //colocando um numero no para iniciar id
        }
    }

    getProximoId(){ //5º passo     criando indice para os objetos no localStorage
        let proximoId = localStorage.getItem('id')
        //getItem - recupera um dado em localStorage
        //setItem - inserir um dado em localStorage

        return parseInt(proximoId) + 1 //acresacentando mais 1 no Id


    }

    gravar(a) { //4º passo       gravando e convertendo o objeto em string

        let id = this.getProximoId() //recuperando o metodo getProximoId
     
        localStorage.setItem(id, JSON.stringify(a)) 
        //gravando o objeto literal no localStorage
        //JSON.stringify serve para converter Objetos para string / JSON.parser faz o oposto, converte string em objetos
        
        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() { // 10 passo

        let agendamento = Array()

        let id = localStorage.getItem('id')


        //recuperar todas os agendamento cadastrada em locaStorage
        for(let i = 1; i <= id; i++){


            //recuperar o agendamento
            let agenda = JSON.parse(localStorage.getItem(i))


            //posibilidade de ver indices que foram pulados ou excluidos com o valor null
            if(agenda == null){
                continue
            }

            agendamento.push(agenda)
        }
        return agendamento    
    }
}

let bd = new Bd()

function cadastrarAgendamento(){  //1º passo
   
    let name = document.getElementById('name')  //recuperando dados no input
    let cpf = document.getElementById('cpf')
    let carteira = document.getElementById('carteira')
    let endereco = document.getElementById('endereco')
    let sexo = document.getElementById('sexo')
    let nascimento = document.getElementById('nascimento')
    let tel = document.getElementById('tel')
    let plano = document.getElementById('plano')
    let especialidades = document.getElementById('especialidades')
    let doutor = document.getElementById('doutor')
    let data = document.getElementById('data')    

    let agendar = new Agendar(  //instânciando o objeto Agendar
        name.value,
        cpf.value,
        carteira.value, 
        endereco.value, 
        sexo.value, 
        nascimento.value, 
        tel.value, 
        plano.value, 
        especialidades.value, 
        doutor.value, 
        data.value
    )

    
    if (agendar.validarDados()){ // 8º passo     Dialog sobre o preenchimento do formulário
        bd.gravar(agendar)

        document.getElementById('modal_titulo_div').className = 'modal-header text-success'

        document.getElementById('modal_titulo').innerHTML = 'Gravado com Sucesso!'

        document.getElementById('modal_conteudo').innerHTML = 'O cliente foi cadastrado com sucesso.'

        document.getElementById('modal_btn').innerHTML = 'Voltar'
        document.getElementById('modal_btn').className = 'btn btn-success'


        $('#modalRegistraAgendamento').modal('show')

        //zera informações da tela
        name.value = ''
        cpf.value = ''
        carteira.value = '' 
        endereco.value = '' 
        sexo.value = ''
        nascimento.value = ''
        tel.value = ''
        plano.value = ''
        especialidades.value = ''
        doutor.value = ''
        data.value = ''

    } else {

        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'

        document.getElementById('modal_titulo').innerHTML = 'Erro na Gravação'

        document.getElementById('modal_conteudo').innerHTML = 'Preencha os dados corretamente.'

        document.getElementById('modal_btn').innerHTML = 'Voltar'
        document.getElementById('modal_btn').className = 'btn btn-danger'


        $('#modalRegistraAgendamento').modal('show')
    }
}

function carregaListaAgendamento(){  // 9º passo      objetivo dessa função é ser chamada sempre que 

    let agendamento = Array()    

    agendamento = bd.recuperarTodosRegistros()


    //selecionando o elemento tbody da tabela
    let listaAgendamento = document.getElementById('listaAgendamento') // 11º passo   criando lista para pesquisa

    //vamos percorrer o array agendamento, listando cada agentamento de forma dinanmica    
    agendamento.forEach(function(a){
       
        //criando linha (tr)
        let linha = listaAgendamento.insertRow()

        //criar as colunas(td)
        linha.insertCell(0).innerHTML = a.name
        linha.insertCell(1).innerHTML = a.cpf
        linha.insertCell(2).innerHTML = a.carteira
        linha.insertCell(3).innerHTML = a.endereco

        switch (a.sexo){
            case '1': a.sexo = 'Feminino'
                break
            case '2': a.sexo = 'Masculino' 
                break                
            case '3': a.sexo = 'Indefinido'
                break 
        }
        linha.insertCell(4).innerHTML = a.sexo

        let nasc_1  = new Date(a.nascimento).toLocaleDateString('pt-br')
        linha.insertCell(5).innerHTML = nasc_1
        linha.insertCell(6).innerHTML = a.tel

        switch (a.plano){
            case '1': a.plano = 'Amil'
                break
            case '2': a.plano = 'Unimed' 
                break                
            case '3': a.plano = 'Bradesco'
                break
            case '4': a.plano = 'Próprio'
                break      
        }
        linha.insertCell(7).innerHTML = a.plano

        switch (a.especialidades){
            case '1': a.especialidades = 'Odontopediatria'
                break
            case '2': a.especialidades = 'Endodontia' 
                break                
            case '3': a.especialidades = 'Periodontia'
                break                 
        }
        linha.insertCell(8).innerHTML = a.especialidades

        switch (a.doutor){
            case '1': a.doutor = 'Dra. Ana Katarina'
                break
            case '2': a.doutor = 'Dra. Janine Almeida' 
                break                
            case '3': a.doutor = 'Dr. Paulo Cesar'
                break
            case '4': a.doutor = 'Dr. Jason Krugger'
                break                 
        }
        linha.insertCell(9).innerHTML = a.doutor

        let data_a  = new Date(a.data).toLocaleDateString('pt-br')
        linha.insertCell(10).innerHTML = data_a
    })
}

function pesquisarAgendamento(){ // 12º passo     botão para pesquisar

    let name = document.getElementById('name') 
    let cpf = document.getElementById('cpf')
    let carteira = document.getElementById('carteira')
    let endereco = document.getElementById('endereco')
    let sexo = document.getElementById('sexo')
    let nascimento = document.getElementById('nascimento')
    let tel = document.getElementById('tel')
    let plano = document.getElementById('plano')
    let especialidades = document.getElementById('especialidades')
    let doutor = document.getElementById('doutor')
    let data = document.getElementById('data') 

    let pesquisa = new Agendar(
        name.value,
        cpf.value,
        carteira.value, 
        endereco.value, 
        sexo.value, 
        nascimento.value, 
        tel.value, 
        plano.value, 
        especialidades.value, 
        doutor.value, 
        data.value
        )

       
    
}