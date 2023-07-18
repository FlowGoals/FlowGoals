import { StyleSheet } from 'react-native';
import { colors } from './Colors';

const styles = StyleSheet.create({
// edit and create goal screens
  inputBox: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.columbiaBlue,
  },
  inlineInputBox: {
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: colors.columbiaBlue,
  },
  dropdown: {
    padding: 0,
    borderRadius: 10,
    marginHorizontal: 5,
    width: '30%',
    borderWidth: 0,
    backgroundColor: colors.columbiaBlue,
  },
  //   settings, profile, and FAQ screens
  navSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    padding: 10,
    margin: 1,
    backgroundColor: colors.columbiaBlue,
  },
  //   signup and login screens
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    rowGap: 10,
  },
  inputContainer: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
  },
  navText: {
    color: colors.blue1dark,
    fontSize: 16,
  },
  //   goal screen
  previewContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.white,
    paddingTop: 10,
  },
  preview: {
    flex: 1,
    flexDirection: 'row',
    height: 100,
    borderRadius: 10,
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.columbiaBlue,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  //   goalSwipe component
  leftAction: {
    flex: 1,
    backgroundColor: colors.green1,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    backgroundColor: 'transparent',
    padding: 5,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
  },
  modalView: {
    position: 'absolute',
    top: '20%',
    width: '70%',
    alignSelf: 'center',
    rowGap: 12,
    backgroundColor: colors.white,
    borderRadius: 20,
    borderColor: colors.blue2dark,
    borderWidth: 5,
    padding: '5%',
  },
});

export default styles;
