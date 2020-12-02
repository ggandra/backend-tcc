const knex = require('../../database');

module.exports = {
    async listOrders(req, res){
        let establishmentId = req.params.establishment_id;
        try {
            await knex('orders').where({
                establishment_id: establishmentId,
            }).select('id', 'client_name', 'latitude', 'longitude', 'created_at').then((results) => {
                return res.json({ results: results })
            })
        } catch (error) {
            return res.json({ error: "Can't list orders from this establishment" });
        }
    },

    async createOrders(req, res) {
        let { client_name, establishment_id, latitude, longitude } = req.body;
        try {
            knex('orders').insert({
                client_name: client_name,
                establishment_id: establishment_id,
                latitude: latitude,
                longitude: longitude
            }).then((results) => {
                return res.json({results: results});
            }).catch((err) => {
                return res.json({err: err});
            })
        } catch (error) {
            return res.json({err: err});
        }
    },

    async deleteOrders(req, res) {
        try {
            knex('orders').
            where('id', req.params.id).
            del().then((result) => {
                return res.json({result: result});
            }).catch((err) => {
                return res.status(400).send(err);
            })
        } catch (error) {
            return res.status(400).send('Error');
        }
    }
}