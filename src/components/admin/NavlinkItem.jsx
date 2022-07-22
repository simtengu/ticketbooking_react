import { Divider, Grid } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
const NavlinkItem = ({title,icon,link}) => {
    return (
      <>
        <li className="">
          <Link className="admin-link" to={`/admin${link}`}>
            <Grid container>
              <Grid item xs={2}>
                {icon}
              </Grid>
              <Grid item xs={10}>
                {title}
              </Grid>
            </Grid>
          </Link>
        </li>
        <Divider />
      </>
    );
}
 
export default NavlinkItem;