//Lograr hacer la peticion http del endopit

const fecthSinTocken = (endpoint, data, method = "GET") => {
  //garcias a las vairables de entonro la base sera dependiendo si estoy en produccion o en desarrollo
  const apiUrl = `${process.env.REACT_APP_API_URL}/${endpoint}`;

  if (method === "GET") {
    return fetch(apiUrl);
  } else {
    return fetch(apiUrl, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      method,
    });
  }
};

const fecthConTocken = (endpoint, data = {}, method = "GET") => {
  //garcias a las vairables de entonro la base sera dependiendo si estoy en produccion o en desarrollo
  const apiUrl = `${process.env.REACT_APP_API_URL}/${endpoint}`;

  //aqui nomas voy a verificar el tocken que esta en el localStorage wee y lor evalidare siemper al sacar un nuevo toquen lo bueno de este useefect es que podre revalidar este tocken gradualmente
  const token = localStorage.getItem("token") || "";

  if (method === "GET") {
    return fetch(apiUrl, {
      headers: { "Content-Type": "application/json", "x-header": token },
    });
  } else {
    return fetch(apiUrl, {
      headers: { "Content-Type": "application/json", "x-header": token },
      body: JSON.stringify(data),
      method,
    });
  }
};

export { fecthSinTocken, fecthConTocken };
