const Users = require('./models/users');

var users = new Users();

module.exports = (app, messages) => {
    app.post('/api/user', (req, res) => {
        const result = users.add(req.body.fakeName, req.body.realName);
        res.send(result);
    })

    app.get('/api/user/allRealNames', (req, res) => {
        const allRealNames = users.getAllRealNames();
        res.send(allRealNames);
    })

    app.get('/api/user/allFakeNames', (req, res) =>{
        const allFakeNames = users.getAllFakeNames();
        res.send(allFakeNames);
    })

    app.post('/api/user/leave', (req, res) => {
        const userID = req.body.id;
        users.deleteUser(userID);
        if (users.checkEndGame()) {
            messages.deleteAllMessages();
            res.send({ "gameOver": true });
        }
        res.send({ "gameOver": false });
    })

    app.post('/api/user/solve', (req, res) => {
        const solution = req.body.solution;
        const realName = solution.realName;
        const fakeName = solution.fakeName;
        const guesser = req.body.guesser;
        const result = users.compareFakeReal(fakeName, realName);
        res.send(result);
    })
}
