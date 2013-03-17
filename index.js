/*
* jake-requirejs
* Copyright 2013 Thomas Bergwinkl
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*/

var _separateOptions = function(options) {
	var availabeExecOptions = new Array("stdout", "stderr", "breakOnError");
	var rJsParameters = "";
	var execOptions = {};

	for(option in options) {
		if(availabeExecOptions.indexOf(option) > 0)
			execOptions[option] = options[option];
		else
			rJsParameters += " " + option + "=" + options[option];
	}

	return {rJsParameters: rJsParameters, execOptions: execOptions};
};

exports.optimize = function(buildJs, options, callback) {
	var separatedOptions = _separateOptions(options);

	jake.exec("node /usr/bin/r.js -o \"" + buildJs + "\"" + separatedOptions.rJsParameters, separatedOptions.execOptions, callback);
};

exports.optimizeWorker = function(buildJs, options, callback) {
	exports.optimize(buildJs, options, function() {
		var separatedOptions = _separateOptions(options);
		var buildJsContent = eval("(" + require("fs").readFileSync(buildJs) + ")");

		jake.exec("sed -i -r 's/importScripts\\(\"[a-zA-Z0-9\\/-]*\\/require(|\\.min|-worker).js\"\\)[\\,\\;]//g' \"" + buildJsContent.out + "\"", separatedOptions.execOptions, callback);
	});
};
