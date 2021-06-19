const getBanco = () => JSON.parse( localStorage.getItem('todoList')) ?? [];

const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco));

// ============ CREATE ITEM ============= //
const criarItem = (tarefa,statusTarefa = '',indice) =>{
    const item = document.createElement('label')
    item.classList.add('todo__item');
    item.innerHTML = `
        <input type="checkbox" ${statusTarefa} data-indice = ${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice = ${indice} >
        `
    document.getElementById('todoList').appendChild(item)
}

// =========== CLEAN ITEMS =============== //
const limparTarfas = () =>{
    const todoList = document.getElementById('todoList');

    while (todoList.firstChild){
        todoList.removeChild(todoList.lastChild);
    }
}

// ==============  ATT ===================== //
const AtualizaTela =  () => {
    limparTarfas();
    const banco = getBanco();
    banco.forEach((item,indice) => criarItem(item.tarefa,item.statusTarefa,indice) )
}

// =============== INSERT ITEMS ==============//
const inserirItem= (evento) =>{
    const tecla = evento.key;
    const texto = evento.target.value
    if (tecla === 'Enter'){
        const banco = getBanco();
        banco.push( {'tarefa': texto,'statusTarefa': ''})
        setBanco(banco);
        AtualizaTela();

        evento.target.value = ''; //limpar tarefa
    }
}

// ============== REMOVE ITEMS ==============//
const removerItem = (indice)=>{
    const banco = getBanco();
    banco.splice (indice,1);
    setBanco(banco);
    AtualizaTela();
}

//=============== ATT ITEMS ==================//
const atualizarItem = (indice)=>{
    const banco = getBanco();
    banco[indice].statusTarefa = banco[indice].statusTarefa === ''? 'checked' : '';
    setBanco(banco);
    AtualizaTela();
}

const clickItem = (evento)=>{
    const elemento = evento.target;
    if(elemento.type === 'button'){
        const indice = elemento.dataset.indice
        removerItem(indice)
    } else if(elemento.type ==='checkbox'){
        const indice = elemento.dataset.indice;
        atualizarItem(indice)
    }
}

document.getElementById('newItem').addEventListener('keypress',inserirItem)
document.getElementById('todoList').addEventListener('click',clickItem)

AtualizaTela();
