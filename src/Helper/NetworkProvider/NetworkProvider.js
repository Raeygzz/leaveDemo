import React from 'react';
import NetInfo from "@react-native-community/netinfo";


export const NetworkContext = React.createContext({ isConnected: true });


export class NetworkProvider extends React.PureComponent {
  state = {
    isConnected: true
  };


  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({
        isConnected: state.isConnected
      }, () => {
        // console.log('NetworkProvider state ==> ', this.state);
      })
    });
  }


  componentWillUnmount() {
    this.unsubscribe()
  }


  render() {
    return (
      <NetworkContext.Provider value={this.state}>
        {this.props.children}
      </NetworkContext.Provider>
    );
  }
}
