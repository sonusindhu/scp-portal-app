import React, { useState, Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Drawer } from "@mui/material";

import PageHeading from "../../../shared/components/PageHeading/PageHeading";
import QuoteService from "../../../services/quote.service";

import toast from "../../../utils/toast.util";
import QuoteConfig from "./quote.config";
import GridListView from "../../../shared/components/GridList/GridListView";
import { MenuItem } from "../../../shared/models/MenuList.model";

import AddQuote from "./AddQuote";

const QuoteList = () => {
  const [mainMenus, setMainMenus] = useState<MenuItem[]>(QuoteConfig.mainMenus);
  const [selectedIds, setSelectedIds] = useState<any[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  let navigate = useNavigate();
  const [addDrawer, setAddDrawer] = useState(false);

  const deleteAction = (ids) => (
    <Fragment>
      <Button onClick={() => confirmDelete(ids)}>Confirm</Button>
      <Button onClick={() => toast.close()}>Close</Button>
    </Fragment>
  );

  const confirmDelete = (ids: number[]) => {
    toast.close();
    QuoteService.deleteRange(ids)
      .then(({ message }) => {
        toast.success(message);
        setRefreshKey((prev) => prev + 1);
      })
      .catch(({ message }) => {
        toast.error(message);
      });
  };

  const deleteQuote = (ids) => {
    toast.warning("Are you sure, you want to delete?", {
      action: () => deleteAction(ids),
    });
  };

  const closeDrawer = () => {
    setAddDrawer(false);
  };

  const onAddSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const onCreate = () => {
    setAddDrawer(true);
  };

  const menuCallbackFun = ({ event, data, menu }) => {
    switch (menu?.key) {
      case "delete":
        deleteQuote([data.id]);
        break;
      case "deletes":
        selectedIds.length && deleteQuote(selectedIds);
        break;
      case "edit":
        navigate(`/app/quote/${data.id}/details`);
        break;
      case "selectRow":
        setSelectedIds(data);
        const menus = mainMenus.map((menu) => {
          if (!menu.alwaysEnable) menu.disabled = data.length === 0;
          return menu;
        });
        setMainMenus(menus);
        break;
    }
  };

  return (
    <Fragment>
      <PageHeading
        title="Quote List"
        menus={mainMenus}
        menuCallback={menuCallbackFun}
      >
        <Button
          className="blue-btn m-r-20"
          type="button"
          size="large"
          variant="contained"
          onClick={onCreate}
        >
          Create
        </Button>
      </PageHeading>

      <GridListView
        options={QuoteConfig}
        callbackFun={menuCallbackFun}
        refreshKey={refreshKey}
      />

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
