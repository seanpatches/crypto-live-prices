import { StyleSheet } from "react-native";
import { mainBackground, lightColor } from "./colors";

export const HomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 42,
    color: lightColor,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 40,
    padding: 10,
    borderRadius: 12,
  },
  button: {
    backgroundColor: lightColor,
    borderRadius: 12,
    padding: 10,
    shadowColor: '#fff',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  buttonText: {
    color: mainBackground,
    fontSize: 22,
    fontWeight: 'bold',

    }
});

export const PriceScreenStyles = StyleSheet.create({
  pricesContainer: {
    flex: 1,
    backgroundColor: mainBackground,
    alignItems: 'center',
  },
  pricesList: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: lightColor,
  },
  rowImage: {
    width: 50,
    height: 50,
  },
  priceText: {
    paddingLeft: 20,
    width: 200,
    fontSize: 22,
    color: lightColor,
  }
});