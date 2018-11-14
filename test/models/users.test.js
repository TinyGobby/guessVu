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

})
