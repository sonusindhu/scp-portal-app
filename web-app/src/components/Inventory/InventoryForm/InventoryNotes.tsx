import React from "react";
import { useParams } from "react-router-dom";
import NotesCardView from "../../../shared/components/Notes/NotesCardView";

const InventoryNotes = () => {
  let { id } = useParams();
  const options = {
    type: "inventory",
    inventoryId: id,
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12">
        <NotesCardView options={options} />
      </div>
    </div>
  );
};

export default InventoryNotes;
