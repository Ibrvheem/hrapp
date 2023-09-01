import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect } from "react";
import dayjs from "dayjs";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles((theme) => {
    return {
        modal: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            boxShadow: 24,
            display: "flex",
            flexDirection: "column",
            padding: "4rem 4rem",
        },
    };
});

export default function AddSessionModal({ formik, modalOpen, handleModalClose, session }) {
    const classes = useStyles();
    useEffect(() => {
        if (session.name) {
            formik.setFieldValue("name", session.name);
            formik.setFieldValue("starts_at", dayjs(session.starts_at));
            formik.setFieldValue("ends_at", dayjs(session.ends_at));
        }
    }, [session])

    return (
        <Modal
            open={modalOpen}
            onClose={handleModalClose}
        >
            <Box className={classes.modal}>
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{ marginBlockEnd: 2 }}
                >
                    Add Session
                </Typography>
                <TextField
                    {...formik.getFieldProps("name")}
                    onChange={(ev) => {
                        formik.setFieldValue("name", ev.target.value);
                    }}
                    sx={{ marginBlockEnd: 4 }}
                    label="Session Name"
                    variant="standard"
                    fullWidth
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        {...formik.getFieldProps("starts_at")}
                        onChange={(value) => {
                            formik.setFieldValue("starts_at", value);
                        }}
                        sx={{ marginBlockEnd: 2 }}
                        label="Starts At"
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker {...formik.getFieldProps("ends_at")}
                        onChange={(value) => {
                            formik.setFieldValue("ends_at", value);
                        }} label="Ends At" />
                </LocalizationProvider>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "2rem",
                        margin: "2rem 0rem",
                    }}
                >
                    <Button
                        onClick={formik.handleSubmit}
                        size="large"
                        variant="contained"
                        sx={{
                            color: "white",
                            fontWeight: 700,
                            padding: "1rem 3rem",
                        }}
                    >
                        Save
                    </Button>
                    <Button
                        size="large"
                        variant="outlined"
                        onClick={handleModalClose}
                        sx={{ fontWeight: 700, padding: "1rem 3rem" }}
                    >
                        Cancel
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}
