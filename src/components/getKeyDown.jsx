import React, { useEffect } from "react";

export const getKeyDown = (targetKey, callback) => {
  //   return <div></div>;
  useEffect(() => {
    const keyPressHandler = (e) => {
      if (e.key === targetKey) {
        callback();
      }
    };
    window.addEventListener("keydown", keyPressHandler);
    return () => {
      window.removeEventListener("keydown", keyPressHandler);
    };
  }, [targetKey, callback]);
};

export default getKeyDown;
