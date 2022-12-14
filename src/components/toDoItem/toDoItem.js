import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Hidden, IconButton, Tooltip } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DialogPopUp } from '../DialogPopUp/DialogPopUp';
import { ItemDetails } from '../itemDetails/itemDetails';
import { useAddItem,useDeleteItem,useUpdateItem  } from '../../providers/queries';
import AlertDialog from '../messagePopUp/messagePopUp'
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import moment from 'moment';

function EmptyItemAdd() {
 
  const [newItem,setNewItem] = useState({});
  const [openDialogue, setOpenDialogue] = useState(false);
  const addNewTodoItem = useAddItem(  );

  const handleAddNew = (data) => {
    
    console.log(data);
    if(data.title)
    {
      let data1=data;
      setNewItem(data1);
      addNewTodoItem.mutate( {item:data1});
    }
    setOpenDialogue(false);    
  };

  const handleOpenDialogue = () => {
    setOpenDialogue(true);
  };

  const handleCancel = () => {
    setOpenDialogue(false);
  };
  return (
    <>
      <Box sx={{ minWidth: 260, maxWidth: 260 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              align="center"
              sx={{ margin: '16px 0 16px 0' }}
            >
              Add
            </Typography>
            <center>
              <IconButton
                size="small"
                sx={{ gridRow: '1', gridColumn: '6' }}
                onClick={handleOpenDialogue}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </center>
          </CardContent>
        </Card>
      </Box>
      <DialogPopUp
        openDialogue={openDialogue}
        ComponenetToLoad={ItemDetails}
        componentData={{}}
        setOpenDialogue={setOpenDialogue}
        handleCancel={handleCancel}
        handleSave={handleAddNew}
        mode={'CREATE'}
        readOnly={false}
      ></DialogPopUp>
    </>
  );
}

function ItemCard({ todoItem }) {
  
  const deleteTodoItem = useDeleteItem(  );
  const updateTodoItem = useUpdateItem();
  const [openAlert,setOpenAlert] =useState(false);
  const [message,setMessage]=useState("");
  const [mode,setMode]=useState('DISPLAY');
  const [openDialogue, setOpenDialogue] = useState(false);
  let itemColor;
  let today = moment().format("DD-MM-YYYY");

  const itemStatus ={
    N:"Not Started",
    I:"In Progress",
    D:"Done"
  };


  const handleCancel = () => {
    setOpenDialogue(false);
  };

  const handleDelete=(todoId)=>{
    deleteTodoItem.mutate({todoId:todoId});
    setOpenDialogue(false);
  }

  const handleUpdate=(updateItem)=>{
    updateTodoItem.mutate({item:updateItem});
    setOpenDialogue(false);
  }

  const handleAlert = (msg)=>{
    setOpenAlert(true);
    setMessage(msg);
  }
  const handleDisplayCard = ( )=>{
     setMode('DISPLAY');
     setOpenDialogue(true);
  }

  const handleEditCard = ( )=>{
    setMode('EDIT');
    setOpenDialogue(true);
 }

 switch (todoItem?.status)
 {
    case 'N':
      itemColor="#C70039"
      break;
    case 'I':
      itemColor="#416FF4"
      break;       
    case 'D':
      itemColor="#0ACA0A"
      break;         
 }

  return (
    <Box sx={{ minWidth: 260, maxWidth: 260 }}>
      <Card variant="outlined">
        <CardContent  onClick={handleDisplayCard}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'auto',
              gap: 1,
              gridTemplateAreas: `"dueDate . status"`
            }}
           
          >
            {/* <Box sx={{ gridArea: 'dueDate', gridRow: '1', gridColumn: '3' }}>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Due : {todoItem ? todoItem?.dueDate : '_'}
              </Typography>
            </Box> */}
 
            <Box sx={{ gridArea: 'dueDate', gridRow: '1', gridColumn: '11',display: `${todoItem?.dueDate < today ? 'block':'none'}` }}>
              <Tooltip title="Due date crossed">
                <WarningAmberIcon sx={{color:'RED'}} />
              </Tooltip>
            </Box>
 
            <Box sx={{ gridArea: 'status', gridRow: '1', gridColumn: 'span 1' }}>
              <Typography sx={{ fontSize: 14,fontWeight:700 }} color= {itemColor} gutterBottom>
                {/* {ItemStatus[Math.floor(Math.random() * 3)]} */}
                {itemStatus[ todoItem?.status   ]}
              </Typography>
            </Box>
          </Box>

          <Typography variant="h5" component="div">
            {/* be{bull}nev{bull}o{bull}lent */}
            {todoItem ? todoItem?.title : 'Title'}
          </Typography>
        </CardContent>
        <CardActions>
          <Box
            sx={{
              display: 'grid',
              gridAutoColumns: '1fr',
              gap: 1
            }}
          >
            <Tooltip title="Edit Item">
            <IconButton
              size="small"
              sx={{ gridRow: '1', gridColumn: '6' }}
              onClick={handleEditCard}
            >
              <EditIcon />
            </IconButton>
            </Tooltip>
            {/* <IconButton size="small" sx={{ gridRow: '1', gridColumn: '7' }} onClick={()=>{handleDelete(todoItem.todoId)}}> */}
            <Tooltip title="Delete Item">
            <IconButton size="small" sx={{ gridRow: '1', gridColumn: '7' }} onClick={()=>{handleAlert("Do you want to delete this item?")}}>
              <DeleteOutlineIcon />
            </IconButton>
            </Tooltip>
          </Box>
        </CardActions>
      </Card>
      <DialogPopUp
        openDialogue={openDialogue}
        ComponenetToLoad={ItemDetails}
        mode={mode}
        todoItem={todoItem}
        setOpenDialogue={setOpenDialogue}
        handleCancel={handleCancel}
        handleSave={ handleUpdate  }
        readOnly ={mode==='DISPLAY' ? true:false}
      ></DialogPopUp>
      <AlertDialog alertOpen={openAlert} setAlertOpen ={setOpenAlert} message={message} handleOk={()=>{handleDelete(todoItem.todoId)}} /> 
    </Box>
  );
}

export { ItemCard, EmptyItemAdd };
