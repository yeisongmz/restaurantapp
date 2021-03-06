import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignContent: 'center'
  },
  contenido: {
    marginHorizontal: '2.5%',
    alignContent: 'center',
    flex: 1
    
  },
  boton: {
    backgroundColor: '#FFDA00',
  },
  botonTexto: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#000',
    fontSize: 15,
  },
  titulo: {
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
    fontSize: 30,
  },
  imagen: {
    height: 300,
    width: '100%',
  },
  precio: {
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 24,
  },
  cantidad: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 20,
  }
});

export default globalStyles;
