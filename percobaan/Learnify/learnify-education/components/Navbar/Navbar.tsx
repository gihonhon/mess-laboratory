import React from 'react'

export default function Navbar() {
  return (
    <div className="relative w-full h-[91px] bg-[#7c32a1]">
    <h1 className="absolute w-[152px] h-[45px] top-[22px] left-[57px] font-normal text-white text-[26px] tracking-normal leading-normal">
      Learnify
    </h1>
    <div className="w-[94px] top-[32px] left-[256px] absolute h-[36px]">
      <div className="relative w-[92px] h-[36px]">
        <div className="w-[73px] top-0 left-0 [font-family:'Inter-Regular',_Helvetica] font-normal text-white text-[24px] tracking-[0] leading-[normal] absolute h-[36px]">
          Kelas
        </div>
        <img className="left-[70px] absolute w-[22px] h-[22px] top-[4.5px]" alt="Sort down" src="/Sort_Down.png" />
      </div>
    </div>
    <div className="w-[75px] top-[32px] left-[560px] absolute h-[36px]">
      <div className="w-[73px] top-0 left-0 [font-family:'Inter-Regular',_Helvetica] font-normal text-white text-[24px] tracking-[0] leading-[normal] absolute h-[36px]">
        Blog
      </div>
    </div>
    <div className="w-[120px] top-[32px] left-[395px] absolute h-[36px]">
      <div className="w-[96px] top-0 left-0 [font-family:'Inter-Regular',_Helvetica] font-normal text-white text-[24px] tracking-[0] leading-[normal] absolute h-[36px]">
        Subject
      </div>
      <img className="left-[96px] absolute w-[22px] h-[22px] top-[4.5px]" alt="Sort down" src="/Sort_Down.png" />
    </div>
    <div className="absolute w-[126px] h-[36px] top-[32px] left-[1683px]">
      <div className="relative w-[124px] h-[36px] bg-[#ffffffb2] rounded-[10px]">
        <div className="absolute w-[110px] h-[25px] top-[6px] left-[7px] font-medium text-[#7c32a1] text-[15px] text-center tracking-[0] leading-[normal]">
          Masuk/Daftar
        </div>
      </div>
    </div>
    <img className="absolute w-[37px] h-[37px] top-[32px] left-[1619px]" alt="Search" src="/Search.png" />
  </div>
  )
}
