"use client";

import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import useIsMobile from "../../hooks/useIsMobile";
import useKeysToOpenModal from "../../hooks/useKeysToOpenModal";
import SearchModalContent from "./SearchModalContent";
import { MagnifyGlass } from "./SearchModalContent/Buttons";

const lineColor = "rgba(0,65,106,0.8)";

const SearchBar = () => {
  const [open, setOpen] = useState(false);

  const { isMobile } = useIsMobile({ breakpoint: 600 });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  useKeysToOpenModal({ isMobile, handleOpen });

  return (
    <Box sx={{ mt: "1.5rem" }}>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleClose}
      >
        <SearchModalContent closeModal={handleClose} />
      </Modal>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ position: "relative" }}>
          <Box
            sx={(theme) => ({
              width: 300,
              [theme.breakpoints.up("md")]: {
                width: 600,
              },
            })}
          >
            <input
              placeholder="Search Coin"
              onClick={handleOpen}
              style={{
                paddingLeft: 50,
                height: "2.5rem",
                width: "100%",
                border: `1px solid ${lineColor}`,
                borderRadius: "10px",
                outline: "none",
                caretColor: "transparent",
              }}
            />
          </Box>
          <Box
            sx={() => ({
              position: "absolute",
              top: -5,
            })}
          >
            <MagnifyGlass />
          </Box>
          {isMobile && (
            <Box
              sx={(theme) => ({
                position: "absolute",
                top: 7,
                right: 10,
                display: "flex",
                flexDirection: "row",
                [theme.breakpoints.down("sm")]: {
                  display: "none",
                },
              })}
            >
              <Typography
                variant="subtitle2"
                sx={() => ({
                  marginRight: "3px",
                  padding: "0 2px",
                  color: lineColor,
                  borderColor: lineColor,
                  borderWidth: "2px",
                  borderStyle: "solid",
                  borderRadius: "5px",
                })}
              >
                CTL
              </Typography>
              <Typography
                variant="subtitle2"
                sx={() => ({
                  padding: "0 5px",
                  color: lineColor,
                  borderColor: lineColor,
                  borderWidth: "2px",
                  borderStyle: "solid",
                  borderRadius: "5px",
                })}
              >
                K
              </Typography>
            </Box>
          )}
        </div>
      </div>
    </Box>
  );
};

export default SearchBar;
