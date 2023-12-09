import React from 'react'
import '../styles/index.css'
import { Outlet,  useNavigate } from 'react-router-dom';

export const AdminApp = () => {
    const navigate = useNavigate();
    return (
        <div className='admin'>
            <div className='navbar py-2 pt-3'>
                <div className="container">
                    <h5>Admin</h5>
                </div>
            </div>
            <div className='main'>
                <div className='menu'>
                    <div className='item' onClick={() => navigate('/admin/cubiculos')}>
                        <i className="fa-solid fa-cube"></i>
                        <span>CUBÍCULOS</span>
                    </div>
                    <div className='item' onClick={() => navigate('/admin/reservas')}>
                        <i className="fa-solid fa-book"></i>
                        <span>RESERVAS</span>
                    </div>
                    <div className='item' onClick={() => navigate('/admin/horario')}>
                        <i className="fa-solid fa-calendar-days"></i>
                        <span>HORARIO</span>
                    </div>
                </div>
                <div className='content'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
