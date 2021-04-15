import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import baseURL from "../assets/baseUrl";

var { width } = Dimensions.get("screen");

function Articles(props) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  //API GET for Articles

  const fetchArticles = () => {
    axios
      .get(`${baseURL}articles`)
      //.get("https://conduit.productionready.io/api/articles")
      .then((res) => {
        setArticles(res.data.articles);
      })
      .catch((error) => {
        console.warn("Something went wrong.Please try again ", error);
        console.log(error);
      });
  };

  return (
    <>
      <View style={styles.usercontainer}>
        <Text style={styles.text}> Hello</Text>
        <Text
          style={{
            ...styles.text,
            fontWeight: "bold",
          }}
        >
          {props.userName},
        </Text>
        <Text style={styles.text}>Welcome to Design.Code</Text>
      </View>
      
      <ScrollView key={articles.title}>
        <View>
          {articles
            ? articles.map((item) => (
                <View style={styles.card}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text>{item.description}</Text>
                  <Image
                    // resizeMode="contain"
                    style={styles.image}
                    source={{
                      uri: item.author.image
                        ? item.author.image
                        : "https://static.productionready.io/images/smiley-cyrus.jpg",
                    }}
                  />
                  <Text>Created at: {item.createdAt}</Text>
                  <Text>Written by: {item.author.username}</Text>
                </View>
              ))
            : null}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  usercontainer: {
    backgroundColor: "tomato",
    alignItems: "center",
    flexDirection: "row",
  },
  card: {
    marginTop: 15,
    marginHorizontal: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "gainsboro",
    alignItems: "center",
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: width / 2,
    height: width / 2,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: "center",
  },
  text: {
    color: "#FFF",
    marginLeft: 5,
    marginVertical: 2,
  },
});

// get data  from  store

const mapStateToProps = ({ user: { isLoggedIn, userName } }) => {
  return {
    isLoggedIn,
    userName,
  };
};

// to connect in props
export default connect(mapStateToProps)(Articles);
