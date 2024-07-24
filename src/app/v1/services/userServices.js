class UserServices {
  async getUserProfile({ id }) {
    return {
      id: id || 1,
      name: "Tai Tien Nguyen 1112",
      age: 24,
    };
  }
}

module.exports = new UserServices();
