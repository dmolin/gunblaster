Meteor.methods({
  'mailblast/send': MethodsHelper.makeIdempotent(function(data) {
    var user = Meteor.users.findOne(this.userId);
    var status, reason;

    if(!user) {
      throw new Meteor.Error('enotfound-user', 'This method cannot be called when not logged in');
    }

    check(data, App.Schemas.MailBlastForm);
    this.unblock();

    if(!Email) {
      throw new Meteor.Error('enosupport', 'No Email support present in the system.');
    }

    if(!user.emails || !user.emails.length || !user.emails[0].verified) {
      throw new Meteor.Error('enoemailfrom', 'Current user has no email or not verified. cannot send');
    }

    if(!data.emails || !data.emails.length) {
      throw new Meteor.Error('enoemailto', 'No Emails to send to. operation aborted');
    }

    //generate ID for email blast first
    var blastId = App.Utils.uniqueId();

    //create email jobs
    data.emails = data.emails.split('\n');
    _.each(data.emails, function(email) {
      status = 'queued'; //sent not-sent error
      reason = '';
      email = email.trim();

      //check email validity first
      if(!App.Schemas.Mixins.email.regEx.test(email)) {
        //email is not accepted.
        status = 'not-sent';
        reason = 'Email address invalid'
      }

      App.collections.EmailJobs.insert({
        blastId: blastId,
        to: email,
        status: status,
        reason: reason
      }, {validate:false, bypassCollection2:true});
    });

    //Add a new email blast
    try {
      App.collections.EmailBlasts.insert({
        _id: blastId,
        status: 'queued',   //in-progress completed with-errors
        from: user.emails[0].address,
        subject: data.subject,
        content: data.content
      }, {validate:false, bypassCollection2:true});
    }
    catch(error) {
      //remove emails
      App.collections.EmailJobs.remove({blastId:blastId});
      throw new Meteor.Error("system-error", "We couldn't process your email blast. no email has been sent. please try again.");
    }
  })
});