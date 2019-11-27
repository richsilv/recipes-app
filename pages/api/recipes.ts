import { NextApiRequest, NextApiResponse } from "next";
import fetch from "isomorphic-unfetch";

const jsonboxId = process.env.JSONBOX_ID;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    fetch(`https://jsonbox.io/${jsonboxId}/recipes`, {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(jsonStoreRes => {
        jsonStoreRes
          .json()
          .then(json => {
            res.status(201).json(json);
          })
          .catch(error => {
            console.error("Oh no!", error);
            return res
              .status(jsonStoreRes.status)
              .send(jsonStoreRes.statusText);
          });
      })
      .catch(error => {
        console.error(error);
        res.status(500).send("Cannot reach JSONBox API");
      });
  } else if (req.method === "PATCH") {
    fetch(`https://jsonbox.io/${jsonboxId}/recipes/${req.body._id}`, {
      method: "PUT",
      body: JSON.stringify(req.body),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(jsonStoreRes => {
        jsonStoreRes
          .json()
          .then(json => {
            res.status(200).json(json);
          })
          .catch(error => {
            console.error("Oh no!", error);
            return res
              .status(jsonStoreRes.status)
              .send(jsonStoreRes.statusText);
          });
      })
      .catch(error => {
        console.error(error);
        res.status(500).send("Cannot reach JSONBox API");
      });
  } else if (req.method === "DELETE") {
    fetch(`https://jsonbox.io/${jsonboxId}/recipes/${req.body._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(_ => {
        res.status(204).end();
      })
      .catch(error => {
        console.error(error);
        res.status(500).send("Cannot reach JSONBox API");
      });
  } else if (req.method === "GET") {
    return getRecipes()
      .then(jsonStoreRes => {
        jsonStoreRes
          .json()
          .then(json => {
            res.status(200).json(json || []);
          })
          .catch(error => {
            return res
              .status(jsonStoreRes.status)
              .send(jsonStoreRes.statusText);
          });
      })
      .catch(error => {
        console.error(error);
        res.status(500).send("Cannot reach JSONBox API");
      });
  } else {
    res.status(404).send("Not found");
  }
};

export function getRecipes() {
  return fetch(`https://jsonbox.io/${jsonboxId}/recipes`);
}
