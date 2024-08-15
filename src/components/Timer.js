import React, { useEffect, useState } from "react";

export const Timer = ({ secondsRemaning, dispatch }) => {
  const min = Math.floor(secondsRemaning / 60);
  const sec = secondsRemaning % 60;
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "timer" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <div className="timer">
      {min < 10 && "0"} {min} : {sec < 10 && "0"}
      {sec}
    </div>
  );
};
