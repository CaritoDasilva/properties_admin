import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { changePropertyFromService, getPropertyByIdFromService } from "../services/propertyServices";

import styles from './DetailProperty.module.scss';

const DetailProperty = () => {
    const history = useHistory()
    const { id } = useParams();
    const [property, setProperty] = useState();

    const getPropertyById = async () => {
        const response = await getPropertyByIdFromService(id);
        console.log("🚀 ~ file: DetailProperty.jsx ~ line 15 ~ getPropertyById ~ response", response)
        setProperty(response?.data?.property);

    }

    const goToEditProperty = () => {
        history.push(`/modificar-propiedad/${id}`);
    }

    useEffect(() => {
        id && getPropertyById();
    }, [id]);

    const changeStatus = async (e) => {
        const updatedProperty = { ...property, isSold: e.target.value }

        console.log("🚀 ~ file: DetailProperty.jsx ~ line 25 ~ changeStatus ~ updatedProperty", property)
        const response = await changePropertyFromService(updatedProperty);
        console.log("🚀 ~ file: DetailProperty.jsx ~ line 31 ~ changeStatus ~ response", response);
        setProperty(response?.data.property);
    }

    return (
        <div>
            <h1>Propiedad {property?.propertyName}</h1>
            <h3>Ubicación: {property?.location}</h3>
            <h3>Nombre del dueño: {property?.owner}</h3>
            <h3>Status: {property?.isSold ? 'Vendida': 'Disponible'}</h3>
            <Form.Select aria-label="Default select example" value={property?.isSold} className={styles.selectStatus} onChange={changeStatus}>
                <option>Open this select menu</option>
                <option value={true}>Vendida</option>
                <option value={false}>Disponible</option>
            </Form.Select>
            <Button variant="info" onClick={goToEditProperty}>Editar propiedad</Button>
        </div>
    )
}

export default DetailProperty;