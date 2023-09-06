import { Box, Button, Card, CardActions, CardContent, CardMedia, Pagination, Typography } from '@mui/material'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const Search = ({ name }) => {
    const [data, setData] = useState([])
    console.log(data);
    const [page, setPage] = useState()
    const [page2, setPage2] = useState()
    console.log(data);
    const getApi = useCallback(async () => {
        try {
            const res = await axios.get(`https://dummyjson.com/products/search?q=${name}`)
            setData(res.data.products)
        } catch (error) {

        }
    }, [name])

    useEffect(() => {
        getApi()
    }, [getApi])

    const hadlePage = (e, p) => {
        setPage(p * 20);
        setPage2(p * 20 - 20)
    }

    return (
        <Box sx={{ display: "flex", flexDirection: 'column', justifyContent: "flex-end", alignItems: "flex-end", gap: '20px' }}>
            <Box sx={{ bgcolor: '#cfe8fc', minHeight: "100px", display: 'grid', gridTemplateColumns: { md: '1fr 1fr 1fr' }, gap: '20px' }}>
                {data.map((e) => {
                    return (
                        <Card key={e.id} sx={{ minHeight: "100px", color: "black" }}>
                            <CardMedia
                                sx={{ minHeight: "300px" }}
                                image={e.images[0]}
                                title="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {e.brand}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <ul style={{ listStyle: "none" }}>
                                        <li>Title:{e.title}</li>
                                        <li>Price: {e.price}</li>
                                        <li>Rating: {e.rating}</li>
                                        <li>Description: {e.description}</li>
                                    </ul>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <NavLink to={`/${e.id}`} style={{ color: 'black', textDecoration: 'none' }}>
                                    <Button size="small">Learn More</Button>
                                </NavLink>
                            </CardActions>
                        </Card>
                    )
                })}
            </Box>
            <Pagination onChange={hadlePage} count={Math.floor(data.length / 20) + 1} color="primary" />
        </Box>
    )
}

export default Search