import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../fuctions';

const ShowsProducts = () => {
    const url = 'http://localhost/api-products-main/';
    const [products, setProducts] = useState([]);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState(''); // Fixed the state name
    const [price, setPrice] = useState(''); // Fixed the state name
    const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState('');

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        const respuesta = await axios.get(url);
        setProducts(respuesta.data);
    };

    const openModal = (op, id, name, description, price) => {
        setId('');
        setName('');
        setDescription(''); // Fixed the state name
        setPrice(''); // Fixed the state name
        setOperation(op);
        if (op === 1) {
            setTitle('Add Product');
        } else if (op === 2) {
            setTitle('Edit Product');
            setId(id);
            setName(name);
            setDescription(description); // Fixed the state name
            setPrice(price); // Fixed the state name
        }

        window.setTimeout(function () {
            document.getElementById('name').focus();
        }, 500);
    };

    const validar = () => {
        var parametros;
        var metodo;
        if (name.trim() === '') {
            show_alerta('Escribe el nombre del producto', 'warning');
        } else if (description.trim() === '') {
            show_alerta('Escribe la descripción del producto', 'warning'); // Fixed the message
        } else if (price.trim() === '') {
            show_alerta('Escribe el precio del producto', 'warning');
        } else {
            if (operation === 1) {
                parametros = { name: name.trim(), description: description.trim(), price: price.trim() };
                metodo = 'post';
            } else {
                parametros = { id: id, name: name.trim(), description: description.trim(), price: price.trim() };
                metodo = 'put';
            }
            enviarSolicitud(parametros, metodo);
        }
    };

    const enviarSolicitud = async (parametros, metodo) => {
        try {
            const respuesta = await axios({ method: metodo, url: url, data: parametros });
            var tipo = respuesta.data[0];
            var mensaje = respuesta.data[1];
            show_alerta(mensaje, tipo);
            if (tipo === 'success') {
                document.getElementById('btnCerrar').click(); // Fixed the ID
                getProduct();
            }
        } catch (error) {
            show_alerta(error, 'error');
            console.log(error);
        }
    };

    const deleteProduct = (id, name) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: `¿Estás seguro de eliminar el producto ${name}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'No, cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                enviarSolicitud({id:id}, 'delete'); // Pasar el método 'delete' y no es necesario un objeto de datos
            } else {
                show_alerta('El producto no fue eliminado', 'info');
            }
        });
    }
    

    return (
        <div className="App">
            <div className="container fluid">
                <div className="row mt-3">
                    <div className="col-md-4 offset-md-4">
                        <div className="d-grid mx-auto">
                            <button onClick={() => openModal(1)} className="btn btn-dark btn-block" data-bs-toggle="modal" data-bs-target="#modalProducts">
                                <i className="fas fa-plus-circle"></i> Añadir
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {products.map((product, i) => (
                                    <tr key={product.id}>
                                        <td>{i + 1}</td>
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>${new Intl.NumberFormat('es-mx').format(product.price)}</td>
                                        <td>
                                            <button onClick={() => openModal(2, product.id, product.name, product.description, product.price)} className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalProducts">
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            &nbsp;
                                            <button onClick={()=>deleteProduct(product.id,product.name)} className="btn btn-danger">
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div id="modalProducts" className="modal fade" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="modal-title">{title}</label>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type="hidden" id="id" />
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fas fa-gift"></i></span>
                                <input type="text" id="name" className="form-control" placeholder="Nombre" aria-label="Name" aria-describedby="basic-addon1" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fas fa-comment"></i></span>
                                <input type="text" id="description" className="form-control" placeholder="Descripción" aria-label="Description" aria-describedby="basic-addon1" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fas fa-dollar-sign"></i></span>
                                <input type="text" id="price" className="form-control" placeholder="Precio" aria-label="Price" aria-describedby="basic-addon1" value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div className="d-grid col-6 mx-auto">
                                <button onClick={() => validar()} className="btn btn-success">
                                    <i className="fas fa-save"></i> Guardar
                                </button>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button id="btnCerrar" type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowsProducts;
