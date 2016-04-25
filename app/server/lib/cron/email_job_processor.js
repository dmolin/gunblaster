/**
 */
SyncedCron.add({
  name: 'Email blast processor',
  schedule: function (parser) {
    // parser is a later.parse object
    return parser.text('every 10 seconds');
  },
  job: function() {
    var age = moment().subtract(2, 'seconds').toDate();
    var blasts = App.collections.EmailBlasts.find({
      status:'queued',
      createdAt: {$lte: age}
    });

    if(blasts.count() === 0) {
      return;
    }

    console.log('Email Blasts found: ', blasts.count());

    blasts.forEach(function processBlast(blast) {
      //change the status of the blast to 'in-progress'
      App.collections.EmailBlasts.update({_id:blast._id}, {$set:{ status: 'in-progress'}}, {bypassCollection2:true});

      //collect email addresses and process them, one by one
      var sent = 0;
      var batchUpdate = 0;
      var result = 'completed';
      var reason = '';
      var jobs = App.collections.EmailJobs.find({blastId: blast._id, status:'queued'});

      jobs.forEach(function(emailJob) {
        var result = sendEmailForBlast(blast, emailJob);
        if(result.success) {
          sent += 1;
        }

        //every 10 emails sent let's update the blast
        if(sent > (batchUpdate + 9)) {
          App.collections.EmailBlasts.update({_id:blast._id}, {$set:{ sent: sent }}, {bypassCollection2:true});
          batchUpdate = sent;
        }
      });

      //mark blast as completed or errored
      if(sent < jobs.count()) {
        result = 'with-errors';
        reason = 'only ' + sent + ' emails where sent out of ' + jobs.count();
      }
      App.collections.EmailBlasts.update({_id:blast._id},
        {$set:{
          sent: sent,
          status: result,
          reason: reason
        }}, {bypassCollection2:true});

    });
  }
});

SyncedCron.start();

function sendEmailForBlast(blast, emailJob) {
  var outcome = { success:true };
  var emailOutcome = 'sent';

  //console.log("send email to " + emailJob.to);
  var headers = {
    blastId: blast._id,
    emailId: emailJob._id
  };

  try {
    Email.send({
      to: emailJob.to,
      from: blast.from,
      subject: blast.subject,
      //text: blast.content,
      html: blast.content,
      replyTo: blast.from,
      headers: {'X-Mailgun-Variables': JSON.stringify(headers)}
    });
    emailOutcome = 'sent';
  } catch(error) {
    outcome.success = false;
    outcome.reason = error;
    emailOutcome = 'error';
  } finally {
    App.collections.EmailJobs.update({_id:emailJob._id}, {$set:{status:emailOutcome}}, {bypassCollection2:true});
    Meteor.sleep(100);
  }

  return outcome;
}