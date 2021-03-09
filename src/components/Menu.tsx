import React from "react";
import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import { Link, useLocation } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { COLORS } from "../constants/Colors";
import InsertPage from "../screens/InsertPage";
import InsertCategoriesPage from "../screens/InsertCategoriesPage";
import { MenuItem, Select } from "@material-ui/core";
import InsertTopicsPage from "../screens/InsertQuestionsPage";
import InsertQuestionsPage from "../screens/InsertQuestionsPage";
import { Language, languages } from "../constants/languages";

import HeaderSection from "./HeaderSection";
const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerItem: {
      color: COLORS.menuText,
      textTransform: "uppercase",
      fontWeight: "bolder",
      float: "left",
    },
    childrenContainer: {
      paddingTop: 100,
      backgroundColor: COLORS.primaryBackground,
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      width: "100%",
      minHeight: "100vh",
    },
    paper: {
      background: "red",
      color: "red",
    },
    drawerPaper: {
      width: drawerWidth,
      background: COLORS.menuContainer,
      color: "#fff",
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
  })
);

const routers = [
  {
    key: "categories",
    path: "/insert/categories/:lang",
    sidebarName: "categories",
    navbarName: "categories",
  },
  {
    key: "topics",
    path: "/insert/topics/:lang",
    sidebarName: "topics",
    navbarName: "topics",
  },
  {
    key: "questions",
    path: "/insert/questions/:lang",
    sidebarName: "questions",
    navbarName: "questions",
  },
  {
    key: "reports",
    path: "/reports/:lang",
    sidebarName: "reports",
    navbarName: "reports",
  },
];
const NO_LANG = "Select A Language";

export default function PersistentDrawerLeft({ children }: { children: any }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [path, setPath] = React.useState("");
  const [language, setLanguage] = React.useState<string>("EN");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLanguage(event.target.value as string);
  };

  let location = useLocation();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    setPath(location.pathname);
    console.log(location.pathname);
  }, [location, setPath]);

  const activetRoute = (route: string) => {
    console.log(route, path);
    return route === path;
  };

  const getRouteName = (path: string) => {
    const route = routers.find((route) => route.path == path);
    return route ? route.navbarName : "Not found";
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
        style={{ backgroundColor: "#fff", color: COLORS.primaryOrange }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            TOP Picks
          </Typography>

          <div style={{ position: "absolute", right: 30 }}>
            <Typography variant="h6" noWrap>
              {language}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />

        <List>
          {routers.map((prop: any, key: number) => (
            <Link to={prop.path} style={{ textDecoration: "none" }} key={key}>
              <MenuItem selected={activetRoute(prop.path)}>
                <ListItemText
                  className={classes.drawerItem}
                  primary={prop.sidebarName}
                />
              </MenuItem>
            </Link>
          ))}
        </List>
        <Divider />

        {/*    <List>
          <Link to={"/reports" + language} style={{ textDecoration: "none" }}>
            <MenuItem selected={activetRoute("/reports" + language)}>
              <ListItemText className={classes.drawerItem} primary="reports" />
            </MenuItem>
          </Link>
    </List>}*/}

        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon style={{ color: COLORS.menuIcon }} />
            </ListItemIcon>

            <ListItemText primary="logout" className={classes.drawerItem} />
          </ListItem>
        </List>
      </Drawer>

      <div className={classes.childrenContainer}>
        <HeaderSection title={getRouteName(path)} />
        {children}
      </div>
    </div>
  );
}
