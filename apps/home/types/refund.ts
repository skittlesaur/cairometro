interface Refund {
  status: string;
  id: string
  user: {
    name: string
    email: string
  }
  createdAt: Date
  price: number
  message: string
}

export default Refund