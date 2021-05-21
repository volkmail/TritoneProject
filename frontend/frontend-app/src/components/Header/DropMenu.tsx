import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu, {MenuProps} from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppsIcon from '@material-ui/icons/Apps';
import {NavLink} from "react-router-dom";
import ContactSupportTwoToneIcon from '@material-ui/icons/ContactSupportTwoTone';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import SchoolTwoToneIcon from '@material-ui/icons/SchoolTwoTone';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props: MenuProps) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

export default function DropMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                style={{backgroundColor: "#b6fdb6", borderRadius:"20px"}}
                onClick={handleClick}
            >
                <AppsIcon fontSize="default"/>
            </Button>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem>
                    <ListItemIcon>
                        <SchoolTwoToneIcon style={{ color: "#8ed78e" }} fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>
                        <NavLink to={"/MyResults"} style={{textDecoration: "none", color: "black"}}>Мои
                            результаты</NavLink>
                    </ListItemText>
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon>
                        <ContactSupportTwoToneIcon style={{ color: "#8ed78e" }} fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>
                        <NavLink to={"/help"} style={{textDecoration: "none", color: "black"}}>Справочник</NavLink>
                    </ListItemText>
                </StyledMenuItem >
                <StyledMenuItem>
                    <ListItemIcon>
                        <ExitToAppTwoToneIcon style={{ color: "#8ed78e" }} fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>
                        <NavLink to={"/exit"} style={{textDecoration: "none", color: "black"}}>Выйти</NavLink>
                    </ListItemText>
                </StyledMenuItem>
            </StyledMenu>
        </div>
    );
}
