import { User } from "@prisma/client"

const isAdmin = (user: User) => {
    return user.role == "ADMIN"    
}

export default isAdmin