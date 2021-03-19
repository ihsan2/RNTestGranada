import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const w = Dimensions.get('window').width;

const UserCard = ({item, navigation}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Postingan', {item})}>
      <View>
        <Image
          source={{
            uri: item.image
              ? item.image
              : 'https://bitsofco.de/content/images/2018/12/broken-1.png',
          }}
          style={styles.avatar}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 1,
  },
  avatar: {
    width: w / 3 - 2.5,
    height: 120,
  },
});

export default UserCard;
