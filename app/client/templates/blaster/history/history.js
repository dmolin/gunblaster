/*****************************************************************************/
/* History: Event Handlers */
/*****************************************************************************/
Template.BlasterHistory.events({
  'change [data-id=date-filter]': function(event) {
    event.preventDefault();
    var filterValue = $(event.currentTarget).val();
    console.log("filter", filterValue);
    
    App.data.filters.emailBlasts.set({createdAt: filterValue})
    //Meteor.subscribe('email_blasts', );
  },
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
    return App.collections.EmailBlasts.find(App.queryFilters.emailBlasts(App.data.filters.emailBlasts.get()), {sort: { createdAt:-1 }});
  },
  isEmpty: function() {
    return App.collections.EmailBlasts.find(App.queryFilters.emailBlasts(App.data.filters.emailBlasts.get())).count() === 0;
  },
  filter: function() {
    return App.data.filters.emailBlasts.get().createdAt;
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
