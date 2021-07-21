import React, {useReducer} from 'react';

import firebase from '../../firebase';

import  FirebaseReducer  from "./firebaseReducer";
import  FirebaseContext  from "./firebaseContext";

const FirebaseState = props => {
    
    console.log(firebase);

    // Crear state inicial
    const initialState = {
        menu: []
    }

    //usereducer con dispatch
    const [state, dispatch] = useReducer(FirebaseReducer, initialState);
    
    return(
        <FirebaseContext.Provider
            value={{
                menu: state.menu,
                firebase
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseState;