var url = 'http://localhost:3000/'

let idFilme;
let idUsuario;
var statusFilme
let idade;
let classIndicativa;

// função para listar alocações
function listar()
{
	// get no endpoint 'alocacoes'
	fetch(url + 'alocacoes')
	.then(response => response.json())
	.then((alocacoes) =>
	{
		let listaAlocacoes = document.getElementById('lista-alocacoes')
		
		//limpa div
		while(listaAlocacoes.firstChild)
		{
			listaAlocacoes.removeChild(listaAlocacoes.firstChild)
		}
		
		// preenchendo a div de alocacoes
		for(let alocacao of alocacoes)
		{
			//cria div para as informacões de uma alocacao
			let divAlocacao = document.createElement('div')
			divAlocacao.setAttribute('class', 'form')
			
			//pega o nome do usuario
			let divNomeUsuario = document.createElement('input')
			divNomeUsuario.placeholder = 'Nome Completo'
			divNomeUsuario.value = alocacao.nomeUsuario
			divAlocacao.appendChild(divNomeUsuario)

            //pega o nome do filme
			let divNomeFilme = document.createElement('input')
			divNomeFilme.placeholder = 'Filme'
			divNomeFilme.value = alocacao.nomeFilme
			divAlocacao.appendChild(divNomeFilme)

            //pega a data de alocacao
			let divDataAloc = document.createElement('input')
			divDataAloc.placeholder = 'Data alocação'
			divDataAloc.value = alocacao.dataAlocacao
			divAlocacao.appendChild(divDataAloc)

            //pega a data de devolucao
			let divDataDev = document.createElement('input')
			divDataDev.placeholder = 'Data devolução'
			divDataDev.value = alocacao.dataDevolucao
			divAlocacao.appendChild(divDataDev)

            //pega o status
            // todo status booleano
			let divStatus = document.createElement('input')
			divStatus.placeholder = 'Status'
			divStatus.value = alocacao.statusAloc

			if(alocacao.statusAloc){
				divStatus.value = "Em andamento"
			}else{
				divStatus.value = alocacao.statusAloc = "Devolvido"
			}

			divAlocacao.appendChild(divStatus)
			
			
						
			//cria o botão para remover a alocacao
			let btnRemover = document.createElement('button')
			btnRemover.innerHTML = 'Remover'
			btnRemover.onclick = u => remover(alocacao.id)
			btnRemover.style.marginRight = '5px'
			
			// //cria o botão para atualizar a alocacao
			// let btnAtualizar = document.createElement('button')
			// btnAtualizar.innerHTML = 'Atualizar'
			// btnAtualizar.onclick = u => atualizar(alocacao.id, divNomeUsuario, divNomeFilme)
			// btnAtualizar.style.marginLeft = '5px'

			//cria o botão para fazer devolucao
			let btnDevolucao = document.createElement('button')
			btnDevolucao.innerHTML = 'Devolver'
			btnDevolucao.onclick = u => devolver(alocacao.id)
			btnDevolucao.style.marginLeft = '5px'
			
			//cria a div com os botões
			let divBotoes = document.createElement('div')
			divBotoes.style.display = 'flex'
			divBotoes.appendChild(btnRemover)
			//divBotoes.appendChild(btnAtualizar)
			divBotoes.appendChild(btnDevolucao)
			divAlocacao.appendChild(divBotoes)
			
			//insere a div do usuario na div com a lista de usuarios
			listaAlocacoes.appendChild(divAlocacao)
		}
	})
}

//função para devolver a alocação
function devolver(id){
	let body =
	{
		'statusAloc': false
	}
	
	fetch(url + "devolucao/" + id,
	{
		'method': 'POST',
		'redirect': 'follow',
		'headers':
		{
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		'body': JSON.stringify(body)
	})
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	.then((output) =>
	{
		listar()
		console.log(output)
		alert('Alocação devolvida!')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível devolver a alocação')
	})
}


// // função para atualizar as alocações
// function atualizar(id, divNomeUsuario, divNomeFilme)
// {
// 	let body =
// 	{
// 		'NomeUsuario': divNomeUsuario.value,
// 		'NomeFilme': divNomeFilme.value,
// 	}
	
// 	fetch(url + "atualizaralocacao/" + id,
// 	{
// 		'method': 'PUT',
// 		'redirect': 'follow',
// 		'headers':
// 		{
// 			'Content-Type': 'application/json',
// 			'Accept': 'application/json'
// 		},
// 		'body': JSON.stringify(body)
// 	})
// 	.then((response) =>
// 	{
// 		if(response.ok)
// 		{
// 			return response.text()
// 		}
// 		else
// 		{
// 			return response.text().then((text) =>
// 			{
// 				throw new Error(text)
// 			})
// 		}
// 	})
// 	.then((output) =>
// 	{
// 		listar()
// 		console.log(output)
// 		alert('Alocação atualizada!')
// 	})
// 	.catch((error) =>
// 	{
// 		console.log(error)
// 		alert('Não foi possível atualizar a alocação')
// 	})
// }

// função para remover alocações
function remover(id)
{
	fetch(url + 'deletrAlocacao/' + id,
	{
		'method': 'DELETE',
		'redirect': 'follow'
	})
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	.then((output) =>
	{
		listar()
		console.log(output)
		alert('Alocação removida!')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível remover a alocação!')
	})
}

// função para listar usuários
function listarUsuarios()
{
	// get no endpoint 'usuários'
	fetch(url + 'usuarios')
	.then(response => response.json())
	.then((usuarios) =>
	{
		let listaUsuarios = document.getElementById('lista-usuarios')
		
		//limpa div
		while(listaUsuarios.firstChild)
		{
			listaUsuarios.removeChild(listaUsuarios.firstChild)
		}
		
		// preenchendo a div de usuários
		for(let usuario of usuarios)
		{
			//cria div para as informacões de um usuário
			let divUsuario = document.createElement('div')
			divUsuario.setAttribute('class', 'form')
			
			//pega o nome do usuario
			let divNome = document.createElement('input')
			divNome.placeholder = 'Nome Completo'
			divNome.value = usuario.nome
			divUsuario.appendChild(divNome)
			
			//pega o email do usuario
			let divEmail = document.createElement('input')
			divEmail.placeholder = 'Email'
			divEmail.value = usuario.email
			divUsuario.appendChild(divEmail)

			let divIdade = document.createElement('input')
			divIdade.placeholder = 'Idade'
			divIdade.value = usuario.idade
			divUsuario.appendChild(divIdade)

			//cria o botão para selecionar o usuario
			let btnSelecionar = document.createElement('button')
			btnSelecionar.innerHTML = 'Selecionar'
			btnSelecionar.onclick = u => selecionarUsuario(usuario.id, usuario.idade,divUsuario)
			btnSelecionar.style.marginLeft = '5px'
			
			//cria a div com o botão
			let divBotoes = document.createElement('div')
			divBotoes.style.display = 'flex'
			divBotoes.appendChild(btnSelecionar)
			divUsuario.appendChild(divBotoes)

			listaUsuarios.appendChild(divUsuario)
		}
	})
}

// função para listar filmes
function listarFilmes()
{
	// get no endpoint 'filmes'
	fetch(url + 'filmes')
	.then(response => response.json())
	.then((filmes) =>
	{
		let listarFilmes = document.getElementById('lista-filmes')
		
		//limpa div
		while(listarFilmes.firstChild)
		{
			listarFilmes.removeChild(listarFilmes.firstChild)
		}
		
		// preenchendo a div de filmes
		for(let filme of filmes)
		{
			//cria div para as informacões de um filme
			let divFilme = document.createElement('div')
			divFilme.setAttribute('class', 'form')
			
			//pega o nome do filme
			let divNome = document.createElement('input')
			divNome.placeholder = 'Nome'
			divNome.value = filme.nome
			divFilme.appendChild(divNome)
			
			//pega o diretor do fime
			let divDiretor = document.createElement('input')
			divDiretor.placeholder = 'Diretor'
			divDiretor.value = filme.diretor
			divFilme.appendChild(divDiretor)

			//pega a data do fime
			let divDataLanc = document.createElement('input')
			divDataLanc.placeholder = 'DataLancamento'
			divDataLanc.value = filme.dataLancamento
			divFilme.appendChild(divDataLanc)

			//pega o genero do fime
			let divGenero = document.createElement('input')
			divGenero.placeholder = 'Genero'
			divGenero.value = filme.genero
			divFilme.appendChild(divGenero)

			//pega classificação indicativa do fime
			let divClassIndicativa = document.createElement('input')
			divClassIndicativa.placeholder = 'ClassIndicativa'
			divClassIndicativa.value = filme.classIndicativa
			divFilme.appendChild(divClassIndicativa)

			//pega o status do fime
			let divStatusFilme = document.createElement('input')
			divStatusFilme.placeholder = 'StatusFilme'
			divStatusFilme.value = filme.statusFilme

			if (filme.statusFilme) {
				divStatusFilme.value = "Disponível"
			}else{
				divStatusFilme.value = "Está Alocado"
			}

			divFilme.appendChild(divStatusFilme)
		
		

			
			//cria o botão para selecionar o filme
			let btnSelecionar = document.createElement('button')
			btnSelecionar.innerHTML = 'Selecionar'
			btnSelecionar.onclick = u =>  selecionarFilme(filme.id, filme.statusFilme, filme.classIndicativa, divFilme )
			btnSelecionar.style.marginLeft = '5px'

			
			//cria a div com o botão
			let divBotoes = document.createElement('div')
			divBotoes.style.display = 'flex'
			divBotoes.appendChild(btnSelecionar)
			divFilme.appendChild(divBotoes)

		
			listarFilmes.appendChild(divFilme)
			
		}

	})
}

function selecionarFilme(id, status, ci, div){	

	listarFilmes()

	idFilme = id
	statusFilme = status
	classIndicativa = ci
	div.style.border = 'solid 1px red'

	console.log(idFilme)
}

function selecionarUsuario(id, age, div){

	listarUsuarios()

	idUsuario = id;
	idade = age
	div.style.border = 'solid 1px red'

	console.log(idUsuario)
}


function verificaClassificacaoIndicativa(){
		let idadeCorreta = false

		if( idade >=  classIndicativa) { 
			idadeCorreta = true;
		} else{
			idadeCorreta = false;
		}

		return idadeCorreta;
}

// function verificaFilmeLocado(){
// 	let estaLocado = false

// 	if (statusFilme === "Está Locado") {
// 		estaLocado = true;
// 	} else {
// 		estaLocado = false;
// 	}

// 	return estaLocado;


// }


function cadastrar(){

	// testes para ver se será possível efetuar o cadastro
	if(verificaClassificacaoIndicativa() == false)
	{
		return 
	}

    if(statusFilme == false)
	{
		return 
	}

	// json da criação de aloc
	let body =
	{
        'idUsuario': idUsuario,
        'idFilme': idFilme
        
	};

	// post no endpoint ''cadastraraloc''
	fetch(url + "cadastraraloc",
	{
		'method': 'POST',
		'redirect': 'follow',
		'headers':
		{
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		'body': JSON.stringify(body)
	})

	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})

	
	.then((output) =>
	{
		console.log(output)
		alert('Cadastro realizado com sucesso.')
	})

	
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível realizar o cadastro!')
	})
}



