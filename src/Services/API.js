import Axios from "axios";
const DELETE_TRAINING='https://customerrest.herokuapp.com/api/trainings'
export const FETCH_ALL_CUSTOMERS =
  "https://customerrest.herokuapp.com/api/customers";
export const FETCH_ALL_TRAININGS =
  "https://customerrest.herokuapp.com/gettrainings";
const headers = {
  "Content-Type": "application/json",
};
export const GetRequest = (url, headers) => {
  return new Promise((resolve, reject) => {
    Axios({
      method: "get",
      url: url,
      data: "",
      headers,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const PutRequest = (url, data, headers) => {
  return new Promise((resolve, reject) => {
    Axios({
      method: "put",
      url: url,
      data: JSON.stringify(data),
      headers,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const PostRequest = (url, data, headers) => {
  return new Promise((resolve, reject) => {
    Axios({
      method: "post",
      url: url,
      data: JSON.stringify(data),
      headers,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const DeleteRequest = (url, headers) => {
  return new Promise((resolve, reject) => {
    Axios({
      method: "delete",
      url: url,
      data: "",
      headers,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const fetchAllCustomers = () => {
  return GetRequest(FETCH_ALL_CUSTOMERS, headers);
};
export const fetchTrainings = () => {
  return GetRequest(FETCH_ALL_TRAININGS, headers);
};

export const updateCustomer = (href, body) => {
  return PostRequest(href, body, headers);
};

export const deleteCustomer = (href) => {
  return DeleteRequest(href, headers);
};
export const deleteTraining = (id) => {
  return DeleteRequest(`${DELETE_TRAINING}/${id}`, headers);
};

export const createNewCustomer = (data) => {
  return PostRequest(FETCH_ALL_CUSTOMERS, data,headers);
};

export const addTraining=(data)=>{
  return PostRequest(FETCH_ALL_TRAININGS, data,headers);
}