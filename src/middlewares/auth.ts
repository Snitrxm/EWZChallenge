import { Response, Request} from 'express'

require('dotenv').config();
const secret: any = process.env.JWT_TOKEN;
import UserModel from "../database/UserModel";
import jwt from "jsonwebtoken";

const WithAuth = (req: any, res: Response, next: any) => {
  let token: any = req.headers["x-access-token"];
  if(!token){
    return res.status(401).json({ error: "No token provided" });
  }else{
    jwt.verify(token, secret, (err: any, decoded: any) => {
      if(err){
        return res.status(401).json({error: 'Token invalid'});
      } else{
        req.email = decoded.email;
        UserModel.findOne({email: decoded.email})
        .then(user => {
          req.user = user;
          next();
        }).catch(err => {
          res.status(401).json({error: err});
        })
      }
    })
  }
}

export default WithAuth;