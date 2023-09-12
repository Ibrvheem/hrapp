import { useState } from "react";
import {
  DeleteForever,
  Edit,
  KeyboardArrowDown,
  MoreVert,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { deleteAppraisal, deleteEvaluationItem } from "./appraisalsSlice";
import { useDispatch } from "react-redux";

function SubMenu({ groupId, item, handleItemModalOpen }) {
  const dispatch = useDispatch();
  const [optionsEl, setOptionsEl] = useState(null);
  const openOptions = Boolean(optionsEl);
  const handleCloseOptions = () => setOptionsEl(null);
  const handleOpenOptions = (event) => setOptionsEl(event.currentTarget);

  const handleDeleteItem = (itemId) =>
    dispatch(deleteEvaluationItem({ groupId, itemId }));

  return (
    <>
      <IconButton onClick={handleOpenOptions}>
        <MoreVert />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={optionsEl}
        open={openOptions}
        onClose={handleCloseOptions}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => handleItemModalOpen(groupId, "edit", item)}>
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleDeleteItem(item.id)}>Delete</MenuItem>
      </Menu>
    </>
  );
}

export default function AppraisalItem({
  appraisal,
  handleItemModalOpen,
  handleModalOpen,
}) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const openDropDown = Boolean(anchorEl);

  const handleDeleteGroup = (id) => {
    dispatch(deleteAppraisal(id));
  };
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Card
      key={appraisal.id}
      elevation={0}
      sx={{
        margin: "2rem 0",
        backgroundColor: "#2fd5c8",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="body1" sx={{ color: "white", fontWeight: 700 }}>
        {appraisal.name}
      </Typography>
      <div>
        <Button
          onClick={() => handleItemModalOpen(appraisal.id, "add")}
          sx={{
            backgroundColor: "white",
            padding: "1rem 2rem",
            fontWeight: 700,
          }}
          size="large"
        >
          Add Item
        </Button>
        <IconButton
          onClick={() => handleModalOpen("edit", appraisal.name, appraisal.id)}
          sx={{
            marginInlineStart: "1rem",
          }}
        >
          <Edit
            sx={{
              fontSize: "2.5rem",
              color: "white",
            }}
          />
        </IconButton>
        <IconButton onClick={() => handleDeleteGroup(appraisal.id)}>
          <DeleteForever sx={{ fontSize: "3rem", color: "white" }} />
        </IconButton>
        <IconButton
          variant="contained"
          id="fade-button"
          aria-controls={openDropDown ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openDropDown ? "true" : undefined}
          onClick={handleClick}
        >
          <KeyboardArrowDown sx={{ fontSize: "3rem", color: "white" }} />
        </IconButton>
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={openDropDown}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          {appraisal?.evaluationitems.length ? (
            appraisal?.evaluationitems?.map((item) => (
              <MenuItem key={item.id} sx={{ width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  {item.name}
                  <SubMenu
                    item={item}
                    groupId={appraisal.id}
                    handleItemModalOpen={handleItemModalOpen}
                  />
                </Box>
              </MenuItem>
            ))
          ) : (
            <MenuItem sx={{ width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                No Items Yet
              </Box>
            </MenuItem>
          )}
        </Menu>
      </div>
    </Card>
  );
}
