import React from "react";
import { Typography } from '@mui/material';
import { observer } from "mobx-react";

const Total = observer(({store}: any) => {
    return <Typography align="left" variant="h5" color="#03a9f4" marginLeft="300px">
    <span>סה"כ </span>
    <span>:</span>
    <span style={{ marginRight: 10}}>{store.total}</span>
    <span > מוצרים</span>
    </Typography>
});

export default Total;