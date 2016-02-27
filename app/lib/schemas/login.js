App.Schemas.LoginForm = new SimpleSchema({
  username: {
    type: String,
    label: 'Username',
    regEx: /^[a-zA-Z0-9]+$/,
    max: 15
  },

  password: {
    type: String,
    min: 6,
    custom: function() {
      var error = null,
        value = this.value,
      // map RegExp expression to error key
        regExps = {
          //'[A-Z]+': 'noUpperCaseLetter',
          '[a-z]+': 'noLowerCaseLetter',
          '[0-9]+': 'noNumber'
        };
      _.each(_.keys(regExps), function(regEx) {
        if (!new RegExp(regEx, 'g').test(value)) {
          error = regExps[regEx];
          return false;
        }
      });
      if (error) {
        return error;
      }
    }
  }
});