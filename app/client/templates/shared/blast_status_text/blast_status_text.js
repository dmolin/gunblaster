Template.BlastStatusText.helpers({
  status: function() {
    var blast = this.blast;
    switch(blast.status) {
      case 'created':
        return "This blast has been created and ready to be started by the user";
        break;
      case 'queued':
        return "This blast is waiting for being processed";
        break;
      case 'in-progress':
        return "This blast is in progress";
        break;
      case 'completed':
        var outcome = "This blast has completed. ";
        outcome += ((blast.valid === blast.delivered) ?
                  "All emails sent have been delivered" :
                  "Not all emails sent have yet reached their recipients.");
        return outcome;
        break;
      case 'with-errors':
        return "No emails were sent for this blast"
        break;
    }
  }
});
