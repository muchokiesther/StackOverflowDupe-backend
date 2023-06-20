import mssql from 'mssql'
import { Request, RequestHandler, Response } from "express"
import {v4 as uid} from 'uuid'
import { User, votesExtendedRequest} from "../interfaces";
import {DatabaseHelper} from  '../DatabaseHelpers';

export const upVote= async (req: votesExtendedRequest, res: Response) => {

    try {
        const {answerId, userId  } = req.params;
        const voteId = uid(); 
      
        (await DatabaseHelper.exec('Upvoting', {
          voteId,
          answerId,
          userId
    
        })).recordset;
    
        res.status(201).json({ message: 'Upvoted' });
      } catch (error) {
        console.error('Error adding vote:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    };

    export const downVote= async (req: votesExtendedRequest, res: Response) => {

        try {
            const {answerId, userId  } = req.params;
            const voteId = uid(); 
          
            (await DatabaseHelper.exec('downvote', {
              voteId,
              answerId,
              userId
        
            })).recordset;
        
            res.status(201).json({ message: 'downvoted' });
          } catch (error) {
            console.error('Error down voting:', error);
            res.status(500).json({ error: 'Internal server error' });
          }
        };
    
