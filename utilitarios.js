const utils = {
    formatarData: data => {
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
    },

    formatarNotas: listaDeNotas => {
        let conteudo = "";
    
        listaDeNotas.forEach((nota, i) => {
            conteudo += `Nota do período (${i + 1}): ${nota}\n`;
        });
    
        return conteudo;
    },

};

/* faça utils um objeto imutável */
Object.freeze(utils);
module.exports = utils;