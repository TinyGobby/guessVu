class Users {
  constructor() {
    this.list = [];
    this.discovered = false;
  }

  shuffleMyArr(arr) {
    var currentIndex = arr.length;
    var tempVal, randomIndex;

    while (currentIndex !== 0) {
      //pick a random element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // swap it with current element
      tempVal = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex]
      arr[randomIndex] = tempVal
    }
    return arr
  }

  add(fakeName,realName) {
    var name_check = this.check(fakeName, realName);
    if (!name_check.success) {
      return name_check;
    }

    var new_user = {
      discovered: false,
      fakeName,
      realName,
      id: this.generateID()
    }
    this.list.push(new_user);
    return {success: true, user: new_user}
  }

  checkEndGame() {
    return this.list.length === 0;
  }

  deleteUser(userId) {
    this.list.forEach((user, index) => {
      if (user.id == userId) {
        this.list.splice(index, 1);
      }
    });
    return this.list
  }

  discover() {

  }

  getAllFakeNames(){
    let fakeNames = [];
    this.list.map((user) => {
      fakeNames.push(user.fakeName)
    })
    return this.shuffleMyArr(fakeNames);
  }

  getAllRealNames(){
    let realNames = [];
    this.list.map((user) => {
      realNames.push(user.realName)
    })
    return this.shuffleMyArr(realNames);
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

  isFakeNameRealName(fakeName, realName){
    return fakeName == realName
  }

  isFakeNameTaken(fakeName){
    let taken = false
    this.list.forEach((user) => {
      if (user.fakeName == fakeName) {
        taken = true
      }
    })
    return taken;
  }
  isRealNameTaken(realName){
    let taken = false
    this.list.forEach((user) => {
      if (user.realName == realName) {
        taken = true
      }
    })
    return taken
  }
  check(fakeName, realName) {
    let success = true;
    let reason = null;
    if (this.isFakeNameTaken(fakeName)) {
      success = false;
      reason = "fakeName is already taken"
    }
    if (this.isRealNameTaken(realName)) {
      success = false;
      reason = "This real name is already taken. Maybe add your last name?"
    }
    if (this.isFakeNameRealName(fakeName, realName)) {
      success = false
      reason = "Your fake name can't be your real name"
    }
    return {success: success, reason: reason}
  }
}

module.exports = Users
