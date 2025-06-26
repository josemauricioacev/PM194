import React from 'react';
import { Switch, View, Text } from 'react-native';

const CustomSwitch = ({ value, onValueChange }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text>{value ? 'On' : 'Off'}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
      />
    </View>
  );
};

export default CustomSwitch;