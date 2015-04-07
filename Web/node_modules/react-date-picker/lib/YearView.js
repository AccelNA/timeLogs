'use strict'

var React  = require('react')
var moment = require('moment')
var copy   = require('copy-utils').copy

var FORMAT   = require('./utils/format')
var asConfig = require('./utils/asConfig')
var toMoment = require('./toMoment')

var TODAY

function emptyFn(){}

var YearView = React.createClass({

    displayName: 'YearView',

    getDefaultProps: function() {

        return asConfig()
    },

    /**
     * Returns all the days in the specified month.
     *
     * @param  {Moment/Date/Number} value
     * @return {Moment[]}
     */
    getMonthsInYear: function(value){
        var start = moment(value).startOf('year')
        var result = []
        var i = 0

        for (; i < 12; i++){
            result.push(moment(start))
            start.add(1, 'month')
        }

        return result
    },

    render: function() {

        TODAY = +moment().startOf('day')

        var viewMoment = this.props.viewMoment = moment(this.props.viewDate)

        if (this.props.date){
            this.props.moment = moment(this.props.date).startOf('month')
        }

        var monthsInView = this.getMonthsInYear(viewMoment)

        return (
            React.createElement("table", {className: "dp-table dp-year-view"}, 
                React.createElement("tbody", null, 
                    this.renderMonths(monthsInView)

                )
            )
        )
    },

    /**
     * Render the given array of days
     * @param  {Moment[]} days
     * @return {React.DOM}
     */
    renderMonths: function(days) {
        var nodes      = days.map(this.renderMonth, this)
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

    renderMonth: function(date) {
        var monthText = FORMAT.month(date)
        var classes = ["dp-cell dp-month"]

        var dateTimestamp = +date

        if (dateTimestamp == this.props.moment){
            classes.push('dp-value')
        }

        return (
            React.createElement("td", {key: monthText, className: classes.join(' '), onClick: this.handleClick.bind(this, date)}, 
                monthText
            )
        )
    },

    handleClick: function(date, event) {
        event.target.value = date
        ;(this.props.onSelect || emptyFn)(date, event)
    }
})

copy({
    getHeaderText: function(moment) {
        return toMoment(moment).format('YYYY')
    }
}, YearView)

module.exports = YearView