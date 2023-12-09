import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { CONFIG } from '../config';

export const ReservaApp = () => {
    const [reservas, setReservas] = useState([]);
    const [isRango, setisRango] = useState(false);
    const getReservas = () => {
        axios.get(`${CONFIG.url}/reserva/retrieve`)
            .then(res => {
                setReservas(res.data);
            })
            .catch(error => console.log(error));
    }
    useEffect(() => {
        getReservas();
    }, [])

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <br />
                        <div className='mb-2 d-flex'>
                            <select className='form-select w-25' onChange={(e) => setisRango(e.target.value == 'range' ? true : false)}>
                                <option value="today">Hoy</option>
                                <option value="thisweek">Esta semana</option>
                                <option value="last7">Ultimos 7 dias</option>
                                <option value="thismonth">Este mes</option>
                                <option value="last30">Ultimos 30 dias</option>
                                <option value="range">Rango</option>
                            </select>
                            {
                                isRango && (<div className='d-flex ms-2'>
                                    <input type="date" className='form-control' />
                                    <input type="date" className='ms-1 form-control' />
                                </div>)
                            }
                            <button className='btn btn-dark ms-2'>Buscar</button>
                        </div>
                        <table className='table text-center table-striped'>
                            <tbody>
                                <tr style={{ backgroundColor: '#665586', color: 'white' }}>
                                    <td>Estado</td>
                                    <td>Código</td>
                                    <td>Fecha de reserva</td>
                                    <td>Hora</td>
                                    <td>Nombres</td>
                                    <td>Apellidos</td>
                                    <td>Cubículo</td>
                                    <td>Ubicación</td>
                                    <td>Zona</td>
                                    <td>Acción</td>
                                </tr>
                                {
                                    reservas.map((reserva, index) => (
                                        <tr key={index}>
                                            <td>{reserva.estado}</td>
                                            <td>{reserva.usuario.codigo}</td>
                                            <td>{moment(reserva.fechaReserva).format('DD/MM/YYYY')}</td>
                                            <td>{reserva.horario.map(hour => (`(${hour}:00-${hour + 1}:00)`))}</td>
                                            <td>Carlos Jesús</td>
                                            <td>Ordaz Hoyos</td>
                                            <td>{reserva.cubiculo.nombre}</td>
                                            <td>{reserva.cubiculo.ubicacion}</td>
                                            <td>{reserva.cubiculo.zona}</td>
                                            <td><button className='boton boton-secondary'>Cancelar</button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
