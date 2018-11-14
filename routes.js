const Users = require('./models/users');

let users = new Users();

module.exports = app => {
    app.post('/api/user', (req, res) => {
        console.log(req.body)
        users.add(req.body.fakeName, req.body.realName)
        const current_user = users.list.pop();
        res.send(current_user);
    })
}