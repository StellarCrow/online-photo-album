function Validator() {
  this.validateFullname = function(str) {
    if (str === "") return "";
    if (/(([A-Za-z]+\s?)|([\u0400-\u04FF]+'?\s?))+/.test(str)) return true;
    else return "В имени есть запрещенные символы.";
  };

  this.validateUsername = function(str) {
    if (str === "") return "Заполните поле.";
    if (!/^(?=.{2,20}$)/.test(str))
      return "Имя должно содержать от 2 до 20 символов.";
    if (!/^[a-zA-Z0-9._]+/.test(str))
      return "Имя может состоять только из латинских букв и символов '.' '_'";
    if (!/^(?!.*[_.]{2})/.test(str))
      return " '.' и '_' не могут идти подряд 2 раза.";
    if (!/^(?=.{2,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(str))
      return "'.' и '_' могут находиться только в середине слова.";
    else return true;
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
