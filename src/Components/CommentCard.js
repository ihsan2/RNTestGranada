import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';
import {API} from '../api';

const width = Dimensions.get('window').width;

const CommentCard = ({item, post}) => {
  return (
    <View>
      <View style={{marginBottom: 10}}>
        <View style={styles.container}>
          <View>
            <Image source={{uri: item.owner.picture}} style={styles.avatar} />
          </View>
          <View style={styles.right}>
            <Text style={styles.name}>
              {item.owner.firstName} {item.owner.lastName}{' '}
              <Text style={{fontWeight: 'normal'}}>
                {post ? item.text : item.message}
              </Text>
            </Text>
            <Text style={styles.time}>
              {moment(item.publishDate).format('DD MMM YYYY HH:mm')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 14,
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

export default CommentCard;
