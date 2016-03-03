# Gunblaster
Super simple client App for sending blast of emails to a list of recipients through the MailGun API.

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
