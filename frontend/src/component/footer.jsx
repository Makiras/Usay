import React, { Fragment, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Link } from "@mui/material";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import HelpTwoToneIcon from "@mui/icons-material/HelpTwoTone";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import moment from "moment";
import { useEffect } from "react";

const Footer = () => {
  const { pathname } = useLocation();
  const [value, setValue] = useState(pathname.match(/[a-z]+/)[0]);

  useEffect(() => {
    const location = pathname.match(/[a-z]+/)[0];
    if (location !== value) {
      setValue(location);
    }
  }, [pathname, value]);

  return (
    <Fragment>
      <div
        className="navigator"
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          textAlign: "center",
          display: pathname === "/" ? "none" : "block",
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            value="sign"
            label="Sign"
            component={RouterLink}
            to="/sign"
            icon={<AccountCircleTwoToneIcon />}
          />
          <BottomNavigationAction
            value="verify"
            label="Verify"
            component={RouterLink}
            to="/verify"
            icon={<HelpTwoToneIcon />}
          />
          <BottomNavigationAction
            value="about"
            label="About"
            component={RouterLink}
            to="/about"
            icon={<InfoTwoToneIcon />}
          />
        </BottomNavigation>
      </div>
      <div
        style={{
          position: "fixed",
          bottom: pathname === "/" ? 2 : 64,
          width: "100%",
          textAlign: "center",
          fontSize: "12px",
          color: "#9E9E9E",
          zIndex:-1
        }}
      >
        ©2022-{moment().format("YYYY")}{" "}
        <Link
          color="#9E9E9E"
          underline="none"
          href="https://github.com/Makiras"
        >
          @Makiras
        </Link>
      </div>
    </Fragment>
  );
};

export default Footer;
