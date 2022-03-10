import Box from '@mui/material/Box';

interface SelectButtonPros {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

const SelectButton = ({ children, selected, onClick }: SelectButtonPros) => {
  return (
    <Box
      sx={{
        border: '1px solid gold',
        borderRadius: 3,
        p: 1,
        pl: 2,
        pr: 3,
        cursor: 'pointer',
        backgroundColor: selected ? 'gold' : '',
        color: selected ? 'black' : '',
        fontWeight: selected ? 'bold' : 'normal',
        '&:hover': {
          backgroundColor: 'gold',
          color: 'black',
        },
        width: '22%',
      }}
      onClick={onClick}
    >
      {children}
    </Box>
  );
};

export default SelectButton;
