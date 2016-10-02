/*****************************************************************************/
/* History: Event Handlers */
/*****************************************************************************/
Template.BlasterView.events({
  'click [data-id=start-blast]': function(event) {
    event.preventDefault();
    const blast = Template.instance().data.blast;
    const blastId = blast._id;

    if (blast.status !== 'created') {
      return;
    }

    console.log("Starting blast", blastId);
    Meteor.call('mailblast/start', blastId, function(error) {
      if(error) { swal("Oops", error, "error"); }
    });
  },

  'click [data-id=delete-blast]': function(event) {
    event.preventDefault();
    var blastId = Template.instance().data.blast._id;
    console.log("Deleting blast " + blastId);
    swal({
      title: 'Are you sure?',
      text: 'Do you want me to delete this Blast? You will not be able to recover it',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ee6e73',
      closeOnConfirm: false
    }, function(isConfirm) {
      if(isConfirm) {
        Meteor.call('mailblast/delete', blastId, function(error) {
          if(error) {
            swal("Oops", error, "error");
            return;
          }
          swal.close();
          Router.go('blaster/history');
        });
      }
    });
  }
});

/*****************************************************************************/
/* History: Helpers */
/*****************************************************************************/
Template.BlasterView.helpers({
  statusIcon: function() {
    var email = this;
    var outcome = '';

    switch(email.status) {
      case 'delivered':
        outcome = 'done_all';
        break;
      case 'sent':
        outcome = email.delivered ? 'done_all' : 'done';
        break;
      case 'queued':
        outcome = 'alarm_on';
        break;
      case 'not-sent':
        outcome = 'error_outline';
        break;
      case 'not-delivered':
        outcome = 'error_outline';
        break;
    }

    return outcome;
  },
  sentDateOrError: function() {
    var email = this;

    if(email.status !== 'not-sent') {
      return moment(email.createdAt).format('DD-MM-YYYY HH:mm:ss');
    }
    return "not sent";
  },
  deliveryDateOrDetails: function() {
    var email = this;
    if (email.status === 'delivered') { 
      return "Delivered on " + moment(email.updatedAt).format('DD-MM-YYYY HH:mm:ss');
    } else {
      return email.reason || "n.a";
    }
  }
});

/*****************************************************************************/
/* History: Lifecycle Hooks */
/*****************************************************************************/
Template.BlasterView.onCreated(() => {
});

Template.BlasterView.onRendered(function () {
});

Template.BlasterView.onDestroyed(function () {
});
