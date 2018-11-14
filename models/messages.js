class Messages {
    constructor(message){
        this.messageList = []
    }

    getMessages(){
        return this.messageList;
    }

    saveMessage(userID, realName, fakeName, message){
       let user =  {
            "userid": userID,
            "realname": realName,
            "fakename": fakeName,
            "message": message
        }

        this.messageList.push(user);
    }

}
module.exports = Messages