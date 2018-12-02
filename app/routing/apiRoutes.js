const friendArray = require(`../data/friends`);

module.exports = function (app) {
    app.get(`/api/friends`, (req, res) => {
        res.json(friendArray);
    });

    app.post(`/api/friends`, (req, res) => {
        friendArray.push(req.body);
        res.json(true);
    });
};