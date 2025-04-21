import { API } from "../../constants/common";
// import { deleteLocalData, getLocalData, storeLocalData } from "@/app/utils"; zzz
import toast from 'react-hot-toast'; // Import toast


export const httpRequest = async (data: any) => {
  
  
  const { url, params, method } = data;
  // const token = await getLocalData("token"); zzz
  // const apiPath = "/api" + url; //proxy
 
  const apiPath = API.BASE_URL + API.VERSION + url;
  let response;
  const token = localStorage.getItem("token"); // ✅ Get token from localStorage
//   const headers = {
//     "Content-Type": "application/json",
//     "Accept": "application/json, text/plain, */*",
// // "Cookie": "XSRF-TOKEN=wgYT6phvANwwGraWiNzVGzRmWXOFz4Iq7AV4k2OX; _session=ywncjMyjgWUTyGg0aNZXRG5YYLpRyvLCCYqtAN0M",
//   //  " Cache-Control": "no-cache, private, max-age=86400",
 
// "Authorization": "Bearer null",
const headers: Record<string, string> = {
  "Content-Type": "application/json",
  "Accept": "application/json, text/plain, */*",
  "Authorization": `Bearer ${token}`
};

// if (token) {
//   headers["Authorization"] = `Bearer ${token}`; // ✅ Set token dynamically
// }

// "X-XSRF-TOKEN":"wgYT6phvANwwGraWiNzVGzRmWXOFz4Iq7AV4k2OX"

    // Authorization: `Bearer ${token}`,
    // key: 'Content-Security-Policy', 
    // value: "upgrade-insecure-requests",
  // };


  
  // let datas =true 
    // setLoading(true)

  if (method == "POST" || method == "PUT" || method == "DELETE") {
    response = await fetch(apiPath, {
      method,
      headers,
      body: JSON.stringify(params),
      referrerPolicy: "unsafe-url"
    });
  } else if (method == "GET") {
    const payload = new URLSearchParams(params);
    response = await fetch(apiPath + "?" + payload, { method, headers })
  }



  const responseObj = await response?.json();


  //-------------------
  type ResponseObj = {
    message: string;
};

if (!response?.ok) {
    const responseObjTyped = responseObj as ResponseObj;
    toast.error(responseObjTyped.message);
    throw new Error(responseObjTyped.message);
} else if (response.ok && method !== "GET") {
    const responseObjTyped = responseObj as ResponseObj;
    if (responseObjTyped.message) {
      toast.success(responseObjTyped.message);
  }
   
}
  return responseObj;
  
};




export const httpReq = async (data: any) => {
  const { url, params, method } = data;


  const apiPath = `${process.env.NEXT_PUBLIC_BASE_URL}${API.VERSION}users`;

  const headers = {
    "Content-Type": "application/json",
  };


  const payload = new URLSearchParams(params);



  const response = await fetch(`${apiPath}?${payload}`, {
    method,
    headers,
  });


  // if (response?.status === 401) {
  //   try {
  //     const token = await getLocalData("token");
  //     if (token) {
  //       const response = await httpRequest({
  //         url: API.LOGOUT,
  //         method: "PUT",
  //         params: {
  //           token: token,
  //           deactivate: true
  //         },
  //       });

  //       await deleteLocalData("token");
  //       await deleteLocalData("user");
  //       await deleteLocalData("profileData");
  //       window.location.replace("/signin");
  //     }
  //   } catch (error) {
  //     console.error("Error: ", error);
  //   }
  // }


  if (!response) {
    return [];
  }

  return response.json();
};






