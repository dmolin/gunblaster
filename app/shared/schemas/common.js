(function(){

SimpleSchema.messages({
  'notUnique': 'The [label] you provided is already registered',
  'regEx': 'You have invalid characters in your [label]',
  'noUpperCaseLetter': 'You need at least one upper case letter in your [label]',
  'noLowerCaseLetter': 'You need at least one lower case letter in your [label]',
  'noNumber': 'You need at least one number in your [label]',
  'minAge': 'You must be at least 18 years old',
  'maxAge': 'Invalid birth year',
  'notFound': 'E-mail or username not found',
  'required dob': 'Date of birth is required',
  'notFoundOrIncorrect': 'User not found or password incorrect. try again'
});

}).call(this);
