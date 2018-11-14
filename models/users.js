class Users {
  constructor() {
    this.list = [];
  }

  add(fakeName,realName) {
    var new_user = {
      fakeName,
      realName,
      id: this.generateID()
    }
    this.list.push(new_user);
  }

  generateID() {
    let ids = [];
    
    this.list.forEach((user) => {
    
      ids.push(user.id)
    })
    
    if(ids.length == 0) {
      return "1";
    }
    return (Math.max(...ids) + 1).toString();
  }
}

module.exports = Users
