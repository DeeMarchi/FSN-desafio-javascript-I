const utils = require("./utilitarios");

const LINHA_DE_DIVISAO = "----------------------------------------";
const LINHA_DE_CURSOS = "++++++++++++++++++++++++++++++++++++++++";

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
			dataMatricula: new Date("2019-12-17T12:30:00"),
			notas: [8.1, 7.8, 9.5],
			faltas: 0,
		}],
	}
];

// implementação

const exibirNotas = listaDeNotas => {
	if (listaDeNotas.length > 0) {
		console.log("Notas:");
		console.log(utils.formatarNotas(listaDeNotas));
	} else {
		console.log("O aluno ainda não recebeu nenhuma nota no curso");
	}
};

const exibirInfoDoCurso = curso => {
	console.log(LINHA_DE_CURSOS);
	console.log(`Curso: ${curso.nomeDoCurso.toUpperCase()}`);
	console.log(`Data de matrícula: ${utils.formatarData(curso.dataMatricula)}`);
	exibirNotas(curso.notas);
	console.log(`Faltas: ${curso.faltas}`);
	console.log(LINHA_DE_CURSOS);
};

const listarAlunos = listaDeAlunos => {
	listaDeAlunos.forEach(aluno => {
		console.log("\n" + aluno.nome);
		console.log(LINHA_DE_DIVISAO);
		if (aluno.cursos.length > 0) {
			aluno.cursos.forEach(curso => {
				exibirInfoDoCurso(curso);
			});
		} else {
			console.log(LINHA_DE_CURSOS);
			console.log(`${aluno.nome} ainda não está matriculado em nenhum curso`);
			console.log(LINHA_DE_CURSOS);
		}
	});
};

const buscarAluno = nomeAluno => {
	for (const aluno of alunosDaEscola) {
		if (aluno.nome.toUpperCase() === nomeAluno.toUpperCase()) {
			console.log(`Encontramos o aluno ${nomeAluno} em nosso sistema!`);
			return aluno;
		}
	}
	console.log(`Não encontramos nenhum aluno com o nome ${nomeAluno}`);
	return null;
};

const adicionarAluno = alunoNovo => {
	let mensagemDeStatus = "";

	if (!buscarAluno(alunoNovo)) {
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
