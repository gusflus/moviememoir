import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors } from "../components/Colors";

export default function Header(props) {
  const navigation = useNavigation();

  if (props.back) {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            size={30}
            color={colors.primary}
          />
        </TouchableOpacity>
        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.title}>
          {props.title}
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.headerNoButton}>
      <Text adjustsFontSizeToFit numberOfLines={1} style={styles.title}>
        {props.title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    left: 15,
    top: 60,
    margin: 10,
    marginRight: 20,
    flexDirection: "row",
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    position: "absolute",
    left: 66,
    top: 71,
    fontSize: 22,
    marginRight: 15,
    fontWeight: "bold",
    color: colors.primary,
    justifyContent: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    width: "100%",
    height: 130,
    backgroundColor: colors.dark,
  },
  headerNoButton: {
    width: "100%",
    width: "100%",
    height: 130,
    backgroundColor: colors.dark,
  },
});
