import React, { useState } from 'react'

export const ScheduleApp = () => {
    const [turnos, setturnos] = useState([
        { hora: 0, estado: 'desactivado' },
        { hora: 1, estado: 'desactivado' },
        { hora: 2, estado: 'desactivado' },
        { hora: 3, estado: 'desactivado' },
        { hora: 4, estado: 'desactivado' },
        { hora: 5, estado: 'desactivado' },
        { hora: 6, estado: 'desactivado' },
        { hora: 7, estado: 'disponible' },
        { hora: 8, estado: 'disponible' },
        { hora: 9, estado: 'disponible' },
        { hora: 10, estado: 'disponible' },
        { hora: 11, estado: 'disponible' },
        { hora: 12, estado: 'disponible' },
        { hora: 13, estado: 'disponible' },
        { hora: 14, estado: 'disponible' },
        { hora: 15, estado: 'disponible' },
        { hora: 16, estado: 'disponible' },
        { hora: 17, estado: 'disponible' },
        { hora: 18, estado: 'disponible' },
        { hora: 19, estado: 'disponible' },
        { hora: 20, estado: 'disponible' },
        { hora: 21, estado: 'disponible' },
        { hora: 22, estado: 'desactivado' },
        { hora: 23, estado: 'desactivado' },
    ]);
    const [cambio, setCambio] = useState(false);
    const [fecha, setfecha] = useState(new Date());
    const changeFecha = (day) => {
        let newDate = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() + 1);
        setfecha(newDate);
    }
    return (
        <>
            <div className="container">
                <br />
                <span className='fs-3'>{fecha.getDate()}/{fecha.getMonth() + 1}/{fecha.getFullYear()}</span>
                <div className='box-fecha'>
                    <input type="date" />
                    <div className='iconos'>
                        <span onClick={() => changeFecha(1)}><i className="fa-solid fa-angle-left"></i></span>
                        <span onClick={() => changeFecha(-1)}><i className="fa-solid fa-angle-right"></i></span>
                    </div>
                </div>
                <hr />
                {
                    cambio && (<div className='text-end mb-1'>
                        <button className='btn btn-dark'>Guardar cambios</button>
                    </div>)
                }
                <div className="turnos mb-1">
                    {
                        turnos.map((turno, index) => (
                            <div key={index} className={`${turno.estado == 'disponible' ? 'verde' : (turno.estado == 'reservado' ? 'rojo' : 'gris')}`}>
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
                        <span className='color rojo'></span>
                        <span>Reservado</span>
                    </div>
                    <div>
                        <span className='color gris'></span>
                        <span>Ninguno</span>
                    </div>
                </div>
            </div>
        </>
    )
}
