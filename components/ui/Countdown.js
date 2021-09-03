import React, {useState, useEffect, } from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'native-base';
const Countdown = (props) => {
  const {tiempo} = props;




  return (
    <Text style={styles.tiempo}>
      {tiempo}
    </Text>
  );
};

const styles = StyleSheet.create({
  tiempo: {
    marginBottom: 20,
    fontSize: 60,
    textAlign: 'center',
    marginTop: 30,
  },
});

export default Countdown;
