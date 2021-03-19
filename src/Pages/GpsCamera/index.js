import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalPickerImage from '../../Components/ModalPickerImage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker/src';

const GpsCamera = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState(null);

  const _selectGalery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      response => {
        setImage(response);
        setVisible(false);
      },
    );
  };

  const _selectCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      response => {
        setImage(response);
        setVisible(false);
      },
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Pressable onPress={() => navigation.navigate('Maps')}>
        <View style={styles.menu}>
          <Text style={styles.text}>LOCATION / GPS</Text>
          <Icon name="chevron-right" size={22} color={'#F1582C'} />
        </View>
      </Pressable>
      <Pressable onPress={() => setVisible(true)}>
        <View style={styles.menu}>
          <Text style={styles.text}>SELECT IMAGE</Text>
          <Icon name="chevron-right" size={22} color={'#F1582C'} />
        </View>
      </Pressable>
      {image ? <Image source={{uri: image.uri}} style={styles.image} /> : null}

      <ModalPickerImage
        visible={visible}
        closeModal={() => setVisible(false)}
        selectCamera={_selectCamera}
        selectGalery={_selectGalery}
      />
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
  image: {
    width: '90%',
    height: 360,
    marginHorizontal: 20,
    borderRadius: 10,
  },
});

export default GpsCamera;
