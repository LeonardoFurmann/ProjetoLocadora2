var url = 'http://localhost:3000/'

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
			divAlocacao.appendChild(divStatus)
			
						
			// //cria o botão para remover a alocacao
			// let btnRemover = document.createElement('button')
			// btnRemover.innerHTML = 'Remover'
			// btnRemover.onclick = u => remover(alocacao.id)
			// btnRemover.style.marginRight = '5px'
			
			// //cria o botão para atualizar a alocacao
			// let btnAtualizar = document.createElement('button')
			// btnAtualizar.innerHTML = 'Atualizar'
			// btnAtualizar.onclick = u => atualizar(alocacao.id, divNomeUsuario, divNomeFilme)
			// btnAtualizar.style.marginLeft = '5px'
			
			// //cria a div com os dois botões
			// let divBotoes = document.createElement('div')
			// divBotoes.style.display = 'flex'
			// divBotoes.appendChild(btnRemover)
			// divBotoes.appendChild(btnAtualizar)
			// divAlocacao.appendChild(divBotoes)
			
			//insere a div do usuario na div com a lista de usuarios
			listaAlocacoes.appendChild(divAlocacao)
		}
	})
}
