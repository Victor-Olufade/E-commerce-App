import axios from "axios";

const baseUrl = "http://localhost:5000";

export const apiGet = (path) => {
  if(localStorage.getItem("currentUserInfo")){
    const {token} = JSON.parse(localStorage.getItem("currentUserInfo"))
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }
    return axios.get(`${baseUrl}${path}`, config);
  };
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
}
  return axios.get(`${baseUrl}${path}`, config);
  
};

export const apiPost = (path, data) => {
  if(localStorage.getItem("currentUserInfo")){
    const user = JSON.parse(localStorage.getItem("currentUserInfo"))
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
  
    return axios.post(`${baseUrl}${path}`, data, config);
  }
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios.post(`${baseUrl}${path}`, data, config);

};

export const apiPostImg = (path, data) => {
  if(localStorage.getItem("currentUserInfo")){
    const user = JSON.parse(localStorage.getItem("currentUserInfo"))
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'multipart/form-data',
      },
    };
  
    return axios.post(`${baseUrl}${path}`, data, config);
  }
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  return axios.post(`${baseUrl}${path}`, data, config);

};

export const apiPut = (path, data) => {
  if(localStorage.getItem("currentUserInfo")){
    const user = JSON.parse(localStorage.getItem("currentUserInfo"))
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
  
    return axios.put(`${baseUrl}${path}`, data, config);
  }
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios.put(`${baseUrl}${path}`, data, config);
};

export const apiPutImg = (path, data) => {
  if(localStorage.getItem("currentUserInfo")){
    const user = JSON.parse(localStorage.getItem("currentUserInfo"))
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'multipart/form-data',
      },
    };
  
    return axios.put(`${baseUrl}${path}`, data, config);
  }
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  return axios.put(`${baseUrl}${path}`, data, config);
};

export const apiPatch = (path, data) => {
  if(localStorage.getItem("currentUserInfo")){
    const user = JSON.parse(localStorage.getItem("currentUserInfo"))
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
  
    return axios.patch(`${baseUrl}${path}`, data, config);
  }
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios.patch(`${baseUrl}${path}`, data, config);
};

export const apiDelete = (path) => {
  if(localStorage.getItem("currentUserInfo")){
    const {token} = JSON.parse(localStorage.getItem("currentUserInfo"))
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }
    return axios.delete(`${baseUrl}${path}`, config);
  };
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
}
  return axios.delete(`${baseUrl}${path}`, config);
};



//for admins to create products without incoming data in req.body
// export const apiPostAdmin = (path) => {
//   if(localStorage.getItem("currentUserInfo")){
//     const user = JSON.parse(localStorage.getItem("currentUserInfo"))
//     const config = {
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//     };
  
//     return axios.post(`${baseUrl}${path}`, config);
//   }
//   const config = {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   };

//   return axios.post(`${baseUrl}${path}`, config);

// };