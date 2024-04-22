
import { Button, Card, Col, FormControl, InputGroup, Row, Table } from "react-bootstrap";
import { Main } from "../../../../layouts";
import ImageLoader from "../../../../components/ImageLoader";
import IconBox from "../../../../components/IconBox";
import React, { useState, useEffect, useRef } from 'react';
// import SockJS from 'sockjs-client';
// import Stomp from 'socket.io-client';
import Stomp from 'webstomp-client';
// import Stomp from 'stompjs';
import axios from "axios";
import { useRouter } from "next/router";
import SockJS from "sockjs-client";

// npm install socket.io-client --force
// npm install sockjs-client --force
// 아래 두개
// npm install webstomp-client --legacy-peer-deps
// npm install sockjs-client --legacy-peer-deps


const rightBalloonStyle = {
    position: 'relative',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    marginBottom: '16px',
  };
  
  const rightBalloonBeforeStyle = {
    content: '',
    position: 'absolute',
    bottom: '100%',
    left: '100%',
    border: '12px solid transparent',
    borderRightColor: '#ffffff',
    transform: 'translateX(-50%)',
  };

  const leftBalloonStyle = {
    position: 'relative',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    marginBottom: '16px',
  };
  
  const leftBalloonBeforeStyle = {
    content: '',
    position: 'absolute',
    bottom: '100%',
    right: '100%',
    border: '12px solid transparent',
    borderLeftColor: '#ffffff',
    transform: 'translateX(50%)',
  };

const PartyChat = () => {
    const chatContainerRef = useRef(null);
    const router = useRouter();
    const client = useRef(null);
    const [chatList, setChatList] = useState([]);
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [roomId, setRoomId] = useState(null);
    const [chat, setChat] = useState('');
    const [connected, setConnected] = useState(false);
    const [areYouJoined, setAreYouJoined] = useState(false);
    const [profile, setProfile] = useState(1);
    const [partyMemberInfo, setPartyMemberInfo] = useState();

    useEffect(() => {
        if(!router.isReady) {
            return;
        }
        setRoomId(router.query.detail);
        getLoginInfo();
        getChatList(); // 컴포넌트가 마운트될 때 API 요청 보내기
        getPartyMemberInfo();

        const socket = new SockJS("http://localhost/chat");
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            console.log("Connected to WebSocket");
            setConnected(true);
            client.current = stompClient;
        })
        return () => {
            if (client.current) {
                client.current.disconnect();
            }
        };
        
      }, [router.isReady]);

      useEffect(() => {
        if (!connected || !client.current) {
            return;
        }
    
        const subscription = client.current.subscribe(`/topic/${router.query.detail}`, (message) => {
            console.log('Received message: ', JSON.parse(message.body));
            const receivedMessage = JSON.parse(message.body);
            setChatList(prevChatList => [...prevChatList, receivedMessage]);
        });
    
        // 구독 해제 함수 반환
        return () => {
            subscription.unsubscribe();
        };
    }, [connected]); // 연결 상태가 변경될 때마다 구독


    useEffect(() => {

        const scrollToBottom = () => {
            if (chatContainerRef.current) {
                // chatContainerRef.current.scrollIntoView({ behavior: 'smooth' });
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
          };

        scrollToBottom();
      }, [chatList]);

    
    const getLoginInfo = async () => {
    try {
        const response = await axios.get('http://localhost/memberRest/loginInfo', 
                                                        { withCredentials: true });
        console.log("로그인 정보",response)
        if (response.data.result === true) {
            const {name, mno} = response.data.member
            setUserName(name);
            setUserId(mno)
            setIsLoggedIn(true);
            getJoinedInfo();
        } else {
            alert('모임 회원만 이용할 수 있습니다.')
            location.href = `/party/${router.query.detail}`
        }
    } catch (e) {
        console.log("로그인 정보 쪽 에러",e);
        alert('로그인 권한 에러')
        location.href = `/party/${router.query.detail}`
    }
    }

    const getJoinedInfo = async () => {
        try {
            const response = await axios.get(`http://localhost/parties/${router.query.detail}/enrollment`,
                                                                { withCredentials: true });
            console.log("가입여부 체크 ",response)
            if(response.data.data){
                setAreYouJoined(true)
            } else {
                alert('모임 가입 후 이용해주세요')
                location.href = `/party/${router.query.detail}`
            }
        } catch (e) {
            console.log("모임 가입여부 체크 에러", e);
            alert('회원 체크 에러입니다')
            location.href =`/party/${router.query.detail}`
        }
    }

    const getPartyMemberInfo = async () => {
        try {
            const response = await axios.get(`http://localhost/parties/${router.query.detail}/members`,
                                                                { withCredentials: true });
            console.log("파티멤버 정보", response.data.data);
            if (response.data.result) {
                setPartyMemberInfo(response.data.data);
            }
        } catch (e) {
            console.log("멤버 인포 에러", e)
        }
      }


  const getChatList = async() => {
     
        try{
            const response = await axios.get(`http://localhost/parties/${router.query.detail}/chat`,  { withCredentials: true });
            
            console.log("파티안에 리스판스",response)
            setChatList(response.data)
            
        } catch (e){
            console.log("파티 에러",e)
        }
    }


    // const connect = () => {
    //     const socket = new SockJS("http://localhost/chat");
    //     const client = Stomp.over(socket);
    //     client.cennect({}, (frame) =>{
    //         setConnected(true);
    //         console.log("Connected: " + frame);
    //         loadChat(chatList)

    //         client.subscribe(`/room/${roomId}`, (chatMessage) => {
    //             showChat(JSON.parse(chatMessage.body));
    //           });
    //     }) 
    //     setStompClient(client);
    // }

    // const connect = () => {
    //     const socket = new SockJS("http://localhost/chat");
    //     const stompClient = Stomp.over(socket);
    //     stompClient.connect({}, () => {
    //         console.log("Connected to WebSocket");
    //         setConnected(true);
    //         client.current = stompClient;
    //         subscribe(); // 구독 로직
    //     })
    // }

    // const subscribe = () => {
    //     client.current.subscribe(`/topic/${router.query.detail}`, (message) => { // 백엔드에서 보낸 채팅 메시지를 구독
    //         console.log('Received message: ', JSON.parse(message.body));
    //         const receivedMessage = JSON.parse(message.body)
    //         setChatList(prevChatList => [...prevChatList, receivedMessage]);
            
    //     })
    // }

    const publish = (data) => {
        
        console.log("퍼블리쉬 ", connected)
        // if (connected === false) {
        //     console.log("설마 리턴 당했나")
        //     return;
        // }
        if (!connected || !client.current) { // client가 null이거나 연결되지 않았을 경우 처리
            console.log("Connection not established or client not initialized");
            return;
        }
        console.log("데이터 값",data)
        console.log("데이터 타입 ", typeof data)
        client.current.send(`/send/chat/${router.query.detail}`, JSON.stringify(data), {}); // send 메서드 사용
        // client.current.publish({
        //     destination: `/chat/${roomId}` ,
        //     body: JSON.stringify(chat)
        // })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("핸들 서밋 찍혔다. ", chat)

        const data = {
            partyId: router.query.detail, // 채팅이 속한 파티의 ID
            profile: profile,
            senderName: userName, // 보내는 사용자의 이름
            senderId: userId, // 보내는 사용자의 ID
            message: chat // 사용자가 입력한 채팅 메시지
            
        }
        publish(data);
        setChat('');
    }

    // function setConnected(connected) {
    //     // set connected state logic
    //   }

    function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log('Disconnected');
    }

    function sendChat() {
        // sendChat function logic
      }
    
    function loadChat(chatList) {
    // loadChat function logic
    }

    function showChat(chatMessage) {
    // showChat function logic
    }

    return (
        <>
            <Main>
                <Row>
                    <Col sm={3} lg={3}>
                        <div className="my-3 text-center">

                            {/* <Row>

                                <Col xs={6} className="my-3">
                                    <div style={{ display: 'flex', alignItems: 'center',  border: '2px solid #ccc', borderRadius: '10px', padding: '5px 10px'
                                ,backgroundColor: profile === 1 ? 'lightblue' : 'transparent'  }}  onClick={() => setProfile(1)}>
                                        <div style={{ borderRadius: '50%', overflow: 'hidden', marginRight: '10px' }}>
                                            <ImageLoader 
                                                src='/images/myImages/profile1.jpeg'
                                                width={40}
                                                height={40}
                                                alt='Circle image'
                                                className='rounded-circle'
                                               
                                            />
                                        </div>
                                        <div>고양이</div>
                                    </div>
                                </Col>

                                <Col xs={6} className="my-3">
                                    <div style={{ display: 'flex', alignItems: 'center',  border: '2px solid #ccc', borderRadius: '10px', padding: '5px 10px'
                                 ,backgroundColor: profile === 2 ? 'lightblue' : 'transparent'   }}  onClick={() => setProfile(2)}>
                                        <div style={{ borderRadius: '50%', overflow: 'hidden', marginRight: '10px' }}>
                                            <ImageLoader 
                                                src='/images/myImages/profile2.jpeg'
                                                width={40}
                                                height={40}
                                                alt='Circle image'
                                                className='rounded-circle'
                                               
                                            />
                                        </div>
                                        <div>쿼카</div>
                                    </div>
                                </Col>

                                <Col xs={6} className="my-3">
                                    <div style={{ display: 'flex', alignItems: 'center',  border: '2px solid #ccc', borderRadius: '10px', padding: '5px 10px'
                                 ,backgroundColor: profile === 3 ? 'lightblue' : 'transparent'   }}   onClick={() => setProfile(3)}>
                                        <div style={{ borderRadius: '50%', overflow: 'hidden', marginRight: '10px' }}>
                                            <ImageLoader 
                                                src='/images/myImages/profile3.jpeg'
                                                width={40}
                                                height={40}
                                                alt='Circle image'
                                                className='rounded-circle'
                                              
                                            />
                                        </div>
                                        <div>랫서팬더</div>
                                    </div>
                                </Col>

                                <Col xs={6} className="my-3">
                                    <div style={{ display: 'flex', alignItems: 'center',  border: '2px solid #ccc', borderRadius: '10px', padding: '5px 10px'
                                 ,backgroundColor: profile ===4 ? 'lightblue' : 'transparent'   }} onClick={() => setProfile(4)}>
                                        <div style={{ borderRadius: '50%', overflow: 'hidden', marginRight: '10px' }}>
                                            <ImageLoader 
                                                src='/images/myImages/profile4.jpeg'
                                                width={40}
                                                height={40}
                                                alt='Circle image'
                                                className='rounded-circle'
                                                
                                            />
                                        </div>
                                        <div>팬더</div>
                                    </div>
                                </Col>

                                <Col xs={6} className="my-3">
                                    <div style={{ display: 'flex', alignItems: 'center',  border: '2px solid #ccc', borderRadius: '10px', padding: '5px 10px'
                                 ,backgroundColor: profile === 5 ? 'lightblue' : 'transparent'   }}  onClick={() => setProfile(5)}>
                                        <div style={{ borderRadius: '50%', overflow: 'hidden', marginRight: '10px' }}>
                                            <ImageLoader 
                                                src='/images/myImages/profile5.jpeg'
                                                width={40}
                                                height={40}
                                                alt='Circle image'
                                                className='rounded-circle'
                                               
                                            />
                                        </div>
                                        <div>햄스터</div>
                                    </div>
                                </Col>

                                <Col xs={6} className="my-3">
                                    <div style={{ display: 'flex', alignItems: 'center',  border: '2px solid #ccc', borderRadius: '10px', padding: '5px 10px'
                                 ,backgroundColor: profile === 6 ? 'lightblue' : 'transparent'   }}  onClick={() => setProfile(6)}>
                                        <div style={{ borderRadius: '50%', overflow: 'hidden', marginRight: '10px' }}>
                                            <ImageLoader 
                                                src='/images/myImages/profile6.jpeg'
                                                width={40}
                                                height={40}
                                                alt='Circle image'
                                                className='rounded-circle'
                                               
                                            />
                                        </div>
                                        <div>물개</div>
                                    </div>
                                </Col>

                                <Col xs={6} className="my-3">
                                    <div style={{ display: 'flex', alignItems: 'center',  border: '2px solid #ccc', borderRadius: '10px', padding: '5px 10px'
                                 ,backgroundColor: profile === 7 ? 'lightblue' : 'transparent'   }} onClick={() => setProfile(7)}>
                                        <div style={{ borderRadius: '50%', overflow: 'hidden', marginRight: '10px' }}>
                                            <ImageLoader 
                                                src='/images/myImages/profile7.jpeg'
                                                width={40}
                                                height={40}
                                                alt='Circle image'
                                                className='rounded-circle'
                                                
                                            />
                                        </div>
                                        <div>강아지</div>
                                    </div>
                                </Col>

                                <Col xs={6} className="my-3">
                                    <div style={{ display: 'flex', alignItems: 'center',  border: '2px solid #ccc', borderRadius: '10px', padding: '5px 10px'
                                 ,backgroundColor: profile === 8 ? 'lightblue' : 'transparent'   }}   onClick={() => setProfile(8)}>
                                        <div style={{ borderRadius: '50%', overflow: 'hidden', marginRight: '10px' }}>
                                            <ImageLoader 
                                                src='/images/myImages/profile8.jpeg'
                                                width={40}
                                                height={40}
                                                alt='Circle image'
                                                className='rounded-circle'
                                              
                                            />
                                        </div>
                                        <div>다람쥐</div>
                                    </div>
                                </Col>

                            </Row> */}

                            <div className='text-center m-5'> <h4>회원 목록</h4></div>
                            <div className=' col-10 mx-auto' style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                        <th>#</th>
                                        <th>회원명</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {partyMemberInfo && 
                                            Object.keys(partyMemberInfo).map((key, indx) => {
                                                const member = partyMemberInfo[key];
                                                return (
                                                    <tr key={indx}>
                                                        <th scope='row'>{indx + 1}</th>
                                                        <td>{member.name}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </Col>


                    <Col sm={10} lg={7}>
                         <div  ref={chatContainerRef} style={{maxHeight: '500px', height: 'calc(100vh - 20px)', overflowY: 'auto', backgroundColor: '#36393f' }}>
                            <div className="m-4 text-white">


{chatList.map((message, index) => (
            <div key={index} className="my-4">
                                    <Row>
                                        <Col xs={2}>
                                            <img
                                            src='/images/myImages/common.jpeg'
                                            width={40}
                                            height={40}
                                            alt='Circle image'
                                            className='rounded-circle'
                                            />
                                        </Col>
                                            <Col >
                                        <div style={{marginLeft : '-40px'}}>
                                                <Row className="align-items-center">
                                                <Col xs="auto"><b>{message.senderName}{message.profile}</b></Col>
                                                <Col xs="auto">
                                                    <div style={{ fontSize: 'smaller', color: 'gray' }}>{message.rendTime}</div>
                                                </Col>
                                                </Row>
                                                <Row>
                                                <Col>{message.message}</Col>
                                                </Row>
                                        </div>
                                            </Col>
                                    </Row>
                                </div>
        ))}
                            </div>

                        </div>
  <div>
      <div>
        
      
      </div>
         <form onSubmit={handleSubmit}>
                                        <InputGroup>
                                            <FormControl
                                                placeholder='채팅을 입력해주세요'
                                                aria-label='Example text input with button addon'
                                                aria-describedby='right-button-addon'
                                                value={chat}
                                                onChange={(e) => setChat(e.target.value)}
                                            />
                                            <Button type="submit" variant="accent" id='right-button-addon'>입력</Button>
                                        </InputGroup>
                                    </form>
    </div>

                    </Col>






                    <Col sm={0}lg={2}>
                    {/* <div className='text-center m-5'> <h4>회원 목록</h4></div>
                            <div className=' col-10 mx-auto' style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                        <th>#</th>
                                        <th>회원명</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {partyMemberInfo && 
                                            Object.keys(partyMemberInfo).map((key, indx) => {
                                                const member = partyMemberInfo[key];
                                                return (
                                                    <tr key={indx}>
                                                        <th scope='row'>{indx + 1}</th>
                                                        <td>{member.name}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                                </div> */}


                    </Col>

                </Row>
            </Main>
        </>
    )
}

export default PartyChat;