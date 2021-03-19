import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ModalPickerImage = ({
  closeModal,
  visible,
  selectCamera,
  selectGalery,
}) => {
  return (
    <View>
      <Modal
        visible={visible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.allContent}>
            <TouchableWithoutFeedback>
              <View style={styles.content}>
                <Text style={styles.type}>Pilih Gambar</Text>
                <View style={styles.groupIcon}>
                  <TouchableWithoutFeedback onPress={selectGalery}>
                    <View style={styles.iconText}>
                      <View style={styles.icon}>
                        <Icon name={'image'} size={18} color={'#fff'} />
                      </View>
                      <Text style={styles.text}>Galeri</Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={selectCamera}>
                    <View style={styles.iconText}>
                      <View style={styles.icon}>
                        <Icon name={'camera'} size={18} color={'#fff'} />
                      </View>
                      <Text style={styles.text}>Kamera</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default ModalPickerImage;

const styles = StyleSheet.create({
  allContent: {
    backgroundColor: 'rgba(0,0,0,0.82)',
    flex: 1,
    justifyContent: 'flex-end',
    height: '100%',
  },
  content: {
    backgroundColor: '#fff',
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  type: {
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 16,
  },
  groupIcon: {
    flexDirection: 'row',
    marginLeft: 16,
  },
  iconText: {
    marginRight: 36,
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    backgroundColor: '#F1582C',
    padding: 12,
    borderRadius: 50,
  },
  text: {
    fontSize: 16,
    marginTop: 8,
    color: 'gray',
  },
});
