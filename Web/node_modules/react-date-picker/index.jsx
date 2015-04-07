'use strict'

require('./index.styl')

var nl = require('moment/locale/nl')

var React      = require('react')
var DatePicker = require('./src/index')

var DATE = Date.now()
var VALUE = Date.now()

var App = React.createClass({

    displayName: 'App',

    render: function(){
        var v = VALUE

        function onNav(moment, text, view){
            console.log(moment, text, view)
        }

        function onSelect(moment, text, view){
            console.log('SELECT')
            console.log(moment, text, view)
        }

        function renderDay(props){
            props.className += ' aaa '
            props.style = props.style || {}

            props.style.color = 'red'

            return props
        }

        var clear = function(){
            VALUE = null
            this.setState({})
        }.bind(this)

        return <div style={{margin: 10}}>
            <DatePicker
                onNav={onNav}
                onSelect={onSelect}
                onRenderDay={renderDay}
                minDate='2014-04-04' maxDate='2015-10-10' date={v} viewDate={DATE} onChange={this.onChange}/>

                <button onClick={clear}>clear</button>
            </div>
    },

    onChange: function(date, dateString) {
        console.log(dateString, 'change')
        DATE  = dateString
        VALUE = dateString
        this.setState({})
    }
})

React.render(<App />, document.getElementById('content'))