import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { IconButton, TextField } from '@mui/material';
import axios from 'axios';
import Products from '../products/Products';
import { Link, Route, Routes } from 'react-router-dom';
import Element from '../element/Element';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddProducts from '../addProducts/AddProducts';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Category() {
    const [data, setData] = React.useState([])
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('')
    const [search, setSearch] = React.useState("")

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const getApi = async () => {
        try {
            const res = await axios.get("https://dummyjson.com/products/categories")
            setData(res.data)
        } catch (error) {

        }
    }

    React.useEffect(() => {
        getApi()
    }, [])

    const [add, setAdd] = React.useState([])
    const dub = [...new Set(add)]
    console.log(dub);

    const hadleAdd = (e) => {
        setAdd([...add, e])
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        Category
                    </IconButton>
                    <TextField fullWidth label="Search" color='warning' onChange={(e) => setSearch(e.target.value)} />
                    <Link to='/add' style={{ color: 'black' }}>
                        <ShoppingCartIcon sx={{ fontSize: "30px" }} />
                    </Link>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {"<"}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <Link to='/' style={{ color: 'black', textDecoration: 'none' }}>
                        <ListItem disablePadding onClick={() => setName("")}>
                            <ListItemButton>
                                <ListItemText primary="All product" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    {data.map((e) => (
                        <>
                            {e === name ?
                                <ListItem key={e} disablePadding onClick={() => setName(e)} sx={{ color: "blue" }}>
                                    <Link to='/' style={{ color: 'black', textDecoration: 'none' }}>
                                        <ListItemButton>
                                            <ListItemText primary={e} />
                                        </ListItemButton>
                                    </Link>
                                </ListItem>
                                :
                                <ListItem key={e} disablePadding onClick={() => setName(e)} sx={{ color: "black" }}>
                                    <Link to='/' style={{ color: 'black', textDecoration: 'none' }}>
                                        <ListItemButton>
                                            <ListItemText primary={e} />
                                        </ListItemButton>
                                    </Link>
                                </ListItem>
                            }
                        </>
                    ))}
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <Routes>
                    <Route path='/' element={<Products name={name} search={search} add={hadleAdd} />} />
                    <Route path='/:id' element={<Element />} />
                    <Route path='/add' element={<AddProducts id={dub} add={hadleAdd} />} />
                </Routes>
            </Main>
        </Box>
    );
}