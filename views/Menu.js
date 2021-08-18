import React, {useContext, useEffect} from 'react';
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
  Left,
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
            console.log(platillo);
          })}
        </List>
      </Content>
    </Container>
  );
};

export default Menu;
