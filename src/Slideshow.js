import sanityClient from "./client.js"
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function Slideshow() {
    const [images, setImages] = React.useState([])
    function Fetch(){
        sanityClient
        .fetch(`*[released == true]{images}`)
            .then((data) => setImages(data.map((data) => {
                return data.images.map((data) => {
                    return data.asset._ref.replace("-png", ".png").replace("-jpg", ".jpg").replace("image-", "")
                })
            }).flat()))
            .then(console.log("hello"))
            .catch(console.error)
    }

    React.useEffect(() => {
        Fetch()
        setInterval(Fetch, 60000)
    }, images)

    return (
        <div className="container">
            <Swiper
                slidesPerView={1}
                loop={true}
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                delay: 1000,
                disableOnInteraction: false,
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {images.map((urls) => {
                    return (
                        <SwiperSlide><img src={`https://cdn.sanity.io/images/k7j9oa3e/production/${urls}`}></img></SwiperSlide>
                    )
                })}
        </Swiper>
        </div>
    )
}