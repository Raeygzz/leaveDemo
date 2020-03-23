import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Picker, TextInput, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import DateTimePicker from '@react-native-community/datetimepicker';

import { NinetyNineHeader } from '../../Components/Shared/Headers/NinetyNineHeader';
import { NinetyNineButton } from '../../Components/Shared/Buttons/NinetyNineButton';
import { NinetyNineOutlineButton } from '../../Components/Shared/Buttons/NinetyNineOutlineButton';

// import * as yup from 'yup';
import { Formik } from 'formik';

import { connect } from 'react-redux';
import { netInfo, usersWithHandleLeaveCapabilitiesApi, employeeLeaveTypeApi, applyLeaveApi } from '../../Redux/Actions/ApplyLeaveAction';

import { NetworkContext } from '../../Helper/NetworkProvider/NetworkProvider';


class ApplyLeave extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSelectFullDay: true,
      isSelectHalfDay: false,

      isSelect1stHalf: false, 
      isSelect2ndHalf: true,

      pickerSelectedValue: { id: -1, leaveName: "Select", paidLeave: -1, leaveAllocatedDays: -1, remainingLeaveAllocatedDays: '' },
      pickerSelectionValid: false,

      showCalendar: false,

      selectedStartDate: '',
      selectedStart_new_Date: '',
      selectedStartDateConfirm: false,
      selectedStartDateValid: false,

      selectedEndDate: '',
      selectedEnd_new_Date: '',
      selectedEndDateConfirm: false,
      selectedEndDateValid: false,

      selectedAssignTo: [],
      assignToValid: false,

      inc: null,

      textInputReason: '',
      textInputReasonValid: false,
    }
    this.myTextInput = React.createRef();
  }
  static contextType = NetworkContext;


  componentDidMount = () => {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('focus', () => {

      this.setState({
        isSelectFullDay: true,
        isSelectHalfDay: false,

        isSelect1stHalf: false, 
        isSelect2ndHalf: true,

        pickerSelectedValue: { id: -1, leaveName: "Select", paidLeave: -1, leaveAllocatedDays: -1, remainingLeaveAllocatedDays: '' },
        pickerSelectionValid: false,

        showCalendar: false,
        
        selectedStartDate: '',
        selectedStart_new_Date: '',
        selectedStartDateConfirm: false,
        selectedStartDateValid: false,

        selectedEndDate: '',
        selectedEnd_new_Date: '',
        selectedEndDateConfirm: false,
        selectedEndDateValid: false,

        selectedAssignTo: [],
        assignToValid: false,

        inc: null,

        textInputReason: '',
        textInputReasonValid: false,
      });
      this.myTextInput.current.clear(),

      this.usersWithHandleLeaveCapabilities();
      this.employeeLeaveType();
    });
  }

  componentWillUnmount = () => {
    this.focusListener();
  }


  usersWithHandleLeaveCapabilities = () => {
    if(this.context.isConnected) {
      this.props.dispatch(usersWithHandleLeaveCapabilitiesApi());

    } else {
      obj = {
        activityIndicatorOrOkay: false,
        loaderStatus: true,
        loaderMessage: 'No Internet Connection'
      }

      this.props.dispatch(netInfo(obj));
    }
  }


  employeeLeaveType = () => {
    if(this.context.isConnected) {
      this.props.dispatch(employeeLeaveTypeApi());

    } else {
      obj = {
        activityIndicatorOrOkay: false,
        loaderStatus: true,
        loaderMessage: 'No Internet Connection'
      }

      this.props.dispatch(netInfo(obj));
    }
  }


  startDateHandler = () => {
    this.setState({
      selectedStart_new_Date: '',
      selectedStartDateConfirm: true,
      showCalendar: true
    })
  }

  endDateHandler = () => {
    this.setState({
      selectedEnd_new_Date: '',
      selectedEndDateConfirm: true,
      showCalendar: true
    })
  }


  onChange = (event, selectedDate) => {
    if(selectedDate != undefined && event.type == 'set') {

      const year = new Date(selectedDate).getFullYear();
      let month = new Date(selectedDate).getMonth() + 1;
      month.toString().length <= 1 ? month = '0' + month : month;
      let date = new Date(selectedDate).getDate();
      date.toString().length <= 1 ? date = '0' + date : date;
      const fullYear = year + '/' + month + '/' + date;
  
      if(this.state.selectedStartDateConfirm) {
        this.setState({
          selectedStart_new_Date: selectedDate,
          selectedStartDate: fullYear,
          showCalendar: false,
          selectedStartDateConfirm: false,
          selectedEndDateConfirm: false,
          selectedStartDateValid: false,
        })
  
      } else if(this.state.selectedEndDateConfirm) {
        this.setState({
          selectedEnd_new_Date: selectedDate,
          selectedEndDate: fullYear,
          showCalendar: false,
          selectedStartDateConfirm: false,
          selectedEndDateConfirm: false,
          selectedEndDateValid: false,
        })
      }

    } else if(selectedDate == undefined && event.type == 'dismissed') {
      this.setState({
        showCalendar: false,
        selectedStartDateConfirm: false,
        selectedEndDateConfirm: false,
      })
    }    
  };


  assignToHandler = (value) => {
    this.setState({
      selectedAssignTo: [...this.state.selectedAssignTo, value.authorityId],
      inc: this.state.inc == null ? 0 : this.state.inc + 1,
      assignToValid: false,
    }, () => {
      // console.log('value, this.state ==> ', value, this.state);
    })
  }


  componentDidUpdate(prevProps) {    
    // console.log('componentDidUpdate');
    if (this.props.applyLeave.applyLeaveSuccess !== prevProps.applyLeave.applyLeaveSuccess) {

      this.myTextInput.current.clear();
      this.setState({
        isSelectFullDay: true,
        isSelectHalfDay: false,

        isSelect1stHalf: false, 
        isSelect2ndHalf: true,

        selectedStartDate: '',
        selectedStart_new_Date: '',
        
        selectedEndDate: '',
        selectedEnd_new_Date: '',

        pickerSelectedValue: { id: -1, leaveName: "Select", paidLeave: -1, leaveAllocatedDays: -1, remainingLeaveAllocatedDays: '' },
        
        selectedAssignTo: [],
        inc: null,

        textInputReason: '',
      })
    }
  }


  applyLeaveHandler = () => {
    if(this.context.isConnected) {
      this.state.selectedStartDate == '' ? this.setState({ selectedStartDateValid: true }) : this.setState({ selectedStartDateValid: false });

      this.state.selectedEndDate == '' ? this.setState({ selectedEndDateValid: true }) : this.setState({ selectedEndDateValid: false });

      this.state.selectedStartDate != '' && this.state.selectedEndDate != '' ? 
        this.state.selectedStart_new_Date.getTime() > this.state.selectedEnd_new_Date.getTime() ? this.setState({ selectedStartDateValid: true, selectedEndDateValid: true }) : this.setState({ selectedStartDateValid: false, selectedEndDateValid: false }) :
      null

      this.state.pickerSelectedValue.id == '-1' ? this.setState({ pickerSelectionValid: true }) : this.setState({ pickerSelectionValid: false });
      
      this.state.pickerSelectedValue.remainingLeaveAllocatedDays !== '' ?
        this.state.pickerSelectedValue.remainingLeaveAllocatedDays < 1 ? this.setState({ pickerSelectionValid: true }) : this.setState({ pickerSelectionValid: false }) : 
      null

      this.state.selectedAssignTo.length < 1 ? this.setState({ assignToValid: true }) : this.setState({ assignToValid: false });
      
      this.state.textInputReason == '' ? this.setState({ textInputReasonValid: true }) : this.setState({ textInputReasonValid: false }, () => {
        
        const startDateInTime = new Date(this.state.selectedStartDate).getTime();
        const endDateInTime = new Date(this.state.selectedEndDate).getTime();
        
        // console.log('selectedStartDate ==> ', this.state.selectedStartDate);
        // console.log('selectedEndDate ==> ', this.state.selectedEndDate);
        // console.log('diff ==> ', endDateInTime - startDateInTime);
  
        if(startDateInTime <= endDateInTime && !this.state.selectedStartDateValid && !this.state.selectedEndDateValid && !this.state.pickerSelectionValid && !this.state.assignToValid && !this.state.textInputReasonValid) {
          let obj = {
            startDate: this.state.selectedStartDate,
            endDate: this.state.selectedEndDate,
            assignedTo: this.state.selectedAssignTo,
            isHalfDay: this.state.isSelectFullDay ? 0 : 1,
            halfDay: !this.state.isSelectFullDay ? (this.state.isSelect1stHalf ? 'first' : 'second') : '',
            typeId: this.state.pickerSelectedValue.id,
            reason: this.state.textInputReason
          }
  
          this.props.dispatch(applyLeaveApi(obj));  
        }
      });

    } else {
      obj = {
        activityIndicatorOrOkay: false,
        loaderStatus: true,
        loaderMessage: 'No Internet Connection'
      }

      this.props.dispatch(netInfo(obj));
    }
  }

  cancelLeaveHandler = () => {
    console.log('cancelLeaveHandler');
  }

  
  render() {
    // console.log('this.props.applyLeave ==> ', this.props.applyLeave);

    const pickerItem = this.props.applyLeave.employeeLeaveReportsArr.length > 0 ? this.props.applyLeave.employeeLeaveReportsArr.map((item, id) => {
      return (
        <Picker.Item key={id} label={item.leaveName} value={item} />
      )
    }) : null;


    const usersWithAuthorityList = this.props.applyLeave.usersWithHandleLeaveAuthorities.length > 0 ? this.props.applyLeave.usersWithHandleLeaveAuthorities.map((item, id) => {
      return (
        <TouchableOpacity key={id} style={{ marginBottom: 12, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width:"50%" }} onPress={() => {
          this.assignToHandler(item)
        }}>
          <Text key={id} style={{ borderWidth: 1, paddingHorizontal: 9, backgroundColor: this.state.selectedAssignTo.length > 0 ? (this.state.selectedAssignTo[this.state.inc] == item.authorityId ? 'blue'  : 'transparent') : null }}></Text>
          <Text style={{ marginLeft: 15 }}>{item.fullName}</Text>
        </TouchableOpacity>
      )
    }) : null;
    

    return(
      <View style={{ flex: 1 }}>
        <NinetyNineHeader title="Apply leave" isHome={true} navigation={this.props.navigation}  />

        <ScrollView>
          <Formik
            initialValues={{
              // isSelectFullDay: true,
              // isSelectHalfDay: false,

              // isSelect1stHalf: false, 
              // isSelect2ndHalf: true,
              
              pickerSelectedValue: { id: -1, leaveName: "Select", paidLeave: -1, leaveAllocatedDays: -1, remainingLeaveAllocatedDays: '' },

              // showCalendar: false,
              
              selectedStartDate: '',
              // selectedStart_new_Date: '',
              // selectedStartDateConfirm: false,

              selectedEndDate: '',
              // selectedEnd_new_Date: '',
              // selectedEndDateConfirm: false,

              selectedAssignTo: [],
              // inc: null,

              textInputReason: ''
            }}
            // validationSchema={applyLeaveSchema}
            onSubmit={(values, actions) => {
              // this.props.onPress(values);
              this.applyLeaveHandler();
              // actions.resetForm();
            }}
          >

          {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
            <View style={styles.bodyContainer}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>Select Leave</Text>

              <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }} onPress={() => this.setState({ isSelectFullDay: true, isSelectHalfDay: false, isSelect1stHalf: false, isSelect2ndHalf: true })}>
                  <Text style={[{ backgroundColor: this.state.isSelectFullDay ? 'blue' : null }, styles.radioButton]}></Text>
                  <Text style={{ marginLeft: 10 }}>Full Day</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ marginLeft: 20, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }} onPress={() => this.setState({ isSelectFullDay: false,  isSelectHalfDay: true })}>
                  <Text style={[{ backgroundColor: this.state.isSelectHalfDay ? 'blue' : null }, styles.radioButton]}></Text>
                  <Text style={{ marginLeft: 10 }}>Half Day</Text>
                </TouchableOpacity>
              </View>

              {
                this.state.isSelectHalfDay ?
                (<View style={{ borderWidth: 1, paddingLeft: 15, paddingVertical: 10, marginLeft: "26%", marginBottom: 20, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                  <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }} onPress={() => this.setState({ isSelect1stHalf: true, isSelect2ndHalf: false })}>
                    <Text style={[{ backgroundColor: this.state.isSelect1stHalf ? 'blue' : null }, styles.radioButton]}></Text>
                    <Text style={{ marginLeft: 10 }}>1st Half</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={{ marginLeft: 20, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }} onPress={() => this.setState({ isSelect1stHalf: false,  isSelect2ndHalf: true })}>
                    <Text style={[{ backgroundColor: this.state.isSelect2ndHalf ? 'blue' : null }, styles.radioButton]}></Text>
                    <Text style={{ marginLeft: 10 }}>2nd Half</Text>
                  </TouchableOpacity>
                </View>) : 
                (null)
              }

              <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} onPress={this.startDateHandler}>
                  <Icon style={styles.icon} size={25} name="calendar-alt" />
                  <Text style={[styles.textDate, { borderColor: this.state.selectedStartDateValid ? 'red' : null }]}>{this.state.selectedStartDate != '' ? this.state.selectedStartDate : 'Start Date'}</Text>
                </TouchableOpacity>
          
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} onPress={this.endDateHandler}>
                  <Icon style={styles.icon} size={25} name="calendar-alt" />
                  <Text style={[styles.textDate, { borderColor: this.state.selectedEndDateValid ? 'red' : null }]}>{this.state.selectedEndDate != '' ? this.state.selectedEndDate : 'End Date'}</Text>
                </TouchableOpacity>
              </View>

              {
                this.state.showCalendar && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    mode='date'
                    value={new Date()}
                    minimumDate={this.state.selectedStart_new_Date != '' ? this.state.selectedStart_new_Date : new Date()}
                    display="calendar"
                    onChange={this.onChange}
                  />
                )
              }

              <View style={{ borderWidth: 1, marginBottom: 20, borderColor: this.state.pickerSelectionValid ? 'red' : null }}>
                <Picker
                  selectedValue={this.state.pickerSelectedValue}
                  style={{height: 50, width: "100%"}}
                  onValueChange={(itemValue, itemIndex) => {
                    // console.log('picker ==> ', itemValue, itemIndex)
                    this.setState({
                      pickerSelectedValue: itemValue,
                      pickerSelectionValid: false
                    }, () => {
                      // console.log('state ==> ', this.state);
                    })
                  }}
                >
                  { pickerItem }
                </Picker>
              </View>

              {
                this.state.pickerSelectedValue.leaveName !== 'Select' ?
                  <View style={{ marginBottom: 20, padding: 20, backgroundColor: 'lightgrey' }}>
                    <Text style={{ marginBottom: 5, fontSize: 18, fontWeight: 'bold' }}>Leave Status</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16 }}>Available:&nbsp;&nbsp;</Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{this.state.pickerSelectedValue.remainingLeaveAllocatedDays !== '' ? this.state.pickerSelectedValue.remainingLeaveAllocatedDays : this.state.pickerSelectedValue.leaveAllocatedDays}</Text>
                      </View>

                      <View style={{ marginLeft: 90, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16 }}>Taken:&nbsp;&nbsp;</Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{this.state.pickerSelectedValue.remainingLeaveAllocatedDays !== '' ? this.state.pickerSelectedValue.leaveAllocatedDays - this.state.pickerSelectedValue.remainingLeaveAllocatedDays : 0}</Text>
                      </View>
                    </View>
                  </View> :
                null
              }


              <Text style={{ marginBottom: 10, fontSize: 18, fontWeight: 'bold' }}>Assign to</Text>

              <View style={[{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', flexWrap: "wrap" }, this.state.assignToValid ? styles.assignToValidDesign : null]}>
                { usersWithAuthorityList }
              </View>


              <View style={{ height: 35 }}>
                <Text>&nbsp;</Text>
              </View>


              <TextInput  ref={this.myTextInput} style={[{ borderColor: this.state.textInputReasonValid ? 'red' : null }, styles.textInput]} multiline={true} placeholder="Reason" onChangeText={(textInputReason) => this.setState({ textInputReason: textInputReason, textInputReasonValid: false })} />

              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <NinetyNineButton style={styles.ninetyNineButton} buttonTitle="Apply" onItemPressed={this.applyLeaveHandler} />
                
                <View style={{ marginLeft: 15 }}>
                  <NinetyNineOutlineButton style={styles.ninetyNineOutlineButton} outlineButtonTitle="Cancel" onItemPressed={this.cancelLeaveHandler} />
                </View>
              </View>    

              <Text style={{ marginTop: 30, color: 'red', textAlign: 'left' }}>{ this.props.applyLeave.error != '' ? this.props.applyLeave.error : null }</Text>
            </View>
          )}
        </Formik>
          
        </ScrollView>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    padding: 30,
  },
  radioButton: { 
    borderWidth: 1, 
    paddingHorizontal: 10, 
    borderTopLeftRadius: 40, 
    borderTopRightRadius: 40, 
    borderBottomLeftRadius: 40, 
    borderBottomRightRadius: 40 
  },
  icon: { 
    position: 'absolute',
    left: 12 
  },
  textDate: { 
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 47,
  },
  assignToList: {  
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  assignToValidDesign: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'red'
  },
  textInput: {
    marginBottom: 20, 
    borderWidth: 1, 
    paddingLeft: 15, 
    paddingTop: 5, 
    paddingBottom: 80
  },
  ninetyNineButton: {
    fontSize: 18, 
    fontWeight: 'bold', 
    paddingHorizontal: 40, 
    paddingVertical: 10, 
    color: '#fff'
  },
  ninetyNineOutlineButton: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    paddingHorizontal: 40, 
    paddingVertical: 10, 
    color: '#000',
  }
})


const mapStateToProps = state => {
  return {
    applyLeave: state.applyLeave
  }
}

export default connect(mapStateToProps)(ApplyLeave);
