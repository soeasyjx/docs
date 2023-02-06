import SourceCode from 'dumi/theme-default/builtins/SourceCode';
import { type FC } from 'react';
import { sourceCodeMap } from '../../../sourcecode';

import './mobile.css';

const Mobile: FC<{ url: string; sourcekey: keyof typeof sourceCodeMap }> = (
  props,
) => {
  const code = sourceCodeMap[props.sourcekey];
  console.log('sfdsfdsafdsafds', code);
  return (
    <>
      <div className="demo-frame" id="J-demo-frame">
        <SourceCode lang="tsx">{code}</SourceCode>
        <iframe src={props.url} frameBorder="0"></iframe>
      </div>
    </>
  );
};

export default Mobile;
