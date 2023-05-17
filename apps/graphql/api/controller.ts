import { Request, Response } from 'express'

import { PrismaClient } from '@prisma/client'

export const verify = async (req: Request, res: Response) => 
{

  try {
    const prisma = new PrismaClient({
      errorFormat: 'pretty',
    })
    const id = req.params.link

    const token = await prisma.magicToken.findUnique({
      where: {
        id: id,
      },
      select: {
        expiryDate: true,
      },
    })
  
    const expiryDate = token?.expiryDate as Date
    expiryDate > new Date() ? res.status(200).send('success') : res.status(400).send('Link expired please try again')  
  }
  catch (e){
    res.status(400).send(e.message)
  }


}
