Template.BlastStatus.helpers({
  icon:function() {
    var blast = this.blast;
    if(!blast) return;

    switch(blast.status) {
      case 'created':
        return 'play_arrow'
        break;
      case 'queued':
        return 'alarm_on'
        break;
      case 'in-progress':
        return "loop";
        break;
      case 'completed':
        return ((blast.valid === blast.delivered) ? "done_all" : "done");
        break;
      case 'with-errors':
        return "error_outline";
        break;
    }
  }
});
