
import { useEffect, useState } from 'react';

import axios from 'axios';
import { Card, Table } from "react-bootstrap"
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import DetailView from './detailView';
import { Link } from 'react-router-dom';



const HousingView = ({ houseManageNo, houseNm, hssplyAdres, cnstrctEntrpsNm, totSuplyHshldco, bsnsMbyNm, houseSecdNm }) => {



  
 // console.log(houseManageNo)
 // console.log(houseNm);
  const router = useRouter();
  const [housingType, setHousingType] = useState([]);
  const [selectedCntrctAr, setSelectedCntrctAr] = useState();
  const [selectedExcluseAr, setSelectedExcluseAr] = useState();
  const [selectedHouseTy, setSelectedHouseTy] = useState();
  const [selectedLttotTopAmount, setSelectedLttotTopAmount] = useState();
  const [selectedSuplyAr, setSelectedSuplyAr] = useState();
  const [selectedSuplyHshldco, setSelectedSuplyHshldco] = useState();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    //console.log(houseManageNo);


    getHousingType(houseManageNo);

  }, [router.isReady]);



  const getHousingType = async (houseManageNo) => {
    try {
      var url = 'http://localhost/housingType'
      if (houseManageNo != null) {
        url = url + '?houseManageNo=' + houseManageNo;
        console.log(houseManageNo);
        const response = await axios.get(url, { withCredentials: true });
        console.log(response.data.list);
        setHousingType(response.data.list);

      }

    } catch (e) {
      console.log(e);
    }
  }

  const typeList = housingType.map((item) => ({
    houseNm: item.houseNm, suplyHshldco: item.suplyHshldco, lttotTopAmount: item.lttotTopAmount,
    housingType: item.housingType, cntrctAr: item.cntrctAr, excluseAr: item.excluseAr,
    houseTy: item.houseTy, suplyAr: item.suplyAr
    
    
  })) 

  const setParameterForDetailView = (cntrctAr, excluseAr, houseTy, lttotTopAmount, suplyAr, suplyHshldco) => {
    console.log(cntrctAr);
    setSelectedCntrctAr(cntrctAr);
    setSelectedExcluseAr(excluseAr);
    setSelectedHouseTy(houseTy)
    setSelectedLttotTopAmount(lttotTopAmount);
    setSelectedSuplyAr(suplyAr);
    setSelectedSuplyHshldco(suplyHshldco);

  }



  console.log(selectedCntrctAr);
  




 
  return (


    <>
      <div>

        <Card className="border-0  mb-5" style={{ marginTop: '20px', height: '300px' }}>
          <Card.Header className="bg-gray-100 py-4 border-0">
            <div className="d-flex align-items-center justify-content-between">
              <div>

                <h4 className="mb-0">{houseNm}</h4>

              </div>
              {/* <Icon
                          icon="wall-clock-1"
                          className="svg-icon-light w-3rem h-3rem ms-3 text-muted"
                        /> */}
            </div>
          </Card.Header>
          <Card.Body>
            <Table className="text-sm mb-0" style={{ height: '70px' }}>
              <tbody>

                <tr>
                  <th className style={{ height: '70px', width: '100px' }}>
                    공급규모
                  </th>
                  <td>
                    {totSuplyHshldco}
                  </td>
                </tr>

                <tr>
                  <th style={{ height: '70px', width: '100px' }}>
                    공급위치
                  </th>
                  <td>
                    {hssplyAdres}
                  </td>
                </tr>

                <tr>
                  <th style={{ height: '70px', width: '100px' }}>
                    시행사
                  </th>
                  <td>
                    {bsnsMbyNm}
                  </td>
                </tr>

                <tr>
                  <th style={{ height: '70px', width: '100px' }}>
                    주택종류
                  </th>
                  <td>
                    {houseSecdNm}
                  </td>
                </tr>
              </tbody>
            </Table>
            
            
            <div style={{}}>
              

                 <a href={'/housing/detailView?houseManageNo=' + houseManageNo}> 자세히보기</a>
              
             
              </div>
          </Card.Body>
        </Card>
                  

        {/* Add your view component content here */}
      </div>
    </>

  )

}
export default HousingView