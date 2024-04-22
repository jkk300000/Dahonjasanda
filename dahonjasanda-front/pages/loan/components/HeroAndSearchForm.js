import { Button, ButtonGroup, Col, Container, Form, FormControl, FormGroup, InputGroup, Nav, Row } from "react-bootstrap";
import MyIconBox from "./MyIconBox";
import dynamic from 'next/dynamic'
import { searchCondition, categories } from "../searchCondition";

import 'swiper/css/navigation'
import 'swiper/css/pagination'
import {useEffect, useState } from "react";
import CheckBoxList from "./CheckBoxList";
import DropdownSelect from "../../../components/DropdownSelect";
import ReactSlider from "react-slider";

const BgParallax = dynamic(() => import('../../../components/BgParallax'), { ssr: false })

const HeroAndSearchForm = ({selectedCategory='mortgages', onChangeCategoryHandler, onChangeSearchFormHandler, bankFin}) => {
    const [selectOptions, setSelectOptions] = useState(searchCondition[selectedCategory]) // 카테고리
    const [selectedValues, setSelectedValues] = useState({});
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [keyword, setKeyword] = useState('');
    
    useEffect(() => {
        setSelectOptions(searchCondition[selectedCategory]);
        setSelectedValues({}); // 선택된 값 초기화
    }, [selectedCategory]);

    const onCategoryHandler = (selectedCategory) => {
        onChangeCategoryHandler(selectedCategory)
    }

    const onChangeOptionHandler = (condition, value) => {
        setSelectedValues((prevSelectedValues) => ({
            ...prevSelectedValues,
            [condition]: value,
        }));

        console.log("컨디션 뭐 넘어왔지",condition)
        console.log("벨류는 뭐 넘어왔지",value)
    };

    const handleSearch = () => {
   
        // console.log("셀렉티드벨류는 뭐있지",selectedValues)
        // console.log('키워드는 뭐지~', keyword)
        // console.log('셀렉티드컴퍼니는 뭐지는 뭐지~', selectedCompanies)
      onChangeSearchFormHandler(selectedValues, keyword, selectedCompanies);
    }

    return (
        <div>
            <BgParallax
                    imgSrc='/images/MyImages/financeBGImg.jpg'
                    type='scroll' // scale, opacity, scroll-opacity, scale-opacity
                    speed={0.5} // from -1.0 to 2.0
                    overlay='gradient' // or overlay={50} from 0 to 100
                    className='position-relative bg-dark zindex-1' 
                    style={{ height: '500px' }}
                >

                    <Container className='content-overlay mt-n2 mb-lg-3'>
                        <div className="px-5 pt-5">
                            <h1 className="text-white">대출 상품</h1>
                        </div>
                        {/* <Container as='section' className='pt-xxl-4 mt-md-2 mb-md-4'>
                            <Row className='g-3 g-xl-4'>
                            {categories.map((category, indx) => (
                                <Col key={indx} className="text-center">
                                    <div onClick={()=>onCategoryHandler(category.value)}>
                                        <MyIconBox
                                            type='card-shadow'
                                            media={category.media}
                                            mediaColor={category.color}
                                            mediaShape='circle'
                                            title={category.title}
                                            align='center'
                                            isSelected={selectedCategory === category.value}
                                        />
                                    </div>
                                </Col>
                            ))}
                            </Row>
                        </Container> */}
                        
                       
                    </Container>
                </BgParallax>



                <div className="col-10 pb-5 mx-auto bg-secondary" style={{ borderRadius:"30px", position: "relative", bottom: "300px", zIndex:'10' }}>
                            <ButtonGroup aria-label='Pill solid button group' style={{ display: 'flex', width: '100%' }}>
                            {categories.map((category, indx) => (
                                    <div key={indx} style={{ display: 'flex', width: '100%' }} >
                                         <Button style={{width: '100%', height: '70px', borderBottomLeftRadius: 0, borderBottomRightRadius: 0, fontSize: '22px' }} className={indx === 0 ? ' rounded-end-0' : indx === 2 ? ' rounded-start-0' : ' rounded-end-0 rounded-start-0'}
                                          onClick={()=>onCategoryHandler(category.value)} variant={selectedCategory === category.value ? 'info': 'secondary' } >{category.title}</Button>
                                    </div>
                            ))}
                            </ButtonGroup>

                          


                            <div className="">
                                {/* Search form */}
                                <FormGroup className='d-block d-md-flex rounded-md-pill px-5 m-5 mb-sm-4'>
                                    <InputGroup size='lg' className='border-end-md'>
                                    <InputGroup.Text className='text-muted ps-3'>
                                        <i className='fi-search'></i>
                                    </InputGroup.Text>
                                    <FormControl aria-label='Search field' placeholder='찾으시는 대출 키워드를 입력해보세요' value={keyword} onChange={(e)=> setKeyword(e.target.value)} />
                                    </InputGroup>
                                    <hr className='d-md-none my-2' />
                                    <div className='d-sm-flex'>
                                    
                                        <Button size='lg'  variant='info' className='rounded-pill w-100 w-md-auto ms-sm-3' onClick={handleSearch}>검색하기</Button>
                                    </div>
                                </FormGroup>

                                <Container className='pb-3 col-10 d-flex flex-end'>

                                    {Object.keys(selectOptions).map((condition, index) => {
                                        return (
                                            <Form.Select
                                                key={index}
                                                aria-label="Default select example"
                                                className="mx-2"
                                                value={selectedValues[condition] || ""}
                                                name={condition}
                                                onChange={(e) =>
                                                    onChangeOptionHandler(
                                                        condition,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                            {Object.keys(selectOptions[condition]).map((innerCond) => {
                                                const finValue =  selectOptions[condition][innerCond];
                                                return (
                                                    <option
                                                    key={innerCond}
                                                    value={`${innerCond}`}
                                                >
                                                    {finValue}
                                                </option>
                                                )
                                                
                                            })}
                                            </Form.Select>
                                        )
                                    })}

                                </Container>
                               
                            </div>

                    <div className=''>
                        <div className="mt-3">
                            <Row>
                                <Col>
                                    {
                                    <div className="col-10 mx-auto">
                                        <CheckBoxList  listName={'은행'} list={bankFin["020000"]} indx='020000' selectedCompanies={selectedCompanies} setSelectedCompanies={setSelectedCompanies} />
                                        <CheckBoxList listName={'여신전문'} list={bankFin["030200"]} indx='030200' selectedCompanies={selectedCompanies} setSelectedCompanies={setSelectedCompanies}  />
                                        <CheckBoxList listName={'저축은행'} list={bankFin["030300"]} indx='030300' selectedCompanies={selectedCompanies} setSelectedCompanies={setSelectedCompanies}  />
                                        <CheckBoxList listName={'보험'} list={bankFin["050000"]} indx='050000' selectedCompanies={selectedCompanies} setSelectedCompanies={setSelectedCompanies}  />
                                        <CheckBoxList listName={'금융투자'} list={bankFin["060000"]} indx='060000' selectedCompanies={selectedCompanies} setSelectedCompanies={setSelectedCompanies}  />
                                    </div>
                                    }
                                </Col>
                            </Row>
                        </div> 
                    </div>
                </div>
        </div>
    )
}

export default HeroAndSearchForm;