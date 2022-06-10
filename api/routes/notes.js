//const { criarNota } = require('../controllers/notes')

module.exports = app => {
    const controller = require('../controllers/notes')();//precisa desses ultimos parenteses

    app.get('/api/v1/notes', function(req, res){
        controller.listNotas();
        controller.listarNotas.then(function(result){
            res.send(result);
        })
    });

    app.get('/api/v1/notes/:id', function(req, res){
        controller.recuperarNota(req.params.id).then(function(result){
            res.send(result);
        });
    })

    app.post('/api/v1/notes', function(req, res){
        console.log(req.body);
        controller.criarNota(req.body);
        res.send("Nota cadastrada com sucesso");
    });

    app.put('/api/v1/notes/:id', function(req, res){ // vc pode colocar o id na uri
        controller.atualizarNota(req.params.id, req.body)
        //console.log(req.params.id)
        res.send("Nota atualizada com sucesso")
    });

    app.delete('/api/v1/notes/:id', function(req, res){
        controller.deletarNota(req.params.id)
        res.send("Nota deletada com sucesso")
    })

}