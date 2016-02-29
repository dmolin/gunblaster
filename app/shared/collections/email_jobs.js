App.collections.EmailJobs = new Mongo.Collection("email_jobs");
App.collections.EmailJobs.attachBehaviour(['timestampable', 'softremovable']);