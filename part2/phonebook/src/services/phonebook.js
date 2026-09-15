import { useEffect } from "react";
import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const create = (newPersons) =>
  axios.post(baseUrl, newPersons).then((response) => response.data);

const deletePerson = (id) =>
  axios.delete(`${baseUrl}/${id}`).then((response) => response.data);

const changeNumber = (id, newPerson) =>
  axios.put(`${baseUrl}/${id}`, newPerson).then((response) => response.data);

export default { getAll, create, deletePerson, changeNumber };
