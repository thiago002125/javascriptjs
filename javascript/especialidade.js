const KEY_BD = '@especiaidadestrabalho'
let listaEspecialidades = {
    ultimoCod : 0,
    especialidades : []
};
function gravarBD() {
    localStorage.setItem(KEY_BD, JSON.stringify(listaEspecialidades))
};
function lerBD() {
    const data = localStorage.getItem(KEY_BD)
    if(data){
        listaEspecialidades = JSON.parse(data);
    }
    desenhar();
};
function desenhar(){
    debugger;
    const tbody = document.getElementById("listaEspecialidadesBody")
    if(tbody){
        tbody.innerHTML = listaEspecialidades.medicos
        .sort((a, b) => {
            return a.nomeEspecialidade < b.nomeEspecialidade ? -1: 1
        })
        .map(especialidades =>{

            return `<tr>
                        <td>${especialidades.id}</td>
                        <td>${especialidades.nomeEspecialidade}</td>
                        <td>${especialidades.medico}</td>
                        <td>
                            <button onclick='vizualizar("cadastro", false ,${especialidades.id})'>Editar</button>
                            <button class="vermelho" onclick="perguntaExcluir(${especialidades.id})">Excluir</button>
                        </td>
                    <tr/>`
        }) .join('')
    }
}
function salvar(nomeEspecialidade, medicos){
    const id = listaEspecialidades.ultimoCod + 1;
    listaEspecialidades.ultimoCod =  id;
    listaEspecialidades.especialidades.push({
        id, nomeEspecialidade, medicos
    })
    gravarBD();
    desenhar();
    vizualizar("lista");
}
function editar(id, nomeEspecialidade, medicos){
    let especialidade = listaEspecialidades.especialidades.find(especialidade => especialidade.id == id)
    especialidade.nomeEspecialidade = nomeEspecialidade
    especialidade.medicos = medicos
    gravarBD();
    desenhar();
    vizualizar("lista");
}
function deletar(id){
    listaEspecialidades.especialidades = listaEspecialidades.especialidades.filter(especialidade => {
        return especialidade.id != id
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
    document.getElementById("nomeEspecialidade").value = ''
    document.getElementById("medico").value= ''
}
function vizualizar(pagina, novo=false, id=null){
    document.body.setAttribute('page', pagina)
    if (pagina = 'cadastro'){
        if(novo) limparEdicao();
        if(id){
            const medico =listaEspecialidades.especialidades.find(especialidade => especialidade.id == id)
            if(medico){
                document.getElementById("id").value = especialidade.id
                document.getElementById("nomeEspecialidade").value = especialidade.nomeEspecialidade
                document.getElementById("medico").value= especialidade.medico
            }
        }
        document.getElementById("nomeEspecialidade").focus();
    }
}
function submeter(e){
    e.preventDefault()
    const data = {
        id:document.getElementById("id").value,
        nomeEspecialidade:document.getElementById("nomeEspecialidade").value,
        medico:document.getElementById("medico").value,
    }
    if (data.id){
        editar(data.id, data.nomeEspecialidade, data.medico)
    }else{
        salvar(data.nomeEspecialidade, data.medico)
    }
}
window.addEventListener('load', () =>{
    lerBD();
    document.getElementById("cadEspec").addEventListener('submit', submeter)
})