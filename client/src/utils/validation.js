function Validator() {
  this.validateInputText = function(str) {
    if (str === "") return false;
  };

  this.validateUsername = function(str) {
    if (str === "") return false;
  };

  this.validatePassword = function(str) {
    if (str === "") return "Заполните поле";
    if (!/[A-Z]|[\u0410-\u042F]/.test(str))
      return "Пароль должен содержать хотя бы одну заглавную букву";
    if (!/[0-9]/.test(str)) return "Пароль должен содержать хотя бы одну цифру";
    if (str.length < 10) return "Пароль должен состоять хотя бы из 10 символов";
    return true;
  };

  this.comparePasswords = function(pass1, pass2) {
    return pass1 === pass2 ? true : "Пароли должны совпадать";
  };
}

module.exports = Validator;
