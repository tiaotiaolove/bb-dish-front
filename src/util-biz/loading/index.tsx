import React from 'react';
import Loadable from  'react-loadable';
import './css/style.less';

export default class MyLoading extends React.Component<Loadable.LoadingComponentProps, any> {

  render() {
    if (this.props.isLoading) {
      return <div className="loading-data-class"><img src={require("./img/loading.svg")} alt={"loadingComponent"}/></div>
    }
    if (this.props.error) {
      return <div>{this.props.error.toString()}</div>
    }
    return null;
  }

}
