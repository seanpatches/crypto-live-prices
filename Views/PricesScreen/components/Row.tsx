import React, { FC } from 'react';
import { View, Image, Text } from 'react-native';
import { defaultImage, images } from '../../../helpers/images';
import { CurrencyTypes } from '../../../types';
import { PriceScreenStyles as styles } from '../../../styles/styles';

type RowProps = {
  price: number,
  currency: string,
}

const Row: FC<RowProps> = ({
  price,
  currency
}) => {
  return (
    <View  style={styles.row}>
      <Image source={{ uri: images[currency as CurrencyTypes]} || defaultImage} style={styles.rowImage} />
      <Text style={styles.nameText}>{currency}:</Text>
      <Text style={styles.priceText}>${price}</Text>
    </View>
  )
}

export default Row;