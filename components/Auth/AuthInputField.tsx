import { StyleSheet, TextInput, View } from 'react-native';
import InputIcon from './AuthInpuIcon';
import InputField from './InputField';

export default function AuthInputField(props: {
  type: 'username' | 'password';
  inputOnChange: (field: string) => void;
}) {
  return (
    <View style={styles.default}>
      {props.type === 'username' ? (
        <InputField>
          <InputIcon iconType="username" />
          <UsernameInput updateUsername={props.inputOnChange} />
        </InputField>
      ) : (
        <InputField>
          <InputIcon iconType="password" />
          <PasswordInput updatePassword={props.inputOnChange} />
        </InputField>
      )}
    </View>
  );
}

function PasswordInput(props: { updatePassword: (Password: string) => void }) {
  return (
    <TextInput
      secureTextEntry
      placeholder="Password"
      placeholderTextColor="#0a0a0a"
      onChange={(e) => props.updatePassword(e.nativeEvent.text)}
      style={{ width: '100%' }}
    />
  );
}

function UsernameInput(props: { updateUsername: (username: string) => void }) {
  return (
    <TextInput
      placeholder="Username"
      placeholderTextColor="#0a0a0a"
      onChange={(e) => props.updateUsername(e.nativeEvent.text)}
      style={{ width: '100%' }}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    padding: 12,
    width: '80%',
    borderColor: '#CCC',
    backgroundColor: '#E0E0E0',
    marginBottom: 12,
  },
});
