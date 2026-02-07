import { GoogleSignin, GoogleSigninButton, isSuccessResponse } from "@react-native-google-signin/google-signin";
import { StyleSheet } from "react-native";

export default function GoogleAccess() {
  const handleSignIn = async () => {
    try {
      GoogleSignin.configure();
      await GoogleSignin.hasPlayServices();
      const signResult = await GoogleSignin.signIn();
      if (isSuccessResponse(signResult)) {
        console.log(signResult?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <GoogleSigninButton
      style={styles.container}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={handleSignIn}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#31363b",
    padding: 12,
    borderWidth: 1,
    borderColor: "#a1a1a1",
    borderRadius: 10,
    gap: 8
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 'bold'
  },
})