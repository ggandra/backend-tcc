const knex = require('../../database');
const bcrypt = require('bcrypt');

module.exports = {
    async loginEstablishments(req, res) {
        let { username, password } = req.body;
        try {
            await knex('establishments').where({
                username: username,
            }).select('id', 'name', 'city', 'latitude', 'longitude', 'password').then((results) => {
                bcrypt.compare(password, results[0].password, (err, result) => {
                    if(result === true) {
                        return res.json({result: results})
                    } else {
                        console.log(result)
                        return res.status(400).send('Login Failed')
                    }
                })
            })
        } catch (error) {
            return res.json({ error: "Can't find the current user" });
        }
    },

    async delivery(req, res) {
        let { orderId, courierId } = req.body;
        try {
            await knex('deliverys').insert({
                courier_id: courierId,
                order_id: orderId
            }).then((results) => {
                return res.json({ result: "Successfull delivery creation" });
            })
        } catch (error) {
            return res.json({ error: "Can't attribute the delivery"});
        }
    }
}