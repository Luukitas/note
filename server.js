const app = require('./config/express')();
const port = app.get('port');

var porta = process.env.PORT || 8080

app.listen(porta, ()=> {
    console.log(`Servidor rodando na porta ${port}`);
});