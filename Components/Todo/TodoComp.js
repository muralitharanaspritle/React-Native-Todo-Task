import { StyleSheet, Text, TextInput, View, Keyboard } from "react-native";
import { CheckBox, Button } from "react-native-elements";
import React, { useState } from "react";

const TodoComp = () => {
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
      setNewTodo("");
    }
  };

  const deleteTodo = (index) => {
    todoList.splice(index, 1);
    setTodoList([...todoList]);
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
          placeholder="Enter tasks ..."
        />
        <View style={styles.button}>
          <Button title="Add" onPress={addTodo} />
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
                <View style={{ width: "70%" }}>
                  {isEdited && editingIndex === index ? (
                    <View style={styles.textInputContainer}>
                      <TextInput
                        style={[
                          styles.textInput,
                          { marginLeft: 11, width: "92%" },
                        ]}
                        placeholder="enter"
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
                    <Button title="save" onPress={() => saveTodo(index)} />
                  ) : (
                    <Button title="edit" onPress={() => editTodo(index)} />
                  )}
                </View>
                <View style={{ marginRight: 10 }}>
                  <Button title="delete" onPress={() => deleteTodo(index)} />
                </View>
              </View>
            );
          })
        ) : (
          <View></View>
        )}
      </View>
      {/*************************************finished*********************************/}
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
                <View style={{ width: "70%",opacity:0.5 }}>
                  <CheckBox
                    style={[styles.textInput, { marginLeft: 11, width: "92%" }]}
                    title={value}
                    checked={true}
                    checkedColor="green"
                    
                  />
                </View>
                <View style={{ marginRight: 10 }}>
                  <Button title="todo" onPress={() => addAgain(value, index)} />
                </View>
                <View style={{ marginRight: 10 }}>
                  <Button
                    title="delete"
                    onPress={() => deleteCompleted(index)}
                  />
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

const styles = StyleSheet.create({
  todoContainer: {
    padding: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  horizontalLine: {
    borderWidth: 1,
  },
  textInputContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  textInput: {
    width: "80%",
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
    width: "17%",
  },
  todoList: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
