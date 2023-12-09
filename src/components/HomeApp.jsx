import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CONFIG } from '../config';

export const HomeApp = () => {
    const [fecha, setfecha] = useState(new Date());
    const [Horario, setHorario] = useState([])
    const [cubiculos, setCubiculos] = useState([]);
    const [reserva, setreserva] = useState([]);
    const [reservas, setReservas] = useState([]);
    const navigate = useNavigate();
    const changeFecha = (day) => {
        let newDate = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() + day);
        setfecha(newDate);
        setreserva([]);
        getReservas(moment(newDate).format('YYYY/MM/DD'));

    }
    const getHorario = () => {
        axios.get(`${CONFIG.url}/horario/retrieve`)
            .then(res => {
                setHorario(res.data);
            })
            .catch(error => console.log(error));
    }
    const getCubiculos = () => {
        axios.get(`${CONFIG.url}/cubiculo/retrieve`)
            .then(res => {
                setCubiculos(res.data);
            })
            .catch(error => console.log(error));
    }
    const getReservas = (date) => {
        axios.post(`${CONFIG.url}/reserva/date/retrieve`, { date })
            .then(res => {
                setReservas(res.data);
            })
            .catch(error => console.log(error));
    }
    const addHora = (cubiculo, hora) => {
        if (reserva.some(x => x.hora == hora && cubiculo._id == x.cubiculo._id)) {
            const nuevo = reserva.filter(x => !(x.cubiculo._id == cubiculo._id && x.hora == hora));
            setreserva(nuevo);
            return;
        }
        if (reserva.length >= 1 && cubiculo._id != reserva[0].cubiculo._id) return alert('No se puede reservar dos espacios en un mismo dia');
        if (reserva.length >= 2) return alert('Maximo se puede reservar dos horas');
        setreserva(x => ([...x, { cubiculo, hora }]));
    }
    const getReservado = (id, hora) => {
        return reserva.find(x => x.cubiculo._id == id && x.hora == hora);
    }
    const submitReserva = () => {
        if (reserva.length <= 0) return alert('Debe seleccionar un cubiculo');
        const data = {
            fechaReserva: moment(fecha).format('YYYY/MM/DD'),
            horario: reserva.map(x => x.hora),
            estado: 'Reservado',
            usuario: {
                codigo: localStorage.getItem('codigo')
            },
            cubiculo: reserva[0].cubiculo
        }
        axios.post(`${CONFIG.url}/reserva/register`, data)
            .then(res => {
                navigate('/confirmacion')
            }).catch(error => {
                alert(error.response.data.error);
            })
    }
    const isReservado = (cubiculo, hora) => {
        return reservas.find(x => x.cubiculo._id == cubiculo && x.horario.includes(hora));
    }
    useEffect(() => {
        const code = localStorage.getItem('codigo');
        if (!code) navigate('/login');
        getHorario();
        getCubiculos();
        getReservas(moment(fecha).format('YYYY/MM/DD'));
    }, []);
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-between mt-2">
                        <h3>Reserva de cubículos</h3><button className='btn btn-dark' onClick={()=>navigate('/login')}>Salir</button>
                    </div>
                    <hr />
                    <span className='fs-3'>{fecha.getDate()}/{fecha.getMonth() + 1}/{fecha.getFullYear()}</span>
                    <div className='box-fecha'>
                        <input type="date" />
                        <div className='iconos'>
                            <span onClick={() => changeFecha(-1)}><i className="fa-solid fa-angle-left"></i></span>
                            <span onClick={() => changeFecha(1)}><i className="fa-solid fa-angle-right"></i></span>
                        </div>
                    </div>
                    <div className='d-flex catalogo mt-3'>
                        <div className='cont-espacio'>
                            <div className='espacio'>
                                <span>Espacio</span>
                            </div>
                            {
                                cubiculos.map((data, index) => (
                                    <div key={data._id} className={`espacio ${cubiculos.length - 1 == index ? 'ultimo' : ''}`}>
                                        <span>{data.nombre}</span>
                                    </div>))
                            }
                        </div>
                        <div className='cont-hora'>
                            <div className='hora'>
                                {
                                    [...Array(24)].map((_, index) => (
                                        <div key={index}>
                                            <span>{index < 10 ? `0${index}` : index}:00</span>
                                        </div>
                                    ))
                                }
                            </div>
                            {
                                cubiculos.map((data, index) => (
                                    <div key={data._id} className={`hora ${index == cubiculos.length - 1 ? 'ultimo' : 0}`}>
                                        {
                                            Horario.map((hora) => (
                                                <div
                                                    onClick={() => { if (!isReservado(data._id, hora.hora)) addHora(data, hora.hora) }}
                                                    key={hora._id}
                                                    className={` ${hora.estado == 'disponible' ? (`${isReservado(data._id, hora.hora) ? 'rojo' : (`horario-item ${getReservado(data._id, hora.hora) ? 'naranja' : 'h-verde'}`)}`) : ''}`}>
                                                    <span className='oculto'>{hora.hora < 10 ? `0${hora.hora}` : hora.hora}:00</span>
                                                </div>))
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='leyenda'>
                        <div>
                            <span className='color verde'></span>
                            <span>Disponible</span>
                        </div>
                        <div>
                            <span className='color naranja'></span>
                            <span>Su reserva</span>
                        </div>
                        <div>
                            <span className='color rojo'></span>
                            <span>Reservado</span>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <button className='btn btn-dark' onClick={() => submitReserva()}>Reservar</button>
                    </div>
                </div>
            </div>
        </>
    )
}
