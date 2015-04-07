'use strict'

var React  = require('react')
var moment = require('moment')
var copy   = require('copy-utils').copy

var FORMAT   = require('./utils/format')
var asConfig = require('./utils/asConfig')
var toMoment = require('./toMoment')

var TODAY

function emptyFn(){}

var MonthView = React.createClass({

    displayName: 'MonthView',

    /**
     * Formats the given date in the specified format.
     * @method format
     *
     * @param  {Date/String/Moment} value
     * @param  {String} [format] If none specified, #dateFormat will be used
     *
     * @return {String}
     */

    formatAsDay: function(moment, dayDisplayFormat){
        return moment.format(dayDisplayFormat || 'D')
    },

    getDefaultProps: function() {

        return asConfig()
    },

    getWeekStartMoment: function(value){
        var clone = moment(value).startOf('week')

        // if (DEFAULT_WEEK_START_DAY != this.weekStartDay){
        //     clone.add('days', this.weekStartDay - DEFAULT_WEEK_START_DAY)
        // }

        return clone
    },

    /**
     * Returns all the days in the specified month.
     *
     * @param  {Moment/Date/Number} value
     * @return {Moment[]}
     */
    getDaysInMonth: function(value){
        var first = moment(value).startOf('month')
        var start = this.getWeekStartMoment(first)
        var result = []
        var i = 0

        if (first.add(-1, 'days').isBefore(start)){
            //make sure the last day of prev month is included
            start.add(-1, 'weeks')
        }

        for (; i < 42; i++){
            result.push(moment(start))
            start.add(1, 'days')
        }

        return result
    },

    render: function() {

        TODAY = +moment().startOf('day')

        var viewMoment = this.props.viewMoment = toMoment(this.props.viewDate, this.props.dateFormat)

        this.props.minDate && (this.props.minDate = +toMoment(this.props.minDate, this.props.dateFormat))
        this.props.maxDate && (this.props.maxDate = +toMoment(this.props.maxDate, this.props.dateFormat))

        if (this.props.minDate){
            // debugger
        }

        this.monthFirst = moment(viewMoment).startOf('month')
        this.monthLast  = moment(viewMoment).endOf('month')

        if (this.props.date){
            this.props.moment = moment(this.props.date).startOf('day')
        }

        var daysInView = this.getDaysInMonth(viewMoment)

        return (
            <table className="dp-table dp-month-view">
                <tbody>
                    {this.renderWeekDayNames()}

                    {this.renderDays(daysInView)}

                </tbody>
            </table>
        )
    },

    /**
     * Render the given array of days
     * @param  {Moment[]} days
     * @return {React.DOM}
     */
    renderDays: function(days) {
        var nodes      = days.map(this.renderDay, this)
        var len        = days.length
        var buckets    = []
        var bucketsLen = Math.ceil(len / 7)

        var i = 0

        for ( ; i < bucketsLen; i++){
            buckets.push(nodes.slice(i * 7, (i + 1) * 7))
        }

        return buckets.map(function(bucket, i){
            return <tr key={"row" + i} className="dp-week dp-row">{bucket}</tr>
        })
    },

    renderDay: function(date) {
        var dayText = FORMAT.day(date)
        var classes = ["dp-cell dp-day"]

        var dateTimestamp = +date

        if (dateTimestamp == TODAY){
            classes.push('dp-current')
        } else if (dateTimestamp < this.monthFirst){
            classes.push('dp-prev')
        } else if (dateTimestamp > this.monthLast){
            classes.push('dp-next')
        }

        if (this.props.minDate && date < this.props.minDate){
            classes.push('dp-disabled dp-before-min')
        }
        if (this.props.maxDate && date > this.props.maxDate){
            classes.push('dp-disabled dp-after-max')
        }

        if (dateTimestamp == this.props.moment){
            classes.push('dp-value')
        }

        var renderDayProps = {
            key      : dayText,
            text     : dayText,
            date     : date,
            className: classes.join(' '),
            style    : {},
            onClick  : this.handleClick.bind(this, date, dateTimestamp),
            children : dayText
        }

        if (typeof this.props.onRenderDay === 'function'){
            renderDayProps = this.props.onRenderDay(renderDayProps)
        }

        var defaultRenderFunction = React.DOM.td
        var renderFunction = this.props.renderDay || defaultRenderFunction

        var result = renderFunction(renderDayProps)

        if (result === undefined){
            result = defaultRenderFunction(renderDayProps)
        }

        return result
    },

    renderWeekDayNames: function(){
        var names = this.props.weekDayNames

        return (
            <tr className="dp-row dp-week-day-names">
                {names.map(name => <td key={name} className="dp-cell dp-week-day-name">{name}</td>)}
            </tr>
        )
    },

    handleClick: function(date, timestamp, event) {
        if (this.props.minDate && timestamp < this.props.minDate){
            return
        }
        if (this.props.maxDate && timestamp > this.props.maxDate){
            return
        }

        event.target.value = date

        ;(this.props.onChange || emptyFn)(date, event)
    }
})

copy({
    getHeaderText: function(moment) {
        return toMoment(moment).format('MMMM YYYY')
    }
}, MonthView)

module.exports = MonthView