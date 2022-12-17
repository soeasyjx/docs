/*
 * @Author: jiangxin
 * @Date: 2022-08-18 15:30:31
 * @Company: orientsec.com.cn
 * @Description: 
 */
import React, { useState, useEffect } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";

const LatestRelease = ({ prerelease }) => {
  const [releases, setReleases] = useState({
    latest: "v2.3.0",
    prerelease: "v2.4.0-beta.1"
  });

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://releases.hasura.io/graphql-engine?agent=docs.hasura.io"
      );
      const responseJson = await response.json();
      setReleases(responseJson);
    })();
  }, []);

  return (
    <BrowserOnly>
      {() => <span>{prerelease ? releases.prerelease : releases.latest}</span>}
    </BrowserOnly>
  );
};

export default LatestRelease;

