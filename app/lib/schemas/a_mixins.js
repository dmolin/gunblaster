App.Schemas.Mixins = {
  /**
   * This function makes a mixin required.
   * The rationale is to avoid mixin duplications when different forms require different mandatory rules
   * for the same type of mixin.
   * With this function it's just a matter of:
   *
   * myForm = new SimpleSchema({
   *   optional: Schemas.Mixins.postcode,
   *   required: Schemas.Mixins.required(Schemas.Mixins.postcode)
   * });
   */
  required: function(mixin) {
    return _.extend({}, mixin||{}, {optional:false});
  }
};

App.Schemas.Mixins.verificationCode = {
  type: String,
  regEx: /^[0-9]+$/,
  max: 6,
  min: 6
};

App.Schemas.Mixins.username = {
  type: String,
  label: 'Username',
  regEx: /^[a-zA-Z0-9]+$/,
  max: 15
};

App.Schemas.Mixins.email = {
  type: String,
  regEx: SimpleSchema.RegEx.Email
};

App.Schemas.Mixins.emailOrUsername = {
  type: String,
  max: 200
};


App.Schemas.Mixins.password = {
  type: String,
  min: 6,
  custom: function() {
    var error = null,
      value = this.value,
      // map RegExp expression to error key
      regExps = {
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
};

App.Schemas.Mixins.alphaName = {
  type: String,
  regEx: /^([A-zÀ-ÿ][- ]?)+[A-zÀ-ÿ]$/,
  max: 200
};
