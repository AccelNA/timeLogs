'use strict'

var React  = require('react')

var moment    = require('moment')
var copyUtils = require('copy-utils')
var copy     = copyUtils.copy
var copyList = copyUtils.copyList

var asConfig = require('./utils/asConfig')

var MonthView  = require('./MonthView')
var YearView   = require('./YearView')
var DecadeView = require('./DecadeView')

// if (React.createFactory){
//     MonthView  = React.createFactory(MonthView)
//     YearView   = React.createFactory(YearView)
//     DecadeView = React.createFactory(DecadeView)
// }

var Views = {
    month : MonthView,
    year  : YearView,
    decade: DecadeView
}

var getWeekDayNames = require('./utils/getWeekDayNames')

function emptyFn(){}

var DatePicker = React.createClass({

    displayName: 'DatePicker',

    propTypes: {
        todayText: React.PropTypes.string,
        gotoSelectedText: React.PropTypes.string,

        renderFooter: React.PropTypes.func,
        onChange: React.PropTypes.func,

        date: React.PropTypes.any,
        viewDate: React.PropTypes.any
    },

    getInitialState: function() {
        return {
        }
    },

    getDefaultProps: function() {
        return asConfig()
    },

    getViewName: function() {
        return this.state.view || this.props.view || 'month'
    },

    getViewOrder: function() {
        return ['month', 'year', 'decade']
    },

    addViewIndex: function(amount) {
        var viewName = this.getViewName()

        var order = this.getViewOrder()
        var index = order.indexOf(viewName)

        index += amount

        return index % order.length
    },

    getNextViewName: function() {
        return this.getViewOrder()[this.addViewIndex(1)]
    },

    getPrevViewName: function() {
        return this.getViewOrder()[this.addViewIndex(-1)]
    },

    getView: function() {
        return Views[this.getViewName()] || Views.month
    },

    getViewFactory: function() {
        var view = this.getView()

        if (React.createFactory){
            view.__factory = view.__factory || React.createFactory(view)
            view = view.__factory
        }

        return view
    },

    getViewDate: function() {
        return this.state.viewMoment || this.props.viewDate || this.props.date || this.now
    },

    render: function() {

        this.now = +new Date()

        var view     = this.getViewFactory()
        var props    = asConfig(this.props)

        props.viewDate  = this.getViewDate()

        props.renderDay = this.props.renderDay
        props.onRenderDay = this.props.onRenderDay

        props.onChange  = this.handleChange
        props.onSelect  = this.handleSelect

        var className = (this.props.className || '') + ' date-picker'

        return (
            <div className={className} {...this.props}>
                <div className="dp-inner">
                    {this.renderHeader(view)}

                    <div className="dp-body">
                        <div className="dp-anim-target">
                        {view(props)}
                        </div>
                    </div>

                    {this.renderFooter(props)}
                </div>
            </div>
        )
    },

    renderFooter: function(props) {
        if (this.props.hideFooter){
            return
        }

        if (this.props.today){
            console.warn('Please use "todayText" prop instead of "today"!')
        }
        if (this.props.gotoSelected){
            console.warn('Please use "gotoSelectedText" prop instead of "gotoSelected"!')
        }

        var todayText    = this.props.todayText || 'Today'
        var gotoSelectedText = this.props.gotoSelectedText || 'Go to selected'

        var footerProps = {
            todayText          : todayText,
            gotoSelectedText   : gotoSelectedText,
            onTodayClick       : this.gotoNow,
            onGotoSelectedClick: this.gotoSelected,
            date               : props.date,
            viewDate           : props.viewDate
        }

        var result
        if (typeof this.props.renderFooter == 'function'){
            result = this.props.renderFooter(footerProps)
        }

        if (result !== undefined){
            return result
        }

        return (
            <div className="dp-footer">
                <div className="dp-footer-today" onClick={this.gotoNow}>
                    {todayText}
                </div>
                <div className="dp-footer-selected" onClick={this.gotoSelected}>
                    {gotoSelectedText}
                </div>
            </div>
        )
    },

    gotoNow: function() {
        this.gotoDate(+new Date())
    },

    gotoSelected: function() {
        this.gotoDate(this.props.date || +new Date())
    },

    gotoDate: function(value) {
        this.setState({
            view: 'month',
            viewMoment: moment(value)
        })
    },

    getViewColspan: function(){
        var map = {
            month : 5,
            year  : 2,
            decade: 2
        }

        return map[this.getViewName()]
    },

    renderHeader: function(view) {

        var viewDate   = this.getViewDate()
        var headerText = this.getView().getHeaderText(viewDate)

        var colspan = this.getViewColspan()
        var prev    = this.props.navPrev
        var next    = this.props.navNext

        return (
            <div className="dp-header">
                <table className="dp-nav-table"><tbody>
                    <tr className="dp-row">
                        <td  className="dp-prev-nav dp-nav-cell dp-cell" onClick={this.handlePrevNav}>{prev}</td>

                        <td className="dp-nav-view dp-cell " colSpan={colspan} onClick={this.handleViewChange}>{headerText}</td>

                        <td className="dp-next-nav dp-nav-cell dp-cell" onClick={this.handleNextNav}>{next}</td>
                    </tr>
                </tbody></table>
            </div>
        )
    },

    handleRenderDay: function (date) {
        return (this.props.renderDay || emptyFn)(date) || []
    },

    handleViewChange: function() {
        this.setState({
            view: this.getNextViewName()
        })
    },

    getNext: function() {
        var current = this.getViewDate()

        return ({
            month: function() {
                return moment(current).add(1, 'month')
            },
            year: function() {
                return moment(current).add(1, 'year')
            },
            decade: function() {
                return moment(current).add(10, 'year')
            }
        })[this.getViewName()]()
    },

    getPrev: function() {
        var current = this.getViewDate()

        return ({
            month: function() {
                return moment(current).add(-1, 'month')
            },
            year: function() {
                return moment(current).add(-1, 'year')
            },
            decade: function() {
                return moment(current).add(-10, 'year')
            }
        })[this.getViewName()]()
    },

    handlePrevNav: function(event) {
        var viewMoment = this.getPrev()

        this.setState({
            viewMoment: viewMoment
        })

        if (typeof this.props.onNav === 'function'){
            var text = viewMoment.format(this.props.dateFormat)
            var view = this.getViewName()

            this.props.onNav(viewMoment, text, view, -1, event)
        }
    },

    handleNextNav: function(event) {
        var viewMoment = this.getNext()

        this.setState({
            viewMoment: viewMoment
        })

        if (typeof this.props.onNav === 'function'){
            var text = viewMoment.format(this.props.dateFormat)
            var view = this.getViewName()

            this.props.onNav(viewMoment, text, view, 1, event)
        }
    },

    handleChange: function(date, event) {
        date = moment(date)

        var text = date.format(this.props.dateFormat)

        ;(this.props.onChange || emptyFn)(date, text, event)
    },

    handleSelect: function(date, event) {
        var viewName = this.getViewName()
        var property = ({
            decade: 'year',
            year  : 'month'
        })[viewName]

        var value = date.get(property)
        var viewMoment = moment(this.getViewDate()).set(property, value)
        var view = this.getPrevViewName()

        this.setState({
            viewMoment: viewMoment,
            view: view
        })

        if (typeof this.props.onSelect === 'function'){
            var text = viewMoment.format(this.props.dateFormat)
            this.props.onSelect(viewMoment, text, view, event)
        }
    }

})

module.exports = DatePicker