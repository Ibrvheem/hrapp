import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react'
import { makeStyles } from '@mui/styles';
import { Close } from '@mui/icons-material';

const useStyles = makeStyles(() => {
    return {
        justifySpaceBetween: {
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "3rem",
        },
        rescheduleBtn: {
            padding: "0 !important",
            fontSize: "2rem !important",
            textDecoration: 'underline !important',
            textTransform: "capitalize !important"
        },
        detail: {
            display: 'flex',
            gap: "3.7rem",
            fontWeight: "700 !important"
        }
    };
});

export default function PersonalInfo({ modalOpen, handleModalsClose, setModals, activeRecruit: applicant }) {
    const classes = useStyles();

    return (
        <Box sx={{ marginBlockEnd: '1rem' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBlockEnd: '3rem' }}>
                <Box sx={{ display: 'flex', gap: '5rem' }}>
                    <Typography sx={{ fontSize: '2.5rem', fontWeight: 500, margin: 0 }}>Hire New Employee</Typography>
                    {modalOpen.viewSchedule ? <Button onClick={() => setModals(prev => ({ ...prev, schedule: true }))} variant='text' className={classes.rescheduleBtn}>Reschedule Interview</Button> : null}
                </Box>
                <Button onClick={handleModalsClose} variant='contained'><Close sx={{ color: '#fff', fontSize: "2rem" }} /> </Button>
            </Box>
            <Grid container sx={{ columnGap: '8rem', flexWrap: 'nowrap' }}>
                <Grid item>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '170px 1fr', marginBlockEnd: '1rem' }}>
                        <Typography>First Name</Typography>
                        <Typography className={classes.detail}>
                            <span>:</span>
                            <span>{applicant.first_name}</span>
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '170px 1fr', marginBlockEnd: '1rem' }}>
                        <Typography>Middle Name</Typography>
                        <Typography className={classes.detail}>
                            <span>:</span>
                            <span>{applicant.middle_name}</span>
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '170px 1fr', marginBlockEnd: '1rem' }}>
                        <Typography>Last Name</Typography>
                        <Typography className={classes.detail}>
                            <span>:</span>
                            <span>{applicant.last_name}</span>
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '170px 1fr', marginBlockEnd: '1rem' }}>
                        <Typography>Email Address</Typography>
                        <Typography className={classes.detail}>
                            <span>:</span>
                            <span style={{ overflowWrap: 'break-word', maxWidth: "20ch" }}>{applicant.email}</span>
                        </Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '170px 1fr', marginBlockEnd: '1rem' }}>
                        <Typography>Phone Number</Typography>
                        <Typography className={classes.detail}>
                            <span>:</span>
                            <span>{applicant.phone}</span>
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '170px 1fr', marginBlockEnd: '1rem' }}>
                        <Typography>Date of Birth</Typography>
                        <Typography className={classes.detail}>
                            <span>:</span>
                            <span>{applicant.dob}</span>
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '170px 1fr', marginBlockEnd: '1rem' }}>
                        <Typography>Gender</Typography>
                        <Typography className={classes.detail}>
                            <span>:</span>
                            <span>{applicant.gender}</span>
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '170px 1fr', marginBlockEnd: '1rem' }}>
                        <Typography>Address</Typography>
                        <Typography className={classes.detail}>
                            <span>:</span>
                            <span style={{ overflowWrap: 'break-word', maxWidth: "20ch" }}>{applicant.home_address}</span>
                        </Typography>
                    </Box>
                </Grid>
                <Grid item sx={{ justifySelf: "end" }}>
                    <img src="" alt="" width={200} height={200} />
                </Grid>
            </Grid>
        </Box>
    );
}
