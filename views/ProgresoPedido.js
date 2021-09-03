import React, {useContext, useEffect, useState, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Text} from 'native-base';

import firebase from '../firebase';

import {useNavigation} from '@react-navigation/native';

import globalStyles from '../styles/global';

import PedidosContext from '../context/pedidos/pedidosContext';
import Countdown from '../components/ui/Countdown';

const ProgresoPedido = () => {
  const navigation = useNavigation();

  // context de pedido
  const {idPedido} = useContext(PedidosContext);
  const [tiempo, guardarTiempo] = useState(0);

  useEffect(() => {
    const obtenerProducto = () => {
      const tiempoEntrega = firebase.db
        .collection('ordenes')
        .doc(idPedido)
        .onSnapshot(function (doc) {
          guardarTiempo(doc.data().tiempoEntrega);
        });
    };
    obtenerProducto();
  }, []);

  return (
    <Container style={globalStyles.contenedor}>
      <View style={[globalStyles.contenido, {marginTop: 50}]}>
        {tiempo === 0 && (
          <>
            <Text style={{textAlign: 'center'}}>Hemos recibido tu orden</Text>
            <Text style={{textAlign: 'center'}}>
              Estamos calculando el tiempo de entrega
            </Text>
          </>
        )}

        {tiempo > 0 && (
          <>
            <Text style={{textAlign: 'center'}}>Su orden estará lista en:</Text>
            <Text style={styles.tiempo}>
              <Countdown tiempo={tiempo} />
            </Text>
          </>
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  tiempo: {
    marginBottom: 20,
    fontSize: 30,
    textAlign: 'center',
    marginTop: 30,
  },
});

export default ProgresoPedido;
