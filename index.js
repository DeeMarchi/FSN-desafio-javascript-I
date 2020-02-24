// Base a ser utilizada
const alunosDaEscola = [{
		nome: "Henrique",
		cursos: [],
	},
	{
		nome: "Edson",
		cursos: [],
	},
	{
		nome: "Bruno",
		cursos: [],
	},
	{
		nome: "Guilherme",
		cursos: [],
	},
	{
		nome: "Carlos",
		cursos: [],
	},
	{
		nome: "Lucca",
		cursos: [{
			nomeDoCurso: "UX",
			dataMatricula: new Date('2019-12-17T12:30:00'),
			notas: [8.1, 7.8, 9.5],
			faltas: 0,
		}],
	}
];

// implementação

const listarAlunos = listaDeAlunos => {
	listaDeAlunos.forEach((aluno) => {
		console.log(aluno);
	});
};

const adicionarAluno = alunoNovo => {
	let mensagemDeStatus = "";

	if (!alunosDaEscola.find(alunoNoSistema => alunoNoSistema.nome === alunoNovo )) {
		alunosDaEscola.push({
			nome: alunoNovo,
			cursos: [],
		});
		mensagemDeStatus = `Aluno ${alunoNovo} cadastrado com sucesso!`;
	} else {
		mensagemDeStatus = `O aluno ${alunoNovo} já está cadastrado no sistema`;
	}
	console.log(mensagemDeStatus);
};

adicionarAluno("Henrique");
listarAlunos(alunosDaEscola);
adicionarAluno("Daniel");
listarAlunos(alunosDaEscola);