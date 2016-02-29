Package.describe({
  name: 'methods-idempotence',
  version: '0.1.0',
  // Brief, one-line summary of the package.
  summary: 'Helper to wrap methods requiring idempotence'
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.1');

  var serverDependencies = ['aldeed:collection2', 'zimme:collection-timestampable'];

  api.use(serverDependencies, 'server');
  api.imply(serverDependencies, 'server');

  api.addFiles('methods-helpers.js', 'server');
  api.export('MethodCallAttempts', 'server');

  api.addFiles('unique_id.js', 'client');

  api.export('MethodsHelper');
});
