import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '20%',
  left: {sx:0 ,sm:'20%'},
  transform: 'translate(20%, -20%)',
  width: {sx:"auto" ,sm:'40%'},
  bgcolor: 'background.paper',
  border: '2px solid #80cbc4',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4
};

function DialogPopUp({ ComponenetToLoad, openDialogue = false, setOpenDialogue, ...args }) {
  const handleClose = () => {
    setOpenDialogue(false);
  };
  return (
    <div>
      <Modal
        open={openDialogue}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{width:"80%"}}
        id="dialogPopUp"
      >
        <Box sx={style}>{ComponenetToLoad && <ComponenetToLoad {...args}  />}</Box>
      </Modal>
    </div>
  );
}
export { DialogPopUp };
