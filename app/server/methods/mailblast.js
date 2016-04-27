Meteor.methods({
  'mailblast/send': MethodsHelper.makeIdempotent(function(data) {
    var user = Meteor.users.findOne(this.userId);
    var status, reason;

    if(!user) {
      throw new Meteor.Error('enoauth', 'This method cannot be called when not logged in');
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
    var toSend = 0;  //valid email addresses to send to

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
      } else {
        toSend++;
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
        status: toSend > 0 ? 'queued' : 'with-errors',   //[queued, in-progress, completed, with-errors]
        emails: data.emails.length,
        valid: toSend,
        sent: 0,
        delivered:0,
        from: user.emails[0].address,
        subject: data.subject,
        content: data.content,
        text: data.text,
      }, {validate:false, bypassCollection2:true});
    }
    catch(error) {
      //remove emails
      App.collections.EmailJobs.remove({blastId:blastId});
      throw new Meteor.Error("system-error", "We couldn't process your email blast. no email has been sent. please try again.");
    }
  }),

  'mailblast/delete': function(blastId) {
    var user = Meteor.users.findOne(this.userId);
    var status, reason;

    if (!user) {
      throw new Meteor.Error('enoauth', 'This method cannot be called when not logged in');
    }

    check(blastId, String);
    this.unblock();

    var blast = App.collections.EmailBlasts.findOne({_id:blastId});
    if(!blast) {
      //nothing to do here.
      return;
    }
    if(blast.createdBy !== user._id) {
      throw new Meteor.Error('enotowner', 'This Email blast can be deleted only by its owner');
    }

    //remove all email jobs associated with this blast
    App.collections.EmailJobs.remove({blastId: blast._id});
    //remove the blast
    App.collections.EmailBlasts.remove({_id:blast._id, createdBy: user._id});
  }
});