import React from "react";
import { Image, View, StyleSheet } from "react-native";
import { GradationProfile } from "@/components/common/GradationProfile";

interface UserProfileProps {
  profileImage: string | null;
  isOnline: boolean;
  size?: "small" | "medium" | "large";
}

const UserProfile: React.FC<UserProfileProps> = ({ profileImage, isOnline, size = "medium" }) => {
  const sizes = {
    small: { container: 40, inner: 36, image: 34, online: 10, onlineIndicator: 8 },
    medium: { container: 52, inner: 46, image: 44, online: 15, onlineIndicator: 10 },
    large: { container: 80, inner: 70, image: 65, online: 24, onlineIndicator: 17 },
  };

  const currentSize = sizes[size];

  return (
    <View>
      <GradationProfile>
        <View style={[styles.feedProfile, { width: currentSize.container, height: currentSize.container }]}>
          <GradationProfile>
            <View style={[styles.feedProfileInner, { width: currentSize.inner, height: currentSize.inner }]}>
              <Image
                source={profileImage ? { uri: profileImage } : require("@assets/images/user_default_image.png")}
                style={[styles.feedProfileImage, { width: currentSize.image, height: currentSize.image }]}
                alt="프로필 이미지"
              />
            </View>
          </GradationProfile>
        </View>
      </GradationProfile>
      <View style={[styles.isOnline, { width: currentSize.online, height: currentSize.online }]}>
        {isOnline ? (
          <View style={[styles.isOnlineYes, { width: currentSize.onlineIndicator, height: currentSize.onlineIndicator }]} />
        ) : (
          <View style={[styles.isOnlineNo, { width: currentSize.onlineIndicator, height: currentSize.onlineIndicator }]} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  feedProfile: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  feedProfileInner: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 100,
  },
  feedProfileImage: {
    borderRadius: 100,
  },
  isOnline: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "3%",
    right: "3%",
    backgroundColor: "#AB94F7",
    borderRadius: 100,
  },
  isOnlineYes: {
    borderRadius: 100,
    backgroundColor: "#00CF3A",
  },
  isOnlineNo: {
    borderRadius: 100,
    backgroundColor: "#fff",
  },
});

export default UserProfile;