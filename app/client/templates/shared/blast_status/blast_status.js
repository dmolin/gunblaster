Template.BlastStatus.helpers({
  icon:function() {
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
  }
});