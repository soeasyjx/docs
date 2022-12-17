/*
 * @Author: jiangxin
 * @Date: 2022-08-18 15:22:37
 * @Company: orientsec.com.cn
 * @Description: 
 */
import React from 'react';
import ActualDocItem from '@theme/DocItem';
// import HasuraConBanner from '@site/src/components/HasuraConBanner';
// import GraphQLWithHasuraBanner from '@site/src/components/GraphQLWithHasuraBanner';
// import PageHelpful from '@site/src/components/PageHelpful';
// import CustomFooter from '@site/src/components/CustomFooter';
import styles from './styles.module.scss';

const CustomDocItem = (props) => {
  return (
    <div
      className={"custom_doc_item_wrapper custom_doc_item_wrapper-x-wid"}
    >
      <ActualDocItem {...props} />
      {/* <div className={styles['custom_doc_item_footer']}> */}
        {/* <PageHelpful /> */}
        {/* <HasuraConBanner {...props} /> */}
        {/* <GraphQLWithHasuraBanner /> */}
        {/* <CustomFooter /> */}
      {/* </div> */}
    </div>
  );
};

export default CustomDocItem;
