import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Col, Nav, Tab } from "react-bootstrap";
import { SwiperSlide } from "swiper/react";
import ResultCard from "./Result";

const LoanListForMain = () => {
  const [activeKey, setActiveKey] = useState("tab1");
  const [mortgages, setMortgages] = useState();
  const [credits, setCredits] = useState();
  const [rentHouses, setRentHouses] = useState();

  const handleSelect = (key) => {
    setActiveKey(key);
  };

  useEffect(() => {
    getMortgages();
    getCredits();
    getRentHouses();
  }, []);

  const getMortgages = async () => {
    try {
      const response = await axios.get(
        "http://localhost/finance/loans/mortgages?sort=lendRateMin,asc&size=10"
      );
      console.log("모기지응답", response);
      setMortgages(response.data.content);
    } catch (error) {
      console.log("모기지 에러", error);
    }
  };

  const getCredits = async () => {
    try {
      const response = await axios.get(
        "http://localhost/finance/loans/credits?sort=crdtGradAvg,asc&size=10"
      );
      console.log("신용 응답", response);
      setCredits(response.data.content);
    } catch (error) {
      console.log("크레딧 에러");
    }
  };

  const getRentHouses = async () => {
    try {
      const response = await axios.get(
        "http://localhost/finance/loans/rent-houses?sort=lendRateMin,asc&size=10"
      );
      console.log("전세 응답", response);
      setRentHouses(response.data.content);
    } catch (error) {
      console.log("전세대출 에러");
    }
  };

  const getMinValue = (target) => {
    const values = [
      target.crdtGrad1,
      target.crdtGrad4,
      target.crdtGrad5,
      target.crdtGrad6,
      target.crdtGrad10,
      target.crdtGrad11,
      target.crdtGrad12,
      target.crdtGrad13,
    ];
    const nonZeroValues = values.filter(
      (value) => value !== 0 && value !== undefined && value !== null
    );
    if (nonZeroValues.length === 0) {
      return 0;
    } // 모든 값이 0일 경우
    return Math.min(...nonZeroValues);
  };

  const getMaxValue = (target) => {
    return Math.max(
      target.crdtGrad1,
      target.crdtGrad4,
      target.crdtGrad5,
      target.crdtGrad6,
      target.crdtGrad10,
      target.crdtGrad11,
      target.crdtGrad12,
      target.crdtGrad13
    );
  };

  return (
    <div className="col-11 mx-auto"
      style={{
        border: "0px solid black",
        padding: "10px",
        position: "relative",
      }}
    >
      {/* 내용 */}
      <Button
        onClick={() => (window.location.href = "/loan")}
        className="position-absolute top-0 end-0 mt-3 me-3"
        variant="secondary"
        // style={{
        //   position: "absolute",
        //   right: "50px",
        //   bottom: "440px",
        //   padding: "8px 12px",
        //   border: "1px solid blue",
        //   borderRadius: "4px",
        //   backgroundColor: "white",
        //   textDecoration: "none",
        //   color: "blue",
        // }}
      >
        자세히 알아보기
      </Button>
      <Tab.Container activeKey={activeKey} onSelect={handleSelect}>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="tab1">모기지론</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="tab2">개인신용대출</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="tab3">전세금대출</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="tab1">
            <SwiperSlide
              className="d-flex"
              scrollbar={{ draggable: true }}
              style={{ maxWidth: "100%", overflowX: "auto" }}
            >
              {mortgages &&
                Object.keys(mortgages).map((key, index) => {
                  const result = mortgages[key];
                  const lendRateTypeNm = result.lendRateTypeNm;
                  const typeInfo = result.rpayTypeNm;
                  const lendRateMin = result.lendRateMin;
                  const lendRateMax = result.lendRateMax;
                  const mrtgTypeInfo = result.mrtgType;
                  return (
                    <Col className="mx-2 py-3">
                      <Link
                        key={index}
                        href={`/loan/mortgages_${result.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <ResultCard
                          finName={result.korCoNm}
                          prdtName={result.finPrdtNm}
                          prdtInfo1={lendRateTypeNm}
                          prdtInfo2={typeInfo}
                          prdtInfo3={lendRateMin}
                          prdtInfo4={lendRateMax}
                          prdtInfo5={mrtgTypeInfo}
                        ></ResultCard>
                      </Link>
                    </Col>
                  );
                })}
            </SwiperSlide>
          </Tab.Pane>

          <Tab.Pane eventKey="tab2">
            <SwiperSlide
              className="d-flex"
              scrollbar={{ draggable: true }}
              style={{ maxWidth: "100%", overflowX: "auto" }}
            >
              {credits &&
                Object.keys(credits).map((key, index) => {
                  const result = credits[key];
                  const lendRateTypeNm = result.crdtLendRateTypeNm;
                  const typeInfo = result.crdtPrdtTypeNm;
                  const lendRateMin = getMinValue(result);
                  const lendRateMax = getMaxValue(result);

                  return (
                    <Col className="mx-2 py-3">
                      <Link
                        key={index}
                        href={`/loan/credits_${result.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <ResultCard
                          finName={result.korCoNm}
                          prdtName={result.finPrdtNm}
                          prdtInfo1={lendRateTypeNm}
                          prdtInfo2={typeInfo}
                          prdtInfo3={lendRateMin}
                          prdtInfo4={lendRateMax}
                        ></ResultCard>
                      </Link>
                    </Col>
                  );
                })}
            </SwiperSlide>
          </Tab.Pane>

          <Tab.Pane eventKey="tab3">
            <SwiperSlide
              className="d-flex"
              scrollbar={{ draggable: true }}
              style={{ maxWidth: "100%", overflowX: "auto" }}
            >
              {rentHouses &&
                Object.keys(rentHouses).map((key, index) => {
                  const result = rentHouses[key];
                  const lendRateTypeNm = result.lendRateTypeNm;
                  const typeInfo = result.rpayTypeNm;
                  const lendRateMin = result.lendRateMin;
                  const lendRateMax = result.lendRateMax;
                  return (
                    <Col className="mx-2 py-3">
                      <Link
                        key={index}
                        href={`/loan/rent-houses_${result.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <ResultCard
                          finName={result.korCoNm}
                          prdtName={result.finPrdtNm}
                          prdtInfo1={lendRateTypeNm}
                          prdtInfo2={typeInfo}
                          prdtInfo3={lendRateMin}
                          prdtInfo4={lendRateMax}
                        ></ResultCard>
                      </Link>
                    </Col>
                  );
                })}
            </SwiperSlide>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default LoanListForMain;
