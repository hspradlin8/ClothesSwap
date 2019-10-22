// const remoteURL = "http://localhost:5002"

// export default {
//     get(id) {
//         return fetch(`${remoteURL}/items/${id}`).then(result => result.json())
//     },
//     getAll() {
//         return fetch(`${remoteURL}/items`).then(result => result.json())
//     },
//     post(newItem) {
//         return fetch(`${remoteURL}/items`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(newItem)
//         }).then(data => data.json())
//     },
//     delete(id) {
//         return fetch(`${remoteURL}/items/${id}`, {
//             method: "DELETE"
//         })
//             .then(result => result.json())
//     },
//     update(editedItem) {
//         return fetch(`${remoteURL}/items/${editedItem.id}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(editedItem)
//         }).then(data => data.json());
//     }
// }
