import React, {useReducer} from 'react';



import  PedidosReducer  from "./pedidosReducer";
import  PedidosContext  from "./pedidosContext";

const PedidoState = props => {
    
   
    // Crear state inicial
    const initialState = {
        pedido: []
    }

    //usereducer con dispatch
    const [state, dispatch] = useReducer(PedidosReducer, initialState);
    
    return(
        <PedidosContext.Provider
            value={{
                pedido: state.pedido,
               
            }}
        >
            {props.children}
        </PedidosContext.Provider>
    )
}

export default PedidoState;