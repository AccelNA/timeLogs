react-date-picker
=================

> Date picker for React

See demo at [jslog.com/react-date-picker](http://jslog.com/react-date-picker)

## Install

```sh
$ npm install react-date-picker
```

## Usage

### NOTES:

Don't forget to include index.css or index.styl! ( require('react-date-picker/index.css') )

Also you need to have `React` included in the page.

The preferred **React** version for `react-date-picker` is  >=0.12. The initial version of `react-date-picker` worked with React 0.11.2 as well, but I do not intend to continue to support it, in order to be able to focus on advancing the current features and developing other high-quality React components.

### Example

```jsx
var date = '2014-10-10' //or Date.now()

function onChange(moment, dateString){
    //...
}
<DatePicker
        minDate='2014-04-04'
        maxDate='2015-10-10'
        date={date}
        onChange={onChange}
/>
```

## Custom locale

If you want to use a custom locale, simply require the appropriate momentjs locale before `require`-ing `react-date-picker`

Example:

```jsx
//make sure you require this first!
var nl = require('moment/locale/nl')

//and then require the date picker - it will use the locale you previously required
var DatePicker = require('react-date-picker')

...
```

## Options

 * hideFooter: Boolean - by default footer is shown, so specify this to true if you don't want the footer
 * date    : Date / String / Moment / Number
 * viewDate: Date / String / Moment / Number
 * minDate : Date / String / Moment / Number
 * maxDate : Date / String / Moment / Number
 * dateFormat: String [see moment.js formats](http://momentjs.com/docs/#/displaying/format/). Default date format is 'YYYY-MM-DD'
 * onChange: Function(moment, dateText, event) - called when the user selects a date
 * onSelect: Function(moment, dateText, view) - called when the user selects a year/month
 * onNav: Function(moment, dateText, view, direction) - called when the user navigates to the next/previous month/year/decade.
 * renderDay: Function - (optional) A function that should return a React DOM for the day cell. The first param is the props object. You can use this to have full control over what gets rendered for a day.
 * onRenderDay: Function - (optional) A function that can manipulate the props object for a day, and SHOULD return a new props object. Use this for custom day styling. You can use this to take full control over the styles/css classes/attributes applied to the day cell in the month view.


## Examples


#### Custom styling of day cells

```jsx

function onRenderDay(props){
    if (props.date.isBefore('2010-01-01')){
        props.className += ' invalid'
    }

    props.style.border = '1px solid red'

    return props
}

<DatePicker
    onChange={this.onChange}
    onRenderDay={onRenderDay}
/>
```


## Contributing

When contributing, please work on the `src` dir.

You'll need to run the following commands:

```sh
$ npm run serve # starts a local http server
$ npm run dev # starts webpack dev server, which does all the bundling
```

Now navigate to `http://localhost:8080/`

In order to build a new version, make sure you run `npm run build` in order to build the `lib` directory from the `src` directory.

## Other

`react-date-picker` uses the awesome `moment.js` library ( Big thanks!)

If you don't use npm you can include any of the following:

 * `dist/react-date-picker.js` - the full sources. NOTE: You'll need to include `React` separately
 * `dist/react-date-picker.min.js` - minified & optimized version. NOTE: You'll need to include `React` separately
 * `dist/react-date-picker.nomoment.js` - the full sources. NOTE: You'll need to include `React` AND `moment.js` separately
 * `dist/react-date-picker.nomoment.min.js` - minified & optimized version. NOTE: You'll need to include `React` AND `moment.js` separately


## Changelog

#### v1.4.0

 * `today` and `gotoSelected` are renamed as `todayText` and `gotoSelectedText`. Old names are now deprecated, and will be removed in a future minor version.
 * add `renderFooter` prop, which can be used to render a different footer.
 * change the behavior of `renderDay` prop: if it now returns undefined, we assume it just changed props, so we render the default cell, with the updated props. This means you can use `renderDay` both to affect the props object passed to day cells and/or the render a completely different cell

#### v1.3.0
 * `renderDay` & `onRenderDay` properties are available to allow full control over day-cell rendering
 * `onNav` is called with new args: moment, text, view, direction - where moment is a date as a momentjs instance, text is the date formatted as text, the view is the view name ('month','year','decade') and direction is 1 (nav to next period) or -1 (nav to prev period)
 * `onSelect` is called with new args: moment, text, view