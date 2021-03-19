import React from 'react';
import {View, Text} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const Dropdown = ({item, value, onChange, title}) => {
  return (
    <View style={{marginHorizontal: 10}}>
      <Text style={{fontWeight: 'bold', marginBottom: 10}}>{title}</Text>
      <DropDownPicker
        items={item}
        defaultValue={value.value}
        containerStyle={{height: 54}}
        style={{backgroundColor: '#fafafa'}}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownStyle={{backgroundColor: '#fafafa'}}
        onChangeItem={item => onChange(item)}
      />
    </View>
  );
};

export default Dropdown;
