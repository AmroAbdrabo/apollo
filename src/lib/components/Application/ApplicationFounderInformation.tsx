import { formatDate } from "lib/modules/utils/shared";
import React from "react";
import { Database } from "../../../../shared/types";
import { TableCell } from "./TableCell";
import { TableWrapper } from "./TableWrapper";

interface Props {
  application: Database.ApplicationType;
  notFound: string;
}

export const ApplicationFounderInformation: React.FC<Props> = ({
  application,
  notFound,
}) => {
  return (
    <TableWrapper title="Founder Information">
      <TableCell name="First Name" value={application.founder.firstName} />
      <TableCell name="Last Name" value={application.founder.lastName} />
      <TableCell name="Email" value={application.founder.email} />
      <TableCell name="Phone" value={application.founder.phoneNumber} />
      <TableCell
        name="Date of Birth"
        value={formatDate(application.founder.dateOfBirth) || notFound}
      />
      <TableCell
        name="Affiliation or Background"
        value={
          application.founder.affiliationOrBackground?.toString() || notFound
        }
      />
      <TableCell
        name="Background Description"
        value={application.founder.backgroundDescription || notFound}
      />
      <TableCell
        name="Enrolment State"
        value={application.founder.enrolmentState || notFound}
      />
    </TableWrapper>
  );
};
