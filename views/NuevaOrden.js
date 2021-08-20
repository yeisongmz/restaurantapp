import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Container, Content, H1, Footer, FooterTab, Button, Text, NativeBaseProvider, Center} from 'native-base';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';

const NuevaOrden = () => {
  const navigation = useNavigation();

  return (
    <Container style={globalStyles.contenedor}>
        <Content>
          <H1 style={globalStyles.titulo}>Hola</H1>
        </Content>
        
        <Footer>
                <FooterTab>
                    <Button style={globalStyles.boton} 
                        onPress={()=>{
                            navigation.navigate('Menu')
                        }}
                    >
                        <Text style={globalStyles.botonTexto}>Nueva Orden</Text>
                    </Button>
                </FooterTab>
            </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  contenido: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default NuevaOrden;
