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
        let win = false;
        let success = false;
        let eliminated = false;
        let msg = "Sorry, not this time!";
        const realName = req.body.solution.realName;
        const fakeName = req.body.solution.fakeName;
        const guesser = req.body.guesser;
        if (guesser.fakeName == fakeName) {
          msg = "Know thyself indeed! But you cannot guess yourself..."
        } else {
          success = users.compareFakeReal(fakeName, realName);
        }
        if (success) {
          users.discover(fakeName);
          msg = "You're right!"
          if (users.undiscoveredUsers() === 1) { win = true };
        } else {
          users.incrementWrongGuesses(guesser.id);
          if (users.isUserAboveMaxGuesses() {
            users.eliminate(guesser.id)
            eliminated = true
          })
        }
        res.send({
          eliminated,
          msg,
          success,
          win,
        });
    })
}
