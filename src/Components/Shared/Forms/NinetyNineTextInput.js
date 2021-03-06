import React, { Component } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';


export class NinetyNineTextInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: this.props.value
    };
  }


  render() {
    return (
      <View>
        <TextInput
          style={styles.textInput}
          placeholder={this.props.placeholder}
          secureTextEntry={this.props.hideText}
          onChangeText={(text) => {
            this.setState({ text });
            this.props.onChangeText(text)
          }}
          value={this.state.text}
        >
        </TextInput>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    padding: 10,
    marginTop: 15,
    elevation: 1
  }
})
