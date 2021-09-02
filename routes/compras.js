var express = require('express');
var router = express.Router();
var pagarme = require('../lib/pagarme');

/* POST criação de compra. */
router.post('/', function (req, res, next) {
    pagarme.compra(req.body).then((result) => {
        
        const paymentId = result.data.id;
        const amount = result.data.amount;

        pagarme.captura(paymentId, amount)
        .then((result) =>{
            //console.log(`DA UMA OLHADA AQ: ${result.data.status}`)
            if(result.data.status == 'paid'){
                res.status(201);
                res.send({
                "Status": "Sucesso",
                "Message": "compra realizada com sucesso! :D",
                "CompraId": paymentId
                });
            }else {
              res.status(402);
              res.send({
                "Status": "Falha",
                "Message": "compra não realizada problema na cobrança no cartão! :C"
              });
            }
            
        })
        .catch(err => console.error(err))
    })
    .catch(error => console.error(error))
});

/* Get status de compra*/
router.get('/:compra_id/status', function (req, res, next) {
    pagarme.consulta(req.params.compra_id)
    .then((result) => {
        let message = {};
        switch(result.data.status) {
          case 'authorized':
                message = {
                  'Status': 'Pagamento autorizado'
                };
            break;
            
            case 'paid':
              message = {
                'Status': 'Pagamento realizado'
              };
            break;

            case 'processing':
            case 'analyzing':
              message = {
                'Status': 'Pagamento pendente'
              };
            break;

            default:
              message = {
                'Status': 'Pagamento falhou'
              };
            break;
        }

        res.send(message);
    }).catch(error => console.error(error));
});

module.exports = router;
