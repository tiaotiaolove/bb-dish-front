import React from 'react';
import './css/style.less';

export default class DataLoading extends React.Component<any, any> {

  render() {
    return (<div className="loading-data-class" style={this.props.style}>
      <img src={require("./img/loading.svg")} alt={"loadingComponent"}/>
    </div>);
  }

}
