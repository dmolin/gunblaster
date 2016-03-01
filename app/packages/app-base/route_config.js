App.Router = {
  plugins:{},
  stack: [],
  currentRoute: new ReactiveVar()
};

//function ensureNoAuth () {
//  if (Meteor.userId()) {
//    Router.go('new');
//  } else {
//    this.next();
//  }
//}

