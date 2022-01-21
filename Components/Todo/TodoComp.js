import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  Dimensions,
  Alert,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
import { CheckBox, Button } from "react-native-elements";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
const { height, width } = Dimensions.get("screen");

const TodoComp = (props) => {
  const [newTodo, setNewTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [editingTodo, setEditingTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [checkedIndex, setCheckedIndex] = useState(null);
  const [finishedTodo, setFinishedTodo] = useState([]);

  const addTodo = () => {
    if (newTodo.length > 0) {
      todoList.push(newTodo);
      setTodoList([...todoList]);
      Keyboard.dismiss();
      ToastAndroid.show(`${newTodo} added Succesfully`,ToastAndroid.SHORT)
      setNewTodo("");
    } else {
      Alert.alert("Task", "Please enter a task!");
    }
  };

  const deleteTodo = (index) => {
    Alert.alert("Delete Todo", `Are you sure to delete "${todoList[index]}"`, [
      {
        text: "Yes",
        onPress: () => {
          todoList.splice(index, 1);
          setTodoList([...todoList]);
          
        },   
      },
      {
        text: "No",
        onPress: () => null,
      },
    ]);
  };

  const editTodo = (index) => {
    setEditingIndex(index);
    setEditingTodo(todoList[index]);
    setIsEdited(true);
  };

  const saveTodo = (index) => {
    setIsEdited(false);
    setIsEdited(false);
    todoList.splice(index, 1, editingTodo);
    setTodoList([...todoList]);
  };

  const completedTodo = (index) => {
    setCheckedIndex(index);
    setIsChecked(true);
    finishedTodo.push(todoList[index]);
    todoList.splice(index, 1);
    setTodoList([...todoList]);
    setIsChecked(false);
  };

  const addAgain = (value, index) => {
    todoList.push(value);
    setTodoList([...todoList]);
    finishedTodo.splice(index, 1);
    setFinishedTodo([...finishedTodo]);
  };

  const deleteCompleted = (index) => {
    finishedTodo.splice(index, 1);
    setFinishedTodo([...finishedTodo]);
  };
  return (
    <View style={styles.todoContainer}>
      <Text style={styles.heading}>ADD ITEMS</Text>
      <View style={styles.horizontalLine}></View>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setNewTodo(text)}
          value={newTodo}
          placeholder="Enter your tasks"
        />
        <View >
          <TouchableOpacity onPress={addTodo}>
            <Text style={styles.button}>
              <Icon name="plus" size={30} color={props.myPrimaryColor} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/**************************Todo list****************************** */}
      <View>
        {todoList.length > 0 && (
          <View>
            <Text style={styles.heading}>Todo Lists</Text>
            <View style={styles.horizontalLine}></View>
          </View>
        )}
        {todoList.length > 0 ? (
          todoList.map((value, index) => {
            return (
              <View key={index + 1} style={styles.todoList}>
                <View style={{ width: "70%",marginLeft: width - (width * 97) / 100, }}>
                  {isEdited && editingIndex === index ? (
                    <View style={styles.textInputContainer}>
                      <TextInput
                        style={[
                          styles.textInput,
                          { marginLeft: 10, width: "92%" },
                        ]}
                        placeholder="Enter"
                        value={editingTodo}
                        onChangeText={(text) => setEditingTodo(text)}
                      />
                    </View>
                  ) : isChecked && checkedIndex === index ? (
                    <CheckBox
                      title={value}
                      checked={isChecked}
                      onPress={() => completedTodo(index)}
                      checkedColor="green"
                    />
                  ) : (
                    <CheckBox
                      title={value}
                      checked={false}
                      onPress={() => completedTodo(index)}
                      checkedColor="green"
                    />
                  )}
                </View>
                <View style={{ marginRight: 10 }}>
                  {isEdited && editingIndex === index ? (
                    <TouchableOpacity onPress={() => saveTodo(index)}>
                      <Text style={styles.button}>
                        <Icon name="check" size={30} color="green" />
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => editTodo(index)}>
                      <Text style={styles.button}>
                        <Icon name="edit" size={30} color="purple" />
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                <View style={{ marginRight: 10 }}>
                  <TouchableOpacity onPress={() => deleteTodo(index)}>
                    <Text style={styles.button}>
                      <Icon name="close" size={30} color="red" />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        ) : (
          <View></View>
        )}
      </View>
      {/*************************************Completed*********************************/}
      {finishedTodo.length > 0 && (
        <View>
          <Text style={styles.heading}>Completed</Text>
          <View style={styles.horizontalLine}></View>
        </View>
      )}
      {finishedTodo.length > 0 ? (
        <View>
          {finishedTodo.map((value, index) => {
            return (
              <View key={index} style={styles.todoList}>
                <View style={styles.completedTodo}>
                  <CheckBox
                    containerStyle=""
                    style={[styles.textInput, { marginLeft: 11, width: "92%" }]}
                    title={<Text style={styles.strickOut}>{value}</Text>}
                    checked={true}
                    checkedColor="green"
                  />
                </View>
                <View style={{ marginRight: 10 }}>
                  <TouchableOpacity onPress={() => addAgain(value, index)}>
                    <Text style={styles.button}>
                      <Icon name="undo" size={30} color="black" />
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ marginRight: 10 }}>
                  <TouchableOpacity onPress={() => deleteCompleted(index)}>
                    <Text style={styles.button}>
                      <Icon name="close" size={30} color="red" />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default TodoComp;
const myMarginTop = height - (height * (100 - 2)) / 100;
const myMarginBottom = height - (height * (100 - 2)) / 100;

const styles = StyleSheet.create({
  todoContainer: {
    padding: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7E16BA",
  },
  horizontalLine: {
    borderWidth: 1,
  },
  textInputContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: myMarginTop,
    marginBottom: myMarginBottom,
  },
  textInput: {
    width: width - (width * 20) / 100,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "white",
    marginRight: 10,
    borderRadius: 5,
    padding: 5,
    color: "black",
    fontWeight: "bold",
  },
  button: {
    marginRight: 10,
    padding:5,
    borderRadius:5,
    width:50,
    textAlign:"center",
    backgroundColor:"white"
  },
  todoList: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  completedTodo: { marginLeft:10,width: width - (width * 33) / 100, opacity: 0.4 },
  strickOut: { textDecorationLine: "line-through" },
});

//dimension library
