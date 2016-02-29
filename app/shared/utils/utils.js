App.Utils = {
  uniqueId: function() {
    return new Mongo.ObjectID().toHexString();
  }
};