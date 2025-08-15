import { AppBar, Toolbar, Typography } from "@material-ui/core";

const HeaderWithTitle = ({ title, onCloseDrawer }) => {
    return (
        <AppBar position="absolute" className="drawer-header">
            <Toolbar>
            <Typography variant="inherit" color="inherit" noWrap>{title}</Typography>

            <svg 
                className="close-icon"
                onClick={onCloseDrawer} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CancelIcon">
                <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12z"></path>
            </svg>
            </Toolbar>
        </AppBar>
    );
}

export default HeaderWithTitle;