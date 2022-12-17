/*
 * @Author: jiangxin
 * @Date: 2022-08-18 15:32:57
 * @Company: orientsec.com.cn
 * @Description: 
 */
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import styles from "./styles.module.css";
import TOCItems from "@theme/TOCItems";
import BrowserOnly from "@docusaurus/BrowserOnly";
// In the event of re-swizzling, make sure to add the `filterTOC` and pass it down to TOCITems
export default function TOCInline({
  toc,
  minHeadingLevel,
  maxHeadingLevel,
  filterTOC
}) {
  return (
    <BrowserOnly>
      {() => (
        <div className={styles.tableOfContentsInline}>
          <TOCItems
            toc={toc}
            minHeadingLevel={minHeadingLevel}
            maxHeadingLevel={maxHeadingLevel}
            className="table-of-contents"
            linkClassName={null}
            // In the event of re-swizzling, make sure to add the `filterTOC` and pass it down to TOCITems
            filterTOC={filterTOC}
          />
        </div>
      )}
    </BrowserOnly>
  );
}

