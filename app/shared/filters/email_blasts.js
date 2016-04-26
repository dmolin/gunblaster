App.queryFilters.emailBlasts = function(filter) {
  var outcome = _.extend({}, App.queryFilters.emailBlasts.initialValue || {});
  var amounts;
  if(!filter) return outcome;

  if(filter.createdAt && filter.createdAt !== '-1' && filter.createdAt.length) {
    amounts = filter.createdAt.match(/(\d+)(\w+)/);
    if(amounts.length < 3) return outcome;

    amounts = _.map(amounts, function(it) { return (it === 'm' ? 'M' : it); });
    
    outcome.createdAt = {
      $gt: moment(0, "HH").subtract(parseInt(amounts[1],10), amounts[2]).toDate()
    };
  }

  return outcome;
};

