const knex = require('../../database');

module.exports = {
    async listOrders(req, res){
        let { establishmentId } = req.body;
        try {
            await knex('orders').where({
                establishment_id: establishmentId,
            }).select('id', 'client_name', 'latitude', 'longitude', 'created_at').then((results) => {
                return res.json({ results: results })
            })
        } catch (error) {
            return res.json({ error: "Can't list orders from this establishment" });
        }
    }
}