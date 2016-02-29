App.Schemas.MailBlastForm = new SimpleSchema({
    from: App.Schemas.Mixins.email,
    subject: { type:String, min: 1},
    content: {
        type: String,
        min: 1
    },
    emails: { type:String, min: 1 }
});