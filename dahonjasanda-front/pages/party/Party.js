import { Button, Card, Col, Container, Dropdown, Form, FormControl, FormGroup, InputGroup, Row } from 'react-bootstrap';
import VenueCardOverlay from '../../components/VenueCardOverlay'
import { Main } from '../../layouts';
import heroImg from '../../public/images/myImages/partyHero.jpg'
import { categories, area } from './categoryButton';

import { useEffect, useState } from 'react';
import axios from 'axios';
import PartyCard from './components/PartyCard';
import PageComponent from '../loan/components/PageComponent';

const Party = () => {
    const [loginInfo, setLoginInfo] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [interestedParties, setInterestedParties] = useState([])

    const [subgroups, setSubgroups] = useState([])
    const [resultSize, setResultSize] = useState(0)
    const [selectedCategory, setSelectedCategory] = useState([])
    const [keyword, setKeyword] = useState('')
    const [selectedArea, setSelectedArea] = useState('')
    // const [selectedPage, setSelectedPage] = useState(0)
    const [selectedSort, setSelectedSort] = useState('sort=createdTime,desc')
    const [pageNumber, setPageNumber] = useState();
    const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    const getLoginInfo = async () => {
        try {
            var response = await axios.get('http://localhost/memberRest/loginInfo', 
                                                            { withCredentials: true });
            console.log(response)
            if (response.data.result === true) {
                setLoginInfo(response.data.member);
                setIsLoggedIn(true)
                console.log("여기 찍혔나???")
            } else {
              setIsLoggedIn(false)
            }
        } catch (e) {
            console.log(e);
        }
    }

    getPartyList();
    getLoginInfo();
  },[]);

    useEffect(() => {
        
        {loginInfo && getInterestedPartyIds();}
    }, [loginInfo])
  
    useEffect(() => {
        getPartyList();
    }, [pageNumber, selectedSort])

  const getPartyList = async() => {
     
        let condition = "?";
        {selectedSort && (condition += selectedSort)}
       condition += ("&page=" + pageNumber)
        {keyword && (condition += ("&keyword=" + keyword))}
        {selectedArea && (condition += ("&activityArea=" + selectedArea))}
        {selectedCategory && (
            selectedCategory.map((category) => {
                condition += "&categories=" + category
            }
        ))}
        console.log("콘디션이다 ", condition);
        try{
            const response = await axios.get(`http://localhost/parties${condition}`,  { withCredentials: true });
            
            console.log("파티안에 리스판스",response)
            setSubgroups(response.data.content)
            setPageNumber(response.data.pageable.pageNumber)
            setTotalPages(response.data.totalPages)
            setResultSize(response.data.totalElements)
        } catch (e){
            console.log("파티 에러",e)
        }
    }

    const addInterestedParty = async (partyId) => {
       try {
            const response = await axios.post(`http://localhost/parties/members/${loginInfo.mno}/interested-parties/${partyId}`,null,  { withCredentials: true });
            console.log("좋아요 응답",response)
            getInterestedPartyIds();
       } catch (e) {
            console.log("좋아요 도중 에러", e)
       }
        
    }

    const deleteInterestedParty = async (partyId) => {
       try {
            const response = await axios.delete(`http://localhost/parties/members/${loginInfo.mno}/interested-parties/${partyId}`,  { withCredentials: true });
            console.log("좋아요 해제 응답",response)
            getInterestedPartyIds();
       } catch (e) {
            console.log("좋아요 해제 도중 에러", e)
       }
        
    }
    
    const getInterestedPartyIds = async () => {
        try {
            const response = await axios.get(`http://localhost/parties/members/${loginInfo.mno}/interested-party-ids`,  { withCredentials: true });
            console.log("좋아요 리스트 응답",response)
            setInterestedParties(response.data.data)
       } catch (e) {
            console.log("좋아요 리스트 도중 에러", e)
       }
    }

    const toggleCategory = (category) => {
        if (selectedCategory.includes(category)) {
            setSelectedCategory(selectedCategory.filter((item) => item !== category));
        } else {
            setSelectedCategory([...selectedCategory, category]);
        }
    };


    return (
        <>
        <Main>
        <VenueCardOverlay
        style={{height:"500px"}}
            img={{
                src:heroImg,

                // ../../public/images/myImages/partyHero.jpg
                alt: 'Background image'
            }}
            title=''
            // overlay // Optional overlay prop to add contrast to the content against background image
            > </VenueCardOverlay>
            <div style={{ position: 'absolute', top: '30%', left: '10%', transform: 'translate(-50%, -50%)' }}>
                <h1 className='text-white'>소 모 임</h1>
            </div>
            {isLoggedIn && (<div style={{position: 'absolute', top: '30%', left: '85%', transform: 'translate(-50%, -50%)' , border: "1px solid black", borderRadius: "10px"}}>
                <div className='d-flex justify-content-between align-items-center w-100'>
                    <Button  style={{height:"90px", width:"100%", zIndex:"100"}} variant='warning' onClick={() => location.href="/party/create/"}>
                        <h4 style={{color: "white"}}>모임 만들기</h4>
                    </Button>
                </div>
            </div>)}
           
            <div className='col-10 p-4 mx-auto' style={{backgroundColor: 'white', borderRadius: '10px', left: '20px', position: 'relative', top: '-200px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)', zIndex:"99" }}>
                <div>
                    <FormGroup className='d-block d-md-flex rounded-md-pill mb-5 mb-sm-4'>
                        <InputGroup size='lg' className='border-end-md'>
                            <Form.Select aria-label="Default select example"  style={{ maxWidth: '150px' }}
                              onChange={(e)=>setSelectedArea(e.target.value)} value={selectedArea}>
                                        <option value="">지역 선택</option>
                                {area.map((value, indx) => {
                                    return (
                                        <option key={indx} value={value}>{value}</option>
                                    )
                                })}
                            </Form.Select>
                        <FormControl aria-label='Search field' value={keyword} onChange={(e)=>setKeyword(e.target.value)} placeholder='소모임을 검색해보세요'/>
                        </InputGroup>
                        <hr className='d-md-none my-2' />
                        <div className='d-sm-flex'>
                        
                            <Button size='lg' variant='info' className='rounded-pill w-100 w-md-auto ms-sm-3' onClick={getPartyList}>검색하기</Button>
                        </div>
                    </FormGroup>
                </div>


                <hr></hr>
                <div className='d-flex flex-wrap justify-content-start'>
                    {Object.keys(categories).map((key, indx) => {
                        const icon = categories[key];
                        return (
                            <Button key={indx}
                                variant={selectedCategory.includes(key) ? 'info' : 'light'}
                                style={{ maxWidth: "100px", margin: "10px" }} // 버튼 사이의 간격을 위해 margin 추가
                                onClick={() => toggleCategory(key)}
                            >
                                <div className={`${selectedCategory.includes(key) ? 'bg-info' : 'bg-secondary'} rounded-circle text-center w-300 h-100 text-nowrap p-3`}>
                                    <i className={icon}></i>
                                    <span> {key}</span>
                                </div>
                            </Button>
                        )
                    })}
                </div>
            </div>
            
            <div className='col-10 mx-auto' style={{top: "-70px", position: 'relative'}}>
                <div className='d-flex flex-sm-row flex-column align-items-sm-center align-items-stretch'>
                    <Form.Group controlId='sortby' className='d-flex align-items-center flex-shrink-0'>
                        <Form.Label className='text-body fs-sm me-2 mb-0 pe-1 text-nowrap'>
                        <i className='fi-arrows-sort text-muted mt-n1 me-2'></i>
                        정렬 조건:
                        </Form.Label>
                        <Form.Select size='sm' value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)}>
                        <option value='sort=createdTime,desc'>최신 모임순</option>
                        <option value='sort=createdTime,asc'>오래된 모임순</option>
                        </Form.Select>
                    </Form.Group>
                    <hr className='d-none d-sm-block w-100 mx-4' />
                    <div className='d-none d-sm-flex align-items-center flex-shrink-0 text-muted'>
                        <i className='fi-check-circle me-2'></i>
                        <span className='fs-sm mt-n1'>{resultSize} 개의 결과</span>
                    </div>
                    </div>
            </div>
            <div className='my-3 py-3 col-9 mx-auto' style={{top: "-30px", position: 'relative'}}>
                    <Row>

                    {subgroups && Object.keys(subgroups).map((key) => {
                        const subgroup = subgroups[key];
                        return (
                            <Col key={key} xs={6} md={4} xl={3} className='my-3'>
                                    <PartyCard key={key}
                                      
                                        subgroupId = {subgroup.id}
                                        images={subgroup.thumbnail ? 
                                            [[`http://localhost/parties/images/${subgroup.thumbnail}`, 400, 260, 'Image']]
                                            // Add more images to the array to display a carousel
                                         : [["/images/job-board/about/faq.jpg", 300, 200, 'Image']]}
                                        title={subgroup.title}
                                        year= {`회원수 : ${subgroup.partyMemberCount}`}
                                        price={subgroup.category + " - " + subgroup.categoryDetail}
                                        location={subgroup.activityArea}
                                        wishlistButton={{
                                            tooltip: Object.values(interestedParties).includes(subgroup.id) ? '관심파티에서 해제' : '관심파티 등록',
                                            props: {
                                                style: {
                                                    // 관심 있는 파티일 경우
                                                    backgroundColor: Object.values(interestedParties).includes(subgroup.id) ? '#FF5733' : 'lightgray',
                                                    color: 'white',
                                                    padding: '10px',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer'
                                                },
                                                onClick: Object.values(interestedParties).includes(subgroup.id) 
                                                    ? () => deleteInterestedParty(subgroup.id)
                                                    : () => addInterestedParty(subgroup.id)
                                            }
                                        }}
                                        isLoggedIn = {isLoggedIn}
                                        isInterested= {Object.values(interestedParties).includes(subgroup.id)}
                                        footer={<div style={{overflowY: 'auto', maxHeight: '50px'}}>{subgroup.briefIntroduction}</div>} // 스크롤처리
                                        style={{ width: '100%', maxHeight: '550px', cursor: 'pointer'}}
                                    />
                            </Col>
                        )
                    })}


                    </Row>
                </div>

                <Container className="my-5" style={{ display: 'flex', justifyContent: 'center' }}>
                        <PageComponent totalPages={totalPages} currentPage={pageNumber} onPageChange={setPageNumber} />
                    </Container>
            </Main>
        </>
    )
}

export default Party;