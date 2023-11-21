import React, { useEffect } from "react";
import axios from "axios";
import { useRestroomLocator } from "./hooks/GetData";

export default function GetData() {
  const { apiDataObject, findRestrooms, isLoading, error } =
    useRestroomLocator();

  return (
    <>
      <button onClick={findRestrooms}>HERE</button>
    </>
  );
}
