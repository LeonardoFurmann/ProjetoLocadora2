var url = 'http://localhost:3000/'

function cadastrar()
{


		let body =
		{
			'nome':document.getElementById('nome').value,
			'diretor':document.getElementById('diretor').value,
			'dataLancamento': document.getElementById('dataLancamento').value,
			'genero':document.getElementById('genero').value,
			'classIndicativa':  document.getElementById('classIndicativa').value
		};
		

	fetch(url + "cadastrarfilme",
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

function listar()
{
	
	fetch(url + 'filmes')
	.then(response => response.json())
	.then((filmes) =>
	{
		//pega div que vai conter a lista de usuarios
		let listaFilmes = document.getElementById('lista-filmes')
		
		//limpa div
		while(listaFilmes.firstChild)
		{
			listaFilmes.removeChild(listaFilmes.firstChild)
		}
		
		//preenche div com usuarios recebidos do GET
		for(let filme of filmes)
		{
			//cria div para as informacoes de um usuario
			let divFilme= document.createElement('div')
			divFilme.setAttribute('class', 'form')
			
			//pega o nome do filme
			let divNome = document.createElement('input')
			divNome.placeholder = 'Nome do Filme'
			divNome.value = filme.nome
			divFilme.appendChild(divNome)
			
			//pega o diretor
			let divDiretor = document.createElement('input')
			divDiretor.placeholder = 'Diretor'
			divDiretor.value = filme.diretor
			divFilme.appendChild(divDiretor)
			
			
			//pega o Gênero do filme
			let divGenero = document.createElement('input')
			divGenero.placeholder = 'Gênero'
			divGenero.value = filme.genero
			divFilme.appendChild(divGenero)

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
			
			
			//cria o botao para remover o usuario
			let btnRemover = document.createElement('button')
			btnRemover.innerHTML = 'Remover'
			btnRemover.onclick = u => remover(filme.id)
			btnRemover.style.marginRight = '5px'
			
			//cria o botao para atualizar o usuario
			let btnAtualizar = document.createElement('button')
			btnAtualizar.innerHTML = 'Atualizar'
			btnAtualizar.onclick = u => atualizar(filme.id,divNome, divDiretor, divGenero)
			btnAtualizar.style.marginLeft = '5px'
			
			//cria a div com os dois botoes
			let divBotoes = document.createElement('div')
			divBotoes.style.display = 'flex'
			divBotoes.appendChild(btnRemover)
			divBotoes.appendChild(btnAtualizar)
			divFilme.appendChild(divBotoes)
			
			//insere a div do usuario na div com a lista de usuarios
			listaFilmes.appendChild(divFilme)
		}
	})
}

//Atualiza filme da lista

function atualizar(id, divNome, divDiretor, divGenero)
{
	let body =
	{
		'Nome': divNome.value,
		'Diretor': divDiretor.value,
		'Genero': divGenero.value,
	}
	
	fetch(url + "atualizarfilme" + id,
	{
		'method': 'PUT',
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
		alert('Usuário atualizado!')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível atualizar o usuário.')
	})
}


//remove filme da lista

function remover(id)
{
	fetch(url + 'deletarfilme/' + id,
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
		alert('Usuário removido!')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível remover o usuário!')
	})
}
