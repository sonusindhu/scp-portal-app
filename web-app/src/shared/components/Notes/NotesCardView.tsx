import React, { useEffect, useState } from "react";
import { format } from "date-fns";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import WarningOutlinedIcon from "@mui/icons-material/WarningOutlined";

import { Note } from "../../models/Note";
import { Button, Chip, Drawer } from "@mui/material";
import PageHeading from "../PageHeading/PageHeading";
import { MenuItem } from "../../models/MenuItem";
import { useParams } from "react-router-dom";
import NoteService from "../../../services/note.service";
import NoteForm from "./NoteForm";
import { NotesMainMenu } from "../../const/notes.conts";

interface NotesListProps {
  options: any;
}

const NotesListView = (props: NotesListProps) => {
  let { id } = useParams();
  let [notes, setNotes] = useState<Note[]>([]);
  let [note] = useState<Note>(props.options);
  const [addDrawer, setAddDrawer] = useState(false);
  const [mainMenus] = useState<MenuItem[]>(NotesMainMenu.filter(i => i.key !== 'switch-card'));

  const noteSubHeader = (note: Note) => {
    const formattedDate = format(new Date(note.createdAt), "dd/MM/yyyy p");
    return <>{formattedDate}</>;
  };

  const menuCallbackFun = ({ event, data, menu }) => {
    console.log(event, data, menu);
  };

  const onCreate = () => {
    setAddDrawer(true);
  };

  const onSuccess = (event: Note) => {
    const note = [event];
    setNotes([...note, ...notes]);
    closeDrawer();
  };

  const closeDrawer = () => {
    setAddDrawer(false);
  };

  useEffect(() => {
    if (id) {
      NoteService.get(props.options).then((response) => {
        setNotes(response.result);
      });
    }
  }, [id, props.options]);

  return (
    <div className="container-fluid note-list">
      <PageHeading
        title={"Notes(" + notes.length + ")"}
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

      {notes.map((note: Note) => (
        <Card className="note-card" key={note.id}>
          <CardHeader
            className="note-card-header"
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="User Name">
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={note.title}
            subheader={
              <div className="sub-header">
                <span>{noteSubHeader(note)}</span>

                {note.isCritical && (
                  <Chip
                    icon={<WarningOutlinedIcon color="error" />}
                    label="Critical"
                  />
                )}
              </div>
            }
          />

          <CardContent className="note-card-content">
            <Typography variant="body2" color="text.secondary">
              {note.message}
            </Typography>
          </CardContent>
          {/* <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions> */}
        </Card>
      ))}

      <Drawer
        anchor="right"
        open={addDrawer}
        onClose={closeDrawer}
        ModalProps={{ disableEnforceFocus: true }}
      >
        <NoteForm
          note={note}
          onSuccess={onSuccess}
          onCloseDrawer={closeDrawer}
        />
        `
      </Drawer>
    </div>
  );
};

export default NotesListView;
