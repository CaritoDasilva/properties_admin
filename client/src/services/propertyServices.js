import axios from "axios";

export const changePropertyFromService = async (property) => {
console.log("🚀 ~ file: propertyServices.js ~ line 4 ~ changePropertyFromService ~ property", property)
        try {
            // console.log('value', updatedProperty);
            const response = await axios.put(`http://localhost:8000/api/properties/update/${property._id}`, property);
            return response;
        } catch(err) {
            console.log("🚀 ~ file: PropertiesList.jsx ~ line 43 ~ changeStatus ~ err", err)
            return err;
        }

} 

export const getPropertyByIdFromService = async (id) => {
console.log("🚀 ~ file: propertyServices.js ~ line 17 ~ getPropertyByIdFromService ~ id", id)
    try {
            const response = await axios.get(`http://localhost:8000/api/properties/${id}`);
            console.log("🚀 ~ file: DetailProperty.jsx ~ line 12 ~ getPropertyById ~ response", response.data.property)
            return response;
        } catch(err) {
            console.log("🚀 ~ file: DetailProperty.jsx ~ line 16 ~ getPropertyById ~ err", err)
            return err;
        }
}
