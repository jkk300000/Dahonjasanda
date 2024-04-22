import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import Link from 'next/link';

const ProductTable = ({ products, category }) => {
  const theme = useTheme();

  
  // Function to return the image URL or a fallback if not available
  const getImageUrl = (finCoNo) => `/images/deposit/banks/${finCoNo}.png`;
  console.log("6. 카테고리 값 from ProductTable:", category);
  console.log("Products data from ProductTable:", products);

  // 상태를 객체로 관리하여 각 행의 표시 여부를 개별적으로 제어
  const [visibleRows, setVisibleRows] = useState({});

  // 토글 함수를 수정하여 특정 행의 상태만 토글
  const toggleRowVisibility = (index) => {
    setVisibleRows((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#1976D2"}}>
          <TableRow>
            <TableCell align="center" sx={{fontWeight:"bold", color:"#FFFFFF", fontSize: "16px", width:"148.32px"}}></TableCell>
            <TableCell align="center" sx={{fontWeight:"bold", color:"#FFFFFF", fontSize: "16px", width:"163.16px"}}>은행</TableCell>
            <TableCell align="right" sx={{fontWeight:"bold", color:"#FFFFFF", fontSize: "16px", width:"205.61px"}}>상품명</TableCell>
            {category === "annuity-savings" ? (
              <>
                <TableCell align="right" sx={{fontWeight:"bold", color:"#FFFFFF", fontSize: "16px", width:"108.63px"}}>월 납입금액</TableCell>
                <TableCell align="right" sx={{fontWeight:"bold", color:"#FFFFFF", fontSize: "16px", width:"108.63px"}}>연금 수령 금액</TableCell>
              </>
            ) : (
              <>
                <TableCell align="right" sx={{fontWeight:"bold", color:"#FFFFFF", fontSize: "16px", width:"108.63px"}}>기본금리</TableCell>
                <TableCell align="right" sx={{fontWeight:"bold", color:"#FFFFFF", fontSize: "16px", width:"108.63px"}}>최고금리</TableCell>
              </>
            )}
            <TableCell align="right" sx={{fontWeight:"bold", color:"#FFFFFF", fontSize: "16px", width:"108.7px"}}>상세정보</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            <>
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <img
                    src={getImageUrl(product.finCoNo)}
                    alt={`${product.korCoNm} 로고`}
                    onError={(e) =>
                      (e.target.src = "/images/deposit/banks/Citi.png")
                    }
                    style={{
                      width: "100px",
                      height: "33px",
                      objectFit: "contain",
                    }}
                    />
                </TableCell>
                <TableCell align="center">{product.korCoNm}</TableCell>
                <TableCell align="right">
                  {product.homeUrl ? (
                    <Link href={`/${product.homeUrl}`} passHref>
                      <a>{product.finPrdtNm}</a>
                    </Link>
                  ) : (
                    // `homeUrl`이 없는 경우 대체 텍스트 또는 요소를 렌더링
                    <span>{product.finPrdtNm}</span>
                  )}
                </TableCell>
                {category === "annuity-savings" ? (
                  <>
                    <TableCell align="right">{product.monPaymAtmNm}</TableCell>
                    <TableCell align="right">{product.pnsnRecpTrmNm}</TableCell>
                  </>
                ) : (
                  <>
                    <TableCell align="right">{product.intrRate}%</TableCell>
                    <TableCell align="right">{product.intrRate2}%</TableCell>
                  </>
                )}
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    onClick={() => toggleRowVisibility(index)}
                  >
                    {visibleRows[index] ? "닫기" : "보기"}
                  </Button>
                </TableCell>
              </TableRow>
              {/* 세부 정보 행 - visibleRows 상태에 따라 표시 */}
              {visibleRows[index] && (
                <>
                  {category !== "annuity-savings" ? (
                    <>
                      <TableRow>
                        <TableCell colSpan={1} sx={{fontWeight:"bold", color:"#FFFFFF", backgroundColor:"gray"}}>은행 최종제공일</TableCell>
                        <TableCell colSpan={5} sx={{color:"#000000", backgroundColor:"lightgray"}}>{product.finCoSubmDay}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={1} sx={{fontWeight:"bold", color:"#FFFFFF", backgroundColor:"gray"}}>만기 후 금리</TableCell>
                        <TableCell colSpan={5} sx={{color:"#000000", backgroundColor:"lightgray"}}>{product.mtrtInt}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={1} sx={{fontWeight:"bold", color:"#FFFFFF", backgroundColor:"gray"}}>최고한도</TableCell>
                        <TableCell colSpan={5} sx={{color:"#000000", backgroundColor:"lightgray"}}>{product.maxLimit}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={1} sx={{fontWeight:"bold", color:"#FFFFFF", backgroundColor:"gray"}}>가입방법</TableCell>
                        <TableCell colSpan={5} sx={{color:"#000000", backgroundColor:"lightgray"}}>{product.joinWay}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={1} sx={{fontWeight:"bold", color:"#FFFFFF", backgroundColor:"gray"}}>우대조건</TableCell>
                        <TableCell colSpan={5} sx={{color:"#000000", backgroundColor:"lightgray"}}>{product.spclCnd}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={1} sx={{fontWeight:"bold", color:"#FFFFFF", backgroundColor:"gray"}}>가입 제한조건</TableCell>
                        <TableCell colSpan={5} sx={{color:"#000000", backgroundColor:"lightgray"}}>{product.joinDeny}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={1} sx={{fontWeight:"bold", color:"#FFFFFF", backgroundColor:"gray"}}>가입대상</TableCell>
                        <TableCell colSpan={5} sx={{color:"#000000", backgroundColor:"lightgray"}}>{product.joinMember}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={1} sx={{fontWeight:"bold", color:"#FFFFFF", backgroundColor:"gray"}}>기타 유의사항</TableCell>
                        <TableCell colSpan={5} sx={{color:"#000000", backgroundColor:"lightgray"}}>{product.etcNote}</TableCell>
                      </TableRow>
                    </>
                  ) : (
                    <>
                      <TableRow>
                        <TableCell colSpan={1} sx={{fontWeight:"bold", color:"#FFFFFF", backgroundColor:"gray"}}>은행 최종제공일</TableCell>
                        <TableCell colSpan={5} sx={{color:"#000000", backgroundColor:"lightgray"}}>{product.finCoSubmDay}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={1} sx={{fontWeight:"bold", color:"#FFFFFF", backgroundColor:"gray"}}>연금종류</TableCell>
                        <TableCell colSpan={5} sx={{color:"#000000", backgroundColor:"lightgray"}}>{product.pnsnKindNm}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={1} sx={{fontWeight:"bold", color:"#FFFFFF", backgroundColor:"gray"}}>상품유형</TableCell>
                        <TableCell colSpan={5} sx={{color:"#000000", backgroundColor:"lightgray"}}>{product.productTypeNm}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={1} sx={{fontWeight:"bold", color:"#FFFFFF", backgroundColor:"gray"}}>가입방법</TableCell>
                        <TableCell colSpan={5} sx={{color:"#000000", backgroundColor:"lightgray"}}>{product.joinWay}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={1} sx={{fontWeight:"bold", color:"#FFFFFF", backgroundColor:"gray"}}>평균이익율</TableCell>
                        <TableCell colSpan={5} sx={{color:"#000000", backgroundColor:"lightgray"}}>{product.avgProftRate}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={1} sx={{fontWeight:"bold", color:"#FFFFFF", backgroundColor:"gray"}}>공시이율</TableCell>
                        <TableCell colSpan={5} sx={{color:"#000000", backgroundColor:"lightgray"}}>{product.dclsRate}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={1} sx={{fontWeight:"bold", color:"#FFFFFF", backgroundColor:"gray"}}>최저보증이율</TableCell>
                        <TableCell colSpan={5} sx={{color:"#000000", backgroundColor:"lightgray"}}>{product.guarRate}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={1} sx={{fontWeight:"bold", color:"#FFFFFF", backgroundColor:"gray"}}>과거수익률</TableCell>
                        <TableCell colSpan={5} sx={{color:"#000000", backgroundColor:"lightgray"}}>{product.btrmPrftRate}</TableCell>
                      </TableRow>
                    </>
                  )}
                </>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
