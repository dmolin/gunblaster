var Busboy = Meteor.npmRequire("busboy"),
  fs = Npm.require("fs"),
  os = Npm.require("os"),
  path = Npm.require("path");

Router.onBeforeAction(function (req, res, next) {
  var filenames = []; // Store filenames and then pass them to request.
  _.extend(req, {postData: {}});

  if (req.method === "POST") {
    var busboy = new Busboy({ headers: req.headers });
    busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
      var saveTo = path.join(os.tmpDir(), filename);
      file.pipe(fs.createWriteStream(saveTo));
      filenames.push(saveTo);
    });
    busboy.on("field", function(fieldname, value) {
      req.postData[fieldname] = value;
    });
    busboy.on("finish", function () {
      // Pass filenames to request
      req.filenames = filenames;
      next();
    });
    // Pass request to busboy
    req.pipe(busboy);
  } else {
    this.next();
  }
});

Router.route('/api/mail/delivered',{where:'server'}).post(function() {
  console.log("Mail delivered", this.request.body);

  //update EmailJob
  var emailId = this.request.body.emailId;
  var blastId = this.request.body.blastId;
  if(emailId) {
    App.collections.EmailJobs.update({_id: emailId}, {$set:{status:'delivered'}}, {bypassCollection2:true});

    //update the blast job
    App.collections.EmailBlasts.update({_id: blastId }, {$inc:{delivered:1}}, {bypassCollection2:true});
  }

  this.response.setHeader('Content-Type', 'application/json');
  this.response.statusCode = 200;
  this.response.end(JSON.stringify({success: true, reason: ''}));
});

Router.route('/api/mail/declined',{where:'server'}).post(function() {
  console.log("Mail declined", this.request.postData);

  var emailId = this.request.postData.emailId;
  if(emailId) {
    App.collections.EmailJobs.update({_id: emailId}, {$set:{status:'not-delivered'}}, {bypassCollection2:true});
  }

  this.response.setHeader('Content-Type', 'application/json');
  this.response.statusCode = 200;
  this.response.end(JSON.stringify({success: true, reason: ''}));
});
