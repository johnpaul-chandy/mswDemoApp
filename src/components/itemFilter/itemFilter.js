 
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useAppContext } from '../../providers/appContextProvider';
import { useEffect, useState } from 'react';
import { Grid, Hidden } from '@mui/material';

const ItemFilter = () => {
   return (
    <>
        <Data/>
    </>
  );
};



const Data = ( ) => {

    const appContext = useAppContext();
    const [value,setValue]=useState(appContext.filter);
    const handleChange=(event)=>{
        appContext.setFilter(event.target.value);
    }

    useEffect(()=>{
        setValue(appContext.filter);
    },[]);

    useEffect(()=>{
        appContext.setFilter(value);
    },[value]);

  return (
    <>
      <Box      >
   <FormControl>
      {/* <FormLabel id="demo-radio-buttons-group-label"         sx={{ margin:"16px"}}><b>Filter</b></FormLabel> */}
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="A"
        name="radio-buttons-group"
        onChange={(event)=>{setValue(event.target.value)}}
        value={value}
        sx={{marginLeft:"20px"}}

      >
        <Box >
           <Hidden smUp>
            <Grid     container  columns={2} rows={1}>
                 <Grid  item  gridRow={1} gridColumn={1} gridAutoRows>
                     <Box>
                        <FormControlLabel value="A" control={<Radio />} label="All" />
                    </Box>
                    <Box>
                        <FormControlLabel value="N" control={<Radio />} label="Not Started" />                
                    </Box>
                </Grid>

                <Grid  item gridRow={1} gridColumn={2}>
                <Box>
                    <FormControlLabel value="I" control={<Radio />} label="In Progress" />
                    </Box>
                    <Box>
                    <FormControlLabel value="D" control={<Radio />} label="Done" />
                    </Box>
                </Grid>
            </Grid>
            </Hidden> 
            <Hidden smDown >
            <Grid     container  columns={2} rows={1}>
                 <Grid  item  gridRow={1} gridColumn={1} gridAutoRows>
                    <FormControlLabel value="A" control={<Radio />} label="All" />
                    <FormControlLabel value="N" control={<Radio />} label="Not Started" />                
                    <FormControlLabel value="I" control={<Radio />} label="In Progress" />
                    <FormControlLabel value="D" control={<Radio />} label="Done" />
                </Grid>
            </Grid>
            </Hidden>            
        </Box>    
      </RadioGroup>
    </FormControl>
      </Box>
    </>
  );
};

export { ItemFilter };
