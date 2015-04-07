'use strict'

var React  = require('react')
var moment = require('moment')
var copy   = require('copy-utils').copy

var FORMAT   = require('./utils/format')
var asConfig = require('./utils/asConfig')
var toMoment = require('./toMoment')

var TODAY

function emptyFn(){}

var DecadeView = React.createClass({

    displayName: 'DecadeView',

    getDefaultProps: function() {
        return asConfig()
    },

    /**
     * Returns all the years in the decade of the given value
     *
     * @param  {Moment/Date/Number} value
     * @return {Moment[]}
     */
    getYearsInDecade: function(value){
        var year = moment(value).get('year')
        var offset = year % 10

        year = year - offset - 1

        var result = []
        var i = 0

        var start = moment(year, 'YYYY').startOf('year')

        for (; i < 12; i++){
            result.push(moment(start))
            start.add(1, 'year')
        }

        return result
    },

    render: function() {

        TODAY = +moment().startOf('day')

        var viewMoment = this.props.viewMoment = moment(this.props.viewDate)

        if (this.props.date){
            this.props.moment = moment(this.props.date).startOf('year')
        }

        var yearsInView = this.getYearsInDecade(viewMoment)

        return (
            React.createElement("table", {className: "dp-table dp-decade-view"}, 
                React.createElement("tbody", null, 
                    this.renderYears(yearsInView)

                )
            )
        )
    },

    /**
     * Render the given array of days
     * @param  {Moment[]} days
     * @return {React.DOM}
     */
    renderYears: function(days) {
        var nodes      = days.map(this.renderYear, this)
        var len        = days.length
        var buckets    = []
        var bucketsLen = Math.ceil(len / 4)

        var i = 0

        for ( ; i < bucketsLen; i++){
            buckets.push(nodes.slice(i * 4, (i + 1) * 4))
        }

        return buckets.map(function(bucket, i){
            return React.createElement("tr", {key: "row" + i}, bucket)
        })
    },

    renderYear: function(date, index, arr) {
        var yearText = FORMAT.year(date)
        var classes = ["dp-cell dp-year"]

        var dateTimestamp = +date

        if (dateTimestamp == this.props.moment){
            classes.push('dp-value')
        }

        if (!index){
            classes.push('dp-prev')
        }

        if (index == arr.length - 1){
            classes.push('dp-next')
        }

        return (
            React.createElement("td", {key: yearText, className: classes.join(' '), onClick: this.handleClick.bind(this, date)}, 
                yearText
            )
        )
    },

    handleClick: function(date, event) {
        event.target.value = date
        ;(this.props.onSelect || emptyFn)(date, event)
    }
})

copy({
    getHeaderText: function(value) {
        var year = moment(value).get('year')
        var offset = year % 10

        year = year - offset - 1

        return year + ' - ' + (year + 11)
    }
}, DecadeView)

module.exports = DecadeView