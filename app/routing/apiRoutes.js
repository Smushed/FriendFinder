const friendArray = require(`../data/friends`);

module.exports = function (app) {
    app.get(`/api/friends`, (req, res) => {
        res.json(friendArray);
    });

    app.post(`/api/friends`, (req, res) => {
        //Find the best match before adding them to the app so they don't get matched with themselves
        const bestMatch = findFriend(req.body, friendArray);
        //Cannot add them then compare because there is no unique identifier. There is nothing stopping the user from using the same name or profile pic as another user.
        friendArray.push(req.body);
        res.json(bestMatch);
    });

    //Logic to find the friend with the lowest difference
    const findFriend = (user, friendArray) => {
        //Iterate through all the friends and find the match with the lowest difference
        let bestMatch = {};
        //Last difference is defined outside as we need it to persist over each friend
        let lastDifference = 0;
        friendArray.forEach(friend => {
            let answerDifference = 0;
            //Iterates through the arrays that are already in the app and compares it to the users'
            //The answers array comes in as a string, converting it to a number when figuring the difference
            friend.answers.forEach((answer, index) => answerDifference += Math.abs(+answer - +user.answers[index]));
            //Checks to see if the current checked friend
            if (answerDifference < lastDifference) {
                bestMatch = friend;
                //Without this else if, the first friend in the app would always be skipped
            } else if (lastDifference === 0) {
                bestMatch = friend
            };
            //Updates lastDifference to the user checked checking again
            lastDifference = answerDifference;
        });
        return bestMatch;
    };
};
