import React from 'react';
import {View, Text, SafeAreaView, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Navigation from '../Navigation';

const Root = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Pressable onPress={() => navigation.navigate('Home')}>
        <View style={styles.menu}>
          <Text style={styles.text}>1. DUMMYAPI.IO</Text>
          <Icon name="chevron-right" size={22} color={'#F1582C'} />
        </View>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('GpsCamera')}>
        <View style={styles.menu}>
          <Text style={styles.text}>2. GPS & Camera</Text>
          <Icon name="chevron-right" size={22} color={'#F1582C'} />
        </View>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Location')}>
        <View style={styles.menu}>
          <Text style={styles.text}>3. DROPDOWN LOCATION</Text>
          <Icon name="chevron-right" size={22} color={'#F1582C'} />
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  menu: {
    backgroundColor: '#EBEDF0',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  text: {
    color: '#F1582C',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Root;
