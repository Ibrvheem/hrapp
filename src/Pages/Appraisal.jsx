import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAppraisals,
  postAppraisal,
  postEvaluationItem,
  updateAppraisal,
  updateEvaluationItem,
} from "./Appraisals/appraisalsSlice";
import EvaluationItem from "./Appraisals/evaluationItem";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/loadingScreen";

const useStyles = makeStyles((theme) => {
  return {
    appraisal: {
      marginTop: "6rem",
      padding: "2rem 0rem",
      width: "100%",
      backgroundColor: "#f0f0f0",
    },
    card: {
      width: "100%",
      height: "100vh",
      padding: "2rem",
    },
    modal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "40rem",
      height: "20rem",
      backgroundColor: "white",
      boxShadow: 24,
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "column",
      borderRadius: "2rem",
      padding: "1rem 2rem",
    },
  };
});
function Appraisal() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { appraisalsData, status } = useSelector((state) => state.appraisals);
  useEffect(() => {
    dispatch(getAppraisals());
  }, []);

  const [modalOpen, setModalOpen] = React.useState({ add: false, edit: false });
  const [itemModal, setItemModal] = useState({ add: false, edit: false });
  const [evaluationItem, setEvaluationItem] = useState({
    name: "",
    groupId: null,
  });
  const [groupFormData, setGroupFormData] = useState({ name: "" });

  const handleModalOpen = (action, name = "", id = null) => {
    setGroupFormData({ name, id });
    setModalOpen(
      action === "add" ? { add: true, edit: false } : { add: false, edit: true }
    );
  };
  const handleModalClose = () => setModalOpen({ add: false, edit: false });

  const handleSubmitGroupForm = () => {
    dispatch(
      modalOpen.add
        ? postAppraisal(groupFormData)
        : updateAppraisal(groupFormData)
    );
    dispatch(getAppraisals());
    setModalOpen({ add: false, edit: false });
  };

  const handleItemModalOpen = (groupId, action, item = {}) => {
    setItemModal(
      action === "add" ? { add: true, edit: false } : { add: false, edit: true }
    );
    setEvaluationItem(() => ({
      groupId: groupId || null,
      name: item.name,
      evaluationItemId: item.id || null,
    }));
  };

  const handleAddEvaluationItem = () => {
    setItemModal({ add: false, edit: false });
    dispatch(postEvaluationItem(evaluationItem));
    dispatch(getAppraisals());
  };
  const handleEditEvaluationItem = () => {
    setItemModal({ add: false, edit: false });
    dispatch(updateEvaluationItem(evaluationItem));
  };

  return (
    <div className={classes.appraisal}>
      <Container>
        {status === "loading" ? <LoadingScreen /> : null}
        <Grid container>
          <Card className={classes.card}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <div>
                <Button
                  onClick={() => handleModalOpen("add")}
                  size="large"
                  variant="contained"
                  sx={{ color: "white", fontWeight: 700 }}
                >
                  Add Form
                </Button>
                <Modal
                  open={modalOpen.add || modalOpen.edit}
                  onClose={handleModalClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box className={classes.modal}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      {modalOpen.add
                        ? "Add Appraisal Group"
                        : "Edit Appraisal Group"}
                    </Typography>
                    <TextField
                      onChange={(ev) =>
                        setGroupFormData((prev) => ({
                          ...prev,
                          name: ev.target.value,
                        }))
                      }
                      inputProps={{ value: groupFormData.name }}
                      label="Group Name"
                      variant="standard"
                      fullWidth
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "2rem",
                        margin: "2rem 0rem",
                      }}
                    >
                      <Button
                        onClick={handleSubmitGroupForm}
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
                <Modal
                  open={itemModal.edit || itemModal.add}
                  onClose={() => setItemModal({ add: false, edit: false })}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box className={classes.modal}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      {itemModal.add
                        ? "Add Evaluation Item"
                        : "Edit Evaluation Item"}
                    </Typography>
                    <TextField
                      onChange={(ev) =>
                        setEvaluationItem((prev) => ({
                          ...prev,
                          name: ev.target.value,
                        }))
                      }
                      inputProps={
                        itemModal.edit
                          ? {
                              value: evaluationItem.name,
                            }
                          : {}
                      }
                      label="Evaluation Item"
                      variant="standard"
                      fullWidth
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "2rem",
                        margin: "2rem 0rem",
                      }}
                    >
                      <Button
                        onClick={() =>
                          itemModal.add
                            ? handleAddEvaluationItem()
                            : handleEditEvaluationItem()
                        }
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
                        onClick={() =>
                          setItemModal({ add: false, edit: false })
                        }
                        sx={{ fontWeight: 700, padding: "1rem 3rem" }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Box>
                </Modal>
              </div>
            </div>
            {appraisalsData?.map((appraisal) => (
              <EvaluationItem
                key={appraisal.id}
                handleItemModalOpen={handleItemModalOpen}
                handleAddEvaluationItem={handleAddEvaluationItem}
                appraisal={appraisal}
                handleModalOpen={handleModalOpen}
              />
            ))}
          </Card>
        </Grid>
      </Container>
    </div>
  );
}

export default Appraisal;
