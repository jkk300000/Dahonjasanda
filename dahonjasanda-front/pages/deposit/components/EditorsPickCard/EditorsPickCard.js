import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const EditorsPickCard = () => {
  return (
    <Card>
      <Typography variant="h6" gutterBottom align="center" style={{ marginTop: "10px" }}>
        에디터의 추천 상품
      </Typography>
      <CardContent>
        <img
          src="/images/deposit/kbstar.png"
          alt="KB Star"
          style={{ width: "300px", height: "auto", objectFit: "contain" }}
        />
        <Typography variant="body2" align="center">
          초단기도 가능! KB 특★한 적금
        </Typography>
      </CardContent>
      <CardContent>
        <img
          src="/images/deposit/sh_Sol.jpg"
          alt="SH Sol"
          style={{ width: "300px", height: "auto", objectFit: "contain" }}
        />
        <Typography variant="body2" align="center">
          신한 알.쏠 적금. 나만의 금융 루틴
        </Typography>
      </CardContent>
      <CardContent>
        <img
          src="/images/deposit/wuri_super.jpg"
          alt="WR Super"
          style={{ width: "300px", height: "auto", objectFit: "contain" }}
        />
        <Typography variant="body2" align="center">
          주거래고객에게 우대금리를 제공
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EditorsPickCard;
