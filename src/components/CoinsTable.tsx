import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { CryptoState } from '../context/CryptoContext';
import { numberWithComma } from './Banner/Carousel';

const useStyles = makeStyles(() => ({
  tableBodyRow: {
    backgroundColor: '#16171a',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#131111',
    },
  },
}));

const CoinsTable = () => {
  const classes = useStyles();

  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const { currency, symbol, coins, loading, fetchCoins } = CryptoState();

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  console.log(coins);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    return coins.filter(
      (coin: any) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container sx={{ textAlign: 'center' }}>
        <Typography variant='h4' sx={{ m: 3 }}>
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label='Search for a Cryptocurrency'
          variant='outlined'
          sx={{ mb: 5, width: '80%' }}
          onChange={handleChange}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress sx={{ backgroundColor: 'gold' }} />
          ) : (
            <Table>
              <TableHead sx={{ backgroundColor: '#EEBC1D' }}>
                <TableRow>
                  {['Coin', 'Price', '24h Change', 'Market Cap'].map((head) => (
                    <TableCell
                      sx={{ color: 'black', fontWeight: 'bold' }}
                      key={head}
                      align={head === 'Coin' ? 'left' : 'right'}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row: any) => {
                    const profit = row.price_change_percentage_24h > 0;

                    return (
                      <TableRow key={row.name} className={classes.tableBodyRow}>
                        <TableCell
                          component='th'
                          scope='row'
                          sx={{ display: 'flex', gap: 3 }}
                        >
                          <Link href={`coins/${row.id}`}>
                            <a>
                              <Image
                                src={row?.image}
                                alt={row.name}
                                width='50'
                                height='50'
                              />
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                }}
                              >
                                <span
                                  style={{
                                    textTransform: 'uppercase',
                                    fontSize: 22,
                                  }}
                                >
                                  {row.symbol}
                                </span>
                                <span style={{ color: 'darkgrey' }}>
                                  {row.name}
                                </span>
                              </div>
                            </a>
                          </Link>
                        </TableCell>
                        <TableCell
                          align='right'
                          sx={{ fontSize: 22, fontWeight: 'bold' }}
                        >
                          {symbol}{' '}
                          {numberWithComma(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align='right'
                          sx={{
                            color: profit ? 'rgb(14, 203, 129' : 'red',
                            fontSize: 22,
                            fontWeight: 'bold',
                          }}
                        >
                          {profit && '+'}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell
                          align='right'
                          sx={{ fontSize: 22, fontWeight: 'bold' }}
                        >
                          {symbol}{' '}
                          {numberWithComma(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          count={+(handleSearch()?.length / 10).toFixed(0)}
          sx={{
            p: 3,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            '& .MuiPaginationItem-root': { color: 'gold' },
          }}
          onChange={(_, value: number) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};
export default CoinsTable;
