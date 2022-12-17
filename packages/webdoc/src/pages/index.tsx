/*
 * @Author: jiangxin
 * @Date: 2022-08-18 15:30:04
 * @Company: orientsec.com.cn
 * @Description:
 */
import React from "react";
import clsx from "clsx";
import Layout from "@site/src/theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import VersionedLink from "@site/src/components/VersionedLink";

const img_3399729 = require("@site/static/images/3399729.png").default;
const img_2099058 = require("@site/static/images/2099058.png").default;
const img_xcc_main = require("@site/static/images/xcc-min.png").default;

const img_5316842_808c98cb =
  require("@site/static/images/5316842-808c98cb.png").default;
const img_4300536_4b0626bd =
  require("@site/static/images/4300536-4b0626bd.png").default;
const img_2936725_7a27e5ab =
  require("@site/static/images/2936725-7a27e5ab.png").default;

const bi_icon = require("@site/static/images/biicon.png").default;

// import stylesHome from  "./home.module.css";
// import styleNicepage  from  "./nicepage.module.css";

import "./home.css";
import "./nicepage.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div
      data-home-page="Home.html"
      data-home-page-title="Home"
      className="u-body u-xl-mode"
      data-lang="en"
    >
      <section className="u-clearfix u-section-1" id="sec-a3f2">
        <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
          <div className="u-clearfix u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div className="u-layout">
              <div className="u-layout-row">
                <div className="u-align-left u-container-style u-layout-cell u-left-cell u-size-30 u-size-xs-60 u-white u-layout-cell-1">
                  <div className="u-container-layout u-container-layout-1">
                    <h1 className="u-custom-font u-font-montserrat u-text u-text-palette-2-base u-text-1">
                      {" "}
                      一个有点小梦想的程序猿
                      <br />
                    </h1>
                    <p className="u-text u-text-2">
                      整理，收集，记录前端相关技术
                    </p>

                    <VersionedLink
                      to="javascript/jsonp"
                      className="u-active-grey-90 u-border-none u-btn u-btn-round u-button-style u-hover-grey-90 u-palette-2-base u-radius-8 u-text-active-white u-text-body-alt-color u-text-hover-white u-btn-1"
                    >
                      <span className="u-file-icon u-icon u-icon-1">
                        <img src={img_3399729} alt="" />
                      </span>
                      &nbsp;前端技术
                    </VersionedLink>
                    <VersionedLink
                      to="category/javascript-1"
                      className="u-active-grey-15 u-border-none u-btn u-btn-round u-button-style u-grey-10 u-hover-grey-15 u-radius-8 u-text-active-grey-80 u-text-body-color u-text-hover-grey-80 u-btn-2"
                    >
                      <span className="u-file-icon u-icon u-icon-2">
                        <img src={img_2099058} alt="" />
                      </span>
                      &nbsp;工具代码
                    </VersionedLink>
                  </div>
                </div>
                <div className="u-align-center u-container-style u-layout-cell u-right-cell u-size-30 u-size-xs-60 u-layout-cell-2">
                  <div className="u-container-layout u-valign-bottom u-container-layout-2">
                    <img
                      className="u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-image u-image-contain u-image-1"
                      src={img_xcc_main}
                      data-image-width="1178"
                      data-image-height="1080"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section
        className="u-align-center u-clearfix u-grey-5 u-section-2"
        id="sec-56a8"
      >
        <div className="u-clearfix u-expanded-width-xs u-gutter-18 u-layout-wrap u-layout-wrap-1">
          <div className="u-gutter-0 u-layout">
            <div className="u-layout-row">
              <div className="u-size-30">
                <div className="u-layout-col">
                  <div className="u-align-center u-container-style u-hover-feature u-layout-cell u-radius-10 u-size-40 u-white u-layout-cell-1">
                    <div className="u-container-layout u-container-layout-1">
                      <span className="u-file-icon u-icon u-icon-circle u-opacity u-opacity-55 u-palette-2-light-2 u-spacing-18 u-text-palette-2-base u-icon-1">
                        <img src={img_5316842_808c98cb} alt="" />
                      </span>
                      <a
                        href="https://nicepage.com"
                        className="u-border-none u-btn u-btn-round u-button-style u-palette-2-base u-radius-50 u-btn-1"
                      >
                        Free
                      </a>
                      <h3 className="u-text u-text-default u-text-palette-2-base u-text-1">
                        compiler
                      </h3>
                      <p className="u-text u-text-palette-5-dark-2 u-text-2">
                        babel、webpack、esbuild、rollup基础使用
                      </p>
                      <a
                        href="https://nicepage.cc"
                        className="u-active-none u-align-center u-border-2 u-border-active-palette-1-light-1 u-border-hover-palette-1-light-1 u-border-palette-2-base u-btn u-button-style u-hover-none u-none u-text-body-color u-btn-2"
                      >
                        more
                      </a>
                    </div>
                  </div>
                  <div className="u-align-center u-container-style u-hover-feature u-layout-cell u-radius-10 u-size-20 u-white u-layout-cell-2">
                    <div className="u-container-layout u-valign-top u-container-layout-2">
                      <span className="u-file-icon u-icon u-icon-circle u-opacity u-opacity-55 u-palette-2-light-2 u-spacing-18 u-text-palette-2-base u-icon-2">
                        <img src={img_4300536_4b0626bd} alt="" />
                      </span>
                      <h3 className="u-text u-text-default u-text-palette-2-base u-text-3">
                        {" "}
                        TypeScript
                      </h3>
                      <p className="u-text u-text-palette-5-dark-2 u-text-4">
                        Typescript相关知识点，以及各种实用高级技能
                      </p>
                      <a
                        href="http://easycli.cn:8891/doc/typescriptdoc/category/%E7%AE%80%E4%BB%8B"
                        target="_blank"
                        className="u-active-none u-align-center u-border-2 u-border-active-palette-1-light-1 u-border-hover-palette-1-light-1 u-border-palette-2-base u-btn u-button-style u-hover-none u-none u-text-body-color u-btn-3"
                      >
                        more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="u-size-30">
                <div className="u-layout-col">
                  <div className="u-align-center u-container-style u-hover-feature u-layout-cell u-radius-10 u-size-20 u-white u-layout-cell-3">
                    <div className="u-container-layout u-valign-top u-container-layout-3">
                      <span className="u-icon u-icon-circle u-opacity u-opacity-55 u-palette-2-light-2 u-spacing-18 u-text-palette-2-base u-icon-3"></span>
                      <h3 className="u-text u-text-default u-text-palette-2-base u-text-5">
                        {" "}
                        Personal Domain
                      </h3>
                      <p className="u-text u-text-palette-5-dark-2 u-text-6">
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur
                      </p>
                      <a
                        href="https://nicepage.com/k/auto-mechanic-html-templates"
                        className="u-active-none u-align-center u-border-2 u-border-active-palette-2-light-1 u-border-hover-palette-2-light-1 u-border-palette-2-base u-btn u-button-style u-hover-none u-none u-text-body-color u-btn-4"
                      >
                        more
                      </a>
                    </div>
                  </div>
                  <div className="u-align-center u-container-style u-hover-feature u-layout-cell u-radius-10 u-size-40 u-white u-layout-cell-4">
                    <div className="u-container-layout u-valign-top u-container-layout-4">
                      <span className="u-file-icon u-icon u-icon-circle u-opacity u-opacity-55 u-palette-2-light-2 u-spacing-18 u-text-palette-2-base u-icon-4">
                        <img src={img_2936725_7a27e5ab} alt="" />
                      </span>
                      <a
                        href="https://nicepage.com/html-website-builder"
                        className="u-btn u-btn-round u-button-style u-palette-2-base u-radius-50 u-btn-5"
                      >
                        Free
                      </a>
                      <h3 className="u-text u-text-default u-text-palette-2-base u-text-7">
                        svg/canvas
                      </h3>
                      <p className="u-text u-text-palette-5-dark-2 u-text-8">
                        有关svg、canvas 的基础知识
                      </p>
                      <a
                        href="https://nicepage.me"
                        className="u-active-none u-align-center u-border-2 u-border-active-palette-1-light-1 u-border-hover-palette-1-light-1 u-border-palette-2-base u-btn u-button-style u-hover-none u-none u-text-body-color u-btn-6"
                      >
                        more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <footer
        className="u-align-center u-clearfix u-footer u-grey-80 u-footer"
        id="sec-c677"
      >
        <div className="u-clearfix u-sheet u-sheet-1">
          <p className="u-small-text u-text u-text-variant u-text-1">
            <a
              href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=43010202001561"
              target="_blank"
            >
              <img src={bi_icon} style={{verticalAlign:"middle",marginRight:"4px",marginTop:"-2px"}}/>
              湘公网安备 43010202001561号
            </a>
            &nbsp; &nbsp;
            <a href="https://beian.miit.gov.cn/" target="_blank">
              湘ICP备2022017695号-1
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Hasura gives you instant GraphQL APIs on your data sources. Point Hasura to your preferred internal and external data sources, setup relationships and security rules on your data models across sources and get a managed unified GraphQL API to build modern applications, instantly."
    >
      <HomepageHeader />
    </Layout>
  );
}

