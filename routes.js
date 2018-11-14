const Users = require('./models/users');

var users = new Users();

module.exports = (app) => {
    app.post('/api/user', (req, res) => {
        const result = users.add(req.body.fakeName, req.body.realName);
        res.send(result);
    })
}
