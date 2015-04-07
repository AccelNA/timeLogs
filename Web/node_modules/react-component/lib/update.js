/**
 * Copyright 2013-2014 Facebook, Inc.
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
 * @providesModule update
 */

"use strict";

var copyProperties = require("./copyProperties");
var keyOf = require("./keyOf");
var invariant = require("./invariant");

function shallowCopy(x) {
  if (Array.isArray(x)) {
    return x.concat();
  } else if (x && typeof x === 'object') {
    return copyProperties(new x.constructor(), x);
  } else {
    return x;
  }
}

var DIRECTIVE_PUSH = keyOf({$push: null});
var DIRECTIVE_UNSHIFT = keyOf({$unshift: null});
var DIRECTIVE_SPLICE = keyOf({$splice: null});
var DIRECTIVE_SET = keyOf({$set: null});
var DIRECTIVE_MERGE = keyOf({$merge: null});

var ALL_DIRECTIVES_LIST = [
  DIRECTIVE_PUSH,
  DIRECTIVE_UNSHIFT,
  DIRECTIVE_SPLICE,
  DIRECTIVE_SET,
  DIRECTIVE_MERGE
];

var ALL_DIRECTIVES_SET = {};

ALL_DIRECTIVES_LIST.forEach(function(directive) {
  ALL_DIRECTIVES_SET[directive] = true;
});

function invariantArrayCase(value, spec, directive) {
  (require('./React').__DEV__ === true ? invariant(
    Array.isArray(value),
    'update(): expected target of %s to be an array; got %s.',
    directive,
    value
  ) : invariant(Array.isArray(value)));
  var specValue = spec[directive];
  (require('./React').__DEV__ === true ? invariant(
    Array.isArray(specValue),
    'update(): expected spec of %s to be an array; got %s. ' +
    'Did you forget to wrap your parameter in an array?',
    directive,
    specValue
  ) : invariant(Array.isArray(specValue)));
}

function update(value, spec) {
  (require('./React').__DEV__ === true ? invariant(
    typeof spec === 'object',
    'update(): You provided a key path to update() that did not contain one ' +
    'of %s. Did you forget to include {%s: ...}?',
    ALL_DIRECTIVES_LIST.join(', '),
    DIRECTIVE_SET
  ) : invariant(typeof spec === 'object'));

  if (spec.hasOwnProperty(DIRECTIVE_SET)) {
    (require('./React').__DEV__ === true ? invariant(
      Object.keys(spec).length === 1,
      'Cannot have more than one key in an object with %s',
      DIRECTIVE_SET
    ) : invariant(Object.keys(spec).length === 1));

    return spec[DIRECTIVE_SET];
  }

  var nextValue = shallowCopy(value);

  if (spec.hasOwnProperty(DIRECTIVE_MERGE)) {
    var mergeObj = spec[DIRECTIVE_MERGE];
    (require('./React').__DEV__ === true ? invariant(
      mergeObj && typeof mergeObj === 'object',
      'update(): %s expects a spec of type \'object\'; got %s',
      DIRECTIVE_MERGE,
      mergeObj
    ) : invariant(mergeObj && typeof mergeObj === 'object'));
    (require('./React').__DEV__ === true ? invariant(
      nextValue && typeof nextValue === 'object',
      'update(): %s expects a target of type \'object\'; got %s',
      DIRECTIVE_MERGE,
      nextValue
    ) : invariant(nextValue && typeof nextValue === 'object'));
    copyProperties(nextValue, spec[DIRECTIVE_MERGE]);
  }

  if (spec.hasOwnProperty(DIRECTIVE_PUSH)) {
    invariantArrayCase(value, spec, DIRECTIVE_PUSH);
    spec[DIRECTIVE_PUSH].forEach(function(item) {
      nextValue.push(item);
    });
  }

  if (spec.hasOwnProperty(DIRECTIVE_UNSHIFT)) {
    invariantArrayCase(value, spec, DIRECTIVE_UNSHIFT);
    spec[DIRECTIVE_UNSHIFT].forEach(function(item) {
      nextValue.unshift(item);
    });
  }

  if (spec.hasOwnProperty(DIRECTIVE_SPLICE)) {
    (require('./React').__DEV__ === true ? invariant(
      Array.isArray(value),
      'Expected %s target to be an array; got %s',
      DIRECTIVE_SPLICE,
      value
    ) : invariant(Array.isArray(value)));
    (require('./React').__DEV__ === true ? invariant(
      Array.isArray(spec[DIRECTIVE_SPLICE]),
      'update(): expected spec of %s to be an array of arrays; got %s. ' +
      'Did you forget to wrap your parameters in an array?',
      DIRECTIVE_SPLICE,
      spec[DIRECTIVE_SPLICE]
    ) : invariant(Array.isArray(spec[DIRECTIVE_SPLICE])));
    spec[DIRECTIVE_SPLICE].forEach(function(args) {
      (require('./React').__DEV__ === true ? invariant(
        Array.isArray(args),
        'update(): expected spec of %s to be an array of arrays; got %s. ' +
        'Did you forget to wrap your parameters in an array?',
        DIRECTIVE_SPLICE,
        spec[DIRECTIVE_SPLICE]
      ) : invariant(Array.isArray(args)));
      nextValue.splice.apply(nextValue, args);
    });
  }

  for (var k in spec) {
    if (!ALL_DIRECTIVES_SET[k]) {
      nextValue[k] = update(value[k], spec[k]);
    }
  }

  return nextValue;
}

module.exports = update;
