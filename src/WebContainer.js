'use strict';

// import React from 'react-native';
import React, { Component } from 'react';
let { WebView } = React;
import sanitizeHtml from 'sanitize-html';
import _ from 'lodash';

const script = '<script>window.location.hash = 1;document.title = document.height;</script>';

const defaultSafeConfig = _.defaults(
  {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'style']),
    allowedAttributes: _.defaults(
      {
        id: {allTags: true},
        style: {allTags: true},
        src: {allowedTags: ['img']}
      }, sanitizeHtml.defaults.allowedAttributes)
  },
  sanitizeHtml.defaults
);

let scrubHtml = function (html, makeSafe) {
  if (!html || makeSafe === false) {
    return html;
  }

  return safeHtml(
    html,
    _.isObject(makeSafe) ? makeSafe : defaultSafeConfig);
};

export default class WebContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      height: props.height || 0
    };
  }

  onNavigationStateChange(navState) {
    this.setState({
      height: navState.title
    });
  }

  render() {
    let {
      html,
      style,
      autoHeight,
      makeSafe,
      scrollEnabled,
      ...props
    } = this.props;

    let scrubbedHtml = scrubHtml(html, makeSafe);

    return (
      <WebView
        {...props}
        style={[style, (autoHeight ? {height: Number(this.state.height)} : {})]}
        scrollEnabled={autoHeight ? false : scrollEnabled}
        html={autoHeight ? (scrubbedHtml + script) : scrubbedHtml}
        onNavigationStateChange={this.onNavigationStateChange.bind(this)} />
    );
  }
}

WebContainer.propTypes = {
  autoHeight: React.PropTypes.boolean,
  makeSafe: React.PropTypes.oneOf([
    React.PropTypes.boolean,
    React.PropTypes.object
  ])
};

WebContainer.defaultProps = {
  makeSafe: false
};
