import React, { useEffect, useState } from 'react';
import MainContainer from '../../components/MainContainer';
import { Grid } from 'semantic-ui-react';
import AgregarUsuariosModal from './AgregarUsuariosModal';
import { Usuarios } from '../../../agent';
import { useDispatch, useSelector } from 'react-redux';
import TablaUsuarios from './TablaUsuarios';

const UsuariosContainer = props => {
  const dispatch = useDispatch();
  const [grupos, setGrupos] = useState([]);
  useEffect(() => {
    Usuarios.all().then(r => {
      dispatch({ type: 'CARGAR_USUARIOS_SUCCESS', payload: r.data });
    });
    Usuarios.groups().then(r => {
      setGrupos(r.data);
    });
  }, [dispatch]);
  const usuarios = useSelector(store =>
    store.usuarios.usuarios.map(usuario => ({ ...usuario }))
  );
  return (
    <MainContainer
      title="Usuarios"
      optionsButtons={
        <>
          <AgregarUsuariosModal
            grupos={grupos}
            onSubmit={usuario =>
              Usuarios.create(usuario)
                .then(r => Usuarios.all())
                .then(r =>
                  dispatch({ type: 'CARGAR_USUARIOS_SUCCESS', payload: r.data })
                )
            }
          ></AgregarUsuariosModal>
        </>
      }
    >
      <Grid.Row>
        <Grid.Column>
          <TablaUsuarios data={usuarios}></TablaUsuarios>
        </Grid.Column>
      </Grid.Row>
    </MainContainer>
  );
};

UsuariosContainer.propTypes = {};

export default UsuariosContainer;
