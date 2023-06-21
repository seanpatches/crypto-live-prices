import React, { FC } from 'react';
import { View, Image, Text } from 'react-native';
import { getImage } from '../../../helpers/images';
import { PriceScreenStyles as styles } from '../../../styles/styles';

type RowProps = {
  price: number,
  currency: string,
}

const Row: FC<RowProps> = ({
  price,
  currency
}) => {
  const image = getImage(currency);
  return (
    <View  style={styles.row}>
      <Image source={{ uri: image}} style={styles.rowImage} />
      <Text style={styles.nameText}>{currency}:</Text>
      <Text style={styles.priceText}>${price}</Text>
    </View>
  )
}

export default Row;