
import { Button, Card, Col, Container, Form, Pagination, Row } from "react-bootstrap"

import 'swiper/css/navigation'
import 'swiper/css/pagination'
import ImageLoader from "../../../components/ImageLoader"
import Link from "next/link"
import ResultCard from "./Result"
import PageComponent from "./PageComponent"

const ResultList = ({resultList, onChangePageHandler, pageable, category}) => {

    const { pageNumber, totalPages, totalElements } = pageable;

    const getMinValue = (target) => {
        const values = [target.crdtGrad1, target.crdtGrad4, target.crdtGrad5, target.crdtGrad6, target.crdtGrad10, target.crdtGrad11, target.crdtGrad12, target.crdtGrad13];
        const nonZeroValues = values.filter(value => value !== 0 && value !== undefined && value !== null);
        if (nonZeroValues.length === 0) {return 0;} // 모든 값이 0일 경우
        return Math.min(...nonZeroValues);
    }

    const getMaxValue = (target) => {
        return Math.max(target.crdtGrad1, target.crdtGrad4, target.crdtGrad5, target.crdtGrad6, target.crdtGrad10, target.crdtGrad11, target.crdtGrad12, target.crdtGrad13);
    }

    return (
        (resultList) ?
        (<Container style={{ marginTop: "-230px" }}>
                 <hr style={{ borderTop: '1px solid black' }} />
            <Row>
                <Col>
                <Row>
                    <Container className="px-5 mx-5">
                        <div className='d-flex flex-sm-row flex-column align-items-sm-center align-items-stretch my-2'>
                            <div className='d-none d-sm-flex align-items-center flex-shrink-0 text-muted'>
                                <i className='fi-check-circle me-2'></i>
                                <span className='fs-sm mt-n1'>{totalElements} 개의 결과</span>
                            </div>
                        </div>
                    </Container>
                    </Row>
                    
                    <Row xs={1} sm={2} md={3} lg={3} xl={4} className='gy-4 gl-4 gl-xxl-4 py-4 px-5 mx-5'>
                        {resultList.map((result)=> {
                            const lendRateTypeNm = (category==='credits'? result.crdtLendRateTypeNm : result.lendRateTypeNm)
                            const typeInfo = (category==='credits'? result.crdtPrdtTypeNm : result.rpayTypeNm)
                            const lendRateMin = (category==='credits'? getMinValue(result) : result.lendRateMin)
                            const lendRateMax = (category==='credits'? getMaxValue(result) : result.lendRateMax)
                            const mrtgTypeInfo = (category === 'mortgages' ? result.mrtgType : '')
                            return     (
                                <Link key={result.id} href={`/loan/${category}_${result.id}`} style={{ textDecoration: 'none' }}>
                                    <Col>
                                        <ResultCard 
                                            finName={result.korCoNm} 
                                            prdtName={result.finPrdtNm} 
                                            prdtInfo1={lendRateTypeNm} 
                                            prdtInfo2={typeInfo} 
                                            prdtInfo3={lendRateMin} 
                                            prdtInfo4={lendRateMax}
                                            prdtInfo5={mrtgTypeInfo}>
                                        </ResultCard>
                                    </Col>
                                </Link>
                            )
                        })}
                    </Row>

                    <Container className="my-5" style={{ display: 'flex', justifyContent: 'center' }}>
                        <PageComponent totalPages={totalPages} currentPage={pageNumber} onPageChange={onChangePageHandler} />
                    </Container>

                </Col>
            </Row>
        </Container>)
    :
    <div className="text-center">
        <h1>검색결과가 없습니다</h1>
    </div>

    )
}

export default ResultList;