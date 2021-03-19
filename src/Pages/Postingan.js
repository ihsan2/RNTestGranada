import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {API} from '../api';
import PostCard from '../Components/PostCard';
import {scrollIsCloseToBottom} from '../helpers';

const Postingan = ({navigation, route}) => {
  const refScroll = useRef();
  const postItem = route.params.item;
  const [posts, setPosts] = useState([]);
  const [metas, setMeta] = useState(null);
  const [load, setLoad] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(null);

  useEffect(() => {
    _getPosts(false);
  }, []);

  const _getPosts = isLoadMore => {
    const url = route.params?.tag
      ? `tag/${postItem}`
      : `user/${postItem.owner.id}`;
    isLoadMore ? setLoadMore(true) : setLoad(true);
    const page = metas ? metas.page + 1 : 0;
    API()
      .request.get(`${url}/post?page=${page}`)
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
      .catch(err => console.log('Error get posts', err))
      .finally(() => {
        setLoadMore(false);
        setLoad(false);
      });
  };

  const _handleEndOfScroll = () => {
    _getPosts(true);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {load ? (
        <View style={{marginTop: 20}}>
          <ActivityIndicator color={'black'} />
        </View>
      ) : (
        <ScrollView
          ref={refScroll}
          onScroll={({nativeEvent}) => {
            const currentOffset = nativeEvent.contentOffset.y;
            const direction = currentOffset > scrollOffset ? 'down' : 'up';
            setScrollOffset(currentOffset);

            if (direction === 'down' && scrollIsCloseToBottom(nativeEvent)) {
              _handleEndOfScroll();
            }
          }}>
          <View style={{paddingTop: 16}}>
            {posts.map(item => (
              <PostCard key={item.id} item={item} navigation={navigation} />
            ))}
          </View>
          {loadMore && (
            <ActivityIndicator style={{marginBottom: 20}} color={'black'} />
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Postingan;
