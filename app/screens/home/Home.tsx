import React, { useState, useEffect } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export function Home(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>토크</Text>
      </View>
      <View style={styles.contentsBox}>
        <ScrollView pagingEnabled contentContainerStyle={styles.weather}>
          <View style={styles.day}>
            <Text style={styles.temp}>닉네임</Text>
            <Text style={styles.description}>심심해 놀아줘</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temp}>닉네임</Text>
            <Text style={styles.description}>심심해 놀아줘</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temp}>닉네임</Text>
            <Text style={styles.description}>심심해 놀아줘</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temp}>닉네임</Text>
            <Text style={styles.description}>심심해 놀아줘</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temp}>닉네임</Text>
            <Text style={styles.description}>심심해 놀아줘</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temp}>닉네임</Text>
            <Text style={styles.description}>심심해 놀아줘</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temp}>닉네임</Text>
            <Text style={styles.description}>심심해 놀아줘</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temp}>닉네임</Text>
            <Text style={styles.description}>심심해 놀아줘</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temp}>닉네임</Text>
            <Text style={styles.description}>심심해 놀아줘</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temp}>닉네임</Text>
            <Text style={styles.description}>심심해 놀아줘</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7000FF",
  },
  cityName: {
    color: "black",
    fontSize: 40,
    fontWeight: "500",
  },
  contentsBox: {
    flex: 10,
  },
  weather: {},
  day: {
    height: SCREEN_WIDTH / 5,
  },
  temp: {
    fontSize: 30,
  },
  description: {
    fontSize: 20,
  },
});
