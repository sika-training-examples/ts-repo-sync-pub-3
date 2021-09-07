import React from "react";
import CourseDD from "@app/ondrejsika-theme/layouts/CourseDD";
import logo from "@app/data/pictures/courses/white/argocd-large.png";

const Page = props => (
  <CourseDD
    site={props.site}
    course_id="argocd"
    lang={props.site.lang}
    logo={logo}
    location="cz"
    show_sessions={true}
    hide_prices={true}
  />
);

export default Page;
