import React, { useState, useCallback, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Drawer } from "@mui/material";

import QuoteService from "../../../services/quote.service";

import toast from "../../../utils/toast.util";
import QuoteConfig from "./quote.config";
import GridListView from "../../../shared/components/GridList/GridListView";
import { MenuItem } from "../../../shared/models/MenuList.model";

import AddQuote from "./AddQuote";
import GridActionMenu from "../../../shared/components/GridList/GridActionMenu";

interface MenuCallbackArgs {
  event: React.MouseEvent;
  data: any;
  menu: MenuItem;
}

const QuoteList: React.FC = () => {
  const [mainMenus, setMainMenus] = useState<MenuItem[]>(QuoteConfig.mainMenus);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();
  const [addDrawer, setAddDrawer] = useState(false);

  const confirmDelete = useCallback((ids: number[]) => {
    toast.close();
    QuoteService.deleteRange(ids)
      .then(({ message }) => {
        toast.success(message);
        setRefreshKey((prev) => prev + 1);
      })
      .catch(({ message }) => {
        toast.error(message);
      });
  }, []);

  const deleteAction = useCallback((ids: number[]) => (
    <Fragment>
      <Button onClick={() => confirmDelete(ids)} aria-label="Confirm delete">Confirm</Button>
      <Button onClick={() => toast.close()} aria-label="Close dialog">Close</Button>
    </Fragment>
  ), [confirmDelete]);

  const deleteQuote = useCallback((ids: number[]) => {
    toast.warning("Are you sure, you want to delete?", {
      action: () => deleteAction(ids),
    });
  }, [deleteAction]);

  const closeDrawer = useCallback(() => {
    setAddDrawer(false);
  }, []);

  const onAddSuccess = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  const onCreate = useCallback(() => {
    setAddDrawer(true);
  }, []);

  const menuCallbackFun = useCallback(({ event, data, menu }: MenuCallbackArgs) => {
    switch (menu?.key) {
      case "delete":
        deleteQuote([data.id]);
        break;
      case "deletes":
        selectedRows.length && deleteQuote(selectedRows.map((row) => row.id));
        break;
      case "edit":
        navigate(`/app/quote/${data.id}/details`);
        break;
    }
  }, [navigate, deleteQuote, selectedRows]);

  useEffect(() => {
    setMainMenus((prevMenus) =>
      prevMenus.map((menu) => {
        if (!menu.alwaysEnable) menu.disabled = selectedRows.length === 0;
        return menu;
      })
    );
  }, [selectedRows]);

  return (
    <Fragment>
      <GridListView
        title="Quote List"
        searchPlaceholder="Search quotes..."
        options={QuoteConfig}
        refreshKey={refreshKey}
        globalFilterFields={QuoteConfig.globalFilterFields}
        onRowSelectionChange={setSelectedRows}
      >
        <Button
          className="blue-btn"
          type="button"
          size="large"
          variant="contained"
          onClick={onCreate}
          aria-label="Create quote"
        >
          Create
        </Button>

        <GridActionMenu
          className="heading-menu"
          menus={mainMenus}
          menuCallback={menuCallbackFun}
        />
      </GridListView>
      <Drawer
        anchor="right"
        open={addDrawer}
        onClose={closeDrawer}
        ModalProps={{ disableEnforceFocus: true }}
      >
        <AddQuote onCloseDrawer={closeDrawer} onAddSuccess={onAddSuccess} />
      </Drawer>
    </Fragment>
  );
};

export default QuoteList;
