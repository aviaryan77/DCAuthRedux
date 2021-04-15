import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import FormContainer from "../Components/Form/FormContainer";
import Input from "../Components/Form/Input";
import Error from "../Components/Error";
import axios from "axios";
import baseURL from "../assets/baseUrl";
import { connect } from "react-redux";
import { setLoggedInStatus, setUserName } from "../Redux/actions/actions";

const Register = (props) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Validation

  const isValidForm = () => {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (userName == "" || email == "" || password == "") {
      alert("Input can't be blank");
      return false;
    } else if (reg.test(email) == false) {
      alert("Invalid Email Address");
      return false;
    } else if (email == null || password == "") {
      alert("Password can't be blank");
      return false;
    } else if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return false;
    } else {
      return true;
    }
  };
  // on Register press button function
  const register = () => {
    if (!isValidForm()) {
      setError("Please fill the form correct!");
      return;
    }

    let user = {
      username: userName,
      email: email,
      password: password,
    };

    // API Post for user registraion
    axios
      .post(`${baseURL}users`, { user })
      //.post('https://conduit.productionready.io/api/users', {user})
      .then((res) => {
        props.setLoggedInStatus(true);
        props.setUserName(res.data.user.username);
        props.navigation.navigate("Articles", { userName });
      })
      .catch((error) => {
         console.warn("Something went wrong.Please try again ", error);
        if (error.response.status == 422) {
          alert("User Name or Email Id is already Registerd, Please try a new one");
          return false;
        }
        return;
      });
  };

  return (
    <View style={styles.container}>
      {!props.isLoggedIn ? (
        <FormContainer title={"Register"}>
          <Input
            placeholder={"User Name"}
            name={"userName"}
            id={"userName"}
            onChangeText={(text) => setUserName(text)}
          />

          <Input
            placeholder={"Email"}
            name={"email"}
            id={"email"}
            onChangeText={(text) => setEmail(text.toLowerCase())}
          />

          <Input
            placeholder={"Password"}
            name={"password"}
            id={"password"}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
          <View style={styles.buttonGroup}>
            {error ? <Error message={error} /> : null}
          </View>
          <View>
            <Button
              title="Register"
              color="tomato"
              onPress={() => register()}
            />
          </View>
        </FormContainer>
      ) : (
        <>
          <Text style={styles.text}>Hello, {userName}</Text>
          <View style={styles.buttonGroup}>
            <Button
              color="#0066ff"
              title="Go to Articles"
              onPress={() => props.navigation.navigate("Articles")}
            />
            <Button
              color="tomato"
              title="New Registration"
              onPress={() => {
                props.setLoggedInStatus(false);
                setUserName("");
              }}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
  buttonGroup: {
    flexDirection: "row",
    width: "80%",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
});

//store read
const mapStateToProps = ({ user: { isLoggedIn, userName } }) => {
  return {
    isLoggedIn,
    userName,
  };
};

//store update, dispatch
export default connect(mapStateToProps, { setLoggedInStatus, setUserName })(
  Register
);
