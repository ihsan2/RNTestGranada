import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  Image,
  useWindowDimensions,
} from 'react-native';
import {API} from '../api';
import {scrollIsCloseToBottom} from '../helpers';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TabView, TabBar} from 'react-native-tab-view';
import PostUser from './PostUser';

const User = ({route, navigation}) => {
  const id = route.params.item.id;
  const [user, setUser] = useState(null);
  const [load, setLoad] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes] = useState([{key: 'post', title: 'Postingan'}]);

  const layout = useWindowDimensions();

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'post':
        return <PostUser navigation={navigation} userId={id} />;
    }
  };

  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        indicatorContainerStyle={styles.tabBar}
        indicatorStyle={styles.tabBarIndicator}
        renderLabel={({route, focused, color}) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Icon name={'grid'} size={22} />
            <Text
              style={[
                styles.tabBarLabel,
                focused ? styles.tabBarLabelActive : {},
              ]}>
              {route.title}
            </Text>
          </View>
        )}
        style={styles.tabBar}
      />
    );
  };

  useEffect(() => {
    _getUser();
  }, []);

  const _getUser = () => {
    setLoad(true);
    API()
      .request.get(`user/${id}`)
      .then(res => {
        const data = res.data;
        setUser(data);
      })
      .catch(err => console.log('Error get user', err))
      .finally(() => {
        setLoad(false);
      });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {load ? (
        <View style={{marginTop: 20}}>
          <ActivityIndicator color={'black'} />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View style={styles.body}>
            <View>
              <Image source={{uri: user?.picture}} style={styles.avatar} />
              <Text style={styles.name}>
                {user?.firstName} {user?.lastName}
              </Text>
              <View style={styles.phoneSection}>
                <Icon name={'phone'} size={20} />
                <Text style={styles.phone}>{user?.phone}</Text>
              </View>
              <Text style={styles.address}>
                {user?.location?.street}, {user?.location?.city},{' '}
                {user?.location?.state}, {user?.location?.country}
              </Text>
            </View>
          </View>
          <View style={{marginTop: 10, flex: 1}}>
            <TabView
              navigationState={{index, routes}}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{width: layout.width}}
              renderTabBar={renderTabBar}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    marginBottom: 16,
  },
  phoneSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  phone: {
    fontSize: 16,
    marginLeft: 6,
  },
  address: {
    fontSize: 16,
  },
  tabBar: {
    backgroundColor: '#fff',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 0.5,
  },
  tabBarIndicator: {
    backgroundColor: '#000',
  },
  tabBarLabel: {
    color: '#CACACA',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  tabBarLabelActive: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default User;
