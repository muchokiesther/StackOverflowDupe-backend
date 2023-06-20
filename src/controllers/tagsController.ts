import { Request, RequestHandler, Response } from "express"
import { Tag, tagsExtendedRequest} from "../interfaces"
import {DatabaseHelper} from  '../DatabaseHelpers';



export const getAllTags = async (req: Request, res: Response) => {
    try {
      let tags: Tag[] = (await DatabaseHelper.exec('getAllTags')).recordset;
      res.status(200).json(tags);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  };
  



