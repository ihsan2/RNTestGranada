import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const UserCard = ({item, navigation}) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate('Postingan', {item, tag: true})}>
        <Text style={styles.item}>{item}</Text>
        <Icon name="chevron-right" size={26} />
      </TouchableOpacity>
      <View style={{backgroundColor: 'rgba(0,0,0,0.1)', height: 0.4}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item: {
    fontSize: 16,
  },
});

export default UserCard;
