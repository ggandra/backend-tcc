const knex = require('../../database');

module.exports = {
    async loginEstablishments(req, res) {
        let { username, password } = req.body;
        try {
            await knex('establishments').where({
                username: username,
                password: password
            }).select('id', 'name', 'city', 'latitude', 'longitude').then((results) => {
                return res.json({ result: results })
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