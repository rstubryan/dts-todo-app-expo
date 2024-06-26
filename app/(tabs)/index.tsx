import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  useColorScheme,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [updatingTodoId, setUpdatingTodoId] = useState(null);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const loadTodos = async () => {
      const savedTodos = await AsyncStorage.getItem("todos");
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    const saveTodos = async () => {
      await AsyncStorage.setItem("todos", JSON.stringify(todos));
    };

    saveTodos();
  }, [todos]);

  const colors = {
    light: {
      background: "#fff",
      text: "#000",
    },
    dark: {
      background: "#000",
      text: "#fff",
    },
  };

  const currentColors = colors[colorScheme];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: currentColors.background,
    },
    input: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: currentColors.background,
      color: currentColors.text,
    },
    todoItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: currentColors.background,
    },
    headingText: {
      marginTop: 25,
      marginBottom: 15,
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      color: currentColors.text,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 10,
    },
    text: {
      color: currentColors.text,
    },
  });

  const addTodo = () => {
    if (updatingTodoId) {
      setTodos(
        todos.map((todo) =>
          todo.id === updatingTodoId ? { ...todo, text: input } : todo,
        ),
      );
      setUpdatingTodoId(null);
    } else {
      setTodos([...todos, { id: Date.now().toString(), text: input }]);
    }
    setInput("");
  };

  const updateTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      setInput(todo.text);
      setUpdatingTodoId(id);
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Todo App</Text>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Add todo"
      />
      <Button title="Add Todo" onPress={addTodo} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.text}>{item.text}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Delete" onPress={() => deleteTodo(item.id)} />
              <Button
                title="Update"
                onPress={() => updateTodo(item.id, "New Text")}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}
