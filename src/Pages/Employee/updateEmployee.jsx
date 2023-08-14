import { Button, Card, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { postEmployees, postFile, updateEmployee } from "./employeesSlice";
import PersonalInformation from "../../components/PersonalInformation";
import JobInformation from "../../components/JobInformation";
import dayjs from "dayjs";

const useStyles = makeStyles(() => {
    return {
        addEmployee: {
            marginTop: "6rem",
            padding: "2rem 0rem",
            width: "100%",
            backgroundColor: "#f0f0f0",
        },
    };
});
export default function UpdateEmployee() {
    const { state: employee } = useLocation()
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // format dates and time for date and time pickers
    let reporting_hour = dayjs(new Date().getFullYear() + 'T' + employee.currentjob.reporting_hour)
    let closing_hour = dayjs(new Date().getFullYear() + 'T' + employee.currentjob.closing_hour)
    let start_date = dayjs(employee.currentjob.start_date)
    let end_date = employee.currentjob.end_date ? dayjs(employee.currentjob.end_date) : null
    const initialValues = {
        first_name: employee.first_name,
        middle_name: employee.middle_name,
        last_name: employee.last_name,
        home_address: employee.home_address,
        dob: dayjs(employee.dob),
        email: employee.email,
        phone: employee.phone,
        image: null,
        resume: null,
        job: {
            id: employee.currentjob.id,
            position: employee.currentjob.position.name,
            type: employee.currentjob.type,
            start_date,
            end_date,
            reporting_hour,
            closing_hour,
            salary: employee.currentjob.salary,
            bonus: employee.currentjob.bonus,
            leave_days: employee.currentjob.leave_days,
        },
    };

    const validationSchema = Yup.object({
        first_name: Yup.string(),
        last_name: Yup.string(),
    });
    const onSubmit = (values) => {
        const resumeLocalFile = values.resume;
        const passportLocalFile = values.image;
        let resumeUrl;
        let passportUrl;
        const postFilePromises = [];

        postFilePromises.push(
            // dispatch(postFile(resumeLocalFile)).then((action) => {
            //     resumeUrl = action?.payload?.url;
            //     if (resumeUrl) {
            //         console.log("Resume URL: " + resumeUrl);
            //         values.resume = resumeUrl;
            //     } else {
            //         console.log("Resume URL not found");
            //     }
            // })
        );
        postFilePromises.push(
            // dispatch(postFile(passportLocalFile)).then((action) => {
            //     passportUrl = action?.payload?.url;
            //     if (passportUrl) {
            //         console.log("Passport URL: " + passportUrl);
            //         values.image = passportUrl;
            //     } else {
            //         console.log("Passport URL not found");
            //     }
            // })
        );
        Promise.all(postFilePromises).then(() => {
            dispatch(updateEmployee({ employeeId: employee.id, body: values })).then(() => navigate(-1));
        });
    };
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    });

    return (
        <div className={classes.addEmployee}>
            <Container>
                <Card
                    elevation={10}
                    style={{
                        border: "1px solid #2fd5c8",
                        height: "auto ",
                        padding: "2rem",
                    }}
                >
                    <PersonalInformation formik={formik} name="" />
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
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </Card>
            </Container>
        </div>
    );
}