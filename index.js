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
			dataMatricula: new Date('2019-12-17T12:30:00'),
			notas: [8.1, 7.8, 9.5],
			faltas: 0,
		}],
	}
];

// implementação

const formatarData = data => {
	return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
};

const listarAlunos = listaDeAlunos => {

	const formatarNotas = listaDeNotas => {
		let conteudo = "";

		listaDeNotas.forEach((nota, i) => {
			conteudo += `Nota do período (${i + 1}): ${nota}\n`;
		});

		return conteudo;
	};

	listaDeAlunos.forEach(aluno => {
		console.log(aluno.nome);
		console.log(LINHA_DE_DIVISAO);
		if (aluno.cursos.length > 0) {
			aluno.cursos.forEach(curso => {
				console.log(LINHA_DE_CURSOS);
				console.log(`Curso: ${curso.nomeDoCurso.toUpperCase()}`);
				console.log(`Data de matrícula: ${formatarData(curso.dataMatricula)}`);
				if (curso.notas.length > 0) {
					console.log("Notas:");
					console.log(formatarNotas(curso.notas));
				} else {
					console.log("O aluno ainda não recebeu nenhuma nota no curso");
				}
				console.log(`Faltas: ${curso.faltas}`);
				console.log(LINHA_DE_CURSOS);
			});
		} else {
			console.log(LINHA_DE_CURSOS);
			console.log(`${aluno.nome} ainda não está matriculado em nenhum curso`);
			console.log(LINHA_DE_CURSOS);
		}
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
