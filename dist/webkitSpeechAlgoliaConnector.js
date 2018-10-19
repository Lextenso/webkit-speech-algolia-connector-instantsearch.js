(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["webkitSpeechAlgoliaConnector"] = factory();
	else
		root["webkitSpeechAlgoliaConnector"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/hogan.js/lib/compiler.js":
/*!***********************************************!*\
  !*** ./node_modules/hogan.js/lib/compiler.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n *  Copyright 2011 Twitter, Inc.\n *  Licensed under the Apache License, Version 2.0 (the \"License\");\n *  you may not use this file except in compliance with the License.\n *  You may obtain a copy of the License at\n *\n *  http://www.apache.org/licenses/LICENSE-2.0\n *\n *  Unless required by applicable law or agreed to in writing, software\n *  distributed under the License is distributed on an \"AS IS\" BASIS,\n *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *  See the License for the specific language governing permissions and\n *  limitations under the License.\n */\n\n(function (Hogan) {\n  // Setup regex  assignments\n  // remove whitespace according to Mustache spec\n  var rIsWhitespace = /\\S/,\n      rQuot = /\\\"/g,\n      rNewline =  /\\n/g,\n      rCr = /\\r/g,\n      rSlash = /\\\\/g,\n      rLineSep = /\\u2028/,\n      rParagraphSep = /\\u2029/;\n\n  Hogan.tags = {\n    '#': 1, '^': 2, '<': 3, '$': 4,\n    '/': 5, '!': 6, '>': 7, '=': 8, '_v': 9,\n    '{': 10, '&': 11, '_t': 12\n  };\n\n  Hogan.scan = function scan(text, delimiters) {\n    var len = text.length,\n        IN_TEXT = 0,\n        IN_TAG_TYPE = 1,\n        IN_TAG = 2,\n        state = IN_TEXT,\n        tagType = null,\n        tag = null,\n        buf = '',\n        tokens = [],\n        seenTag = false,\n        i = 0,\n        lineStart = 0,\n        otag = '{{',\n        ctag = '}}';\n\n    function addBuf() {\n      if (buf.length > 0) {\n        tokens.push({tag: '_t', text: new String(buf)});\n        buf = '';\n      }\n    }\n\n    function lineIsWhitespace() {\n      var isAllWhitespace = true;\n      for (var j = lineStart; j < tokens.length; j++) {\n        isAllWhitespace =\n          (Hogan.tags[tokens[j].tag] < Hogan.tags['_v']) ||\n          (tokens[j].tag == '_t' && tokens[j].text.match(rIsWhitespace) === null);\n        if (!isAllWhitespace) {\n          return false;\n        }\n      }\n\n      return isAllWhitespace;\n    }\n\n    function filterLine(haveSeenTag, noNewLine) {\n      addBuf();\n\n      if (haveSeenTag && lineIsWhitespace()) {\n        for (var j = lineStart, next; j < tokens.length; j++) {\n          if (tokens[j].text) {\n            if ((next = tokens[j+1]) && next.tag == '>') {\n              // set indent to token value\n              next.indent = tokens[j].text.toString()\n            }\n            tokens.splice(j, 1);\n          }\n        }\n      } else if (!noNewLine) {\n        tokens.push({tag:'\\n'});\n      }\n\n      seenTag = false;\n      lineStart = tokens.length;\n    }\n\n    function changeDelimiters(text, index) {\n      var close = '=' + ctag,\n          closeIndex = text.indexOf(close, index),\n          delimiters = trim(\n            text.substring(text.indexOf('=', index) + 1, closeIndex)\n          ).split(' ');\n\n      otag = delimiters[0];\n      ctag = delimiters[delimiters.length - 1];\n\n      return closeIndex + close.length - 1;\n    }\n\n    if (delimiters) {\n      delimiters = delimiters.split(' ');\n      otag = delimiters[0];\n      ctag = delimiters[1];\n    }\n\n    for (i = 0; i < len; i++) {\n      if (state == IN_TEXT) {\n        if (tagChange(otag, text, i)) {\n          --i;\n          addBuf();\n          state = IN_TAG_TYPE;\n        } else {\n          if (text.charAt(i) == '\\n') {\n            filterLine(seenTag);\n          } else {\n            buf += text.charAt(i);\n          }\n        }\n      } else if (state == IN_TAG_TYPE) {\n        i += otag.length - 1;\n        tag = Hogan.tags[text.charAt(i + 1)];\n        tagType = tag ? text.charAt(i + 1) : '_v';\n        if (tagType == '=') {\n          i = changeDelimiters(text, i);\n          state = IN_TEXT;\n        } else {\n          if (tag) {\n            i++;\n          }\n          state = IN_TAG;\n        }\n        seenTag = i;\n      } else {\n        if (tagChange(ctag, text, i)) {\n          tokens.push({tag: tagType, n: trim(buf), otag: otag, ctag: ctag,\n                       i: (tagType == '/') ? seenTag - otag.length : i + ctag.length});\n          buf = '';\n          i += ctag.length - 1;\n          state = IN_TEXT;\n          if (tagType == '{') {\n            if (ctag == '}}') {\n              i++;\n            } else {\n              cleanTripleStache(tokens[tokens.length - 1]);\n            }\n          }\n        } else {\n          buf += text.charAt(i);\n        }\n      }\n    }\n\n    filterLine(seenTag, true);\n\n    return tokens;\n  }\n\n  function cleanTripleStache(token) {\n    if (token.n.substr(token.n.length - 1) === '}') {\n      token.n = token.n.substring(0, token.n.length - 1);\n    }\n  }\n\n  function trim(s) {\n    if (s.trim) {\n      return s.trim();\n    }\n\n    return s.replace(/^\\s*|\\s*$/g, '');\n  }\n\n  function tagChange(tag, text, index) {\n    if (text.charAt(index) != tag.charAt(0)) {\n      return false;\n    }\n\n    for (var i = 1, l = tag.length; i < l; i++) {\n      if (text.charAt(index + i) != tag.charAt(i)) {\n        return false;\n      }\n    }\n\n    return true;\n  }\n\n  // the tags allowed inside super templates\n  var allowedInSuper = {'_t': true, '\\n': true, '$': true, '/': true};\n\n  function buildTree(tokens, kind, stack, customTags) {\n    var instructions = [],\n        opener = null,\n        tail = null,\n        token = null;\n\n    tail = stack[stack.length - 1];\n\n    while (tokens.length > 0) {\n      token = tokens.shift();\n\n      if (tail && tail.tag == '<' && !(token.tag in allowedInSuper)) {\n        throw new Error('Illegal content in < super tag.');\n      }\n\n      if (Hogan.tags[token.tag] <= Hogan.tags['$'] || isOpener(token, customTags)) {\n        stack.push(token);\n        token.nodes = buildTree(tokens, token.tag, stack, customTags);\n      } else if (token.tag == '/') {\n        if (stack.length === 0) {\n          throw new Error('Closing tag without opener: /' + token.n);\n        }\n        opener = stack.pop();\n        if (token.n != opener.n && !isCloser(token.n, opener.n, customTags)) {\n          throw new Error('Nesting error: ' + opener.n + ' vs. ' + token.n);\n        }\n        opener.end = token.i;\n        return instructions;\n      } else if (token.tag == '\\n') {\n        token.last = (tokens.length == 0) || (tokens[0].tag == '\\n');\n      }\n\n      instructions.push(token);\n    }\n\n    if (stack.length > 0) {\n      throw new Error('missing closing tag: ' + stack.pop().n);\n    }\n\n    return instructions;\n  }\n\n  function isOpener(token, tags) {\n    for (var i = 0, l = tags.length; i < l; i++) {\n      if (tags[i].o == token.n) {\n        token.tag = '#';\n        return true;\n      }\n    }\n  }\n\n  function isCloser(close, open, tags) {\n    for (var i = 0, l = tags.length; i < l; i++) {\n      if (tags[i].c == close && tags[i].o == open) {\n        return true;\n      }\n    }\n  }\n\n  function stringifySubstitutions(obj) {\n    var items = [];\n    for (var key in obj) {\n      items.push('\"' + esc(key) + '\": function(c,p,t,i) {' + obj[key] + '}');\n    }\n    return \"{ \" + items.join(\",\") + \" }\";\n  }\n\n  function stringifyPartials(codeObj) {\n    var partials = [];\n    for (var key in codeObj.partials) {\n      partials.push('\"' + esc(key) + '\":{name:\"' + esc(codeObj.partials[key].name) + '\", ' + stringifyPartials(codeObj.partials[key]) + \"}\");\n    }\n    return \"partials: {\" + partials.join(\",\") + \"}, subs: \" + stringifySubstitutions(codeObj.subs);\n  }\n\n  Hogan.stringify = function(codeObj, text, options) {\n    return \"{code: function (c,p,i) { \" + Hogan.wrapMain(codeObj.code) + \" },\" + stringifyPartials(codeObj) +  \"}\";\n  }\n\n  var serialNo = 0;\n  Hogan.generate = function(tree, text, options) {\n    serialNo = 0;\n    var context = { code: '', subs: {}, partials: {} };\n    Hogan.walk(tree, context);\n\n    if (options.asString) {\n      return this.stringify(context, text, options);\n    }\n\n    return this.makeTemplate(context, text, options);\n  }\n\n  Hogan.wrapMain = function(code) {\n    return 'var t=this;t.b(i=i||\"\");' + code + 'return t.fl();';\n  }\n\n  Hogan.template = Hogan.Template;\n\n  Hogan.makeTemplate = function(codeObj, text, options) {\n    var template = this.makePartials(codeObj);\n    template.code = new Function('c', 'p', 'i', this.wrapMain(codeObj.code));\n    return new this.template(template, text, this, options);\n  }\n\n  Hogan.makePartials = function(codeObj) {\n    var key, template = {subs: {}, partials: codeObj.partials, name: codeObj.name};\n    for (key in template.partials) {\n      template.partials[key] = this.makePartials(template.partials[key]);\n    }\n    for (key in codeObj.subs) {\n      template.subs[key] = new Function('c', 'p', 't', 'i', codeObj.subs[key]);\n    }\n    return template;\n  }\n\n  function esc(s) {\n    return s.replace(rSlash, '\\\\\\\\')\n            .replace(rQuot, '\\\\\\\"')\n            .replace(rNewline, '\\\\n')\n            .replace(rCr, '\\\\r')\n            .replace(rLineSep, '\\\\u2028')\n            .replace(rParagraphSep, '\\\\u2029');\n  }\n\n  function chooseMethod(s) {\n    return (~s.indexOf('.')) ? 'd' : 'f';\n  }\n\n  function createPartial(node, context) {\n    var prefix = \"<\" + (context.prefix || \"\");\n    var sym = prefix + node.n + serialNo++;\n    context.partials[sym] = {name: node.n, partials: {}};\n    context.code += 't.b(t.rp(\"' +  esc(sym) + '\",c,p,\"' + (node.indent || '') + '\"));';\n    return sym;\n  }\n\n  Hogan.codegen = {\n    '#': function(node, context) {\n      context.code += 'if(t.s(t.' + chooseMethod(node.n) + '(\"' + esc(node.n) + '\",c,p,1),' +\n                      'c,p,0,' + node.i + ',' + node.end + ',\"' + node.otag + \" \" + node.ctag + '\")){' +\n                      't.rs(c,p,' + 'function(c,p,t){';\n      Hogan.walk(node.nodes, context);\n      context.code += '});c.pop();}';\n    },\n\n    '^': function(node, context) {\n      context.code += 'if(!t.s(t.' + chooseMethod(node.n) + '(\"' + esc(node.n) + '\",c,p,1),c,p,1,0,0,\"\")){';\n      Hogan.walk(node.nodes, context);\n      context.code += '};';\n    },\n\n    '>': createPartial,\n    '<': function(node, context) {\n      var ctx = {partials: {}, code: '', subs: {}, inPartial: true};\n      Hogan.walk(node.nodes, ctx);\n      var template = context.partials[createPartial(node, context)];\n      template.subs = ctx.subs;\n      template.partials = ctx.partials;\n    },\n\n    '$': function(node, context) {\n      var ctx = {subs: {}, code: '', partials: context.partials, prefix: node.n};\n      Hogan.walk(node.nodes, ctx);\n      context.subs[node.n] = ctx.code;\n      if (!context.inPartial) {\n        context.code += 't.sub(\"' + esc(node.n) + '\",c,p,i);';\n      }\n    },\n\n    '\\n': function(node, context) {\n      context.code += write('\"\\\\n\"' + (node.last ? '' : ' + i'));\n    },\n\n    '_v': function(node, context) {\n      context.code += 't.b(t.v(t.' + chooseMethod(node.n) + '(\"' + esc(node.n) + '\",c,p,0)));';\n    },\n\n    '_t': function(node, context) {\n      context.code += write('\"' + esc(node.text) + '\"');\n    },\n\n    '{': tripleStache,\n\n    '&': tripleStache\n  }\n\n  function tripleStache(node, context) {\n    context.code += 't.b(t.t(t.' + chooseMethod(node.n) + '(\"' + esc(node.n) + '\",c,p,0)));';\n  }\n\n  function write(s) {\n    return 't.b(' + s + ');';\n  }\n\n  Hogan.walk = function(nodelist, context) {\n    var func;\n    for (var i = 0, l = nodelist.length; i < l; i++) {\n      func = Hogan.codegen[nodelist[i].tag];\n      func && func(nodelist[i], context);\n    }\n    return context;\n  }\n\n  Hogan.parse = function(tokens, text, options) {\n    options = options || {};\n    return buildTree(tokens, '', [], options.sectionTags || []);\n  }\n\n  Hogan.cache = {};\n\n  Hogan.cacheKey = function(text, options) {\n    return [text, !!options.asString, !!options.disableLambda, options.delimiters, !!options.modelGet].join('||');\n  }\n\n  Hogan.compile = function(text, options) {\n    options = options || {};\n    var key = Hogan.cacheKey(text, options);\n    var template = this.cache[key];\n\n    if (template) {\n      var partials = template.partials;\n      for (var name in partials) {\n        delete partials[name].instance;\n      }\n      return template;\n    }\n\n    template = this.generate(this.parse(this.scan(text, options.delimiters), text, options), text, options);\n    return this.cache[key] = template;\n  }\n})( true ? exports : undefined);\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/hogan.js/lib/compiler.js?");

/***/ }),

/***/ "./node_modules/hogan.js/lib/hogan.js":
/*!********************************************!*\
  !*** ./node_modules/hogan.js/lib/hogan.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n *  Copyright 2011 Twitter, Inc.\n *  Licensed under the Apache License, Version 2.0 (the \"License\");\n *  you may not use this file except in compliance with the License.\n *  You may obtain a copy of the License at\n *\n *  http://www.apache.org/licenses/LICENSE-2.0\n *\n *  Unless required by applicable law or agreed to in writing, software\n *  distributed under the License is distributed on an \"AS IS\" BASIS,\n *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *  See the License for the specific language governing permissions and\n *  limitations under the License.\n */\n\n// This file is for use with Node.js. See dist/ for browser files.\n\nvar Hogan = __webpack_require__(/*! ./compiler */ \"./node_modules/hogan.js/lib/compiler.js\");\nHogan.Template = __webpack_require__(/*! ./template */ \"./node_modules/hogan.js/lib/template.js\").Template;\nHogan.template = Hogan.Template;\nmodule.exports = Hogan;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/hogan.js/lib/hogan.js?");

/***/ }),

/***/ "./node_modules/hogan.js/lib/template.js":
/*!***********************************************!*\
  !*** ./node_modules/hogan.js/lib/template.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n *  Copyright 2011 Twitter, Inc.\n *  Licensed under the Apache License, Version 2.0 (the \"License\");\n *  you may not use this file except in compliance with the License.\n *  You may obtain a copy of the License at\n *\n *  http://www.apache.org/licenses/LICENSE-2.0\n *\n *  Unless required by applicable law or agreed to in writing, software\n *  distributed under the License is distributed on an \"AS IS\" BASIS,\n *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *  See the License for the specific language governing permissions and\n *  limitations under the License.\n */\n\nvar Hogan = {};\n\n(function (Hogan) {\n  Hogan.Template = function (codeObj, text, compiler, options) {\n    codeObj = codeObj || {};\n    this.r = codeObj.code || this.r;\n    this.c = compiler;\n    this.options = options || {};\n    this.text = text || '';\n    this.partials = codeObj.partials || {};\n    this.subs = codeObj.subs || {};\n    this.buf = '';\n  }\n\n  Hogan.Template.prototype = {\n    // render: replaced by generated code.\n    r: function (context, partials, indent) { return ''; },\n\n    // variable escaping\n    v: hoganEscape,\n\n    // triple stache\n    t: coerceToString,\n\n    render: function render(context, partials, indent) {\n      return this.ri([context], partials || {}, indent);\n    },\n\n    // render internal -- a hook for overrides that catches partials too\n    ri: function (context, partials, indent) {\n      return this.r(context, partials, indent);\n    },\n\n    // ensurePartial\n    ep: function(symbol, partials) {\n      var partial = this.partials[symbol];\n\n      // check to see that if we've instantiated this partial before\n      var template = partials[partial.name];\n      if (partial.instance && partial.base == template) {\n        return partial.instance;\n      }\n\n      if (typeof template == 'string') {\n        if (!this.c) {\n          throw new Error(\"No compiler available.\");\n        }\n        template = this.c.compile(template, this.options);\n      }\n\n      if (!template) {\n        return null;\n      }\n\n      // We use this to check whether the partials dictionary has changed\n      this.partials[symbol].base = template;\n\n      if (partial.subs) {\n        // Make sure we consider parent template now\n        if (!partials.stackText) partials.stackText = {};\n        for (key in partial.subs) {\n          if (!partials.stackText[key]) {\n            partials.stackText[key] = (this.activeSub !== undefined && partials.stackText[this.activeSub]) ? partials.stackText[this.activeSub] : this.text;\n          }\n        }\n        template = createSpecializedPartial(template, partial.subs, partial.partials,\n          this.stackSubs, this.stackPartials, partials.stackText);\n      }\n      this.partials[symbol].instance = template;\n\n      return template;\n    },\n\n    // tries to find a partial in the current scope and render it\n    rp: function(symbol, context, partials, indent) {\n      var partial = this.ep(symbol, partials);\n      if (!partial) {\n        return '';\n      }\n\n      return partial.ri(context, partials, indent);\n    },\n\n    // render a section\n    rs: function(context, partials, section) {\n      var tail = context[context.length - 1];\n\n      if (!isArray(tail)) {\n        section(context, partials, this);\n        return;\n      }\n\n      for (var i = 0; i < tail.length; i++) {\n        context.push(tail[i]);\n        section(context, partials, this);\n        context.pop();\n      }\n    },\n\n    // maybe start a section\n    s: function(val, ctx, partials, inverted, start, end, tags) {\n      var pass;\n\n      if (isArray(val) && val.length === 0) {\n        return false;\n      }\n\n      if (typeof val == 'function') {\n        val = this.ms(val, ctx, partials, inverted, start, end, tags);\n      }\n\n      pass = !!val;\n\n      if (!inverted && pass && ctx) {\n        ctx.push((typeof val == 'object') ? val : ctx[ctx.length - 1]);\n      }\n\n      return pass;\n    },\n\n    // find values with dotted names\n    d: function(key, ctx, partials, returnFound) {\n      var found,\n          names = key.split('.'),\n          val = this.f(names[0], ctx, partials, returnFound),\n          doModelGet = this.options.modelGet,\n          cx = null;\n\n      if (key === '.' && isArray(ctx[ctx.length - 2])) {\n        val = ctx[ctx.length - 1];\n      } else {\n        for (var i = 1; i < names.length; i++) {\n          found = findInScope(names[i], val, doModelGet);\n          if (found !== undefined) {\n            cx = val;\n            val = found;\n          } else {\n            val = '';\n          }\n        }\n      }\n\n      if (returnFound && !val) {\n        return false;\n      }\n\n      if (!returnFound && typeof val == 'function') {\n        ctx.push(cx);\n        val = this.mv(val, ctx, partials);\n        ctx.pop();\n      }\n\n      return val;\n    },\n\n    // find values with normal names\n    f: function(key, ctx, partials, returnFound) {\n      var val = false,\n          v = null,\n          found = false,\n          doModelGet = this.options.modelGet;\n\n      for (var i = ctx.length - 1; i >= 0; i--) {\n        v = ctx[i];\n        val = findInScope(key, v, doModelGet);\n        if (val !== undefined) {\n          found = true;\n          break;\n        }\n      }\n\n      if (!found) {\n        return (returnFound) ? false : \"\";\n      }\n\n      if (!returnFound && typeof val == 'function') {\n        val = this.mv(val, ctx, partials);\n      }\n\n      return val;\n    },\n\n    // higher order templates\n    ls: function(func, cx, partials, text, tags) {\n      var oldTags = this.options.delimiters;\n\n      this.options.delimiters = tags;\n      this.b(this.ct(coerceToString(func.call(cx, text)), cx, partials));\n      this.options.delimiters = oldTags;\n\n      return false;\n    },\n\n    // compile text\n    ct: function(text, cx, partials) {\n      if (this.options.disableLambda) {\n        throw new Error('Lambda features disabled.');\n      }\n      return this.c.compile(text, this.options).render(cx, partials);\n    },\n\n    // template result buffering\n    b: function(s) { this.buf += s; },\n\n    fl: function() { var r = this.buf; this.buf = ''; return r; },\n\n    // method replace section\n    ms: function(func, ctx, partials, inverted, start, end, tags) {\n      var textSource,\n          cx = ctx[ctx.length - 1],\n          result = func.call(cx);\n\n      if (typeof result == 'function') {\n        if (inverted) {\n          return true;\n        } else {\n          textSource = (this.activeSub && this.subsText && this.subsText[this.activeSub]) ? this.subsText[this.activeSub] : this.text;\n          return this.ls(result, cx, partials, textSource.substring(start, end), tags);\n        }\n      }\n\n      return result;\n    },\n\n    // method replace variable\n    mv: function(func, ctx, partials) {\n      var cx = ctx[ctx.length - 1];\n      var result = func.call(cx);\n\n      if (typeof result == 'function') {\n        return this.ct(coerceToString(result.call(cx)), cx, partials);\n      }\n\n      return result;\n    },\n\n    sub: function(name, context, partials, indent) {\n      var f = this.subs[name];\n      if (f) {\n        this.activeSub = name;\n        f(context, partials, this, indent);\n        this.activeSub = false;\n      }\n    }\n\n  };\n\n  //Find a key in an object\n  function findInScope(key, scope, doModelGet) {\n    var val;\n\n    if (scope && typeof scope == 'object') {\n\n      if (scope[key] !== undefined) {\n        val = scope[key];\n\n      // try lookup with get for backbone or similar model data\n      } else if (doModelGet && scope.get && typeof scope.get == 'function') {\n        val = scope.get(key);\n      }\n    }\n\n    return val;\n  }\n\n  function createSpecializedPartial(instance, subs, partials, stackSubs, stackPartials, stackText) {\n    function PartialTemplate() {};\n    PartialTemplate.prototype = instance;\n    function Substitutions() {};\n    Substitutions.prototype = instance.subs;\n    var key;\n    var partial = new PartialTemplate();\n    partial.subs = new Substitutions();\n    partial.subsText = {};  //hehe. substext.\n    partial.buf = '';\n\n    stackSubs = stackSubs || {};\n    partial.stackSubs = stackSubs;\n    partial.subsText = stackText;\n    for (key in subs) {\n      if (!stackSubs[key]) stackSubs[key] = subs[key];\n    }\n    for (key in stackSubs) {\n      partial.subs[key] = stackSubs[key];\n    }\n\n    stackPartials = stackPartials || {};\n    partial.stackPartials = stackPartials;\n    for (key in partials) {\n      if (!stackPartials[key]) stackPartials[key] = partials[key];\n    }\n    for (key in stackPartials) {\n      partial.partials[key] = stackPartials[key];\n    }\n\n    return partial;\n  }\n\n  var rAmp = /&/g,\n      rLt = /</g,\n      rGt = />/g,\n      rApos = /\\'/g,\n      rQuot = /\\\"/g,\n      hChars = /[&<>\\\"\\']/;\n\n  function coerceToString(val) {\n    return String((val === null || val === undefined) ? '' : val);\n  }\n\n  function hoganEscape(str) {\n    str = coerceToString(str);\n    return hChars.test(str) ?\n      str\n        .replace(rAmp, '&amp;')\n        .replace(rLt, '&lt;')\n        .replace(rGt, '&gt;')\n        .replace(rApos, '&#39;')\n        .replace(rQuot, '&quot;') :\n      str;\n  }\n\n  var isArray = Array.isArray || function(a) {\n    return Object.prototype.toString.call(a) === '[object Array]';\n  };\n\n})( true ? exports : undefined);\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/hogan.js/lib/template.js?");

/***/ }),

/***/ "./node_modules/instantsearch.js/es/connectors/search-box/connectSearchBox.js":
/*!************************************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/connectors/search-box/connectSearchBox.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return connectSearchBox; });\n/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/utils.js */ \"./node_modules/instantsearch.js/es/lib/utils.js\");\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\n\n\nvar usage = 'Usage:\\nvar customSearchBox = connectSearchBox(function render(params, isFirstRendering) {\\n  // params = {\\n  //   query,\\n  //   onHistoryChange,\\n  //   refine,\\n  //   instantSearchInstance,\\n  //   widgetParams,\\n  //   clear,\\n  // }\\n});\\nsearch.addWidget(\\n  customSearchBox({\\n    [ queryHook ],\\n  })\\n);\\nFull documentation available at https://community.algolia.com/instantsearch.js/v2/connectors/connectSearchBox.html\\n';\n\n/**\n * @typedef {Object} CustomSearchBoxWidgetOptions\n * @property {function(string, function(string))} [queryHook = undefined] A function that will be called every time\n * a new value for the query is set. The first parameter is the query and the second is a\n * function to actually trigger the search. The function takes the query as the parameter.\n *\n * This queryHook can be used to debounce the number of searches done from the searchBox.\n */\n\n/**\n * @typedef {Object} SearchBoxRenderingOptions\n * @property {string} query The query from the last search.\n * @property {function(SearchParameters)} onHistoryChange Registers a callback when the browser history changes.\n * @property {function(string)} refine Sets a new query and searches.\n * @property {function()} clear Remove the query and perform search.\n * @property {Object} widgetParams All original `CustomSearchBoxWidgetOptions` forwarded to the `renderFn`.\n * @property {boolean} isSearchStalled `true` if the search results takes more than a certain time to come back\n * from Algolia servers. This can be configured on the InstantSearch constructor with the attribute\n * `stalledSearchDelay` which is 200ms, by default.\n */\n\n/**\n * **SearchBox** connector provides the logic to build a widget that will let the user search for a query.\n *\n * The connector provides to the rendering: `refine()` to set the query. The behaviour of this function\n * may be impacted by the `queryHook` widget parameter.\n * @type {Connector}\n * @param {function(SearchBoxRenderingOptions, boolean)} renderFn Rendering function for the custom **SearchBox** widget.\n * @param {function} unmountFn Unmount function called when the widget is disposed.\n * @return {function(CustomSearchBoxWidgetOptions)} Re-usable widget factory for a custom **SearchBox** widget.\n * @example\n * // custom `renderFn` to render the custom SearchBox widget\n * function renderFn(SearchBoxRenderingOptions, isFirstRendering) {\n *   if (isFirstRendering) {\n *     SearchBoxRenderingOptions.widgetParams.containerNode.html('<input type=\"text\" />');\n *     SearchBoxRenderingOptions.widgetParams.containerNode\n *       .find('input')\n *       .on('keyup', function() {\n *         SearchBoxRenderingOptions.refine($(this).val());\n *       });\n *     SearchBoxRenderingOptions.widgetParams.containerNode\n *       .find('input')\n *       .val(SearchBoxRenderingOptions.query);\n *   }\n * }\n *\n * // connect `renderFn` to SearchBox logic\n * var customSearchBox = instantsearch.connectors.connectSearchBox(renderFn);\n *\n * // mount widget on the page\n * search.addWidget(\n *   customSearchBox({\n *     containerNode: $('#custom-searchbox'),\n *   })\n * );\n */\nfunction connectSearchBox(renderFn, unmountFn) {\n  Object(_lib_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"checkRendering\"])(renderFn, usage);\n\n  return function () {\n    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n    var queryHook = widgetParams.queryHook;\n\n\n    function clear(helper) {\n      return function () {\n        helper.setQuery('');\n        helper.search();\n      };\n    }\n\n    return {\n      _clear: function _clear() {},\n      _cachedClear: function _cachedClear() {\n        this._clear();\n      },\n      init: function init(_ref) {\n        var helper = _ref.helper,\n            onHistoryChange = _ref.onHistoryChange,\n            instantSearchInstance = _ref.instantSearchInstance;\n\n        this._cachedClear = this._cachedClear.bind(this);\n        this._clear = clear(helper);\n\n        this._refine = function () {\n          var previousQuery = void 0;\n\n          var setQueryAndSearch = function setQueryAndSearch(q) {\n            var doSearch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;\n\n            if (q !== helper.state.query) {\n              previousQuery = helper.state.query;\n              helper.setQuery(q);\n            }\n            if (doSearch && previousQuery !== undefined && previousQuery !== q) helper.search();\n          };\n\n          return queryHook ? function (q) {\n            return queryHook(q, setQueryAndSearch);\n          } : setQueryAndSearch;\n        }();\n\n        this._onHistoryChange = onHistoryChange;\n\n        renderFn({\n          query: helper.state.query,\n          onHistoryChange: this._onHistoryChange,\n          refine: this._refine,\n          clear: this._cachedClear,\n          widgetParams: widgetParams,\n          instantSearchInstance: instantSearchInstance\n        }, true);\n      },\n      render: function render(_ref2) {\n        var helper = _ref2.helper,\n            instantSearchInstance = _ref2.instantSearchInstance,\n            searchMetadata = _ref2.searchMetadata;\n\n        this._clear = clear(helper);\n\n        renderFn({\n          query: helper.state.query,\n          onHistoryChange: this._onHistoryChange,\n          refine: this._refine,\n          clear: this._cachedClear,\n          widgetParams: widgetParams,\n          instantSearchInstance: instantSearchInstance,\n          isSearchStalled: searchMetadata.isSearchStalled\n        }, false);\n      },\n      dispose: function dispose(_ref3) {\n        var state = _ref3.state;\n\n        unmountFn();\n        return state.setQuery('');\n      },\n      getWidgetState: function getWidgetState(uiState, _ref4) {\n        var searchParameters = _ref4.searchParameters;\n\n        var query = searchParameters.query;\n\n        if (query === '' || uiState && uiState.query === query) {\n          return uiState;\n        }\n\n        return _extends({}, uiState, {\n          query: query\n        });\n      },\n      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {\n        var uiState = _ref5.uiState;\n\n        return searchParameters.setQuery(uiState.query || '');\n      }\n    };\n  };\n}\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/instantsearch.js/es/connectors/search-box/connectSearchBox.js?");

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/utils.js":
/*!*******************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/utils.js ***!
  \*******************************************************/
/*! exports provided: getContainerNode, bemHelper, prepareTemplateProps, renderTemplate, isSpecialClick, isDomElement, getRefinements, getAttributesToClear, clearRefinements, prefixKeys, escapeRefinement, unescapeRefinement, checkRendering, isReactElement, deprecate, parseAroundLatLngFromString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getContainerNode\", function() { return getContainerNode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"bemHelper\", function() { return bemHelper; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"prepareTemplateProps\", function() { return prepareTemplateProps; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderTemplate\", function() { return renderTemplate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isSpecialClick\", function() { return isSpecialClick; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isDomElement\", function() { return isDomElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getRefinements\", function() { return getRefinements; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getAttributesToClear\", function() { return getAttributesToClear; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"clearRefinements\", function() { return clearRefinements; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"prefixKeys\", function() { return prefixKeys; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"escapeRefinement\", function() { return escapeRefinement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"unescapeRefinement\", function() { return unescapeRefinement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"checkRendering\", function() { return checkRendering; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isReactElement\", function() { return isReactElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deprecate\", function() { return deprecate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"parseAroundLatLngFromString\", function() { return parseAroundLatLngFromString; });\n/* harmony import */ var lodash_reduce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/reduce */ \"./node_modules/lodash/reduce.js\");\n/* harmony import */ var lodash_reduce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_reduce__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var lodash_forEach__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/forEach */ \"./node_modules/lodash/forEach.js\");\n/* harmony import */ var lodash_forEach__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_forEach__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/find */ \"./node_modules/lodash/find.js\");\n/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_find__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/get */ \"./node_modules/lodash/get.js\");\n/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var lodash_keys__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/keys */ \"./node_modules/lodash/keys.js\");\n/* harmony import */ var lodash_keys__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_keys__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var lodash_uniq__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash/uniq */ \"./node_modules/lodash/uniq.js\");\n/* harmony import */ var lodash_uniq__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_uniq__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var lodash_mapKeys__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash/mapKeys */ \"./node_modules/lodash/mapKeys.js\");\n/* harmony import */ var lodash_mapKeys__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash_mapKeys__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var lodash_mapValues__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash/mapValues */ \"./node_modules/lodash/mapValues.js\");\n/* harmony import */ var lodash_mapValues__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash_mapValues__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var lodash_curry__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lodash/curry */ \"./node_modules/lodash/curry.js\");\n/* harmony import */ var lodash_curry__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash_curry__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var hogan_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! hogan.js */ \"./node_modules/hogan.js/lib/hogan.js\");\n/* harmony import */ var hogan_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(hogan_js__WEBPACK_IMPORTED_MODULE_9__);\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/**\n * Return the container. If it's a string, it is considered a\n * css selector and retrieves the first matching element. Otherwise\n * test if it validates that it's a correct DOMElement.\n * @param {string|HTMLElement} selectorOrHTMLElement a selector or a node\n * @return {HTMLElement} The resolved HTMLElement\n * @throws Error when the type is not correct\n */\nfunction getContainerNode(selectorOrHTMLElement) {\n  var isFromString = typeof selectorOrHTMLElement === 'string';\n  var domElement = void 0;\n  if (isFromString) {\n    domElement = document.querySelector(selectorOrHTMLElement);\n  } else {\n    domElement = selectorOrHTMLElement;\n  }\n\n  if (!isDomElement(domElement)) {\n    var errorMessage = 'Container must be `string` or `HTMLElement`.';\n    if (isFromString) {\n      errorMessage += ' Unable to find ' + selectorOrHTMLElement;\n    }\n    throw new Error(errorMessage);\n  }\n\n  return domElement;\n}\n\n/**\n * Returns true if the parameter is a DOMElement.\n * @param {any} o the value to test\n * @return {boolean} true if o is a DOMElement\n */\nfunction isDomElement(o) {\n  return o instanceof window.HTMLElement || Boolean(o) && o.nodeType > 0;\n}\n\nfunction isSpecialClick(event) {\n  var isMiddleClick = event.button === 1;\n  return isMiddleClick || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;\n}\n\n/**\n * Creates BEM class name according the vanilla BEM style.\n * @param {string} block the main block\n * @return {function} function that takes up to 2 parameters\n * that determine the element and the modifier of the BEM class.\n */\nfunction bemHelper(block) {\n  return function (element, modifier) {\n    // block--element\n    if (element && !modifier) {\n      return block + '--' + element;\n    }\n    // block--element__modifier\n    if (element && modifier) {\n      return block + '--' + element + '__' + modifier;\n    }\n    // block__modifier\n    if (!element && modifier) {\n      return block + '__' + modifier;\n    }\n\n    return block;\n  };\n}\n\n/**\n * Prepares an object to be passed to the Template widget\n * @param {object} unknownBecauseES6 an object with the following attributes:\n *  - transformData\n *  - defaultTemplate\n *  - templates\n *  - templatesConfig\n * @return {object} the configuration with the attributes:\n *  - transformData\n *  - defaultTemplate\n *  - templates\n *  - useCustomCompileOptions\n */\nfunction prepareTemplateProps(_ref) {\n  var transformData = _ref.transformData,\n      defaultTemplates = _ref.defaultTemplates,\n      templates = _ref.templates,\n      templatesConfig = _ref.templatesConfig;\n\n  var preparedTemplates = prepareTemplates(defaultTemplates, templates);\n\n  return _extends({\n    transformData: transformData,\n    templatesConfig: templatesConfig\n  }, preparedTemplates);\n}\n\nfunction prepareTemplates() {\n  var defaultTemplates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  var templates = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n  var allKeys = lodash_uniq__WEBPACK_IMPORTED_MODULE_5___default()([].concat(_toConsumableArray(lodash_keys__WEBPACK_IMPORTED_MODULE_4___default()(defaultTemplates)), _toConsumableArray(lodash_keys__WEBPACK_IMPORTED_MODULE_4___default()(templates))));\n\n  return lodash_reduce__WEBPACK_IMPORTED_MODULE_0___default()(allKeys, function (config, key) {\n    var defaultTemplate = defaultTemplates[key];\n    var customTemplate = templates[key];\n    var isCustomTemplate = customTemplate !== undefined && customTemplate !== defaultTemplate;\n\n    config.templates[key] = isCustomTemplate ? customTemplate : defaultTemplate;\n    config.useCustomCompileOptions[key] = isCustomTemplate;\n\n    return config;\n  }, { templates: {}, useCustomCompileOptions: {} });\n}\n\nfunction renderTemplate(_ref2) {\n  var templates = _ref2.templates,\n      templateKey = _ref2.templateKey,\n      compileOptions = _ref2.compileOptions,\n      helpers = _ref2.helpers,\n      data = _ref2.data;\n\n  var template = templates[templateKey];\n  var templateType = typeof template === 'undefined' ? 'undefined' : _typeof(template);\n  var isTemplateString = templateType === 'string';\n  var isTemplateFunction = templateType === 'function';\n\n  if (!isTemplateString && !isTemplateFunction) {\n    throw new Error('Template must be \\'string\\' or \\'function\\', was \\'' + templateType + '\\' (key: ' + templateKey + ')');\n  }\n\n  if (isTemplateFunction) {\n    return template(data);\n  }\n\n  var transformedHelpers = transformHelpersToHogan(helpers, compileOptions, data);\n\n  return hogan_js__WEBPACK_IMPORTED_MODULE_9___default.a.compile(template, compileOptions).render(_extends({}, data, {\n    helpers: transformedHelpers\n  }));\n}\n\n// We add all our template helper methods to the template as lambdas. Note\n// that lambdas in Mustache are supposed to accept a second argument of\n// `render` to get the rendered value, not the literal `{{value}}`. But\n// this is currently broken (see https://github.com/twitter/hogan.js/issues/222).\nfunction transformHelpersToHogan(helpers, compileOptions, data) {\n  return lodash_mapValues__WEBPACK_IMPORTED_MODULE_7___default()(helpers, function (method) {\n    return lodash_curry__WEBPACK_IMPORTED_MODULE_8___default()(function (text) {\n      var _this = this;\n\n      var render = function render(value) {\n        return hogan_js__WEBPACK_IMPORTED_MODULE_9___default.a.compile(value, compileOptions).render(_this);\n      };\n      return method.call(data, text, render);\n    });\n  });\n}\n\nfunction getRefinement(state, type, attributeName, name, resultsFacets) {\n  var res = { type: type, attributeName: attributeName, name: name };\n  var facet = lodash_find__WEBPACK_IMPORTED_MODULE_2___default()(resultsFacets, { name: attributeName });\n  var count = void 0;\n  if (type === 'hierarchical') {\n    var facetDeclaration = state.getHierarchicalFacetByName(attributeName);\n    var split = name.split(facetDeclaration.separator);\n    res.name = split[split.length - 1];\n    for (var i = 0; facet !== undefined && i < split.length; ++i) {\n      facet = lodash_find__WEBPACK_IMPORTED_MODULE_2___default()(facet.data, { name: split[i] });\n    }\n    count = lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(facet, 'count');\n  } else {\n    count = lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(facet, 'data[\"' + res.name + '\"]');\n  }\n  var exhaustive = lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(facet, 'exhaustive');\n  if (count !== undefined) {\n    res.count = count;\n  }\n  if (exhaustive !== undefined) {\n    res.exhaustive = exhaustive;\n  }\n  return res;\n}\n\nfunction getRefinements(results, state, clearsQuery) {\n  var res = clearsQuery && state.query && state.query.trim() ? [{\n    type: 'query',\n    name: state.query,\n    query: state.query\n  }] : [];\n\n  lodash_forEach__WEBPACK_IMPORTED_MODULE_1___default()(state.facetsRefinements, function (refinements, attributeName) {\n    lodash_forEach__WEBPACK_IMPORTED_MODULE_1___default()(refinements, function (name) {\n      res.push(getRefinement(state, 'facet', attributeName, name, results.facets));\n    });\n  });\n\n  lodash_forEach__WEBPACK_IMPORTED_MODULE_1___default()(state.facetsExcludes, function (refinements, attributeName) {\n    lodash_forEach__WEBPACK_IMPORTED_MODULE_1___default()(refinements, function (name) {\n      res.push({ type: 'exclude', attributeName: attributeName, name: name, exclude: true });\n    });\n  });\n\n  lodash_forEach__WEBPACK_IMPORTED_MODULE_1___default()(state.disjunctiveFacetsRefinements, function (refinements, attributeName) {\n    lodash_forEach__WEBPACK_IMPORTED_MODULE_1___default()(refinements, function (name) {\n      res.push(getRefinement(state, 'disjunctive', attributeName,\n      // we unescapeRefinement any disjunctive refined value since they can be escaped\n      // when negative numeric values search `escapeRefinement` usage in code\n      unescapeRefinement(name), results.disjunctiveFacets));\n    });\n  });\n\n  lodash_forEach__WEBPACK_IMPORTED_MODULE_1___default()(state.hierarchicalFacetsRefinements, function (refinements, attributeName) {\n    lodash_forEach__WEBPACK_IMPORTED_MODULE_1___default()(refinements, function (name) {\n      res.push(getRefinement(state, 'hierarchical', attributeName, name, results.hierarchicalFacets));\n    });\n  });\n\n  lodash_forEach__WEBPACK_IMPORTED_MODULE_1___default()(state.numericRefinements, function (operators, attributeName) {\n    lodash_forEach__WEBPACK_IMPORTED_MODULE_1___default()(operators, function (values, operator) {\n      lodash_forEach__WEBPACK_IMPORTED_MODULE_1___default()(values, function (value) {\n        res.push({\n          type: 'numeric',\n          attributeName: attributeName,\n          name: '' + value,\n          numericValue: value,\n          operator: operator\n        });\n      });\n    });\n  });\n\n  lodash_forEach__WEBPACK_IMPORTED_MODULE_1___default()(state.tagRefinements, function (name) {\n    res.push({ type: 'tag', attributeName: '_tags', name: name });\n  });\n\n  return res;\n}\n\n/**\n * Clears the refinements of a SearchParameters object based on rules provided.\n * The white list is first used then the black list is applied. If no white list\n * is provided, all the current refinements are used.\n * @param {object} $0 parameters\n * @param {Helper} $0.helper instance of the Helper\n * @param {string[]} [$0.whiteList] list of parameters to clear\n * @param {string[]} [$0.blackList=[]] list of parameters not to remove (will impact the white list)\n * @param {boolean} [$0.clearsQuery=false] clears the query if need be\n * @returns {SearchParameters} search parameters with refinements cleared\n */\nfunction clearRefinements(_ref3) {\n  var helper = _ref3.helper,\n      whiteList = _ref3.whiteList,\n      _ref3$blackList = _ref3.blackList,\n      blackList = _ref3$blackList === undefined ? [] : _ref3$blackList,\n      _ref3$clearsQuery = _ref3.clearsQuery,\n      clearsQuery = _ref3$clearsQuery === undefined ? false : _ref3$clearsQuery;\n\n  var attributesToClear = getAttributesToClear({\n    helper: helper,\n    whiteList: whiteList,\n    blackList: blackList\n  });\n\n  var finalState = helper.state;\n\n  attributesToClear.forEach(function (attribute) {\n    if (attribute === '_tags') {\n      finalState = finalState.clearTags();\n    } else {\n      finalState = finalState.clearRefinements(attribute);\n    }\n  });\n\n  if (clearsQuery) {\n    finalState = finalState.setQuery('');\n  }\n\n  return finalState;\n}\n\n/**\n * Computes the list of attributes (conjunctive, disjunctive, hierarchical facet + numerical attributes)\n * to clear based on a optional white and black lists. The white list is applied first then the black list.\n * @param {object} $0 parameters\n * @param {Helper} $0.helper instance of the Helper\n * @param {string[]} [$0.whiteList] attributes to clear (defaults to all attributes)\n * @param {string[]} [$0.blackList=[]] attributes to keep, will override the white list\n * @returns {string[]} the list of attributes to clear based on the rules\n */\nfunction getAttributesToClear(_ref4) {\n  var helper = _ref4.helper,\n      whiteList = _ref4.whiteList,\n      blackList = _ref4.blackList;\n\n  var lastResults = helper.lastResults || {};\n  var attributesToClear = whiteList || getRefinements(lastResults, helper.state).map(function (one) {\n    return one.attributeName;\n  });\n\n  return attributesToClear.filter(function (attribute) {\n    return blackList.indexOf(attribute) === -1;\n  });\n}\n\nfunction prefixKeys(prefix, obj) {\n  if (obj) {\n    return lodash_mapKeys__WEBPACK_IMPORTED_MODULE_6___default()(obj, function (v, k) {\n      return prefix + k;\n    });\n  }\n\n  return undefined;\n}\n\nfunction escapeRefinement(value) {\n  if (typeof value === 'number' && value < 0) {\n    value = String(value).replace(/^-/, '\\\\-');\n  }\n\n  return value;\n}\n\nfunction unescapeRefinement(value) {\n  return String(value).replace(/^\\\\-/, '-');\n}\n\nfunction checkRendering(rendering, usage) {\n  if (rendering === undefined || typeof rendering !== 'function') {\n    throw new Error(usage);\n  }\n}\n\nvar REACT_ELEMENT_TYPE = typeof Symbol === 'function' && _typeof(Symbol.iterator) === 'symbol' && Symbol.for && Symbol.for('react.element') || 0xeac7;\n\nfunction isReactElement(object) {\n  return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;\n}\n\nfunction deprecate(fn, message) {\n  var hasAlreadyPrint = false;\n\n  return function () {\n    if (!hasAlreadyPrint) {\n      hasAlreadyPrint = true;\n\n      // eslint-disable-next-line no-console\n      console.warn('[InstantSearch.js]: ' + message);\n    }\n\n    return fn.apply(undefined, arguments);\n  };\n}\n\nvar latLngRegExp = /^(-?\\d+(?:\\.\\d+)?),\\s*(-?\\d+(?:\\.\\d+)?)$/;\nfunction parseAroundLatLngFromString(value) {\n  var pattern = value.match(latLngRegExp);\n\n  // Since the value provided is the one send with the query, the API should\n  // throw an error due to the wrong format. So throw an error should be safe..\n  if (!pattern) {\n    throw new Error('Invalid value for \"aroundLatLng\" parameter: \"' + value + '\"');\n  }\n\n  return {\n    lat: parseFloat(pattern[1]),\n    lng: parseFloat(pattern[2])\n  };\n}\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/instantsearch.js/es/lib/utils.js?");

/***/ }),

/***/ "./node_modules/lodash/_DataView.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_DataView.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar DataView = getNative(root, 'DataView');\n\nmodule.exports = DataView;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_DataView.js?");

/***/ }),

/***/ "./node_modules/lodash/_Hash.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_Hash.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var hashClear = __webpack_require__(/*! ./_hashClear */ \"./node_modules/lodash/_hashClear.js\"),\n    hashDelete = __webpack_require__(/*! ./_hashDelete */ \"./node_modules/lodash/_hashDelete.js\"),\n    hashGet = __webpack_require__(/*! ./_hashGet */ \"./node_modules/lodash/_hashGet.js\"),\n    hashHas = __webpack_require__(/*! ./_hashHas */ \"./node_modules/lodash/_hashHas.js\"),\n    hashSet = __webpack_require__(/*! ./_hashSet */ \"./node_modules/lodash/_hashSet.js\");\n\n/**\n * Creates a hash object.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction Hash(entries) {\n  var index = -1,\n      length = entries == null ? 0 : entries.length;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n// Add methods to `Hash`.\nHash.prototype.clear = hashClear;\nHash.prototype['delete'] = hashDelete;\nHash.prototype.get = hashGet;\nHash.prototype.has = hashHas;\nHash.prototype.set = hashSet;\n\nmodule.exports = Hash;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_Hash.js?");

/***/ }),

/***/ "./node_modules/lodash/_LazyWrapper.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_LazyWrapper.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseCreate = __webpack_require__(/*! ./_baseCreate */ \"./node_modules/lodash/_baseCreate.js\"),\n    baseLodash = __webpack_require__(/*! ./_baseLodash */ \"./node_modules/lodash/_baseLodash.js\");\n\n/** Used as references for the maximum length and index of an array. */\nvar MAX_ARRAY_LENGTH = 4294967295;\n\n/**\n * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.\n *\n * @private\n * @constructor\n * @param {*} value The value to wrap.\n */\nfunction LazyWrapper(value) {\n  this.__wrapped__ = value;\n  this.__actions__ = [];\n  this.__dir__ = 1;\n  this.__filtered__ = false;\n  this.__iteratees__ = [];\n  this.__takeCount__ = MAX_ARRAY_LENGTH;\n  this.__views__ = [];\n}\n\n// Ensure `LazyWrapper` is an instance of `baseLodash`.\nLazyWrapper.prototype = baseCreate(baseLodash.prototype);\nLazyWrapper.prototype.constructor = LazyWrapper;\n\nmodule.exports = LazyWrapper;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_LazyWrapper.js?");

/***/ }),

/***/ "./node_modules/lodash/_ListCache.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_ListCache.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var listCacheClear = __webpack_require__(/*! ./_listCacheClear */ \"./node_modules/lodash/_listCacheClear.js\"),\n    listCacheDelete = __webpack_require__(/*! ./_listCacheDelete */ \"./node_modules/lodash/_listCacheDelete.js\"),\n    listCacheGet = __webpack_require__(/*! ./_listCacheGet */ \"./node_modules/lodash/_listCacheGet.js\"),\n    listCacheHas = __webpack_require__(/*! ./_listCacheHas */ \"./node_modules/lodash/_listCacheHas.js\"),\n    listCacheSet = __webpack_require__(/*! ./_listCacheSet */ \"./node_modules/lodash/_listCacheSet.js\");\n\n/**\n * Creates an list cache object.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction ListCache(entries) {\n  var index = -1,\n      length = entries == null ? 0 : entries.length;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n// Add methods to `ListCache`.\nListCache.prototype.clear = listCacheClear;\nListCache.prototype['delete'] = listCacheDelete;\nListCache.prototype.get = listCacheGet;\nListCache.prototype.has = listCacheHas;\nListCache.prototype.set = listCacheSet;\n\nmodule.exports = ListCache;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_ListCache.js?");

/***/ }),

/***/ "./node_modules/lodash/_LodashWrapper.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_LodashWrapper.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseCreate = __webpack_require__(/*! ./_baseCreate */ \"./node_modules/lodash/_baseCreate.js\"),\n    baseLodash = __webpack_require__(/*! ./_baseLodash */ \"./node_modules/lodash/_baseLodash.js\");\n\n/**\n * The base constructor for creating `lodash` wrapper objects.\n *\n * @private\n * @param {*} value The value to wrap.\n * @param {boolean} [chainAll] Enable explicit method chain sequences.\n */\nfunction LodashWrapper(value, chainAll) {\n  this.__wrapped__ = value;\n  this.__actions__ = [];\n  this.__chain__ = !!chainAll;\n  this.__index__ = 0;\n  this.__values__ = undefined;\n}\n\nLodashWrapper.prototype = baseCreate(baseLodash.prototype);\nLodashWrapper.prototype.constructor = LodashWrapper;\n\nmodule.exports = LodashWrapper;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_LodashWrapper.js?");

/***/ }),

/***/ "./node_modules/lodash/_Map.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/_Map.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar Map = getNative(root, 'Map');\n\nmodule.exports = Map;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_Map.js?");

/***/ }),

/***/ "./node_modules/lodash/_MapCache.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_MapCache.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var mapCacheClear = __webpack_require__(/*! ./_mapCacheClear */ \"./node_modules/lodash/_mapCacheClear.js\"),\n    mapCacheDelete = __webpack_require__(/*! ./_mapCacheDelete */ \"./node_modules/lodash/_mapCacheDelete.js\"),\n    mapCacheGet = __webpack_require__(/*! ./_mapCacheGet */ \"./node_modules/lodash/_mapCacheGet.js\"),\n    mapCacheHas = __webpack_require__(/*! ./_mapCacheHas */ \"./node_modules/lodash/_mapCacheHas.js\"),\n    mapCacheSet = __webpack_require__(/*! ./_mapCacheSet */ \"./node_modules/lodash/_mapCacheSet.js\");\n\n/**\n * Creates a map cache object to store key-value pairs.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction MapCache(entries) {\n  var index = -1,\n      length = entries == null ? 0 : entries.length;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n// Add methods to `MapCache`.\nMapCache.prototype.clear = mapCacheClear;\nMapCache.prototype['delete'] = mapCacheDelete;\nMapCache.prototype.get = mapCacheGet;\nMapCache.prototype.has = mapCacheHas;\nMapCache.prototype.set = mapCacheSet;\n\nmodule.exports = MapCache;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_MapCache.js?");

/***/ }),

/***/ "./node_modules/lodash/_Promise.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_Promise.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar Promise = getNative(root, 'Promise');\n\nmodule.exports = Promise;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_Promise.js?");

/***/ }),

/***/ "./node_modules/lodash/_Set.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/_Set.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar Set = getNative(root, 'Set');\n\nmodule.exports = Set;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_Set.js?");

/***/ }),

/***/ "./node_modules/lodash/_SetCache.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_SetCache.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var MapCache = __webpack_require__(/*! ./_MapCache */ \"./node_modules/lodash/_MapCache.js\"),\n    setCacheAdd = __webpack_require__(/*! ./_setCacheAdd */ \"./node_modules/lodash/_setCacheAdd.js\"),\n    setCacheHas = __webpack_require__(/*! ./_setCacheHas */ \"./node_modules/lodash/_setCacheHas.js\");\n\n/**\n *\n * Creates an array cache object to store unique values.\n *\n * @private\n * @constructor\n * @param {Array} [values] The values to cache.\n */\nfunction SetCache(values) {\n  var index = -1,\n      length = values == null ? 0 : values.length;\n\n  this.__data__ = new MapCache;\n  while (++index < length) {\n    this.add(values[index]);\n  }\n}\n\n// Add methods to `SetCache`.\nSetCache.prototype.add = SetCache.prototype.push = setCacheAdd;\nSetCache.prototype.has = setCacheHas;\n\nmodule.exports = SetCache;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_SetCache.js?");

/***/ }),

/***/ "./node_modules/lodash/_Stack.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_Stack.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var ListCache = __webpack_require__(/*! ./_ListCache */ \"./node_modules/lodash/_ListCache.js\"),\n    stackClear = __webpack_require__(/*! ./_stackClear */ \"./node_modules/lodash/_stackClear.js\"),\n    stackDelete = __webpack_require__(/*! ./_stackDelete */ \"./node_modules/lodash/_stackDelete.js\"),\n    stackGet = __webpack_require__(/*! ./_stackGet */ \"./node_modules/lodash/_stackGet.js\"),\n    stackHas = __webpack_require__(/*! ./_stackHas */ \"./node_modules/lodash/_stackHas.js\"),\n    stackSet = __webpack_require__(/*! ./_stackSet */ \"./node_modules/lodash/_stackSet.js\");\n\n/**\n * Creates a stack cache object to store key-value pairs.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction Stack(entries) {\n  var data = this.__data__ = new ListCache(entries);\n  this.size = data.size;\n}\n\n// Add methods to `Stack`.\nStack.prototype.clear = stackClear;\nStack.prototype['delete'] = stackDelete;\nStack.prototype.get = stackGet;\nStack.prototype.has = stackHas;\nStack.prototype.set = stackSet;\n\nmodule.exports = Stack;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_Stack.js?");

/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/** Built-in value references. */\nvar Symbol = root.Symbol;\n\nmodule.exports = Symbol;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_Symbol.js?");

/***/ }),

/***/ "./node_modules/lodash/_Uint8Array.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_Uint8Array.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/** Built-in value references. */\nvar Uint8Array = root.Uint8Array;\n\nmodule.exports = Uint8Array;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_Uint8Array.js?");

/***/ }),

/***/ "./node_modules/lodash/_WeakMap.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_WeakMap.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar WeakMap = getNative(root, 'WeakMap');\n\nmodule.exports = WeakMap;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_WeakMap.js?");

/***/ }),

/***/ "./node_modules/lodash/_apply.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_apply.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A faster alternative to `Function#apply`, this function invokes `func`\n * with the `this` binding of `thisArg` and the arguments of `args`.\n *\n * @private\n * @param {Function} func The function to invoke.\n * @param {*} thisArg The `this` binding of `func`.\n * @param {Array} args The arguments to invoke `func` with.\n * @returns {*} Returns the result of `func`.\n */\nfunction apply(func, thisArg, args) {\n  switch (args.length) {\n    case 0: return func.call(thisArg);\n    case 1: return func.call(thisArg, args[0]);\n    case 2: return func.call(thisArg, args[0], args[1]);\n    case 3: return func.call(thisArg, args[0], args[1], args[2]);\n  }\n  return func.apply(thisArg, args);\n}\n\nmodule.exports = apply;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_apply.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayEach.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arrayEach.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A specialized version of `_.forEach` for arrays without support for\n * iteratee shorthands.\n *\n * @private\n * @param {Array} [array] The array to iterate over.\n * @param {Function} iteratee The function invoked per iteration.\n * @returns {Array} Returns `array`.\n */\nfunction arrayEach(array, iteratee) {\n  var index = -1,\n      length = array == null ? 0 : array.length;\n\n  while (++index < length) {\n    if (iteratee(array[index], index, array) === false) {\n      break;\n    }\n  }\n  return array;\n}\n\nmodule.exports = arrayEach;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_arrayEach.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayFilter.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_arrayFilter.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A specialized version of `_.filter` for arrays without support for\n * iteratee shorthands.\n *\n * @private\n * @param {Array} [array] The array to iterate over.\n * @param {Function} predicate The function invoked per iteration.\n * @returns {Array} Returns the new filtered array.\n */\nfunction arrayFilter(array, predicate) {\n  var index = -1,\n      length = array == null ? 0 : array.length,\n      resIndex = 0,\n      result = [];\n\n  while (++index < length) {\n    var value = array[index];\n    if (predicate(value, index, array)) {\n      result[resIndex++] = value;\n    }\n  }\n  return result;\n}\n\nmodule.exports = arrayFilter;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_arrayFilter.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayIncludes.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_arrayIncludes.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIndexOf = __webpack_require__(/*! ./_baseIndexOf */ \"./node_modules/lodash/_baseIndexOf.js\");\n\n/**\n * A specialized version of `_.includes` for arrays without support for\n * specifying an index to search from.\n *\n * @private\n * @param {Array} [array] The array to inspect.\n * @param {*} target The value to search for.\n * @returns {boolean} Returns `true` if `target` is found, else `false`.\n */\nfunction arrayIncludes(array, value) {\n  var length = array == null ? 0 : array.length;\n  return !!length && baseIndexOf(array, value, 0) > -1;\n}\n\nmodule.exports = arrayIncludes;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_arrayIncludes.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayIncludesWith.js":
/*!***************************************************!*\
  !*** ./node_modules/lodash/_arrayIncludesWith.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This function is like `arrayIncludes` except that it accepts a comparator.\n *\n * @private\n * @param {Array} [array] The array to inspect.\n * @param {*} target The value to search for.\n * @param {Function} comparator The comparator invoked per element.\n * @returns {boolean} Returns `true` if `target` is found, else `false`.\n */\nfunction arrayIncludesWith(array, value, comparator) {\n  var index = -1,\n      length = array == null ? 0 : array.length;\n\n  while (++index < length) {\n    if (comparator(value, array[index])) {\n      return true;\n    }\n  }\n  return false;\n}\n\nmodule.exports = arrayIncludesWith;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_arrayIncludesWith.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayLikeKeys.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_arrayLikeKeys.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseTimes = __webpack_require__(/*! ./_baseTimes */ \"./node_modules/lodash/_baseTimes.js\"),\n    isArguments = __webpack_require__(/*! ./isArguments */ \"./node_modules/lodash/isArguments.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isBuffer = __webpack_require__(/*! ./isBuffer */ \"./node_modules/lodash/isBuffer.js\"),\n    isIndex = __webpack_require__(/*! ./_isIndex */ \"./node_modules/lodash/_isIndex.js\"),\n    isTypedArray = __webpack_require__(/*! ./isTypedArray */ \"./node_modules/lodash/isTypedArray.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Creates an array of the enumerable property names of the array-like `value`.\n *\n * @private\n * @param {*} value The value to query.\n * @param {boolean} inherited Specify returning inherited property names.\n * @returns {Array} Returns the array of property names.\n */\nfunction arrayLikeKeys(value, inherited) {\n  var isArr = isArray(value),\n      isArg = !isArr && isArguments(value),\n      isBuff = !isArr && !isArg && isBuffer(value),\n      isType = !isArr && !isArg && !isBuff && isTypedArray(value),\n      skipIndexes = isArr || isArg || isBuff || isType,\n      result = skipIndexes ? baseTimes(value.length, String) : [],\n      length = result.length;\n\n  for (var key in value) {\n    if ((inherited || hasOwnProperty.call(value, key)) &&\n        !(skipIndexes && (\n           // Safari 9 has enumerable `arguments.length` in strict mode.\n           key == 'length' ||\n           // Node.js 0.10 has enumerable non-index properties on buffers.\n           (isBuff && (key == 'offset' || key == 'parent')) ||\n           // PhantomJS 2 has enumerable non-index properties on typed arrays.\n           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||\n           // Skip index properties.\n           isIndex(key, length)\n        ))) {\n      result.push(key);\n    }\n  }\n  return result;\n}\n\nmodule.exports = arrayLikeKeys;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_arrayLikeKeys.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayMap.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_arrayMap.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A specialized version of `_.map` for arrays without support for iteratee\n * shorthands.\n *\n * @private\n * @param {Array} [array] The array to iterate over.\n * @param {Function} iteratee The function invoked per iteration.\n * @returns {Array} Returns the new mapped array.\n */\nfunction arrayMap(array, iteratee) {\n  var index = -1,\n      length = array == null ? 0 : array.length,\n      result = Array(length);\n\n  while (++index < length) {\n    result[index] = iteratee(array[index], index, array);\n  }\n  return result;\n}\n\nmodule.exports = arrayMap;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_arrayMap.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayPush.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arrayPush.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Appends the elements of `values` to `array`.\n *\n * @private\n * @param {Array} array The array to modify.\n * @param {Array} values The values to append.\n * @returns {Array} Returns `array`.\n */\nfunction arrayPush(array, values) {\n  var index = -1,\n      length = values.length,\n      offset = array.length;\n\n  while (++index < length) {\n    array[offset + index] = values[index];\n  }\n  return array;\n}\n\nmodule.exports = arrayPush;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_arrayPush.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayReduce.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_arrayReduce.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A specialized version of `_.reduce` for arrays without support for\n * iteratee shorthands.\n *\n * @private\n * @param {Array} [array] The array to iterate over.\n * @param {Function} iteratee The function invoked per iteration.\n * @param {*} [accumulator] The initial value.\n * @param {boolean} [initAccum] Specify using the first element of `array` as\n *  the initial value.\n * @returns {*} Returns the accumulated value.\n */\nfunction arrayReduce(array, iteratee, accumulator, initAccum) {\n  var index = -1,\n      length = array == null ? 0 : array.length;\n\n  if (initAccum && length) {\n    accumulator = array[++index];\n  }\n  while (++index < length) {\n    accumulator = iteratee(accumulator, array[index], index, array);\n  }\n  return accumulator;\n}\n\nmodule.exports = arrayReduce;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_arrayReduce.js?");

/***/ }),

/***/ "./node_modules/lodash/_arraySome.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arraySome.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A specialized version of `_.some` for arrays without support for iteratee\n * shorthands.\n *\n * @private\n * @param {Array} [array] The array to iterate over.\n * @param {Function} predicate The function invoked per iteration.\n * @returns {boolean} Returns `true` if any element passes the predicate check,\n *  else `false`.\n */\nfunction arraySome(array, predicate) {\n  var index = -1,\n      length = array == null ? 0 : array.length;\n\n  while (++index < length) {\n    if (predicate(array[index], index, array)) {\n      return true;\n    }\n  }\n  return false;\n}\n\nmodule.exports = arraySome;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_arraySome.js?");

/***/ }),

/***/ "./node_modules/lodash/_assocIndexOf.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_assocIndexOf.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var eq = __webpack_require__(/*! ./eq */ \"./node_modules/lodash/eq.js\");\n\n/**\n * Gets the index at which the `key` is found in `array` of key-value pairs.\n *\n * @private\n * @param {Array} array The array to inspect.\n * @param {*} key The key to search for.\n * @returns {number} Returns the index of the matched value, else `-1`.\n */\nfunction assocIndexOf(array, key) {\n  var length = array.length;\n  while (length--) {\n    if (eq(array[length][0], key)) {\n      return length;\n    }\n  }\n  return -1;\n}\n\nmodule.exports = assocIndexOf;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_assocIndexOf.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseAssignValue.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseAssignValue.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var defineProperty = __webpack_require__(/*! ./_defineProperty */ \"./node_modules/lodash/_defineProperty.js\");\n\n/**\n * The base implementation of `assignValue` and `assignMergeValue` without\n * value checks.\n *\n * @private\n * @param {Object} object The object to modify.\n * @param {string} key The key of the property to assign.\n * @param {*} value The value to assign.\n */\nfunction baseAssignValue(object, key, value) {\n  if (key == '__proto__' && defineProperty) {\n    defineProperty(object, key, {\n      'configurable': true,\n      'enumerable': true,\n      'value': value,\n      'writable': true\n    });\n  } else {\n    object[key] = value;\n  }\n}\n\nmodule.exports = baseAssignValue;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_baseAssignValue.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseCreate.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseCreate.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\");\n\n/** Built-in value references. */\nvar objectCreate = Object.create;\n\n/**\n * The base implementation of `_.create` without support for assigning\n * properties to the created object.\n *\n * @private\n * @param {Object} proto The object to inherit from.\n * @returns {Object} Returns the new object.\n */\nvar baseCreate = (function() {\n  function object() {}\n  return function(proto) {\n    if (!isObject(proto)) {\n      return {};\n    }\n    if (objectCreate) {\n      return objectCreate(proto);\n    }\n    object.prototype = proto;\n    var result = new object;\n    object.prototype = undefined;\n    return result;\n  };\n}());\n\nmodule.exports = baseCreate;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_baseCreate.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseEach.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseEach.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseForOwn = __webpack_require__(/*! ./_baseForOwn */ \"./node_modules/lodash/_baseForOwn.js\"),\n    createBaseEach = __webpack_require__(/*! ./_createBaseEach */ \"./node_modules/lodash/_createBaseEach.js\");\n\n/**\n * The base implementation of `_.forEach` without support for iteratee shorthands.\n *\n * @private\n * @param {Array|Object} collection The collection to iterate over.\n * @param {Function} iteratee The function invoked per iteration.\n * @returns {Array|Object} Returns `collection`.\n */\nvar baseEach = createBaseEach(baseForOwn);\n\nmodule.exports = baseEach;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_baseEach.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseFindIndex.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_baseFindIndex.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The base implementation of `_.findIndex` and `_.findLastIndex` without\n * support for iteratee shorthands.\n *\n * @private\n * @param {Array} array The array to inspect.\n * @param {Function} predicate The function invoked per iteration.\n * @param {number} fromIndex The index to search from.\n * @param {boolean} [fromRight] Specify iterating from right to left.\n * @returns {number} Returns the index of the matched value, else `-1`.\n */\nfunction baseFindIndex(array, predicate, fromIndex, fromRight) {\n  var length = array.length,\n      index = fromIndex + (fromRight ? 1 : -1);\n\n  while ((fromRight ? index-- : ++index < length)) {\n    if (predicate(array[index], index, array)) {\n      return index;\n    }\n  }\n  return -1;\n}\n\nmodule.exports = baseFindIndex;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_baseFindIndex.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseFor.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseFor.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var createBaseFor = __webpack_require__(/*! ./_createBaseFor */ \"./node_modules/lodash/_createBaseFor.js\");\n\n/**\n * The base implementation of `baseForOwn` which iterates over `object`\n * properties returned by `keysFunc` and invokes `iteratee` for each property.\n * Iteratee functions may exit iteration early by explicitly returning `false`.\n *\n * @private\n * @param {Object} object The object to iterate over.\n * @param {Function} iteratee The function invoked per iteration.\n * @param {Function} keysFunc The function to get the keys of `object`.\n * @returns {Object} Returns `object`.\n */\nvar baseFor = createBaseFor();\n\nmodule.exports = baseFor;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_baseFor.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseForOwn.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseForOwn.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseFor = __webpack_require__(/*! ./_baseFor */ \"./node_modules/lodash/_baseFor.js\"),\n    keys = __webpack_require__(/*! ./keys */ \"./node_modules/lodash/keys.js\");\n\n/**\n * The base implementation of `_.forOwn` without support for iteratee shorthands.\n *\n * @private\n * @param {Object} object The object to iterate over.\n * @param {Function} iteratee The function invoked per iteration.\n * @returns {Object} Returns `object`.\n */\nfunction baseForOwn(object, iteratee) {\n  return object && baseFor(object, iteratee, keys);\n}\n\nmodule.exports = baseForOwn;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_baseForOwn.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseGet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var castPath = __webpack_require__(/*! ./_castPath */ \"./node_modules/lodash/_castPath.js\"),\n    toKey = __webpack_require__(/*! ./_toKey */ \"./node_modules/lodash/_toKey.js\");\n\n/**\n * The base implementation of `_.get` without support for default values.\n *\n * @private\n * @param {Object} object The object to query.\n * @param {Array|string} path The path of the property to get.\n * @returns {*} Returns the resolved value.\n */\nfunction baseGet(object, path) {\n  path = castPath(path, object);\n\n  var index = 0,\n      length = path.length;\n\n  while (object != null && index < length) {\n    object = object[toKey(path[index++])];\n  }\n  return (index && index == length) ? object : undefined;\n}\n\nmodule.exports = baseGet;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_baseGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseGetAllKeys.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_baseGetAllKeys.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayPush = __webpack_require__(/*! ./_arrayPush */ \"./node_modules/lodash/_arrayPush.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\");\n\n/**\n * The base implementation of `getAllKeys` and `getAllKeysIn` which uses\n * `keysFunc` and `symbolsFunc` to get the enumerable property names and\n * symbols of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @param {Function} keysFunc The function to get the keys of `object`.\n * @param {Function} symbolsFunc The function to get the symbols of `object`.\n * @returns {Array} Returns the array of property names and symbols.\n */\nfunction baseGetAllKeys(object, keysFunc, symbolsFunc) {\n  var result = keysFunc(object);\n  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));\n}\n\nmodule.exports = baseGetAllKeys;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_baseGetAllKeys.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\"),\n    getRawTag = __webpack_require__(/*! ./_getRawTag */ \"./node_modules/lodash/_getRawTag.js\"),\n    objectToString = __webpack_require__(/*! ./_objectToString */ \"./node_modules/lodash/_objectToString.js\");\n\n/** `Object#toString` result references. */\nvar nullTag = '[object Null]',\n    undefinedTag = '[object Undefined]';\n\n/** Built-in value references. */\nvar symToStringTag = Symbol ? Symbol.toStringTag : undefined;\n\n/**\n * The base implementation of `getTag` without fallbacks for buggy environments.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the `toStringTag`.\n */\nfunction baseGetTag(value) {\n  if (value == null) {\n    return value === undefined ? undefinedTag : nullTag;\n  }\n  return (symToStringTag && symToStringTag in Object(value))\n    ? getRawTag(value)\n    : objectToString(value);\n}\n\nmodule.exports = baseGetTag;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_baseGetTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseHasIn.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseHasIn.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The base implementation of `_.hasIn` without support for deep paths.\n *\n * @private\n * @param {Object} [object] The object to query.\n * @param {Array|string} key The key to check.\n * @returns {boolean} Returns `true` if `key` exists, else `false`.\n */\nfunction baseHasIn(object, key) {\n  return object != null && key in Object(object);\n}\n\nmodule.exports = baseHasIn;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_baseHasIn.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIndexOf.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseIndexOf.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseFindIndex = __webpack_require__(/*! ./_baseFindIndex */ \"./node_modules/lodash/_baseFindIndex.js\"),\n    baseIsNaN = __webpack_require__(/*! ./_baseIsNaN */ \"./node_modules/lodash/_baseIsNaN.js\"),\n    strictIndexOf = __webpack_require__(/*! ./_strictIndexOf */ \"./node_modules/lodash/_strictIndexOf.js\");\n\n/**\n * The base implementation of `_.indexOf` without `fromIndex` bounds checks.\n *\n * @private\n * @param {Array} array The array to inspect.\n * @param {*} value The value to search for.\n * @param {number} fromIndex The index to search from.\n * @returns {number} Returns the index of the matched value, else `-1`.\n */\nfunction baseIndexOf(array, value, fromIndex) {\n  return value === value\n    ? strictIndexOf(array, value, fromIndex)\n    : baseFindIndex(array, baseIsNaN, fromIndex);\n}\n\nmodule.exports = baseIndexOf;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_baseIndexOf.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsArguments.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar argsTag = '[object Arguments]';\n\n/**\n * The base implementation of `_.isArguments`.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an `arguments` object,\n */\nfunction baseIsArguments(value) {\n  return isObjectLike(value) && baseGetTag(value) == argsTag;\n}\n\nmodule.exports = baseIsArguments;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_baseIsArguments.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsEqual.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseIsEqual.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsEqualDeep = __webpack_require__(/*! ./_baseIsEqualDeep */ \"./node_modules/lodash/_baseIsEqualDeep.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/**\n * The base implementation of `_.isEqual` which supports partial comparisons\n * and tracks traversed objects.\n *\n * @private\n * @param {*} value The value to compare.\n * @param {*} other The other value to compare.\n * @param {boolean} bitmask The bitmask flags.\n *  1 - Unordered comparison\n *  2 - Partial comparison\n * @param {Function} [customizer] The function to customize comparisons.\n * @param {Object} [stack] Tracks traversed `value` and `other` objects.\n * @returns {boolean} Returns `true` if the values are equivalent, else `false`.\n */\nfunction baseIsEqual(value, other, bitmask, customizer, stack) {\n  if (value === other) {\n    return true;\n  }\n  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {\n    return value !== value && other !== other;\n  }\n  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);\n}\n\nmodule.exports = baseIsEqual;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_baseIsEqual.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsEqualDeep.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsEqualDeep.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Stack = __webpack_require__(/*! ./_Stack */ \"./node_modules/lodash/_Stack.js\"),\n    equalArrays = __webpack_require__(/*! ./_equalArrays */ \"./node_modules/lodash/_equalArrays.js\"),\n    equalByTag = __webpack_require__(/*! ./_equalByTag */ \"./node_modules/lodash/_equalByTag.js\"),\n    equalObjects = __webpack_require__(/*! ./_equalObjects */ \"./node_modules/lodash/_equalObjects.js\"),\n    getTag = __webpack_require__(/*! ./_getTag */ \"./node_modules/lodash/_getTag.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isBuffer = __webpack_require__(/*! ./isBuffer */ \"./node_modules/lodash/isBuffer.js\"),\n    isTypedArray = __webpack_require__(/*! ./isTypedArray */ \"./node_modules/lodash/isTypedArray.js\");\n\n/** Used to compose bitmasks for value comparisons. */\nvar COMPARE_PARTIAL_FLAG = 1;\n\n/** `Object#toString` result references. */\nvar argsTag = '[object Arguments]',\n    arrayTag = '[object Array]',\n    objectTag = '[object Object]';\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * A specialized version of `baseIsEqual` for arrays and objects which performs\n * deep comparisons and tracks traversed objects enabling objects with circular\n * references to be compared.\n *\n * @private\n * @param {Object} object The object to compare.\n * @param {Object} other The other object to compare.\n * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.\n * @param {Function} customizer The function to customize comparisons.\n * @param {Function} equalFunc The function to determine equivalents of values.\n * @param {Object} [stack] Tracks traversed `object` and `other` objects.\n * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.\n */\nfunction baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {\n  var objIsArr = isArray(object),\n      othIsArr = isArray(other),\n      objTag = objIsArr ? arrayTag : getTag(object),\n      othTag = othIsArr ? arrayTag : getTag(other);\n\n  objTag = objTag == argsTag ? objectTag : objTag;\n  othTag = othTag == argsTag ? objectTag : othTag;\n\n  var objIsObj = objTag == objectTag,\n      othIsObj = othTag == objectTag,\n      isSameTag = objTag == othTag;\n\n  if (isSameTag && isBuffer(object)) {\n    if (!isBuffer(other)) {\n      return false;\n    }\n    objIsArr = true;\n    objIsObj = false;\n  }\n  if (isSameTag && !objIsObj) {\n    stack || (stack = new Stack);\n    return (objIsArr || isTypedArray(object))\n      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)\n      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);\n  }\n  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {\n    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),\n        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');\n\n    if (objIsWrapped || othIsWrapped) {\n      var objUnwrapped = objIsWrapped ? object.value() : object,\n          othUnwrapped = othIsWrapped ? other.value() : other;\n\n      stack || (stack = new Stack);\n      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);\n    }\n  }\n  if (!isSameTag) {\n    return false;\n  }\n  stack || (stack = new Stack);\n  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);\n}\n\nmodule.exports = baseIsEqualDeep;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_baseIsEqualDeep.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsMatch.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseIsMatch.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Stack = __webpack_require__(/*! ./_Stack */ \"./node_modules/lodash/_Stack.js\"),\n    baseIsEqual = __webpack_require__(/*! ./_baseIsEqual */ \"./node_modules/lodash/_baseIsEqual.js\");\n\n/** Used to compose bitmasks for value comparisons. */\nvar COMPARE_PARTIAL_FLAG = 1,\n    COMPARE_UNORDERED_FLAG = 2;\n\n/**\n * The base implementation of `_.isMatch` without support for iteratee shorthands.\n *\n * @private\n * @param {Object} object The object to inspect.\n * @param {Object} source The object of property values to match.\n * @param {Array} matchData The property names, values, and compare flags to match.\n * @param {Function} [customizer] The function to customize comparisons.\n * @returns {boolean} Returns `true` if `object` is a match, else `false`.\n */\nfunction baseIsMatch(object, source, matchData, customizer) {\n  var index = matchData.length,\n      length = index,\n      noCustomizer = !customizer;\n\n  if (object == null) {\n    return !length;\n  }\n  object = Object(object);\n  while (index--) {\n    var data = matchData[index];\n    if ((noCustomizer && data[2])\n          ? data[1] !== object[data[0]]\n          : !(data[0] in object)\n        ) {\n      return false;\n    }\n  }\n  while (++index < length) {\n    data = matchData[index];\n    var key = data[0],\n        objValue = object[key],\n        srcValue = data[1];\n\n    if (noCustomizer && data[2]) {\n      if (objValue === undefined && !(key in object)) {\n        return false;\n      }\n    } else {\n      var stack = new Stack;\n      if (customizer) {\n        var result = customizer(objValue, srcValue, key, object, source, stack);\n      }\n      if (!(result === undefined\n            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)\n            : result\n          )) {\n        return false;\n      }\n    }\n  }\n  return true;\n}\n\nmodule.exports = baseIsMatch;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_baseIsMatch.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsNaN.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseIsNaN.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The base implementation of `_.isNaN` without support for number objects.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.\n */\nfunction baseIsNaN(value) {\n  return value !== value;\n}\n\nmodule.exports = baseIsNaN;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_baseIsNaN.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsNative.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseIsNative.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isFunction = __webpack_require__(/*! ./isFunction */ \"./node_modules/lodash/isFunction.js\"),\n    isMasked = __webpack_require__(/*! ./_isMasked */ \"./node_modules/lodash/_isMasked.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\"),\n    toSource = __webpack_require__(/*! ./_toSource */ \"./node_modules/lodash/_toSource.js\");\n\n/**\n * Used to match `RegExp`\n * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).\n */\nvar reRegExpChar = /[\\\\^$.*+?()[\\]{}|]/g;\n\n/** Used to detect host constructors (Safari). */\nvar reIsHostCtor = /^\\[object .+?Constructor\\]$/;\n\n/** Used for built-in method references. */\nvar funcProto = Function.prototype,\n    objectProto = Object.prototype;\n\n/** Used to resolve the decompiled source of functions. */\nvar funcToString = funcProto.toString;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/** Used to detect if a method is native. */\nvar reIsNative = RegExp('^' +\n  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\\\$&')\n  .replace(/hasOwnProperty|(function).*?(?=\\\\\\()| for .+?(?=\\\\\\])/g, '$1.*?') + '$'\n);\n\n/**\n * The base implementation of `_.isNative` without bad shim checks.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a native function,\n *  else `false`.\n */\nfunction baseIsNative(value) {\n  if (!isObject(value) || isMasked(value)) {\n    return false;\n  }\n  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;\n  return pattern.test(toSource(value));\n}\n\nmodule.exports = baseIsNative;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_baseIsNative.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsTypedArray.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_baseIsTypedArray.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isLength = __webpack_require__(/*! ./isLength */ \"./node_modules/lodash/isLength.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar argsTag = '[object Arguments]',\n    arrayTag = '[object Array]',\n    boolTag = '[object Boolean]',\n    dateTag = '[object Date]',\n    errorTag = '[object Error]',\n    funcTag = '[object Function]',\n    mapTag = '[object Map]',\n    numberTag = '[object Number]',\n    objectTag = '[object Object]',\n    regexpTag = '[object RegExp]',\n    setTag = '[object Set]',\n    stringTag = '[object String]',\n    weakMapTag = '[object WeakMap]';\n\nvar arrayBufferTag = '[object ArrayBuffer]',\n    dataViewTag = '[object DataView]',\n    float32Tag = '[object Float32Array]',\n    float64Tag = '[object Float64Array]',\n    int8Tag = '[object Int8Array]',\n    int16Tag = '[object Int16Array]',\n    int32Tag = '[object Int32Array]',\n    uint8Tag = '[object Uint8Array]',\n    uint8ClampedTag = '[object Uint8ClampedArray]',\n    uint16Tag = '[object Uint16Array]',\n    uint32Tag = '[object Uint32Array]';\n\n/** Used to identify `toStringTag` values of typed arrays. */\nvar typedArrayTags = {};\ntypedArrayTags[float32Tag] = typedArrayTags[float64Tag] =\ntypedArrayTags[int8Tag] = typedArrayTags[int16Tag] =\ntypedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =\ntypedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =\ntypedArrayTags[uint32Tag] = true;\ntypedArrayTags[argsTag] = typedArrayTags[arrayTag] =\ntypedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =\ntypedArrayTags[dataViewTag] = typedArrayTags[dateTag] =\ntypedArrayTags[errorTag] = typedArrayTags[funcTag] =\ntypedArrayTags[mapTag] = typedArrayTags[numberTag] =\ntypedArrayTags[objectTag] = typedArrayTags[regexpTag] =\ntypedArrayTags[setTag] = typedArrayTags[stringTag] =\ntypedArrayTags[weakMapTag] = false;\n\n/**\n * The base implementation of `_.isTypedArray` without Node.js optimizations.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.\n */\nfunction baseIsTypedArray(value) {\n  return isObjectLike(value) &&\n    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];\n}\n\nmodule.exports = baseIsTypedArray;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_baseIsTypedArray.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIteratee.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseIteratee.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseMatches = __webpack_require__(/*! ./_baseMatches */ \"./node_modules/lodash/_baseMatches.js\"),\n    baseMatchesProperty = __webpack_require__(/*! ./_baseMatchesProperty */ \"./node_modules/lodash/_baseMatchesProperty.js\"),\n    identity = __webpack_require__(/*! ./identity */ \"./node_modules/lodash/identity.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    property = __webpack_require__(/*! ./property */ \"./node_modules/lodash/property.js\");\n\n/**\n * The base implementation of `_.iteratee`.\n *\n * @private\n * @param {*} [value=_.identity] The value to convert to an iteratee.\n * @returns {Function} Returns the iteratee.\n */\nfunction baseIteratee(value) {\n  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.\n  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.\n  if (typeof value == 'function') {\n    return value;\n  }\n  if (value == null) {\n    return identity;\n  }\n  if (typeof value == 'object') {\n    return isArray(value)\n      ? baseMatchesProperty(value[0], value[1])\n      : baseMatches(value);\n  }\n  return property(value);\n}\n\nmodule.exports = baseIteratee;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_baseIteratee.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseKeys.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseKeys.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isPrototype = __webpack_require__(/*! ./_isPrototype */ \"./node_modules/lodash/_isPrototype.js\"),\n    nativeKeys = __webpack_require__(/*! ./_nativeKeys */ \"./node_modules/lodash/_nativeKeys.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names.\n */\nfunction baseKeys(object) {\n  if (!isPrototype(object)) {\n    return nativeKeys(object);\n  }\n  var result = [];\n  for (var key in Object(object)) {\n    if (hasOwnProperty.call(object, key) && key != 'constructor') {\n      result.push(key);\n    }\n  }\n  return result;\n}\n\nmodule.exports = baseKeys;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_baseKeys.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseLodash.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseLodash.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The function whose prototype chain sequence wrappers inherit from.\n *\n * @private\n */\nfunction baseLodash() {\n  // No operation performed.\n}\n\nmodule.exports = baseLodash;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_baseLodash.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseMatches.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseMatches.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsMatch = __webpack_require__(/*! ./_baseIsMatch */ \"./node_modules/lodash/_baseIsMatch.js\"),\n    getMatchData = __webpack_require__(/*! ./_getMatchData */ \"./node_modules/lodash/_getMatchData.js\"),\n    matchesStrictComparable = __webpack_require__(/*! ./_matchesStrictComparable */ \"./node_modules/lodash/_matchesStrictComparable.js\");\n\n/**\n * The base implementation of `_.matches` which doesn't clone `source`.\n *\n * @private\n * @param {Object} source The object of property values to match.\n * @returns {Function} Returns the new spec function.\n */\nfunction baseMatches(source) {\n  var matchData = getMatchData(source);\n  if (matchData.length == 1 && matchData[0][2]) {\n    return matchesStrictComparable(matchData[0][0], matchData[0][1]);\n  }\n  return function(object) {\n    return object === source || baseIsMatch(object, source, matchData);\n  };\n}\n\nmodule.exports = baseMatches;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_baseMatches.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseMatchesProperty.js":
/*!*****************************************************!*\
  !*** ./node_modules/lodash/_baseMatchesProperty.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsEqual = __webpack_require__(/*! ./_baseIsEqual */ \"./node_modules/lodash/_baseIsEqual.js\"),\n    get = __webpack_require__(/*! ./get */ \"./node_modules/lodash/get.js\"),\n    hasIn = __webpack_require__(/*! ./hasIn */ \"./node_modules/lodash/hasIn.js\"),\n    isKey = __webpack_require__(/*! ./_isKey */ \"./node_modules/lodash/_isKey.js\"),\n    isStrictComparable = __webpack_require__(/*! ./_isStrictComparable */ \"./node_modules/lodash/_isStrictComparable.js\"),\n    matchesStrictComparable = __webpack_require__(/*! ./_matchesStrictComparable */ \"./node_modules/lodash/_matchesStrictComparable.js\"),\n    toKey = __webpack_require__(/*! ./_toKey */ \"./node_modules/lodash/_toKey.js\");\n\n/** Used to compose bitmasks for value comparisons. */\nvar COMPARE_PARTIAL_FLAG = 1,\n    COMPARE_UNORDERED_FLAG = 2;\n\n/**\n * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.\n *\n * @private\n * @param {string} path The path of the property to get.\n * @param {*} srcValue The value to match.\n * @returns {Function} Returns the new spec function.\n */\nfunction baseMatchesProperty(path, srcValue) {\n  if (isKey(path) && isStrictComparable(srcValue)) {\n    return matchesStrictComparable(toKey(path), srcValue);\n  }\n  return function(object) {\n    var objValue = get(object, path);\n    return (objValue === undefined && objValue === srcValue)\n      ? hasIn(object, path)\n      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);\n  };\n}\n\nmodule.exports = baseMatchesProperty;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_baseMatchesProperty.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseProperty.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseProperty.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The base implementation of `_.property` without support for deep paths.\n *\n * @private\n * @param {string} key The key of the property to get.\n * @returns {Function} Returns the new accessor function.\n */\nfunction baseProperty(key) {\n  return function(object) {\n    return object == null ? undefined : object[key];\n  };\n}\n\nmodule.exports = baseProperty;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_baseProperty.js?");

/***/ }),

/***/ "./node_modules/lodash/_basePropertyDeep.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_basePropertyDeep.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGet = __webpack_require__(/*! ./_baseGet */ \"./node_modules/lodash/_baseGet.js\");\n\n/**\n * A specialized version of `baseProperty` which supports deep paths.\n *\n * @private\n * @param {Array|string} path The path of the property to get.\n * @returns {Function} Returns the new accessor function.\n */\nfunction basePropertyDeep(path) {\n  return function(object) {\n    return baseGet(object, path);\n  };\n}\n\nmodule.exports = basePropertyDeep;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_basePropertyDeep.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseReduce.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseReduce.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The base implementation of `_.reduce` and `_.reduceRight`, without support\n * for iteratee shorthands, which iterates over `collection` using `eachFunc`.\n *\n * @private\n * @param {Array|Object} collection The collection to iterate over.\n * @param {Function} iteratee The function invoked per iteration.\n * @param {*} accumulator The initial value.\n * @param {boolean} initAccum Specify using the first or last element of\n *  `collection` as the initial value.\n * @param {Function} eachFunc The function to iterate over `collection`.\n * @returns {*} Returns the accumulated value.\n */\nfunction baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {\n  eachFunc(collection, function(value, index, collection) {\n    accumulator = initAccum\n      ? (initAccum = false, value)\n      : iteratee(accumulator, value, index, collection);\n  });\n  return accumulator;\n}\n\nmodule.exports = baseReduce;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_baseReduce.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseSetData.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseSetData.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var identity = __webpack_require__(/*! ./identity */ \"./node_modules/lodash/identity.js\"),\n    metaMap = __webpack_require__(/*! ./_metaMap */ \"./node_modules/lodash/_metaMap.js\");\n\n/**\n * The base implementation of `setData` without support for hot loop shorting.\n *\n * @private\n * @param {Function} func The function to associate metadata with.\n * @param {*} data The metadata.\n * @returns {Function} Returns `func`.\n */\nvar baseSetData = !metaMap ? identity : function(func, data) {\n  metaMap.set(func, data);\n  return func;\n};\n\nmodule.exports = baseSetData;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_baseSetData.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseSetToString.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseSetToString.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var constant = __webpack_require__(/*! ./constant */ \"./node_modules/lodash/constant.js\"),\n    defineProperty = __webpack_require__(/*! ./_defineProperty */ \"./node_modules/lodash/_defineProperty.js\"),\n    identity = __webpack_require__(/*! ./identity */ \"./node_modules/lodash/identity.js\");\n\n/**\n * The base implementation of `setToString` without support for hot loop shorting.\n *\n * @private\n * @param {Function} func The function to modify.\n * @param {Function} string The `toString` result.\n * @returns {Function} Returns `func`.\n */\nvar baseSetToString = !defineProperty ? identity : function(func, string) {\n  return defineProperty(func, 'toString', {\n    'configurable': true,\n    'enumerable': false,\n    'value': constant(string),\n    'writable': true\n  });\n};\n\nmodule.exports = baseSetToString;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_baseSetToString.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseTimes.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseTimes.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The base implementation of `_.times` without support for iteratee shorthands\n * or max array length checks.\n *\n * @private\n * @param {number} n The number of times to invoke `iteratee`.\n * @param {Function} iteratee The function invoked per iteration.\n * @returns {Array} Returns the array of results.\n */\nfunction baseTimes(n, iteratee) {\n  var index = -1,\n      result = Array(n);\n\n  while (++index < n) {\n    result[index] = iteratee(index);\n  }\n  return result;\n}\n\nmodule.exports = baseTimes;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_baseTimes.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseToString.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseToString.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\"),\n    arrayMap = __webpack_require__(/*! ./_arrayMap */ \"./node_modules/lodash/_arrayMap.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isSymbol = __webpack_require__(/*! ./isSymbol */ \"./node_modules/lodash/isSymbol.js\");\n\n/** Used as references for various `Number` constants. */\nvar INFINITY = 1 / 0;\n\n/** Used to convert symbols to primitives and strings. */\nvar symbolProto = Symbol ? Symbol.prototype : undefined,\n    symbolToString = symbolProto ? symbolProto.toString : undefined;\n\n/**\n * The base implementation of `_.toString` which doesn't convert nullish\n * values to empty strings.\n *\n * @private\n * @param {*} value The value to process.\n * @returns {string} Returns the string.\n */\nfunction baseToString(value) {\n  // Exit early for strings to avoid a performance hit in some environments.\n  if (typeof value == 'string') {\n    return value;\n  }\n  if (isArray(value)) {\n    // Recursively convert values (susceptible to call stack limits).\n    return arrayMap(value, baseToString) + '';\n  }\n  if (isSymbol(value)) {\n    return symbolToString ? symbolToString.call(value) : '';\n  }\n  var result = (value + '');\n  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;\n}\n\nmodule.exports = baseToString;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_baseToString.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseUnary.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseUnary.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The base implementation of `_.unary` without support for storing metadata.\n *\n * @private\n * @param {Function} func The function to cap arguments for.\n * @returns {Function} Returns the new capped function.\n */\nfunction baseUnary(func) {\n  return function(value) {\n    return func(value);\n  };\n}\n\nmodule.exports = baseUnary;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_baseUnary.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseUniq.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseUniq.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var SetCache = __webpack_require__(/*! ./_SetCache */ \"./node_modules/lodash/_SetCache.js\"),\n    arrayIncludes = __webpack_require__(/*! ./_arrayIncludes */ \"./node_modules/lodash/_arrayIncludes.js\"),\n    arrayIncludesWith = __webpack_require__(/*! ./_arrayIncludesWith */ \"./node_modules/lodash/_arrayIncludesWith.js\"),\n    cacheHas = __webpack_require__(/*! ./_cacheHas */ \"./node_modules/lodash/_cacheHas.js\"),\n    createSet = __webpack_require__(/*! ./_createSet */ \"./node_modules/lodash/_createSet.js\"),\n    setToArray = __webpack_require__(/*! ./_setToArray */ \"./node_modules/lodash/_setToArray.js\");\n\n/** Used as the size to enable large array optimizations. */\nvar LARGE_ARRAY_SIZE = 200;\n\n/**\n * The base implementation of `_.uniqBy` without support for iteratee shorthands.\n *\n * @private\n * @param {Array} array The array to inspect.\n * @param {Function} [iteratee] The iteratee invoked per element.\n * @param {Function} [comparator] The comparator invoked per element.\n * @returns {Array} Returns the new duplicate free array.\n */\nfunction baseUniq(array, iteratee, comparator) {\n  var index = -1,\n      includes = arrayIncludes,\n      length = array.length,\n      isCommon = true,\n      result = [],\n      seen = result;\n\n  if (comparator) {\n    isCommon = false;\n    includes = arrayIncludesWith;\n  }\n  else if (length >= LARGE_ARRAY_SIZE) {\n    var set = iteratee ? null : createSet(array);\n    if (set) {\n      return setToArray(set);\n    }\n    isCommon = false;\n    includes = cacheHas;\n    seen = new SetCache;\n  }\n  else {\n    seen = iteratee ? [] : result;\n  }\n  outer:\n  while (++index < length) {\n    var value = array[index],\n        computed = iteratee ? iteratee(value) : value;\n\n    value = (comparator || value !== 0) ? value : 0;\n    if (isCommon && computed === computed) {\n      var seenIndex = seen.length;\n      while (seenIndex--) {\n        if (seen[seenIndex] === computed) {\n          continue outer;\n        }\n      }\n      if (iteratee) {\n        seen.push(computed);\n      }\n      result.push(value);\n    }\n    else if (!includes(seen, computed, comparator)) {\n      if (seen !== result) {\n        seen.push(computed);\n      }\n      result.push(value);\n    }\n  }\n  return result;\n}\n\nmodule.exports = baseUniq;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_baseUniq.js?");

/***/ }),

/***/ "./node_modules/lodash/_cacheHas.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_cacheHas.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if a `cache` value for `key` exists.\n *\n * @private\n * @param {Object} cache The cache to query.\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction cacheHas(cache, key) {\n  return cache.has(key);\n}\n\nmodule.exports = cacheHas;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_cacheHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_castFunction.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_castFunction.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var identity = __webpack_require__(/*! ./identity */ \"./node_modules/lodash/identity.js\");\n\n/**\n * Casts `value` to `identity` if it's not a function.\n *\n * @private\n * @param {*} value The value to inspect.\n * @returns {Function} Returns cast function.\n */\nfunction castFunction(value) {\n  return typeof value == 'function' ? value : identity;\n}\n\nmodule.exports = castFunction;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_castFunction.js?");

/***/ }),

/***/ "./node_modules/lodash/_castPath.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_castPath.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isKey = __webpack_require__(/*! ./_isKey */ \"./node_modules/lodash/_isKey.js\"),\n    stringToPath = __webpack_require__(/*! ./_stringToPath */ \"./node_modules/lodash/_stringToPath.js\"),\n    toString = __webpack_require__(/*! ./toString */ \"./node_modules/lodash/toString.js\");\n\n/**\n * Casts `value` to a path array if it's not one.\n *\n * @private\n * @param {*} value The value to inspect.\n * @param {Object} [object] The object to query keys on.\n * @returns {Array} Returns the cast property path array.\n */\nfunction castPath(value, object) {\n  if (isArray(value)) {\n    return value;\n  }\n  return isKey(value, object) ? [value] : stringToPath(toString(value));\n}\n\nmodule.exports = castPath;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_castPath.js?");

/***/ }),

/***/ "./node_modules/lodash/_composeArgs.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_composeArgs.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeMax = Math.max;\n\n/**\n * Creates an array that is the composition of partially applied arguments,\n * placeholders, and provided arguments into a single array of arguments.\n *\n * @private\n * @param {Array} args The provided arguments.\n * @param {Array} partials The arguments to prepend to those provided.\n * @param {Array} holders The `partials` placeholder indexes.\n * @params {boolean} [isCurried] Specify composing for a curried function.\n * @returns {Array} Returns the new array of composed arguments.\n */\nfunction composeArgs(args, partials, holders, isCurried) {\n  var argsIndex = -1,\n      argsLength = args.length,\n      holdersLength = holders.length,\n      leftIndex = -1,\n      leftLength = partials.length,\n      rangeLength = nativeMax(argsLength - holdersLength, 0),\n      result = Array(leftLength + rangeLength),\n      isUncurried = !isCurried;\n\n  while (++leftIndex < leftLength) {\n    result[leftIndex] = partials[leftIndex];\n  }\n  while (++argsIndex < holdersLength) {\n    if (isUncurried || argsIndex < argsLength) {\n      result[holders[argsIndex]] = args[argsIndex];\n    }\n  }\n  while (rangeLength--) {\n    result[leftIndex++] = args[argsIndex++];\n  }\n  return result;\n}\n\nmodule.exports = composeArgs;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_composeArgs.js?");

/***/ }),

/***/ "./node_modules/lodash/_composeArgsRight.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_composeArgsRight.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeMax = Math.max;\n\n/**\n * This function is like `composeArgs` except that the arguments composition\n * is tailored for `_.partialRight`.\n *\n * @private\n * @param {Array} args The provided arguments.\n * @param {Array} partials The arguments to append to those provided.\n * @param {Array} holders The `partials` placeholder indexes.\n * @params {boolean} [isCurried] Specify composing for a curried function.\n * @returns {Array} Returns the new array of composed arguments.\n */\nfunction composeArgsRight(args, partials, holders, isCurried) {\n  var argsIndex = -1,\n      argsLength = args.length,\n      holdersIndex = -1,\n      holdersLength = holders.length,\n      rightIndex = -1,\n      rightLength = partials.length,\n      rangeLength = nativeMax(argsLength - holdersLength, 0),\n      result = Array(rangeLength + rightLength),\n      isUncurried = !isCurried;\n\n  while (++argsIndex < rangeLength) {\n    result[argsIndex] = args[argsIndex];\n  }\n  var offset = argsIndex;\n  while (++rightIndex < rightLength) {\n    result[offset + rightIndex] = partials[rightIndex];\n  }\n  while (++holdersIndex < holdersLength) {\n    if (isUncurried || argsIndex < argsLength) {\n      result[offset + holders[holdersIndex]] = args[argsIndex++];\n    }\n  }\n  return result;\n}\n\nmodule.exports = composeArgsRight;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_composeArgsRight.js?");

/***/ }),

/***/ "./node_modules/lodash/_copyArray.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_copyArray.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Copies the values of `source` to `array`.\n *\n * @private\n * @param {Array} source The array to copy values from.\n * @param {Array} [array=[]] The array to copy values to.\n * @returns {Array} Returns `array`.\n */\nfunction copyArray(source, array) {\n  var index = -1,\n      length = source.length;\n\n  array || (array = Array(length));\n  while (++index < length) {\n    array[index] = source[index];\n  }\n  return array;\n}\n\nmodule.exports = copyArray;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_copyArray.js?");

/***/ }),

/***/ "./node_modules/lodash/_coreJsData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_coreJsData.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/** Used to detect overreaching core-js shims. */\nvar coreJsData = root['__core-js_shared__'];\n\nmodule.exports = coreJsData;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_coreJsData.js?");

/***/ }),

/***/ "./node_modules/lodash/_countHolders.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_countHolders.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Gets the number of `placeholder` occurrences in `array`.\n *\n * @private\n * @param {Array} array The array to inspect.\n * @param {*} placeholder The placeholder to search for.\n * @returns {number} Returns the placeholder count.\n */\nfunction countHolders(array, placeholder) {\n  var length = array.length,\n      result = 0;\n\n  while (length--) {\n    if (array[length] === placeholder) {\n      ++result;\n    }\n  }\n  return result;\n}\n\nmodule.exports = countHolders;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_countHolders.js?");

/***/ }),

/***/ "./node_modules/lodash/_createBaseEach.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_createBaseEach.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isArrayLike = __webpack_require__(/*! ./isArrayLike */ \"./node_modules/lodash/isArrayLike.js\");\n\n/**\n * Creates a `baseEach` or `baseEachRight` function.\n *\n * @private\n * @param {Function} eachFunc The function to iterate over a collection.\n * @param {boolean} [fromRight] Specify iterating from right to left.\n * @returns {Function} Returns the new base function.\n */\nfunction createBaseEach(eachFunc, fromRight) {\n  return function(collection, iteratee) {\n    if (collection == null) {\n      return collection;\n    }\n    if (!isArrayLike(collection)) {\n      return eachFunc(collection, iteratee);\n    }\n    var length = collection.length,\n        index = fromRight ? length : -1,\n        iterable = Object(collection);\n\n    while ((fromRight ? index-- : ++index < length)) {\n      if (iteratee(iterable[index], index, iterable) === false) {\n        break;\n      }\n    }\n    return collection;\n  };\n}\n\nmodule.exports = createBaseEach;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_createBaseEach.js?");

/***/ }),

/***/ "./node_modules/lodash/_createBaseFor.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_createBaseFor.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Creates a base function for methods like `_.forIn` and `_.forOwn`.\n *\n * @private\n * @param {boolean} [fromRight] Specify iterating from right to left.\n * @returns {Function} Returns the new base function.\n */\nfunction createBaseFor(fromRight) {\n  return function(object, iteratee, keysFunc) {\n    var index = -1,\n        iterable = Object(object),\n        props = keysFunc(object),\n        length = props.length;\n\n    while (length--) {\n      var key = props[fromRight ? length : ++index];\n      if (iteratee(iterable[key], key, iterable) === false) {\n        break;\n      }\n    }\n    return object;\n  };\n}\n\nmodule.exports = createBaseFor;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_createBaseFor.js?");

/***/ }),

/***/ "./node_modules/lodash/_createBind.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_createBind.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var createCtor = __webpack_require__(/*! ./_createCtor */ \"./node_modules/lodash/_createCtor.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/** Used to compose bitmasks for function metadata. */\nvar WRAP_BIND_FLAG = 1;\n\n/**\n * Creates a function that wraps `func` to invoke it with the optional `this`\n * binding of `thisArg`.\n *\n * @private\n * @param {Function} func The function to wrap.\n * @param {number} bitmask The bitmask flags. See `createWrap` for more details.\n * @param {*} [thisArg] The `this` binding of `func`.\n * @returns {Function} Returns the new wrapped function.\n */\nfunction createBind(func, bitmask, thisArg) {\n  var isBind = bitmask & WRAP_BIND_FLAG,\n      Ctor = createCtor(func);\n\n  function wrapper() {\n    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;\n    return fn.apply(isBind ? thisArg : this, arguments);\n  }\n  return wrapper;\n}\n\nmodule.exports = createBind;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_createBind.js?");

/***/ }),

/***/ "./node_modules/lodash/_createCtor.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_createCtor.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseCreate = __webpack_require__(/*! ./_baseCreate */ \"./node_modules/lodash/_baseCreate.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\");\n\n/**\n * Creates a function that produces an instance of `Ctor` regardless of\n * whether it was invoked as part of a `new` expression or by `call` or `apply`.\n *\n * @private\n * @param {Function} Ctor The constructor to wrap.\n * @returns {Function} Returns the new wrapped function.\n */\nfunction createCtor(Ctor) {\n  return function() {\n    // Use a `switch` statement to work with class constructors. See\n    // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist\n    // for more details.\n    var args = arguments;\n    switch (args.length) {\n      case 0: return new Ctor;\n      case 1: return new Ctor(args[0]);\n      case 2: return new Ctor(args[0], args[1]);\n      case 3: return new Ctor(args[0], args[1], args[2]);\n      case 4: return new Ctor(args[0], args[1], args[2], args[3]);\n      case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);\n      case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);\n      case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);\n    }\n    var thisBinding = baseCreate(Ctor.prototype),\n        result = Ctor.apply(thisBinding, args);\n\n    // Mimic the constructor's `return` behavior.\n    // See https://es5.github.io/#x13.2.2 for more details.\n    return isObject(result) ? result : thisBinding;\n  };\n}\n\nmodule.exports = createCtor;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_createCtor.js?");

/***/ }),

/***/ "./node_modules/lodash/_createCurry.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_createCurry.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var apply = __webpack_require__(/*! ./_apply */ \"./node_modules/lodash/_apply.js\"),\n    createCtor = __webpack_require__(/*! ./_createCtor */ \"./node_modules/lodash/_createCtor.js\"),\n    createHybrid = __webpack_require__(/*! ./_createHybrid */ \"./node_modules/lodash/_createHybrid.js\"),\n    createRecurry = __webpack_require__(/*! ./_createRecurry */ \"./node_modules/lodash/_createRecurry.js\"),\n    getHolder = __webpack_require__(/*! ./_getHolder */ \"./node_modules/lodash/_getHolder.js\"),\n    replaceHolders = __webpack_require__(/*! ./_replaceHolders */ \"./node_modules/lodash/_replaceHolders.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/**\n * Creates a function that wraps `func` to enable currying.\n *\n * @private\n * @param {Function} func The function to wrap.\n * @param {number} bitmask The bitmask flags. See `createWrap` for more details.\n * @param {number} arity The arity of `func`.\n * @returns {Function} Returns the new wrapped function.\n */\nfunction createCurry(func, bitmask, arity) {\n  var Ctor = createCtor(func);\n\n  function wrapper() {\n    var length = arguments.length,\n        args = Array(length),\n        index = length,\n        placeholder = getHolder(wrapper);\n\n    while (index--) {\n      args[index] = arguments[index];\n    }\n    var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)\n      ? []\n      : replaceHolders(args, placeholder);\n\n    length -= holders.length;\n    if (length < arity) {\n      return createRecurry(\n        func, bitmask, createHybrid, wrapper.placeholder, undefined,\n        args, holders, undefined, undefined, arity - length);\n    }\n    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;\n    return apply(fn, this, args);\n  }\n  return wrapper;\n}\n\nmodule.exports = createCurry;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_createCurry.js?");

/***/ }),

/***/ "./node_modules/lodash/_createFind.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_createFind.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIteratee = __webpack_require__(/*! ./_baseIteratee */ \"./node_modules/lodash/_baseIteratee.js\"),\n    isArrayLike = __webpack_require__(/*! ./isArrayLike */ \"./node_modules/lodash/isArrayLike.js\"),\n    keys = __webpack_require__(/*! ./keys */ \"./node_modules/lodash/keys.js\");\n\n/**\n * Creates a `_.find` or `_.findLast` function.\n *\n * @private\n * @param {Function} findIndexFunc The function to find the collection index.\n * @returns {Function} Returns the new find function.\n */\nfunction createFind(findIndexFunc) {\n  return function(collection, predicate, fromIndex) {\n    var iterable = Object(collection);\n    if (!isArrayLike(collection)) {\n      var iteratee = baseIteratee(predicate, 3);\n      collection = keys(collection);\n      predicate = function(key) { return iteratee(iterable[key], key, iterable); };\n    }\n    var index = findIndexFunc(collection, predicate, fromIndex);\n    return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;\n  };\n}\n\nmodule.exports = createFind;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_createFind.js?");

/***/ }),

/***/ "./node_modules/lodash/_createHybrid.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_createHybrid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var composeArgs = __webpack_require__(/*! ./_composeArgs */ \"./node_modules/lodash/_composeArgs.js\"),\n    composeArgsRight = __webpack_require__(/*! ./_composeArgsRight */ \"./node_modules/lodash/_composeArgsRight.js\"),\n    countHolders = __webpack_require__(/*! ./_countHolders */ \"./node_modules/lodash/_countHolders.js\"),\n    createCtor = __webpack_require__(/*! ./_createCtor */ \"./node_modules/lodash/_createCtor.js\"),\n    createRecurry = __webpack_require__(/*! ./_createRecurry */ \"./node_modules/lodash/_createRecurry.js\"),\n    getHolder = __webpack_require__(/*! ./_getHolder */ \"./node_modules/lodash/_getHolder.js\"),\n    reorder = __webpack_require__(/*! ./_reorder */ \"./node_modules/lodash/_reorder.js\"),\n    replaceHolders = __webpack_require__(/*! ./_replaceHolders */ \"./node_modules/lodash/_replaceHolders.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/** Used to compose bitmasks for function metadata. */\nvar WRAP_BIND_FLAG = 1,\n    WRAP_BIND_KEY_FLAG = 2,\n    WRAP_CURRY_FLAG = 8,\n    WRAP_CURRY_RIGHT_FLAG = 16,\n    WRAP_ARY_FLAG = 128,\n    WRAP_FLIP_FLAG = 512;\n\n/**\n * Creates a function that wraps `func` to invoke it with optional `this`\n * binding of `thisArg`, partial application, and currying.\n *\n * @private\n * @param {Function|string} func The function or method name to wrap.\n * @param {number} bitmask The bitmask flags. See `createWrap` for more details.\n * @param {*} [thisArg] The `this` binding of `func`.\n * @param {Array} [partials] The arguments to prepend to those provided to\n *  the new function.\n * @param {Array} [holders] The `partials` placeholder indexes.\n * @param {Array} [partialsRight] The arguments to append to those provided\n *  to the new function.\n * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.\n * @param {Array} [argPos] The argument positions of the new function.\n * @param {number} [ary] The arity cap of `func`.\n * @param {number} [arity] The arity of `func`.\n * @returns {Function} Returns the new wrapped function.\n */\nfunction createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {\n  var isAry = bitmask & WRAP_ARY_FLAG,\n      isBind = bitmask & WRAP_BIND_FLAG,\n      isBindKey = bitmask & WRAP_BIND_KEY_FLAG,\n      isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG),\n      isFlip = bitmask & WRAP_FLIP_FLAG,\n      Ctor = isBindKey ? undefined : createCtor(func);\n\n  function wrapper() {\n    var length = arguments.length,\n        args = Array(length),\n        index = length;\n\n    while (index--) {\n      args[index] = arguments[index];\n    }\n    if (isCurried) {\n      var placeholder = getHolder(wrapper),\n          holdersCount = countHolders(args, placeholder);\n    }\n    if (partials) {\n      args = composeArgs(args, partials, holders, isCurried);\n    }\n    if (partialsRight) {\n      args = composeArgsRight(args, partialsRight, holdersRight, isCurried);\n    }\n    length -= holdersCount;\n    if (isCurried && length < arity) {\n      var newHolders = replaceHolders(args, placeholder);\n      return createRecurry(\n        func, bitmask, createHybrid, wrapper.placeholder, thisArg,\n        args, newHolders, argPos, ary, arity - length\n      );\n    }\n    var thisBinding = isBind ? thisArg : this,\n        fn = isBindKey ? thisBinding[func] : func;\n\n    length = args.length;\n    if (argPos) {\n      args = reorder(args, argPos);\n    } else if (isFlip && length > 1) {\n      args.reverse();\n    }\n    if (isAry && ary < length) {\n      args.length = ary;\n    }\n    if (this && this !== root && this instanceof wrapper) {\n      fn = Ctor || createCtor(fn);\n    }\n    return fn.apply(thisBinding, args);\n  }\n  return wrapper;\n}\n\nmodule.exports = createHybrid;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_createHybrid.js?");

/***/ }),

/***/ "./node_modules/lodash/_createPartial.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_createPartial.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var apply = __webpack_require__(/*! ./_apply */ \"./node_modules/lodash/_apply.js\"),\n    createCtor = __webpack_require__(/*! ./_createCtor */ \"./node_modules/lodash/_createCtor.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/** Used to compose bitmasks for function metadata. */\nvar WRAP_BIND_FLAG = 1;\n\n/**\n * Creates a function that wraps `func` to invoke it with the `this` binding\n * of `thisArg` and `partials` prepended to the arguments it receives.\n *\n * @private\n * @param {Function} func The function to wrap.\n * @param {number} bitmask The bitmask flags. See `createWrap` for more details.\n * @param {*} thisArg The `this` binding of `func`.\n * @param {Array} partials The arguments to prepend to those provided to\n *  the new function.\n * @returns {Function} Returns the new wrapped function.\n */\nfunction createPartial(func, bitmask, thisArg, partials) {\n  var isBind = bitmask & WRAP_BIND_FLAG,\n      Ctor = createCtor(func);\n\n  function wrapper() {\n    var argsIndex = -1,\n        argsLength = arguments.length,\n        leftIndex = -1,\n        leftLength = partials.length,\n        args = Array(leftLength + argsLength),\n        fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;\n\n    while (++leftIndex < leftLength) {\n      args[leftIndex] = partials[leftIndex];\n    }\n    while (argsLength--) {\n      args[leftIndex++] = arguments[++argsIndex];\n    }\n    return apply(fn, isBind ? thisArg : this, args);\n  }\n  return wrapper;\n}\n\nmodule.exports = createPartial;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_createPartial.js?");

/***/ }),

/***/ "./node_modules/lodash/_createRecurry.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_createRecurry.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isLaziable = __webpack_require__(/*! ./_isLaziable */ \"./node_modules/lodash/_isLaziable.js\"),\n    setData = __webpack_require__(/*! ./_setData */ \"./node_modules/lodash/_setData.js\"),\n    setWrapToString = __webpack_require__(/*! ./_setWrapToString */ \"./node_modules/lodash/_setWrapToString.js\");\n\n/** Used to compose bitmasks for function metadata. */\nvar WRAP_BIND_FLAG = 1,\n    WRAP_BIND_KEY_FLAG = 2,\n    WRAP_CURRY_BOUND_FLAG = 4,\n    WRAP_CURRY_FLAG = 8,\n    WRAP_PARTIAL_FLAG = 32,\n    WRAP_PARTIAL_RIGHT_FLAG = 64;\n\n/**\n * Creates a function that wraps `func` to continue currying.\n *\n * @private\n * @param {Function} func The function to wrap.\n * @param {number} bitmask The bitmask flags. See `createWrap` for more details.\n * @param {Function} wrapFunc The function to create the `func` wrapper.\n * @param {*} placeholder The placeholder value.\n * @param {*} [thisArg] The `this` binding of `func`.\n * @param {Array} [partials] The arguments to prepend to those provided to\n *  the new function.\n * @param {Array} [holders] The `partials` placeholder indexes.\n * @param {Array} [argPos] The argument positions of the new function.\n * @param {number} [ary] The arity cap of `func`.\n * @param {number} [arity] The arity of `func`.\n * @returns {Function} Returns the new wrapped function.\n */\nfunction createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {\n  var isCurry = bitmask & WRAP_CURRY_FLAG,\n      newHolders = isCurry ? holders : undefined,\n      newHoldersRight = isCurry ? undefined : holders,\n      newPartials = isCurry ? partials : undefined,\n      newPartialsRight = isCurry ? undefined : partials;\n\n  bitmask |= (isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG);\n  bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);\n\n  if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {\n    bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);\n  }\n  var newData = [\n    func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,\n    newHoldersRight, argPos, ary, arity\n  ];\n\n  var result = wrapFunc.apply(undefined, newData);\n  if (isLaziable(func)) {\n    setData(result, newData);\n  }\n  result.placeholder = placeholder;\n  return setWrapToString(result, func, bitmask);\n}\n\nmodule.exports = createRecurry;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_createRecurry.js?");

/***/ }),

/***/ "./node_modules/lodash/_createSet.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_createSet.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Set = __webpack_require__(/*! ./_Set */ \"./node_modules/lodash/_Set.js\"),\n    noop = __webpack_require__(/*! ./noop */ \"./node_modules/lodash/noop.js\"),\n    setToArray = __webpack_require__(/*! ./_setToArray */ \"./node_modules/lodash/_setToArray.js\");\n\n/** Used as references for various `Number` constants. */\nvar INFINITY = 1 / 0;\n\n/**\n * Creates a set object of `values`.\n *\n * @private\n * @param {Array} values The values to add to the set.\n * @returns {Object} Returns the new set.\n */\nvar createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {\n  return new Set(values);\n};\n\nmodule.exports = createSet;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_createSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_createWrap.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_createWrap.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseSetData = __webpack_require__(/*! ./_baseSetData */ \"./node_modules/lodash/_baseSetData.js\"),\n    createBind = __webpack_require__(/*! ./_createBind */ \"./node_modules/lodash/_createBind.js\"),\n    createCurry = __webpack_require__(/*! ./_createCurry */ \"./node_modules/lodash/_createCurry.js\"),\n    createHybrid = __webpack_require__(/*! ./_createHybrid */ \"./node_modules/lodash/_createHybrid.js\"),\n    createPartial = __webpack_require__(/*! ./_createPartial */ \"./node_modules/lodash/_createPartial.js\"),\n    getData = __webpack_require__(/*! ./_getData */ \"./node_modules/lodash/_getData.js\"),\n    mergeData = __webpack_require__(/*! ./_mergeData */ \"./node_modules/lodash/_mergeData.js\"),\n    setData = __webpack_require__(/*! ./_setData */ \"./node_modules/lodash/_setData.js\"),\n    setWrapToString = __webpack_require__(/*! ./_setWrapToString */ \"./node_modules/lodash/_setWrapToString.js\"),\n    toInteger = __webpack_require__(/*! ./toInteger */ \"./node_modules/lodash/toInteger.js\");\n\n/** Error message constants. */\nvar FUNC_ERROR_TEXT = 'Expected a function';\n\n/** Used to compose bitmasks for function metadata. */\nvar WRAP_BIND_FLAG = 1,\n    WRAP_BIND_KEY_FLAG = 2,\n    WRAP_CURRY_FLAG = 8,\n    WRAP_CURRY_RIGHT_FLAG = 16,\n    WRAP_PARTIAL_FLAG = 32,\n    WRAP_PARTIAL_RIGHT_FLAG = 64;\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeMax = Math.max;\n\n/**\n * Creates a function that either curries or invokes `func` with optional\n * `this` binding and partially applied arguments.\n *\n * @private\n * @param {Function|string} func The function or method name to wrap.\n * @param {number} bitmask The bitmask flags.\n *    1 - `_.bind`\n *    2 - `_.bindKey`\n *    4 - `_.curry` or `_.curryRight` of a bound function\n *    8 - `_.curry`\n *   16 - `_.curryRight`\n *   32 - `_.partial`\n *   64 - `_.partialRight`\n *  128 - `_.rearg`\n *  256 - `_.ary`\n *  512 - `_.flip`\n * @param {*} [thisArg] The `this` binding of `func`.\n * @param {Array} [partials] The arguments to be partially applied.\n * @param {Array} [holders] The `partials` placeholder indexes.\n * @param {Array} [argPos] The argument positions of the new function.\n * @param {number} [ary] The arity cap of `func`.\n * @param {number} [arity] The arity of `func`.\n * @returns {Function} Returns the new wrapped function.\n */\nfunction createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {\n  var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;\n  if (!isBindKey && typeof func != 'function') {\n    throw new TypeError(FUNC_ERROR_TEXT);\n  }\n  var length = partials ? partials.length : 0;\n  if (!length) {\n    bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);\n    partials = holders = undefined;\n  }\n  ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);\n  arity = arity === undefined ? arity : toInteger(arity);\n  length -= holders ? holders.length : 0;\n\n  if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {\n    var partialsRight = partials,\n        holdersRight = holders;\n\n    partials = holders = undefined;\n  }\n  var data = isBindKey ? undefined : getData(func);\n\n  var newData = [\n    func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,\n    argPos, ary, arity\n  ];\n\n  if (data) {\n    mergeData(newData, data);\n  }\n  func = newData[0];\n  bitmask = newData[1];\n  thisArg = newData[2];\n  partials = newData[3];\n  holders = newData[4];\n  arity = newData[9] = newData[9] === undefined\n    ? (isBindKey ? 0 : func.length)\n    : nativeMax(newData[9] - length, 0);\n\n  if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {\n    bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);\n  }\n  if (!bitmask || bitmask == WRAP_BIND_FLAG) {\n    var result = createBind(func, bitmask, thisArg);\n  } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {\n    result = createCurry(func, bitmask, arity);\n  } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {\n    result = createPartial(func, bitmask, thisArg, partials);\n  } else {\n    result = createHybrid.apply(undefined, newData);\n  }\n  var setter = data ? baseSetData : setData;\n  return setWrapToString(setter(result, newData), func, bitmask);\n}\n\nmodule.exports = createWrap;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_createWrap.js?");

/***/ }),

/***/ "./node_modules/lodash/_defineProperty.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_defineProperty.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\");\n\nvar defineProperty = (function() {\n  try {\n    var func = getNative(Object, 'defineProperty');\n    func({}, '', {});\n    return func;\n  } catch (e) {}\n}());\n\nmodule.exports = defineProperty;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_defineProperty.js?");

/***/ }),

/***/ "./node_modules/lodash/_equalArrays.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_equalArrays.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var SetCache = __webpack_require__(/*! ./_SetCache */ \"./node_modules/lodash/_SetCache.js\"),\n    arraySome = __webpack_require__(/*! ./_arraySome */ \"./node_modules/lodash/_arraySome.js\"),\n    cacheHas = __webpack_require__(/*! ./_cacheHas */ \"./node_modules/lodash/_cacheHas.js\");\n\n/** Used to compose bitmasks for value comparisons. */\nvar COMPARE_PARTIAL_FLAG = 1,\n    COMPARE_UNORDERED_FLAG = 2;\n\n/**\n * A specialized version of `baseIsEqualDeep` for arrays with support for\n * partial deep comparisons.\n *\n * @private\n * @param {Array} array The array to compare.\n * @param {Array} other The other array to compare.\n * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.\n * @param {Function} customizer The function to customize comparisons.\n * @param {Function} equalFunc The function to determine equivalents of values.\n * @param {Object} stack Tracks traversed `array` and `other` objects.\n * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.\n */\nfunction equalArrays(array, other, bitmask, customizer, equalFunc, stack) {\n  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,\n      arrLength = array.length,\n      othLength = other.length;\n\n  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {\n    return false;\n  }\n  // Assume cyclic values are equal.\n  var stacked = stack.get(array);\n  if (stacked && stack.get(other)) {\n    return stacked == other;\n  }\n  var index = -1,\n      result = true,\n      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;\n\n  stack.set(array, other);\n  stack.set(other, array);\n\n  // Ignore non-index properties.\n  while (++index < arrLength) {\n    var arrValue = array[index],\n        othValue = other[index];\n\n    if (customizer) {\n      var compared = isPartial\n        ? customizer(othValue, arrValue, index, other, array, stack)\n        : customizer(arrValue, othValue, index, array, other, stack);\n    }\n    if (compared !== undefined) {\n      if (compared) {\n        continue;\n      }\n      result = false;\n      break;\n    }\n    // Recursively compare arrays (susceptible to call stack limits).\n    if (seen) {\n      if (!arraySome(other, function(othValue, othIndex) {\n            if (!cacheHas(seen, othIndex) &&\n                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {\n              return seen.push(othIndex);\n            }\n          })) {\n        result = false;\n        break;\n      }\n    } else if (!(\n          arrValue === othValue ||\n            equalFunc(arrValue, othValue, bitmask, customizer, stack)\n        )) {\n      result = false;\n      break;\n    }\n  }\n  stack['delete'](array);\n  stack['delete'](other);\n  return result;\n}\n\nmodule.exports = equalArrays;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_equalArrays.js?");

/***/ }),

/***/ "./node_modules/lodash/_equalByTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_equalByTag.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\"),\n    Uint8Array = __webpack_require__(/*! ./_Uint8Array */ \"./node_modules/lodash/_Uint8Array.js\"),\n    eq = __webpack_require__(/*! ./eq */ \"./node_modules/lodash/eq.js\"),\n    equalArrays = __webpack_require__(/*! ./_equalArrays */ \"./node_modules/lodash/_equalArrays.js\"),\n    mapToArray = __webpack_require__(/*! ./_mapToArray */ \"./node_modules/lodash/_mapToArray.js\"),\n    setToArray = __webpack_require__(/*! ./_setToArray */ \"./node_modules/lodash/_setToArray.js\");\n\n/** Used to compose bitmasks for value comparisons. */\nvar COMPARE_PARTIAL_FLAG = 1,\n    COMPARE_UNORDERED_FLAG = 2;\n\n/** `Object#toString` result references. */\nvar boolTag = '[object Boolean]',\n    dateTag = '[object Date]',\n    errorTag = '[object Error]',\n    mapTag = '[object Map]',\n    numberTag = '[object Number]',\n    regexpTag = '[object RegExp]',\n    setTag = '[object Set]',\n    stringTag = '[object String]',\n    symbolTag = '[object Symbol]';\n\nvar arrayBufferTag = '[object ArrayBuffer]',\n    dataViewTag = '[object DataView]';\n\n/** Used to convert symbols to primitives and strings. */\nvar symbolProto = Symbol ? Symbol.prototype : undefined,\n    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;\n\n/**\n * A specialized version of `baseIsEqualDeep` for comparing objects of\n * the same `toStringTag`.\n *\n * **Note:** This function only supports comparing values with tags of\n * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.\n *\n * @private\n * @param {Object} object The object to compare.\n * @param {Object} other The other object to compare.\n * @param {string} tag The `toStringTag` of the objects to compare.\n * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.\n * @param {Function} customizer The function to customize comparisons.\n * @param {Function} equalFunc The function to determine equivalents of values.\n * @param {Object} stack Tracks traversed `object` and `other` objects.\n * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.\n */\nfunction equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {\n  switch (tag) {\n    case dataViewTag:\n      if ((object.byteLength != other.byteLength) ||\n          (object.byteOffset != other.byteOffset)) {\n        return false;\n      }\n      object = object.buffer;\n      other = other.buffer;\n\n    case arrayBufferTag:\n      if ((object.byteLength != other.byteLength) ||\n          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {\n        return false;\n      }\n      return true;\n\n    case boolTag:\n    case dateTag:\n    case numberTag:\n      // Coerce booleans to `1` or `0` and dates to milliseconds.\n      // Invalid dates are coerced to `NaN`.\n      return eq(+object, +other);\n\n    case errorTag:\n      return object.name == other.name && object.message == other.message;\n\n    case regexpTag:\n    case stringTag:\n      // Coerce regexes to strings and treat strings, primitives and objects,\n      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring\n      // for more details.\n      return object == (other + '');\n\n    case mapTag:\n      var convert = mapToArray;\n\n    case setTag:\n      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;\n      convert || (convert = setToArray);\n\n      if (object.size != other.size && !isPartial) {\n        return false;\n      }\n      // Assume cyclic values are equal.\n      var stacked = stack.get(object);\n      if (stacked) {\n        return stacked == other;\n      }\n      bitmask |= COMPARE_UNORDERED_FLAG;\n\n      // Recursively compare objects (susceptible to call stack limits).\n      stack.set(object, other);\n      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);\n      stack['delete'](object);\n      return result;\n\n    case symbolTag:\n      if (symbolValueOf) {\n        return symbolValueOf.call(object) == symbolValueOf.call(other);\n      }\n  }\n  return false;\n}\n\nmodule.exports = equalByTag;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_equalByTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_equalObjects.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_equalObjects.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getAllKeys = __webpack_require__(/*! ./_getAllKeys */ \"./node_modules/lodash/_getAllKeys.js\");\n\n/** Used to compose bitmasks for value comparisons. */\nvar COMPARE_PARTIAL_FLAG = 1;\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * A specialized version of `baseIsEqualDeep` for objects with support for\n * partial deep comparisons.\n *\n * @private\n * @param {Object} object The object to compare.\n * @param {Object} other The other object to compare.\n * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.\n * @param {Function} customizer The function to customize comparisons.\n * @param {Function} equalFunc The function to determine equivalents of values.\n * @param {Object} stack Tracks traversed `object` and `other` objects.\n * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.\n */\nfunction equalObjects(object, other, bitmask, customizer, equalFunc, stack) {\n  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,\n      objProps = getAllKeys(object),\n      objLength = objProps.length,\n      othProps = getAllKeys(other),\n      othLength = othProps.length;\n\n  if (objLength != othLength && !isPartial) {\n    return false;\n  }\n  var index = objLength;\n  while (index--) {\n    var key = objProps[index];\n    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {\n      return false;\n    }\n  }\n  // Assume cyclic values are equal.\n  var stacked = stack.get(object);\n  if (stacked && stack.get(other)) {\n    return stacked == other;\n  }\n  var result = true;\n  stack.set(object, other);\n  stack.set(other, object);\n\n  var skipCtor = isPartial;\n  while (++index < objLength) {\n    key = objProps[index];\n    var objValue = object[key],\n        othValue = other[key];\n\n    if (customizer) {\n      var compared = isPartial\n        ? customizer(othValue, objValue, key, other, object, stack)\n        : customizer(objValue, othValue, key, object, other, stack);\n    }\n    // Recursively compare objects (susceptible to call stack limits).\n    if (!(compared === undefined\n          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))\n          : compared\n        )) {\n      result = false;\n      break;\n    }\n    skipCtor || (skipCtor = key == 'constructor');\n  }\n  if (result && !skipCtor) {\n    var objCtor = object.constructor,\n        othCtor = other.constructor;\n\n    // Non `Object` object instances with different constructors are not equal.\n    if (objCtor != othCtor &&\n        ('constructor' in object && 'constructor' in other) &&\n        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&\n          typeof othCtor == 'function' && othCtor instanceof othCtor)) {\n      result = false;\n    }\n  }\n  stack['delete'](object);\n  stack['delete'](other);\n  return result;\n}\n\nmodule.exports = equalObjects;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_equalObjects.js?");

/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */\nvar freeGlobal = typeof global == 'object' && global && global.Object === Object && global;\n\nmodule.exports = freeGlobal;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_freeGlobal.js?");

/***/ }),

/***/ "./node_modules/lodash/_getAllKeys.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getAllKeys.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetAllKeys = __webpack_require__(/*! ./_baseGetAllKeys */ \"./node_modules/lodash/_baseGetAllKeys.js\"),\n    getSymbols = __webpack_require__(/*! ./_getSymbols */ \"./node_modules/lodash/_getSymbols.js\"),\n    keys = __webpack_require__(/*! ./keys */ \"./node_modules/lodash/keys.js\");\n\n/**\n * Creates an array of own enumerable property names and symbols of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names and symbols.\n */\nfunction getAllKeys(object) {\n  return baseGetAllKeys(object, keys, getSymbols);\n}\n\nmodule.exports = getAllKeys;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_getAllKeys.js?");

/***/ }),

/***/ "./node_modules/lodash/_getData.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_getData.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var metaMap = __webpack_require__(/*! ./_metaMap */ \"./node_modules/lodash/_metaMap.js\"),\n    noop = __webpack_require__(/*! ./noop */ \"./node_modules/lodash/noop.js\");\n\n/**\n * Gets metadata for `func`.\n *\n * @private\n * @param {Function} func The function to query.\n * @returns {*} Returns the metadata for `func`.\n */\nvar getData = !metaMap ? noop : function(func) {\n  return metaMap.get(func);\n};\n\nmodule.exports = getData;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_getData.js?");

/***/ }),

/***/ "./node_modules/lodash/_getFuncName.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_getFuncName.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var realNames = __webpack_require__(/*! ./_realNames */ \"./node_modules/lodash/_realNames.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Gets the name of `func`.\n *\n * @private\n * @param {Function} func The function to query.\n * @returns {string} Returns the function name.\n */\nfunction getFuncName(func) {\n  var result = (func.name + ''),\n      array = realNames[result],\n      length = hasOwnProperty.call(realNames, result) ? array.length : 0;\n\n  while (length--) {\n    var data = array[length],\n        otherFunc = data.func;\n    if (otherFunc == null || otherFunc == func) {\n      return data.name;\n    }\n  }\n  return result;\n}\n\nmodule.exports = getFuncName;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_getFuncName.js?");

/***/ }),

/***/ "./node_modules/lodash/_getHolder.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getHolder.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Gets the argument placeholder value for `func`.\n *\n * @private\n * @param {Function} func The function to inspect.\n * @returns {*} Returns the placeholder value.\n */\nfunction getHolder(func) {\n  var object = func;\n  return object.placeholder;\n}\n\nmodule.exports = getHolder;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_getHolder.js?");

/***/ }),

/***/ "./node_modules/lodash/_getMapData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getMapData.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isKeyable = __webpack_require__(/*! ./_isKeyable */ \"./node_modules/lodash/_isKeyable.js\");\n\n/**\n * Gets the data for `map`.\n *\n * @private\n * @param {Object} map The map to query.\n * @param {string} key The reference key.\n * @returns {*} Returns the map data.\n */\nfunction getMapData(map, key) {\n  var data = map.__data__;\n  return isKeyable(key)\n    ? data[typeof key == 'string' ? 'string' : 'hash']\n    : data.map;\n}\n\nmodule.exports = getMapData;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_getMapData.js?");

/***/ }),

/***/ "./node_modules/lodash/_getMatchData.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getMatchData.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isStrictComparable = __webpack_require__(/*! ./_isStrictComparable */ \"./node_modules/lodash/_isStrictComparable.js\"),\n    keys = __webpack_require__(/*! ./keys */ \"./node_modules/lodash/keys.js\");\n\n/**\n * Gets the property names, values, and compare flags of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the match data of `object`.\n */\nfunction getMatchData(object) {\n  var result = keys(object),\n      length = result.length;\n\n  while (length--) {\n    var key = result[length],\n        value = object[key];\n\n    result[length] = [key, value, isStrictComparable(value)];\n  }\n  return result;\n}\n\nmodule.exports = getMatchData;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_getMatchData.js?");

/***/ }),

/***/ "./node_modules/lodash/_getNative.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getNative.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsNative = __webpack_require__(/*! ./_baseIsNative */ \"./node_modules/lodash/_baseIsNative.js\"),\n    getValue = __webpack_require__(/*! ./_getValue */ \"./node_modules/lodash/_getValue.js\");\n\n/**\n * Gets the native function at `key` of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @param {string} key The key of the method to get.\n * @returns {*} Returns the function if it's native, else `undefined`.\n */\nfunction getNative(object, key) {\n  var value = getValue(object, key);\n  return baseIsNative(value) ? value : undefined;\n}\n\nmodule.exports = getNative;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_getNative.js?");

/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Used to resolve the\n * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)\n * of values.\n */\nvar nativeObjectToString = objectProto.toString;\n\n/** Built-in value references. */\nvar symToStringTag = Symbol ? Symbol.toStringTag : undefined;\n\n/**\n * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the raw `toStringTag`.\n */\nfunction getRawTag(value) {\n  var isOwn = hasOwnProperty.call(value, symToStringTag),\n      tag = value[symToStringTag];\n\n  try {\n    value[symToStringTag] = undefined;\n    var unmasked = true;\n  } catch (e) {}\n\n  var result = nativeObjectToString.call(value);\n  if (unmasked) {\n    if (isOwn) {\n      value[symToStringTag] = tag;\n    } else {\n      delete value[symToStringTag];\n    }\n  }\n  return result;\n}\n\nmodule.exports = getRawTag;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_getRawTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_getSymbols.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getSymbols.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayFilter = __webpack_require__(/*! ./_arrayFilter */ \"./node_modules/lodash/_arrayFilter.js\"),\n    stubArray = __webpack_require__(/*! ./stubArray */ \"./node_modules/lodash/stubArray.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Built-in value references. */\nvar propertyIsEnumerable = objectProto.propertyIsEnumerable;\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeGetSymbols = Object.getOwnPropertySymbols;\n\n/**\n * Creates an array of the own enumerable symbols of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of symbols.\n */\nvar getSymbols = !nativeGetSymbols ? stubArray : function(object) {\n  if (object == null) {\n    return [];\n  }\n  object = Object(object);\n  return arrayFilter(nativeGetSymbols(object), function(symbol) {\n    return propertyIsEnumerable.call(object, symbol);\n  });\n};\n\nmodule.exports = getSymbols;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_getSymbols.js?");

/***/ }),

/***/ "./node_modules/lodash/_getTag.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_getTag.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var DataView = __webpack_require__(/*! ./_DataView */ \"./node_modules/lodash/_DataView.js\"),\n    Map = __webpack_require__(/*! ./_Map */ \"./node_modules/lodash/_Map.js\"),\n    Promise = __webpack_require__(/*! ./_Promise */ \"./node_modules/lodash/_Promise.js\"),\n    Set = __webpack_require__(/*! ./_Set */ \"./node_modules/lodash/_Set.js\"),\n    WeakMap = __webpack_require__(/*! ./_WeakMap */ \"./node_modules/lodash/_WeakMap.js\"),\n    baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    toSource = __webpack_require__(/*! ./_toSource */ \"./node_modules/lodash/_toSource.js\");\n\n/** `Object#toString` result references. */\nvar mapTag = '[object Map]',\n    objectTag = '[object Object]',\n    promiseTag = '[object Promise]',\n    setTag = '[object Set]',\n    weakMapTag = '[object WeakMap]';\n\nvar dataViewTag = '[object DataView]';\n\n/** Used to detect maps, sets, and weakmaps. */\nvar dataViewCtorString = toSource(DataView),\n    mapCtorString = toSource(Map),\n    promiseCtorString = toSource(Promise),\n    setCtorString = toSource(Set),\n    weakMapCtorString = toSource(WeakMap);\n\n/**\n * Gets the `toStringTag` of `value`.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the `toStringTag`.\n */\nvar getTag = baseGetTag;\n\n// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.\nif ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||\n    (Map && getTag(new Map) != mapTag) ||\n    (Promise && getTag(Promise.resolve()) != promiseTag) ||\n    (Set && getTag(new Set) != setTag) ||\n    (WeakMap && getTag(new WeakMap) != weakMapTag)) {\n  getTag = function(value) {\n    var result = baseGetTag(value),\n        Ctor = result == objectTag ? value.constructor : undefined,\n        ctorString = Ctor ? toSource(Ctor) : '';\n\n    if (ctorString) {\n      switch (ctorString) {\n        case dataViewCtorString: return dataViewTag;\n        case mapCtorString: return mapTag;\n        case promiseCtorString: return promiseTag;\n        case setCtorString: return setTag;\n        case weakMapCtorString: return weakMapTag;\n      }\n    }\n    return result;\n  };\n}\n\nmodule.exports = getTag;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_getTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_getValue.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_getValue.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Gets the value at `key` of `object`.\n *\n * @private\n * @param {Object} [object] The object to query.\n * @param {string} key The key of the property to get.\n * @returns {*} Returns the property value.\n */\nfunction getValue(object, key) {\n  return object == null ? undefined : object[key];\n}\n\nmodule.exports = getValue;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_getValue.js?");

/***/ }),

/***/ "./node_modules/lodash/_getWrapDetails.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_getWrapDetails.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used to match wrap detail comments. */\nvar reWrapDetails = /\\{\\n\\/\\* \\[wrapped with (.+)\\] \\*/,\n    reSplitDetails = /,? & /;\n\n/**\n * Extracts wrapper details from the `source` body comment.\n *\n * @private\n * @param {string} source The source to inspect.\n * @returns {Array} Returns the wrapper details.\n */\nfunction getWrapDetails(source) {\n  var match = source.match(reWrapDetails);\n  return match ? match[1].split(reSplitDetails) : [];\n}\n\nmodule.exports = getWrapDetails;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_getWrapDetails.js?");

/***/ }),

/***/ "./node_modules/lodash/_hasPath.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hasPath.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var castPath = __webpack_require__(/*! ./_castPath */ \"./node_modules/lodash/_castPath.js\"),\n    isArguments = __webpack_require__(/*! ./isArguments */ \"./node_modules/lodash/isArguments.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isIndex = __webpack_require__(/*! ./_isIndex */ \"./node_modules/lodash/_isIndex.js\"),\n    isLength = __webpack_require__(/*! ./isLength */ \"./node_modules/lodash/isLength.js\"),\n    toKey = __webpack_require__(/*! ./_toKey */ \"./node_modules/lodash/_toKey.js\");\n\n/**\n * Checks if `path` exists on `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @param {Array|string} path The path to check.\n * @param {Function} hasFunc The function to check properties.\n * @returns {boolean} Returns `true` if `path` exists, else `false`.\n */\nfunction hasPath(object, path, hasFunc) {\n  path = castPath(path, object);\n\n  var index = -1,\n      length = path.length,\n      result = false;\n\n  while (++index < length) {\n    var key = toKey(path[index]);\n    if (!(result = object != null && hasFunc(object, key))) {\n      break;\n    }\n    object = object[key];\n  }\n  if (result || ++index != length) {\n    return result;\n  }\n  length = object == null ? 0 : object.length;\n  return !!length && isLength(length) && isIndex(key, length) &&\n    (isArray(object) || isArguments(object));\n}\n\nmodule.exports = hasPath;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_hasPath.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashClear.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_hashClear.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./node_modules/lodash/_nativeCreate.js\");\n\n/**\n * Removes all key-value entries from the hash.\n *\n * @private\n * @name clear\n * @memberOf Hash\n */\nfunction hashClear() {\n  this.__data__ = nativeCreate ? nativeCreate(null) : {};\n  this.size = 0;\n}\n\nmodule.exports = hashClear;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_hashClear.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashDelete.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_hashDelete.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Removes `key` and its value from the hash.\n *\n * @private\n * @name delete\n * @memberOf Hash\n * @param {Object} hash The hash to modify.\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction hashDelete(key) {\n  var result = this.has(key) && delete this.__data__[key];\n  this.size -= result ? 1 : 0;\n  return result;\n}\n\nmodule.exports = hashDelete;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_hashDelete.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashGet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./node_modules/lodash/_nativeCreate.js\");\n\n/** Used to stand-in for `undefined` hash values. */\nvar HASH_UNDEFINED = '__lodash_hash_undefined__';\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Gets the hash value for `key`.\n *\n * @private\n * @name get\n * @memberOf Hash\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction hashGet(key) {\n  var data = this.__data__;\n  if (nativeCreate) {\n    var result = data[key];\n    return result === HASH_UNDEFINED ? undefined : result;\n  }\n  return hasOwnProperty.call(data, key) ? data[key] : undefined;\n}\n\nmodule.exports = hashGet;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_hashGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashHas.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashHas.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./node_modules/lodash/_nativeCreate.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Checks if a hash value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf Hash\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction hashHas(key) {\n  var data = this.__data__;\n  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);\n}\n\nmodule.exports = hashHas;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_hashHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashSet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashSet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./node_modules/lodash/_nativeCreate.js\");\n\n/** Used to stand-in for `undefined` hash values. */\nvar HASH_UNDEFINED = '__lodash_hash_undefined__';\n\n/**\n * Sets the hash `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf Hash\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the hash instance.\n */\nfunction hashSet(key, value) {\n  var data = this.__data__;\n  this.size += this.has(key) ? 0 : 1;\n  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;\n  return this;\n}\n\nmodule.exports = hashSet;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_hashSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_insertWrapDetails.js":
/*!***************************************************!*\
  !*** ./node_modules/lodash/_insertWrapDetails.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used to match wrap detail comments. */\nvar reWrapComment = /\\{(?:\\n\\/\\* \\[wrapped with .+\\] \\*\\/)?\\n?/;\n\n/**\n * Inserts wrapper `details` in a comment at the top of the `source` body.\n *\n * @private\n * @param {string} source The source to modify.\n * @returns {Array} details The details to insert.\n * @returns {string} Returns the modified source.\n */\nfunction insertWrapDetails(source, details) {\n  var length = details.length;\n  if (!length) {\n    return source;\n  }\n  var lastIndex = length - 1;\n  details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];\n  details = details.join(length > 2 ? ', ' : ' ');\n  return source.replace(reWrapComment, '{\\n/* [wrapped with ' + details + '] */\\n');\n}\n\nmodule.exports = insertWrapDetails;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_insertWrapDetails.js?");

/***/ }),

/***/ "./node_modules/lodash/_isIndex.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_isIndex.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used as references for various `Number` constants. */\nvar MAX_SAFE_INTEGER = 9007199254740991;\n\n/** Used to detect unsigned integer values. */\nvar reIsUint = /^(?:0|[1-9]\\d*)$/;\n\n/**\n * Checks if `value` is a valid array-like index.\n *\n * @private\n * @param {*} value The value to check.\n * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.\n * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.\n */\nfunction isIndex(value, length) {\n  var type = typeof value;\n  length = length == null ? MAX_SAFE_INTEGER : length;\n\n  return !!length &&\n    (type == 'number' ||\n      (type != 'symbol' && reIsUint.test(value))) &&\n        (value > -1 && value % 1 == 0 && value < length);\n}\n\nmodule.exports = isIndex;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_isIndex.js?");

/***/ }),

/***/ "./node_modules/lodash/_isKey.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_isKey.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isSymbol = __webpack_require__(/*! ./isSymbol */ \"./node_modules/lodash/isSymbol.js\");\n\n/** Used to match property names within property paths. */\nvar reIsDeepProp = /\\.|\\[(?:[^[\\]]*|([\"'])(?:(?!\\1)[^\\\\]|\\\\.)*?\\1)\\]/,\n    reIsPlainProp = /^\\w*$/;\n\n/**\n * Checks if `value` is a property name and not a property path.\n *\n * @private\n * @param {*} value The value to check.\n * @param {Object} [object] The object to query keys on.\n * @returns {boolean} Returns `true` if `value` is a property name, else `false`.\n */\nfunction isKey(value, object) {\n  if (isArray(value)) {\n    return false;\n  }\n  var type = typeof value;\n  if (type == 'number' || type == 'symbol' || type == 'boolean' ||\n      value == null || isSymbol(value)) {\n    return true;\n  }\n  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||\n    (object != null && value in Object(object));\n}\n\nmodule.exports = isKey;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_isKey.js?");

/***/ }),

/***/ "./node_modules/lodash/_isKeyable.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_isKeyable.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is suitable for use as unique object key.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is suitable, else `false`.\n */\nfunction isKeyable(value) {\n  var type = typeof value;\n  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')\n    ? (value !== '__proto__')\n    : (value === null);\n}\n\nmodule.exports = isKeyable;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_isKeyable.js?");

/***/ }),

/***/ "./node_modules/lodash/_isLaziable.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_isLaziable.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var LazyWrapper = __webpack_require__(/*! ./_LazyWrapper */ \"./node_modules/lodash/_LazyWrapper.js\"),\n    getData = __webpack_require__(/*! ./_getData */ \"./node_modules/lodash/_getData.js\"),\n    getFuncName = __webpack_require__(/*! ./_getFuncName */ \"./node_modules/lodash/_getFuncName.js\"),\n    lodash = __webpack_require__(/*! ./wrapperLodash */ \"./node_modules/lodash/wrapperLodash.js\");\n\n/**\n * Checks if `func` has a lazy counterpart.\n *\n * @private\n * @param {Function} func The function to check.\n * @returns {boolean} Returns `true` if `func` has a lazy counterpart,\n *  else `false`.\n */\nfunction isLaziable(func) {\n  var funcName = getFuncName(func),\n      other = lodash[funcName];\n\n  if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {\n    return false;\n  }\n  if (func === other) {\n    return true;\n  }\n  var data = getData(other);\n  return !!data && func === data[0];\n}\n\nmodule.exports = isLaziable;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_isLaziable.js?");

/***/ }),

/***/ "./node_modules/lodash/_isMasked.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_isMasked.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var coreJsData = __webpack_require__(/*! ./_coreJsData */ \"./node_modules/lodash/_coreJsData.js\");\n\n/** Used to detect methods masquerading as native. */\nvar maskSrcKey = (function() {\n  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');\n  return uid ? ('Symbol(src)_1.' + uid) : '';\n}());\n\n/**\n * Checks if `func` has its source masked.\n *\n * @private\n * @param {Function} func The function to check.\n * @returns {boolean} Returns `true` if `func` is masked, else `false`.\n */\nfunction isMasked(func) {\n  return !!maskSrcKey && (maskSrcKey in func);\n}\n\nmodule.exports = isMasked;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_isMasked.js?");

/***/ }),

/***/ "./node_modules/lodash/_isPrototype.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_isPrototype.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/**\n * Checks if `value` is likely a prototype object.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.\n */\nfunction isPrototype(value) {\n  var Ctor = value && value.constructor,\n      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;\n\n  return value === proto;\n}\n\nmodule.exports = isPrototype;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_isPrototype.js?");

/***/ }),

/***/ "./node_modules/lodash/_isStrictComparable.js":
/*!****************************************************!*\
  !*** ./node_modules/lodash/_isStrictComparable.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\");\n\n/**\n * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` if suitable for strict\n *  equality comparisons, else `false`.\n */\nfunction isStrictComparable(value) {\n  return value === value && !isObject(value);\n}\n\nmodule.exports = isStrictComparable;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_isStrictComparable.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheClear.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_listCacheClear.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Removes all key-value entries from the list cache.\n *\n * @private\n * @name clear\n * @memberOf ListCache\n */\nfunction listCacheClear() {\n  this.__data__ = [];\n  this.size = 0;\n}\n\nmodule.exports = listCacheClear;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_listCacheClear.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheDelete.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_listCacheDelete.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/** Used for built-in method references. */\nvar arrayProto = Array.prototype;\n\n/** Built-in value references. */\nvar splice = arrayProto.splice;\n\n/**\n * Removes `key` and its value from the list cache.\n *\n * @private\n * @name delete\n * @memberOf ListCache\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction listCacheDelete(key) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  if (index < 0) {\n    return false;\n  }\n  var lastIndex = data.length - 1;\n  if (index == lastIndex) {\n    data.pop();\n  } else {\n    splice.call(data, index, 1);\n  }\n  --this.size;\n  return true;\n}\n\nmodule.exports = listCacheDelete;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_listCacheDelete.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheGet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheGet.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/**\n * Gets the list cache value for `key`.\n *\n * @private\n * @name get\n * @memberOf ListCache\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction listCacheGet(key) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  return index < 0 ? undefined : data[index][1];\n}\n\nmodule.exports = listCacheGet;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_listCacheGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheHas.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheHas.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/**\n * Checks if a list cache value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf ListCache\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction listCacheHas(key) {\n  return assocIndexOf(this.__data__, key) > -1;\n}\n\nmodule.exports = listCacheHas;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_listCacheHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheSet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheSet.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/**\n * Sets the list cache `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf ListCache\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the list cache instance.\n */\nfunction listCacheSet(key, value) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  if (index < 0) {\n    ++this.size;\n    data.push([key, value]);\n  } else {\n    data[index][1] = value;\n  }\n  return this;\n}\n\nmodule.exports = listCacheSet;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_listCacheSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheClear.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_mapCacheClear.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Hash = __webpack_require__(/*! ./_Hash */ \"./node_modules/lodash/_Hash.js\"),\n    ListCache = __webpack_require__(/*! ./_ListCache */ \"./node_modules/lodash/_ListCache.js\"),\n    Map = __webpack_require__(/*! ./_Map */ \"./node_modules/lodash/_Map.js\");\n\n/**\n * Removes all key-value entries from the map.\n *\n * @private\n * @name clear\n * @memberOf MapCache\n */\nfunction mapCacheClear() {\n  this.size = 0;\n  this.__data__ = {\n    'hash': new Hash,\n    'map': new (Map || ListCache),\n    'string': new Hash\n  };\n}\n\nmodule.exports = mapCacheClear;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_mapCacheClear.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheDelete.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_mapCacheDelete.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./node_modules/lodash/_getMapData.js\");\n\n/**\n * Removes `key` and its value from the map.\n *\n * @private\n * @name delete\n * @memberOf MapCache\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction mapCacheDelete(key) {\n  var result = getMapData(this, key)['delete'](key);\n  this.size -= result ? 1 : 0;\n  return result;\n}\n\nmodule.exports = mapCacheDelete;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_mapCacheDelete.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheGet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheGet.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./node_modules/lodash/_getMapData.js\");\n\n/**\n * Gets the map value for `key`.\n *\n * @private\n * @name get\n * @memberOf MapCache\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction mapCacheGet(key) {\n  return getMapData(this, key).get(key);\n}\n\nmodule.exports = mapCacheGet;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_mapCacheGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheHas.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheHas.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./node_modules/lodash/_getMapData.js\");\n\n/**\n * Checks if a map value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf MapCache\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction mapCacheHas(key) {\n  return getMapData(this, key).has(key);\n}\n\nmodule.exports = mapCacheHas;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_mapCacheHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheSet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheSet.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./node_modules/lodash/_getMapData.js\");\n\n/**\n * Sets the map `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf MapCache\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the map cache instance.\n */\nfunction mapCacheSet(key, value) {\n  var data = getMapData(this, key),\n      size = data.size;\n\n  data.set(key, value);\n  this.size += data.size == size ? 0 : 1;\n  return this;\n}\n\nmodule.exports = mapCacheSet;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_mapCacheSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapToArray.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_mapToArray.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Converts `map` to its key-value pairs.\n *\n * @private\n * @param {Object} map The map to convert.\n * @returns {Array} Returns the key-value pairs.\n */\nfunction mapToArray(map) {\n  var index = -1,\n      result = Array(map.size);\n\n  map.forEach(function(value, key) {\n    result[++index] = [key, value];\n  });\n  return result;\n}\n\nmodule.exports = mapToArray;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_mapToArray.js?");

/***/ }),

/***/ "./node_modules/lodash/_matchesStrictComparable.js":
/*!*********************************************************!*\
  !*** ./node_modules/lodash/_matchesStrictComparable.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A specialized version of `matchesProperty` for source values suitable\n * for strict equality comparisons, i.e. `===`.\n *\n * @private\n * @param {string} key The key of the property to get.\n * @param {*} srcValue The value to match.\n * @returns {Function} Returns the new spec function.\n */\nfunction matchesStrictComparable(key, srcValue) {\n  return function(object) {\n    if (object == null) {\n      return false;\n    }\n    return object[key] === srcValue &&\n      (srcValue !== undefined || (key in Object(object)));\n  };\n}\n\nmodule.exports = matchesStrictComparable;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_matchesStrictComparable.js?");

/***/ }),

/***/ "./node_modules/lodash/_memoizeCapped.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_memoizeCapped.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var memoize = __webpack_require__(/*! ./memoize */ \"./node_modules/lodash/memoize.js\");\n\n/** Used as the maximum memoize cache size. */\nvar MAX_MEMOIZE_SIZE = 500;\n\n/**\n * A specialized version of `_.memoize` which clears the memoized function's\n * cache when it exceeds `MAX_MEMOIZE_SIZE`.\n *\n * @private\n * @param {Function} func The function to have its output memoized.\n * @returns {Function} Returns the new memoized function.\n */\nfunction memoizeCapped(func) {\n  var result = memoize(func, function(key) {\n    if (cache.size === MAX_MEMOIZE_SIZE) {\n      cache.clear();\n    }\n    return key;\n  });\n\n  var cache = result.cache;\n  return result;\n}\n\nmodule.exports = memoizeCapped;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_memoizeCapped.js?");

/***/ }),

/***/ "./node_modules/lodash/_mergeData.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_mergeData.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var composeArgs = __webpack_require__(/*! ./_composeArgs */ \"./node_modules/lodash/_composeArgs.js\"),\n    composeArgsRight = __webpack_require__(/*! ./_composeArgsRight */ \"./node_modules/lodash/_composeArgsRight.js\"),\n    replaceHolders = __webpack_require__(/*! ./_replaceHolders */ \"./node_modules/lodash/_replaceHolders.js\");\n\n/** Used as the internal argument placeholder. */\nvar PLACEHOLDER = '__lodash_placeholder__';\n\n/** Used to compose bitmasks for function metadata. */\nvar WRAP_BIND_FLAG = 1,\n    WRAP_BIND_KEY_FLAG = 2,\n    WRAP_CURRY_BOUND_FLAG = 4,\n    WRAP_CURRY_FLAG = 8,\n    WRAP_ARY_FLAG = 128,\n    WRAP_REARG_FLAG = 256;\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeMin = Math.min;\n\n/**\n * Merges the function metadata of `source` into `data`.\n *\n * Merging metadata reduces the number of wrappers used to invoke a function.\n * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`\n * may be applied regardless of execution order. Methods like `_.ary` and\n * `_.rearg` modify function arguments, making the order in which they are\n * executed important, preventing the merging of metadata. However, we make\n * an exception for a safe combined case where curried functions have `_.ary`\n * and or `_.rearg` applied.\n *\n * @private\n * @param {Array} data The destination metadata.\n * @param {Array} source The source metadata.\n * @returns {Array} Returns `data`.\n */\nfunction mergeData(data, source) {\n  var bitmask = data[1],\n      srcBitmask = source[1],\n      newBitmask = bitmask | srcBitmask,\n      isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);\n\n  var isCombo =\n    ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_CURRY_FLAG)) ||\n    ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_REARG_FLAG) && (data[7].length <= source[8])) ||\n    ((srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG)) && (source[7].length <= source[8]) && (bitmask == WRAP_CURRY_FLAG));\n\n  // Exit early if metadata can't be merged.\n  if (!(isCommon || isCombo)) {\n    return data;\n  }\n  // Use source `thisArg` if available.\n  if (srcBitmask & WRAP_BIND_FLAG) {\n    data[2] = source[2];\n    // Set when currying a bound function.\n    newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;\n  }\n  // Compose partial arguments.\n  var value = source[3];\n  if (value) {\n    var partials = data[3];\n    data[3] = partials ? composeArgs(partials, value, source[4]) : value;\n    data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];\n  }\n  // Compose partial right arguments.\n  value = source[5];\n  if (value) {\n    partials = data[5];\n    data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;\n    data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];\n  }\n  // Use source `argPos` if available.\n  value = source[7];\n  if (value) {\n    data[7] = value;\n  }\n  // Use source `ary` if it's smaller.\n  if (srcBitmask & WRAP_ARY_FLAG) {\n    data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);\n  }\n  // Use source `arity` if one is not provided.\n  if (data[9] == null) {\n    data[9] = source[9];\n  }\n  // Use source `func` and merge bitmasks.\n  data[0] = source[0];\n  data[1] = newBitmask;\n\n  return data;\n}\n\nmodule.exports = mergeData;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_mergeData.js?");

/***/ }),

/***/ "./node_modules/lodash/_metaMap.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_metaMap.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var WeakMap = __webpack_require__(/*! ./_WeakMap */ \"./node_modules/lodash/_WeakMap.js\");\n\n/** Used to store function metadata. */\nvar metaMap = WeakMap && new WeakMap;\n\nmodule.exports = metaMap;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_metaMap.js?");

/***/ }),

/***/ "./node_modules/lodash/_nativeCreate.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeCreate.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\");\n\n/* Built-in method references that are verified to be native. */\nvar nativeCreate = getNative(Object, 'create');\n\nmodule.exports = nativeCreate;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_nativeCreate.js?");

/***/ }),

/***/ "./node_modules/lodash/_nativeKeys.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_nativeKeys.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var overArg = __webpack_require__(/*! ./_overArg */ \"./node_modules/lodash/_overArg.js\");\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeKeys = overArg(Object.keys, Object);\n\nmodule.exports = nativeKeys;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_nativeKeys.js?");

/***/ }),

/***/ "./node_modules/lodash/_nodeUtil.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_nodeUtil.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ \"./node_modules/lodash/_freeGlobal.js\");\n\n/** Detect free variable `exports`. */\nvar freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;\n\n/** Detect free variable `module`. */\nvar freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;\n\n/** Detect the popular CommonJS extension `module.exports`. */\nvar moduleExports = freeModule && freeModule.exports === freeExports;\n\n/** Detect free variable `process` from Node.js. */\nvar freeProcess = moduleExports && freeGlobal.process;\n\n/** Used to access faster Node.js helpers. */\nvar nodeUtil = (function() {\n  try {\n    return freeProcess && freeProcess.binding && freeProcess.binding('util');\n  } catch (e) {}\n}());\n\nmodule.exports = nodeUtil;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_nodeUtil.js?");

/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/**\n * Used to resolve the\n * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)\n * of values.\n */\nvar nativeObjectToString = objectProto.toString;\n\n/**\n * Converts `value` to a string using `Object.prototype.toString`.\n *\n * @private\n * @param {*} value The value to convert.\n * @returns {string} Returns the converted string.\n */\nfunction objectToString(value) {\n  return nativeObjectToString.call(value);\n}\n\nmodule.exports = objectToString;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_objectToString.js?");

/***/ }),

/***/ "./node_modules/lodash/_overArg.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_overArg.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Creates a unary function that invokes `func` with its argument transformed.\n *\n * @private\n * @param {Function} func The function to wrap.\n * @param {Function} transform The argument transform.\n * @returns {Function} Returns the new function.\n */\nfunction overArg(func, transform) {\n  return function(arg) {\n    return func(transform(arg));\n  };\n}\n\nmodule.exports = overArg;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_overArg.js?");

/***/ }),

/***/ "./node_modules/lodash/_realNames.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_realNames.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used to lookup unminified function names. */\nvar realNames = {};\n\nmodule.exports = realNames;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_realNames.js?");

/***/ }),

/***/ "./node_modules/lodash/_reorder.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_reorder.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var copyArray = __webpack_require__(/*! ./_copyArray */ \"./node_modules/lodash/_copyArray.js\"),\n    isIndex = __webpack_require__(/*! ./_isIndex */ \"./node_modules/lodash/_isIndex.js\");\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeMin = Math.min;\n\n/**\n * Reorder `array` according to the specified indexes where the element at\n * the first index is assigned as the first element, the element at\n * the second index is assigned as the second element, and so on.\n *\n * @private\n * @param {Array} array The array to reorder.\n * @param {Array} indexes The arranged array indexes.\n * @returns {Array} Returns `array`.\n */\nfunction reorder(array, indexes) {\n  var arrLength = array.length,\n      length = nativeMin(indexes.length, arrLength),\n      oldArray = copyArray(array);\n\n  while (length--) {\n    var index = indexes[length];\n    array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;\n  }\n  return array;\n}\n\nmodule.exports = reorder;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_reorder.js?");

/***/ }),

/***/ "./node_modules/lodash/_replaceHolders.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_replaceHolders.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used as the internal argument placeholder. */\nvar PLACEHOLDER = '__lodash_placeholder__';\n\n/**\n * Replaces all `placeholder` elements in `array` with an internal placeholder\n * and returns an array of their indexes.\n *\n * @private\n * @param {Array} array The array to modify.\n * @param {*} placeholder The placeholder to replace.\n * @returns {Array} Returns the new array of placeholder indexes.\n */\nfunction replaceHolders(array, placeholder) {\n  var index = -1,\n      length = array.length,\n      resIndex = 0,\n      result = [];\n\n  while (++index < length) {\n    var value = array[index];\n    if (value === placeholder || value === PLACEHOLDER) {\n      array[index] = PLACEHOLDER;\n      result[resIndex++] = index;\n    }\n  }\n  return result;\n}\n\nmodule.exports = replaceHolders;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_replaceHolders.js?");

/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ \"./node_modules/lodash/_freeGlobal.js\");\n\n/** Detect free variable `self`. */\nvar freeSelf = typeof self == 'object' && self && self.Object === Object && self;\n\n/** Used as a reference to the global object. */\nvar root = freeGlobal || freeSelf || Function('return this')();\n\nmodule.exports = root;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_root.js?");

/***/ }),

/***/ "./node_modules/lodash/_setCacheAdd.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setCacheAdd.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used to stand-in for `undefined` hash values. */\nvar HASH_UNDEFINED = '__lodash_hash_undefined__';\n\n/**\n * Adds `value` to the array cache.\n *\n * @private\n * @name add\n * @memberOf SetCache\n * @alias push\n * @param {*} value The value to cache.\n * @returns {Object} Returns the cache instance.\n */\nfunction setCacheAdd(value) {\n  this.__data__.set(value, HASH_UNDEFINED);\n  return this;\n}\n\nmodule.exports = setCacheAdd;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_setCacheAdd.js?");

/***/ }),

/***/ "./node_modules/lodash/_setCacheHas.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setCacheHas.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is in the array cache.\n *\n * @private\n * @name has\n * @memberOf SetCache\n * @param {*} value The value to search for.\n * @returns {number} Returns `true` if `value` is found, else `false`.\n */\nfunction setCacheHas(value) {\n  return this.__data__.has(value);\n}\n\nmodule.exports = setCacheHas;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_setCacheHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_setData.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_setData.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseSetData = __webpack_require__(/*! ./_baseSetData */ \"./node_modules/lodash/_baseSetData.js\"),\n    shortOut = __webpack_require__(/*! ./_shortOut */ \"./node_modules/lodash/_shortOut.js\");\n\n/**\n * Sets metadata for `func`.\n *\n * **Note:** If this function becomes hot, i.e. is invoked a lot in a short\n * period of time, it will trip its breaker and transition to an identity\n * function to avoid garbage collection pauses in V8. See\n * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)\n * for more details.\n *\n * @private\n * @param {Function} func The function to associate metadata with.\n * @param {*} data The metadata.\n * @returns {Function} Returns `func`.\n */\nvar setData = shortOut(baseSetData);\n\nmodule.exports = setData;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_setData.js?");

/***/ }),

/***/ "./node_modules/lodash/_setToArray.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_setToArray.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Converts `set` to an array of its values.\n *\n * @private\n * @param {Object} set The set to convert.\n * @returns {Array} Returns the values.\n */\nfunction setToArray(set) {\n  var index = -1,\n      result = Array(set.size);\n\n  set.forEach(function(value) {\n    result[++index] = value;\n  });\n  return result;\n}\n\nmodule.exports = setToArray;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_setToArray.js?");

/***/ }),

/***/ "./node_modules/lodash/_setToString.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setToString.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseSetToString = __webpack_require__(/*! ./_baseSetToString */ \"./node_modules/lodash/_baseSetToString.js\"),\n    shortOut = __webpack_require__(/*! ./_shortOut */ \"./node_modules/lodash/_shortOut.js\");\n\n/**\n * Sets the `toString` method of `func` to return `string`.\n *\n * @private\n * @param {Function} func The function to modify.\n * @param {Function} string The `toString` result.\n * @returns {Function} Returns `func`.\n */\nvar setToString = shortOut(baseSetToString);\n\nmodule.exports = setToString;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_setToString.js?");

/***/ }),

/***/ "./node_modules/lodash/_setWrapToString.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_setWrapToString.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getWrapDetails = __webpack_require__(/*! ./_getWrapDetails */ \"./node_modules/lodash/_getWrapDetails.js\"),\n    insertWrapDetails = __webpack_require__(/*! ./_insertWrapDetails */ \"./node_modules/lodash/_insertWrapDetails.js\"),\n    setToString = __webpack_require__(/*! ./_setToString */ \"./node_modules/lodash/_setToString.js\"),\n    updateWrapDetails = __webpack_require__(/*! ./_updateWrapDetails */ \"./node_modules/lodash/_updateWrapDetails.js\");\n\n/**\n * Sets the `toString` method of `wrapper` to mimic the source of `reference`\n * with wrapper details in a comment at the top of the source body.\n *\n * @private\n * @param {Function} wrapper The function to modify.\n * @param {Function} reference The reference function.\n * @param {number} bitmask The bitmask flags. See `createWrap` for more details.\n * @returns {Function} Returns `wrapper`.\n */\nfunction setWrapToString(wrapper, reference, bitmask) {\n  var source = (reference + '');\n  return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));\n}\n\nmodule.exports = setWrapToString;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_setWrapToString.js?");

/***/ }),

/***/ "./node_modules/lodash/_shortOut.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_shortOut.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used to detect hot functions by number of calls within a span of milliseconds. */\nvar HOT_COUNT = 800,\n    HOT_SPAN = 16;\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeNow = Date.now;\n\n/**\n * Creates a function that'll short out and invoke `identity` instead\n * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`\n * milliseconds.\n *\n * @private\n * @param {Function} func The function to restrict.\n * @returns {Function} Returns the new shortable function.\n */\nfunction shortOut(func) {\n  var count = 0,\n      lastCalled = 0;\n\n  return function() {\n    var stamp = nativeNow(),\n        remaining = HOT_SPAN - (stamp - lastCalled);\n\n    lastCalled = stamp;\n    if (remaining > 0) {\n      if (++count >= HOT_COUNT) {\n        return arguments[0];\n      }\n    } else {\n      count = 0;\n    }\n    return func.apply(undefined, arguments);\n  };\n}\n\nmodule.exports = shortOut;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_shortOut.js?");

/***/ }),

/***/ "./node_modules/lodash/_stackClear.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_stackClear.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var ListCache = __webpack_require__(/*! ./_ListCache */ \"./node_modules/lodash/_ListCache.js\");\n\n/**\n * Removes all key-value entries from the stack.\n *\n * @private\n * @name clear\n * @memberOf Stack\n */\nfunction stackClear() {\n  this.__data__ = new ListCache;\n  this.size = 0;\n}\n\nmodule.exports = stackClear;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_stackClear.js?");

/***/ }),

/***/ "./node_modules/lodash/_stackDelete.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_stackDelete.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Removes `key` and its value from the stack.\n *\n * @private\n * @name delete\n * @memberOf Stack\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction stackDelete(key) {\n  var data = this.__data__,\n      result = data['delete'](key);\n\n  this.size = data.size;\n  return result;\n}\n\nmodule.exports = stackDelete;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_stackDelete.js?");

/***/ }),

/***/ "./node_modules/lodash/_stackGet.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackGet.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Gets the stack value for `key`.\n *\n * @private\n * @name get\n * @memberOf Stack\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction stackGet(key) {\n  return this.__data__.get(key);\n}\n\nmodule.exports = stackGet;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_stackGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_stackHas.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackHas.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if a stack value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf Stack\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction stackHas(key) {\n  return this.__data__.has(key);\n}\n\nmodule.exports = stackHas;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_stackHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_stackSet.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackSet.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var ListCache = __webpack_require__(/*! ./_ListCache */ \"./node_modules/lodash/_ListCache.js\"),\n    Map = __webpack_require__(/*! ./_Map */ \"./node_modules/lodash/_Map.js\"),\n    MapCache = __webpack_require__(/*! ./_MapCache */ \"./node_modules/lodash/_MapCache.js\");\n\n/** Used as the size to enable large array optimizations. */\nvar LARGE_ARRAY_SIZE = 200;\n\n/**\n * Sets the stack `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf Stack\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the stack cache instance.\n */\nfunction stackSet(key, value) {\n  var data = this.__data__;\n  if (data instanceof ListCache) {\n    var pairs = data.__data__;\n    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {\n      pairs.push([key, value]);\n      this.size = ++data.size;\n      return this;\n    }\n    data = this.__data__ = new MapCache(pairs);\n  }\n  data.set(key, value);\n  this.size = data.size;\n  return this;\n}\n\nmodule.exports = stackSet;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_stackSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_strictIndexOf.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_strictIndexOf.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A specialized version of `_.indexOf` which performs strict equality\n * comparisons of values, i.e. `===`.\n *\n * @private\n * @param {Array} array The array to inspect.\n * @param {*} value The value to search for.\n * @param {number} fromIndex The index to search from.\n * @returns {number} Returns the index of the matched value, else `-1`.\n */\nfunction strictIndexOf(array, value, fromIndex) {\n  var index = fromIndex - 1,\n      length = array.length;\n\n  while (++index < length) {\n    if (array[index] === value) {\n      return index;\n    }\n  }\n  return -1;\n}\n\nmodule.exports = strictIndexOf;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_strictIndexOf.js?");

/***/ }),

/***/ "./node_modules/lodash/_stringToPath.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_stringToPath.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var memoizeCapped = __webpack_require__(/*! ./_memoizeCapped */ \"./node_modules/lodash/_memoizeCapped.js\");\n\n/** Used to match property names within property paths. */\nvar rePropName = /[^.[\\]]+|\\[(?:(-?\\d+(?:\\.\\d+)?)|([\"'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2)\\]|(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))/g;\n\n/** Used to match backslashes in property paths. */\nvar reEscapeChar = /\\\\(\\\\)?/g;\n\n/**\n * Converts `string` to a property path array.\n *\n * @private\n * @param {string} string The string to convert.\n * @returns {Array} Returns the property path array.\n */\nvar stringToPath = memoizeCapped(function(string) {\n  var result = [];\n  if (string.charCodeAt(0) === 46 /* . */) {\n    result.push('');\n  }\n  string.replace(rePropName, function(match, number, quote, subString) {\n    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));\n  });\n  return result;\n});\n\nmodule.exports = stringToPath;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_stringToPath.js?");

/***/ }),

/***/ "./node_modules/lodash/_toKey.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_toKey.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isSymbol = __webpack_require__(/*! ./isSymbol */ \"./node_modules/lodash/isSymbol.js\");\n\n/** Used as references for various `Number` constants. */\nvar INFINITY = 1 / 0;\n\n/**\n * Converts `value` to a string key if it's not a string or symbol.\n *\n * @private\n * @param {*} value The value to inspect.\n * @returns {string|symbol} Returns the key.\n */\nfunction toKey(value) {\n  if (typeof value == 'string' || isSymbol(value)) {\n    return value;\n  }\n  var result = (value + '');\n  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;\n}\n\nmodule.exports = toKey;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_toKey.js?");

/***/ }),

/***/ "./node_modules/lodash/_toSource.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_toSource.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used for built-in method references. */\nvar funcProto = Function.prototype;\n\n/** Used to resolve the decompiled source of functions. */\nvar funcToString = funcProto.toString;\n\n/**\n * Converts `func` to its source code.\n *\n * @private\n * @param {Function} func The function to convert.\n * @returns {string} Returns the source code.\n */\nfunction toSource(func) {\n  if (func != null) {\n    try {\n      return funcToString.call(func);\n    } catch (e) {}\n    try {\n      return (func + '');\n    } catch (e) {}\n  }\n  return '';\n}\n\nmodule.exports = toSource;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_toSource.js?");

/***/ }),

/***/ "./node_modules/lodash/_updateWrapDetails.js":
/*!***************************************************!*\
  !*** ./node_modules/lodash/_updateWrapDetails.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayEach = __webpack_require__(/*! ./_arrayEach */ \"./node_modules/lodash/_arrayEach.js\"),\n    arrayIncludes = __webpack_require__(/*! ./_arrayIncludes */ \"./node_modules/lodash/_arrayIncludes.js\");\n\n/** Used to compose bitmasks for function metadata. */\nvar WRAP_BIND_FLAG = 1,\n    WRAP_BIND_KEY_FLAG = 2,\n    WRAP_CURRY_FLAG = 8,\n    WRAP_CURRY_RIGHT_FLAG = 16,\n    WRAP_PARTIAL_FLAG = 32,\n    WRAP_PARTIAL_RIGHT_FLAG = 64,\n    WRAP_ARY_FLAG = 128,\n    WRAP_REARG_FLAG = 256,\n    WRAP_FLIP_FLAG = 512;\n\n/** Used to associate wrap methods with their bit flags. */\nvar wrapFlags = [\n  ['ary', WRAP_ARY_FLAG],\n  ['bind', WRAP_BIND_FLAG],\n  ['bindKey', WRAP_BIND_KEY_FLAG],\n  ['curry', WRAP_CURRY_FLAG],\n  ['curryRight', WRAP_CURRY_RIGHT_FLAG],\n  ['flip', WRAP_FLIP_FLAG],\n  ['partial', WRAP_PARTIAL_FLAG],\n  ['partialRight', WRAP_PARTIAL_RIGHT_FLAG],\n  ['rearg', WRAP_REARG_FLAG]\n];\n\n/**\n * Updates wrapper `details` based on `bitmask` flags.\n *\n * @private\n * @returns {Array} details The details to modify.\n * @param {number} bitmask The bitmask flags. See `createWrap` for more details.\n * @returns {Array} Returns `details`.\n */\nfunction updateWrapDetails(details, bitmask) {\n  arrayEach(wrapFlags, function(pair) {\n    var value = '_.' + pair[0];\n    if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {\n      details.push(value);\n    }\n  });\n  return details.sort();\n}\n\nmodule.exports = updateWrapDetails;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_updateWrapDetails.js?");

/***/ }),

/***/ "./node_modules/lodash/_wrapperClone.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_wrapperClone.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var LazyWrapper = __webpack_require__(/*! ./_LazyWrapper */ \"./node_modules/lodash/_LazyWrapper.js\"),\n    LodashWrapper = __webpack_require__(/*! ./_LodashWrapper */ \"./node_modules/lodash/_LodashWrapper.js\"),\n    copyArray = __webpack_require__(/*! ./_copyArray */ \"./node_modules/lodash/_copyArray.js\");\n\n/**\n * Creates a clone of `wrapper`.\n *\n * @private\n * @param {Object} wrapper The wrapper to clone.\n * @returns {Object} Returns the cloned wrapper.\n */\nfunction wrapperClone(wrapper) {\n  if (wrapper instanceof LazyWrapper) {\n    return wrapper.clone();\n  }\n  var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);\n  result.__actions__ = copyArray(wrapper.__actions__);\n  result.__index__  = wrapper.__index__;\n  result.__values__ = wrapper.__values__;\n  return result;\n}\n\nmodule.exports = wrapperClone;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/_wrapperClone.js?");

/***/ }),

/***/ "./node_modules/lodash/constant.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/constant.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Creates a function that returns `value`.\n *\n * @static\n * @memberOf _\n * @since 2.4.0\n * @category Util\n * @param {*} value The value to return from the new function.\n * @returns {Function} Returns the new constant function.\n * @example\n *\n * var objects = _.times(2, _.constant({ 'a': 1 }));\n *\n * console.log(objects);\n * // => [{ 'a': 1 }, { 'a': 1 }]\n *\n * console.log(objects[0] === objects[1]);\n * // => true\n */\nfunction constant(value) {\n  return function() {\n    return value;\n  };\n}\n\nmodule.exports = constant;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/constant.js?");

/***/ }),

/***/ "./node_modules/lodash/curry.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/curry.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var createWrap = __webpack_require__(/*! ./_createWrap */ \"./node_modules/lodash/_createWrap.js\");\n\n/** Used to compose bitmasks for function metadata. */\nvar WRAP_CURRY_FLAG = 8;\n\n/**\n * Creates a function that accepts arguments of `func` and either invokes\n * `func` returning its result, if at least `arity` number of arguments have\n * been provided, or returns a function that accepts the remaining `func`\n * arguments, and so on. The arity of `func` may be specified if `func.length`\n * is not sufficient.\n *\n * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,\n * may be used as a placeholder for provided arguments.\n *\n * **Note:** This method doesn't set the \"length\" property of curried functions.\n *\n * @static\n * @memberOf _\n * @since 2.0.0\n * @category Function\n * @param {Function} func The function to curry.\n * @param {number} [arity=func.length] The arity of `func`.\n * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.\n * @returns {Function} Returns the new curried function.\n * @example\n *\n * var abc = function(a, b, c) {\n *   return [a, b, c];\n * };\n *\n * var curried = _.curry(abc);\n *\n * curried(1)(2)(3);\n * // => [1, 2, 3]\n *\n * curried(1, 2)(3);\n * // => [1, 2, 3]\n *\n * curried(1, 2, 3);\n * // => [1, 2, 3]\n *\n * // Curried with placeholders.\n * curried(1)(_, 3)(2);\n * // => [1, 2, 3]\n */\nfunction curry(func, arity, guard) {\n  arity = guard ? undefined : arity;\n  var result = createWrap(func, WRAP_CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);\n  result.placeholder = curry.placeholder;\n  return result;\n}\n\n// Assign default placeholders.\ncurry.placeholder = {};\n\nmodule.exports = curry;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/curry.js?");

/***/ }),

/***/ "./node_modules/lodash/eq.js":
/*!***********************************!*\
  !*** ./node_modules/lodash/eq.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Performs a\n * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)\n * comparison between two values to determine if they are equivalent.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to compare.\n * @param {*} other The other value to compare.\n * @returns {boolean} Returns `true` if the values are equivalent, else `false`.\n * @example\n *\n * var object = { 'a': 1 };\n * var other = { 'a': 1 };\n *\n * _.eq(object, object);\n * // => true\n *\n * _.eq(object, other);\n * // => false\n *\n * _.eq('a', 'a');\n * // => true\n *\n * _.eq('a', Object('a'));\n * // => false\n *\n * _.eq(NaN, NaN);\n * // => true\n */\nfunction eq(value, other) {\n  return value === other || (value !== value && other !== other);\n}\n\nmodule.exports = eq;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/eq.js?");

/***/ }),

/***/ "./node_modules/lodash/find.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/find.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var createFind = __webpack_require__(/*! ./_createFind */ \"./node_modules/lodash/_createFind.js\"),\n    findIndex = __webpack_require__(/*! ./findIndex */ \"./node_modules/lodash/findIndex.js\");\n\n/**\n * Iterates over elements of `collection`, returning the first element\n * `predicate` returns truthy for. The predicate is invoked with three\n * arguments: (value, index|key, collection).\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Collection\n * @param {Array|Object} collection The collection to inspect.\n * @param {Function} [predicate=_.identity] The function invoked per iteration.\n * @param {number} [fromIndex=0] The index to search from.\n * @returns {*} Returns the matched element, else `undefined`.\n * @example\n *\n * var users = [\n *   { 'user': 'barney',  'age': 36, 'active': true },\n *   { 'user': 'fred',    'age': 40, 'active': false },\n *   { 'user': 'pebbles', 'age': 1,  'active': true }\n * ];\n *\n * _.find(users, function(o) { return o.age < 40; });\n * // => object for 'barney'\n *\n * // The `_.matches` iteratee shorthand.\n * _.find(users, { 'age': 1, 'active': true });\n * // => object for 'pebbles'\n *\n * // The `_.matchesProperty` iteratee shorthand.\n * _.find(users, ['active', false]);\n * // => object for 'fred'\n *\n * // The `_.property` iteratee shorthand.\n * _.find(users, 'active');\n * // => object for 'barney'\n */\nvar find = createFind(findIndex);\n\nmodule.exports = find;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/find.js?");

/***/ }),

/***/ "./node_modules/lodash/findIndex.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/findIndex.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseFindIndex = __webpack_require__(/*! ./_baseFindIndex */ \"./node_modules/lodash/_baseFindIndex.js\"),\n    baseIteratee = __webpack_require__(/*! ./_baseIteratee */ \"./node_modules/lodash/_baseIteratee.js\"),\n    toInteger = __webpack_require__(/*! ./toInteger */ \"./node_modules/lodash/toInteger.js\");\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeMax = Math.max;\n\n/**\n * This method is like `_.find` except that it returns the index of the first\n * element `predicate` returns truthy for instead of the element itself.\n *\n * @static\n * @memberOf _\n * @since 1.1.0\n * @category Array\n * @param {Array} array The array to inspect.\n * @param {Function} [predicate=_.identity] The function invoked per iteration.\n * @param {number} [fromIndex=0] The index to search from.\n * @returns {number} Returns the index of the found element, else `-1`.\n * @example\n *\n * var users = [\n *   { 'user': 'barney',  'active': false },\n *   { 'user': 'fred',    'active': false },\n *   { 'user': 'pebbles', 'active': true }\n * ];\n *\n * _.findIndex(users, function(o) { return o.user == 'barney'; });\n * // => 0\n *\n * // The `_.matches` iteratee shorthand.\n * _.findIndex(users, { 'user': 'fred', 'active': false });\n * // => 1\n *\n * // The `_.matchesProperty` iteratee shorthand.\n * _.findIndex(users, ['active', false]);\n * // => 0\n *\n * // The `_.property` iteratee shorthand.\n * _.findIndex(users, 'active');\n * // => 2\n */\nfunction findIndex(array, predicate, fromIndex) {\n  var length = array == null ? 0 : array.length;\n  if (!length) {\n    return -1;\n  }\n  var index = fromIndex == null ? 0 : toInteger(fromIndex);\n  if (index < 0) {\n    index = nativeMax(length + index, 0);\n  }\n  return baseFindIndex(array, baseIteratee(predicate, 3), index);\n}\n\nmodule.exports = findIndex;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/findIndex.js?");

/***/ }),

/***/ "./node_modules/lodash/forEach.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/forEach.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayEach = __webpack_require__(/*! ./_arrayEach */ \"./node_modules/lodash/_arrayEach.js\"),\n    baseEach = __webpack_require__(/*! ./_baseEach */ \"./node_modules/lodash/_baseEach.js\"),\n    castFunction = __webpack_require__(/*! ./_castFunction */ \"./node_modules/lodash/_castFunction.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\");\n\n/**\n * Iterates over elements of `collection` and invokes `iteratee` for each element.\n * The iteratee is invoked with three arguments: (value, index|key, collection).\n * Iteratee functions may exit iteration early by explicitly returning `false`.\n *\n * **Note:** As with other \"Collections\" methods, objects with a \"length\"\n * property are iterated like arrays. To avoid this behavior use `_.forIn`\n * or `_.forOwn` for object iteration.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @alias each\n * @category Collection\n * @param {Array|Object} collection The collection to iterate over.\n * @param {Function} [iteratee=_.identity] The function invoked per iteration.\n * @returns {Array|Object} Returns `collection`.\n * @see _.forEachRight\n * @example\n *\n * _.forEach([1, 2], function(value) {\n *   console.log(value);\n * });\n * // => Logs `1` then `2`.\n *\n * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {\n *   console.log(key);\n * });\n * // => Logs 'a' then 'b' (iteration order is not guaranteed).\n */\nfunction forEach(collection, iteratee) {\n  var func = isArray(collection) ? arrayEach : baseEach;\n  return func(collection, castFunction(iteratee));\n}\n\nmodule.exports = forEach;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/forEach.js?");

/***/ }),

/***/ "./node_modules/lodash/get.js":
/*!************************************!*\
  !*** ./node_modules/lodash/get.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGet = __webpack_require__(/*! ./_baseGet */ \"./node_modules/lodash/_baseGet.js\");\n\n/**\n * Gets the value at `path` of `object`. If the resolved value is\n * `undefined`, the `defaultValue` is returned in its place.\n *\n * @static\n * @memberOf _\n * @since 3.7.0\n * @category Object\n * @param {Object} object The object to query.\n * @param {Array|string} path The path of the property to get.\n * @param {*} [defaultValue] The value returned for `undefined` resolved values.\n * @returns {*} Returns the resolved value.\n * @example\n *\n * var object = { 'a': [{ 'b': { 'c': 3 } }] };\n *\n * _.get(object, 'a[0].b.c');\n * // => 3\n *\n * _.get(object, ['a', '0', 'b', 'c']);\n * // => 3\n *\n * _.get(object, 'a.b.c', 'default');\n * // => 'default'\n */\nfunction get(object, path, defaultValue) {\n  var result = object == null ? undefined : baseGet(object, path);\n  return result === undefined ? defaultValue : result;\n}\n\nmodule.exports = get;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/get.js?");

/***/ }),

/***/ "./node_modules/lodash/hasIn.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/hasIn.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseHasIn = __webpack_require__(/*! ./_baseHasIn */ \"./node_modules/lodash/_baseHasIn.js\"),\n    hasPath = __webpack_require__(/*! ./_hasPath */ \"./node_modules/lodash/_hasPath.js\");\n\n/**\n * Checks if `path` is a direct or inherited property of `object`.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Object\n * @param {Object} object The object to query.\n * @param {Array|string} path The path to check.\n * @returns {boolean} Returns `true` if `path` exists, else `false`.\n * @example\n *\n * var object = _.create({ 'a': _.create({ 'b': 2 }) });\n *\n * _.hasIn(object, 'a');\n * // => true\n *\n * _.hasIn(object, 'a.b');\n * // => true\n *\n * _.hasIn(object, ['a', 'b']);\n * // => true\n *\n * _.hasIn(object, 'b');\n * // => false\n */\nfunction hasIn(object, path) {\n  return object != null && hasPath(object, path, baseHasIn);\n}\n\nmodule.exports = hasIn;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/hasIn.js?");

/***/ }),

/***/ "./node_modules/lodash/identity.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/identity.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns the first argument it receives.\n *\n * @static\n * @since 0.1.0\n * @memberOf _\n * @category Util\n * @param {*} value Any value.\n * @returns {*} Returns `value`.\n * @example\n *\n * var object = { 'a': 1 };\n *\n * console.log(_.identity(object) === object);\n * // => true\n */\nfunction identity(value) {\n  return value;\n}\n\nmodule.exports = identity;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/identity.js?");

/***/ }),

/***/ "./node_modules/lodash/isArguments.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArguments.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ \"./node_modules/lodash/_baseIsArguments.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/** Built-in value references. */\nvar propertyIsEnumerable = objectProto.propertyIsEnumerable;\n\n/**\n * Checks if `value` is likely an `arguments` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an `arguments` object,\n *  else `false`.\n * @example\n *\n * _.isArguments(function() { return arguments; }());\n * // => true\n *\n * _.isArguments([1, 2, 3]);\n * // => false\n */\nvar isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {\n  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&\n    !propertyIsEnumerable.call(value, 'callee');\n};\n\nmodule.exports = isArguments;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/isArguments.js?");

/***/ }),

/***/ "./node_modules/lodash/isArray.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isArray.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is classified as an `Array` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an array, else `false`.\n * @example\n *\n * _.isArray([1, 2, 3]);\n * // => true\n *\n * _.isArray(document.body.children);\n * // => false\n *\n * _.isArray('abc');\n * // => false\n *\n * _.isArray(_.noop);\n * // => false\n */\nvar isArray = Array.isArray;\n\nmodule.exports = isArray;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/isArray.js?");

/***/ }),

/***/ "./node_modules/lodash/isArrayLike.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArrayLike.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isFunction = __webpack_require__(/*! ./isFunction */ \"./node_modules/lodash/isFunction.js\"),\n    isLength = __webpack_require__(/*! ./isLength */ \"./node_modules/lodash/isLength.js\");\n\n/**\n * Checks if `value` is array-like. A value is considered array-like if it's\n * not a function and has a `value.length` that's an integer greater than or\n * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is array-like, else `false`.\n * @example\n *\n * _.isArrayLike([1, 2, 3]);\n * // => true\n *\n * _.isArrayLike(document.body.children);\n * // => true\n *\n * _.isArrayLike('abc');\n * // => true\n *\n * _.isArrayLike(_.noop);\n * // => false\n */\nfunction isArrayLike(value) {\n  return value != null && isLength(value.length) && !isFunction(value);\n}\n\nmodule.exports = isArrayLike;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/isArrayLike.js?");

/***/ }),

/***/ "./node_modules/lodash/isBuffer.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isBuffer.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\"),\n    stubFalse = __webpack_require__(/*! ./stubFalse */ \"./node_modules/lodash/stubFalse.js\");\n\n/** Detect free variable `exports`. */\nvar freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;\n\n/** Detect free variable `module`. */\nvar freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;\n\n/** Detect the popular CommonJS extension `module.exports`. */\nvar moduleExports = freeModule && freeModule.exports === freeExports;\n\n/** Built-in value references. */\nvar Buffer = moduleExports ? root.Buffer : undefined;\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;\n\n/**\n * Checks if `value` is a buffer.\n *\n * @static\n * @memberOf _\n * @since 4.3.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.\n * @example\n *\n * _.isBuffer(new Buffer(2));\n * // => true\n *\n * _.isBuffer(new Uint8Array(2));\n * // => false\n */\nvar isBuffer = nativeIsBuffer || stubFalse;\n\nmodule.exports = isBuffer;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/isBuffer.js?");

/***/ }),

/***/ "./node_modules/lodash/isFunction.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/isFunction.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\");\n\n/** `Object#toString` result references. */\nvar asyncTag = '[object AsyncFunction]',\n    funcTag = '[object Function]',\n    genTag = '[object GeneratorFunction]',\n    proxyTag = '[object Proxy]';\n\n/**\n * Checks if `value` is classified as a `Function` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a function, else `false`.\n * @example\n *\n * _.isFunction(_);\n * // => true\n *\n * _.isFunction(/abc/);\n * // => false\n */\nfunction isFunction(value) {\n  if (!isObject(value)) {\n    return false;\n  }\n  // The use of `Object#toString` avoids issues with the `typeof` operator\n  // in Safari 9 which returns 'object' for typed arrays and other constructors.\n  var tag = baseGetTag(value);\n  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;\n}\n\nmodule.exports = isFunction;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/isFunction.js?");

/***/ }),

/***/ "./node_modules/lodash/isLength.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isLength.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used as references for various `Number` constants. */\nvar MAX_SAFE_INTEGER = 9007199254740991;\n\n/**\n * Checks if `value` is a valid array-like length.\n *\n * **Note:** This method is loosely based on\n * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.\n * @example\n *\n * _.isLength(3);\n * // => true\n *\n * _.isLength(Number.MIN_VALUE);\n * // => false\n *\n * _.isLength(Infinity);\n * // => false\n *\n * _.isLength('3');\n * // => false\n */\nfunction isLength(value) {\n  return typeof value == 'number' &&\n    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;\n}\n\nmodule.exports = isLength;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/isLength.js?");

/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is the\n * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)\n * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an object, else `false`.\n * @example\n *\n * _.isObject({});\n * // => true\n *\n * _.isObject([1, 2, 3]);\n * // => true\n *\n * _.isObject(_.noop);\n * // => true\n *\n * _.isObject(null);\n * // => false\n */\nfunction isObject(value) {\n  var type = typeof value;\n  return value != null && (type == 'object' || type == 'function');\n}\n\nmodule.exports = isObject;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/isObject.js?");

/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is object-like. A value is object-like if it's not `null`\n * and has a `typeof` result of \"object\".\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is object-like, else `false`.\n * @example\n *\n * _.isObjectLike({});\n * // => true\n *\n * _.isObjectLike([1, 2, 3]);\n * // => true\n *\n * _.isObjectLike(_.noop);\n * // => false\n *\n * _.isObjectLike(null);\n * // => false\n */\nfunction isObjectLike(value) {\n  return value != null && typeof value == 'object';\n}\n\nmodule.exports = isObjectLike;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/isObjectLike.js?");

/***/ }),

/***/ "./node_modules/lodash/isSymbol.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isSymbol.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar symbolTag = '[object Symbol]';\n\n/**\n * Checks if `value` is classified as a `Symbol` primitive or object.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.\n * @example\n *\n * _.isSymbol(Symbol.iterator);\n * // => true\n *\n * _.isSymbol('abc');\n * // => false\n */\nfunction isSymbol(value) {\n  return typeof value == 'symbol' ||\n    (isObjectLike(value) && baseGetTag(value) == symbolTag);\n}\n\nmodule.exports = isSymbol;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/isSymbol.js?");

/***/ }),

/***/ "./node_modules/lodash/isTypedArray.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isTypedArray.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsTypedArray = __webpack_require__(/*! ./_baseIsTypedArray */ \"./node_modules/lodash/_baseIsTypedArray.js\"),\n    baseUnary = __webpack_require__(/*! ./_baseUnary */ \"./node_modules/lodash/_baseUnary.js\"),\n    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ \"./node_modules/lodash/_nodeUtil.js\");\n\n/* Node.js helper references. */\nvar nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;\n\n/**\n * Checks if `value` is classified as a typed array.\n *\n * @static\n * @memberOf _\n * @since 3.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.\n * @example\n *\n * _.isTypedArray(new Uint8Array);\n * // => true\n *\n * _.isTypedArray([]);\n * // => false\n */\nvar isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;\n\nmodule.exports = isTypedArray;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/isTypedArray.js?");

/***/ }),

/***/ "./node_modules/lodash/keys.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/keys.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ \"./node_modules/lodash/_arrayLikeKeys.js\"),\n    baseKeys = __webpack_require__(/*! ./_baseKeys */ \"./node_modules/lodash/_baseKeys.js\"),\n    isArrayLike = __webpack_require__(/*! ./isArrayLike */ \"./node_modules/lodash/isArrayLike.js\");\n\n/**\n * Creates an array of the own enumerable property names of `object`.\n *\n * **Note:** Non-object values are coerced to objects. See the\n * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)\n * for more details.\n *\n * @static\n * @since 0.1.0\n * @memberOf _\n * @category Object\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names.\n * @example\n *\n * function Foo() {\n *   this.a = 1;\n *   this.b = 2;\n * }\n *\n * Foo.prototype.c = 3;\n *\n * _.keys(new Foo);\n * // => ['a', 'b'] (iteration order is not guaranteed)\n *\n * _.keys('hi');\n * // => ['0', '1']\n */\nfunction keys(object) {\n  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);\n}\n\nmodule.exports = keys;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/keys.js?");

/***/ }),

/***/ "./node_modules/lodash/mapKeys.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/mapKeys.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ \"./node_modules/lodash/_baseAssignValue.js\"),\n    baseForOwn = __webpack_require__(/*! ./_baseForOwn */ \"./node_modules/lodash/_baseForOwn.js\"),\n    baseIteratee = __webpack_require__(/*! ./_baseIteratee */ \"./node_modules/lodash/_baseIteratee.js\");\n\n/**\n * The opposite of `_.mapValues`; this method creates an object with the\n * same values as `object` and keys generated by running each own enumerable\n * string keyed property of `object` thru `iteratee`. The iteratee is invoked\n * with three arguments: (value, key, object).\n *\n * @static\n * @memberOf _\n * @since 3.8.0\n * @category Object\n * @param {Object} object The object to iterate over.\n * @param {Function} [iteratee=_.identity] The function invoked per iteration.\n * @returns {Object} Returns the new mapped object.\n * @see _.mapValues\n * @example\n *\n * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {\n *   return key + value;\n * });\n * // => { 'a1': 1, 'b2': 2 }\n */\nfunction mapKeys(object, iteratee) {\n  var result = {};\n  iteratee = baseIteratee(iteratee, 3);\n\n  baseForOwn(object, function(value, key, object) {\n    baseAssignValue(result, iteratee(value, key, object), value);\n  });\n  return result;\n}\n\nmodule.exports = mapKeys;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/mapKeys.js?");

/***/ }),

/***/ "./node_modules/lodash/mapValues.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/mapValues.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ \"./node_modules/lodash/_baseAssignValue.js\"),\n    baseForOwn = __webpack_require__(/*! ./_baseForOwn */ \"./node_modules/lodash/_baseForOwn.js\"),\n    baseIteratee = __webpack_require__(/*! ./_baseIteratee */ \"./node_modules/lodash/_baseIteratee.js\");\n\n/**\n * Creates an object with the same keys as `object` and values generated\n * by running each own enumerable string keyed property of `object` thru\n * `iteratee`. The iteratee is invoked with three arguments:\n * (value, key, object).\n *\n * @static\n * @memberOf _\n * @since 2.4.0\n * @category Object\n * @param {Object} object The object to iterate over.\n * @param {Function} [iteratee=_.identity] The function invoked per iteration.\n * @returns {Object} Returns the new mapped object.\n * @see _.mapKeys\n * @example\n *\n * var users = {\n *   'fred':    { 'user': 'fred',    'age': 40 },\n *   'pebbles': { 'user': 'pebbles', 'age': 1 }\n * };\n *\n * _.mapValues(users, function(o) { return o.age; });\n * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)\n *\n * // The `_.property` iteratee shorthand.\n * _.mapValues(users, 'age');\n * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)\n */\nfunction mapValues(object, iteratee) {\n  var result = {};\n  iteratee = baseIteratee(iteratee, 3);\n\n  baseForOwn(object, function(value, key, object) {\n    baseAssignValue(result, key, iteratee(value, key, object));\n  });\n  return result;\n}\n\nmodule.exports = mapValues;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/mapValues.js?");

/***/ }),

/***/ "./node_modules/lodash/memoize.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/memoize.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var MapCache = __webpack_require__(/*! ./_MapCache */ \"./node_modules/lodash/_MapCache.js\");\n\n/** Error message constants. */\nvar FUNC_ERROR_TEXT = 'Expected a function';\n\n/**\n * Creates a function that memoizes the result of `func`. If `resolver` is\n * provided, it determines the cache key for storing the result based on the\n * arguments provided to the memoized function. By default, the first argument\n * provided to the memoized function is used as the map cache key. The `func`\n * is invoked with the `this` binding of the memoized function.\n *\n * **Note:** The cache is exposed as the `cache` property on the memoized\n * function. Its creation may be customized by replacing the `_.memoize.Cache`\n * constructor with one whose instances implement the\n * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)\n * method interface of `clear`, `delete`, `get`, `has`, and `set`.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Function\n * @param {Function} func The function to have its output memoized.\n * @param {Function} [resolver] The function to resolve the cache key.\n * @returns {Function} Returns the new memoized function.\n * @example\n *\n * var object = { 'a': 1, 'b': 2 };\n * var other = { 'c': 3, 'd': 4 };\n *\n * var values = _.memoize(_.values);\n * values(object);\n * // => [1, 2]\n *\n * values(other);\n * // => [3, 4]\n *\n * object.a = 2;\n * values(object);\n * // => [1, 2]\n *\n * // Modify the result cache.\n * values.cache.set(object, ['a', 'b']);\n * values(object);\n * // => ['a', 'b']\n *\n * // Replace `_.memoize.Cache`.\n * _.memoize.Cache = WeakMap;\n */\nfunction memoize(func, resolver) {\n  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {\n    throw new TypeError(FUNC_ERROR_TEXT);\n  }\n  var memoized = function() {\n    var args = arguments,\n        key = resolver ? resolver.apply(this, args) : args[0],\n        cache = memoized.cache;\n\n    if (cache.has(key)) {\n      return cache.get(key);\n    }\n    var result = func.apply(this, args);\n    memoized.cache = cache.set(key, result) || cache;\n    return result;\n  };\n  memoized.cache = new (memoize.Cache || MapCache);\n  return memoized;\n}\n\n// Expose `MapCache`.\nmemoize.Cache = MapCache;\n\nmodule.exports = memoize;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/memoize.js?");

/***/ }),

/***/ "./node_modules/lodash/noop.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/noop.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns `undefined`.\n *\n * @static\n * @memberOf _\n * @since 2.3.0\n * @category Util\n * @example\n *\n * _.times(2, _.noop);\n * // => [undefined, undefined]\n */\nfunction noop() {\n  // No operation performed.\n}\n\nmodule.exports = noop;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/noop.js?");

/***/ }),

/***/ "./node_modules/lodash/property.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/property.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseProperty = __webpack_require__(/*! ./_baseProperty */ \"./node_modules/lodash/_baseProperty.js\"),\n    basePropertyDeep = __webpack_require__(/*! ./_basePropertyDeep */ \"./node_modules/lodash/_basePropertyDeep.js\"),\n    isKey = __webpack_require__(/*! ./_isKey */ \"./node_modules/lodash/_isKey.js\"),\n    toKey = __webpack_require__(/*! ./_toKey */ \"./node_modules/lodash/_toKey.js\");\n\n/**\n * Creates a function that returns the value at `path` of a given object.\n *\n * @static\n * @memberOf _\n * @since 2.4.0\n * @category Util\n * @param {Array|string} path The path of the property to get.\n * @returns {Function} Returns the new accessor function.\n * @example\n *\n * var objects = [\n *   { 'a': { 'b': 2 } },\n *   { 'a': { 'b': 1 } }\n * ];\n *\n * _.map(objects, _.property('a.b'));\n * // => [2, 1]\n *\n * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');\n * // => [1, 2]\n */\nfunction property(path) {\n  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);\n}\n\nmodule.exports = property;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/property.js?");

/***/ }),

/***/ "./node_modules/lodash/reduce.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/reduce.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayReduce = __webpack_require__(/*! ./_arrayReduce */ \"./node_modules/lodash/_arrayReduce.js\"),\n    baseEach = __webpack_require__(/*! ./_baseEach */ \"./node_modules/lodash/_baseEach.js\"),\n    baseIteratee = __webpack_require__(/*! ./_baseIteratee */ \"./node_modules/lodash/_baseIteratee.js\"),\n    baseReduce = __webpack_require__(/*! ./_baseReduce */ \"./node_modules/lodash/_baseReduce.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\");\n\n/**\n * Reduces `collection` to a value which is the accumulated result of running\n * each element in `collection` thru `iteratee`, where each successive\n * invocation is supplied the return value of the previous. If `accumulator`\n * is not given, the first element of `collection` is used as the initial\n * value. The iteratee is invoked with four arguments:\n * (accumulator, value, index|key, collection).\n *\n * Many lodash methods are guarded to work as iteratees for methods like\n * `_.reduce`, `_.reduceRight`, and `_.transform`.\n *\n * The guarded methods are:\n * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,\n * and `sortBy`\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Collection\n * @param {Array|Object} collection The collection to iterate over.\n * @param {Function} [iteratee=_.identity] The function invoked per iteration.\n * @param {*} [accumulator] The initial value.\n * @returns {*} Returns the accumulated value.\n * @see _.reduceRight\n * @example\n *\n * _.reduce([1, 2], function(sum, n) {\n *   return sum + n;\n * }, 0);\n * // => 3\n *\n * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {\n *   (result[value] || (result[value] = [])).push(key);\n *   return result;\n * }, {});\n * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)\n */\nfunction reduce(collection, iteratee, accumulator) {\n  var func = isArray(collection) ? arrayReduce : baseReduce,\n      initAccum = arguments.length < 3;\n\n  return func(collection, baseIteratee(iteratee, 4), accumulator, initAccum, baseEach);\n}\n\nmodule.exports = reduce;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/reduce.js?");

/***/ }),

/***/ "./node_modules/lodash/stubArray.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/stubArray.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns a new empty array.\n *\n * @static\n * @memberOf _\n * @since 4.13.0\n * @category Util\n * @returns {Array} Returns the new empty array.\n * @example\n *\n * var arrays = _.times(2, _.stubArray);\n *\n * console.log(arrays);\n * // => [[], []]\n *\n * console.log(arrays[0] === arrays[1]);\n * // => false\n */\nfunction stubArray() {\n  return [];\n}\n\nmodule.exports = stubArray;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/stubArray.js?");

/***/ }),

/***/ "./node_modules/lodash/stubFalse.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/stubFalse.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns `false`.\n *\n * @static\n * @memberOf _\n * @since 4.13.0\n * @category Util\n * @returns {boolean} Returns `false`.\n * @example\n *\n * _.times(2, _.stubFalse);\n * // => [false, false]\n */\nfunction stubFalse() {\n  return false;\n}\n\nmodule.exports = stubFalse;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/stubFalse.js?");

/***/ }),

/***/ "./node_modules/lodash/toFinite.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toFinite.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var toNumber = __webpack_require__(/*! ./toNumber */ \"./node_modules/lodash/toNumber.js\");\n\n/** Used as references for various `Number` constants. */\nvar INFINITY = 1 / 0,\n    MAX_INTEGER = 1.7976931348623157e+308;\n\n/**\n * Converts `value` to a finite number.\n *\n * @static\n * @memberOf _\n * @since 4.12.0\n * @category Lang\n * @param {*} value The value to convert.\n * @returns {number} Returns the converted number.\n * @example\n *\n * _.toFinite(3.2);\n * // => 3.2\n *\n * _.toFinite(Number.MIN_VALUE);\n * // => 5e-324\n *\n * _.toFinite(Infinity);\n * // => 1.7976931348623157e+308\n *\n * _.toFinite('3.2');\n * // => 3.2\n */\nfunction toFinite(value) {\n  if (!value) {\n    return value === 0 ? value : 0;\n  }\n  value = toNumber(value);\n  if (value === INFINITY || value === -INFINITY) {\n    var sign = (value < 0 ? -1 : 1);\n    return sign * MAX_INTEGER;\n  }\n  return value === value ? value : 0;\n}\n\nmodule.exports = toFinite;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/toFinite.js?");

/***/ }),

/***/ "./node_modules/lodash/toInteger.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/toInteger.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var toFinite = __webpack_require__(/*! ./toFinite */ \"./node_modules/lodash/toFinite.js\");\n\n/**\n * Converts `value` to an integer.\n *\n * **Note:** This method is loosely based on\n * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to convert.\n * @returns {number} Returns the converted integer.\n * @example\n *\n * _.toInteger(3.2);\n * // => 3\n *\n * _.toInteger(Number.MIN_VALUE);\n * // => 0\n *\n * _.toInteger(Infinity);\n * // => 1.7976931348623157e+308\n *\n * _.toInteger('3.2');\n * // => 3\n */\nfunction toInteger(value) {\n  var result = toFinite(value),\n      remainder = result % 1;\n\n  return result === result ? (remainder ? result - remainder : result) : 0;\n}\n\nmodule.exports = toInteger;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/toInteger.js?");

/***/ }),

/***/ "./node_modules/lodash/toNumber.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toNumber.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\"),\n    isSymbol = __webpack_require__(/*! ./isSymbol */ \"./node_modules/lodash/isSymbol.js\");\n\n/** Used as references for various `Number` constants. */\nvar NAN = 0 / 0;\n\n/** Used to match leading and trailing whitespace. */\nvar reTrim = /^\\s+|\\s+$/g;\n\n/** Used to detect bad signed hexadecimal string values. */\nvar reIsBadHex = /^[-+]0x[0-9a-f]+$/i;\n\n/** Used to detect binary string values. */\nvar reIsBinary = /^0b[01]+$/i;\n\n/** Used to detect octal string values. */\nvar reIsOctal = /^0o[0-7]+$/i;\n\n/** Built-in method references without a dependency on `root`. */\nvar freeParseInt = parseInt;\n\n/**\n * Converts `value` to a number.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to process.\n * @returns {number} Returns the number.\n * @example\n *\n * _.toNumber(3.2);\n * // => 3.2\n *\n * _.toNumber(Number.MIN_VALUE);\n * // => 5e-324\n *\n * _.toNumber(Infinity);\n * // => Infinity\n *\n * _.toNumber('3.2');\n * // => 3.2\n */\nfunction toNumber(value) {\n  if (typeof value == 'number') {\n    return value;\n  }\n  if (isSymbol(value)) {\n    return NAN;\n  }\n  if (isObject(value)) {\n    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;\n    value = isObject(other) ? (other + '') : other;\n  }\n  if (typeof value != 'string') {\n    return value === 0 ? value : +value;\n  }\n  value = value.replace(reTrim, '');\n  var isBinary = reIsBinary.test(value);\n  return (isBinary || reIsOctal.test(value))\n    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)\n    : (reIsBadHex.test(value) ? NAN : +value);\n}\n\nmodule.exports = toNumber;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/toNumber.js?");

/***/ }),

/***/ "./node_modules/lodash/toString.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toString.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseToString = __webpack_require__(/*! ./_baseToString */ \"./node_modules/lodash/_baseToString.js\");\n\n/**\n * Converts `value` to a string. An empty string is returned for `null`\n * and `undefined` values. The sign of `-0` is preserved.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to convert.\n * @returns {string} Returns the converted string.\n * @example\n *\n * _.toString(null);\n * // => ''\n *\n * _.toString(-0);\n * // => '-0'\n *\n * _.toString([1, 2, 3]);\n * // => '1,2,3'\n */\nfunction toString(value) {\n  return value == null ? '' : baseToString(value);\n}\n\nmodule.exports = toString;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/toString.js?");

/***/ }),

/***/ "./node_modules/lodash/uniq.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/uniq.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseUniq = __webpack_require__(/*! ./_baseUniq */ \"./node_modules/lodash/_baseUniq.js\");\n\n/**\n * Creates a duplicate-free version of an array, using\n * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)\n * for equality comparisons, in which only the first occurrence of each element\n * is kept. The order of result values is determined by the order they occur\n * in the array.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Array\n * @param {Array} array The array to inspect.\n * @returns {Array} Returns the new duplicate free array.\n * @example\n *\n * _.uniq([2, 1, 2]);\n * // => [2, 1]\n */\nfunction uniq(array) {\n  return (array && array.length) ? baseUniq(array) : [];\n}\n\nmodule.exports = uniq;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/uniq.js?");

/***/ }),

/***/ "./node_modules/lodash/wrapperLodash.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/wrapperLodash.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var LazyWrapper = __webpack_require__(/*! ./_LazyWrapper */ \"./node_modules/lodash/_LazyWrapper.js\"),\n    LodashWrapper = __webpack_require__(/*! ./_LodashWrapper */ \"./node_modules/lodash/_LodashWrapper.js\"),\n    baseLodash = __webpack_require__(/*! ./_baseLodash */ \"./node_modules/lodash/_baseLodash.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\"),\n    wrapperClone = __webpack_require__(/*! ./_wrapperClone */ \"./node_modules/lodash/_wrapperClone.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Creates a `lodash` object which wraps `value` to enable implicit method\n * chain sequences. Methods that operate on and return arrays, collections,\n * and functions can be chained together. Methods that retrieve a single value\n * or may return a primitive value will automatically end the chain sequence\n * and return the unwrapped value. Otherwise, the value must be unwrapped\n * with `_#value`.\n *\n * Explicit chain sequences, which must be unwrapped with `_#value`, may be\n * enabled using `_.chain`.\n *\n * The execution of chained methods is lazy, that is, it's deferred until\n * `_#value` is implicitly or explicitly called.\n *\n * Lazy evaluation allows several methods to support shortcut fusion.\n * Shortcut fusion is an optimization to merge iteratee calls; this avoids\n * the creation of intermediate arrays and can greatly reduce the number of\n * iteratee executions. Sections of a chain sequence qualify for shortcut\n * fusion if the section is applied to an array and iteratees accept only\n * one argument. The heuristic for whether a section qualifies for shortcut\n * fusion is subject to change.\n *\n * Chaining is supported in custom builds as long as the `_#value` method is\n * directly or indirectly included in the build.\n *\n * In addition to lodash methods, wrappers have `Array` and `String` methods.\n *\n * The wrapper `Array` methods are:\n * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`\n *\n * The wrapper `String` methods are:\n * `replace` and `split`\n *\n * The wrapper methods that support shortcut fusion are:\n * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,\n * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,\n * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`\n *\n * The chainable wrapper methods are:\n * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,\n * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,\n * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,\n * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,\n * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,\n * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,\n * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,\n * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,\n * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,\n * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,\n * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,\n * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,\n * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,\n * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,\n * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,\n * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,\n * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,\n * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,\n * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,\n * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,\n * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,\n * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,\n * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,\n * `zipObject`, `zipObjectDeep`, and `zipWith`\n *\n * The wrapper methods that are **not** chainable by default are:\n * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,\n * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,\n * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,\n * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,\n * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,\n * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,\n * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,\n * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,\n * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,\n * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,\n * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,\n * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,\n * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,\n * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,\n * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,\n * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,\n * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,\n * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,\n * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,\n * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,\n * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,\n * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,\n * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,\n * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,\n * `upperFirst`, `value`, and `words`\n *\n * @name _\n * @constructor\n * @category Seq\n * @param {*} value The value to wrap in a `lodash` instance.\n * @returns {Object} Returns the new `lodash` wrapper instance.\n * @example\n *\n * function square(n) {\n *   return n * n;\n * }\n *\n * var wrapped = _([1, 2, 3]);\n *\n * // Returns an unwrapped value.\n * wrapped.reduce(_.add);\n * // => 6\n *\n * // Returns a wrapped value.\n * var squares = wrapped.map(square);\n *\n * _.isArray(squares);\n * // => false\n *\n * _.isArray(squares.value());\n * // => true\n */\nfunction lodash(value) {\n  if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {\n    if (value instanceof LodashWrapper) {\n      return value;\n    }\n    if (hasOwnProperty.call(value, '__wrapped__')) {\n      return wrapperClone(value);\n    }\n  }\n  return new LodashWrapper(value);\n}\n\n// Ensure wrappers are instances of `baseLodash`.\nlodash.prototype = baseLodash.prototype;\nlodash.prototype.constructor = lodash;\n\nmodule.exports = lodash;\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/lodash/wrapperLodash.js?");

/***/ }),

/***/ "./node_modules/to-factory/to-factory.js":
/*!***********************************************!*\
  !*** ./node_modules/to-factory/to-factory.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _bind = Function.prototype.bind;\nfunction toFactory(Class) {\n  var Factory = function Factory() {\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return new (_bind.apply(Class, [null].concat(args)))();\n  };\n  Factory.__proto__ = Class;\n  Factory.prototype = Class.prototype;\n  return Factory;\n}\n\nmodule.exports = toFactory;\n\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./node_modules/to-factory/to-factory.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\r\n\r\n// This works in non-strict mode\r\ng = (function() {\r\n\treturn this;\r\n})();\r\n\r\ntry {\r\n\t// This works if eval is allowed (see CSP)\r\n\tg = g || Function(\"return this\")() || (1, eval)(\"this\");\r\n} catch (e) {\r\n\t// This works if the window reference is available\r\n\tif (typeof window === \"object\") g = window;\r\n}\r\n\r\n// g can still be undefined, but nothing to do about it...\r\n// We return undefined, instead of nothing here, so it's\r\n// easier to handle this case. if(!global) { ...}\r\n\r\nmodule.exports = g;\r\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/(webpack)/buildin/global.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(module) {\r\n\tif (!module.webpackPolyfill) {\r\n\t\tmodule.deprecate = function() {};\r\n\t\tmodule.paths = [];\r\n\t\t// module.parent = undefined by default\r\n\t\tif (!module.children) module.children = [];\r\n\t\tObject.defineProperty(module, \"loaded\", {\r\n\t\t\tenumerable: true,\r\n\t\t\tget: function() {\r\n\t\t\t\treturn module.l;\r\n\t\t\t}\r\n\t\t});\r\n\t\tObject.defineProperty(module, \"id\", {\r\n\t\t\tenumerable: true,\r\n\t\t\tget: function() {\r\n\t\t\t\treturn module.i;\r\n\t\t\t}\r\n\t\t});\r\n\t\tmodule.webpackPolyfill = 1;\r\n\t}\r\n\treturn module;\r\n};\r\n\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/(webpack)/buildin/module.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _connectSearchBox = __webpack_require__(/*! instantsearch.js/es/connectors/search-box/connectSearchBox */ \"./node_modules/instantsearch.js/es/connectors/search-box/connectSearchBox.js\");\n\nvar _connectSearchBox2 = _interopRequireDefault(_connectSearchBox);\n\nvar _webkitSpeechAlgoliaConnector = __webpack_require__(/*! ./webkitSpeechAlgoliaConnector */ \"./src/webkitSpeechAlgoliaConnector.js\");\n\nvar _webkitSpeechAlgoliaConnector2 = _interopRequireDefault(_webkitSpeechAlgoliaConnector);\n\nvar _version = __webpack_require__(/*! ./version */ \"./src/version.js\");\n\nvar _version2 = _interopRequireDefault(_version);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar webkitSpeechConnector = (0, _connectSearchBox2.default)(_webkitSpeechAlgoliaConnector2.default);\nwebkitSpeechConnector.version = _version2.default;\nwebkitSpeechConnector.isAvailable = 'webkitSpeechRecognition' in window;\n\nmodule.exports = webkitSpeechConnector;\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./src/index.js?");

/***/ }),

/***/ "./src/version.js":
/*!************************!*\
  !*** ./src/version.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = \"0.3.2\";\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./src/version.js?");

/***/ }),

/***/ "./src/webkitSpeechAlgoliaConnector.js":
/*!*********************************************!*\
  !*** ./src/webkitSpeechAlgoliaConnector.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar toFactory = __webpack_require__(/*! to-factory */ \"./node_modules/to-factory/to-factory.js\");\n/**\n* @module lextenso/webkit-speech-algolia-connector-instantsearch.js\n*/\n\nvar webkitSpeechAlgoliaConnectorClass = function () {\n    function webkitSpeechAlgoliaConnectorClass(connectorRenderingOptions, isFirstRendering) {\n        _classCallCheck(this, webkitSpeechAlgoliaConnectorClass);\n\n        if (!isFirstRendering) return;\n\n        this.renderingOptions = connectorRenderingOptions;\n        this.config = this.renderingOptions.widgetParams;\n\n        if (!this.isAvailable()) {\n            return;\n        }\n\n        this.initialize();\n\n        var triggerButton = document.querySelector(this.config.container.voiceButton);\n        if (triggerButton !== null) {\n            triggerButton.addEventListener('click', this.doStart.bind(this));\n        }\n        return this;\n    }\n\n    _createClass(webkitSpeechAlgoliaConnectorClass, [{\n        key: 'initialize',\n        value: function initialize() {\n            if (!this.renderingOptions || !this.renderingOptions.widgetParams.template || !this.renderingOptions.widgetParams.container) {\n                throw new Error('webkitSpeechAlgoliaConnector.js: Missing required connector config.');\n            }\n\n            if (!this.config.container.searchInput || !this.config.container.voiceButton) {\n                throw new Error('webkitSpeechAlgoliaConnector.js: Missing required container config.');\n            }\n\n            this.isListening = false;\n\n            var defaultRecognitionConfig = {\n                onresult: this.onResult.bind(this),\n                onerror: this.setError.bind(this),\n                interimResults: true,\n                continuous: false\n            };\n            this.recognitionConfig = _extends({}, this.config.recognitionConfig, defaultRecognitionConfig);\n            delete this.config.recognitionConfig;\n\n            return this;\n        }\n    }, {\n        key: 'isAvailable',\n        value: function isAvailable() {\n            var available = 'webkitSpeechRecognition' in window;\n            if (!available) {\n                this.autoHideContainer();\n            }\n            return available;\n        }\n    }, {\n        key: 'autoHideContainer',\n        value: function autoHideContainer() {\n            if (typeof this.config.autoHideContainer === 'boolean' && this.config.autoHideContainer) {\n                document.querySelector(this.config.container.voiceButton).style.display = 'none';\n            } else if (typeof this.config.autoHideContainer === 'string') {\n                document.querySelector(this.config.autoHideContainer).style.display = 'none';\n            } else {\n                this.switchBtnClassByState('error');\n            }\n        }\n    }, {\n        key: 'switchBtnClassByState',\n        value: function switchBtnClassByState() {\n            var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'active';\n\n            if (typeof this.config.template.onStateChange === 'function') {\n                return this.config.template.onStateChange(state);\n            }\n            var containerClassList = document.querySelector(this.config.container.voiceButton).classList;\n            if (typeof this.config.template.onErrorClass !== 'undefined' && containerClassList.contains(this.config.template.onErrorClass)) {\n                containerClassList.remove(this.config.template.onErrorClass);\n            }\n            if (state === 'inactive' || state === 'error' && typeof this.config.template.onErrorClass === 'undefined') {\n                if (containerClassList.contains(this.config.template.onActiveClass)) {\n                    containerClassList.replace(this.config.template.onActiveClass, this.config.template.onInactiveClass);\n                } else {\n                    containerClassList.add(this.config.template.onInactiveClass);\n                }\n            } else if (state === 'active') {\n                if (containerClassList.contains(this.config.template.onInactiveClass)) {\n                    containerClassList.replace(this.config.template.onInactiveClass, this.config.template.onActiveClass);\n                } else {\n                    containerClassList.add(this.config.template.onActiveClass);\n                }\n            } else if (state === 'error' && typeof this.config.template.onErrorClass === 'string') {\n                if (containerClassList.contains(this.config.template.onActiveClass)) {\n                    containerClassList.remove(this.config.template.onActiveClass);\n                }\n                if (containerClassList.contains(this.config.template.onInactiveClass)) {\n                    containerClassList.remove(this.config.template.onInactiveClass);\n                }\n                containerClassList.add(this.config.template.onErrorClass);\n            }\n            return true;\n        }\n    }, {\n        key: 'doStart',\n        value: function doStart() {\n            var _this = this;\n\n            if (typeof this.isListening === 'boolean' && !this.isListening) {\n                this.recognition = new webkitSpeechRecognition();\n\n                Object.keys(this.recognitionConfig).forEach(function (prop) {\n                    if (prop in _this.recognition) {\n                        _this.recognition[prop] = _this.recognitionConfig[prop];\n                    } else {\n                        console.warn('webkitSpeechAlgoliaConnector.js: ' + prop + ' doesn\\'t exist in SpeechRecognition');\n                    }\n                });\n\n                this.recognitionStart();\n            } else if (typeof this.isListening === 'boolean' && this.isListening) {\n                this.recognitionStop();\n            } else {\n                throw new Error('webkitSpeechAlgoliaConnector.js: Something went wrong.');\n            }\n        }\n    }, {\n        key: 'recognitionStart',\n        value: function recognitionStart() {\n            this.recognition.start();\n            this.isListening = true;\n            document.querySelector(this.config.container.searchInput).value = '';\n            this.switchBtnClassByState('active');\n        }\n    }, {\n        key: 'onResult',\n        value: function onResult(data) {\n            var previousQuery = document.querySelector(this.config.container.searchInput).value || '';\n            var query = '';\n\n            for (var i = data.resultIndex; i < data.results.length; ++i) {\n                console.log(data.results[i]);\n                if (typeof data.results[i] !== 'undefined' && typeof data.results[i].isFinal === 'boolean' && data.results[i].isFinal) {\n                    query = data.results[i][0].transcript;\n                    if (typeof this.recognition.continuous === 'boolean' && !this.recognition.continuous) {\n                        this.recognitionStop();\n                    }\n                } else {\n                    query += data.results[i][0].transcript;\n                }\n            }\n\n            query = query.trim();\n            if (query !== '' && previousQuery !== query) {\n                this.renderingOptions.refine(query);\n            }\n        }\n    }, {\n        key: 'recognitionStop',\n        value: function recognitionStop() {\n            if (this.isListening) {\n                this.isListening = false;\n                this.recognition.stop();\n                this.switchBtnClassByState('inactive');\n            }\n        }\n    }, {\n        key: 'setError',\n        value: function setError(err) {\n            this.recognition.stop();\n            this.isListening = false;\n            this.switchBtnClassByState('error');\n            console.error(err);\n            throw new Error('webkitSpeechAlgoliaConnector.js: Something went wrong.');\n        }\n    }]);\n\n    return webkitSpeechAlgoliaConnectorClass;\n}();\n\n;\n\nexports.default = toFactory(webkitSpeechAlgoliaConnectorClass);\n\n//# sourceURL=webpack://webkitSpeechAlgoliaConnector/./src/webkitSpeechAlgoliaConnector.js?");

/***/ })

/******/ });
});