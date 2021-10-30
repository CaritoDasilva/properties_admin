import React, { useState, useEffect } from "react";
import { Form, Button } from 'react-bootstrap';
import { Formik, Form as FormFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';
import { getPropertyByIdFromService, changePropertyFromService } from "../services/propertyServices";

const NewProperty = () => {
    const { id } = useParams();
    const history = useHistory()
    const [propertyForm, setPropertyForm] = useState({
        propertyName: '',
        description: '',
        location: '',
        price: '',
        owner: ''
    });

    const propertySchema = Yup.object().shape({
        propertyName: Yup.string()
            .min(2, 'Mínimo 2 caracteres!')
            .max(50, 'Máximo 50 caracteres!')
            .required('Este campo es requerido'),
        description: Yup.string()
            .min(2, 'Mínimo 2 caracteres!')
            .max(50, 'Máximo 50 caracteres!')
            .required('Este campo es requerido'),
        location: Yup.string()
            .min(2, 'Mínimo 2 caracteres!')
            .max(50, 'Máximo 50 caracteres!')
            .required('Este campo es requerido'),
        price: Yup.number()
            .min(1, 'No puede tener un precio menor a 1 peso')
            .required('Este campo es requerido'),
        owner: Yup.string()
            .min(2, 'Mínimo 2 caracteres!')
            .max(50, 'Máximo 50 caracteres!')
            .required('Este campo es requerido'),
    });


    const getPropertyById = async () => {
        const property = await getPropertyByIdFromService(id);
        setPropertyForm({
            propertyName: property.data.property.propertyName,
            description: property.data.property.description,
            location: property.data.property.location,
            price: property.data.property.price,
            owner: property.data.property.owner
        })
    }

    useEffect(() => {
        id && getPropertyById();
    }, [id]);

    const addProperty = async (values) => {
    console.log("🚀 ~ file: NewProperty.jsx ~ line 60 ~ addProperty ~ values", values)
        try {
            
            if (id) {
                const updatedProperty = { ...values, _id: id }

                changePropertyFromService(updatedProperty)
            } else {
                const response = await axios.post('http://localhost:8000/api/properties/new', values);
                console.log("🚀 ~ file: NewProperty.jsx ~ line 41 ~ addProperty ~ response", response)
                
            }
            history.push('/propiedades');

            
            
        } catch(err) {
            console.log("🚀 ~ file: NewProperty.jsx ~ line 44 ~ addProperty ~ err", err.response)
            Swal.fire({
                title: 'Error!',
                html: `<ul>${err.response.data.errors.map(error => (`<li>${error}</li>`))}</ul>`,
                icon: 'error',
                confirmButtonText: 'Not Cool'
            })
            // return err;
        }


    }




    return (
        <div>
            <h1>Nueva Propiedad</h1>
            <Formik
                initialValues={propertyForm}
                validationSchema={propertySchema}
                onSubmit={addProperty}
            >
                {({ errors, touched, getFieldProps }) => (
                    <FormFormik>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nombre de la propiedad</Form.Label>
                            <Form.Control type="text" placeholder="Ingresa nombre" name="propertyName"
                                value={propertyForm.propertyName} {...getFieldProps('propertyName')} />
                            <p className="errors">{(errors.propertyName && touched.propertyName) && errors.propertyName}</p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Descripción de la propiedad</Form.Label>
                            <Form.Control type="text" placeholder="Ingresa descripción" name="description"
                                value={propertyForm.description} {...getFieldProps('description')}/>
                            <p className="errors">{(errors.description && touched.description) && errors.description}</p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Ubicación de la propiedad</Form.Label>
                            <Form.Control type="text" placeholder="Ingresa ubicación" name="location"
                                value={propertyForm.location} {...getFieldProps('location')} />
                            <p className="errors">{(errors.location && touched.location) && errors.location}</p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Precio de la propiedad</Form.Label>
                            <Form.Control type="number" placeholder="Ingresa precio" name="price"
                                value={propertyForm.price} {...getFieldProps('price')} />
                            <p className="errors">{(errors.price && touched.price) && errors.price}</p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Dueño de la propiedad</Form.Label>
                            <Form.Control type="text" placeholder="Ingresa nombre del dueño" name="owner"
                                value={propertyForm.owner} {...getFieldProps('owner')} />
                            <p className="errors">{(errors.owner && touched.owner) && errors.owner}</p>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>

                    </FormFormik>
                ) }
            </Formik>
        </div>
    )
}

export default NewProperty;