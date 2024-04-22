
export const searchCondition = {
    mortgages: {
      lendRateType: {
        "": "금리유형",
        F: "고정금리",
        C: "변동금리",
      },
      rpayType: {
        "": "상환유형",
        S: "만기일시상환방식",
        D: "분활상환방식",
      },
      sort: {
        "": "정렬조건",
        'lendRateMin,asc': "최저금리낮은순",
        'lendRateMin,desc': "최저금리높은순",
        'lendRateMax,asc': "최대금리낮은순",
        'lendRateMax,desc': "최대금리높은순",
      },
      
    },
    credits: {
      crdtPrdtType: {
        "": "상품유형",
        "1": "일반신용대출",
        "2": "마이너스한도대출",
        "3": "장기카드대출(카드론)",
      },
      crdtLendRateType: {
        "": "금리타입",
        A: "대출금리",
        B: "기준금리",
        C: "가산금리",
        D: "가감조정금리",
      },
      sort: {
        "": "정렬조건",
        'crdtGradAvg,asc': "평균금리낮은순",
        'crdtGradAvg,desc': "평균금리높은순",
      },
    },
    'rent-houses': {
      lendRateType: {
        "": "금리유형",
        F: "고정금리",
        C: "변동금리",
      },
      rpayType: {
        "": "상환유형",
        S: "만기일시상환방식",
        D: "분활상환방식",
      },
      sort: {
        "": "정렬조건",
        'lendRateMin,asc': "최저금리낮은순",
        'lendRateMin,desc': "최저금리높은순",
        'lendRateMax,asc': "최대금리낮은순",
        'lendRateMax,desc': "최대금리높은순",
      },
    },
  };
  
  export const categories = [
        {
          media: 'fi-museum',
          color: 'success',
          value: 'mortgages',
          title: '주택담보대출'
        },
        {
          media: 'fi-credit-card',
          color: 'accent',
          value: 'credits',
          title: '개인신용대출'
        },
        {
          media: 'fi-building',
          color: 'danger',
          value: 'rent-houses',
          title: '전세자금대출'
        },
    ]  