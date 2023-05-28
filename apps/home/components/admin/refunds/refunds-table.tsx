import * as Tabs from '@radix-ui/react-tabs';
import ArrowDown from '@/icons/arrow-down-outline.svg'
import ArrowUp from '@/icons/arrow-up-outline.svg'
import useRefunds from '@/graphql/admin/refunds/refunds';
import RefundRequestCard from './refund-request-card';
import SearchIcon from '@/icons/search-outline.svg'
import ForwardIcon from '@/icons/chevron-forward-outline.svg'
import BackIcon from '@/icons/chevron-back-outline.svg'
import { useState, useEffect } from 'react';
// import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const RefundsTable = ()=>{
    const { data, error, isLoading } = useRefunds();
    const currentTabStyle = "border-b-2 border-red-500 transition duration-500 ease-in-out"
    const [currentTab, setCurrentTab] = useState("all")
    const [sortedData, setSortedData] = useState<any[]>([]);
    console.log(currentTab)
    useEffect(() => {
        if (data) {
          setSortedData(data);
        }
      }, [data]); 
      useEffect(() => {

      }, [sortedData]);
    const sortArray = (arr: any[], sortBy: string): any[] => {
        const sortedArray = [...arr];
        return sortedArray.sort((a, b) => {
          if (sortBy === 'name') {
            const nameA = a.user.name.toLowerCase();
            const nameB = b.user.name.toLowerCase();
            return nameA.localeCompare(nameB);
          } else if (sortBy === 'createdAt') {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateA.getTime() - dateB.getTime();
          } else if (sortBy === 'status') {
            const statusA = a.status.toLowerCase();
            const statusB = b.status.toLowerCase();
            return statusA.localeCompare(statusB);
          } else if (sortBy === 'amount') {
            return a.price - b.price;
          }
          return 0;
        });
      };
      if (error) {
        console.error('Error:', error);
        return <div>{error.message}</div>;
      }
    return(
        <div className="p-4 mx-72">
            <Tabs.Root className="TabsRoot" defaultValue="all" onValueChange={(value)=> setCurrentTab(value)}>
                
                <Tabs.List className="border-b">
                <div className='flex gap-8 my-2 p-2'>
                    <div className={`${currentTab === 'all'? currentTabStyle: ''}`}>
                        <Tabs.Trigger className='' value="all">
                            <h1 className='text-gray-500 text-base leading-6 font-medium'>All</h1>
                        </Tabs.Trigger>
                    </div>
                
                    <div className={`${currentTab === 'pending'? currentTabStyle: ''}`}>
                        <Tabs.Trigger className="TabsTrigger" value="pending">
                            <h1 className='text-gray-500 text-base leading-6 font-medium'>Pending</h1>
                        </Tabs.Trigger>
                    </div>
                    <div className={`${currentTab === 'accepted'? currentTabStyle: ''}`}>
                        <Tabs.Trigger className="TabsTrigger" value="accepted">
                            <h1 className='text-gray-500 text-base leading-6 font-medium'>Approved</h1>
                        </Tabs.Trigger>
                    </div>
                    <div className={`${currentTab === 'rejected'? currentTabStyle: ''}`}>
                        <Tabs.Trigger className="TabsTrigger" value="rejected">
                            <h1 className='text-gray-500 text-base leading-6 font-medium'>Rejected</h1>
                        </Tabs.Trigger>
                    </div>
        </div>
                
                </Tabs.List>
                <div className='my-3 flex bg-gray-100 rounded-xl px-2'>
                    <SearchIcon className='w-5' />
                    <input className='p-2 bg-gray-100 w-full' placeholder='Search by user name, email, or id'></input>
                </div>
                <div className='border-b'></div>
                <div className='flex justify-between py-4'>
                    <div className='flex justify-between gap-8'>
                        <input type='radio'></input>
                    <div className='flex gap-x-3'>
                        <p className='text-base text-gray-500 leading-6 font-medium'>User</p>

                        <button onClick={()=>{setSortedData(sortArray(data, "name"));console.log(sortedData)}}>
                        <div className='flex'>
                            <ArrowDown className="w-3 text-gray-500"/>
                            <ArrowUp className="w-3 text-gray-500"/>
                        </div>
                        </button>
                        
                    </div>
                    </div>
                    <div className='flex gap-x-3'>
                        <p className='text-base text-gray-500 leading-6 font-medium'>Date</p>

                        <button onClick={()=>{setSortedData(sortArray(data, "createdAt"));console.log(sortedData)}}>
                        <div className='flex'>
                            <ArrowDown className="w-3 text-gray-500"/>
                            <ArrowUp className="w-3 text-gray-500"/>
                        </div>
                        </button>
                    </div>
                    <div className='flex gap-x-3'>
                        <p className='text-base text-gray-500 leading-6 font-medium'>Status</p>

                        <button onClick={()=>{setSortedData(sortArray(data, "status"));console.log(sortedData)}}>
                        <div className='flex'>
                            <ArrowDown className="w-3 text-gray-500"/>
                            <ArrowUp className="w-3 text-gray-500"/>
                        </div>
                        </button>
                    </div>
                    <div className='flex gap-x-3'>
                        <p className='text-base text-gray-500 leading-6 font-medium'>Amount</p>

                        <button onClick={()=>{setSortedData(sortArray(data, "amount"));console.log(sortedData)}}>
                        <div className='flex'>
                            <ArrowDown className="w-3 text-gray-500"/>
                            <ArrowUp className="w-3 text-gray-500"/>
                        </div>
                        </button>
                    </div>
                </div>
                <div className='border-b'></div>

                

            <Tabs.Content className="" value="all">
            {isLoading? <h1>Loading...</h1>
                : 
                <>
                {sortedData.map((r: any, idx: number) => (<div className='flex gap-8 border-b'><input type='radio'></input><RefundRequestCard key={idx} name={r.user.name} refundId={r.id} email={r.user.email} date={r.createdAt} status={r.status} price={r.price} message={r.message} /></div>))}
                </>}
            </Tabs.Content>
            <Tabs.Content className="" value="pending">
            {isLoading? <h1>Loading...</h1>
                : 
                <>
                {sortedData.filter((r: any)=> r.status == "PENDING").map((r: any, idx: number)=> 
                    (<RefundRequestCard key={idx} name={r.user.name} refundId={r.id} email={r.user.email} date={r.createdAt} status={r.status} price={r.price} message={r.message} />)
                )}

            </>}
            </Tabs.Content>

            <Tabs.Content className="" value="accepted">
            {isLoading? <h1>Loading...</h1>
                : 
                <>
                {sortedData.filter((r: any)=> r.status == "ACCEPTED").map((r: any, idx: number)=> 
                    (<RefundRequestCard key={idx} name={r.user.name} refundId={r.id} email={r.user.email} date={r.createdAt} status={r.status} price={r.price} message={r.message} />)
                )}

            </>}
            </Tabs.Content>

            <Tabs.Content className="" value="rejected">
            {isLoading? <h1>Loading...</h1>
                : 
                <>
                {sortedData.filter((r: any)=> r.status == "REJECTED").map((r: any, idx: number)=> 
                    (<RefundRequestCard key={idx} name={r.user.name} refundId={r.id} email={r.user.email} date={r.createdAt} status={r.status} price={r.price} message={r.message} />)
                )}

            </>}
            </Tabs.Content>
            <div className='flex justify-between items-center py-8'>
                <div className='flex items-center gap-4'>
                    <p className='text-gray-900 font-medium'>Show result: </p>
                    <div className='p-2 border'>6</div>
                </div>
                <div className='flex gap-8 text-gray-500'>
                    <button><BackIcon className='w-4' /></button>
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>4</button>
                    <button>5</button>
                    <button><ForwardIcon className='w-4'/></button>
                    
                </div>
            </div>
        </Tabs.Root>
        </div>
    )
}

export default RefundsTable