// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet, TextInput, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './redux/store'; // Import store từ redux/store.js
import { addBike, setBikes } from './redux/bikeSlice'; // Import action creators

// Màn hình HomeApp
function HomeApp({ navigation }) {
  const bikes = useSelector(state => state.bike.bikes); // Lấy bikes từ Redux store
  const dispatch = useDispatch(); // Dispatch action

  useEffect(() => {
    // Gọi API khi component được mount
    fetch('https://6565ed57eb8bb4b70ef29963.mockapi.io/bike')
      .then((response) => response.json())
      .then((data) => {
        dispatch(setBikes(data)); // Cập nhật bikes vào Redux store
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch]);

  return (
    <View style={styles.content2}>
    <FlatList
    data={bikes}
    renderItem={({ item }) => {
      return (
        <View style={styles.productContainer}>
          <Image source={{ uri: item.img }} style={styles.imgC2} />
          <Text style={styles.textC2}>{item.name}</Text>
          <Text style={styles.text1C2}>${item.price}</Text>
          <Button
                title="Chi tiết"
                onPress={() => navigation.navigate('BikeDetail', { bike: item })}
              />
        </View>
      );
    }}
    numColumns={1}
  />
      <Button
        title="Thêm xe đạp"
        onPress={() => navigation.navigate('AddBike')}
      />
    </View>
  );
}

// Màn hình AddBike
function AddBike({ navigation }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState('');
  const dispatch = useDispatch(); // Dispatch action

   const handleAddBike = () => {
    if (!name || !price || !img) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin.');
      return;
    }

    const newBike = { name, price, img };

    // Send POST request to the API to add the new bike
    fetch('https://6565ed57eb8bb4b70ef29963.mockapi.io/bike', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBike),
    })
      .then(response => response.json())
      .then(data => {
        // Update Redux store with the new bike from the API response
        dispatch(addBike(data));
        Alert.alert('Thành công', 'Xe đạp đã được thêm.');
        navigation.goBack(); // Go back to Home
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Lỗi', 'Đã xảy ra lỗi khi thêm xe đạp.');
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tên xe đạp"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Giá"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="URL ảnh"
        value={img}
        onChangeText={setImg}
      />
      <Button title="Thêm xe đạp" onPress={handleAddBike} />
    </View>
  );
}
// Màn hình BikeDetail
function BikeDetail({ route }) {
  const { bike } = route.params; // Receive bike data from navigation route params

  return (
    <View style={styles.detailContainer}>
      <Image source={{ uri: bike.img }} style={styles.detailImg} />
      <Text style={styles.detailText}>{bike.name}</Text>
      <Text style={styles.detailPrice}>${bike.price}</Text>
    </View>
  );
}
// Cấu hình navigation
const Stack = createNativeStackNavigator();

// App component
export default function App() {
  return (
    <Provider store={store}> {/* Cung cấp Redux store cho toàn bộ ứng dụng */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeApp} />
          <Stack.Screen name="AddBike" component={AddBike} />
          <Stack.Screen name="BikeDetail" component={BikeDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  imgC2: {
    width: 135,
    height: 127,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 10,
  },
  textC2: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.7)',
  },
  text1C2: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 1)',
  },
  content2: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  productContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  detailImg: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  detailPrice: {
    fontSize: 22,
    color: '#28a745',
  },
});
