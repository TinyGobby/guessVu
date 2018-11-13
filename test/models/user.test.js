describe("Users", () => {

  const users;

  beforeEach(() => {
    users = new Users();
  })

  it("should contain a list", () => {
    expect(Array.isArray(users.list)).toBe(true);
  })
})
