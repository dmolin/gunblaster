App.collections.EmailBlasts = new Mongo.Collection('email_blasts');
App.collections.EmailBlasts.attachBehaviour(['timestampable', 'softremovable']);