if(typeof MethodsHelper == 'undefined'){
  MethodsHelper = {}
}

MethodCallAttemptSchema = new SimpleSchema({
  methodCallId: {
    type: String
  },
  result: {
    type: Object,
    blackbox: true,
    optional: true
  },
  finished: {
    type: Boolean,
    defaultValue: false
  }
});

MethodCallAttempts = new Mongo.Collection('method_call_attempts');
MethodCallAttempts.attachSchema(MethodCallAttemptSchema);
MethodCallAttempts.attachBehaviour(['timestampable']);

MethodsHelper.makeIdempotent = function(originalMethod){
  return function(mayBeClientReferenceIdOject){
    check(mayBeClientReferenceIdOject, Match.Any);
    check(arguments, Match.Any);

    if(mayBeClientReferenceIdOject.clientReferenceId){
      var clientReferenceId = mayBeClientReferenceIdOject.clientReferenceId;
      var args = Array.prototype.slice.apply(arguments);
      args.splice(0, 1);
      var methodKey = clientReferenceId;

      var existingMethodCallAttempt = MethodCallAttempts.findOne({methodCallId: methodKey});
      if(existingMethodCallAttempt){
        if(existingMethodCallAttempt.finished){
          return existingMethodCallAttempt.result.value;
        }else{
          return Meteor.wrapAsync(function(callback){
            Meteor.setTimeout(function(){
              existingMethodCallAttempt = MethodCallAttempts.findOne({methodCallId: methodKey});
              if(existingMethodCallAttempt.finished){
                callback(null, existingMethodCallAttempt.result.value);
              }else{
                callback(new Meteor.Error("Error when calling server method. No result found after 3000ms"), existingMethodCallAttempt.result);
              }
            }, 3000);
          })();
        }
      }else{
        var methodCallAttemptId = MethodCallAttempts.insert({methodCallId: methodKey});
        var result = originalMethod.apply(this, args);
        MethodCallAttempts.update(methodCallAttemptId, {$set: {result: {value: result}, finished: true}});
        return result;
      }
    }else{
      return originalMethod.apply(this, arguments);
    }
  }
};
