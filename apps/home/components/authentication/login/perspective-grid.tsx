import Radial from '@/components/radial-animation'
import Location from '@/icons/location.svg'

const PerspectiveGrid = () => {
  return (
    <div
      className="absolute w-[calc(100%+26em)] h-full bottom-0 top-0 -translate-y-24"
      style={{ perspective: '500px' }}
    >

      <div className="absolute left-0 right-0 bottom-0 top-[25%] bg-gradient-to-b from-white via-transparent to-transparent z-0" />

      <Location
        className="absolute fill-primary w-10 top-[34.7%] right-[33.9%] "
      />

      {/* <Location
        className="absolute fill-green-500 w-10 top-[34.7%] left-[62.8%] "
      />  */}

      <div className="absolute bg-green-500 w-1 h-10 top-[34.7%] left-[62.8%] " />
     
      <div className="absolute left-[47.4%] bottom-0 z-[1]">
        <Radial character="M" />
      </div>
     
      <div
        className="absolute w-full h-full left-0 bottom-0 z-[-1]"
        style={{ transform: 'rotateX(45deg)' }}
      >

        <Location
          className="absolute fill-blue-500 w-10 top-[28%] left-[65.2%] "
          
        />

        <div className="absolute top-[31.8%] right-[32.1%] w-6 h-6 rounded-full bg-neutral-500 " />
        <div id="Glowing lines">
          <div className="absolute border-primary h-[23%] border-2 border-solid left-[49.89%] bottom-[10%] z-[-3]" />
          <div className="absolute border-primary w-[17%] border-2 border-solid left-[49.89%] bottom-[33%] z-[-3]" />
          <div className="absolute border-primary h-[35%] border-2 border-solid right-[33%] bottom-[33%] z-[-3]" />
        </div>

        <div id="vertical lines">
          <div className="absolute h-full border-2 border-solid  z-[-5]" />
          <div className="absolute h-full border-2 border-solid left-[33%] z-[-5]" />
          <div className="absolute h-full border-2 border-solid left-[16%] z-[-5]" />
          <div className="absolute h-full border-2 border-solid left-[49.89%] z-[-5]" />
          <div className="absolute h-full border-2 border-solid right-[33%] z-[-5]" />
          <div className="absolute h-full border-2 border-solid right-[16%]  z-[-5]" />
          <div className="absolute h-full border-2 border-solid" />
        </div>

        <div id="horizontal lines">
          <div className="absolute w-full border-2 border-solid z-[-5]" />
          <div className="absolute w-full border-2 border-solid top-[33%] z-[-5]" />
          <div className="absolute w-full border-2 border-solid top-[16%] z-[-5]" />
          <div className="absolute w-full border-2 border-solid top-[50%] z-[-5]" />
          <div className="absolute w-full border-2 border-solid bottom-[33%] z-[-5]" />
          <div className="absolute w-full border-2 border-solid bottom-[16%]  z-[-5]" />
          <div className="absolute w-full border-2 border-solid  " />
        </div>

        <div id="Vertical moving lines">
          {/* <div
            className="absolute border-red-600 border-2 border-solid rounded-full h-[75px] top-[100%]  animate-moveDotVertical1"
          /> */}
          <div
            className="absolute border-red-600 border-2 border-solid rounded-full h-[75px] top-[100%] left-[33%] animate-moveDotVertical2"
          />
          <div
            className="absolute border-red-600 border-2 border-solid rounded-full h-[75px] top-[100%] left-[16%] animate-moveDotVertical3"
          />
          <div
            className="absolute border-red-600 border-2 border-solid rounded-full h-[75px] top-[100%] right-[16%] animate-moveDotVertical6"
          />
   
          <div
            className="absolute border-red-600 border-2 border-solid rounded-full h-[75px] top-[100%] animate-moveDotVertical7"
          />
        </div>

        <div id="Horizontal moving lines">
          <div
            className="absolute border-red-600 border-2 border-solid rounded-full w-[75px] right-[200%] animate-moveDotHorizontal1"
          />
          <div
            className="absolute border-red-600 border-2 border-solid rounded-full w-[75px]  right-[200%] top-[33%] animate-moveDotHorizontal2 "
          />
          <div
            className="absolute border-red-600 border-2 border-solid rounded-full w-[75px]  right-[200%] top-[16%] animate-moveDotHorizontal3"
          />
          <div
            className="absolute border-red-600 border-2 border-solid rounded-full w-[75px] right-[200%] top-[50%]  animate-moveDotHorizontal4"
          />
          <div
            className="absolute border-red-600 border-2 border-solid rounded-full w-[75px] right-[200%] bottom-[16%] animate-moveDotHorizontal6"
          />
   
          <div
            className="absolute border-red-600 border-2 border-solid rounded-full w-[75px] right-[200%] bottom-[0%]animate-moveDotHorizontal7"
          />
        </div>

    
      </div>
    </div>
  )
}

export default PerspectiveGrid



{/* <div className="absolute h-full border-2 border-solid  z-[-5]" />
<div className="absolute h-full border-2 border-solid left-[12em] z-[-5]" />
<div className="absolute h-full border-2 border-solid left-[24.7em] z-[-5]" />
<div className="absolute h-full border-2 border-solid left-[37.2em] z-[-5]" />
<div className="absolute h-full border-2 border-solid right-[24.7em] z-[-5]" />
<div className="absolute h-full border-2 border-solid right-[12em]  z-[-5]" />
<div className="absolute h-full border-2 border-solid" /> */}

{/* <div id="vertical lines">
<div className="absolute h-full border-2 border-solid  z-[-5]" />
<div className="absolute h-full border-2 border-solid left-[12em] z-[-5]" />
<div className="absolute h-full border-2 border-solid left-[24.8em] z-[-5]" />
<div className="absolute h-full border-2 border-solid left-[37.4em] z-[-5]" />
<div className="absolute h-full border-2 border-solid right-[24.8em] z-[-5]" />
<div className="absolute h-full border-2 border-solid right-[12em]  z-[-5]" />
<div className="absolute h-full border-2 border-solid" />
</div>

<div id="horizontal lines">
<div className="absolute w-full border-2 border-solid z-[-5]" />
<div className="absolute w-full border-2 border-solid top-[7.2em] z-[-5]" />
<div className="absolute w-full border-2 border-solid top-[14.7em] z-[-5]" />
<div className="absolute w-full border-2 border-solid top-[22.3em] z-[-5]" />
<div className="absolute w-full border-2 border-solid bottom-[14.7em] z-[-5]" />
<div className="absolute w-full border-2 border-solid bottom-[7.2em]  z-[-5]" />
<div className="absolute w-full border-2 border-solid  " />
</div> */}

{/* <div
className="absolute w-[calc(100vw-25em)] h-full -translate-y-24 z-0"
style={{ perspective: '500px' }}
>

<div className="absolute left-0 right-0 bottom-0 top-[25%] bg-gradient-to-b from-white via-transparent to-transparent z-0" />

<Location
  className="absolute fill-primary w-10 top-[34.7%] right-[33.9%] " 
/>

<div
  className="absolute w-full h-full left-0 bottom-0 z-[-1]"
  style={{ transform: 'rotateX(45deg)' }}
>

  <div className="absolute top-[31.8%] right-[32.1%] w-6 h-6 rounded-full bg-neutral-500 " />
  <div id="Glowing lines">
    <div className="absolute border-primary h-[23vh] border-2 border-solid left-[49.89%] bottom-[10%] z-[-3]" />
    <div className="absolute border-primary w-[12.5vw] border-2 border-solid left-[49.89%] bottom-[33%] z-[-3]" />
    <div className="absolute border-primary h-[35vh] border-2 border-solid right-[33%] bottom-[33%] z-[-3]" />
  </div> */}