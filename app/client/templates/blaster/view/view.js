/*****************************************************************************/
/* History: Event Handlers */
/*****************************************************************************/
Template.BlasterView.events({
  'click [data-id=delete-blast]': function(event) {
    event.preventDefault();
    var blastId = Template.instance().data.id;
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
        outcome = 'done';
        break;
      case 'sent':
        outcome = email.delivered ? 'done' : 'error_outline';
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
  blastStatusIcon: function() {
    var blast = this.blast;
    if(!blast) return;

    switch(blast.status) {
      case 'queued':
        return 'alarm_on'
        break;
      case 'in-progress':
        return "loop";
        break;
      case 'completed':
        return ((blast.valid === blast.delivered) ? "done" : "error_outline");
        break;
      case 'with-errors':
        return "error_outline";
        break;
    }
  },
  sentDateOrError: function() {
    var email = this;

    if(email.status !== 'not-sent') {
      return moment(email.createdAt).format('DD-MM-YYYY HH:mm:ss');
    }
    return "not sent";
  }
});

/*****************************************************************************/
/* History: Lifecycle Hooks */
/*****************************************************************************/
Template.BlasterView.onCreated(function () {
});

Template.BlasterView.onRendered(function () {
});

Template.BlasterView.onDestroyed(function () {
});
