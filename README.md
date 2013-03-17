# jake-requirejs

The `jake-requirejs` package contains optimizer functions for [Jake](https://github.com/mde/jake) using [RequireJS](http://requirejs.org/).

## Usage

Simply add the following code near the top of your `Jakefile`:

    var jakeRequireJs = require('jake-requirejs');

### Default Optimizer

The following example calls `r.js` using the `example.build.js` configuration without minification.

    jakeRequireJs.optimize('example.build.js', {'optimize':'none'}, function(){console.log('done');});

### Worker Optimizer

The following example calls `r.js` using the `worker.build.js` configuration and removes any `importScripts` for `require.js`, `require.min.js` and `require-worker.js` from the output file.

    jakeRequireJs.optimizeWorker('worker.build.js', {});

### License

Licensed under the Apache License, Version 2.0
(<http://www.apache.org/licenses/LICENSE-2.0>)
