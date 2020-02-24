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
	},
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

const buscarCurso = (cursoParaProcurar, listaDeCursos) => {
	for (const curso of listaDeCursos) {
		if (curso.nomeDoCurso.toUpperCase() === cursoParaProcurar.toUpperCase()) {
			console.log(`Encontramos o curso ${cursoParaProcurar} nesta lista`);
			return curso;
		}
	}
	console.log(`Não Encontramos o curso ${cursoParaProcurar} nesta lista`);
	return null;
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
	const prefixoErro = "Erro ao adicionar aluno:";
	let mensagemDeStatus = "";

	if (!buscarAluno(alunoNovo)) {
		alunosDaEscola.push({
			nome: alunoNovo,
			cursos: [],
		});
		mensagemDeStatus = `Aluno ${alunoNovo} cadastrado com sucesso!`;
	} else {
		mensagemDeStatus = `${prefixoErro} O aluno ${alunoNovo} já está cadastrado no sistema`;
	}
	console.log(mensagemDeStatus);
};

const matricularAluno = (aluno, curso) => {
	const alunoNoSistema = buscarAluno(aluno);
	const prefixoErro = "Erro ao matricular:";
	let mensagemDeStatus = "";

	if (alunoNoSistema) {
		if (!buscarCurso(curso, alunoNoSistema.cursos)) {
			const dataAtual = new Date();

			alunoNoSistema.cursos.push({
				nomeDoCurso: curso,
				dataMatricula: dataAtual,
				notas: [],
				faltas: 0,
			});
			mensagemDeStatus = `Aluno ${aluno} foi matriculo no curso de ${curso} com sucesso!`;
		} else {
			mensagemDeStatus = `${prefixoErro} O aluno ${aluno} JÁ está no curso de ${curso}`;
		}
	} else {
		mensagemDeStatus = `${prefixoErro} O aluno ${aluno} NÃO existe`;
	}
	console.log(mensagemDeStatus);
};

const aplicarFalta = (aluno, curso) => {
	const alunoNoSistema = buscarAluno(aluno);
	const cursoNoSistema = buscarCurso(curso, alunoNoSistema.cursos);
	const prefixoErro = `Erro ao dar falta:`;
	let mensagemDeStatus = "";

	if (cursoNoSistema && alunoNoSistema) {
		++cursoNoSistema.faltas;
		mensagemDeStatus = `Uma falta foi dada à ${aluno} no curso de ${curso}`
	} else {
		mensagemDeStatus = `${prefixoErro} curso ou aluno não existem`;
	}
	console.log(mensagemDeStatus);
};

const aplicarNota = (aluno, curso, nota) => {
	const alunoNoSistema = buscarAluno(aluno);
	const cursoNoSistema = buscarCurso(curso, alunoNoSistema.cursos);
	const prefixoErro = `Erro ao dar nota:`;
	let mensagemDeStatus = "";

	if (cursoNoSistema && alunoNoSistema && nota) {
		cursoNoSistema.notas.push(nota);
		mensagemDeStatus = `Uma nota foi dada à ${aluno} no curso de ${curso}`
	} else {
		mensagemDeStatus = `${prefixoErro} curso ou aluno não existem ou nota não foi especificada`;
	}
	console.log(mensagemDeStatus);
};

const calcularMedia = listaDeNotas => {
	const numeroDeNotas = listaDeNotas.length;
	const soma = listaDeNotas.reduce((acc, cur) => acc + cur)
	return soma / numeroDeNotas;
};

const aprovarAluno = (aluno, curso) => {
	const alunoNoSistema = buscarAluno(aluno);
	const cursoNoSistema = buscarCurso(curso, alunoNoSistema.cursos);
	const prefixoErro = `Erro ao aprovar o aluno:`;
	let mensagemDeStatus = "";

	if (alunoNoSistema && cursoNoSistema) {
		if ((calcularMedia(cursoNoSistema.notas) >= 7) && (cursoNoSistema.faltas <= 3)) {
			mensagemDeStatus = `O aluno ${aluno} foi APROVADO! no curso de ${curso}`;
		} else {
			mensagemDeStatus = `O aluno ${aluno} REPROVOU no curso de ${curso}`;
		}
	} else {
		mensagemDeStatus = `${prefixoErro} curso ou aluno não existem`;
	}
	console.log(mensagemDeStatus);
};

// testes
adicionarAluno("Henrique");
listarAlunos(alunosDaEscola);
adicionarAluno("Daniel");
listarAlunos(alunosDaEscola);
matricularAluno("Lucca", "Full Stack");
listarAlunos(alunosDaEscola);
aplicarFalta("Lucca", "ux");
aplicarFalta("Lucca", "ux");
aplicarNota("lucca", "ux", 10);
listarAlunos(alunosDaEscola);
console.log(calcularMedia(alunosDaEscola.find(aluno => aluno.nome === "Lucca").cursos[0].notas));
aprovarAluno("lucca", "ux");
aplicarFalta("Lucca", "ux");
aplicarFalta("Lucca", "ux");
aprovarAluno("lucca", "ux");
