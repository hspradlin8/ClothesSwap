const remoteURL = "http://localhost:5002"

export default {
    createUser(user) {
        return fetch(`${remoteURL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then (Response => Response.json())
    },
    getUserData() {
        return fetch(`${remoteURL}/users`)
            .then(data => data.json())
    },
    setUser(authObj){

        //  For now, just store the email and password that the customer enters into local storage.
        sessionStorage.setItem(
          "credentials",
          JSON.stringify(authObj)
        )
        this.setState({
          user: this.isAuthenticated(),
          userId: authObj.id
        });
      }
}