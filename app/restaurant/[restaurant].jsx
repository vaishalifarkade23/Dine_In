import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams } from 'expo-router';
import {
  collection, getDocs, query, where
} from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../../config/firebaseConfig';

export default function Restaurant() {
  const { restaurant } = useLocalSearchParams();
  // console.log(restaurant);
  const flatListRef = useRef(null)
  const [restaurantData, setRestaurantData] = useState({});
  const [carouselData, setCarouselData] = useState({});
  const [slotsData, setSlotsData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const windowWidth = Dimensions.get("window").width;


  const getRestaurantData = async () => {
    try {
      //query 
      const restaurantQuery = query(
        collection(db, "restaurants"),
        where("name", "==", restaurant)
      );
      const restaurantSnapshot = await getDocs(restaurantQuery);

      if (restaurantSnapshot.empty) {
        console.log("No matching restaurant found");
        return;
      }

      //doc 
      for (const doc of restaurantSnapshot.docs) {
        const restaurantData = doc.data();
        setRestaurantData(restaurantData);

        const carouselQuery = query(
          collection(db, "carousel"),
          where("res_id", "==", doc.ref)
        );
        const carouselSnapshot = await getDocs(carouselQuery);
        const carouselImages = [];
        if (carouselSnapshot.empty) {
          console.log("No matching carousel found");
          return;
        }
        carouselSnapshot.forEach((carouselDoc) => {
          carouselImages.push(carouselDoc.data());
        });
        setCarouselData(carouselImages);

        const slotsQuery = query(
          collection(db, "slots"),
          where("ref_id", "==", doc.ref)
        );
        const slotsSnapshot = await getDocs(slotsQuery);
        const slots = [];
        if (carouselSnapshot.empty) {
          console.log("No matching slots found");
          return;
        }
        slotsSnapshot.forEach((slotDoc) => {
          slots.push(slotDoc.data());
        });
        setSlotsData(slots[0]?.slot);
      }
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  useEffect(() => {
    getRestaurantData();
  }, []);

  console.log("rest", restaurantData)
  console.log("carouselData", carouselData);
  console.log("slotsData", slotsData);

  const handleNextImage = () => {

    const carousalLength = carouselData[0]?.images.length;
    // if (!carousalLength) return;

    //next images
    if( currentIndex < carousalLength - 1)
    {
      const nextIndex = currentIndex + 1 ;
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({index: nextIndex,animated :true});
    }
    //go on last image automaticaly come in 1st image
     if( currentIndex == carousalLength - 1)
    {
      const nextIndex = 0 ;
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({index: nextIndex,animated :true});
    }
  }
  
  const handlePrevImage = () => {

    const carousalLength = carouselData[0]?.images.length;
    // if (!carousalLength) return;

    //next images
    if( currentIndex > 0)
    {
      const prevIndex = currentIndex - 1 ;
      setCurrentIndex(prevIndex);
      flatListRef.current.scrollToIndex({index: prevIndex,animated :true});
    } 
    //go on last image automaticaly come in 1st image
     if( currentIndex == 0)
    {
      const prevIndex = carousalLength - 1 ;
      setCurrentIndex(prevIndex);
      flatListRef.current.scrollToIndex({index: prevIndex,animated :true});
    }
  }

  const carousalItem = ({ item }) => {
    return (
      <View style={{
        width: windowWidth - 2,
      }}
        className="h-64 relative rounded-[25px]"
      >
        <View style={{
          position: 'absolute', top: '50%', backgroundColor: 'rgba(0,0,0,0.6)',
          borderRadius: 50, padding: 5, zIndex: 10, right: '6%'
        }}>
          <Ionicons onPress={handleNextImage} name="arrow-forward" size={24} color="white" />
        </View>
         <View style={{
          position: 'absolute', top: '50%', backgroundColor: 'rgba(0,0,0,0.6)',
          borderRadius: 50, padding: 5, zIndex: 10, left: '2%'
        }}>
          <Ionicons onPress={handlePrevImage} name="arrow-back" size={24} color="white" />
        </View>
        <Image
          source={{ uri: item }}
          style={{
            opacity: 0.5,
            backgroundColor: 'black',
            marginRight: 20,
            marginLeft: 5,
            borderRadius: 25
          }}
          className="h-64"
        />

      </View>
    )
  }



  return (
    <SafeAreaView style={[{ backgroundColor: "#2b2b2b" },
    Platform.OS === "android" && { paddingBottom: 70 },
    Platform.OS === "ios" && { paddingBottom: 20 }
    ]}>
      <ScrollView className="h-full">
        <View className="flex-1 my-2 p-2">
          <Text className="text-[#f49b33] text-xl mr-2 font-semibold">{restaurant}</Text>
          <View className="border-b border-[#f49b33]"></View>
        </View>
        <View className='h-64 max-w-[98%] mx-2 rounded-[25px]'>

          <FlatList
            ref={flatListRef}
            data={carouselData[0]?.images}
            renderItem={carousalItem}
            horizontal
            scrollEnabled={false}
            style={{ borderRadius: 25 }}
            showsHorizontalScrollIndicator={false}
          />
        </View>

      </ScrollView>
    </SafeAreaView>

  )
}