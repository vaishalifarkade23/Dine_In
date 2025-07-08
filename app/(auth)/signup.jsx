import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import { Image, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import validatonSchema from '../../utils/authSchema';

const logo = require("../../assets/images/dinetimelogo.png");
const entryImg = require("../../assets/images/Frame.png");
const SignUp = () => {
  const router = useRouter()
  const handleSignUp = (values) => {
    console.log("Sign Up Values: ", values);
    // Add your sign-up logic here
  };
  return (
    <SafeAreaView className={`bg-[#2b2b2b]`}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#2b2b2b"} />
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="m-2 flex justify-center items-center">
          <Image source={logo} style={{ width: 200, height: 100 }} />
          <Text className="test-lg text-center text-white font-bold mb-10">Let's get you Started</Text>

          <View className="w-5/6">
            <Formik initialValues={{ email: "", password: "" }}
              validationSchema={validatonSchema}
              onSubmit={handleSignUp}>
              {({ handleBlur, handleChange, handleSubmit, values, errors, touched }) => (
                <>
                  <View className="w-full ">
                    <Text className="text-[#f49b33] mt-4 mb-2">Email</Text>
                    <TextInput
                      className="h-10 border border-white text-white rounded px-2"
                      keyboardType='email-address'
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                    />
                    {touched.email && errors.email && <Text className="text-red-500 text-xs mb-2">{errors.email}</Text>}

                    <Text className="text-[#f49b33] mt-4 mb-2">Password</Text>
                    <TextInput
                      className="h-10 border border-white text-white rounded px-2"
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      secureTextEntry
                    />
                    {touched.password && errors.password &&
                      <Text className="text-red-500 text-xs mb-2">{errors.password}</Text>}


                    <TouchableOpacity
                      className="p-2 my-2 bg-[#f49b33] rounded-lg mt-10"
                      onPress={handleSubmit}
                    >
                      <Text
                        className="text-lg font-semibold text-center">SignUp</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
            <View>
              <TouchableOpacity
                className="flex flex-row items-center justify-center mt-5 p-2" onPress={() => router.push("/signin")}>
                <Text className="text-white font-semibold">Already a User?{" "}</Text>
                <Text className="text-base  font-semibold underline text-[#f49b33]">Sign in</Text>
              </TouchableOpacity>

              <Text className="text-center text-white text-lg font-semibold mb-4">
              <View className="border-b-2 border-[#f49b33] p-2 mb-1 w-24" /> or {" "}
              <View className="border-b-2 border-[#f49b33] p-2 mb-1 w-24" />
            </Text>
            <TouchableOpacity
                className="flex flex-row items-center justify-center mb-5 p-2" 
                onPress={() => router.push("/home")}>
                <Text className="text-white font-semibold">Be a{" "}</Text>
                <Text className="text-base  font-semibold underline text-[#f49b33]">Guest user</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="flex-1">
          <Image source={entryImg} className="w-full h-full" resizeMode="contain" />
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default SignUp
