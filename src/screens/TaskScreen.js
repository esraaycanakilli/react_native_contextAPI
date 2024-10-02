import {View, Text, Button, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {useRoute} from '@react-navigation/native';
import {TaskContext} from '../context/TaskContext';
import {FlatList, TextInput} from 'react-native-gesture-handler';

export default function TaskScreen() {
  const route = useRoute();
  const {userId} = route.params;
  const {
    tasks,
    loading,
    error,
    removeTask,
    addTask,
    setNewTaskTitle,
    newTaskTitle,
  } = useContext(TaskContext);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} color={'#000000'} />
        </View>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <>
        <FlatList
          data={tasks}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Text style={styles.title}>
                {item.title.length > 20
                  ? item.title.slice(0, 30) + '...'
                  : item.title}
              </Text>
              <Button
              title='Sil'
              onPress={()=>removeTask(item.id)}/>
            </View>
          )}
        />
        <View style={styles.inputContainer}>
          <TextInput
          value={newTaskTitle}
          placeholder='Yeni Task'
          style={styles.input}
          onChangeText={setNewTaskTitle}/>
          <Button title='Ekle' onPress={()=>addTask(newTaskTitle)}/>
        </View>
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#2F3645',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 2},
    shadowOpacity: 0.4,
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#fff',
    height: 40,
    borderWidth: 1,
    width: '75%',
    padding: 5,
    borderRadius: 5,
  },
  inputContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
});