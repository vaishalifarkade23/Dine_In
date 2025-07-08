import { collection, doc, setDoc } from "firebase/firestore";
import { slots,carouselImages,restaurants } from "../store/restaurant";
import { db } from "./firebaseConfig";


//to upload restaurant data to firebase firestore
// restaurants is imported from store/restaurant.js
// const restaurantData =restaurants

// const uploadData = async () =>{
//     try {
//         for(let i=0; i<restaurantData.length; i++){
//             const restaurant = restaurantData[i]; // restaurant is piese of data jo setDoc me jane wala hai
       
//             const docRef = doc(collection(db, "restaurants"), `restaurant-${i+1}`);//docRef is for which document we are going to create
//              await setDoc(docRef,restaurant);// setDoc is used to set the data in the document
//             console.log(`Restaurant ${i+1} uploaded successfully`);
//         }
        
//     } catch (error) {
//         console.error("Error uploading data: ", error);
//     }
// }
//  export default uploadData;



// to upload carousel data to firebase firestore
// carouselImages is imported from store/restaurant.js
// const restaurantData = carouselImages; 

// const uploadData = async () =>{
//     try {
//         for(let i=0; i < restaurantData.length; i++){
//             const restaurant = restaurantData[i]; // restaurant is piese of data jo setDoc me jane wala hai
       
//             const docRef = doc(collection(db, "carousel"), `carousel-${i+1}`);//docRef is for which document we are going to create
//              await setDoc(docRef,restaurant);// setDoc is used to set the data in the document
//             console.log(`carousel ${i+1} uploaded successfully`);
//         }
        
//     } catch (error) {
//         console.error("Error uploading data: ", error);
//     }
// }



const restaurantData = slots; 

const uploadData = async () =>{
    try {
        for(let i=0; i < restaurantData.length; i++){
            const restaurant = restaurantData[i]; // restaurant is piese of data jo setDoc me jane wala hai
       
            const docRef = doc(collection(db, "slots"), `slots-${i+1}`);//docRef is for which document we are going to create
             await setDoc(docRef,restaurant);// setDoc is used to set the data in the document
            console.log(`slots ${i+1} uploaded successfully`);
        }
        
    } catch (error) {
        console.error("Error uploading data: ", error);
    }
}
 export default uploadData;