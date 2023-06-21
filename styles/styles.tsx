import { StyleSheet } from "react-native";
import { darkColor, lightColor } from "./colors";

export const NavigationStyles = StyleSheet.create({
  backButton: {
    marginLeft: -2,
  },
  backButtonText: {
    color: darkColor,
    fontSize: 16,
  },
})

export const HomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 42,
    color: lightColor,
    textAlign: 'center',
  },
  logo: {
    width: 300,
    height: 50,
    resizeMode: 'contain',
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
    color: darkColor,
    fontSize: 22,
    fontWeight: 'bold',
  }
});

export const PriceScreenStyles = StyleSheet.create({
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '70%',
  },
  pricesContainer: {
    flex: 1,
    backgroundColor: darkColor,
    alignItems: 'center',
    height: '100%'
  },
  pricesList: {
    width: '100%',
    height: '100%',
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
  nameText: {
    fontSize: 24,
    color: lightColor,
    width: 80,
    marginLeft: 10,
  },
  priceText: {
    paddingLeft: 5,
    width: 200,
    fontSize: 22,
    color: lightColor,
  }
});