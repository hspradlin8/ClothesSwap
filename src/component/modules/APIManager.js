const remoteURL = "http://localhost:5002"

export default {
  get(resource, id) {
    return fetch(`${remoteURL}/${resource}/${id}`).then(result => result.json())
  },
  getAll(resource) {
    return fetch(`${remoteURL}/${resource}`).then(result => result.json())
  },
  getAllNotMyClothes(resource, userId) {
    return fetch(`${remoteURL}/${resource}?userId_ne=${userId}`).then(result => result.json())
  },
  searchNotMyClothes(resource, userId, qualityId, typeId, colorId) {
    // console.log(qualityId, typeId, colorId)
    return fetch(`${remoteURL}/${resource}?userId_ne=${userId}&quality=${qualityId}&type=${typeId}&color=${colorId}`).then(result => result.json())
  },
  getAllMyClothes(resource, userId) {
    return fetch(`${remoteURL}/${resource}?userId=${userId}`).then(result => result.json())
  },
  getAllMyNotifications(userId) {
    return fetch(`${remoteURL}/notifications?recieverId=${userId}&_expand=user&_expand=item`).then(result => result.json())
  },
  getUserEmail(email){
    return fetch(`${remoteURL}/users?email=${email}`).then(result => result.json())
  },
  getAllMessages(resource) {
    return fetch(`${remoteURL}/${resource}`).then(result => result.json())
  },

  delete(resource, id) {
    return fetch(`${remoteURL}/${resource}/${id}`, {
      method: "DELETE"
    })
      .then(result => result.json())
  },
  post(resource, newResource) {
    return fetch(`${remoteURL}/${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newResource)
    }).then(data => data.json())
  },
  update(resource, editedResource) {
    return fetch(`${remoteURL}/${resource}/${editedResource.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedResource)
    }).then(data => data.json());
  }
}