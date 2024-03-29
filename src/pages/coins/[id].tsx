import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import { SingleCoin } from '../../config/api';
import { CryptoState } from '../../context/CryptoContext';
import CoinInfo from '../../components/CoinInfo';
import { numberWithComma } from '../../components/Banner/Carousel';
import { db } from '../../lib/firebase';

const Coins: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [coin, setCoin] = useState<any>({});

  const { currency, symbol, user, setAlert, watchlist } = CryptoState();

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id as string));

      setCoin(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) fetchCoin();
  }, [id, currency]);

  const inWatchlist = watchlist.includes(coin?.id);

  const addToWatchlist = async () => {
    if (user) {
      console.log('click');

      const coinRef = doc(db, 'watchlist', user.uid);

      try {
        await setDoc(coinRef, {
          coins: watchlist ? [...watchlist, coin?.id] : [coin?.id],
        });

        setAlert({
          open: true,
          message: `${coin.name} Added to the Watchlist`,
          type: 'success',
        });
      } catch (error: any) {
        setAlert({
          open: true,
          message: error.message,
          type: 'error',
        });
      }
    }
  };

  const removeFromWatchlist = async () => {
    if (user) {
      console.log('click');

      const coinRef = doc(db, 'watchlist', user.uid);

      try {
        await setDoc(
          coinRef,
          {
            coins: watchlist.filter((watch) => watch !== coin?.id),
          },
          { merge: true }
        );

        setAlert({
          open: true,
          message: `${coin.name} Removed from the Watchlist`,
          type: 'success',
        });
      } catch (error: any) {
        setAlert({
          open: true,
          message: error.message,
          type: 'error',
        });
      }
    }
  };

  return !coin?.image ? (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <LinearProgress sx={{ backgroundColor: 'gold' }} />
    </Box>
  ) : (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'column', md: 'row' },
        alignItems: { xs: 'center', md: '' },
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', lg: '30%' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 3,
          borderRight: '2px solid gray',
        }}
      >
        <Image
          src={coin?.image.large}
          alt={coin?.name}
          width='200'
          height='200'
        />
        <Typography variant='h3' sx={{ fontWeight: 'bold', mt: 2 }}>
          {coin?.name}
        </Typography>
        <Typography
          variant='subtitle1'
          sx={{ width: '100%', p: 3, pb: 2, pt: 0, textAlign: 'justify' }}
        >
          {ReactHtmlParser(coin?.description.en.split('. ')[0])}
        </Typography>
        <Box
          sx={{
            alignSelf: 'start',
            p: 3,
            pt: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: {
              xs: 'flex-start',
              sm: 'center',
              md: 'flex-start',
            },
            alignItems: { xs: 'start', sm: 'center', md: 'start' },
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Typography variant='h6'>Current Price:</Typography>
            &nbsp; &nbsp;
            <Typography variant='h6'>
              {symbol}{' '}
              {numberWithComma(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography variant='h6'>Market Cap:</Typography>
            &nbsp; &nbsp;
            <Typography variant='h5'>
              {symbol}{' '}
              {numberWithComma(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, 6)
              )}
              M
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography variant='h5'>Rank:</Typography>
            &nbsp; &nbsp;
            <Typography variant='h5'>{coin?.market_cap_rank}</Typography>
          </Box>

          {user && (
            <Button
              variant='outlined'
              sx={{
                width: '100%',
                height: 40,
                color: 'black',
                backgroundColor: inWatchlist ? '#aa0000' : '#EEBC1D',
              }}
              onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
            >
              {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </Button>
          )}
        </Box>
      </Box>

      <CoinInfo coin={coin} />
    </Box>
  );
};

export default Coins;
