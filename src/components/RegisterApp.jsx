import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CONFIG } from '../config';

export const RegisterApp = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const submitRegister = (data) => {
        axios.post(`${CONFIG.url}/user/register`, data)
            .then(res => {
                navigate('/login');
            })
            .catch(error => alert(error.response.data.error))
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 border p-3 mt-4">
                        <h3 className='text-center'>REGISTRO SESIÓN</h3>
                        <br />
                        <form onSubmit={handleSubmit(submitRegister)}>
                            <div className="mb-2">
                                <label>Codigo</label>
                                <input type="text" className='form-control'{...register('codigo', { required: true })} />
                            </div>
                            <div className="mb-2">
                                <label>Password</label>
                                <input type="password" className='form-control' {...register('password', { required: true })} />
                            </div>
                            <button className='mt-3 w-100 btn btn-dark'>Registrarme</button>
                        </form>
                        <br />
                        <div className='text-center'>
                            <span>¿Ya tienes una cuenta?</span>
                            <a href="#" className='ms-2' onClick={() => navigate('/login')}>Iniciar sesión</a>
                        </div>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </>
    )
}
