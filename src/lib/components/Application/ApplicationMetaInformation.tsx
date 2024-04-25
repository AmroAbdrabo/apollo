import { formatDate, formatDateArray } from "lib/modules/utils/shared";
import React from "react";
import { Database } from "../../../../shared/types";
import { TableCell } from "./TableCell";
import { TableWrapper } from "./TableWrapper";

interface Props {
  application: Database.ApplicationType;
  notFound: string;
}

export const ApplicationMetaInformation: React.FC<Props> = ({
  application,
  notFound,
}) => {
  return (
    <TableWrapper title="Startup Metadata">
      <TableCell
        name="Meeting Dates"
        value={formatDateArray(application.meetingDates) || notFound}
      />
      <TableCell
        name="Submission Date"
        value={formatDate(application.submissionDate) || notFound}
      />
    </TableWrapper>
  );
};
