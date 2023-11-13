import React from "react";
import { useParams } from "react-router-dom";

export const Streamer = () => {
  const param = useParams();

  return <div>{param.name}</div>;
};
