import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {API} from '../api';
import TagCard from '../Components/TagCard';
import {scrollIsCloseToBottom} from '../helpers';

const Tag = ({navigation}) => {
  const [tags, setTags] = useState([]);
  const [metas, setMeta] = useState(null);
  const [load, setLoad] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(null);

  useEffect(() => {
    _getTags(false);
  }, []);

  const _getTags = isLoadMore => {
    isLoadMore ? setLoadMore(true) : setLoad(true);
    const page = metas ? metas.page + 1 : 0;
    API()
      .request.get(`tag?page=${page}`)
      .then(res => {
        const data = [...tags, ...res.data.data];
        const meta = {
          total: res.data.total,
          page: res.data.page,
          limit: res.data.limit,
          offset: res.data.offset,
        };
        setTags(data);
        setMeta(meta);
      })
      .catch(err => console.log('Error get users', err))
      .finally(() => {
        setLoadMore(false);
        setLoad(false);
      });
  };

  const _handleEndOfScroll = () => {
    _getTags(true);
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
          <View style={{paddingHorizontal: 16, paddingTop: 16}}>
            {tags.map(item => (
              <TagCard key={item} item={item} navigation={navigation} />
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

export default Tag;
