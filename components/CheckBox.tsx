import { Pressable, StyleSheet, View } from "react-native";

interface CheckboxProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  size?: number;
}

export default function Checkbox({ value, onValueChange, size = 22 }: CheckboxProps) {
  return (
    <Pressable
      onPress={() => onValueChange(!value)}
      style={({ pressed }) => [
        {
          width: size,
          height: size,
        },
        styles.box,
        value && styles.checked,
        pressed && { opacity: 0.8 },
      ]}
    >
      {value && <View style={[{height: size/2, width: (size/2)/2 + 1}, styles.checkmark]} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    // width: 22,
    // height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#a1a1a1",
    alignItems: "center",
    justifyContent: "center",
  },
  checked: {
    backgroundColor: "#ffd33d",
    borderColor: "#ffd33d",
  },
  checkmark: {
    // width: 6,
    // height: 11,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#25292e",
    transform: [{ rotate: "45deg" }, { translateY: -1 }],
  },
});