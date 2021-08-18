import React, {Fragment, useContext, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import FirebaseContext from '../context/firebase/firebaseContext';
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

const Menu = () => {
  //context de firebase
  const {menu, obtenerProductos} = useContext(FirebaseContext);

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <Container style={globalStyles.contenedor}>
      <Content style={{backgroundColor: '#FFF'}}>
        <List>
          {menu.map(platillo => {
            //console.log(platillo);
            const {imagen, nombre, descripcion, categoria, precio, id} = platillo;
            return(
              <Fragment key={id}>
                <ListItem

                >
                  <Thumbnail source={{ uri: imagen }}/>
                  <Body>
                    <Text>{nombre}</Text>
                    <Text
                      note
                      numberOfLines={2}
                    >{descripcion}</Text>
                    <Text>Precio: GS. {precio}</Text>

                  </Body>
                </ListItem>
              </Fragment>
            )
          })}
        </List>
      </Content>
    </Container>
  );
};

export default Menu;
