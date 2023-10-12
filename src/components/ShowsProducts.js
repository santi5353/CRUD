import React,{useEffect, useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {show_alerta} from '../fuctions';

const ShowsProducts = () => {
    const url='http://localhost/api-products-main/';
    const [products, setProducts] = useState([]);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [description, seDescription] = useState('');
    const [price, setPrice] = useState('');
    const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState('');

    useEffect(() => {
        getProduct();
    },[]);

    const getProduct = async () => {
        const respuesta = await axios.get(url);
        setProducts(respuesta.data);
    }
  return (
    <div className='App'>
        <div className='container fluid'>
        <div className='row mt-3'>
            <div className='col-md-4 offset-md-4'>
                <div className='d-grid mx-auto'>
                <button className='btn btn-dark btn-block' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                    <i className='fa-solid fa-circle-plus'></i> Add Product
                </button>
            </div>
        </div>
        </div>
        <div className='row mt-3'>
        <div className='col-12 col-lg-8 offset-0 offset-lg-12'>
        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th colSpan='2'>Actions</th>
                </tr>
            </thead>
            <tbody className='table-group-divider'>
            {products.map((product,id) => (
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>
                        <button className='btn btn-warning btn-sm' data-bs-toggle='modal' data-bs-target='#modalProducts'
                        onClick={() => {
                            setId(product.id);
                            setName(product.name);
                            seDescription(product.description);
                            setPrice(product.price);
                            setOperation(2);
                            setTitle('Edit Product');
                        }}>
                            <i className='fa-solid fa-circle-pencil'></i>
                        </button>
                    </td>
                    <td>
                        <button className='btn btn-danger btn-sm'
                        onClick={() => {
                            Swal.fire({
                                title: 'Are you sure?',
                                text: "You won't be able to revert this!",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes, delete it!'
                              }).then((result) => {
                                if (result.isConfirmed) {
                                    axios.delete(url+product.id)
                                    .then(respuesta => {
                                        if(respuesta.data.ok === 1){
                                            show_alerta('Product deleted successfully','success','name');
                                            getProduct();
                                        }else{
                                            show_alerta('Error deleting product','error','name');
                                        }
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    })
                                }
                              })
                        }}>
                            <i className='fa-solid fa-circle-trash'></i>
                        </button>
                    </td>
                </tr>
                
            ))}

            </tbody>

        </table>

        </div>


        </div>

        </div>
        <div className='modal fade'>
     

        </div>

    </div>
  )
}

export default ShowsProducts