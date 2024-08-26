import { StyleSheet } from 'react-native';

export const stylez = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: '#E0E0E0',
  },
  button: {
    width: '80%',
    backgroundColor: '#A1CEDC',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#A1CEDC',
    fontSize: 14,
  },
});

export
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,

    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    tags:{
      fontSize: 24,
      fontWeight: 'bold',
    },
    inputBox: {
      width: '100%',
      height: 40,
      borderRadius: 8,
      paddingHorizontal: 8,
      marginBottom: 16,
    },
    tagBox: {
      width: '100%',
      height: 80,
      borderRadius: 8,
      paddingHorizontal: 8,
      marginBottom: 16,
    },
    searchBox: {
      width: '100%',
      height: 40,
      borderRadius: 8,
      paddingHorizontal: 8,
      marginBottom: 16,
    },
    list: {
      paddingBottom: 16,
    },
    noteCard: {
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      marginBottom: 16,
    },
    addButton: {
      position: 'absolute',
      bottom: 16,
      right: 16,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#ff5252',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 8,
      paddingBottom: 5,
      marginBottom: 25
    },
    addButtonText: {
      fontSize: 36,
      color: '#FFF',
    },
    // Light mode styles
    lightBackground: {
      backgroundColor: '#FFF',
    },
    lightText: {
      color: '#000',
    },
    lightInput: {
      backgroundColor: '#E0E0E0',
    },
    lightCard: {
      backgroundColor: '#F0F0F0',
    },
    // Dark mode styles
    darkBackground: {
      backgroundColor: '#121212',
    },
    darkText: {
      color: '#FFF',
    },
    darkInput: {
      backgroundColor: '#2C2C2C',
    },
    darkCard: {
      backgroundColor: '#333',
    },
    deleteButton: {
      width: '100%',
      borderWidth: 1,
      position: 'relative',
      bottom: '0%',
      left: '0%',
      // marginBottom: 40,
      // transform: [{ translateX: -75 }],
      backgroundColor: 'transparent',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    deleteButtonText: {
      // position: 'absolute',
      fontSize: 24,
      color: 'red',
      textAlign: 'center',
    },
  });