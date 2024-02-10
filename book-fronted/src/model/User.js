export default class User {
  constructor(
    userId,
    firstName,
    lastName,
    email,
    passWord,
    mobileNumber,
    profileUrl,
    address,
    city,
    state,
    pincode,
    token
  ) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.passWord = passWord;
    this.mobileNumber = mobileNumber;
    this.profileUrl = profileUrl;
    this.address = address;
    this.city = city;
    this.state = state;
    this.pincode = pincode;
    this.token = token;
  }
}
