import axios from 'axios'; 
import Main from "layouts/Main";
import { Button, Card, Col, Form, Row} from "react-bootstrap";
import { useRouter } from 'next/router';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { findLoanDetail } from './LoansApiService'


const ResultCard = dynamic(() => import("./components/Result"), { ssr: false });

const getMinValue = (target) => {
    const values = [target.crdtGrad1, target.crdtGrad4, target.crdtGrad5, target.crdtGrad6, target.crdtGrad10, target.crdtGrad11, target.crdtGrad12, target.crdtGrad13];
    const nonZeroValues = values.filter(value => value !== 0 && value !== undefined && value !== null);
    if (nonZeroValues.length === 0) {return 0;} // 모든 값이 0일 경우
    console.log("가장 작은 값",Math.min(...nonZeroValues))
    return Math.min(...nonZeroValues);
}

const getMaxValue = (target) => {
    console.log("가장 큰 값",Math.max(target.crdtGrad1, target.crdtGrad4, target.crdtGrad5, target.crdtGrad6, target.crdtGrad10, target.crdtGrad11, target.crdtGrad12, target.crdtGrad13))
    return Math.max(target.crdtGrad1, target.crdtGrad4, target.crdtGrad5, target.crdtGrad6, target.crdtGrad10, target.crdtGrad11, target.crdtGrad12, target.crdtGrad13);
}

const maxValue =20;

const LoansDetail = () =>{
    const router = useRouter();

    const [category, setCategory] = useState();
    const [id, setId] = useState();
    const [detailInfo, setDetailInfo] = useState(null);
    const [chartInfo, setChartInfo] = useState();
    const [lendRateMin, setLendRateMin] = useState();
    const [lendRateMax, setLendRateMax] = useState();

    const [loanAmount, setLoanAmount] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [minTotalInterest, setMinTotalInterest] = useState(0);
    const [maxTotalInterest, setMaxTotalInterest] = useState(0);
    const [minMonthlyInterest, setMinMonthlyInterest] = useState(0);
    const [maxMonthlyInterest, setMaxMonthlyInterest] = useState(0);

    const getLoginInfo = async () => {
        try {
            var response = await axios.get('http://localhost/memberRest/loginInfo', { withCredentials: true });
            console.log(response)
            if (response.data.result === true) {
                setLoginInfo(response.data.member);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const handleGetDetail = async (category, id) => {
        try {
            const response = await findLoanDetail(category, id);
            const { data } = response;
            setDetailInfo(data);
            setLendRateMin(data.lendRateMin);
            setLendRateMax(data.lendRateMax);

            {if(category === 'credits'){
            const crdtGrad1 = data.crdtGrad1;
            const crdtGrad4 = data.crdtGrad4;
            const crdtGrad5 = data.crdtGrad5;
            const crdtGrad6 = data.crdtGrad6;
            const crdtGrad10 = data.crdtGrad10;
            const crdtGrad11 = data.crdtGrad11;
            const crdtGrad12 = data.crdtGrad12;
            const crdtGrad13 = data.crdtGrad13;
            const crdtGradAvg = data.crdtGradAvg;

                setChartInfo([
                    { creditGrade: '900점 초과', "평균 이자율": crdtGrad1 },
                    { creditGrade: '801~900점', "평균 이자율": crdtGrad4 },
                    { creditGrade: '701~800점', "평균 이자율": crdtGrad5 },
                    { creditGrade: '601~700점', "평균 이자율": crdtGrad6 },
                    { creditGrade: '501~600점', "평균 이자율": crdtGrad10 },
                    { creditGrade: '401~500점', "평균 이자율": crdtGrad11 },
                    { creditGrade: '301~400점', "평균 이자율": crdtGrad12 },
                    { creditGrade: '300점 이하', "평균 이자율": crdtGrad13 },
                ]);
                setLendRateMin(getMinValue(data));
                setLendRateMax(getMaxValue(data));
            }}

        } catch (error) {
            console.error("Error fetching loan detail:", error);
        }
    };

    useEffect(() => {
        if (!router.isReady) {
            return;
        }

        const catAndId = router.query.categoryAndId;
        const [category, id] =catAndId.split('_');
        
        setCategory(category)
        setId(id)

        getLoginInfo();
        handleGetDetail(category, id);
    }, [router.isReady, router.query.categoryAndId]);

    if (!detailInfo) {
        return <div>Loading...</div>;
    }
    
    const handleLoanAmountChange = (e) => {
        const value = e.target.value.replace(/\D/, ''); // 숫자 이외의 문자 제거
        setLoanAmount(value);

        console.log(value)
      };
    
      const handleLoanTermChange = (e) => {
        const value = e.target.value.replace(/\D/, ''); // 숫자 이외의 문자 제거
        setLoanTerm(value);

        console.log(value)
      };

      const handleCalculate = () => {
        // 여기에 예상 총 이자액과 예상 월별 이자액을 계산하는 로직을 작성하세요
        // 예상 총 이자액 및 예상 월별 이자액을 상태에 설정하세요
        const realAmount = loanAmount * 10000;
        const {monthlyInterestAmount : minMoonthlyInterest, totalInterestAmount : minTotalInterest}=calculateInterest(realAmount, lendRateMin, loanTerm)
        setMinMonthlyInterest(Math.ceil(minMoonthlyInterest));
        setMinTotalInterest(Math.ceil(minTotalInterest));
        
        const {monthlyInterestAmount : maxMonthlyInterest, totalInterestAmount : maxTotalInterest}=calculateInterest(realAmount, lendRateMax, loanTerm)
        setMaxMonthlyInterest(Math.ceil(maxMonthlyInterest));
        setMaxTotalInterest(Math.ceil(maxTotalInterest));

      };

        const calculateInterest = (loanAmount, annualInterestRate, loanPeriodYears) => {

            if(detailInfo.rpayType === 'S'){
                // 연 이자율 계산
                const monthlyInterestRate = annualInterestRate / 100 / 12;

                // 대출 기간(월) 계산
                const loanPeriodMonths = loanPeriodYears * 12;
            
               // 월별 이자금액 계산
                const monthlyInterestAmount = loanAmount * monthlyInterestRate;

                // 총 이자금액 계산
                const totalInterestAmount = monthlyInterestAmount * loanPeriodMonths;

                return {
                    monthlyInterestAmount,
                    totalInterestAmount
                };
            }
                

            // 연 이자율 계산
            const monthlyInterestRate = annualInterestRate / 100 / 12;

            // 대출 기간 계산
            const loanPeriodMonths = loanPeriodYears * 12;

            // 월별 이자액 계산
            const monthlyInterestAmount = (loanAmount * monthlyInterestRate) /
                (1 - (1 + monthlyInterestRate) ** -loanPeriodMonths);

            // 총 이자액 계산
            const totalInterestAmount = (monthlyInterestAmount * loanPeriodMonths) - loanAmount;

            // 결과 반환
            return {
                monthlyInterestAmount,
                totalInterestAmount
            };
        };

        



    return (
        <Main>
            {console.log(detailInfo)}
            <Link href={'/loan'}><Button variant="warning">대출 페이지로</Button></Link>
                <div className="mx-5 p-x3">
                    <div className="px-5">
                    <Card className="px-5 mx-5" style={{border: '2px solid #000'}}>
                    <Card.Header><h1>{detailInfo.korCoNm}</h1></Card.Header>
                    <Card.Body>
                        <Row className="mt-4">
                            
                            <Col>
                                <h3>{detailInfo.finPrdtNm}</h3>
                                <ul>
                                    {category !== 'credits' ?
                                    <>
                                        <li>{detailInfo.rpayTypeNm}</li>
                                        <li>{detailInfo.lendRateTypeNm}</li>
                                        <li>금리 : {detailInfo.lendRateMin}  ~ {detailInfo.lendRateMax}  %</li>
                                        {detailInfo.lendRateAvg &&<li>평균금리 : {detailInfo.lendRateAvg} %</li>}
                                        </>
                                    :(
                                        <>
                                        <li>{detailInfo.crdtPrdtTypeNm}</li>
                                        <li>{detailInfo.crdtLendRateTypeNm}</li>
                                        <li>금리 : {getMinValue(detailInfo)}  ~ {getMaxValue(detailInfo)}  %</li>
                                        <li>평균금리 : {detailInfo.crdtGradAvg} %</li>
                                        </>
                                    )}
                                    <li>공시 시작일 : {detailInfo.dclsStrtDay} </li>
                                    {detailInfo.dclsEndDay && <li>공시 종료일 : {detailInfo.dclsEndDay} </li>}
                                </ul>
                               <br></br>
                               <br></br>
                            </Col>
                            <Col>
                                {minTotalInterest !== 0 && 
                                <ul>
                                    <li>예상 총 이자액 : {minTotalInterest.toLocaleString()} ~ {maxTotalInterest.toLocaleString()} 원</li>
                                    <li>예상 월별 이자액 : {minMonthlyInterest.toLocaleString()} ~ {maxMonthlyInterest.toLocaleString()} 원</li>
                                </ul>}
                                <Form>
                                    <Form.Group controlId="loanAmount">
                                        <Form.Label>대출금(만원)</Form.Label>
                                        <Form.Control
                                        type="text"
                                        placeholder="대출금을 입력하세요."
                                        value={loanAmount}
                                        onChange={handleLoanAmountChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="loanTerm">
                                        <Form.Label>대출기간(단위 년)</Form.Label>
                                        <Form.Control
                                        type="text"
                                        placeholder="대출기간을 입력하세요."
                                        value={loanTerm}
                                        onChange={handleLoanTermChange}
                                        />
                                    </Form.Group>
                                    <Button className="mt-2" variant="info" onClick={handleCalculate}>계산하기</Button>
                                </Form>
                                    
                            </Col>
                        </Row>
                    
                        <div className='mb-3'>
                            <span>{detailInfo.dclsChrgMan}</span>
                            <hr></hr>
                            <h6 className='mt-3 bg-danger-subtle'> * 당신이 원하는 대출금과 기간에 따른 이자를 정확히 계산하고 싶으시다면, 삼담원과 상담하시는 것을 권장합니다. 대출금과 기간에 따른 이자는 다양한 요소에 따라 달라질 수 있으며, 정확한 계산을 위해서는 전문가의 도움이 필요합니다. 따라서 삼담원의 전문가와 상담하여 개인에 맞는 최적의 대출 조건을 찾아보세요.</h6>
                        </div>
                        <div className='col-7 mx-auto'>
                            <a href={detailInfo.homeUrl}><Button variant='success' className='w-100 my-3'>공식홈에서 더 알아보기</Button></a>
                        </div>
                        {category !== 'credits' ? (
                            <div className="m-5">
                                <h5>상세정보</h5>
                                <hr></hr>
                                <br></br>
                            
                                <ul>
                                    <b>일수</b>
                                    <li className='my-2'>{detailInfo.dlyRate}</li>
                                </ul>
                                <ul>
                                    <b>조기상환 수수료</b>
                                    <li>{detailInfo.erlyRpayFee}</li>
                                </ul>
                                <ul>
                                    <b>가입 방법</b>
                                    <li>{detailInfo.joinWay}</li>
                                </ul>
                                <ul>
                                    <b>대출 부대비용</b>
                                    <li>{detailInfo.loanInciExpn}</li>
                                </ul>
                                <ul>
                                    <b>대출 한도</b>
                                    <li>{detailInfo.loanLmt}</li>
                                </ul>
                            
                            </div>
                        ):(
                            <div>
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart data={chartInfo}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="creditGrade" />
                                        <YAxis domain={[0, maxValue]} />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="평균 이자율" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>

                            </div>
                        )}            
                    </Card.Body>
                    </Card>
                    
                    </div>

                    {(detailInfo.options && detailInfo.options.length != 0) &&
                    <div>
                    <div className="text-center mt-5"><h2>같은 상품 다른 옵션 보기</h2></div>
                    <Row xxs={2} xs={2} md={3} lg={4} className='gy-4 gl-4 gl-xxl-4 py-4 px-5 mx-5'>
                        
                        {detailInfo.options.map((result)=> {
                        const lendRateTypeNm = (category==='credits'? result.crdtLendRateTypeNm : result.lendRateTypeNm)
                        const typeInfo = (category==='credits'? detailInfo.crdtPrdtTypeNm : detailInfo.rpayTypeNm)
                        const lendRateMin = (category==='credits'? getMinValue(result) : result.lendRateMin)
                        const lendRateMax = (category==='credits'? getMaxValue(result) : result.lendRateMax)
                        const mrtgTypeInfo = (category === 'mortgages' ? result.mrtgType : '')
                        return     (
                            <Link key={result.optionId} href={`/loan/${category}_${result.optionId}`} style={{ textDecoration: 'none' }}>
                                <ResultCard 
                                    finName={detailInfo.korCoNm} 
                                    prdtName={detailInfo.finPrdtNm} 
                                    prdtInfo1={lendRateTypeNm} 
                                    prdtInfo2={typeInfo} 
                                    prdtInfo3={lendRateMin} 
                                    prdtInfo4={lendRateMax}
                                    prdtInfo5={mrtgTypeInfo}>
                                </ResultCard>
                            </Link>
                        )
                        })}
                    </Row>
                </div> }
                    

                </div>
                <div className="col-10 mx-auto" style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f8d7da', borderRadius: '5px' }}>
                    <div className=''>
                        <h5 style={{ color: '#721c24' }}>대출에 대한 경고</h5>
                        <p style={{ color: '#721c24' }}>
                            대출은 신중하게 결정해야 합니다. 대출금을 상환하는 데 어려움을 겪을 수 있으며, 무모한 대출은 재정적 문제를 야기할 수 있습니다. 
                            대출을 신청하기 전에 재무 상황을 심사하고, 상환 능력을 확인해야 합니다. 이러한 과정을 거치지 않고 대출을 받는 경우, 
                            이자 및 연체료 등의 추가 비용이 발생할 수 있습니다.
                        </p>
                        <p style={{ color: '#721c24' }}>
                            또한, 대출 조건을 신중히 검토해야 합니다. 이자율, 상환 기간, 연체 시 부과되는 패널티 등을 반드시 확인하고, 
                            계약서를 잘 읽어보신 후 서명하셔야 합니다. 이러한 조건을 무시하고 대출을 받는 경우, 
                            이후에 불이익을 당할 수 있으므로 신중한 결정이 필요합니다.
                        </p>
                        <p style={{ color: '#721c24' }}>
                            대출을 신청하기 전에 관련된 모든 사항을 신중하게 고려하시기 바랍니다. 만약 대출에 대한 자세한 정보가 필요하거나, 
                            의문 사항이 있으신 경우, 은행이나 금융기관에 문의하시기 바랍니다.
                        </p>
                        </div>
                    </div>

            </Main>
    )
}

export default LoansDetail