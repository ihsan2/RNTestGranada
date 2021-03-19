import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {API} from '../api';
import UserCard from '../Components/UserCard';
import {scrollIsCloseToBottom} from '../helpers';
import CommentCard from '../Components/CommentCard';

const CommentsPage = ({navigation, route}) => {
  const itemPost = route.params?.item;
  const [comments, setComments] = useState([]);
  const [metas, setMeta] = useState(null);
  const [load, setLoad] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(null);

  useEffect(() => {
    _getComments(false);
  }, []);

  const _getComments = isLoadMore => {
    isLoadMore ? setLoadMore(true) : setLoad(true);
    const page = metas ? metas.page + 1 : 0;
    API()
      .request.get(`post/${itemPost.id}/comment?page=${page}`)
      .then(res => {
        const data = [...comments, ...res.data.data];
        const meta = {
          total: res.data.total,
          page: res.data.page,
          limit: res.data.limit,
          offset: res.data.offset,
        };
        setComments(data);
        setMeta(meta);
      })
      .catch(err => console.log('Error get comments', err))
      .finally(() => {
        setLoadMore(false);
        setLoad(false);
      });
  };

  const _handleEndOfScroll = () => {
    _getComments(true);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {load ? (
        <View style={{marginTop: 20}}>
          <ActivityIndicator color={'black'} />
        </View>
      ) : (
        <ScrollView
          onScroll={({nativeEvent}) => {
            const currentOffset = nativeEvent.contentOffset.y;
            const direction = currentOffset > scrollOffset ? 'down' : 'up';
            setScrollOffset(currentOffset);

            if (direction === 'down' && scrollIsCloseToBottom(nativeEvent)) {
              _handleEndOfScroll();
            }
          }}>
          <View style={{paddingHorizontal: 16}}>
            <CommentCard item={itemPost} post={true} />
          </View>
          <View style={{height: 1, backgroundColor: 'rgba(0,0,0,0.1)'}} />
          <View style={{paddingHorizontal: 16, paddingTop: 16}}>
            {comments.map(item => (
              <CommentCard key={item.id} item={item} post={false} />
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

export default CommentsPage;
