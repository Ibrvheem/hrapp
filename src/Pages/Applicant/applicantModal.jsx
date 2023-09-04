import { Box, Button, FormControl, Grid, Modal, TextField, Typography } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react'
import { useFormik } from "formik";
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { getApplicant, getApplicants, postSchedule, rejectApplicant } from './applicantsSlice';
import dayjs from 'dayjs';
import { Close } from '@mui/icons-material';

const useStyles = makeStyles(() => {
    return {
        modal: {
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            minHeight: "90vh",
            backgroundColor: "white",
            boxShadow: 24,
            display: "flex",
            flexDirection: "column",
            padding: "4rem 4rem",
        },
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

export default function ApplicantleModal({ modalOpen, handleModalClose, setModals, activeRecruit: applicant }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const onSubmit = (values) => {
        Promise.all([
            dispatch(postSchedule({ id: applicant.id, date: dayjs(values.date).format("YYYY-MM-DDTHH:mm:ss") })),
            dispatch(getApplicants()),
            dispatch(getApplicant(applicant.id))
        ])
    };
    const onSubmitReject = (values) => {
        Promise.all([
            dispatch(rejectApplicant({ id: applicant.id, message: values })),
            dispatch(getApplicants())
        ])
    };

    const formik = useFormik({
        initialValues: {
            date: ""
        },
        onSubmit,
    });

    const rejectForm = useFormik({
        initialValues: {
            message: ""
        },
        onSubmit: onSubmitReject,
    });

    const handleSave = () => {
        handleModalClose()
        formik.handleSubmit()
    }
    const handleReject = () => {
        handleModalClose()
        rejectForm.handleSubmit()
    }

    const handleDateChange = (value) => {
        formik.setFieldValue("date", value);
    }

    return (
        <div>
            <Modal
                open={Boolean(modalOpen.reject || modalOpen.schedule || modalOpen.viewSchedule)}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ overflow: 'auto' }}
            >
                <Box className={classes.modal}>
                    <Box sx={{ marginBlockEnd: '3rem' }}><Typography variant="h2">Schedule Interview</Typography></Box>
                    <Box sx={{ border: '2px solid #2fd5c8', borderRadius: '1rem', padding: '3rem' }}>
                        <Box sx={{ backgroundColor: '#fbfbfb', padding: 'inherit', borderRadius: 'inherit' }}>
                            <Box sx={{ marginBlockEnd: '1rem' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBlockEnd: '3rem' }}>
                                    <Box sx={{ display: 'flex', gap: '5rem' }}>
                                        <Typography sx={{ fontSize: '2.5rem', fontWeight: 500, margin: 0 }}>Personal Information</Typography>
                                        {modalOpen.viewSchedule ? <Button onClick={() => setModals(prev => ({ ...prev, schedule: true }))} variant='text' className={classes.rescheduleBtn}>Reschedule Interview</Button> : null}
                                    </Box>
                                    <Button onClick={handleModalClose} variant='contained'><Close sx={{ color: '#fff', fontSize: "2rem" }} /> </Button>
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
                            <Box sx={{ marginBlockEnd: '2rem' }}>
                                <Typography sx={{ fontSize: '2.5rem', fontWeight: 500 }}>Job Information</Typography>
                                <Typography>Application for a Job as a {applicant.position?.name}</Typography>
                            </Box>
                            <Typography sx={{ fontSize: '2.5rem', fontWeight: 500, marginBlockEnd: '1rem' }}>Interview Information</Typography>
                            <Grid container spacing={3} sx={{ alignItems: 'end', justifyContent: 'start' }}>
                                {modalOpen.viewSchedule ?
                                    <Grid item md={12}>
                                        <Grid container sx={{ gap: '5rem' }}>
                                            <Grid item sx={{ display: 'flex', gap: "3rem" }}>
                                                <Typography>Interview Date</Typography>
                                                <Typography className={classes.detail}>
                                                    <span>:</span>
                                                    <span>{applicant.interview_date?.split("T")[0]}</span>
                                                </Typography>
                                            </Grid>
                                            <Grid item sx={{ display: 'flex', gap: "3rem" }}>
                                                <Typography >Interview Time</Typography>
                                                <Typography className={classes.detail}>
                                                    <span>:</span>
                                                    <span>{applicant.interview_date?.split("T")[1]}</span>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    : null}
                                {modalOpen.reject ?
                                    <Grid item md={10} sx={{ marginBlockEnd: '2rem' }}>
                                        <Box sx={{ display: 'flex', gap: "3rem", marginBlockEnd: '2rem' }}>
                                            <Typography>Status</Typography>
                                            <Typography className={classes.detail}>
                                                <span>:</span>
                                                <span style={{ color: 'red' }}>Rejected</span>
                                            </Typography>
                                        </Box>
                                        <label htmlFor="message" >Message *</label>
                                        <TextField
                                            id="message"
                                            sx={{ marginBlockStart: '2rem' }}
                                            multiline
                                            rows={4}
                                            fullWidth
                                            onChange={(value) => rejectForm.setFieldValue("message", value.target.value)}
                                        />
                                    </Grid> : null}
                                {modalOpen.schedule ?
                                    <Grid item md={0}>
                                        <FormControl sx={{ backgroundColor: '#fff' }}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DateTimePicker
                                                    ampm={false}
                                                    size="small"
                                                    label="Interview Date"
                                                    onChange={handleDateChange}
                                                />
                                            </LocalizationProvider>
                                        </FormControl></Grid> : null
                                }
                                {modalOpen.schedule || modalOpen.reject ?
                                    <Grid item sx={{ display: "flex", gap: "2rem" }}>
                                        {!modalOpen.reject ? <Button
                                            disableElevation
                                            variant="contained"
                                            size="large"
                                            onClick={handleSave}
                                            sx={{
                                                padding: "1rem 4rem",
                                                fontWeight: 700,
                                                color: "white",
                                                fontSize: "1.4rem",
                                            }}
                                        >
                                            Save
                                        </Button> :
                                            <Button
                                                disableElevation
                                                variant="contained"
                                                size="large"
                                                onClick={handleReject}
                                                sx={{
                                                    padding: "1rem 4rem",
                                                    fontWeight: 700,
                                                    color: "white",
                                                    backgroundColor: "red",
                                                    fontSize: "1.4rem",
                                                }}
                                            >
                                                Reject
                                            </Button>}
                                        <Button
                                            disableElevation
                                            variant="contained"
                                            size="large"
                                            sx={{
                                                padding: "1rem 4rem",
                                                fontWeight: 700,
                                                fontSize: "1.4rem",
                                                backgroundColor: '#fff',
                                                border: '2px solid #2fd5c8',
                                                color: '#2fd5c8'
                                            }}
                                            onClick={handleModalClose}
                                        >
                                            Cancel
                                        </Button>
                                    </Grid> : null}
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div >
    );
}
