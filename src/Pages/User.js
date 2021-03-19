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

const User = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const [metas, setMeta] = useState(null);
  const [load, setLoad] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(null);

  useEffect(() => {
    _getUsers(false);
  }, []);

  const _getUsers = isLoadMore => {
    isLoadMore ? setLoadMore(true) : setLoad(true);
    const page = metas ? metas.page + 1 : 0;
    API()
      .request.get(`user?page=${page}`)
      .then(res => {
        const data = [...users, ...res.data.data];
        const meta = {
          total: res.data.total,
          page: res.data.page,
          limit: res.data.limit,
          offset: res.data.offset,
        };
        setUsers(data);
        setMeta(meta);
      })
      .catch(err => console.log('Error get users', err))
      .finally(() => {
        setLoadMore(false);
        setLoad(false);
      });
  };

  const _handleEndOfScroll = () => {
    _getUsers(true);
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
            {users.map(item => (
              <UserCard key={item.id} item={item} navigation={navigation} />
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

export default User;
