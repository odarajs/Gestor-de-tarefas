const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNumero = document.querySelector('#m-numero')
const sdescricao = document.querySelector('#m-descricao')
const sData = document.querySelector('#m-data')
const sOption = document.querySelector('#m-option')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNumero.value = itens[index].numero
    sdescricao.value = itens[index].descricao
    sData.value = itens[index].data
    sOption.value = itens[index].option
    id = index
  } else {
    sNumero.value = ''
    sdescricao.value = ''
    sData.value = ''
    sOption.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')
  let classStatus = "";
  if(item.option == "Completo"){
   classStatus = "statusCompleted" 
  }else if(item.option == "Andamento"){
    classStatus = "statusAndamento" 
  }else if(item.option == "Stopped"){
    classStatus = "statusStopeed" 
  }
  let data = `<td class="${classStatus}">${item.option}</td>`;
  tr.innerHTML = `
    <td>${item.numero}</td>
    <td>${item.descricao}</td>
    <td>${item.data}</td>
    ${data}
    <td class="acao">
      <button onclick="editItem(${index})" style="background:none; border:none; onclick="editItem(${index})"><img src="./icon/editar.svg" style="width:20px;"</button>
    </td>
    <td class="acao">
    <button style="background:none; border:none;" onclick="deleteItem(${index})"><img style="width:20px;" src="./icon/apaga.svg" /></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNumero.value == '' || sdescricao.value == '' || sData.value == '' || sOption.value == '' ) {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].numero = sNumero.value
    itens[id].descricao = sdescricao.value
    itens[id].data = sData.value
    itens[id].option = sOption.value
  } else {
    itens.push({'numero': sNumero.value, 'descricao': sdescricao.value, 'data': sData.value, 'option': sOption.value,})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    
    insertItem(item, index)
    
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
