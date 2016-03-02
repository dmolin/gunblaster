Router.route('/api/mail/delivered',{where:'server'}).post(function() {
  console.log("Mail delivered", this.request.body);

  //update EmailJob
  var emailId = this.request.body.emailId;
  var blastId = this.request.body.blastId;
  if(emailId) {
    App.collections.EmailJobs.update({_id: emailId}, {$set:{status:'delivered'}}, {bypassCollection2:true});

    //update the blast job
    App.collections.EmailBlasts.update({_id: blastId }, {$inc:{delivered:1}}, {bypassCollection2:true});
  }

  this.response.setHeader('Content-Type', 'application/json');
  this.response.statusCode = 200;
  this.response.end(JSON.stringify({success: true, reason: ''}));
});

Router.route('/api/mail/declined',{where:'server'}).post(function() {
  console.log("Mail declined", this.request);

  var emailId = this.request.body.emailId;
  if(emailId) {
    App.collections.EmailJobs.update({_id: emailId}, {$set:{status:'not-delivered'}}, {bypassCollection2:true});
  }

  this.response.setHeader('Content-Type', 'application/json');
  this.response.statusCode = 200;
  this.response.end(JSON.stringify({success: true, reason: ''}));
});
