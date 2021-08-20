import React, {Fragment, useContext, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native'; 

import {
  Container,
  Separator,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Body,
} from 'native-base';
import globalStyles from '../styles/global';

import FirebaseContext from '../context/firebase/firebaseContext';
import PedidosContext from '../context/pedidos/pedidosContext';

const Menu = () => {
  //context de firebase
  const {menu, obtenerProductos} = useContext(FirebaseContext);
  const {seleccionarPlatillo} = useContext(PedidosContext);
  
  //const para redireccionar
  const navigation = useNavigation();

  useEffect(() => {
    obtenerProductos();
  }, []);

  const mostrarHeading = (categoria, i) => {
    if (i > 0) {
      const categoriaAnterior = menu[i - 1].categoria;
      if (categoriaAnterior !== categoria) {
        return (
          <Separator style={styles.separator}>
            <Text style={styles.separatorTexto}>{categoria}</Text>
          </Separator>
        );
      }
    } else {
      return (
        <Separator style={styles.separator}>
          <Text style={styles.separatorTexto}>{categoria}</Text>
        </Separator>
      );
    }
  };

  return (
    <Container style={globalStyles.contenedor}>
      <Content style={{backgroundColor: '#FFF'}}>
        <List>
          {menu.map((platillo, i) => {
            //console.log(platillo);
            const {imagen, nombre, descripcion, categoria, precio, id} =
              platillo;
            return (
              <Fragment key={id}>
                {mostrarHeading(categoria, i)}
                <ListItem
                  onPress={()=>{
                    
                    const { existencia , ...platillo2 } = platillo;

                    seleccionarPlatillo(platillo2);

                    navigation.navigate('DetallePlatillo')

                  }}
                >
                  
                  <Thumbnail source={{uri: imagen}} />
                  <Body>
                    <Text>{nombre}</Text>
                    <Text note numberOfLines={2}>
                      {descripcion}
                    </Text>
                    <Text>Precio: GS. {precio}</Text>
                  </Body>
                </ListItem>
              </Fragment>
            );
          })}
        </List>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#000',
  },
  separatorTexto: {
    color: '#FFDA00',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
});

export default Menu;
