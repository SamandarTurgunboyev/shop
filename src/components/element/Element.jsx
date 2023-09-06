import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Rating, Typography } from '@mui/material'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Element = () => {
    const { id } = useParams()
    const [value, setValue] = useState(0);
    const [data, setData] = useState([])
    const getApi = useCallback(async () => {
        try {
            const res = await axios.get(`https://dummyjson.com/products/${id}`)
            setData(res.data)
            setValue(res.data.rating)
        } catch (error) {

        }
    }, [id])
    useEffect(() => {
        getApi()
    }, [getApi])
    return (
        <Container fixed>
            <Card sx={{ Width: "100%" }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        sx={{ minHeight: "300px" }}
                        image={data.thumbnail}
                        alt="green iguana"
                    />
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {data.title}
                        </Typography>
                        <Typography variant="h5">
                            {data.brand}
                        </Typography>
                        <Typography variant="h5">
                            Category:{data.category}
                        </Typography>
                        <Typography variant="h5">
                            Price:${data.price}
                        </Typography>
                        <Typography variant="h5">
                            Stock:${data.stock}
                        </Typography>
                        <Typography variant="h5">
                            Description:{data.description}
                        </Typography>
                        <Box
                            sx={{
                                '& > legend': { mt: 2 },
                            }}
                        >
                            <Rating name="read-only" value={value} readOnly />
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Container>
    )
}

export default Element