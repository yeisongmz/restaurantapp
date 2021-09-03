import React, {useState, useContext, useEffect} from 'react';
import {Alert} from 'react-native';
import {
  Container,
  Content,
  Form,
  Icon,
  Grid,
  Col,
  Button,
  Text,
  Input,
  Footer,
  FooterTab,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';
import PedidosContext from '../context/pedidos/pedidosContext';

const FormularioPlatillo = () => {
  //state para cantidades
  const [cantidad, guardarCantidad] = useState(1);
  const [total, guardarTotal] = useState(0);

  // En cuanto el componente carga, calcular la cantidad a pagar
  useEffect(() => {
    cacularTotal();
    //console.log(cantidad);
  }, [cantidad]);

  //context
  const {platillo, guardarPedido} = useContext(PedidosContext);
  const {precio} = platillo;

  const navigation = useNavigation();

  //calcula el total del platillo por su cantidad
  const cacularTotal = () => {
    const totalPagar = precio * cantidad;
    guardarTotal(totalPagar);
  };

  //incrementar en uno
  const incrementarUno = () => {
    const nuevaCantidad = parseInt(cantidad) + 1;
    guardarCantidad(nuevaCantidad);
  };

  const decrementarUno = () => {
    if (cantidad > 1) {
      const nuevaCantidad = parseInt(cantidad) - 1;
      guardarCantidad(nuevaCantidad);
    }
  };

  //confirmar orden
  const confirmarOrden = () => {
    const pedido = {
      ...platillo,
      cantidad,
      total,
    };
    guardarPedido(pedido);
    // Navegar hacia el resumen
    navigation.navigate('ResumenPedido');
  };

  return (
    <Container>
      <Content>
        <Form>
          <Text style={globalStyles.titulo}>Cantidad</Text>
          <Grid>
            <Col>
              <Button
                props
                dark
                style={{height: 80, justifyContent: 'center'}}
                onPress={() => decrementarUno()}>
                <Icon style={{fontSize: 40}} name="remove" />
              </Button>
            </Col>
            <Col>
              <Input
                style={{textAlign: 'center', fontSize: 30}}
                value={cantidad.toString()}
                keyboardType="numeric"
                onChangeText={cantidad => {
                  guardarCantidad(cantidad);
                  cacularTotal();
                }}
              />
            </Col>
            <Col>
              <Button
                props
                dark
                style={{height: 80, justifyContent: 'center'}}
                onPress={() => incrementarUno()}>
                <Icon style={{fontSize: 40}} name="add" />
              </Button>
            </Col>
          </Grid>
          <Text style={globalStyles.cantidad}>Subtotal: Gs. {total}</Text>
        </Form>
      </Content>
      <Footer>
        <FooterTab>
          <Button
            style={globalStyles.boton}
            onPress={() => {
              confirmarOrden();
            }}>
            <Text style={globalStyles.botonTexto}>Agregar al Pedido</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default FormularioPlatillo;
