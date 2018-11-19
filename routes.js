module.exports = (app, game, io) => {

    const users = game.users;
    const messages = game.messages;

    app.post('/api/user', (req, res) => {
        if (game.isOpen) {
          const result = users.add(req.body.fakeName, req.body.realName);
          res.send(result)
        } else {
          res.send({
            success: false,
            reason: 'Sorry, you cannot join, the game has started.'
          })
        }
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
            game.open();
        }
        res.send({
          "success": true
        })
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
