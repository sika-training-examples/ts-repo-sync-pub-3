import React from "react";
import App from "next/app";
import site from "@app/ondrej-sika.com/config";
import Link from "next/link";

import Layout from "@app/ondrejsika-theme/layouts/Layout";

import ThemeNavbar from "@app/ondrejsika-theme/components/Navbar";
import ThemeFooter from "@app/ondrejsika-theme/components/Footer";
import Button from "@app/ondrejsika-theme/components/Button";

// Imported CSS
import "bootstrap-css-only/css/bootstrap.min.css";
import "@app/ondrej-sika.cz/css/index.sass";

const Navbar = (
  <ThemeNavbar
    NavName="Ondrej Sika"
    NavUnderheader="Software {Engineer, Consultant, Lecturer}"
    links={[
      ["HOME", "/"],
      [
        "TRAINING",
        [
          ["GIT", "/training/git"],
          ["GITLAB CI", "/training/gitlab-ci"],
          ["DOCKER", "/training/docker"],
          ["KUBERNETES", "/training/kubernetes"],
          ["ANSIBLE", "/training/ansible"],
          ["PROMETHEUS", "/training/prometheus"],
          ["TERRAFORM", "/training/terraform"]
          // ["REACT & NEXT.JS", "/training/react"]
        ]
      ],
      ["UPCOMING SESSIONS", "/upcoming-sessions"],
      // [
      //   "TUTORIALS & ARTICLES",
      //   [
      //     // ["BLOG", "/blog"],
      //     ["TUTORIALS", "/tutorials"],
      //     ["ARTICLES", "/articles"],
      //     ["REPOSITORIES", "/repozitare"]
      //   ]
      // ],
      ["CONTACT", "/contact"]
    ]}
  />
);

const Footer = (
  <ThemeFooter
    firstColumn={
      <ThemeFooter.Wrapper>
        <ThemeFooter.H4>Ondrej Sika</ThemeFooter.H4>
        <p>
          <ThemeFooter.A href="mailto:ondrej@sika.io">
            ondrej@sika.io
          </ThemeFooter.A>
          <br />
          <ThemeFooter.A href="tel:+420773452376">
            +420 773 452 376
          </ThemeFooter.A>
        </p>
        <p>
          <span style={{ fontSize: "0.7em" }}>Company ID</span>
          <br />
          88114163
        </p>
        <p>
          <span style={{ fontSize: "0.7em" }}>VAT ID</span>
          <br />
          CZ9302252102
        </p>
      </ThemeFooter.Wrapper>
    }
    secondColumn={
      <ThemeFooter.Wrapper>
        <ThemeFooter.H4>Popular Courses</ThemeFooter.H4>
        <ul>
          {[
            ["GIT", "/training/git"],
            ["GITLAB CI", "/training/gitlab-ci"],
            ["DOCKER", "/training/docker"],
            ["KUBERNETES", "/training/kubernetes"],
            ["ANSIBLE", "/training/ansible"]
            // ["TERRAFORM", "/training/terraform"],
            // ["REACT & NEXT.JS", "/training/react"]
          ].map((el, i) => {
            return (
              <li key={i}>
                <Link href={el[1]}>
                  <ThemeFooter.A href="#">{el[0]}</ThemeFooter.A>
                </Link>
              </li>
            );
          })}
        </ul>
      </ThemeFooter.Wrapper>
    }
    thirdColumn={
      <ThemeFooter.Wrapper>
        <ThemeFooter.H4>Newsletter</ThemeFooter.H4>
        <p>Subscribe my newsletter and keep in touch!</p>
        <div className="input-group">
          <Button
            site={site}
            type="outline-secondary"
            href="https://sika.link/newsletter-en"
          >
            Subscribe
          </Button>
        </div>
      </ThemeFooter.Wrapper>
    }
  />
);

class MyApp extends App {
  constructor(...args) {
    super(...args);
    this.site = site;
  }
  render() {
    const { Component, pageProps } = this.props;
    pageProps.site = this.site;
    return (
      <Layout Navbar={Navbar} Footer={Footer} {...pageProps}>
        <Component lang={site.lang} {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
