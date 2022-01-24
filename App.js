import { StatusBar } from "expo-status-bar";
import {
  Keyboard,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
} from "react-native";
import TodoComp from "./Components/Todo/TodoComp";

const myConatinerColor = "white";
const myAppHeaderColor = "#7E16BA";
export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.appHeading}>
            <Text style={styles.appHeadingText}>TodoList</Text>
          </View>
          <ScrollView>
            <TodoComp myPrimaryColor={"#7E16BA"} />
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myConatinerColor,
  },
  appHeading: {
    backgroundColor: myAppHeaderColor,
    height: 150,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  appHeadingText: {
    fontWeight: "bold",
    fontSize: 30,
    letterSpacing: 2,
    color: "white",
    textAlign: "center",
  },
});
