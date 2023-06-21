# Crypto Live Prices

This project is a demonstration on using websockets in React Native to actively update the state.

## Get Started

Run the following commands to build locally for the demonstration:

    npm i
    cd ios && pod install && cd ..
    yarn ios

## To Add a Currency

1. Add a currency to CurrencyTypes enumerator in types.tsx
2. Add a image uri to the library in images.tsx
3. The project will take care of everything else! Currently this project only supports adding currencies that are purchaseable on Coinbase.