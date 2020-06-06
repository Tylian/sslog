import React, { createContext, useState, useEffect } from "react";
import { EORZEA_MULTIPLIER } from './functions';

export const TimeContext = createContext(null);

export const getTime = (now = Date.now()) => ({
  local: Math.floor(now / 1000),
  eorzea: Math.floor(now / 1000) * EORZEA_MULTIPLIER
});

export const timeProvider = (WrappedComponent) => (props) => {
  const [time, setTime] = useState(getTime());
  
  useEffect(() => {
    let timer = setInterval(() => setTime(getTime()), 1000 * (2 + 11/12));
    return () => clearInterval(timer);
  }, []);
  
  return <TimeContext.Provider value={time}>
    <WrappedComponent {...props} />
  </TimeContext.Provider>
};