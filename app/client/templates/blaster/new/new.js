/*****************************************************************************/
/* Home: Event Handlers */
/*****************************************************************************/
Template.BlasterNew.events({

});

/*****************************************************************************/
/* Home: Helpers */
/*****************************************************************************/
Template.BlasterNew.helpers({
  senderEmail: function() {
    return Session.get('currentUser').email;
  }
});

/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.BlasterNew.onCreated(function () {

});

Template.BlasterNew.onRendered(function () {
  //AutoForm.resetForm('MailBlastForm');
  $('[data-id=email-content]').froalaEditor({
    charCounterCount: false,
    codeMirror: false
  })
});

Template.BlasterNew.onDestroyed(function () {
});

AutoForm.hooks({
  MailBlastForm: {
    onSubmit: function(validDoc, updateDoc, currentDoc) {
      var form = this;
      App.Schemas.MailBlastForm.clean(validDoc);
      validDoc.content = $('[data-id=email-content]').froalaEditor('html.get');
      console.log("ready to blast!", validDoc);

      //call server to send email blast
      Meteor.call("mailblast/send", MethodsHelper.uniqueReferenceIdParam(), validDoc, function(err, result) {
        if(err) {
          form.done(err);
          swal("Oops", err, "error");
          return;
        }
        form.done();
        swal("Done!", "Your email blast was sent. You can follow its progress in the 'Blast History' page", "success");
        //remove email addresses
        form.template.$('[name=emails]').val('');
      });

      return false;
    },
    onError: function(op, error, template) {
      console.log(error);
    }
  }
});
