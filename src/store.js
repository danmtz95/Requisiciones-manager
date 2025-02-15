import { createStore, combineReducers } from 'redux';
import authenticationReducer from './common/features/Authentication/authenticationReducer';
import clientesReducer from './common/features/Clientes/clientesReducer';
import requisiciones from './common/features/Requisiciones/requisicionesReducer';
import usuarios from './common/features/Usuarios/UsuariosReducer';
import proveedores from './common/features/Proveedores/proveedoresReducer';
import reportes from './common/features/Reportes/reportesReducer';

export default function configureStore(initialState) {
  const store = createStore(
    combineReducers({
      authenticationReducer,
      clientes: clientesReducer,
      requisiciones,
      usuarios,
      proveedores,
      reportes
    }),
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
}
