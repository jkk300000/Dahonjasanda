import axios from "axios";
import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { SwiperSlide } from "swiper/react";
import PartyCard from "./PartyCard";


const PartyForMain = () => {
    const [parties, setParties] = useState();

    useEffect(() => {
        getPartyList()
    }, [])


    const getPartyList = async() => {
        try{
            const response = await axios.get(`http://localhost/parties?size=10`,  { withCredentials: true });
            
            console.log("메인에 리스판스",response)
            setParties(response.data.content)
        } catch (e){
            console.log("매안에 파티 에러",e)
        }
    }

    return (
        <div>
            <SwiperSlide
                className="d-flex"
                scrollbar={{ draggable: true }}
                style={{ maxWidth: "100%", overflowX: "auto" }}

                >
                {parties &&
                    Object.keys(parties).map((key) => {
                    const subgroup = parties[key];
                    return (
                        <Col key={key} xs={6} md={4} xl={3} className="my-3 mx-3">
                        <PartyCard className={"mx-2"}
                            onClick={e => location.href = `/party/${subgroup.id}`}
                            key={key}
                            subgroupId={subgroup.id}
                            images={
                            subgroup.thumbnail
                                ? [
                                    [
                                    `http://localhost/parties/images/${subgroup.thumbnail}`,
                                    400,
                                    260,
                                    "Image",
                                    ],
                                ]
                                : // Add more images to the array to display a carousel
                                [
                                    [
                                    "/images/job-board/about/faq.jpg",
                                    300,
                                    200,
                                    "Image",
                                    ],
                                ]
                            }
                            title={subgroup.title}
                            price={
                            subgroup.category +
                            " - " +
                            subgroup.categoryDetail
                            }
                            location={subgroup.activityArea}
                            footer={
                            <div
                                style={{ overflowY: "auto", maxHeight: "50px" }}
                            >
                                {subgroup.briefIntroduction}
                            </div>
                            } // 스크롤처리
                            // style={{ maxHeight: "350px", cursor: "pointer" }}
                            style={{ width: '100%', maxHeight: '550px', cursor: 'pointer'}}
                        />
                        </Col>
                    );
                    })}
                </SwiperSlide>
            </div>
    )
}

export default PartyForMain