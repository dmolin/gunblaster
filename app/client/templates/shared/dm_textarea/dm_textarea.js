Template.DmTextarea.helpers({
  hasContent: function () {
    var template = Template.instance();
    return !_.contains(['', undefined], AutoForm.getFieldValue(template.data.name));
  },
  id: function() {
    return Template.instance().id;
  },
  fullClass: function() {
    return "template-DmTextarea " + (Template.instance().data.class||"");
  }
});

Template.DmTextarea.onCreated(function () {
  var template = Template.instance();
  template.state = new ReactiveDict();

  template.id = new Mongo.ObjectID().toHexString();
});

Template.DmTextarea.onRendered(function () {
  var template = Template.instance();
  var fieldSchema = AutoForm.getSchemaForField(template.data.name);
  var input = template.$('input');
  var fieldValue = input.val() || "";

  template.state.set('fieldSchema', fieldSchema);

  if(template.data.autofocus){
    input.focus();
  }
});

Template.DmTextarea.events({
  'keyup input': function () {
    var template = Template.instance(),
      input = $(event.target),
      inputValue = input.val();
  }
});
