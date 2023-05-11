import Ticket from '../ticket'

const Discover = ()=>{

  return (

    <div className="w-full flex flex-col items-center gap-8">
      <div className="">
        <h1 className="text-5xl text-center font-semibold ">Not sure where to discover?</h1>
        <h2 className="text-xl text-center font-normal text-neutral-400  ">Here are some suggestions based on your current location</h2>
      </div>
      <Ticket
        departure="Sadat"
        arrival="Maadi"
        arrivalTime="12:30 pm"
        departureTime="12:07 pm"
        href="#"
        price={5}
        stations={7}
      /> 

      <Ticket
        departure="Kit-Kat"
        departureTime="11:26pm"
        arrival="Adly Mansour"
        arrivalTime="12:12am"
        href="#"
        price={10}
        stations={23}
      />

      <Ticket
        departure="Safaa Hegazi"
        departureTime="11:30pm"
        arrival="Shubra El-Kheima"
        arrivalTime="11:59pm"
        href="#"
        price={7}
        stations={11}
      />
      
    </div>
  )
}

export default Discover