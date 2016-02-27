var errors = new ReactiveDict();
AutoForm.hooks({
  LoginForm: {
    onSubmit: function(validDoc, updateDoc, currentDoc) {
      console.log("on submit");
      var form = this;

      Meteor.loginWithPassword(validDoc.username.toLowerCase(), validDoc.password, function(error) {
        if(error) {
          form.done(error);
        } else {
          Meteor.logoutOtherClients();
          form.done();
          Router.go('home');
        }
      });
      return false;
    },
    onSuccess: function() {
      console.log("on success");
      return false;
    },

    onError: function(operation, error, template) {
      var form = this;
      var formErrors;
      console.log("on error", error);
      if(!error.invalidKeys) {
        if (error.reason === 'User not found' || error.reason === 'Incorrect password') {
          form.validationContext.addInvalidKeys([{
            name: 'password',
            type: 'notFoundOrIncorrect'
          }]);
        } else {
          //TODO: fill a proper validation message in the form.validationContext
          //it's in: error.message
          alert(error.message);
        }

      }
      return false;
    }
  }
});

Template.login.helpers({
});