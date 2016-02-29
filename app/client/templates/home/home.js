/*****************************************************************************/
/* Home: Event Handlers */
/*****************************************************************************/
Template.Home.events({
  'click .logout': function() {
    Accounts.logout();
  }
});

/*****************************************************************************/
/* Home: Helpers */
/*****************************************************************************/
Template.Home.helpers({
  username: function() {
    return Meteor.user() && Meteor.user().username || "-"
  }
});

/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.Home.onCreated(function () {
});

Template.Home.onRendered(function () {
});

Template.Home.onDestroyed(function () {
});

AutoForm.hooks({
  MailBlastForm: {
    onSubmit: function(validDoc, updateDoc, currentDoc) {
      var form = this;
      console.log("ready to blast!");
      //call server to send email blast
      Meteor.call("mailblast/send", validDoc, function(err, result) {
        form.done();
        if(err) {
          alert(err);
          return;
        }

        alert("Your email blast was sent. You can follow its progress in the 'Blast History' page");
        //clear the form
        form.resetForm();
      });

      return false;
    },
    onError: function(op, error, template) {
      console.log(error);
    }
  }
})