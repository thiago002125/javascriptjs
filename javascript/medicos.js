const KEY_BD = '@medicostrabalho'
let listaMedicos = {
    ultimoCod : 0,
    medicos : []
};
function gravarBD() {
    localStorage.setItem(KEY_BD, JSON.stringify(listaMedicos))
};
function lerBD() {
    const data = localStorage.getItem(KEY_BD)
    if(data){
        listaMedicos = JSON.parse(data);
    }
    desenhar();
};
function desenhar(){
    debugger;
    const tbody = document.getElementById("listaMedicosBody")
    if(tbody){
        tbody.innerHTML = listaMedicos.medicos
        .sort((a, b) => {
            return a.nomeMedico < b.nomeMedico ? -1: 1
        })
        .map(medicos =>{

            return `<tr>
                        <td>${medicos.id}</td>
                        <td>${medicos.nomeMedico}</td>
                        <td>${medicos.email}</td>
                        <td>${medicos.especialidade}</td>
                        <td>
                            <button onclick='vizualizar("cadastro", false ,${medicos.id})'>Editar</button>
                            <button class="vermelho" onclick="perguntaExcluir(${medicos.id})">Excluir</button>
                        </td>
                    <tr/>`
        }) .join('')
    }
}
function salvar(nomeMedico, email, especialidade){
    const id = listaMedicos.ultimoCod + 1;
    listaMedicos.ultimoCod =  id;
    listaMedicos.medicos.push({
        id, nomeMedico, email, especialidade
    })
    gravarBD();
    desenhar();
    vizualizar("lista");
}
function editar(id, nomeMedico, email, especialidade){
    let medico = listaMedicos.medicos.find(medico => medico.id == id)
    medico.nomeMedico = nomeMedico
    medico.email = email
    medico.especialidade = especialidade
    gravarBD();
    desenhar();
    vizualizar("lista");
}
function deletar(id){
    listaMedicos.medicos = listaMedicos.medicos.filter(medico => {
        return medico.id != id
    })
    desenhar();
    gravarBD();
}
function perguntaExcluir(id){
    if(confirm('Que deletar esse resgistro?')){
        deletar(id);
        desenhar();
    }
}
function limparEdicao(){
    document.getElementById("nomeMedico").value = ''
    document.getElementById("email").value= ''
    document.getElementById("especialidade").value= ''
}
function vizualizar(pagina, novo=false, id=null){
    document.body.setAttribute('page', pagina)
    if (pagina = 'cadastro'){
        if(novo) limparEdicao();
        if(id){
            const medico =listaMedicos.medicos.find(medico => medico.id == id)
            if(medico){
                document.getElementById("id").value = medico.id
                document.getElementById("nomeMedico").value = medico.nomeMedico
                document.getElementById("email").value= medico.email
                document.getElementById("especialidade").value= medico.especialidade
            }
        }
        document.getElementById("nomeMedico").focus();
    }
}
function submeter(e){
    e.preventDefault()
    const data = {
        id:document.getElementById("id").value,
        nomeMedico:document.getElementById("nomeMedico").value,
        email:document.getElementById("email").value,
        especialidade:document.getElementById("especialidade").value,
    }
    if (data.id){
        editar(data.id, data.nomeMedico, data.email, data.especialidade)
    }else{
        salvar(data.nomeMedico, data.email, data.especialidade)
    }
}
window.addEventListener('load', () =>{
    lerBD();
    document.getElementById("cadEspec").addEventListener('submit', submeter)
})