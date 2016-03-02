/*****************************************************************************/
/* History: Event Handlers */
/*****************************************************************************/
Template.BlasterHistory.events({
  'click [data-id=delete-blast]': function(event) {
    event.preventDefault();
    var blastId = $(event.currentTarget).data('blast-id');
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
        });
      }
    });
  }
});

/*****************************************************************************/
/* History: Helpers */
/*****************************************************************************/
Template.BlasterHistory.helpers({
  blasts: function() {
    return App.collections.EmailBlasts.find({createdBy: Meteor.userId()}, {sort: { createdAt:-1 }});
  },
  isEmpty: function() {
    return App.collections.EmailBlasts.find({createdBy: Meteor.userId()}).count() === 0;
  },
  statusIcon: function(row) {
    console.log(row);
    return "";
  }
});

/*****************************************************************************/
/* History: Lifecycle Hooks */
/*****************************************************************************/
Template.BlasterHistory.onCreated(function () {
});

Template.BlasterHistory.onRendered(function () {
});

Template.BlasterHistory.onDestroyed(function () {
});
