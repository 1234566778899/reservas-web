import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const HorarioApp = () => {
    const [turnos, setturnos] = useState([]);

    const getHorario = () => {
        axios.get('http://localhost:4000/horario/retrieve')
            .then(res => {
                setturnos(res.data);
            })
            .catch(error => console.log(error));
    }
    const updateEstado = (id, estado) => {
        estado = estado == 'disponible' ? 'indisponible' : 'disponible';
        axios.put(`http://localhost:4000/horario/update/${id}`, { estado })
            .then(res => {
                const aux = turnos.map(x => x._id == id ? { ...x, estado } : x);
                setturnos(aux);
            })
            .catch(error => console.log(error));
    }
    useEffect(() => {
        getHorario();
    }, [])
    return (
        <>
            <div className="container">
                <div className="row">
                    <br />
                    <h3 className='mt-3'>CONFIGURAR HORARIO</h3>
                    <hr />
                    <div className="turnos mb-1">
                        {
                            turnos.map(turno => (
                                <div key={turno._id} onClick={() => updateEstado(turno._id, turno.estado)} className={`${turno.estado == 'disponible' ? 'verde' : 'gris'}`}>
                                    <span>{turno.hora} - {turno.hora + 1}</span>
                                </div>
                            ))
                        }
                    </div>
                    <div className='leyenda'>
                        <div>
                            <span className='color verde'></span>
                            <span>Disponible</span>
                        </div>
                        <div>
                            <span className='color gris'></span>
                            <span>No disponible</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
