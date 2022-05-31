import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import RequestModel from "../database/RequestModel";
import UserModel from "../database/UserModel";
const pipedrive = require('pipedrive');
require("dotenv").config();
const secret: any = process.env.JWT_TOKEN;


const UserController = {
  async index(req: Request, res: Response): Promise<Response> {
    let users = await UserModel.find()
    return res.json(users)
  },

  async findByID(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    let user = await UserModel.findById(id)
    return res.json(user)
  },

  async register(req: Request, res: Response): Promise<Response> {
    const { token, name, email, password } = req.body
    let user = await UserModel.create({ token, name, email, password })
    const defaultClient = pipedrive.ApiClient.instance;
    let apiToken = defaultClient.authentications.api_key;
    apiToken.apiKey = token;
    return res.json(user)
    
  },

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body
    try {
      let user = await UserModel.findOne({ email })
      if(!user){
        return res.status(401).json({ error: 'User not found' })
      }else{
        if(user.password === password){
          const token = jwt.sign({email: email}, secret, { expiresIn: '1d' })
          return res.json({user:user, token: token})
        }else{
          return res.status(401).json({ error: 'Password does not match' })
        }
      }
    } catch(error){
      return res.json({ er: error })
    }
  },

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await UserModel.findByIdAndDelete(id);
    return res.json({ message: "User Deleted" });
  },

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { token, name, email, password } = req.body;
    let user = await UserModel.findByIdAndUpdate(id, { token, name, email, password }, { new: true });
    return res.json(user);
  },

  async allDeals(req: any, res: Response): Promise<Response> {
    const api = new pipedrive.DealsApi();
    api.apiClient.authentications.api_key.apiKey = req.user.token;
    const deals = await api.getDeals();
    const data = deals.data;
    if(data != null){
      data.forEach(async (e: any) => {
        const isAlreadyInDB = await RequestModel.findOne({ requestID: e.id })
        if(!isAlreadyInDB){
          let daySlipted = e.add_time.split(' ')[0];
          const dayNumber = daySlipted.split('-')[2];

          const request = new RequestModel({
            description: e.title,
            itemsQuantity: e.products_count,
            requestID: e.id,
            unityValue: e.value,
            sincDate: e.add_time,
            day: dayNumber,
            clientName: e.person_name,
            clientEmail: e.person_id.email,
            ownerID: req.user._id,
          }) 
          request.save() 
        }else{
          console.log("Already in DB")
        }
      })
    }
    return res.json(data)
  },

  async wonDeals(req: any, res: Response): Promise<Response> {
    const api = new pipedrive.DealsApi();
    api.apiClient.authentications.api_key.apiKey = req.user.token;
    const deals = await api.getDeals();
    const data = deals.data;
    if(data != null){
      const filterData = data.filter((deal: any) => deal.status === "won")
      return res.json(filterData)
    }else{
      return res.json(data)
    }
  },

  async allRequests(req: any, res: Response): Promise<Response> {
    const requests = await RequestModel.find({})
    return res.json(requests)
  },

  async deleteRequest(req: any, res: Response): Promise<Response> {
    const { id } = req.params
    const request = await RequestModel.findByIdAndDelete(id)
    return res.json(request)
  },


  async getDealByDay(req: any, res: Response): Promise<Response> {
    const { day } = req.params
    const requests = await RequestModel.find({ ownerID: req.user._id, day: day })
    if(requests != null){
      return res.json(requests)
    }else{
      return res.json({ message: "No requests found in this day" })
    }
    
  }

}

export default UserController