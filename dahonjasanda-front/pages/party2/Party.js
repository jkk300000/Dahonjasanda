import { Button, Card, Col, Dropdown, Form, FormControl, FormGroup, InputGroup, Row } from 'react-bootstrap';
import VenueCardOverlay from '../../components/VenueCardOverlay'
import { Main } from '../../layouts';
import heroImg from '../../public/images/myImages/partyHero.jpg'
import VehicleCard from '../../components/VehicleCard'
import IconBox from '../../components/IconBox';
import BlogCard from '../../components/BlogCard';
import ImageLoader from '../../components/ImageLoader';

import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const Party = () => {
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
                <h1 className='text-white'>모   여   라!!!!</h1>
            </div>
            <div className='col-9 p-4 mx-auto' style={{backgroundColor: 'white', borderRadius: '10px', top: '50px',left: '20px', position: 'relative', top: '-70px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)' }}>
                <div>
                    <FormGroup className='d-block d-md-flex rounded-md-pill mb-5 mb-sm-4'>
                        <InputGroup size='lg' className='border-end-md'>
                        <Dropdown id='left-dropdown-addon'>
                            <Dropdown.Toggle variant='info'>온/오프라인</Dropdown.Toggle>
                            <Dropdown.Menu className='my-1'>
                            <Dropdown.Item eventKey='1'>온/오프라인</Dropdown.Item>
                            <Dropdown.Item eventKey='2'>온라인</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey='3'>오프라인</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <FormControl aria-label='Search field' placeholder='What are you looking for?'/>
                        </InputGroup>
                        <hr className='d-md-none my-2' />
                        <div className='d-sm-flex'>
                        
                            <Button size='lg' variant='info' className='rounded-pill w-100 w-md-auto ms-sm-3'>Search</Button>
                        </div>
                    </FormGroup>
                </div>
            </div>

            <div className='d-flex col-11 mx-auto'>

                <IconBox
                href='#'
                media='fi-meds'
                mediaShape='circle'
                title='Border card'
                type='card'
                align='center'
                className='mb-4'
                />
                <IconBox
                href='#'
                media='fi-meds'
                mediaShape='circle'
                title='Border card'
                type='card'
                align='center'
                className='mb-4'
                />
                <IconBox
                href='#'
                media='fi-meds'
                mediaShape='circle'
                title='Border card'
                type='card'
                align='center'
                className='mb-4'
                />
                <IconBox
                href='#'
                media='fi-meds'
                mediaShape='circle'
                title='Border card'
                type='card'
                align='center'
                className='mb-4'
                />
                <IconBox
                href='#'
                media='fi-meds'
                mediaShape='circle'
                title='Border card'
                type='card'
                align='center'
                className='mb-4'
                />
                <IconBox
                href='#'
                media='fi-meds'
                mediaShape='circle'
                title='Border card'
                type='card'
                align='center'
                className='mb-4'
                />
                <IconBox
                href='#'
                media='fi-meds'
                mediaShape='circle'
                title='Border card'
                type='card'
                align='center'
                className='mb-4'
                /><IconBox
                href='#'
                media='fi-meds'
                mediaShape='circle'
                title='Border card'
                type='card'
                align='center'
                className='mb-4'
                /><IconBox
                href='#'
                media='fi-meds'
                mediaShape='circle'
                title='Border card'
                type='card'
                align='center'
                className='mb-4'
                />
            </div>

            <h2 className='text-center my-5'><i className='fi-star-filled'></i> 대충 최고 인기 모임이라는 뜻</h2>

            <div className='col-10 mx-auto' style={{backgroundColor: '' ,border: '', borderRadius: '10px' }}>
                <div className='m-2'>
                        
                   
                </div>

      
                <Row className='m-3'>
                    <Col>
                        <VehicleCard
                            href='#'
                            images={[
                                ['/images/car-finder/catalog/01.jpg', 400, 205, 'Image']
                                // Add more images to the array to display a carousel
                            ]}
                            title='Ford Truck Lifted'
                            year='1995'
                            price='$24,000'
                            location='Chicago'
                            checkbox={{
                                label: 'Compare',
                                props: {
                                onChange: (e) => e.target.checked ? alert('Car ADDED to comparison list!') : alert('Car REMOVED from comparison list!')
                                }
                            }}
                            badges={[
                                ['info', 'New']
                            ]}
                            wishlistButton={{
                                tooltip: 'Add to Wishlist',
                                props: {
                                onClick: () => alert('Vehicle added to your Wishlist!')
                                }
                            }}
                            footer={[
                                ['fi-dashboard', '278K mi'],
                                ['fi-gearbox', 'Manual'],
                                ['fi-petrol', 'Diesel']
                            ]}
                            // light // Optionally pass light prop so the card works well on dark backgrounds
                            className='mx-auto'
                            style={{maxWidth: '400px'}}
                        />
                    </Col>
                    <Col>
                        <VehicleCard
                            href='#'
                            images={[
                                ['/images/car-finder/catalog/01.jpg', 400, 205, 'Image']
                                // Add more images to the array to display a carousel
                            ]}
                            title='Ford Truck Lifted'
                            year='1995'
                            price='$24,000'
                            location='Chicago'
                            checkbox={{
                                label: 'Compare',
                                props: {
                                onChange: (e) => e.target.checked ? alert('Car ADDED to comparison list!') : alert('Car REMOVED from comparison list!')
                                }
                            }}
                            badges={[
                                ['info', 'New']
                            ]}
                            wishlistButton={{
                                tooltip: 'Add to Wishlist',
                                props: {
                                onClick: () => alert('Vehicle added to your Wishlist!')
                                }
                            }}
                            footer={[
                                ['fi-dashboard', '278K mi'],
                                ['fi-gearbox', 'Manual'],
                                ['fi-petrol', 'Diesel']
                            ]}
                            // light // Optionally pass light prop so the card works well on dark backgrounds
                            className='mx-auto'
                            style={{maxWidth: '400px'}}
                        />
                    </Col>
                    <Col>
                        <VehicleCard
                            href='#'
                            images={[
                                ['/images/car-finder/catalog/01.jpg', 400, 205, 'Image']
                                // Add more images to the array to display a carousel
                            ]}
                            title='Ford Truck Lifted'
                            year='1995'
                            price='$24,000'
                            location='Chicago'
                            checkbox={{
                                label: 'Compare',
                                props: {
                                onChange: (e) => e.target.checked ? alert('Car ADDED to comparison list!') : alert('Car REMOVED from comparison list!')
                                }
                            }}
                            badges={[
                                ['info', 'New']
                            ]}
                            wishlistButton={{
                                tooltip: 'Add to Wishlist',
                                props: {
                                onClick: () => alert('Vehicle added to your Wishlist!')
                                }
                            }}
                            footer={[
                                ['fi-dashboard', '278K mi'],
                                ['fi-gearbox', 'Manual'],
                                ['fi-petrol', 'Diesel']
                            ]}
                            // light // Optionally pass light prop so the card works well on dark backgrounds
                            className='mx-auto'
                            style={{maxWidth: '400px'}}
                        />
                    </Col>
                </Row>
            </div>


            
            <div className='col-10 mx-auto mt-4'>
                <div className='d-flex flex-sm-row flex-column align-items-sm-center align-items-stretch my-2'>
                    <Form.Group controlId='sortby' className='d-flex align-items-center flex-shrink-0'>
                        <Form.Label className='text-body fs-sm me-2 mb-0 pe-1 text-nowrap'>
                        <i className='fi-arrows-sort text-muted mt-n1 me-2'></i>
                        Sort by:
                        </Form.Label>
                        <Form.Select size='sm'>
                        <option value='Newest'>Newest</option>
                        <option value='Popularity'>Popularity</option>
                        <option value='Low - Hight Price'>Low - Hight Price</option>
                        <option value='High - Low Price'>High - Low Price</option>
                        <option value='High Rating'>High Rating</option>
                        <option value='Average Rating'>Average Rating</option>
                        </Form.Select>
                    </Form.Group>
                    <hr className='d-none d-sm-block w-100 mx-4' />
                    <div className='d-none d-sm-flex align-items-center flex-shrink-0 text-muted'>
                        <i className='fi-check-circle me-2'></i>
                        <span className='fs-sm mt-n1'>148 results</span>
                    </div>
                    </div>
            </div>

            <div className='m-5 p-4 col-9 mx-auto'>
                    <Row>
                        <Col xs={3} className='my-3'>
                            <Card style={{maxWidth: '308px'}}>
                                <ImageLoader
                                    src='/images/real-estate/catalog/04.jpg'
                                    width={306}
                                    height={200}
                                    layout='responsive'
                                    alt='Card image'
                                    className='card-img-top'
                                />
                                <Card.Body>
                                    <Card.Title as='h5'>Card title</Card.Title>
                                    <Card.Text className='fs-sm'>Some quick example text to build on the card title and make up the bulk of the card&apos;s content within card&apos;s body.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={3} className='my-3'>
                            <Card style={{maxWidth: '308px'}}>
                                <ImageLoader
                                    src='/images/real-estate/catalog/04.jpg'
                                    width={306}
                                    height={200}
                                    layout='responsive'
                                    alt='Card image'
                                    className='card-img-top'
                                />
                                <Card.Body>
                                    <Card.Title as='h5'>Card title</Card.Title>
                                    <Card.Text className='fs-sm'>Some quick example text to build on the card title and make up the bulk of the card&apos;s content within card&apos;s body.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={3} className='my-3'>
                            <Card style={{maxWidth: '308px'}}>
                                <ImageLoader
                                    src='/images/real-estate/catalog/04.jpg'
                                    width={306}
                                    height={200}
                                    layout='responsive'
                                    alt='Card image'
                                    className='card-img-top'
                                />
                                <Card.Body>
                                    <Card.Title as='h5'>Card title</Card.Title>
                                    <Card.Text className='fs-sm'>Some quick example text to build on the card title and make up the bulk of the card&apos;s content within card&apos;s body.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={3} className='my-3'>
                            <Card style={{maxWidth: '308px'}}>
                                <ImageLoader
                                    src='/images/real-estate/catalog/04.jpg'
                                    width={306}
                                    height={200}
                                    layout='responsive'
                                    alt='Card image'
                                    className='card-img-top'
                                />
                                <Card.Body>
                                    <Card.Title as='h5'>Card title</Card.Title>
                                    <Card.Text className='fs-sm'>Some quick example text to build on the card title and make up the bulk of the card&apos;s content within card&apos;s body.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={3} className='my-3'>
                            <Card style={{maxWidth: '308px'}}>
                                <ImageLoader
                                    src='/images/real-estate/catalog/04.jpg'
                                    width={306}
                                    height={200}
                                    layout='responsive'
                                    alt='Card image'
                                    className='card-img-top'
                                />
                                <Card.Body>
                                    <Card.Title as='h5'>Card title</Card.Title>
                                    <Card.Text className='fs-sm'>Some quick example text to build on the card title and make up the bulk of the card&apos;s content within card&apos;s body.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={3} className='my-3'>
                            <Card style={{maxWidth: '308px'}}>
                                <ImageLoader
                                    src='/images/real-estate/catalog/04.jpg'
                                    width={306}
                                    height={200}
                                    layout='responsive'
                                    alt='Card image'
                                    className='card-img-top'
                                />
                                <Card.Body>
                                    <Card.Title as='h5'>Card title</Card.Title>
                                    <Card.Text className='fs-sm'>Some quick example text to build on the card title and make up the bulk of the card&apos;s content within card&apos;s body.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={3} className='my-3'>
                            <Card style={{maxWidth: '308px'}}>
                                <ImageLoader
                                    src='/images/real-estate/catalog/04.jpg'
                                    width={306}
                                    height={200}
                                    layout='responsive'
                                    alt='Card image'
                                    className='card-img-top'
                                />
                                <Card.Body>
                                    <Card.Title as='h5'>Card title</Card.Title>
                                    <Card.Text className='fs-sm'>Some quick example text to build on the card title and make up the bulk of the card&apos;s content within card&apos;s body.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={3} className='my-3'>
                            <Card style={{maxWidth: '308px'}}>
                                <ImageLoader
                                    src='/images/real-estate/catalog/04.jpg'
                                    width={306}
                                    height={200}
                                    layout='responsive'
                                    alt='Card image'
                                    className='card-img-top'
                                />
                                <Card.Body>
                                    <Card.Title as='h5'>Card title</Card.Title>
                                    <Card.Text className='fs-sm'>Some quick example text to build on the card title and make up the bulk of the card&apos;s content within card&apos;s body.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Main>
        </>
    )
}

export default Party;