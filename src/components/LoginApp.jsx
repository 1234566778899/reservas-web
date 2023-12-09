import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

export const LoginApp = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const submitLogin = (data) => {
        axios.post('http://localhost:4000/user/login', data)
            .then(res => {
                localStorage.setItem('codigo', res.data.codigo);
                navigate('/home');
            })
            .catch(error => alert(error.response.data.error))
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 border p-3 mt-4">
                        <h3 className='text-center'>INICIAR SESIÓN</h3>
                        <br />
                        <form onSubmit={handleSubmit(submitLogin)}>
                            <div className="mb-2">
                                <label>Codigo</label>
                                <input type="text" className='form-control'{...register('codigo', { required: true })} />
                            </div>
                            <div className="mb-2">
                                <label>Password</label>
                                <input type="password" className='form-control' {...register('password', { required: true })} />
                            </div>
                            <button className='mt-3 w-100 btn btn-dark'>Iniciar sesión</button>
                        </form>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </>
    )
}
