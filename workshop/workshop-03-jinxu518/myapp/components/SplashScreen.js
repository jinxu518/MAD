import { StyleSheet, View, Text, ImageBackground, Button } from "react-native";
export default function SplashScreen({ navigation }) {
  const image = { uri: "https://picsum.photos/200" };
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <ImageBackground source={image} resizeMode="stretch" style={styles.image}>
        <Text style={[styles.text]}>CONTACT MANGEMENT</Text>
        <View style={styles.startText}>
          <Button
            title="Let's start"
            onPress={() => navigation.navigate("contactlist")}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    color: "white",
    fontSize: 50,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "45%",
  },
  startText: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "#2196f3",
    zIndex: 1,
    height: 50,
    width: "100%",
    justifyContent: "center",
    padding: 20,
    alignItems: "center",
    overflow: "hidden",
  },
});
