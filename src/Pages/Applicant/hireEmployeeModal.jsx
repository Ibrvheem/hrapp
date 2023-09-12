import { Box, Button, Container, Modal, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import PersonalInfo from "../../components/personalInformation2";
import JobInformation from "../../components/JobInformation";
import { getApplicants, hireApplicant } from "./applicantsSlice";
import dayjs from "dayjs";

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
        hireEmployee: {
            marginTop: "6rem",
            padding: "2rem 0rem",
            width: "100%",
            backgroundColor: "#f0f0f0",
        },
    };
});

export default function HireEmployeeModal({ activeRecruit, open, handleModalsClose }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const initialValues = {
        job: {
            position: "",
            position_id: "",
            type: "",
            start_date: dayjs(Date.now()),
            end_date: "",
            salary: 0,
            bonus: 0,
            leave_days: 0,
            reporting_hour: "",
            closing_hour: "",
        }
    };

    const validationSchema = Yup.object({
        first_name: Yup.string(),
        last_name: Yup.string(),
    });
    const onSubmit = (values) => {
        values.job.reporting_hour = values.job.reporting_hour?.format("HH:mm")
        values.job.closing_hour = values.job.closing_hour?.format("HH:mm")
        values.job.start_date = values.job.start_date?.format("YYYY-MM-DD")
        values.dob = values.dob?.format("YYYY-MM-DD");
        dispatch(hireApplicant({
            ...values,
            applicant_id: activeRecruit.id,
        }))
        dispatch(getApplicants())
        handleModalsClose()
    };
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    });

    return (
        <Modal
            open={open}
            onClose={handleModalsClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ overflow: 'auto' }}>
            <div className={classes.hireEmployee}>
                <Container>
                    <Box className={classes.modal}>
                        <Box sx={{ marginBlockEnd: '3rem' }}><Typography variant="h2">Schedule Interview</Typography></Box>
                        <Box sx={{ border: '2px solid #2fd5c8', borderRadius: '1rem', padding: '3rem' }}>
                            <Box sx={{ backgroundColor: '#fbfbfb', padding: 'inherit', borderRadius: 'inherit' }}>
                                <PersonalInfo modalOpen={{}} activeRecruit={activeRecruit} handleModalsClose={handleModalsClose} />
                                <JobInformation formik={formik} />
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        gap: "2rem",
                                        marginTop: "4rem",
                                    }}
                                >
                                    <Button
                                        disableElevation
                                        variant="contained"
                                        size="large"
                                        onClick={formik.handleSubmit}
                                        sx={{
                                            padding: "1rem 4rem",
                                            fontWeight: 700,
                                            color: "white",
                                            fontSize: "1.4rem",
                                        }}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        disableElevation
                                        variant="outlined"
                                        size="large"
                                        sx={{ padding: "1rem 4rem", fontWeight: 700, fontSize: "1.4rem" }}
                                        onClick={handleModalsClose}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </div>
        </Modal>
    );
}