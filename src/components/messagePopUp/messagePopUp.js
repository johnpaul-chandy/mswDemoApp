import Button from '@mui/material/Button';
import { DialogPopUp } from '../DialogPopUp/DialogPopUp';
import { Typography ,Box} from '@mui/material';
import { teal  } from '@mui/material/colors';

export default function AlertDialog({message,alertOpen,setAlertOpen,handleOk,handleCancel}) {
  
  const handleClickOk = () => {
    setAlertOpen(true);
    handleOk && handleOk();
  };

  const handleClickCancel = () => {
    setAlertOpen(false);
    handleCancel && handleCancel();
  };

  return (
    <>
        <DialogPopUp 
            ComponenetToLoad={MessageComp} 
            openDialogue={alertOpen} 
            message={message} 
            setOpenDialogue={setAlertOpen} 
            handleClickOk={handleClickOk} 
            handleClickCancel={handleClickCancel}  

        />
    </>
  );
}

const MessageComp=({message,handleClickOk,handleClickCancel})=>{
    return(
        <>
            <Box  sx={{width:"auto"}}>
                <Typography>
                    {message}
                </Typography>
                <Box             sx={{
              display: 'grid',
              gridAutoColumns: '1fr',
              marginTop:"12px",
              gap :1
            }}>
                    <Button variant="contained" onClick={handleClickCancel}  sx={{ width:"100px",gridRow: '1', gridColumn: '6' }}>Cancel</Button>
                    <Button variant="contained" onClick={handleClickOk}  sx={{ gridRow: '1', gridColumn: '7' }}>OK</Button>
                </Box>
            </Box>
        </>
    );
}