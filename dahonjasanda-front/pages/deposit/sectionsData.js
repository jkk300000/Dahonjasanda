export const sectionsData = [
    {
      title: "term-deposits",
      groups: [
        {
          name: "companies",
          options: [
            { name: "한국산업은행", value: "0010030" },
            { name: "NH농협은행", value: "0013175"},
            { name: "신한은행", value: "0011625" },
            { name: "우리은행", value: "0010001" },
            { name: "SC제일은행", value: "0010002"},
            { name: "하나은행", value: "0013909" },
            { name: "IBK기업은행", value: "0010026" },
            { name: "KB국민은행", value: "0010927" },
            { name: "Sh수협은행", value: "0014807" },
            { name: "DGB대구은행", value: "0010016" },
            { name: "BNK부산은행", value: "0010017" },
            { name: "광주은행", value: "0010019" },
            { name: "제주은행", value: "0010020" },
            { name: "전북은행", value: "0010022"},
            { name: "BNK경남은행", value: "0010024" },
            { name: "케이뱅크", value: "0014674"},
            { name: "대명저축은행", value: "0010485"},
            { name: "웰컴저축은행", value: "0013350"},
            { name: "Ok저축은행", value: "0013351"},
          ],
        },
        {
          name: "intrRateType",
          options: [
            { name: "단리", value: "S" },
            { name: "복리", value: "M" },
          ],
        },
        {
          name: "saveTrm",
          options: [
            { name: "1개월", value: "1" },
            { name: "3개월", value: "3" },
            { name: "6개월", value: "4" },
            { name: "12개월", value: "12" },
            { name: "24개월", value: "24" },
            { name: "36개월", value: "36" },
          ],
        },
      ],
      sortOptions: [
        { value: "intrRate", text: "기본금리" },
        { value: "intrRate2", text: "최고금리" },
      ],
    },
    {
      title: "savings",
      groups: [
        {
          name: "companies",
          options: [
            { name: "KDB산업은행", value: "0010030" },
            { name: "NH농협은행", value: "0013175"},
            { name: "신한은행", value: "0011625" },
            { name: "우리은행", value: "0010001" },
            { name: "SC제일은행", value: "0010002"},
            { name: "하나은행", value: "0013909" },
            { name: "IBK기업은행", value: "0010026" },
            { name: "KB국민은행", value: "0010927" },
            { name: "Sh수협은행", value: "0014807" },
            { name: "DGB대구은행", value: "0010016" },
            { name: "BNK부산은행", value: "0010017" },
            { name: "광주은행", value: "0010019" },
            { name: "제주은행", value: "0010020" },
            { name: "전북은행", value: "0010022"},
            { name: "BNK경남은행", value: "0010024" },
            { name: "케이뱅크", value: "0014674"},
            { name: "대명저축은행", value: "0010485"},
            { name: "웰컴저축은행", value: "0013350"},
            { name: "Ok저축은행", value: "0013351"},
          ],
        },
        {
          name: "rsrvType",
          options: [
            { name: "정액적립식", value: "S" },
            { name: "자유적립식", value: "F" },
          ],
        },
        {
          name: "intrRateType",
          options: [
            { name: "단리", value: "S" },
            { name: "복리", value: "M" },
          ],
        },
        {
          name: "saveTrm",
          options: [
            { name: "1개월", value: "1" },
            { name: "3개월", value: "3" },
            { name: "6개월", value: "4" },
            { name: "12개월", value: "12" },
            { name: "24개월", value: "24" },
            { name: "36개월", value: "36" },
          ],
        },
      ],
      sortOptions: [
        { value: "intrRate", text: "기본금리" },
        { value: "intrRate2", text: "최고금리" },
      ],
    },
    {
      title: "annuity-savings",
      groups: [
        {
          name: "companies",
          options: [
            { name: "롯데손해보험", value: "0010628"},
            { name: "흥국생명보험", value: "0010596"},
            { name: "KB손해", value: "0010635"},
            { name: "삼성화재", value: "0010633"},
            { name: "에이비엘생명", value: "0010594"},
            { name: "한화생명", value: "0010593"},
            { name: "농협생명보험", value: "0013173"},
          ],
        },
        {
          name: "paymPrd",
          options: [
            { name: "10년", value: "10" },
            { name: "20년", value: "20" },
          ],
        },
        {
          name: "pnsnRecpTrm",
          options: [
            { name: "10년 확정", value: "A" },
            { name: "20년 확정", value: "B" },
            { name: "종신10년남", value: "C" },
            { name: "종신10년녀", value: "D" },
          ],
        },
      ],
      sortOptions: [
        { value: "monPaymAtm", text: "월납입금액" },
        { value: "pnsnRecpAmt", text: "연금수령금액" },
      ],
    }
  ];
