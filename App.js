import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import TodoComp from "./Components/Todo/TodoComp";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" animated={true} /> */}
      <TodoComp/>
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop:50
  },
});
