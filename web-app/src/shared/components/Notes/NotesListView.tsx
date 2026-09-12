import React, { useEffect, useState } from "react";
import { format } from "date-fns";

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { MoreVertical, AlertTriangle } from "lucide-react";

import { Note } from "../../models/Note";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import PageHeading from "../PageHeading/PageHeading";
import { MenuItem } from "../../models/MenuItem";
import { useParams } from "react-router-dom";
import NoteService from "../../../services/note.service";
import NoteForm from "./NoteForm";
import { NotesMainMenu } from "../../const/notes.conts";
import { AvatarFallback } from "@radix-ui/react-avatar";

interface NotesListProps {
  options: any;
}

const NotesCardView = (props: NotesListProps) => {
  let { id } = useParams();
  let [notes, setNotes] = useState<Note[]>([]);
  let [note, setNote] = useState<Note>(props.options);
  const [addDrawer, setAddDrawer] = useState(false);
  const [mainMenus, setMainMenus] = useState<MenuItem[]>(NotesMainMenu.filter(i => i.key != 'switch-card'));

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
      NoteService.list(props.options).then((response) => {
        setNotes(response.data || []);
      });
    }
  }, []);

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
          size="lg"
          variant="default"
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
              <Avatar className="bg-red-500">
                <AvatarFallback className="bg-red-500 text-white">R</AvatarFallback>
              </Avatar>
            }
            action={
              <button
                aria-label="settings"
                className="inline-flex items-center justify-center rounded-full p-2 hover:bg-gray-100 transition-colors"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
            }
            title={note.title}
            subheader={
              <div className="sub-header">
                <span>{noteSubHeader(note)}</span>

                {note.isCritical && (
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Critical
                  </Badge>
                )}
              </div>
            }
          />

          <CardContent className="note-card-content">
            <p className="text-sm text-gray-600">
              {note.message}
            </p>
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

      <Sheet open={addDrawer} onOpenChange={(open) => !open && closeDrawer()}>
        <SheetContent side="right">
          <NoteForm
            note={note}
            onSuccess={onSuccess}
            onCloseDrawer={closeDrawer}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NotesCardView;
