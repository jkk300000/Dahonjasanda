import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const InsertForm = ({slist, wlist}) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleChange = (event) => {
        setName(event.target.value);
    };

    const handleChangePrice = (event) => {
        setPrice(event.target.value);
    };

    const handleChangeQuantity = (event) => {
        setQuantity(event.target.value);
    };

    const onSubmitWrite = (event) => {
        event.preventDefault();
        const data = {
            sname: name,
            price: price,
            quantity: quantity
        };
        console.log("@@@@@",data);
        writeRequest(data);
        
    }

    const writeRequest = async (data) => {
        try {
            let axiosConfig = {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                }
            }
            const response = await axios.post('http://localhost/stock/wallet/write', data, axiosConfig);
            if (response.data.result === true) {
                alert('매매 등록하였습니다.');
                location.href = "/stock/mystock"
                return;
            } else {
                alert(' 등록 실패!');
            }
        } catch (e) {
            console.log(e);
            alert(' 등록 실패!!!!');
        }
    }

    return (
        <Box>
            <FormControl>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography
                        variant={'subtitle2'}
                        sx={{ marginBottom: 2 }}
                        fontWeight={700}
                        >
                        종목명
                        </Typography>
                        <Select
                            value={name}
                            variant="outlined"
                            onChange={handleChange}
                            fullWidth
                        >
                            {slist.map(item => (
                                <MenuItem key={item.sno} value={item.sname}>{item.sname}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                        variant={'subtitle2'}
                        sx={{ marginBottom: 2 }}
                        fontWeight={700}
                        >
                        구매가격
                        </Typography>
                        <TextField
                        variant="outlined"
                        name={'text'}
                        type={'text'}
                        fullWidth
                        onChange={handleChangePrice}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                        variant={'subtitle2'}
                        sx={{ marginBottom: 2 }}
                        fontWeight={700}
                        >
                        수량
                        </Typography>
                        <TextField
                        variant="outlined"
                        name={'text'}
                        type={'text'}
                        fullWidth
                        onChange={handleChangeQuantity}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                    <Fab color="primary" aria-label="edit" onClick={onSubmitWrite}>
                        <AddIcon />
                    </Fab>
                </Box>
            </FormControl>
        </Box>
    );
};

export default InsertForm;