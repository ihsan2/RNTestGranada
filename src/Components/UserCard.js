import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const UserCard = ({item, navigation}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('UserDetail', {item})}>
      <View>
        <Image source={{uri: item.picture}} style={styles.avatar} />
      </View>
      <View style={styles.right}>
        <Text style={styles.email}>{item.email}</Text>
        <Text style={styles.name}>
          {item.firstName} {item.lastName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  email: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  name: {
    color: '#8E8E8E',
    fontWeight: 'bold',
    marginTop: 2,
  },
  right: {
    marginHorizontal: 16,
  },
});

export default UserCard;
