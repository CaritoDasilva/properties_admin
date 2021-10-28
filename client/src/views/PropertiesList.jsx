import React, { useEffect, useState } from "react";
import styles from './PropertiesList.module.scss';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { changePropertyFromService } from "../services/propertyServices";

const PropertiesList = () => {
    const [list, setList] = useState([]);
    const history = useHistory()

    const getProperties = async () => {
        try {
            const properties = await axios.get('http://localhost:8000/api/properties/');
            console.log("🚀 ~ file: PropertiesList.jsx ~ line 11 ~ getProperties ~ properties", properties)
            setList(properties.data.properties);

        } catch(err) {
            console.log("🚀 ~ file: PropertiesList.jsx ~ line 12 ~ getProperties ~ err", err)
            
        }
    }

    useEffect(() => {
        getProperties();
    }, []);

    const deleteProperty = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/properties/delete/${id}`)
            setList(list.filter(l => l._id !== id));
            return response;
        } catch(err) {
            console.log("🚀 ~ file: PropertiesList.jsx ~ line 30 ~ deleteProperty ~ err", err)
            
        }
    }

    const changeStatus = async (property, isSold) => {
        const updatedProperty = { ...property, isSold: isSold }
        await changePropertyFromService(updatedProperty);
        getProperties();
    }

    const goToPropertyDetail = (id) => {
        history.push(`/ver-propiedad/${id}`);
    }

    return (
        <div>
            <h1>Propiedades:</h1>
            <div className={styles.listContainer}>
                { list?.map(property => (
                    <div className={styles.card} key={property._id}>
                        <h2>{property.propertyName}</h2>
                        <p>{property.description}</p>
                        <p>Status: {!property.isSold ? 'Disponible' : 'Vendida'}</p>
                        <Form>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Cambiar status propiedad"
                                checked={property.isSold}
                                onChange={(e) => changeStatus(property, e.target.checked)}
                            />
                        </Form>
                        <Button variant="info" onClick={() => goToPropertyDetail(property._id)}>Ver detalle</Button>
                        <Button variant="danger" onClick={() => deleteProperty(property._id)}>Eliminar propiedad</Button>
                    </div>
                )) }
            </div>
        </div>
    )
}

export default PropertiesList;