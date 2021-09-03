import React, {useReducer} from 'react';

import PedidosReducer from './pedidosReducer';
import PedidosContext from './pedidosContext';

import {
  SELECCIONAR_PRODUCTO,
  CONFIRMAR_ORDENAR_PLATILLO,
  MOSTRAR_RESUMEN,
  ELIMINAR_PRODUCTO,
  PEDIDO_ORDENADO
} from '../../types';

const PedidoState = props => {
  // Crear state inicial
  const initialState = {
    pedido: [],
    platillo: null,
    total: 0,
    idPedido: ''
  };

  //usereducer con dispatch
  const [state, dispatch] = useReducer(PedidosReducer, initialState);

  //selecciona el producto que el usuario desea ordenar
  const seleccionarPlatillo = platillo => {
    dispatch({
      type: SELECCIONAR_PRODUCTO,
      payload: platillo,
    });
  };

  const guardarPedido = pedido => {
    dispatch({
      type: CONFIRMAR_ORDENAR_PLATILLO,
      payload: pedido,
    });
  };

  //muestra el total a pagar en el resumen
  const mostrarResumen = total => {
    dispatch({
      type: MOSTRAR_RESUMEN,
      payload: total
    });
  };

  //elimina un articulo del carrito
  const eliminarProducto = id =>{
    dispatch({
      type: ELIMINAR_PRODUCTO,
      payload: id
    })
  }

  const pedidoRealizado = id =>{
    dispatch({
      type: PEDIDO_ORDENADO,
      payload: id
    })
  }

  return (
    <PedidosContext.Provider
      value={{
        pedido: state.pedido,
        platillo: state.platillo,
        total: state.total,
        idPedido: state.idPedido,
        seleccionarPlatillo,
        guardarPedido,
        mostrarResumen,
        eliminarProducto,
        pedidoRealizado,
        
      }}>
      {props.children}
    </PedidosContext.Provider>
  );
};

export default PedidoState;
