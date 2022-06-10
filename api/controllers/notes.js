const {inserirNota, recuperarTodasNotas, atualizarNota, recuperarNota, deletarNota } =  require('../data/notes')




module.exports = () => {
    const controller = {};
    controller.listarNotas = []
    
    controller.criarNota = (nota) => {
        entrada = {
            data: "",
            usuario: "",
            titulo: "",
            descricao: ""
        }
    
        inserirNota(nota);
    }

    controller.listNotas = () => {
        controller.listarNotas = recuperarTodasNotas();
    }

    controller.atualizarNota = (id, dado) => {
        atualizarNota(id, dado)
    }

    controller.recuperarNota = (id) => recuperarNota(id)

    controller.deletarNota = (id) => deletarNota(id)

    return controller;
}