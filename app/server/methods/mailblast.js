Meteor.methods({
  'mailblast/send': function(data) {
    var user = Meteor.users.findOne(this.userId);

    if(!user) {
      throw new Meteor.Error('enotfound-user', 'This method cannot be called when not logged in');
    }

    check(data, App.Schemas.MailBlastForm);

    console.log("sending email blast");
  }
});