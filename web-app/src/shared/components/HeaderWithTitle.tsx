const HeaderWithTitle = ({ title, onCloseDrawer }) => {
    return (
        <div className="drawer-header">
            <div className="flex items-center justify-between px-4 h-16">
                <h2 className="text-lg font-medium">{title}</h2>
            </div>
        </div>
    );
}

export default HeaderWithTitle;