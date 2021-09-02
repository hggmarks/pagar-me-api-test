const axios = require('axios');

class Pagarme {

    const apiKey = 'ak_test_3M0Hlst8ZXdLBMJuBatCO377yykhCo';

    static compra(params) {
        return axios.post('https://api.pagar.me/1/transactions', params)
    }

    static captura(paymentId, amount) {
        return axios.post(`https://api.pagar.me/1/transactions/${paymentId}/capture`, {
            amount: amount,
            api_key: apiKey
        })
    }

    static consulta(paymentId) {
        return axios.get(`https://api.pagar.me/1/transactions/${paymentId}`, 
        {
            params:{
            api_key: apiKey
            }
        });
    }
}

module.exports = Pagarme;