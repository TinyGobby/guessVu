module.exports = (app, game, io) => {

    app.post('/api/game/startnew', (req, res) => {
      game.startNew();
      res.send({ success: true })
    })

    app.post('/api/user', (req, res) => {
        if (game.isOpen) {
          const result = game.users.add(req.body.fakeName, req.body.realName);
          res.send(result)
        } else {
          res.send({
            success: false,
            reason: 'Sorry, you cannot join, the game has started.'
          })
        }
    })

    app.get('/api/user/allRealNames', (req, res) => {
        const allRealNames = game.users.getAllRealNames();
        res.send(allRealNames);
    })

    app.get('/api/user/allFakeNames', (req, res) =>{
        const allFakeNames = game.users.getAllFakeNames();
        res.send(allFakeNames);
    })

    app.post('/api/user/leave', (req, res) => {
        const userID = req.body.id;
        game.users.deleteUser(userID);
        if (game.users.checkEndGame()) {
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
        let winner = '';
        let msg = "Sorry, not this time!";
        const realName = req.body.solution.realName;
        const fakeName = req.body.solution.fakeName;
        const guesser = req.body.guesser;
        if (guesser.fakeName == fakeName) {
          msg = "Know thyself indeed! But you cannot guess yourself..."
        } else {
          success = game.users.compareFakeReal(fakeName, realName);
          console.log("success: " + success)
          if (success) {
            game.users.discover(fakeName);
            msg = "You're right!"
            if (game.users.left() === 1) { win = true };
            console.log("gets to after check for undiscoveredUsers")
          } else {
            game.users.incrementWrongGuesses(guesser.id);
            if (game.users.isUserAboveMaxGuesses(game.maxWrongGuesses, guesser.id)) {
              game.users.eliminateUser(guesser.id)
              msg = "You used up your guesses. You're eliminated."
              eliminated = true
            }
          }
        }

        if (game.users.left() === 1) {
          win = true;
          winner = game.users.list[0];
        };
        res.send({
          eliminated,
          msg,
          success,
          usersLeft: game.users.left(),
          win,
          winner
        });

    })
}
