import { Heading, Link, SimpleGrid, Text } from "@chakra-ui/react";
import { useFirestore } from "lib/modules/firebase/firebaseFirestore";
import { useEffect, useState } from "react";
import { MdArticle, MdWallpaper } from "react-icons/md";
import { Database } from "../../../../shared/types";
import { ActionTile } from "../ActionTile";
import CardContainer from "../CardContainer/CardContainer";

interface Props {
  company: Database.CompanyType | null;
}

const ContractCard: React.FC<Props> = ({ company }) => {
  const { getContractById } = useFirestore();

  const [contractUrl, setContractUrl] = useState<string>();

  useEffect(() => {
    if (company) {
      getContractById(company.id).then((contract) => {
        if (contract) {
          setContractUrl(contract.url);
        }
      });
    }
  }, [company, getContractById]);

  return (
    <CardContainer>
      <Heading size="sm">Contract & Wall Plaque</Heading>
      <SimpleGrid minChildWidth="80px">
        {contractUrl && (
          <Link href={contractUrl} target="_blank">
            <ActionTile title="Contract">
              <MdArticle />
            </ActionTile>
          </Link>
        )}
        {company?.wallPlaqueUrl && (
          <Link href={company.wallPlaqueUrl} target="_blank">
            <ActionTile title="Wall Plaque">
              <MdWallpaper />
            </ActionTile>
          </Link>
        )}
        {!contractUrl && !company?.wallPlaqueUrl && <Text>Nothing here.</Text>}
      </SimpleGrid>
    </CardContainer>
  );
};

export default ContractCard;
