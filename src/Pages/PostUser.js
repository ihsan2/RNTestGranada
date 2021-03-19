import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {API} from '../api';
import PostUserCard from '../Components/PostUserCard';
import {scrollIsCloseToBottom} from '../helpers';

const PostUser = ({navigation, userId}) => {
  const [posts, setPosts] = useState([]);
  const [metas, setMeta] = useState(null);
  const [load, setLoad] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [
    onEndReachedCalledDuringMomentum,
    setonEndReachedCalledDuringMomentum,
  ] = useState(true);

  useEffect(() => {
    _getPosts(false);
  }, []);

  const _getPosts = isLoadMore => {
    isLoadMore ? setLoadMore(true) : setLoad(true);
    const page = metas ? metas.page + 1 : 0;
    API()
      .request.get(`user/${userId}/post?page=${page}`)
      .then(res => {
        const data = [...posts, ...res.data.data];
        const meta = {
          total: res.data.total,
          page: res.data.page,
          limit: res.data.limit,
          offset: res.data.offset,
        };
        setPosts(data);
        setMeta(meta);
      })
      .catch(err => console.log('Error get post', err))
      .finally(() => {
        setLoadMore(false);
        setLoad(false);
      });
  };

  const _handleEndOfScroll = () => {
    _getPosts(true);
    // console.log('loadmore');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {load ? (
        <View style={{marginTop: 20}}>
          <ActivityIndicator color={'black'} />
        </View>
      ) : (
        <View>
          <View style={{paddingHorizontal: 0.5}}>
            <FlatList
              numColumns={3}
              data={posts}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <PostUserCard item={item} navigation={navigation} />
              )}
              onMomentumScrollBegin={() => {
                setonEndReachedCalledDuringMomentum(false);
              }}
              onEndReached={() => {
                if (!onEndReachedCalledDuringMomentum) {
                  _handleEndOfScroll();
                  setonEndReachedCalledDuringMomentum(true);
                }
              }}
              onEndReachedThreshold={0.1}
              ListFooterComponent={() =>
                loadMore && (
                  <ActivityIndicator
                    style={{marginVertical: 20}}
                    color={'black'}
                  />
                )
              }
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default PostUser;
