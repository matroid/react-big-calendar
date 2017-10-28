'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _constants = require('./utils/constants');

var _dates = require('./utils/dates');

var _dates2 = _interopRequireDefault(_dates);

var _reactDatepicker = require('react-datepicker');

var _reactDatepicker2 = _interopRequireDefault(_reactDatepicker);

var _localizer = require('./localizer');

var _localizer2 = _interopRequireDefault(_localizer);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// only uses moment for the datepicker

var DatePickerInput = function (_React$Component) {
  _inherits(DatePickerInput, _React$Component);

  function DatePickerInput() {
    _classCallCheck(this, DatePickerInput);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  DatePickerInput.prototype.render = function render() {
    return _react2.default.createElement(
      'span',
      {
        className: 'rbc-toolbar-label',
        style: { cursor: 'pointer' },
        onClick: this.props.onClick
      },
      this.props.label
    );
  };

  return DatePickerInput;
}(_react2.default.Component);

var Toolbar = function (_React$Component2) {
  _inherits(Toolbar, _React$Component2);

  function Toolbar() {
    var _temp, _this2, _ret;

    _classCallCheck(this, Toolbar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, _React$Component2.call.apply(_React$Component2, [this].concat(args))), _this2), _this2.handleDatePickerChange = function (date) {
      _this2.navigate('', date._d);
    }, _this2.navigate = function (action, date) {
      if (Date.parse(date)) {
        _this2.props.onNavigate(action, date);
      } else {
        _this2.props.onNavigate(action);
      }
    }, _this2.view = function (view) {
      _this2.props.onViewChange(view);
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  Toolbar.prototype.render = function render() {
    var _props = this.props,
        messages = _props.messages,
        label = _props.label,
        view = _props.view,
        date = _props.date;

    var start = _dates2.default.startOf(date, view);
    var end = _dates2.default.endOf(date, view);
    var datesHighlighted = _dates2.default.range(start, end);

    return _react2.default.createElement(
      'div',
      { className: 'rbc-toolbar' },
      _react2.default.createElement(
        'span',
        { className: 'rbc-btn-group' },
        _react2.default.createElement(
          'button',
          {
            type: 'button',
            onClick: this.navigate.bind(null, _constants.navigate.TODAY)
          },
          messages.today
        ),
        _react2.default.createElement(
          'button',
          {
            type: 'button',
            onClick: this.navigate.bind(null, _constants.navigate.PREVIOUS)
          },
          messages.previous
        ),
        _react2.default.createElement(
          'button',
          {
            type: 'button',
            onClick: this.navigate.bind(null, _constants.navigate.NEXT)
          },
          messages.next
        )
      ),
      _react2.default.createElement(
        'span',
        {
          className: 'rbc-toolbar-label'
        },
        _react2.default.createElement(_reactDatepicker2.default, {
          calendarClassName: 'DatePicker DatePicker__' + view,
          selected: (0, _moment2.default)(date),
          todayButton: view === 'day' ? 'Today' : 'This ' + view,
          customInput: _react2.default.createElement(
            'span',
            {
              style: { cursor: 'pointer' }
            },
            this.props.label
          ),
          highlightDates: datesHighlighted.map(function (d) {
            return (0, _moment2.default)(d);
          }),
          onChange: this.handleDatePickerChange
        })
      ),
      _react2.default.createElement(
        'span',
        { className: 'rbc-btn-group' },
        this.viewNamesGroup(messages)
      )
    );
  };

  Toolbar.prototype.viewNamesGroup = function viewNamesGroup(messages) {
    var _this3 = this;

    var viewNames = this.props.views;
    var view = this.props.view;

    if (viewNames.length > 1) {
      return viewNames.map(function (name) {
        return _react2.default.createElement(
          'button',
          { type: 'button', key: name,
            className: (0, _classnames2.default)({ 'rbc-active': view === name }),
            onClick: _this3.view.bind(null, name)
          },
          messages[name]
        );
      });
    }
  };

  return Toolbar;
}(_react2.default.Component);

Toolbar.propTypes = {
  view: _propTypes2.default.string.isRequired,
  views: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
  label: _propTypes2.default.node.isRequired,
  messages: _propTypes2.default.object,
  onNavigate: _propTypes2.default.func.isRequired,
  onViewChange: _propTypes2.default.func.isRequired
};
exports.default = Toolbar;
module.exports = exports['default'];