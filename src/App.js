import React, { useState, useEffect } from 'react';
import './App.css';
import { Grid, IconButton, Drawer, Box, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './components/SideBar/Sidebar';
import Player from './components/SongPlayer/Player';
import MusicList from './components/SongsList/MusicList';
import spotify from './spotify.png';
import { SONGS_API } from './components/constant/constant';
import { addDuration } from './components/constant/constant';

function App() {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [topData, setTopData] = useState([]);
  const [music, setMusic] = useState(1);
  const [color, setColor] = useState("#331A05");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:960px)'); // Adjust the breakpoint as needed

  const filterTopTracks = (filterdata) => {
    return filterdata?.filter(track => track?.top_track);
  };

  const handleImage = (music) => {
    const temp = data?.find((item) => item.id === music);
    if (temp) {
      console.log(temp.id, music, temp.cover);
      return temp.cover;
    }
  };
  const handleColor = (music) => {
    const temp = data?.find((item) => item.id === music);
    if (temp) {
      console.log(temp.id, music, temp.cover);
      setColor(temp.accent)
    }
  };


  const handleMp3 = (music) => {
    const temp = data?.find((item) => item.id === music);
    if (temp) {
      console.log(temp.id, music, temp.url);
      return temp.url;
    }
  };

  const handleTrack = (music) => {
    const temp = data?.find((item) => item.id === music);
    if (temp) {
      return temp;
    }
  };

  async function getData() {
    try {
      const response = await fetch(SONGS_API);
      const res = await response.json();
      const { data } = res;
      const tempData = await addDuration(data);
      console.log(tempData, "tempData")
      setData(tempData);
      setAllData(tempData);
      setTopData(filterTopTracks(tempData));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Grid container justifyContent="space-between" spacing={2} sx={{ backgroundColor: color,transition:'background-color 1s ease', height: '100vh', margin: 0, overflow: 'hidden' }}>
      {!isSmallScreen && (
        <Grid item md={3} marginTop='-20px'>
          <Sidebar img={spotify} />
        </Grid>
      )}
      {!isSmallScreen && (
        <Grid item md={4}>
          <MusicList allData={allData} data={data} topData={topData} setAllData={setAllData} setTopData={setTopData} setMusic={setMusic} setColor={setColor} color={color} />
        </Grid>
      )}
      <Grid item marginTop='10px' md={isSmallScreen ? 12 : 5}>
        <Player imageUrl={handleImage(music)} mp3Url={handleMp3(music)} setMusic={setMusic} music={music} backgroundColor={color} track={handleTrack(music)} handleColor={handleColor} />
      </Grid>
      {isSmallScreen && (
        <>
          <IconButton onClick={() => setDrawerOpen(true)} sx={{ position: 'fixed', top: 10, left: 10, zIndex: 1200 }}>
            <MenuIcon sx={{ color: 'white' }} />
          </IconButton>
          <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <Box sx={{ width: 250, backgroundColor: color, height: '100%', padding:'3px' }}>
              <MusicList allData={allData} data={data} topData={topData} setAllData={setAllData} setTopData={setTopData} setMusic={setMusic} setColor={setColor} color={color} />
            </Box>
          </Drawer>
        </>
      )}
    </Grid>
  );
}

export default App;
