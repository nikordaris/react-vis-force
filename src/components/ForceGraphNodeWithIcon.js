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
import { isFunction, pickBy, omitBy } from 'lodash';
import PureRenderComponent from './PureRenderComponent';
import nodePropTypes from '../propTypes/node';

export default class ForceGraphNodeWithIcon extends PureRenderComponent {
  static get propTypes() {
    return {
      node: nodePropTypes.isRequired,
      icon: PropTypes.string,
      iconOffset: PropTypes.shape({
        x: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
        y: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
      }),
      iconOptions: PropTypes.object,
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
      cx: 0,
      cy: 0,
      className: '',
      fill: '#333',
      opacity: 1,
      stroke: '#FFF',
      strokeWidth: 1.5,
      iconOffset: {
        x: 0,
        y: 0,
      },
      iconOptions: {},
    };
  }

  render() {
    const {
      node, className, icon, iconOptions, r = 5,
      /* eslint-disable no-unused-vars */
      labelStyle, labelClass, showLabel, iconOffset,
      ...spreadable
    } = this.props;
    const events = pickBy(this.props, (v, k) => k.match(/^on.*$/));
    const rest = omitBy(spreadable, (v, k) => k.match(/^on.*$/));
    const { cx, cy } = this.props;
    let { x: dx = 0, y: dy = 0 } = iconOffset;
    dx = isFunction(dx) ? dx(node) : dx;
    dy = isFunction(dy) ? dy(node) : dy;
    const radius = node.radius || r;
    return (
      <g {...events}>
        <circle
          className={`rv-force__node ${className}`}
          r={radius}
          {...rest}
        />
        {icon && <text
          fontSize={radius * 0.75}
          {...iconOptions}
          x={cx}
          y={cy}
          dx={dx}
          dy={dy}
        >
          {icon}
        </text>}
      </g>
    );
  }
}
