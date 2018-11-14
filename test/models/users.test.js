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
