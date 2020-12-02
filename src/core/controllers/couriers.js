const knex = require('../../database');
const bcrypt = require('bcrypt');

module.exports = {
    async loginCouriers(req, res) {
        let { username, password } = req.body;
        try {
            await knex('couriers').where({
                username: username,
            }).select('id', 'establishment_id', 'name', 'password').then((results) => {
                bcrypt.compare(password, results[0].password, (err, result) => {
                    if(result === true) {
                        return res.json({results: results})
                    } else {
                        console.log(result)
                        return res.status(400).send('Login Failed')
                    }
                })
            })
            // bcrypt.hash(password, 12, (err, hash) => {
            //     if(hash) {
            //         knex('couriers').where({
            //             username: username,
            //             password: hash
            //         }).select('id', 'establishment_id', 'name').then((results) => {
            //             return res.json({ results: results });
            //         })
            //     } else {
            //         return res.status(400).send(err);
            //     }
            // })
        } catch (error) {
            return res.status(400).send({ error: "Can't find current courier" });
        }
    },

    async createCouriers(req, res) {
        let { name, establishment_id, username, password } = req.body;
        try {
            bcrypt.hash(password, 12, (err, hash) => {
                if(hash) {
                    knex('couriers').insert({
                        name: name,
                        establishment_id: establishment_id,
                        username: username,
                        password: hash
                    }).then((results) => {
                        return res.json({results: results});
                    }).catch((err) => {
                        return res.status(400).send(err);
                    })
                } else {
                    return res.status(400).send(err);
                }
            });
        } catch (error) {
            return res.status(400).send(err);
        }
    },

    async listCouriers(req, res) {
        try {
            knex.select().from('couriers').where('establishment_id', req.params.id).
            then((result) => {
                return res.json({result: result});
            })
        } catch (error) {
            return res.status(400).send('Error');
        }
    },

    async deleteCouriers(req, res) {
        try {
            knex('couriers').
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