# react-component

  React for component

## Installation

  Install with [component(1)](http://component.io):

    $ component install benatkin/react-component

## API

```
var React = require('react')
```

This is the same as the official React, except that debugging is disabled by
default. To turn on debugging, set `React.__DEV__` to true.

To check the integrity of this build, run `npm install` and
`diff -r lib node_modules/react/lib`. The only changes should be the one
mentioned above. Then check `package.json` and/or `component.json` and
`react.js`.

## Development

To copy and transform the `lib` files, run `gulp`.

## TODO

* Check that this works with component
* Check that this works with browserify
* Remove addons from this build
* Publish another build with addons

## License

[React](https://github.com/facebook/react) is licensed under the Apache License,
available [here](https://github.com/facebook/react/blob/master/LICENSE).
