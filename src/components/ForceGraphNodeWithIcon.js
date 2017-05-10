// Copyright (c) 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React, { PropTypes } from 'react';
import { isFunction } from 'lodash';

import PureRenderComponent from './PureRenderComponent';
import nodePropTypes from '../propTypes/node';

export default class ForceGraphNodeWithIcon extends PureRenderComponent {
  static get propTypes() {
    return {
      node: nodePropTypes.isRequired,
      radius: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
      icon: PropTypes.string,
      iconOffset: PropTypes.shape({
        x: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
        y: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
      }),
      iconStyle: PropTypes.object,
      cx: PropTypes.number,
      cy: PropTypes.number,
      // these props only have an impact on the parent.
      labelStyle: PropTypes.object,
      labelClass: PropTypes.string,
      showLabel: PropTypes.bool,
    };
  }

  static get defaultProps() {
    return {
      className: '',
      fill: '#333',
      opacity: 1,
      stroke: '#FFF',
      strokeWidth: 1.5,
      radius: 5,
    };
  }

  render() {
    const {
      node, className, radius, cx, cy, icon, iconStyle,
      /* eslint-disable no-unused-vars */
      labelStyle, labelClass, showLabel, iconOffset,
      /* eslint-enable no-unused-vars */
      ...spreadable
    } = this.props;

    const r = isFunction(radius) ? radius(node) : radius;

    return [
      <circle
        className={`rv-force__node ${className}`}
        r={r}
        {...spreadable}
      />,
      <text style={iconStyle} x={cx} y={cy}>{icon}</text>,
    ];
  }
}
