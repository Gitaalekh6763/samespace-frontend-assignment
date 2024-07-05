import React, { useState, useEffect } from 'react';
import { Grid, Typography, Input, Box, Avatar} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
// import { Avatar } from '@mui/material';
// import { Box } from '@mui/material';
import { lighten } from 'polished';


function MusicList({ allData, setAllData, topData, setTopData, data, setMusic, setColor, color }) {
    const [searchInput, setSearchInput] = useState('');
    const [stage, setStage] = useState(0);
    console.log(allData, "allData")
    // console.log("musiclist", allData, topData)
    const handleTrackClick = (track) => {
        setMusic(track.id);
        setColor(track.accent);
    };

    useEffect(() => {
        if (stage === 0) {
            const filtered = data?.filter(track =>
                track.name.toLowerCase()?.includes(searchInput.toLowerCase()) ||
                track.artist.toLowerCase()?.includes(searchInput.toLowerCase())
            );
            setAllData(filtered);
        }
        else {
            const filtered = data.filter(track => track?.top_track &&
                (track.name.toLowerCase()?.includes(searchInput.toLowerCase()) ||
                    track.artist.toLowerCase()?.includes(searchInput.toLowerCase()))
            );
            setTopData(filtered);
        }
    }, [searchInput]);

    const handleChange = (event) => {
        setSearchInput(event.target.value);
    };
   
    return (
        <Grid>
            <Grid container justifyContent="flex-start" sx={{ marginBottom: 2, marginTop: 4, padding:'3px'}}>
                {stage === 0 ? <Typography sx={{ marginRight: 4, color: 'white', cursor: 'pointer' }} onClick={() => setStage(0)}>For You</Typography> : <Typography sx={{ marginRight: 4, color: 'gray', cursor: 'pointer' }} onClick={() => setStage(0)}>For You</Typography>}
                {stage === 1 ? <Typography sx={{ color: 'white', cursor: 'pointer' }} onClick={() => setStage(1)}>Top Tracks</Typography> : <Typography sx={{ color: 'gray', cursor: 'pointer' }} onClick={() => setStage(1)}>Top Tracks</Typography>}
            </Grid>
            <Input
                
                sx={{
                    padding: '4px',
                    width: '88%',
                    marginBottom: 2,
                    borderRadius: '7px',
                    background: lighten(0.2, color),
                    transition: 'background-color 1s ease',
                    color: 'white',
                    '& .MuiInputBase-input': {
                        color: 'white'
                    },
                    '& .MuiInputAdornment-root': {
                        color: 'white'
                    }
                }}
                placeholder="Search Song, Artist"
                onChange={handleChange}
                endAdornment={
                    <InputAdornment position="end">
                        <SearchIcon />
                    </InputAdornment>
                }
            />
            <Grid >
                {
                    stage === 0 ? (allData.map(track => (
                        <Grid 
                            alignItems="center"
                            alignContent="center"
                            
                            item
                            key={track.id}
                            xs={12}
                            onClick={() => handleTrackClick(track)}
                            
                            sx={{
                                
                                height: '70px',
                                cursor: 'pointer',
                                '&:hover': {
                                    borderRadius: '7px',
                                    backgroundColor: lighten(0.2,color),
                                    transition: 'background-color 0.5s ease',
                                    width:'100%',
                                    overflow:'hidden' // Change the color as needed
                                },
                            }}
                        >
                            
                            <Grid container flex justifyContent="flex-start">
                                <Grid item  >
                                    <Box >
                                        <Avatar alt="Avatar" src={`https://cms.samespace.com/assets/${track.cover}`} style={{ width: '45px', height: '45px', marginRight: '10px', marginLeft: '2px' }} />
                                    </Box>

                                </Grid>
                                <Grid item sx={{ width: '70%' }}>
                                    <Grid container flex justifyContent="space-between">
                                        <Grid item flex justifyContent="flex-start" >
                                            <Typography sx={{ color: 'white' }}>{track.name}</Typography>
                                            <Typography sx={{ color: 'gray', }}> {track.artist}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography sx={{ color: 'gray', marginTop:'22px'}}> {track.duration}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            
                        </Grid>
                    ))) : (topData.map(track => (
                        <Grid
                            item
                            alignItems="center"
                            alignContent="center"
                            key={track.id}
                            xs={12}
                            onClick={() => handleTrackClick(track)}
                            sx={{
                                height: '70px',
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: lighten(0.2, color),
                                    borderRadius:'7px' 
                                },
                            }}
                        >
                            <Grid container flex justifyContent="flex-start" >
                                <Grid item  >
                                    <Box >
                                        <Avatar alt="Avatar" src={`https://cms.samespace.com/assets/${track.cover}`} style={{ width: '45px', height: '45px', marginRight: '10px' }} />
                                    </Box>

                                </Grid>
                                <Grid item sx={{ width: '70%' }}>
                                    <Grid container flex justifyContent="space-between">
                                        <Grid item flex justifyContent="flex-start" >
                                            <Typography sx={{ color: 'white' }}>{track.name}</Typography>
                                            <Typography sx={{ color: 'gray' }}> {track.artist}</Typography>
                                        </Grid>
                                        <Grid item >
                                            <Typography sx={{ color: 'gray'  }}> {track.duration}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    )))
                }
            </Grid>
        </Grid>
    );
}

export default MusicList;
