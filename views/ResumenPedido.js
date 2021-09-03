import React, {useContext, useEffect} from 'react';
import {StyleSheet, Alert} from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  H1,
  Footer,
  FooterTab,
  Button,
} from 'native-base';

import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';
import firebase from '../firebase';

import PedidosContext from '../context/pedidos/pedidosContext';

const ResumenPedido = () => {
  const navigation = useNavigation();

  // context de pedido
  const {pedidoRealizado, pedido, total, mostrarResumen, eliminarProducto} =
    useContext(PedidosContext);

  useEffect(() => {
    calcularTotal();
  }, [pedido]);

  const calcularTotal = () => {
    let nuevoTotal = 0;
    nuevoTotal = pedido.reduce(
      (nuevoTotal, articulo) => nuevoTotal + articulo.total,
      0,
    );

    mostrarResumen(nuevoTotal);
  };

  //Redirecciona a prograso pedido
  const progresoPedido = () => {
    Alert.alert(
      'Revisa tu pedido',
      'Una vez que realizas tu pedido no podras cambiarlos',
      [
        {
          text: 'Confirmar',
          onPress: async () => {
            // crear objeto para insertar en firebase
            const pedidoObj = {
              tiempoEntrega: 0,
              completado: false,
              total: Number(total),
              orden: pedido, //array
              creado: Date.now(),
            };

            // insertar en firebase
            try {
                const pedido = await firebase.db.collection('ordenes').add(pedidoObj)
                pedidoRealizado(pedido.id);
            } catch (error) {
                console.log(error)
            }
            navigation.navigate('ProgresoPedido');
          },
        },
        {
          text: 'Revisar',
          style: 'cancel',
        },
      ],
    );
  };

  const confirmarEliminacion = id => {
    Alert.alert(
      ' ¿Deseas eliminar? ',
      'Una vez eliminado no podras cambiarlos',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            //eliminar del state
            eliminarProducto(id);
            //navigation.navigate("ProgresoPedido");
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <Container style={globalStyles.contenedor}>
      <Content style={globalStyles.contenido}>
        <H1 style={globalStyles.titulo}> Resumen del Pedido</H1>
        {pedido.map((platillo, i) => {
          const {cantidad, nombre, imagen, id, precio} = platillo;
          return (
            <List key={id + i}>
              <ListItem>
                <Left>
                  <Thumbnail large square source={{uri: imagen}}></Thumbnail>
                </Left>
                <Body>
                  <Text>{nombre}</Text>
                  <Text>Cantidad: {cantidad}</Text>
                  <Text>Precio: Gs. {precio}</Text>
                  <Button
                    onPress={() => confirmarEliminacion(id)}
                    full
                    danger
                    style={{marginTop: 20}}>
                    <Text style={[globalStyles.botonTexto, {color: '#FFF'}]}>
                      Eliminar
                    </Text>
                  </Button>
                </Body>
              </ListItem>
            </List>
          );
        })}
        <Text style={globalStyles.cantidad}>Total a Pagar: Gs. {total} </Text>
        <Button
          style={{marginTop: 30}}
          onPress={() => {
            navigation.navigate('Menu');
          }}
          full
          dark>
          <Text style={[globalStyles.botonTexto, {color: '#FFF'}]}>
            Seguir Pidiendo
          </Text>
        </Button>
      </Content>
      <Footer>
        <FooterTab>
          <Button
            style={globalStyles.boton}
            onPress={() => {
              progresoPedido();
            }}
            full>
            <Text style={globalStyles.botonTexto}>Ordenar Pedido</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default ResumenPedido;
