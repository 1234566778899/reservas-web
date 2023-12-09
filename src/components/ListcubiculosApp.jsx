import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ModalApp } from './ModalApp';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export const ListcubiculosApp = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [cubiculos, setCubiculos] = useState([])
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const submitAddCubiculo = (data) => {
        axios.post('http://localhost:4000/cubiculo/register', data)
            .then(res => {
                setCubiculos(x => ([...x, data]));
                closeModal();
            })
            .catch(error => console.log(error));
    }
    const getCubiculos = () => {
        axios.get('http://localhost:4000/cubiculo/retrieve')
            .then(res => {
                setCubiculos(res.data);
            })
            .catch(error => console.log(error));
    }
    useEffect(() => {
        getCubiculos();
    }, [])

    return (
        <>
            <div className="container bg-white mt-2">
                <div className="text-end">
                    <button className='boton boton-primary' onClick={openModal}>Agregar Cubículo</button>
                    <ModalApp show={showModal} onClose={closeModal}>
                        <div className='text-start'>
                            <h4 className='text-center'>Agregar cubículo</h4>
                            <form onSubmit={handleSubmit(submitAddCubiculo)}>
                                <table className='w-100'>
                                    <tbody>
                                        <tr>
                                            <td className='w-25'>
                                                <label>Nombre</label>
                                            </td>
                                            <td>
                                                <input type="text" className='w-100 form-control'{...register('nombre', { required: true })} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='w-25'>
                                                <label>Ubicación</label>
                                            </td>
                                            <td>
                                                <select className='w-100 form-select' {...register('ubicacion')}>
                                                    <option value="monterrico">Campus Monterrico</option>
                                                    <option value="sanmiguel">Campus San Miguel</option>
                                                    <option value="sanisidro">Campus San Isidro</option>
                                                    <option value="villa">Campus Villa</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='w-25'>
                                                <label>Zona</label>
                                            </td>
                                            <td>
                                                <select className='w-100 form-select' {...register('zona')}>
                                                    <option value="a">Pabellon A</option>
                                                    <option value="b">Pabellon B</option>
                                                    <option value="c">Pabellon C</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='w-25'>
                                                <label>Capacidad</label>
                                            </td>
                                            <td>
                                                <input type="text" className='w-100 form-control' {...register('capacidad', { required: true })} />
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                                <div className="text-end">
                                    <button className='btn btn-primary mt-2' type='submit'>Agregar</button>
                                </div>
                            </form>
                        </div>
                    </ModalApp>
                </div>
                <table className='table text-center mt-2'>
                    <thead>
                        <tr style={{ backgroundColor: '#665586', color: 'white' }}>
                            <th>Nombre</th>
                            <th>Ubicación</th>
                            <th>Zona</th>
                            <th>Capacidad</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody className='list-cubiculos'>
                        {
                            cubiculos.map((x, i) => (<tr key={x._id} className={`${i % 2 == 0 ? 'par' : ''}`}>
                                <td>{x.nombre}</td>
                                <td>{x.ubicacion == 'sanmiguel' ? 'Campus San Miguel' : (x.ubicacion == 'sanisidro' ? 'Campus San Isidro' : `Campus ${x.ubicacion}`)}</td>
                                <td>Pabellon {x.zona.toUpperCase()}</td>
                                <td>{x.capacidad}</td>
                                <td>
                                    <i className="fa-solid fa-gear fs-5 icon icon-confi" onClick={() => navigate(`/admin/turnos/${i}`)}></i>
                                    <i className="fa-solid fa-trash fs-5 ms-3 icon icon-delete"></i>
                                </td>
                            </tr>))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
