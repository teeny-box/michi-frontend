import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, GestureResponderEvent } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface RandomChatBannerProps {
  onPress: (event: GestureResponderEvent) => void;
}

const RandomChatBanner: React.FC<RandomChatBannerProps> = ({ onPress }) => (
  <TouchableOpacity style={styles.homeHeader} onPress={onPress}>
    <View style={styles.randomChatBtn}>
      <Text style={styles.randomChatText}>실시간</Text>
      <Text style={styles.randomChatText}>
        랜덤 채팅 START
        <Icon name="doubleright" size={28} />
      </Text>
    </View>
    <Image source={require('@assets/images/logo_home.png')} style={styles.homeLogo} />
  </TouchableOpacity>
);

export default RandomChatBanner;

const styles = StyleSheet.create({
  homeHeader: {
    flex: 2,
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-end",
    backgroundColor: "#7000FF",
  },
  randomChatBtn: {
    flex: 1,
    justifyContent: "flex-end",
    marginVertical: "3%",
    marginLeft: "5%",
    backgroundColor: "#7000FF",
  },
  randomChatText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "600",
  },
  homeLogo: {
    width: "20%",
    height: "75%",
    marginRight: "5%",
    marginBottom: "1%",
  },
});