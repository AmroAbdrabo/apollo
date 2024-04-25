import { formatDate } from "lib/modules/utils/shared";
import React from "react";
import { Database } from "../../../../shared/types";
import { TableCell } from "./TableCell";
import { TableWrapper } from "./TableWrapper";

interface Props {
  application: Database.ApplicationType;
  notFound: string;
}

export const ApplicationStartupInformation: React.FC<Props> = ({
  application,
  notFound,
}) => {
  return (
    <TableWrapper title="Startup Information">
      <TableCell name="Name" value={application.startup.name || notFound} />
      <TableCell
        name="Initial Team Size"
        value={application.startup?.initialTeamSize.toString() || notFound}
      />
      <TableCell
        name="Startup Age"
        value={application.startup.startupAge || notFound}
      />
      <TableCell
        name="Incorporation Date"
        value={
          application.startup.incorporationDate
            ? formatDate(application.startup.incorporationDate)
            : notFound
        }
      />
      <TableCell
        name="Desired Duration"
        value={application.startup.desiredDuration || notFound}
      />
      <TableCell
        name="Website"
        value={application.startup.website || notFound}
      />
      <TableCell
        name="Category"
        value={application.startup.category || notFound}
      />
    </TableWrapper>
  );
};
