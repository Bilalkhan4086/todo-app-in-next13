import type { NextApiRequest, NextApiResponse } from "next";
import Todo from "../../models/todo";
import dbConnect from "../../lib/dbconnect";

interface UpdateObjType {
  title?: string;
  is_done?: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  dbConnect();
  let response: unknown;
  if (req.method === "GET") {
    response = await Todo.find({});
  } else if (req.method === "POST") {
    const bodyParser = JSON.parse(req.body);
    // const bodyParser = req.body;
    response = await Todo.create({
      title: bodyParser.title,
      is_done: false,
    });
    console.log("response", response);
  } else if (req.method === "PUT") {
    const bodyParser = JSON.parse(req.body);
    // const bodyParser = req.body;

    const queryParser = req.query;
    response = await Todo.updateOne(
      { _id: queryParser.id },
      {
        $set: {
          title: bodyParser.title,
          is_done: bodyParser.is_done,
        },
      }
    );
  } else if (req.method === "DELETE") {
    const queryParser = req.query;
    response = await Todo.deleteOne({ _id: queryParser.id });
  }
  return res.status(200).json(response);
}
