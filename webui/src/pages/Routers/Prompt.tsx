import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RouteBlocker({ when, message }:any) {

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unblock = navigate(location, {
      replace: true,
      // shouldIntercept: (event:any) => {
      //   if (when()) {
      //     const msg = message && message(location);  
      //     return msg || true;
      //   }
      // }
    })

    return unblock;
  }, [when, message, navigate, location])

  return null;
}

export default RouteBlocker;