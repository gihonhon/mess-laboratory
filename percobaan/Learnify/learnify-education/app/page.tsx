import Image from 'next/image'
import Navbar from '@/components/Navbar/Navbar'

export default function Home() {
  return (
    <div className="bg-white flex flex-row justify-center w-screen">
    <div className="bg-white overflow-hidden w-full h-[2203px] relative">
      <Navbar/>
      <div className="absolute w-full h-auto top-[91px] left-0">
        <div className="h-[420px] bg-[#af76aa]">
          <div className="relative w-[1148px] h-[396px] top-[12px] left-[146px] bg-[#af76aa]">
            <img
              className="absolute w-[380px] h-[328px] top-[34px] left-[675px] object-cover"
              alt="Rectangle"
              src="/catlike.jpeg"
            />
            <div className="absolute w-[488px] h-[362px] top-[20px] left-[71px]">
              <p className="absolute w-[443px] top-[159px] left-[20px] [font-family:'Inter-Medium',_Helvetica] font-medium text-white text-[20px] tracking-[0] leading-[normal]">
                Learnify gak hanya ngasih materi pelajaran, tapi juga fokus di bikin otak makin pinter dalam berpikir
              </p>
              <p className="absolute w-[428px] top-[40px] left-[20px] [font-family:'Inter-Bold',_Helvetica] font-bold text-white text-[26px] tracking-[0] leading-[normal]">
                #BikinBelajarMuEverywhere
                <br />
                untuk Jadi Apapun yang Kamu Mau!
              </p>
              <button className="absolute w-[149px] h-[43px] top-[274px] left-[20px] bg-[#fcc659] rounded-[10px] all-[unset] box-border">
                <div className="absolute w-[114px] h-[25px] top-[10px] left-[17px] font-semibold text-[#7c32a199] text-[16px] text-center tracking-[0] leading-[normal]">
                  Yuk, Ikutan!
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute w-screen h-[760px] top-[569px] left-0">
        <div className="relative w-full h-[504px] top-[134px] right-[-330px]">
          <img
            className="absolute w-[380px] h-[491px] top-[13px] left-[626px] object-cover"
            alt="Rectangle"
            src="/catlike.jpeg"
          />
          <div className="absolute w-[525px] h-[495px] top-0 left-0">
            <p className="absolute w-[523px] top-0 left-0 [font-family:'Inter-Bold',_Helvetica] font-bold text-[#7b1fa1] text-[26px] tracking-[0] leading-[normal]">
              Makin Jago Bernalar dan Lolos di Semua Latihan dan Ujian di Sekolah Bareng Learnify!
            </p>
            <div className="absolute w-[501px] h-[366px] top-[129px] left-[9px]">
              <div className="absolute w-[505px] h-[88px] top-0 left-0">
                <div className="absolute w-[87px] h-[87px] top-px left-0 rounded-[43.5px] [background:linear-gradient(180deg,_rgb(124,_50,_161)_0%,_rgba(124,_50,_161,_0)_100%)]">
                  <img
                    className="absolute w-[60px] h-[60px] top-[14px] left-[14px]"
                    alt="Medal first place"
                    src="/Medal_First_Place.png"
                  />
                </div>
                <p className="absolute w-[403px] top-[27px] left-[98px] [font-family:'Inter-Medium',_Helvetica] font-medium text-black text-[12px] tracking-[0] leading-[normal]">
                  Bayangin kamu jadi atlet, untuk sehat mungkin bisa usaha sendiri. Tapi untuk menang kompetisi, atlet
                  pasti pakai pelatih siapin segudang program latihan supaya kamu jadi juara.
                </p>
                <p className="absolute w-[395px] top-0 left-[98px] [font-family:'Inter-SemiBold',_Helvetica] font-semibold text-[#b789d2] text-[18px] tracking-[0] leading-[normal]">
                  Raih banyak juara kelas bareng Learnify!
                </p>
              </div>
              <div className="absolute w-[501px] h-[88px] top-[139px] left-0">
                <div className="absolute w-[87px] h-[87px] top-px left-0 rounded-[43.5px] [background:linear-gradient(180deg,_rgb(124,_50,_161)_0%,_rgba(124,_50,_161,_0)_100%)]">
                  <img
                    className="absolute w-[60px] h-[60px] top-[14px] left-[13px]"
                    alt="Head with brain"
                    src="/Head_With_Brain.png"
                  />
                </div>
                <p className="absolute w-[399px] top-[27px] left-[98px] [font-family:'Inter-Medium',_Helvetica] font-medium text-black text-[12px] tracking-[0] leading-[normal]">
                  Dengan mempelajari beragaram materi dan mengerjakan kuis yang ada dapat membantu kamu mengembangkan
                  dan meningkatkan kenalaran mu dalam mengerjakan soal-soal yang diberikan
                </p>
                <div className="absolute w-[395px] top-0 left-[98px] [font-family:'Inter-SemiBold',_Helvetica] font-semibold text-[#b789d2] text-[18px] tracking-[0] leading-[normal]">
                  Berlatih bernalar bareng Learnify
                </div>
              </div>
              <div className="absolute w-[501px] h-[88px] top-[278px] left-0">
                <div className="absolute w-[87px] h-[87px] top-px left-0 rounded-[43.5px] [background:linear-gradient(180deg,_rgb(124,_50,_161)_0%,_rgba(124,_50,_161,_0)_100%)]">
                  <img
                    className="absolute w-[60px] h-[60px] top-[14px] left-[12px]"
                    alt="Todo list"
                    src="/Todo_List.png"
                  />
                </div>
                <p className="absolute w-[399px] top-[27px] left-[98px] [font-family:'Inter-Medium',_Helvetica] font-medium text-black text-[12px] tracking-[0] leading-[normal]">
                  Semua aktivitas belajar kamu dapat kamu lakukan dimanasaja dan kapan saja bareng Learnify yang setia
                  menemani kamu meningkatkan semua tugas-tugas yang ada dengan memahami materi yang diberikan
                  Learnify.
                </p>
                <div className="absolute w-[395px] top-0 left-[98px] [font-family:'Inter-SemiBold',_Helvetica] font-semibold text-[#b789d2] text-[18px] tracking-[0] leading-[normal]">
                  Kamu dapat mengerjakan dimanasaja
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className="absolute w-screen h-[529px] top-[1387px] left-0">
        <div className="h-[529px] bg-[#af76aa]">
          <div className="relative w-[1150px] h-[460px] top-[34px] left-[296px]">
            <p className="absolute w-[457px] h-[41px] top-0 left-[31px] [font-family:'Inter-Bold',_Helvetica] font-bold text-white text-[26px] tracking-[0] leading-[normal]">
              Dapet Apa Aja di Learnify??
            </p>
            <div className="w-[534px] h-[372.11px] top-[40px] absolute">
              <div className="w-[534px] h-[372.11px] left-0 top-0 absolute bg-gradient-to-tl from-blue-500 to-blue-400 rounded-[20px]" />
              <img className="w-[267px] h-[200px] left-[255px] top-[72.37px] absolute" src="https://via.placeholder.com/267x200" />
              <img className="w-[267px] h-[194px] left-[255px] top-[141.37px] absolute" src="https://via.placeholder.com/267x194" />
              <div className="w-[196px] h-14 left-[17px] top-[219.37px] absolute text-white text-sm font-medium">siap nemenin belajar konsep kapan aja, di mana aja.<br/></div>
              <div className="w-[84px] h-[18px] left-[17px] top-[303.37px] absolute text-white text-opacity-80 text-[13px] font-medium">Lihat Detail</div>
              <div className="w-[149px] h-[25px] left-[17px] top-[187.37px] absolute text-yellow-400 text-lg font-bold">Materi Lengkap</div>
            </div>
            <div className="w-[534px] h-[372.11px] absolute top-[40px] left-[550px]">
              <div className="w-[534px] h-[372.11px] left-0 top-0 absolute bg-gradient-to-tl from-pink-500 to-rose-300 rounded-[20px]" />
              <img className="w-[130px] h-[130px] left-[339px] top-[100.05px] absolute origin-top-left rotate-[-14.73deg]" src="https://via.placeholder.com/130x130" />
              <img className="w-[166px] h-[166px] left-[308.06px] top-[67px] absolute origin-top-left rotate-[18.64deg]" src="https://via.placeholder.com/166x166" />
              <img className="w-[268px] h-[235px] left-[255px] top-[120px] absolute" src="https://via.placeholder.com/268x235" />
              <div className="w-[213px] h-14 left-[17px] top-[219px] absolute text-white text-sm font-medium">mengerjakan kuis setiap materi pembelajaran secara rutin supaya gak kaget waktu ujian.</div>
              <div className="w-[84px] h-[18px] left-[17px] top-[303.37px] absolute text-white text-opacity-80 text-[13px] font-medium">Lihat Detail</div>
              <div className="w-[149px] h-[25px] left-[17px] top-[187.37px] absolute text-yellow-400 text-lg font-bold">Kuis Setiap Saat</div>
            </div>
          </div>
        </div>
      </div>

      <footer className="absolute w-screen h-[237px] top-[1967px] -left-px bg-transparent overflow-hidden border border-solid border-[#7b1fa1]">
        <div className="w-[320px] top-[15px] left-[780px] text-[#7c32a1] absolute h-[45px] [font-family:'Inter-Regular',_Helvetica] font-normal text-[36px] tracking-[0] leading-[normal]">
          Learnify Education
        </div>
        <p className="absolute w-[726px] h-[95px] top-[60px] left-[556px] [font-family:'Inter-Regular',_Helvetica] font-normal text-black text-[18px] text-center tracking-[0] leading-[30px]">
          Learnify Education adalah website pembelajaran online yang bertujuan untuk menyediakan akses mudah dan
          efektif ke materi pembelajaran yang berkualitas dalam berbagai mata pelajaran.
        </p>
        <div className="absolute w-screen h-[52px] top-[183px] -left-px">
          <div className="absolute w-full h-[52px] top-0 left-0">
            <div className="relative w-full h-[52px] bg-[#7b1fa163]">
              <div className="absolute w-[288px] h-[29px] top-[13px] left-[18px] [font-family:'Inter-Regular',_Helvetica] font-normal text-black text-[15px] tracking-[0] leading-[normal]">
                Copyright ©2023 Learnifyeducation
              </div>
            </div>
          </div>
          <div className="absolute w-[166px] h-[33px] top-[15px] left-[1653px]">
            <div className="absolute w-[44px] h-[33px] top-0 left-0 [font-family:'Inter-Regular',_Helvetica] font-normal text-black text-[15px] tracking-[0] leading-[normal]">
              Home
            </div>
            <div className="absolute w-[44px] h-[33px] top-0 left-[58px] [font-family:'Inter-Regular',_Helvetica] font-normal text-black text-[15px] tracking-[0] leading-[normal]">
              About
            </div>
            <div className="absolute w-[44px] h-[33px] top-0 left-[116px] [font-family:'Inter-Regular',_Helvetica] font-normal text-black text-[15px] tracking-[0] leading-[normal]">
              Blog
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
  )
}
