import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ImageBackground, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../../config/firebaseConfig'; // Adjust path to your Firestore config

// import { restaurants } from '../../store/restaurant';

// import uploadData from '../../config/bulkupload';//to upload restaurant data to firebase firestore

const logo = require("../../assets/images/dinetimelogo.png");
const bannar = require("../../assets/images/homeBanner.png");


const home = () => {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState([]); // state to hold restaurant data

  //to upload restaurant data to firebase firestore
// useEffect(()=>{
//   // uploadData()
// },[])
// uploadData();



  const renderItem = ({ item }) => (

    <TouchableOpacity 
    onPress={()=>router.push(`/restaurant/${item.name}`)} // Navigate to restaurant details page
    className="bg-[#5f5f5f] justify-center rounded-lg p-4 mx-4 shadow-md max-h-64 max-w-xs">
      <Image
        resizeMode="cover"
        source={{ uri: item.image }}
        className="mt-2 mb-1 rounded-lg h-28"
      />
      <Text className="text-white text-lg font-bold mb-2">{item.name}</Text>
      <Text className="text-white text-base  mb-2">{item.address}</Text>
      <Text className="text-white text-base  mb-2">Open:{item.opening} - Close:{item.closing}</Text>
      closing
    </TouchableOpacity>
  )

  // Function to fetch restaurants from Firestore
  const getRestaurants = async () => {
      const q = query(collection(db, "restaurants")); // Query to get all documents from the "restaurants" collection
      const res = await getDocs(q);  // Fetching all documents from the "restaurants" collection, 
      // getDocs is used to get multiple  documents from the collection  //getDoc used to get single document from the collection
      res.forEach((item) =>{
        setRestaurants((prev) => [...prev, item.data()]); // Adding each restaurant data to the state
      });
    };
    useEffect(() => {
      getRestaurants(); // Fetch restaurants when the component mounts  
    }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <SafeAreaView style={[{ backgroundColor: "#2b2b2b" },
    Platform.OS === "android" && { paddingBottom: 70 },
    Platform.OS === "ios" && { paddingBottom: 20 }
    ]}>
      <View className='flex items-center pb-6'>
        <View className="bg-[#5f5f5f] w-11/12 rounded-lg shadow-lg justify-between item-center flex flex-row p-1.5" >
          <View className='flex flex-row'>
            <Text className={`text-white align-middle h-10
             ${Platform.OS == "ios" ? "pt-[8px]" : "pt-1"}
             text-base`}>{" "} Welcome to{" "} </Text>
            <Image source={logo} resizeMode='cover' className='w-20 h-12' />
          </View>
        </View>
      </View>
      <ScrollView stickyHeaderIndices={[0]}>
        <ImageBackground
          resizeMode="cover"
          className=" my-4 w-full bg-[#2b2b2b] h-52 items-center justify-center"
          source={bannar}
        >
          <BlurView
            intensity={Platform.OS === "android" ? 100 : 25}
            tint="dark"
            className="w-full p-4 shadow-lg"
          >
            <Text className=" text-center font-bold text-white text-3xl">Dine with your family</Text>
          </BlurView>
        </ImageBackground>

        <View className=" p-4 bg-[#2b2b2b] flex-row items-center" >
          <Text className="font-semibold text-3xl mr-2 text-white ">
            Special Discounts %
          </Text>
        </View>

        {restaurants.length > 0 ?
          <FlatList
            data={restaurants}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{ padding: 16 }}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
          />
          :
          <ActivityIndicator animating color={"#f49b33"} />
        }


        <View className=" p-4 bg-[#2b2b2b]  flex-row items-center" >
          <Text className="font-semibold text-3xl mr-2 text-[#f49b33] ">
            Our restaurants
          </Text>
        </View>

        {restaurants.length > 0 ?
          <FlatList
            data={restaurants}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{ padding: 16 }}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
          />
          :
          <ActivityIndicator animating color={"#f49b33"} />
        }
      </ScrollView>
    </SafeAreaView>

  )
}

export default home