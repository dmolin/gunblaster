App.controllers.BlasterViewController = App.controllers.BaseController.extend({

  // Subscriptions or other things we want to "wait" on. This also
  // automatically uses the loading hook. That's the only difference between
  // this option and the subscriptions option above.
  // return Meteor.subscribe('post', this.params._id);
  
  waitOn: function () {
    if(Meteor.user()) {
      return [
        Meteor.subscribe('email_blast', this.params.id),
        Meteor.subscribe('email_jobs', this.params.id)
      ];
    }
  },
  
  // A data function that can be used to automatically set the data context for
  // our layout. This function can also be used by hooks and plugins. For
  // example, the "dataNotFound" plugin calls this function to see if it
  // returns a null value, and if so, renders the not found template.
  // return Posts.findOne({_id: this.params._id});
  
  data: function () {
    //return subscription to target_emails collection
    return {
      blast: App.collections.EmailBlasts.findOne(this.params.id),
      emails: App.collections.EmailJobs.find({blastId: this.params.id}),
      delivered: App.collections.EmailJobs.find({blastId: this.params.id, status:'delivered'}),
      undelivered: App.collections.EmailJobs.find({blastId: this.params.id, status:{$not:'delivered'}})
    };
  },
  
  // You can provide any of the hook options
  
  onBeforeAction: function () {
    App.Router.currentRoute.set("Blaster Details");
    this.next();
  }
  
});
