import axios from "axios"

const loansApiClient = axios.create(
    {
        baseURL : "http://localhost/finance/loans"
    }
)

export const findLoanList = (param) => loansApiClient.get(param)
export const findCompanyList = () => loansApiClient.get('/companies')
export const findLoanDetail = (category, id) => loansApiClient.get(`${category}/${id}`)
