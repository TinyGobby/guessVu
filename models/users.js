class Users {
  constructor() {
    this.list = [];
  }

  add(fakeName,realName) {
    var name_check = this.check(fakeName, realName);
    if (!name_check.success) { 
      return name_check;
    }
    
    var new_user = {
      fakeName,
      realName,
      id: this.generateID()
    }
    this.list.push(new_user);
    return {success: true, user: new_user}
  }

  getAllFakeNames(){
    let fakeNames = [];
    this.list.map((user) => {
      fakeNames.push(user.fakeName)
    })
    return fakeNames;
  }

  getAllRealNames(){
    let realNames = [];
    this.list.map((user) => {
      realNames.push(user.realName)
    })
    return realNames;
  }

  compareFakeReal(fakeName, realName){
    let success = false
    this.list.forEach((user) => {
      if (user.fakeName == fakeName && user.realName == realName){
        success = true;
      }
    })
    return success;
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

  check(fakeName, realName) {
    var success = true;
    var reason = null;
    this.list.forEach((user) => {
      if (user.fakeName == fakeName) {
        success = false
        reason = "fakeName is already taken"
      }
      if (user.realName == realName) {
        success = false
        reason = "This real name is already taken. Maybe add your last name?"
      }
    })
    return {success: success, reason: reason}
  }
}

module.exports = Users
