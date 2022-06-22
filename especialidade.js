const KEY_BD = '@especialidades'
var listaRegistros = {
    ultimoID: 0,
    usuarios: []
}
function salvarBD() {
    localStorage.setItem(KEY_BD, JSON.stringify(listaRegistros))
}
function lerBD() {
    const data = localStorage.getItem(KEY_BD)
    if(data) {
        listaRegistros = JSON.parse(data)
    }
    draw()
}
function draw() {
    const tbody = document.getElementById('listaRegistrosBody')
    if(tbody){
        tbody.innerHTML = listaRegistros.usuarios
            .sort((a, b) => {
                return a.nome < b.nome ? -1 : 1
            })
            .map(usuarios => {
                return `<tr>
                        <td>${usuarios.id}</td>
                        <td>${usuarios.nome}</td>
                        <td>${usuarios.especialidade}</td>
                        <td>
                        <button class='botao' onclick = 'vizualizar("cadastro", false, ${usuarios.id})' >EDITAR</button>
                        <button class='botaov' onclick = 'perguntar(${usuarios.id})'>APAGAR</button>
                        </td>
                    </tr>`
            }).join('')
    }
}
function insertMedico(nome, especialidade) {
    const id = listaRegistros.ultimoID + 1;
    listaRegistros.ultimoID = id;
    listaRegistros.usuarios.push({
        id, nome, especialidade
    })
    salvarBD()
    draw()
    vizualizar('lista')
}
function editMedico(id, nome, especialidade) {
    var usuarios = listaRegistros.usuarios.find(usuarios => usuarios.id == id)
    usuarios.nome = nome;
    usuarios.especialidade = especialidade;
    salvarBD()
    draw()
    vizualizar('lista')
}
function deletMedico(id) {
    listaRegistros.usuarios = listaRegistros.usuarios.filter(usuarios => {
        return usuarios.id != id
    })
    salvarBD()
    draw()
}
function perguntar(id) {
    if(confirm('Deseja apagar o ID' +id)) {
        deletMedico(id)
    }
}
function limpar() {
    document.getElementById('nome').value = ''
    document.getElementById('especialidade').value = ''
}
function vizualizar(pagina, novo=false, id=null) {
    document.body.setAttribute('page', pagina)
    if (pagina === 'cadastro'){
        if(novo) limpar()
        if(id) {
            const usuarios = listaRegistros.usuarios.find(usuarios => usuarios.id === id)
            if(usuarios){
                document.getElementById('id').value = usuarios.id
                document.getElementById('nome').value = usuarios.nome
                document.getElementById('especialidade').value = usuarios.especialidade
            }
        }
        document.getElementById('nome').focus()
    }
}
function submeter(e) {
    e.preventDefault()
    const data = {
        id: document.getElementById('id').value,
        nome: document.getElementById('nome').value,
        especialidade: document.getElementById('especialidade').value,
    }
    if(data.id) {
        editMedico(data.id, data.nome, data.especialidade)
    }
    else {
        insertMedico(data.nome, data.especialidade)
    }
}
window.addEventListener('load', () => {
    lerBD()
    document.getElementById('cadastroRegistro').addEventListener('submit', submeter)
})