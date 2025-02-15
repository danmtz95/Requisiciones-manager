import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { Table, Grid, Button, Popup } from 'semantic-ui-react';
import styles from './tabla.module.css';
import moment from 'moment';

const prioridad = (horaDeCorreo, status) => {
  var horaActual = moment();
  var horaCorreo = moment(horaDeCorreo);
  var positive = { positive: styles.colorPositive };
  var negative = { negative: styles.colorWarning };
  var warning = { warning: styles.colorNegative };
  var tiempoTranscurrido = horaActual.diff(horaCorreo, 'hours', 'minutes');
  if (tiempoTranscurrido <= 24) {
    return positive.positive;
  } else {
    if (tiempoTranscurrido <= 48) {
      return negative.negative;
    } else {
      return warning.warning;
    }
  }
};

const TablaRequisiciones = props => {
  const [state, setState] = useState({
    column: null,
    data: props.data,
    direction: null
  });
  const { column, data, direction } = state;

  useEffect(() => {
    setState({ ...state, data: props.data });
    return () => {};
  }, [props]);

  const handleSort = clickedColumn => () => {
    if (column !== clickedColumn) {
      setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending'
      });
      return;
    }

    setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending'
    });
  };
  return (
    <Table sortable celled striped compact>
      <Table.Header>
        <Table.Row textAlign={'center'}>
          <Table.HeaderCell
            sorted={column === 'id' ? direction : null}
            onClick={handleSort('id')}
          >
            ID
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'fecha_correo' ? direction : null}
            onClick={handleSort('fecha_correo')}
          >
            Tiempo transcurrido
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'tiempo_transcurrido' ? direction : null}
            onClick={handleSort('tiempo_transcurrido')}
          >
            proveedores
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'cliente' ? direction : null}
            onClick={handleSort('cliente')}
          >
            Vendedor
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'tipo' ? direction : null}
            onClick={handleSort('tipo')}
          >
            Nota
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'folio' ? direction : null}
            onClick={handleSort('folio')}
          >
            Folio
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'monto' ? direction : null}
            onClick={handleSort('monto')}
          >
            Monto
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'estado' ? direction : null}
            onClick={handleSort('estado')}
          >
            Estado
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'cotizaciones' ? direction : null}
            onClick={handleSort('cotizaciones')}
          >
            Cotizaciones
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {_.map(
          data,
          ({
            id,
            fecha_correo,
            tipo,
            estatus,
            cotizacion,
            cotizacion_compras,
            nota,
            usuario_creacion
          }) => (
            <Table.Row
              className={prioridad(fecha_correo, estatus.concepto)}
              onClick={e => props.onSelectRequisicion(id)}
              key={id}
            >
              <Table.Cell block textAlign={'center'}>
                {id}
              </Table.Cell>
              <Table.Cell>{fecha_correo.fromNow()}</Table.Cell>
              <Table.Cell>
                {cotizacion ? cotizacion.orden_proveedor : 'Sin proveedor'}
              </Table.Cell>

              <Table.Cell>{usuario_creacion.first_name}</Table.Cell>
              <Popup
                content={`${'Tipo:'} ${tipo.concepto} ${'Nota:'} ${nota}`}
                trigger={
                  <Table.Cell className={styles.visibility}>{nota}</Table.Cell>
                }
              ></Popup>
              <Table.Cell>
                {cotizacion ? cotizacion.folio : 'Sin folio'}
              </Table.Cell>
              <Table.Cell>
                {cotizacion ? cotizacion.monto : 'Sin cotización'}
              </Table.Cell>
              <Table.Cell>{estatus.concepto}</Table.Cell>

              <Table.Cell textAlign={'center'}>
                <Grid.Row>
                  {cotizacion_compras ? (
                    <Button
                      circular
                      color="green"
                      icon="folder"
                      onClick={e => {
                        e.persist();
                        props.onVerCotizacionComprasClick(id);
                      }}
                    />
                  ) : (
                    <Button
                      circular
                      color="orange"
                      icon="file alternate outline"
                      onClick={e => {
                        e.persist();
                        props.onAgregarCotizacionComprasClick(id);
                      }}
                    />
                  )}
                  <Button
                    circular
                    color="orange"
                    icon="clipboard check"
                    onClick={e => {
                      e.persist();
                      props.onAgregarReporteClick(id);
                    }}
                  />
                </Grid.Row>
              </Table.Cell>
            </Table.Row>
          )
        )}
      </Table.Body>
    </Table>
  );
};

export default TablaRequisiciones;
