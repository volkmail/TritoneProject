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
import BrokenImageTwoToneIcon from '@material-ui/icons/BrokenImageTwoTone';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import {useSelector} from "react-redux";
import {GetUserInfo} from "../../redux/selectors/user-selector";
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import FormatListNumberedTwoToneIcon from '@material-ui/icons/FormatListNumberedTwoTone';

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
    const userInfo = useSelector(GetUserInfo);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                style={{backgroundColor: "#b6fdb6", borderRadius: "20px"}}
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
                {userInfo?.role === "Студент"
                    ? <>
                        <StyledMenuItem>
                            <ListItemIcon>
                                <ContactSupportTwoToneIcon style={{color: "#8ed78e"}} fontSize="small"/>
                            </ListItemIcon>
                            <ListItemText>
                                <NavLink to={"/help"} style={{textDecoration: "none", color: "black"}}>Справочник</NavLink>
                            </ListItemText>
                        </StyledMenuItem>
                        <StyledMenuItem>
                            <ListItemIcon>
                                <FormatListNumberedTwoToneIcon style={{color: "#8ed78e"}} fontSize="small"/>
                            </ListItemIcon>
                            <ListItemText>
                                <NavLink to={"/testing"} style={{textDecoration: "none", color: "black"}}>Разделы обучения</NavLink>
                            </ListItemText>
                        </StyledMenuItem>
                    </>
                    : userInfo?.role === "Преподаватель"
                        ?<>
                            <StyledMenuItem>
                                <ListItemIcon>
                                    <BrokenImageTwoToneIcon style={{color: "#8ed78e"}} fontSize="small"/>
                                </ListItemIcon>
                                <ListItemText>
                                    <NavLink to={"/statistic"} style={{textDecoration: "none", color: "black"}}>Результаты</NavLink>
                                </ListItemText>
                            </StyledMenuItem>
                            <StyledMenuItem>
                                <ListItemIcon>
                                    <CreateTwoToneIcon style={{color: "#8ed78e"}} fontSize="small"/>
                                </ListItemIcon>
                                <ListItemText>
                                    <NavLink to={"/edit/groups"} style={{textDecoration: "none", color: "black"}}>Ред. групп</NavLink>
                                </ListItemText>
                            </StyledMenuItem>
                            <StyledMenuItem>
                                <ListItemIcon>
                                    <CreateTwoToneIcon style={{color: "#8ed78e"}} fontSize="small"/>
                                </ListItemIcon>
                                <ListItemText>
                                    <NavLink to={"/statistic"} style={{textDecoration: "none", color: "black"}}>Ред. теста</NavLink>
                                </ListItemText>
                            </StyledMenuItem>
                            <StyledMenuItem>
                                <ListItemIcon>
                                    <AddCircleTwoToneIcon style={{color: "#8ed78e"}} fontSize="small"/>
                                </ListItemIcon>
                                <ListItemText>
                                    <NavLink to={"/regStudent"} style={{textDecoration: "none", color: "black"}}>Рег. студента</NavLink>
                                </ListItemText>
                            </StyledMenuItem>
                        </>
                        :<></>
                }

                <StyledMenuItem>
                    <ListItemIcon>
                        <ExitToAppTwoToneIcon style={{color: "#8ed78e"}} fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>
                        <NavLink to={"/exit"} style={{textDecoration: "none", color: "black"}}>Выйти</NavLink>
                    </ListItemText>
                </StyledMenuItem>
            </StyledMenu>
        </div>
    );
}
