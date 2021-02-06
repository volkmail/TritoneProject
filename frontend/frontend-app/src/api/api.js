import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

export const TestingAPI = {
    GetDiagramElements (){
        return instance.get("testing/diagram_elements")
            .then(response => {
                return response.data;
        })
    }
}