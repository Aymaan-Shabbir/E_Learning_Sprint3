// src/api.js
const BASE_URL = "http://localhost:3001";

export const fetchData = async (resource) =>
  await fetch(`${BASE_URL}/${resource}`).then((res) => res.json());

export const postData = async (resource, data) =>
  await fetch(`${BASE_URL}/${resource}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const updateData = async (resource, id, data) =>
  await fetch(`${BASE_URL}/${resource}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const deleteData = async (resource, id) =>
  await fetch(`${BASE_URL}/${resource}/${id}`, {
    method: "DELETE",
  });
