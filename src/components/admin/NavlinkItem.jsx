import { Divider, Grid } from '@mui/material';
import React from 'react';
const NavlinkItem = ({title,icon,link}) => {
    return (
      <>
        <li className="">
          <a className="admin-link" href="#">
            <Grid container>
              <Grid item xs={2}>
                {icon}
              </Grid>
              <Grid item xs={10}>
                {title}
              </Grid>
            </Grid>
          </a>
        </li>
        <Divider />
      </>
    );
}
 
export default NavlinkItem;