import Main from "layouts/Main";
import HeroAndSearchForm from "./components/HeroAndSearchForm";
import { Container } from "react-bootstrap";
import ResultList from "./components/ResultList";
import { useEffect, useState } from "react";
import {findLoanList, findCompanyList} from "./LoansApiService";

const LoansPage = () => {
    const [companies, setCompanies] = useState({});
    
    const [selectedCategory, setSelectedCategory] = useState('mortgages')
    const [searchForm, setSearchForm] = useState()
    const [searchCompanies, setSearchCompaines] = useState();
    const [keyword, setKeyword] = useState()

    const [resultList, setResultList] = useState([])
    const [pageable, setPageable] = useState({})
    const [page, setPage] = useState('')

    const handleChangeCategory = (category) => {
        setSearchForm()
        setPage('')
        setSelectedCategory(category)
        console.log("론페이지에서 왔다 ",selectedCategory)
    }

    const handleChangeSearchForm = (selectedValues, keyword, selectedCompanies) => {
        setSearchForm((prevForm) => ({
            ...prevForm, ...selectedValues
        }))
        setPage('')
        setKeyword(keyword)
        setSearchCompaines(selectedCompanies);
    }
    
    const searchParamResolver = () => {
        let searchParam = '/' + selectedCategory
        searchParam += (page? '?page=' + page : '?page=0');

        {searchForm && Object.keys(searchForm).map((key) => {
            {searchForm[key] && (searchParam += ('&' +key + '=' + searchForm[key]))}
        })}
        {searchCompanies && searchCompanies.map((company) => {
            searchParam += ('&companies=' + company)
        })}
        {keyword && `${searchParam += ('&keyword='+keyword)}`}
        return searchParam
    }

    useEffect(() => {
        const handleGetCompany = async () => {
            try {
                const response = await findCompanyList();
                
                console.log("여기 회사 정보봐라!!!", response);
                const {data}  = response;
                setCompanies(data)

            } catch (error) {
                console.error("컴파니 못받아왔다 큰일났다.", error)
            }
        }
        handleGetCompany();
    }, [selectedCategory])

    useEffect(() => {
        const param = searchParamResolver()
        console.log("파람을 보거라ㅇㅁㄴㅇㅁㄴㅇㄹㄴ",param);
        
        const handleFetchData = async () => {
            try {
                const response = await findLoanList(param);

                console.log("여기가 응답이다!!!",response.data);
                const { content, pageable} = response.data;
                setResultList(content);
                setPageable({
                    ...pageable,
                    totalPages : response.data.totalPages,
                    totalElements : response.data.totalElements
                });
            } catch (error) {
                setResultList();
                console.error('오류떴다 Error fetching data:', error);
            }
        };
        handleFetchData();

        // router.push('loan'+param); // 나중에 url 처리할때 이용하기 에휴 모르겠다.

    }, [selectedCategory, searchForm, page]); 

    return (
        <>
            <Main>
                <Container>
                    <HeroAndSearchForm 
                    selectedCategory={selectedCategory} 
                    onChangeCategoryHandler={handleChangeCategory} 
                    onChangeSearchFormHandler={handleChangeSearchForm} 
                    bankFin={companies}/>
                </Container>
                <Container className="mt-3">
                    <ResultList resultList={resultList} onChangePageHandler={setPage} pageable={pageable} category={selectedCategory} />
                </Container>
            </Main>
        </>
    )
}

export default LoansPage;