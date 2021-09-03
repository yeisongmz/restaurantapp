import React, {useReducer} from 'react';

import firebase from '../../firebase';

import  FirebaseReducer  from "./firebaseReducer";
import  FirebaseContext  from "./firebaseContext";

import {OBTENER_PRODUCTOS_EXITO} from '../../types';
import _ from 'lodash';
const FirebaseState = props => {
    
    //console.log(firebase);

    // Crear state inicial
    const initialState = {
        menu: [],
    }

    //usereducer con dispatch
    const [state, dispatch] = useReducer(FirebaseReducer, initialState);
    
    //Funcion que se ejecuta para traer los productos
    const obtenerProductos = () => {
        //console.log('dentro de menú');
        
        //consulta firebase
            firebase.db
            .collection('productos')
            .where('existencia', '==', true) // treae solo existencia
            .onSnapshot(manejarSnapshot);
        
        function manejarSnapshot(snapshot){
                let platillos = snapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                });
                //console.log(platillos);

                // Ordernar por categoria con lodash
                platillos = _.sortBy(platillos, 'categoria');
                //console.log(platillos);

                dispatch({
                    type: OBTENER_PRODUCTOS_EXITO,
                    payload: platillos
                });

            }
    }

    
    

    return(
        <FirebaseContext.Provider
            value={{
                menu: state.menu,
                firebase,
                obtenerProductos,
                
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseState;