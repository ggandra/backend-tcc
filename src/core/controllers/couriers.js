const knex = require('../../database');

module.exports = {
    async loginCouriers(req, res) {
        let { username, password } = req.body;
        try {
            knex('couriers').where({
                username: username,
                password: password
            }).then((results) => {
                return res.json({ results: results });
            })
        } catch (error) {
            return res.json({ error: "Can't find current courier" });
        }
    }
}