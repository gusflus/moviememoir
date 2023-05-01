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
            size={33}
            color={colors.primary}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{props.title}</Text>
      </View>
    );
  }
  return (
    <View style={styles.headerNoButton}>
      <Text
        style={[
          styles.title,
          {
            marginLeft: 30,
          },
        ]}
      >
        {props.title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 15,
    marginTop: "15%",
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    marginTop: "15%",
    fontSize: 27,
    fontWeight: "bold",
    color: colors.primary,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: colors.dark,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.33,
    elevation: 4,
    paddingBottom: 20,
  },
  headerNoButton: {
    width: "100%",
    backgroundColor: colors.dark,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.33,
    elevation: 4,
    paddingBottom: 20,
  },
});
