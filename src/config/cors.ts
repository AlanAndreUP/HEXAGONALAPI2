import {Request, Response, NextFunction } from "express"

const cors = ( _: Request, res: Response, next: NextFunction) => {
    res.set()
    
    next()
}

export default cors