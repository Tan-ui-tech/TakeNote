import { View, StyleSheet } from 'react-native';

export default function InputField(props: { children: JSX.Element[] }) {
  return <View style={styles.default}>{props.children}</View>;
}

const styles = StyleSheet.create({
  default: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
  },
});
