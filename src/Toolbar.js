import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import message from './utils/messages';
import { navigate } from './utils/constants';
import dates from './utils/dates';
import DatePicker from 'react-datepicker';
import localizer from './localizer';
import moment from 'moment'; // only uses moment for the datepicker

class DatePickerInput extends React.Component {
  render() {
    return (
      <span
        className='rbc-toolbar-label'
        style={{ cursor: 'pointer' }}
        onClick={this.props.onClick}
      >
        { this.props.label }
      </span>
    )
  }
}

class Toolbar extends React.Component {
  static propTypes = {
    view: PropTypes.string.isRequired,
    views: PropTypes.arrayOf(
      PropTypes.string,
    ).isRequired,
    label: PropTypes.node.isRequired,
    messages: PropTypes.object,
    onNavigate: PropTypes.func.isRequired,
    onViewChange: PropTypes.func.isRequired,
  }

  render() {
    let { messages, label, view, date } = this.props;
    messages = message(messages)
    let start = dates.startOf(date, view)
    let end = dates.endOf(date, view)
    let datesHighlighted = dates.range(start, end)

    return (
      <div className='rbc-toolbar'>
        <span className='rbc-btn-group'>
          <button
            type='button'
            onClick={this.navigate.bind(null, navigate.TODAY)}
          >
            {messages.today}
          </button>
          <button
            type='button'
            onClick={this.navigate.bind(null, navigate.PREVIOUS)}
          >
            {messages.previous}
          </button>
          <button
            type='button'
            onClick={this.navigate.bind(null, navigate.NEXT)}
          >
            {messages.next}
          </button>
        </span>
        <span
          className='rbc-toolbar-label'
        >
          <DatePicker
            calendarClassName={`DatePicker DatePicker__${view}`}
            selected={moment(date)}
            todayButton={view === 'day' ? 'Today' : `This ${view}`}
            customInput={
              <span
                style={{ cursor: 'pointer' }}
              >
                { this.props.label }
              </span>
            }
            highlightDates={datesHighlighted.map(d => moment(d))}
            onChange={this.handleDatePickerChange}
          />
        </span>

        <span className='rbc-btn-group'>
        {
          this.viewNamesGroup(messages)
        }
        </span>
      </div>
    );
  }

  handleDatePickerChange = (date) => {
    this.navigate('', date._d);
  }

  navigate = (action, date) => {
    if (Date.parse(date)) {
      this.props.onNavigate(action, date);
    } else {
      this.props.onNavigate(action);
    }
  }


  view = (view) => {
    this.props.onViewChange(view)
  }

  viewNamesGroup(messages) {
    let viewNames = this.props.views
    const view = this.props.view

    if (viewNames.length > 1) {
      return (
        viewNames.map(name =>
          <button type='button' key={name}
            className={cn({'rbc-active': view === name})}
            onClick={this.view.bind(null, name)}
          >
            {messages[name]}
          </button>
        )
      )
    }
  }
}

export default Toolbar;
