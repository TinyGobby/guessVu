const Users = require('../../models/users');

describe("Users", () => {

  var users;

  beforeEach(() => {
    users = new Users();

  })

  it("should contain a list", () => {
    expect(Array.isArray(users.list)).toBe(true);
  })

  describe("add", () => {
    it("should add new user", () => {
      users.add("unicorn42", "Seb");
      expect(users.list).toContainEqual({fakeName: "unicorn42", realName: "Seb", id: "1", discovered: false, wrongGuesses: 0, eliminated: false});
    })

    it("should return success", () => {
      expect(users.add("unicorn42", "Seb").success).toBe(true);
    })

    it("should not add a user if fakename is taken", () => {
      users.add("unicorn42", "seb");
      expect(users.add("unicorn42", "vu").success).toBe(false);
    })

    it("should not add a user if realname is taken", () => {
      users.add("unicorn99", "vu");
      expect(users.add("unicorn88", "vu").success).toBe(false);
    })

    it("should not add a user if real name is equal to fake name", () => {
      expect(users.add("bob", "bob").success).toBe(false)
    })
  })

  describe('getUser', () => {
    it('retrieves user by Id', () => {
      users.add("unicorn1", "vu1");
      expect(users.getUser("1").fakeName).toEqual("unicorn1");
    })
  })

  describe("checkEndGame", () => {
    it("returns true if no user left", () =>{
      expect(users.checkEndGame()).toBe(true);
    })
  })

  describe("generateID", () => {
    it("should generate 1 when there are no users", () => {
      expect(users.generateID()).toEqual("1");
    })
    it("should generate 2 when there is 1 user with id 1", () => {
      users.add("unicorn42", "seb");
      expect(users.generateID()).toEqual("2");
    })
  })

  describe("getAllRealNames", () => {
    it("should return all the real names of users", () => {
      users.add("unicorn1", "seb1");
      users.add("unicorn2", "seb2");
      users.add("unicorn3", "seb3");
      expect(users.getAllRealNames()).toEqual(expect.arrayContaining(["seb1", "seb2", "seb3"]))
    });
  })

  describe("getAllFakeNames", () => {
    it("should return all the fake names of users", () => {
      users.add("unicorn1", "seb1");
      users.add("unicorn2", "seb2");
      users.add("unicorn3", "seb3");
      expect(users.getAllFakeNames()).toEqual(expect.arrayContaining(["unicorn1", "unicorn2", "unicorn3"]))
    });
  })

  describe("deleteUser", () => {
    it("should delete a given users", () => {
      users.add("unicorn1", "seb1");
      users.add("unicorn2", "seb2");
      expect(users.deleteUser("1")[0].realName).toEqual("seb2");
    })
  })

  describe("compareFakeReal", () => {
    it('should return true when fake name matches real name', () => {
      users.add("unicorn1", "seb1");
      users.add("unicorn2", "seb2");
      expect(users.compareFakeReal("unicorn1", "seb1")).toBe(true)
    });
    it('should return false when fake name does not match real name', () => {
      users.add("unicorn1", "seb1");
      expect(users.compareFakeReal("unicorn1", "seb2")).toBe(false)
    });
  })

  describe("isFakeNameRealName", () => {
    it('should return true if real name is the same as fake name', () => {
      expect(users.isFakeNameRealName("bob", "bob")).toBe(true);
    });
    it('should return false if real name isnt the same as fake name', () => {
      expect(users.isFakeNameRealName("bob", "john")).toBe(false);
    });
  })

  describe('isUserAboveMaxGuesses', () => {
    it('returns true if user is above wrong guesses', () => {
      users.add("unicorn1", "seb1");
      users.incrementWrongGuesses("1");
      expect(users.isUserAboveMaxGuesses(0,"1")).toBe(true);
    })
  })

  describe('eliminates user', () => {
    it('sets eliminate on user to true', () => {
      users.add("unicorn1", "seb1");
      users.eliminateUser("1");
      expect(users.list[0].eliminated).toBe(true);
    })
  })

  describe("discover", () =>{
    it('changes discovered to true', () => {
      users.add("unicorn1", "seb1");
      users.discover("unicorn1");
      expect(users.list[0].discovered).toBe(true);
    })
  })

  describe("undiscoveredUsers", () => {
    it("should return 2 when two users sign up", () => {
      users.add("unicorn1", "seb1");
      users.add("unicorn2", "seb2");
      expect(users.undiscoveredUsers()).toEqual(2);
    })

    it("should return 1 when two users sign up and one is discovered", () => {
      users.add("unicorn1", "seb1");
      users.add("unicorn2", "seb2");
      users.discover("unicorn1");
      expect(users.undiscoveredUsers()).toEqual(1);
    })
  })

  describe('incrementWrongGuesses', () => {
    it('incremenets wrongGuesses by 1', () => {
      users.add("unicorn1", "seb1");
      users.incrementWrongGuesses("1");
      expect(users.list[0].wrongGuesses).toEqual(1);
    })
  })

})
