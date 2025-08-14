import React from "react";
import { useParams } from "react-router-dom";
import NotesCardView from "../../../../shared/components/Notes/NotesList/NotesCardView";

const CompanyNotes = () => {
  let { id } = useParams();
  const options = {
    type: "company",
    companyId: id,
  };

  return (
    <div className="grid-container">
      <div className="grid-full-width">
        <NotesCardView options={options} />
      </div>
    </div>
  );
};

export default CompanyNotes;
