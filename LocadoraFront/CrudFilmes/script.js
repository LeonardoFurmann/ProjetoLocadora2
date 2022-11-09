var url = 'http://localhost:3000/'

// validação do input nome
function validacaoNome(id)
{
	let divNome = document.getElementById(id)
	if(divNome.value.trim().split(' ').length >= 2)
	{
		divNome.style.border = 0
		return true
	}
	else
	{
		divNome.style.border = 'solid 1px red'
		return false
	}
}

// validação do input telefone
function validacaoTel(id)
{
    let divTel = document.getElementById(id)

    let tel = divTel.value
    
    let temMaiuscula = (/[A-Z]/).test(tel)
	let temMinuscula = (/[a-z]/).test(tel)
    let temEspecial  = (/[!@#$%&*?{}<>_]/).test(tel)

    if(temMaiuscula || temEspecial || temMinuscula)
    {
        divTel.style.border = 'solid 1px red'
        return false
    }
    else
    {
        divTel.style.border = 0
        return true
    }
}

// validação do input senha
function validacaoSenha(id)
{
	let divSenha = document.getElementById(id)
	
	let senha = divSenha.value
	
	let temTamanho   = senha.length >= 8
	let temMaiuscula = (/[A-Z]/).test(senha)
	let temMinuscula = (/[a-z]/).test(senha)
	let temNumero    = (/[0-9]/).test(senha)
	let temEspecial  = (/[!@#$%&*?{}<>_]/).test(senha)
	
	if(temTamanho && temMaiuscula && temMinuscula && temNumero && temEspecial)
	{
		divSenha.style.border = 0
		confirmacaoSenha('confirma-senha')
		return true
	}
	else
	{
		divSenha.style.border = 'solid 1px red'
		confirmacaoSenha('confirma-senha')
		return false
	}
}

// validação do input confirmar senha
function confirmacaoSenha(id)
{
	let divConfirma = document.getElementById(id)
	let divSenha = document.getElementById('senha')
	
	if(divConfirma.value == divSenha.value)
	{
		divConfirma.style.border = 0
		return true
	}
	else
	{
		divConfirma.style.border = 'solid 1px red'
		return false
	}
}

// função de cadastro dos usuários
function cadastrar()
{

	// testes para ver se será possível efetuar o cadastro
	if(!validacaoNome('nome-completo'))
	{
		return false
	}

    if(!validacaoTel('telefone'))
	{
		return false
	}
	
	if(!validacaoSenha('senha'))
	{
		return false
	}
	
	if(!confirmacaoSenha('confirma-senha'))
	{
		return false
	}

	// json da criação de usuário
	let body =
	{
        'Nome':        document.getElementById('nome-completo') .value,
        'Telefone':    document.getElementById('telefone')      .value,
        'Email':       document.getElementById('email')         .value,
		'Endereco':    document.getElementById('endereco')      .value,
		'Numero':      document.getElementById('numero')        .value,
		'Password':    document.getElementById('senha')         .value
	};

	// post no endpoint ''cadastrarusuario''
	fetch(url + "cadastrarusuario",
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

	// resposta para caso de certo
	.then((output) =>
	{
		console.log(output)
		alert('Cadastro realizado com sucesso.')
	})

	// resposta para caso tenha ocorrido algum erro
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível realizar o cadastro!')
	})
}

// função para listar usuários
function listar()
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
						
			//cria o botão para remover o usuário
			let btnRemover = document.createElement('button')
			btnRemover.innerHTML = 'Remover'
			btnRemover.onclick = u => remover(usuario.id)
			btnRemover.style.marginRight = '5px'
			
			//cria o botão para atualizar o usuário
			let btnAtualizar = document.createElement('button')
			btnAtualizar.innerHTML = 'Atualizar'
			btnAtualizar.onclick = u => atualizar(usuario.id, divNome, divEmail)
			btnAtualizar.style.marginLeft = '5px'
			
			//cria a div com os dois botões
			let divBotoes = document.createElement('div')
			divBotoes.style.display = 'flex'
			divBotoes.appendChild(btnRemover)
			divBotoes.appendChild(btnAtualizar)
			divUsuario.appendChild(divBotoes)
			
			//insere a div do usuario na div com a lista de usuarios
			listaUsuarios.appendChild(divUsuario)
		}
	})
}

// função para atualizar os usuários
function atualizar(id, divNome, divEmail)
{
	let body =
	{
		'Nome': divNome.value,
		'Email': divEmail.value,
	}
	
	fetch(url + "atualizarusuario/" + id,
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

// função para remover usuários
function remover(id)
{
	fetch(url + 'deletarusuario/' + id,
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