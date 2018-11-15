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
      expect(users.list).toContainEqual({fakeName: "unicorn42", realName: "Seb", id: "1"});
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
      expect(users.getAllRealNames()).toEqual(["seb1", "seb2", "seb3"])
    });
  })

  describe("getAllFakeNames", () => {
    it("should return all the fake names of users", () => {
      users.add("unicorn1", "seb1");
      users.add("unicorn2", "seb2");
      users.add("unicorn3", "seb3");
      expect(users.getAllFakeNames()).toEqual(["unicorn1", "unicorn2", "unicorn3"])
    });
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

})
