import { useEffect } from "react";
import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const create = (newPersons) =>
  axios
    .post(baseUrl, newPersons)
    .then((response) => response.data)
    .catch((error) => {
      const errorObject = error.response.data;
      console.log(errorObject.error);
      throw new Error(errorObject.error);
    });

const deletePerson = (id) =>
  axios.delete(`${baseUrl}/${id}`).then((response) => {
    console.log(response.data);
    return response.data;
  });

const changeNumber = (id, newPerson) =>
  axios.put(`${baseUrl}/${id}`, newPerson).then((response) => response.data);

export default { getAll, create, deletePerson, changeNumber };
