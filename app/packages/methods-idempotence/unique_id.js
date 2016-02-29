if(typeof MethodsHelper == 'undefined'){
  MethodsHelper = {}
}

MethodsHelper.uniqueReferenceIdParam = function(){
  var clientReferenceId = new Mongo.ObjectID().toHexString();

  clientReferenceId += "-" + Math.floor(Date.now() / 1000).toString();

  if(Meteor.userId()){
    clientReferenceId += "-" + Meteor.userId()
  }

  return {clientReferenceId: clientReferenceId};
}
