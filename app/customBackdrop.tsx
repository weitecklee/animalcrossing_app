'use client';

import { StateContext } from "@/lib/stateContext";
import { Backdrop } from "@mui/material";
import { useContext } from "react";

export default function CustomBackdrop() {

  const {dialogActive} = useContext(StateContext);

  return <Backdrop open={dialogActive} sx={{zIndex: 1250}} />
}