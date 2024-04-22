import React from "react";

const Button = ({ backgroundColor, label }) => {
  const buttonStyle = {
    border: "none",
    color: "white",
    padding: "10px 20px", //버튼 크기 수정할떄 여기 이용하면 됩니다
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    borderRadius: "20px",
    margin: "15px 5px 0 10px", // 여기에 margin top 추가

    backgroundColor: backgroundColor,
  };

  return <button style={buttonStyle}>{label}</button>;
};

export default Button;
