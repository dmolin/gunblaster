App.Schemas.MailBlastForm = new SimpleSchema({
    subject: { type:String, min: 1},
    content: {
        type: String,
        min: 1
    },
    emails: { type:String, min: 1 }
});