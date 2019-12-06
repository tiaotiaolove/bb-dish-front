import React from 'react';

export default class MyLoading extends React.Component<any, any> {

  render() {
    if (this.props.isLoading) {
      return <div>Loading...</div>
    }
    if (this.props.error) {
      return <div>{this.props.error.toString()}</div>
    }
    return null;
  }
}
