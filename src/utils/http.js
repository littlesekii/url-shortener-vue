const http = {
  baseUrl: import.meta.env.VITE_SERVER_URL,
  get: function (url) {
    // console.log(this.baseUrl + url);

    return fetch(this.baseUrl + url);
  },
  post: function (url, body) {
    // console.log(this.baseUrl + url);

    return fetch(this.baseUrl + url, {
      method: "POST",
      body: body,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
  },
  put: function (url, body) {
    // console.log(this.baseUrl + url);

    return fetch(this.baseUrl + url, {
      method: "PUT",
      body: body,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
  },
  delete: function (url, body) {
    // console.log(this.baseUrl + url);

    return fetch(this.baseUrl + url, {
      method: "DELETE",
      body: body,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
  },




  async: {
    baseUrl: import.meta.env.VITE_SERVER_URL,
    get: async function (url) {
      // console.log(this.baseUrl + url);

      return await fetch(this.baseUrl + url);
    },
    post: async function (url, body) {
      // console.log(this.baseUrl + url);

      return await fetch(this.baseUrl + url, {
        method: "POST",
        body: body,
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
    },
    put: async function (url, body) {
      // console.log(this.baseUrl + url);

      return await fetch(this.baseUrl + url, {
        method: "PUT",
        body: body,
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
    },
    delete: async function (url, body) {
      // console.log(this.baseUrl + url);

      return await fetch(this.baseUrl + url, {
        method: "DELETE",
        body: body,
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
    },
  }
};

export default http;