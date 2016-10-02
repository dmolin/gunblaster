App.collections.EmailBlasts = new Mongo.Collection('email_blasts');
App.collections.EmailBlasts.attachBehaviour(['timestampable', 'softremovable']);

if (Meteor.isServer) {
  console.log("Security rules");
  App.collections.EmailBlasts.allow({
    insert: function (userId, doc) {
      return !!userId;
    },

    update: function (userId, doc) {
      return userId === doc.createdBy;
    },

    remove: function (userId, doc) {
      return userId === doc.createdBy;
    }
  });
};
