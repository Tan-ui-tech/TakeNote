import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function InputIcon(props: {
  iconType: 'username' | 'password';
}) {
  return (
    <View style={styles.default}>
      {props.iconType === 'username' ? <UsernameSvg /> : <PasswordSvg />}
    </View>
  );
}

function UsernameSvg() {
  return (
    <Svg style={styles.defaultSvg} viewBox="0 -960 960 960" fill="#5985E1">
      <Path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
    </Svg>
  );
}

function PasswordSvg() {
  return (
    <Svg style={styles.defaultSvg} viewBox="0 -960 960 960" fill="#5985E1">
      <Path d="M280-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 120q-100 0-170-70T40-480q0-100 70-170t170-70q81 0 141.5 46T506-560h335l79 79-140 160-100-79-80 80-80-80h-14q-25 72-87 116t-139 44Z" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  default: {},

  defaultSvg: {
    height: 32,
    width: 32,
  },
});
