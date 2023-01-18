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
import Clock from 'react-live-clock';

export default function Slideshow() {
    const [images, setImages] = React.useState([])
    const [news, setNews] = React.useState([])
    function FetchWaag(){
        sanityClient
        .fetch(`*[released == true]{images}`)
            .then((data) => setImages(data.map((data) => {
                return data.images.map((data) => {
                    return data.asset._ref.replace("-png", ".png").replace("-jpg", ".jpg").replace("image-", "")
                })
            }).flat()))
            .catch(console.error)
    }

    function FetchNews(){
        sanityClient
        .fetch(`*[_type == "news"]`)
            .then((data) => setNews(data.map((data) => {
                return (
                    {
                        title: data.title,
                        body: data.content[0].children[0].text
                    }
                )
            })))
            .then(console.log(news))
            .catch(console.error)
    }

    React.useEffect(() => {
        FetchNews()
        FetchWaag()
        setInterval(FetchWaag, 60000)
    }, images)

    return (
        <div className="container">
            <div className="info-container"></div>
            <Clock format={'h:mm'} ticking={true} timezone={'US/Eastern'} />
            <Clock className="date" format={'dddd, MMMM Mo'}/>
            <div className="news">
                {
                    news.map((data) => {
                        return (
                            <div className="news-item">
                                <div className="news-title">{data.title}</div>
                                <div className="news-body">{data.body}</div>
                            </div>
                        )
                    })
                }
            </div>
    
            <div className="note">Work in progress! Please contact Darian for suggestions.</div>
        <Swiper
                slidesPerView={1}
                loop={true}
                spaceBetween={30}
                centeredSlides={false}
                autoplay={{
                delay: 5000,
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