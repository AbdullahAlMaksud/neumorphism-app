import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import './style.css';
import { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import toast, { Toaster } from 'react-hot-toast';
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { TbPhotoUp } from "react-icons/tb";
function App() {
  const [images, setImages] = useState([]);
  const swiperRef = useRef(null);


  const defaultImages = [
    "https://picsum.photos/800/600",
    "https://picsum.photos/800/800",
    "https://picsum.photos/1200/800",
    "https://picsum.photos/600/400",
    "https://picsum.photos/600/500",];

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const newImages = acceptedFiles.map((file) => URL.createObjectURL(file));
      setImages([...newImages, ...images]);
      toast.success(`${acceptedFiles.length} image(s) added successfully!`);
    }
  }, [images]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const [currentIndex, setCurrentIndex] = useState(0);


  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };
  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const displayedImages = images.length > 0 ? [...images, ...defaultImages] : defaultImages;

  return (
    <>
      <Toaster />

      <section className='bg-gradient-to-t to-[#282c31] from-[#191b1f] min-h-screen p-10 flex flex-col md:flex-row gap-4 shadow-inner shadow-black rounded-lg'>
        <textarea className='w-full min-h-60 md:w-1/2 bg-[#616161D1] p-10 focus:outline-none focus:border-2 rounded-[27px] border-[#96BEE7] border resize-none text-white'></textarea>

        <div className='w-full min-h-80 md:min-h-[calc(100vh-80px)] md:w-1/2 rounded-md flex flex-col gap-5'>

          {/* Tab Container */}
          <div className='w-full bg-[#363C43] h-1/2 min-h-80 lg:min-h-60 rounded-[18.9px] shadow-lg shadow-black relative'>


            {/* DesignElement */}
            <div className='absolute  right-5 h-full flex items-center'>
              <div className='h-20 bg-gradient-to-t to-[#888989] from-[#4A4E54] w-2 rounded-full shadow-md shadow-black e'>
              </div>
            </div>

            <div className='absolute left-5 h-full flex items-start pt-5'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M13.3846 18C13.3846 18.2738 13.3034 18.5415 13.1513 18.7692C12.9991 18.9969 12.7829 19.1744 12.5299 19.2792C12.2769 19.384 11.9985 19.4114 11.7299 19.358C11.4613 19.3046 11.2146 19.1727 11.0209 18.9791C10.8273 18.7854 10.6954 18.5387 10.642 18.2701C10.5886 18.0015 10.616 17.7231 10.7208 17.4701C10.8256 17.2171 11.0031 17.0009 11.2308 16.8487C11.4585 16.6966 11.7262 16.6154 12 16.6154C12.3672 16.6154 12.7194 16.7613 12.9791 17.0209C13.2387 17.2806 13.3846 17.6328 13.3846 18ZM12 5.53846C9.45462 5.53846 7.38462 7.40192 7.38462 9.69231V10.1538C7.38462 10.3987 7.48187 10.6334 7.65498 10.8066C7.82809 10.9797 8.06288 11.0769 8.3077 11.0769C8.55251 11.0769 8.7873 10.9797 8.96041 10.8066C9.13352 10.6334 9.23077 10.3987 9.23077 10.1538V9.69231C9.23077 8.42308 10.4735 7.38461 12 7.38461C13.5265 7.38461 14.7692 8.42308 14.7692 9.69231C14.7692 10.9615 13.5265 12 12 12C11.7552 12 11.5204 12.0972 11.3473 12.2704C11.1742 12.4435 11.0769 12.6783 11.0769 12.9231V13.8462C11.0769 14.091 11.1742 14.3258 11.3473 14.4989C11.5204 14.672 11.7552 14.7692 12 14.7692C12.2448 14.7692 12.4796 14.672 12.6527 14.4989C12.8258 14.3258 12.9231 14.091 12.9231 13.8462V13.7631C15.0277 13.3765 16.6154 11.6977 16.6154 9.69231C16.6154 7.40192 14.5454 5.53846 12 5.53846ZM24 12C24 14.3734 23.2962 16.6934 21.9776 18.6668C20.6591 20.6402 18.7849 22.1783 16.5922 23.0865C14.3995 23.9948 11.9867 24.2324 9.65892 23.7694C7.33115 23.3064 5.19295 22.1635 3.51472 20.4853C1.83649 18.807 0.693605 16.6689 0.230582 14.3411C-0.232441 12.0133 0.00519941 9.60051 0.913451 7.4078C1.8217 5.21508 3.35977 3.34094 5.33316 2.02236C7.30655 0.703788 9.62663 0 12 0C15.1816 0.00335979 18.2319 1.26872 20.4816 3.51843C22.7313 5.76814 23.9966 8.81843 24 12ZM22.1538 12C22.1538 9.99176 21.5583 8.02861 20.4426 6.35882C19.3269 4.68903 17.7411 3.38759 15.8857 2.61907C14.0303 1.85055 11.9887 1.64947 10.0191 2.04126C8.04943 2.43305 6.24019 3.40011 4.82015 4.82015C3.40011 6.24019 2.43305 8.04943 2.04126 10.0191C1.64947 11.9887 1.85055 14.0303 2.61907 15.8857C3.38759 17.7411 4.68904 19.3269 6.35883 20.4426C8.02862 21.5583 9.99176 22.1538 12 22.1538C14.692 22.1508 17.2729 21.08 19.1765 19.1765C21.08 17.2729 22.1508 14.692 22.1538 12Z" fill="url(#paint0_linear_2267_3329)" />
                <defs>
                  <linearGradient id="paint0_linear_2267_3329" x1="19.5" y1="27.5" x2="3.5" y2="2" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4A4E54" />
                    <stop offset="1" stopColor="#A3ADBA" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className='absolute left-5 h-full flex items-center'>
              <div className=' grid grid-cols-2 gap-0.5'>
                <div className='h-2 w-2 bg-[#4A4E54] rounded-[1.15px]' />
                <div className='h-2 w-2 bg-[#4A4E54] rounded-[1.15px]' />
                <div className='h-2 w-2 bg-[#4A4E54] rounded-[1.15px]' />
                <div className='h-2 w-2 bg-[#4A4E54] rounded-[1.15px]' />
                <div className='h-2 w-2 bg-[#4A4E54] rounded-[1.15px]' />
                <div className='h-2 w-2 bg-[#4A4E54] rounded-[1.15px]' />
              </div>
            </div>

            {/* Tabs Container */}
            <Tabs className="px-14 pt-5 absolute w-full">
              <TabList className="bg-[#171717] text-white rounded-[23px] flex gap-2 py-2 px-2 flex-col lg:flex-row items-center">
                <Tab className="w-full lg:w-40 rounded-2xl text-center py-2 hover:shadow-lg hover:shadow-black hover:cursor-pointer" selectedClassName="!bg-[#28292F] !text-white !shadow-xl !shadow-black !outline-none">About Me</Tab>
                <Tab className="w-full lg:w-40 rounded-2xl text-center py-2 hover:shadow-lg hover:shadow-black hover:cursor-pointer" selectedClassName="!bg-[#28292F] !text-white !shadow-xl !shadow-black !outline-none">Experiences</Tab>
                <Tab className="w-full lg:w-40 rounded-2xl text-center py-2 hover:shadow-lg hover:shadow-black hover:cursor-pointer" selectedClassName="!bg-[#28292F] !text-white !shadow-xl !shadow-black !outline-none">Recommended</Tab>
              </TabList>

              <TabPanel>
                <p className="text-[#969696] mt-3 max-h-[7.5rem] overflow-clip">Hello! I’m Dave, your sales rep here from Salesforce...</p>
              </TabPanel>
              <TabPanel>
                <p className="text-[#969696] mt-3 max-h-[7.5rem] overflow-clip">Compellingly integrate excellent applications...</p>
              </TabPanel>
              <TabPanel>
                <p className="text-[#969696] mt-3 max-h-[7.5rem] overflow-clip">Authoritatively pontificate compelling results...</p>
              </TabPanel>
            </Tabs>
          </div>

          {/* Horizontal Line */}
          <hr className='h-1 border-0 rounded-full shadow-md shadow-black bg-[#6F787C]' />

          {/* Image Upload & Slider */}
          <div className='w-full bg-[#363C43] h-1/2 min-h-[22rem] md:min-h-60 rounded-[18.9px] shadow-lg shadow-black relative'>

            {/* DesignElement */}
            <div className='absolute  right-5 h-full flex items-center'>
              <div className='h-20 bg-gradient-to-t to-[#888989] from-[#4A4E54] w-2 rounded-full shadow-md shadow-black e'>
              </div>
            </div>

            <div className='absolute left-5 h-full flex items-start pt-5'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M13.3846 18C13.3846 18.2738 13.3034 18.5415 13.1513 18.7692C12.9991 18.9969 12.7829 19.1744 12.5299 19.2792C12.2769 19.384 11.9985 19.4114 11.7299 19.358C11.4613 19.3046 11.2146 19.1727 11.0209 18.9791C10.8273 18.7854 10.6954 18.5387 10.642 18.2701C10.5886 18.0015 10.616 17.7231 10.7208 17.4701C10.8256 17.2171 11.0031 17.0009 11.2308 16.8487C11.4585 16.6966 11.7262 16.6154 12 16.6154C12.3672 16.6154 12.7194 16.7613 12.9791 17.0209C13.2387 17.2806 13.3846 17.6328 13.3846 18ZM12 5.53846C9.45462 5.53846 7.38462 7.40192 7.38462 9.69231V10.1538C7.38462 10.3987 7.48187 10.6334 7.65498 10.8066C7.82809 10.9797 8.06288 11.0769 8.3077 11.0769C8.55251 11.0769 8.7873 10.9797 8.96041 10.8066C9.13352 10.6334 9.23077 10.3987 9.23077 10.1538V9.69231C9.23077 8.42308 10.4735 7.38461 12 7.38461C13.5265 7.38461 14.7692 8.42308 14.7692 9.69231C14.7692 10.9615 13.5265 12 12 12C11.7552 12 11.5204 12.0972 11.3473 12.2704C11.1742 12.4435 11.0769 12.6783 11.0769 12.9231V13.8462C11.0769 14.091 11.1742 14.3258 11.3473 14.4989C11.5204 14.672 11.7552 14.7692 12 14.7692C12.2448 14.7692 12.4796 14.672 12.6527 14.4989C12.8258 14.3258 12.9231 14.091 12.9231 13.8462V13.7631C15.0277 13.3765 16.6154 11.6977 16.6154 9.69231C16.6154 7.40192 14.5454 5.53846 12 5.53846ZM24 12C24 14.3734 23.2962 16.6934 21.9776 18.6668C20.6591 20.6402 18.7849 22.1783 16.5922 23.0865C14.3995 23.9948 11.9867 24.2324 9.65892 23.7694C7.33115 23.3064 5.19295 22.1635 3.51472 20.4853C1.83649 18.807 0.693605 16.6689 0.230582 14.3411C-0.232441 12.0133 0.00519941 9.60051 0.913451 7.4078C1.8217 5.21508 3.35977 3.34094 5.33316 2.02236C7.30655 0.703788 9.62663 0 12 0C15.1816 0.00335979 18.2319 1.26872 20.4816 3.51843C22.7313 5.76814 23.9966 8.81843 24 12ZM22.1538 12C22.1538 9.99176 21.5583 8.02861 20.4426 6.35882C19.3269 4.68903 17.7411 3.38759 15.8857 2.61907C14.0303 1.85055 11.9887 1.64947 10.0191 2.04126C8.04943 2.43305 6.24019 3.40011 4.82015 4.82015C3.40011 6.24019 2.43305 8.04943 2.04126 10.0191C1.64947 11.9887 1.85055 14.0303 2.61907 15.8857C3.38759 17.7411 4.68904 19.3269 6.35883 20.4426C8.02862 21.5583 9.99176 22.1538 12 22.1538C14.692 22.1508 17.2729 21.08 19.1765 19.1765C21.08 17.2729 22.1508 14.692 22.1538 12Z" fill="url(#paint0_linear_2267_3329)" />
                <defs>
                  <linearGradient id="paint0_linear_2267_3329" x1="19.5" y1="27.5" x2="3.5" y2="2" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4A4E54" />
                    <stop offset="1" stopColor="#A3ADBA" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <section className="absolute flex justify-between items-center px-14 pt-5 w-full lg:gap-10 gap-5 flex-col lg:flex-row">
              <div className="w-full lg:w-[379px]">
                <div className="bg-[#171717] shadow-inner shadow-black text-white rounded-[23px] flex gap-2 py-2 px-2">
                  <span className="w-full rounded-2xl text-center py-2 ">Gallery</span>
                </div>
              </div>

              <div className="flex justify-between items-center w-full button-div rounded-2xl  active:scale-95" {...getRootProps()}>
                <input {...getInputProps()} className="addimagebutton text-center w-fit bg-blue-700" />
                {isDragActive ? <p>Drop the files here...</p> : <p className="add-image-text hover:cursor-pointer"><span className="hidden md:flex font-bold">+ Add Images</span> <span className="md:hidden text-2xl"><TbPhotoUp /></span></p>}
              </div>

              <div className="flex gap-2">
                <div className="button-div flex active:scale-95">
                  <button className="button flex items-center justify-center text-xl z-50" onClick={handlePrev}><IoArrowBack /></button>
                </div>
                <div className="button-div active:scale-95">
                  <button className="button z-50 flex items-center justify-center text-xl" onClick={handleNext}><IoArrowForward /></button>
                </div>
              </div>
            </section>

            {/* Swiper Thumbnail Slider */}
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              slidesPerView={3}
              spaceBetween={10}
              className="mySwiper absolute bottom-4 lg:bottom-8 left-14 right-14 flex justify-center items-center space-x-4"
            >
              {displayedImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`Image ${index}`}
                    className={`w-36 lg:min-w-[165px] md:h-[139px] h-28 object-cover cursor-pointer rounded-2xl shadow-lg ${currentIndex === index ? 'border-gray-300 border border-dashed' : ''}`}
                    onClick={() => setCurrentIndex(index)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Horizontal Line */}
          <hr className='h-1 border-0 rounded-full shadow-md shadow-black bg-[#6F787C]' />
        </div>
      </section>
    </>
  );
}

export default App;
