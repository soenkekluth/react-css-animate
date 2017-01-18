import React, { Component } from 'react';

export default class TimeSelect extends Component {

  renderOptions(){
    const min = 0;
    const max = 2000;
    const step = 100;

    const children = [];
    for(let i = min, l = 2000; i<l; i+=step){
      children.push(<option value={i}>{i} ms</option>);
    }

    return children;
  }

  render() {
    const {id, onChange, value} = this.props;
    return (
      <select id={id} value={value} onChange={onChange} className="input">
          {this.renderOptions()}
      </select>
    );
  }
}
