class UserServices {
  async GetUser(call, callback) {
    const user = {
      id: call.request.id,
      fullname: "Nguyen Tien Tai",
      email: "nguyentientai10@gmail.com",
      picture: "ádasdasdasdas",
    };

    callback(null, { user });
  }
}

module.exports = new UserServices();
