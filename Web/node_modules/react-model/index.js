
// A simple model mixin

module.exports = {
  getInitialState: function () {
    return {
      model: null,
      modelLoading: true,
      modelError: null
    }
  },
  componentWillMount: function () {
    var res = this.model(function (err, data) {
      if (err) {
        return this.setState({modelLoading: false, modelError: err})
      }
      this.setState({modelLoading: false, model: data})
    }.bind(this))
    // support promises
    if (res && res.then) {
      res.then(function (data) {
        this.setState({modelLoading: false, model: data})
      }.bind(this), function (err) {
        this.setState({modelLoading: false, modelError: err})
      }.bind(this))
    }
  },
}

