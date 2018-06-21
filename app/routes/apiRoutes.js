var friendsData = require("../data/friendsData");

module.exports = function(app) {

    //Displays the list of friends as a json object
    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function (req, res){
        //console.log(req.body);
        //Call the friend the compare function
        var matchedFriend = findMatch(req.body);
        //Add the new Friend data to array
       friendsData.push(req.body);
       res.json(matchedFriend);         
    });

    //find the match for the friend
    function findMatch(newFriend){
        //console.log(friendsData);
        var DiffArray = new Array();

        //Loop to find closet match
        for(i=0; i< friendsData.length; i++){
            //Loop to find the score for all the questions
            var diffTotal = 0;
            for(j=0; j< friendsData[i].scores.length; j++){
                diffTotal += Math.abs(newFriend.scores[j] - friendsData[i].scores[j]);
            } // end for - scores
            
            //if different is 0 then is it 100% match. dont need to find for rest
            if(diffTotal == 0){
                DiffArray = {
                    name: friendsData[i].name,
                    photo: friendsData[i].photo,
                    matchValue: diffTotal
                };
                return DiffArray;
            } //end if
            if(DiffArray.length == 0){
                DiffArray = {
                    name: friendsData[i].name,
                    photo: friendsData[i].photo,
                    matchValue: diffTotal
                };
            }// end if
            else{
                if(diffTotal < DiffArray.matchValue){
                    //New match is low. Hence replace with new friend
                    DiffArray = {
                        name: friendsData[i].name,
                        photo: friendsData[i].photo,
                        matchValue: diffTotal
                    };
                }//end if
            }//end else
        } // end for - match find
        return DiffArray;
    } // end of match function

}


