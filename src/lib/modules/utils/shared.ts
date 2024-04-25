import { Database } from "../../../../shared/types";

export const formatDate = (date: number): string => {
  const dateObject = new Date(date);
  return `${dateObject.getDate()}.${
    dateObject.getMonth() + 1
  }.${dateObject.getFullYear()}`;
};

export const formatDateArray = (dateArray: number[]): string => {
  return dateArray.map((date) => formatDate(date)).join(", ");
};

export const querySupporters = (
  supporters: Database.SupporterType[]
): Database.CategorizedSupportersType[] => {
  const queriedSupporters: Database.CategorizedSupportersType[] = [];

  supporters.forEach((supporter) => {
    let inserted = false;
    queriedSupporters.forEach((categorizedSupporter) => {
      if (categorizedSupporter.category === supporter.category) {
        categorizedSupporter.supporters.push(supporter);
        inserted = true;
      }
    });
    if (!inserted) {
      queriedSupporters.push({
        category: supporter.category,
        supporters: [supporter],
      });
    }
  });

  return queriedSupporters;
};

export const categorizeStartups = (
  startups: Database.CompanyType[]
): Database.CategorizedStartupsType[] => {
  const queriedStartups: Database.CategorizedStartupsType[] = [];

  startups.forEach((startup) => {
    let inserted = false;
    queriedStartups.forEach((categorizedStartup) => {
      if (categorizedStartup.category === startup.category) {
        categorizedStartup.startups.push(startup);
        inserted = true;
      }
    });
    if (!inserted) {
      queriedStartups.push({
        category: startup.category,
        startups: [startup],
      });
    }
  });

  return queriedStartups;
};

export const convertInputDateToTimestamp = (date: string): number => {
  const dateArray = date.split("-");
  const dateObject = new Date(
    Number(dateArray[0]),
    Number(dateArray[1]) - 1,
    Number(dateArray[2])
  );
  return dateObject.getTime();
};

export function convertLinkedInLinkToHandle(url: string) {
  const urlParts = url.split("/");
  // removing trailing slash
  urlParts.pop();
  return urlParts.pop();
}

export function addLinkedinLinkToHandle(handle: string) {
  return `https://www.linkedin.com/in/${handle}/`;
}
