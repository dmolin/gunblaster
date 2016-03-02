var bgs = new ReactiveDict();
var bgUrl1 = new ReactiveVar();
var bgUrl2 = new ReactiveVar();
var bgUrl1Class = new ReactiveVar();
var bgUrl2Class = new ReactiveVar();

AutoForm.hooks({
  LoginForm: {
    onSubmit: function(validDoc, updateDoc, currentDoc) {
      console.log("on submit");
      var form = this;

      Meteor.loginWithPassword(validDoc.username.toLowerCase(), validDoc.password, function(error) {
        if(error) {
          form.done(error);
        } else {
          Meteor.logoutOtherClients();
          form.done();
          Router.go('blaster/new');
        }
      });
      return false;
    },
    onSuccess: function() {
      console.log("on success");
      return false;
    },

    onError: function(operation, error, template) {
      var form = this;
      var formErrors;
      console.log("on error", error);
      if(!error.invalidKeys) {
        if (error.reason === 'User not found' || error.reason === 'Incorrect password') {
          form.validationContext.addInvalidKeys([{
            name: 'password',
            type: 'notFoundOrIncorrect'
          }]);
        } else {
          //TODO: fill a proper validation message in the form.validationContext
          //it's in: error.message
          alert(error.message);
        }

      }
      return false;
    }
  }
});

Template.login.onRendered(function() {
  /*
  function setBgUrl() {
    var categories = ["city", "technics", "transport"];
    var bg = bgUrl1Class.get() === "fadein" ? bgUrl2 : bgUrl1;
    var catIdx = _getRandomInt(0, categories.length-1);
    bg.set("http://lorempixel.com/g/1920/1080/" + categories[catIdx] + "/?t=" + Date.now());
    if(bgUrl1Class.get() === "fadein") {
      bgUrl1Class.set('fadeout');
      bgUrl2Class.set('fadein');
    } else {
      bgUrl1Class.set('fadein');
      bgUrl2Class.set('fadeout');
    }
  }
  */
  bgs.set('bgUrl1', _pickImage());
  bgs.set('bgUrl1Class', 'fadein');
  bgs.set('bgUrl2', _pickImage());
  bgs.set('bgUrl2Class', 'fadeout');
  bgs.set('current', 1);

  Meteor.setInterval(switchBg, 10000);

  function switchBg() {
    var current = bgs.get('current');
    var active,
        inactive = current;
    current = current === 1 ? 2 : 1;
    active = current;

    bgs.set('bgUrl' + active + 'Class', 'fadein');
    bgs.set('bgUrl' + inactive + 'Class', 'fadeout');
    bgs.set('current', current);

    //load a new image for the inactive one in the background
    Meteor.setTimeout(function(){
      bgs.set('bgUrl' + inactive, _pickImage());
    }, 2500);
  }
});

Template.login.helpers({
  backgroundUrl1: function() {
    //return bgUrl1.get();
    return bgs.get('bgUrl1');
  },
  backgroundUrl2: function() {
    //return bgUrl2.get();
    return bgs.get('bgUrl2');
  },
  background1Class: function() {
    //return bgUrl1Class.get();
    return bgs.get('bgUrl1Class');
  },
  background2Class: function() {
    //return bgUrl2Class.get();
    return bgs.get('bgUrl2Class');
  }
});

function _pickImage() {
  var categories = ["city", "technics", "transport"];
  var catIdx = _getRandomInt(0, categories.length-1);
  return "http://lorempixel.com/g/1920/1080/" + categories[catIdx] + "/?t=" + Date.now();
}
function _getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}