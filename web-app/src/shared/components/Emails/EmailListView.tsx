import React from "react";
import { format } from "date-fns";

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MoreVertical, AlertTriangle } from 'lucide-react';

import { Email, EmailListProps } from "../../models/Email";
import { Badge } from "@/components/ui/badge";

const EmailListView = (props: EmailListProps) => {
  
  const emailSubHeader = (email: Email) => {
    const formattedDate =  format(new Date(email.createdAt), "dd/MM/yyyy p");
    return <>{ formattedDate }</>
  };

  return (
    <div className="container-fluid note-list">
      <h3>Emails({ props.emails.length })</h3>
      { props.emails.map( (email: Email) => (

        <Card className="note-card">
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
              title={email.title}
              subheader={
                <div className="sub-header">
                  <span>{ emailSubHeader(email) }</span>

                  { email.isCritical && (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Critical
                    </Badge>
                  ) }
                                    
                </div>
              }
            />
          
          <CardContent className="note-card-content">
            <p className="text-sm text-gray-600">
              {email.message}
            </p>
          </CardContent>
          </Card>
      )) }
    </div>
  );
};

export default EmailListView;
