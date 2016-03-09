# Meteor 'Gunblaster'
Super simple MeteorJS App built for a friend, for sending blast of emails to a list of recipients through the MailGun API.

The entire WebApp, from inception to completion, has been implemented in 4 days of part-time work.

![ScreenShot](/assets/gunblaster.jpg?raw=true)

## Technology stack
- MeteorJS
- MongoDB
- MailGun API

## Featuring
Currently
- Authentication-based app
- Realtime reactive interface
- Async cron jobs for email queue processing, suitable for being externalised into a micro-service.
- Handling huge email lists, with email throttling (max 10 emails/secs to avoid flooding the mail server)
- Notification of email deliveries/bounces/rejections

Planned
- User Registration page and email validation flow
- Search/filtering in the job list page
- Interruptible jobs
- Tracking of opened/unread emails

## Screenshots

Login

![Login page](/assets/gunblaster-login.jpg?raw=true)

Job list (a.k.a. History page)

![History page](/assets/gunblaster-jobs.png?raw=true)

Queued job

![History page](/assets/gunblaster-job-queued.png?raw=true)

In-progress job

![History page](/assets/gunblaster-job-in-progress.png?raw=true)

Job completed (all mails delivered)

![History page](/assets/gunblaster-job-completed-all-done.png?raw=true)

Job completed (but not all emails have been delivered by MailGun)

![History page](/assets/gunblaster-job-completed-not-all-delivered.png?raw=true)

Job Error (no mails have been sent)

![History page](/assets/gunblaster-job-not-performed.png?raw=true)

Job Details page

![Job Detail page](/assets/gunblaster-job-details.png?raw=true)

New Mail Blast (Compose page)

![New Mail Blast](/assets/gunblaster-compose.png?raw=true)

New Mail Blast submitted in the queue

![New Mail Blast](/assets/gunblaster-compose-done.png?raw=true)

## How do I run it?

- Install MeteorJS v1.2.1
- you need a MailGun account (a Free tier will do) and your API key
- before running your server export the MAIL_URL environment variable:
```
MAIL_URL=smtp://<your domain SMTP login in mailgun>:<your SMTP domain password>@smtp.mailgun.org:587
```
(see https://help.mailgun.com/hc/en-us/articles/203380100-Where-can-I-find-my-API-key-and-SMTP-credentials-)
- run the GunBlaster server from the **_app/_** folder
```
cd app
meteor run --settings ../config/development/settings.json
```
- you will need to manually create your user (no registration page yet). 
    - launch the Meteor console (`cd app; meteor shell`)
    - manually insert a record for your user:
        `Accounts.createUser({username:'...', password:'...', email: '...'})`
    - verify your email (only verified emails can send email blasts)
        `Meteor.users.update({username:'<your username>'}, {$set:{'emails.0.verified':true}})`
- access the app from `http://localhost:3000`

## Setting up MailGun
MailGun has to be correctly configured to send callbacks to your Gunblaster server in order for the delivery/bounce notifications to be received.
To do so, go to the MailGun "WebHook" page and setup your server address API endpoints:

![Mailgun webhooks](/assets/gunblaster-hooks.png?raw=true)

If your server is not publicly visible on the Internet, you can still test the hooks using a Tunneling service like https://ngrok.com/ 

Setting up `ngrok` is ridiculously easy. Just download it and then run it, pointing it to your local server:

```
ngrok http 3000
```
This will give you back a public ngrok address (like http://xxxxxx.ngrok.io) that you can use in the MailGun hooks page.
Any request to that address will be routed automatically through the tunnel to your localhost:3000 port.
