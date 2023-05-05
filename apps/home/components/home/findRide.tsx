

const findRide = () => {
    return(
        <div className="px-5 py-5 mx-2 my-2 border-1 rounded-md shadow-lg">
            <div className="flex justify-between divide-x">
                <div>
                    <label>From</label>
                    <input placeholder="Departure" className="block placeholder:text-slate-400"></input>
                </div>
                <div>
                    <div className="ml-20">
                    <label>To</label>
                    <input placeholder="Destination" className="block placeholder:text-slate-400"></input>
                    </div>
                </div>
                <div>
                    <div className="ml-20">
                    <label>Travel Time</label>
                    <input placeholder="20 March at 14:06" className="block placeholder:text-slate-400"></input>
                    </div>
                </div>
                <div>
                    <div className="ml-20">
                    <label>Passengers</label>
                    <input placeholder="1 Adult" className="block placeholder:text-slate-400"></input>
                    </div>
                </div>
                <div>
                    <button className="px-5 py-3 bg-ring text-white rounded-md">Find a Ride</button>
                </div>
                
            </div>
        </div>
    )
}

export default findRide