class Messages {
    constructor(message){
        this.messageList = []
    }

    getMessages(){
        return this.messageList;
    }

    saveMessage(userID, fakeName, message){
       let user =  {
            "userid": userID,
            "fakeName": fakeName,
            "message": message
        }

        this.messageList.push(user);
    }

}
module.exports = Messages
