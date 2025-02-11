"use client";
import { useEffect, useState } from "react";

const useFullUrl = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    return setUrl(window.location.href);
  }, []);

  return url;
};
export default useFullUrl;
