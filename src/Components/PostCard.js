import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/AntDesign';
import {API} from '../api';

const width = Dimensions.get('window').width;

const PostCard = ({item, navigation}) => {
  const [totalComments, setComments] = useState(0);

  useEffect(() => {
    _getComment();
  }, []);

  const _getComment = () => {
    API()
      .request.get(`post/${item.id}/comment`)
      .then(res => {
        setComments(res.data.total);
      })
      .catch(err => console.log('Error get comments', err));
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Postingan', {item})}
        style={{marginBottom: 10}}>
        <View style={styles.container}>
          <View>
            <Image source={{uri: item.owner.picture}} style={styles.avatar} />
          </View>
          <View style={styles.right}>
            <Text style={styles.name}>
              {item.owner.firstName} {item.owner.lastName}
            </Text>
            <Text style={styles.time}>
              {moment(item.publishDate).format('DD MMM YYYY HH:mm')}
            </Text>
          </View>
        </View>
        <View style={styles.text}>
          <Text>{item.text}</Text>
        </View>
        <View>
          <FastImage
            style={styles.image}
            source={{
              uri: item.image
                ? item.image
                : 'https://bitsofco.de/content/images/2018/12/broken-1.png',
              priority: FastImage.priority.low,
            }}
            resizeMode={FastImage.resizeMode.stretch}
          />
        </View>
        <View style={styles.bottom}>
          <View style={styles.likeSection}>
            <View style={styles.likeIcon}>
              <Icon name={'like1'} size={12} color={'#fff'} />
            </View>
            <Text>{item.likes}</Text>
          </View>
          {totalComments ? (
            <TouchableOpacity
              onPress={() => navigation.navigate('Comments', {item})}>
              <Text style={styles.comment}>{totalComments} Komentar</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </TouchableOpacity>
      <View
        style={{height: 10, backgroundColor: '#F0F2F5', marginBottom: 20}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 14,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
  time: {
    color: '#d0d0d0',
    fontWeight: 'bold',
    marginTop: 2,
    fontSize: 12,
  },
  name: {
    color: '#000',
    fontWeight: 'bold',
  },
  right: {
    marginHorizontal: 14,
  },
  image: {
    width: width,
    height: 400,
  },
  likeSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeIcon: {
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0272E5',
    marginRight: 5,
  },
  bottom: {
    marginTop: 10,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  comment: {
    color: 'gray',
  },
  text: {
    margin: 16,
    marginTop: 0,
  },
});

export default PostCard;
