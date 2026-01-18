import { SheetTitle } from "@/components/ui/sheet";

const HeaderWithTitle = ({ title, onCloseDrawer }) => {
    return (
        <div className="drawer-header">
            <div className="flex items-center justify-between px-4 h-16">
                <SheetTitle className="text-lg font-medium">{title}</SheetTitle>
            </div>
        </div>
    );
}

export default HeaderWithTitle;