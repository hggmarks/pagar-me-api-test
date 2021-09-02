const axios = require('axios');

class Pagarme {
    static compra(params) {
        return axios.post('https://api.pagar.me/1/transactions', params)
    }

    static captura(paymentId, amount) {
        return axios.post(`https://api.pagar.me/1/transactions/${paymentId}/capture`, {
            amount: amount,
            api_key: 'ak_test_3M0Hlst8ZXdLBMJuBatCO377yykhCo'
        })
    }

    static consulta(paymentId) {
        return axios.get(`https://api.pagar.me/1/transactions/${paymentId}`, 
        {
            params:{
            api_key: 'ak_test_3M0Hlst8ZXdLBMJuBatCO377yykhCo'
            }
        });
    }
}

module.exports = Pagarme;