import React, {useReducer} from 'react';



import  PedidosReducer  from "./pedidosReducer";
import  PedidosContext  from "./pedidosContext";

import {SELECCIONAR_PRODUCTO} from '../../types';

const PedidoState = props => {
    
   
    // Crear state inicial
    const initialState = {
        pedido: [],
        platillo: null
    }

    //usereducer con dispatch
    const [state, dispatch] = useReducer(PedidosReducer, initialState);
    
    //selecciona el producto que el usuario desea ordenar
    const seleccionarPlatillo = platillo => {

        
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: platillo
        })
    }

    return(
        <PedidosContext.Provider
            value={{
                pedido: state.pedido,
                platillo: state.platillo,
                seleccionarPlatillo
            }}
        >
            {props.children}
        </PedidosContext.Provider>
    )
}

export default PedidoState;