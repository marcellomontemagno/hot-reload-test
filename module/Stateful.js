import React from 'react';

export default React.createClass({

  shouldComponentUpdate(){
    return false;
  },

  getInitialState(){
    return {
      count: 0
    }
  },

  add(){
    this.setState({count: this.state.count + 1});
  },

  render(){
    return <div>
      count: {this.state.count}
      <button onClick={this.add}>+</button>
    </div>;
  },

});
