import { Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Database } from "../../../../shared/types";
import { ListWithHeading } from "../ListWithHeading";
import { Tile } from "../Tile";

interface Props {
  categorizedStartups: Database.CategorizedStartupsType[];
}

export const StartupList: React.FC<Props> = ({ categorizedStartups }) => {
  const router = useRouter();
  return (
    <Stack spacing={10}>
      {categorizedStartups.map((startupCategory) => {
        return (
          <ListWithHeading
            key={startupCategory.category}
            heading={startupCategory.category}
          >
            {startupCategory.startups.map((startup) => (
              <Tile
                key={JSON.stringify(startup)}
                name={startup.name}
                imageURL={startup.imageSource}
                onClick={() => router.push(`/company/${startup.id}`)}
              />
            ))}
          </ListWithHeading>
        );
      })}
    </Stack>
  );
};
