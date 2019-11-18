const fetch = require("isomorphic-unfetch");

fetch("https://jsonbox.io/box_158f2a9b9a11831a724c/recipes")
  .then(async jsonStoreRes => {
    return jsonStoreRes.json().then(json => {
      return Promise.all(
        json.map(({ _id }) =>
          fetch(`https://jsonbox.io/box_158f2a9b9a11831a724c/${_id}`, {
            method: "DELETE"
          })
        )
      );
    });
  })
  .then(() => console.info("All recipes deleted"))
  .catch(error => console.error(error));
