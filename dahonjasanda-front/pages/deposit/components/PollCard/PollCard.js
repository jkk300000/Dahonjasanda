import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, ButtonGroup } from '@mui/material';
import styled from 'styled-components';
import Poll from 'react-polls';

// StyledCard 컴포넌트를 생성하여 스타일 적용
const StyledCard = styled(Card)`
  max-width: 300px; // 최대 너비를 300px로 설정
  margin: 0 auto; // 중앙 정렬
`;

const PollCard = () => {
    const pollQuestion = '금융상품 중 가장 중요한 요소는 무엇입니까?';
    const [pollAnswers, setPollAnswers] = useState([
        { option: '이자율', votes: 10 },
        { option: '세금 혜택', votes: 5 },
        { option: '자금의 유동성', votes: 2 },
        { option: '보장성', votes: 3 },
        { option: '기간의 유연성', votes: 4 },
        { option: '최소 예치금', votes: 5 },
        { option: '보너스 혜택', votes: 6 },
        { option: '자동 재투자 옵션', votes: 8 },
        { option: '온라인 접근성 및 관리', votes: 1 },
        { option: '고객 서비스의 질', votes: 0 },
        // You can add other options as needed
    ]);
    const [lastVote, setLastVote] = useState({option: '', voted: false});

    const handleVote = (voteAnswer) => {
        let newPollAnswers = [...pollAnswers]; // Clone the current state to a new array for manipulation
    
        // Check if there was a previous vote
        if (lastVote.voted) {
            // Find and decrement the vote count for the previously voted option
            newPollAnswers = newPollAnswers.map(answer => {
                if (answer.option === lastVote.option) {
                    return { ...answer, votes: answer.votes - 1 };
                }
                return answer;
            });
        }
    
        // Increment the vote count for the newly voted option
        newPollAnswers = newPollAnswers.map(answer => {
            if (answer.option === voteAnswer) {
                return { ...answer, votes: answer.votes + 1 };
            }
            return answer;
        });
    
        // Update the state with the new vote counts and set the last voted option
        setPollAnswers(newPollAnswers);
        setLastVote({
            option: voteAnswer,
            voted: true,
        });
    };

    return (
        <Card>
            <CardContent>
                <Poll question={pollQuestion} answers={pollAnswers} onVote={handleVote} />
            </CardContent>
        </Card>
    );
};

export default PollCard;
