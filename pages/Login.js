import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { auth, firestore } from "../Firebase";
import { colors } from "../components/Colors";

const Login = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscrbe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("authStateChanged -> logged in: " + user.email);
        navigation.replace("MainNavigation");
      }
    });

    return unsubscrbe;
  }, []);

  const handleSignup = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        firestore.collection("users").doc(auth.currentUser.uid).set({
          email: email,
        });
        console.log("registered: ", user.email);
      })
      .catch((error) => console.log(error));
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("logged in: " + user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image
          source={require("../assets/title.png")}
          style={styles.imageContainer}
        />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSignup}
              style={[styles.button, styles.buttonOutline]}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.dark,
  },
  imageContainer: {
    alignItems: "center",
    width: "75%",
    resizeMode: "contain",
    marginTop: 50,
  },
  inputContainer: {
    alignItems: "center",
    width: "80%",
  },
  input: {
    width: "100%",
    backgroundColor: colors.secondary,
    padding: 25,
    margin: 5,
    borderRadius: 25,
  },
  buttonContainer: {
    width: "80%",
    marginTop: 50,
  },
  button: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    alignItems: "center",
    padding: 20,
    margin: 5,
    borderWidth: 5,
    borderRadius: 25,
  },
  buttonOutline: {
    backgroundColor: colors.secondary,
    borderColor: colors.primary,
    borderWidth: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
