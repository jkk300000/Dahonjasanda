import axios from "axios"

const depositsApiClient = axios.create(
  {
      baseURL : "http://localhost/finance/deposits/"
  }
)

export const findDepositList = (param) => {
  console.log(`Calling API with URL: ${depositsApiClient.defaults.baseURL}${param}`);
  return depositsApiClient.get(param);
}

export const findCompanyList = () => depositsApiClient.get('/companies')

export const findDepositDetail = (category, id) => depositsApiClient.get(`${category}/${id}`)

export const findTopInterestRateSavings = () => depositsApiClient.get('/savings/top-interest-rates');

export const findTopInterestRateTermDeposits = () => depositsApiClient.get('/term-deposits/top-interest-rates');