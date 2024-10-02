import {View, Text, ActivityIndicator, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {UserContext} from '../context/UserContext';
import {FlatList} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function UserListScreen() {
  const navigation=useNavigation()
  const {loading, error, users} = useContext(UserContext);

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} color={'#000000'} />
        </View>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity 
            onPress={()=>navigation.navigate('UserDetail',{userId:item.id})}
            >
              <View style={styles.item}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.subtitletitle}>{item.email}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles= StyleSheet.create({
  item:{
    padding:20,
    marginVertical:8,
    backgroundColor:'#fff',
    marginHorizontal:16,
    borderRadius:10,
    shadowColor:'#000',
    shadowOffset:{width:2,height:2},
    shadowOpacity:0.5,
  },
  title:{
    fontSize:18,
    fontWeight:'bold',
  },
  subtitle:{
    fontSize:14,
    color:'#666',
    marginTop:4,
  },
})