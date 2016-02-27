Template.DmInput.helpers({
  isPasswordType: function () {
    return Template.instance().state.get('isPasswordType');
  },
  isPasswordTypeVisible: function () {
    return Template.instance().state.get('isPasswordTypeVisible');
  },
  hasCharCount: function () {
    return (Template.instance().state.get('remainingChars') !== false);
  },
  remainingChars: function () {
    return Template.instance().state.get('remainingChars');
  },
  hasContent: function () {
    var template = Template.instance();
    return !_.contains(['', undefined], AutoForm.getFieldValue(template.data.name));
  },
  showValidationSymbol: function () {
    var template = Template.instance();
    return _.contains(['text', 'tel', 'password', 'email'], template.data.type);
  },
  id: function() {
    return Template.instance().id;
  }
});

Template.DmInput.onCreated(function () {
  var template = Template.instance();
  template.state = new ReactiveDict();

  template.state.setDefault('isPasswordType', false);
  template.state.setDefault('isPasswordTypeVisible', false);
  template.state.setDefault('remainingChars', false);
  template.id = new Mongo.ObjectID().toHexString();
});

Template.DmInput.onRendered(function () {
  var template = Template.instance();
  var fieldSchema = AutoForm.getSchemaForField(template.data.name);
  var input = template.$('input');
  var fieldValue = input.val() || "";

  template.state.set('fieldSchema', fieldSchema);

  if (template.data.type === 'password') {
    template.state.set('isPasswordType', true);
  }

  if(template.data.autofocus){
    input.focus();
  }
});

Template.DmInput.events({
  'click .toggle-password-visibility': function (event) {
    var template = Template.instance(),
      input = $(event.target).siblings('input');

    template.state.set('isPasswordTypeVisible', !template.state.get('isPasswordTypeVisible'));
    input.attr('type', template.state.get('isPasswordTypeVisible') ? 'text' : 'password');
  },
  'keyup input': function () {
    var template = Template.instance(),
      input = $(event.target),
      inputValue = input.val();

  }
});
