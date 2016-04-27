App.Schemas.MailBlastForm = new SimpleSchema({
    subject: { type:String, min: 1},
    text: { type:String, min: 1},
    content: {
        type: String,
        min: 1,
        optional:true,
        autoform: {
          type: 'froalaEditor',
          froalaOptions: {
            customDropdowns:{}
          }
        }
    },
    emails: { type:String, min: 1 }
});