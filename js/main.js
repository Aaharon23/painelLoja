class Produto {

    //CONTRUTOR DO OBJETO     
    constructor() {
        this.id = 1;
        this.arrayProduto = []
        this.editId = null;

    };

    //FUNÇÃO  RESPONSALVEL POR SALVAR DADOS CAPTADOS PELA FUNÇÃO #captarDados   
    salvar(){
        let produto = this.captarDados();
        //TRATATIVA PARA SE A FUNÇÃO VALIDAINPUT RETORNAR 'TRUE'
        if(this.validaInput(produto) == true){
            if(this.editId == null){
                //acçoes a serem feitas quando usuário preencher os inputs 
                this.adicinar(produto)
            }else{
                //acçoes a serem feitas quando usuário atualizar os dados
                this.atualizar(this.editId, produto)
            }
            }

        
        this.listaTabela();

        //LIMPA OS CAMPOS DOS INPUTS
        this.cancelar() 


    };

    //FUNÇÃO RESPONSAL POR CRIAR TABELA DE MANEIRA INTERATIVA NO HTML
    listaTabela(){
        let tbody = document.querySelector('#tbody');

        //TBODY TEM Q VIR LIMPO
        tbody.innerHTML = '';

        // 'FOR' PARA PERCORRER ARRAY DE PRODUTOS E ADICIONAR AS TR E TD
        for(let i = 0; i < this.arrayProduto.length; i++){
            //ADICIONA UMA NOVA LINHA A TODA TR
            let tr = tbody.insertRow();

            //ADICIONA UMA NOVA COLUNA A TODA TD
            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();

            //LINKA TD CRIADA AO VALUE VINDO DA 'captarDados'
            td_id.innerText = this.arrayProduto[i].id
            td_produto.innerText = this.arrayProduto[i].nome
            td_valor.innerText = this.arrayProduto[i].preco
          

            //APLICAR CSS VIA JAVASCRIPT
            //adicionando classList.add() de maneira interativa via javascript
            td_id.classList.add('center')
            td_produto.classList.add('center')
            td_valor.classList.add('center')

            //classe para acoes; ajustes no css
            td_acoes.classList.add('bts')
            


            //CRIA ELEMENTO VIA JAVASCRIPT IMG
            let div = document.createElement('div');

            let imgEdit = document.createElement('button');
            let imgDelet = document.createElement('button');

            imgEdit.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
            imgDelet.innerHTML =  '<i class="fa-solid fa-trash"></i>';



            // evento e acção
            imgEdit.setAttribute("onclick", "produto.preparaEdicao("+JSON.stringify(this.arrayProduto[i])+")")
            imgDelet.setAttribute("onclick", "produto.deletar("+ this.arrayProduto[i].id +")")

            td_acoes.appendChild(imgEdit)
            td_acoes.appendChild(imgDelet)

            //setando atributos 
            


        }
    }


    //FUNÇÃO ADICIONAR É RESPONSALVEL POR FAZER PUSH PARA 'arrayProduto' SALVANDO TODOS PRODUTOS NUM ARRAY
    adicinar(produto){
        produto.preco = parseFloat(produto.produto)
       this.arrayProduto.push(produto) 
       //adiciona id de cada item do arrayProduto
       this.id++;

    }

    atualizar(id, produto){
        for (let i = 0; i < this.arrayProduto.length; i++) {
                if(this.arrayProduto[i].id == id) {
                    this.arrayProduto[i].nome = produto.nome
                    this.arrayProduto[i].preco = produto.preco
        }
    }
}
    preparaEdicao(dados){
        //ENVIA ID PARA EDITID DEUXAR DE SER NULL
        this.editId = dados.id
        //PEGA OS VALORES DOS INPUTS E JOGA NOVAMENTE PARA EDIÇÃO
        document.getElementById('produto').value = dados.nome
        document.getElementById('preco').value = dados.preco

        //Atualiza o nome do botão salvar
        document.getElementById('btn').innerText = 'Atualizar'
    }

    //FUNÇÃO RESPONSALVEL POR PEGAR DADOS DOS INPUTS    
    captarDados() {

        //VARIAVEL OBJETO RESPONSALVEL POR ARMAZENAR DADOS VINDO DO RETORNO   
        let produto = {}

        produto.id = this.id;
        produto.nome = document.querySelector('#produto').value;
        produto.preco = document.querySelector('#preco').value;

        //RETORNO DOS VALORES DO PRODUTO CAPTADO   
        return produto
    };


    //FUNÇÃO  RESPONSALVEL POR VALIDAR CAMPOS DOS INPUTS

    validaInput(produto) {

        //GATILHO PARA SABER SE A MENSAGEM AINDA CONTINUA VAZIA E TOMAR APOS PASSAR PELO (IF ELSE)
        let msg = ''

        //VERIFICA SE CAMPO NOME ESTAR VAZIO E TOMAR UMA DECISÃO
        if (produto.nome == '') {
            msg += '-Informe o nome do produto \n';
        }

        //VERIFICA SE CAMPO preço ESTAR VAZIO E TOMAR UMA DECISÃO
        if (produto.preco == '') {
            msg += '-Informe o valor do produto \n';
        }

        //SE A MENSAGEM TIVER CONTEUDO É PORQUE O USUARIO NAO DITITOU NADA ''
        if (msg != '') {
            alert(msg)

            //REALIZA O ALERTA E RETORNA FALSE, PARA USAR FALSE NO CONTROLE DE OUTRA 'VARIAVEL'
            return false
        }
        //POR ÚLTMO SE  'MSG' RETORNAR VAZIA É PQ USUARIA PREECHEU OS CAMPOS, É RETORNA TRUE PARA REALIZAR  CONTROLE DE OUTRA 'VARIAVEL'
        return true


    }
    //FUNÇÃO RESPONSALVEL LIMPAR OS INPUTS
    cancelar() {

        //LIMPA OS CAMPOS DOS INPUTS
        document.querySelector('#produto').value = ''
        document.querySelector('#preco').value = ''
        //RETORNA O NOME DO BOTÃO PARA SALVAR
        document.getElementById('btn').innerText = 'Salvar'


        //RETORNA EDIT PARA NULL
        this.editId = null

    };


    //FUNÇÃO RESPONSALVEL DELETAR PRODUTOS
    deletar(id){
        //IF PARA ALERTAR O USUARIO CANCELAR O DELETE 
        if(confirm('voce tem certeza que deseja deletera o do ID' + id)){
            let tbody = document.querySelector('#tbody');

            //FOR QUE EXECUTA O DELEÇÃO
            for(let i = 0;i < this.arrayProduto.length; i++){
                if(this.arrayProduto[i].id == id){
                 // dois valores 
                 this.arrayProduto.splice('i',1)
                 //deletar td
                 tbody.deleteRow(i)
                } 
            }
        }
    }

};

const botaosalvar = document.querySelector('#btn');
const botaocancelar = document.querySelector('#btn2');

var produto = new Produto();

botaosalvar.addEventListener('click', function () {
    produto.salvar();
})

botaocancelar.addEventListener('click', function () {
    produto.cancelar();
})