/*
 * @Author: jiangxin
 * @Date: 2022-08-15 16:16:15
 * @Company: orientsec.com.cn
 * @Description: 
 */
import React, {type ReactNode} from 'react';
import clsx from 'clsx';

import styles from './styles.module.css';

interface Props {
  children: ReactNode;
  minHeight: number;
  url: string;
}

export default function BrowserWindow({
  children,
  minHeight,
  url = 'http://localhost:3000',
}: Props): JSX.Element {
  return (
    <div className={styles.browserWindow} style={{minHeight}}>
      <div className={styles.browserWindowHeader}>
        <div className={styles.buttons}>
          <span className={styles.dot} style={{background: '#f25f58'}} />
          <span className={styles.dot} style={{background: '#fbbe3c'}} />
          <span className={styles.dot} style={{background: '#58cb42'}} />
        </div>
        <div className={clsx(styles.browserWindowAddressBar, 'text--truncate')}>
          {url}
        </div>
        <div className={styles.browserWindowMenuIcon}>
          <div>
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </div>
        </div>
      </div>

      <div className={styles.browserWindowBody}>{children}</div>
    </div>
  );
}