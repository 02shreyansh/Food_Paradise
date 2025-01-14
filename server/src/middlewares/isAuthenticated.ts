import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
declare global{
    namespace Express {
        interface Request {
            id:string;
        }
    }
}
export const isAuthenticated=async(req:Request,res:Response,next:NextFunction):Promise<any>=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:'User is Unauthorized',
                error:'No token provided'
            });
        }
        const decode=await jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;
        if(!decode){
            return res.status(401).json({
                message:'User is Unauthorized',
            })
        }
        req.id=decode.userId;
        next();
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }
}