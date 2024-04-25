export const buildingNames = ["STE", "HPL"];

export const DatabaseModel = {
  // @type = UserType
  Users: {
    key: "users",
  },

  Companies: {
    key: "companies",
    Private: {
      key: "private",
    },
  },

  SupportersProgramme: {
    key: "supportersprogram",
  },

  Events: {
    key: "events",
  },

  Mentors: {
    key: "mentors",
  },

  InvitationCodes: {
    key: "invitationCodes",
  },
};

export namespace Database {
  // * User Type

  export type UserGroupType = "startup" | "admin" | "supporter" | "vc";

  export type UserType = {
    id: string;
    companyId: string;
    firstName: string;
    lastName: string;
    position: string;
    userGroup: UserGroupType;
    profilePictureURL?: string;
    linkedInURL?: string;
  };

  // * Event Type

  export type EventType = {
    id: string;
    timestamp: number;
    title: string;
    description: string;
    link: string;
    location: string;
    imageUrl: string;
  };

  // * Company Type
  export type CompanyType = {
    id: string;
    name: string;
    category: Database.CompanyCategory;
    missionStatement: string;
    pitchUrl?: string;
    website?: string;
    imageSource: string;
    wallPlaqueUrl?: string;
    type: CompanyTypes;
    status: StatusTypes;
  };

  export type ContractType = {
    url: string;
  };

  export type CompanyTypes = "startup" | "vc" | "supporter" | "admin";

  export type StatusTypes = "applied" | "active" | "inactive" | "rejected";

  export type CategorizedStartupsType = {
    category: string;
    startups: CompanyType[];
  };

  // * Supporter Types

  export type SupporterType = {
    id: string;
    category: string;
    desc: string;
    publicEmail?: string;
    privateEmail?: string;
    landingPage?: string;
    imageSource: string;
    name: string;
    perks: PerkType[];
    used: number;
    isNew: boolean;
  };

  export type PerkType = {
    title: string;
    description: string;
  };

  export type CategorizedSupportersType = {
    category: string;
    supporters: SupporterType[];
  };

  export type MeetingRoomType = {
    id: string;
    name: string;
    buildingName: typeof buildingNames[number];
    imageUrl: string;
    bookingLink: string;
  };

  // * Mentor Types

  export type MentorType = {
    id: string;
    firstName: string;
    lastName: string;
    desc: string;
    expertiseAreas: string[];
    position: string;
    publicEmail: string;
    linkedinUrl?: string;
    imageUrl?: string;
  };

  // * Application Types

  export type ApplicationType = {
    readonly id?: string;
    meetingDates: number[];
    submissionDate: number;
    startup: {
      name: string;
      description: string;
      stage: string;
      initialTeamSize: number;
      startupAge: string;
      incorporationDate?: number;
      desiredDuration?: string;
      teamDescription: string;
      website: string;
      category: string;
    };
    founder: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      dateOfBirth: number;
      affiliationOrBackground: string[];
      backgroundDescription: string;
      enrolmentState: string;
    };
  };

  export interface ApplicationWithStatusType extends ApplicationType {
    status: StatusTypes;
  }

  // * Update Types

  export type UpdateType = {
    id: string;
    companyName: string;
    companyCategory: CompanyCategory;
    companyLogoUrl: string;
    content: string;
    timestamp: number;
    authorId: string;
    authorFirstName: string;
    authorLastName: string;
    authorProfilePictureUrl: string;
  };

  export type BackendUpdateType = {
    id: string;
    companyId: string;
    content: string;
    timestamp: number;
    authorId: string;
  };

  export type GroupedUpdatesType = {
    date: number;
    updates: UpdateType[];
  };

  // * Company Categories
  export const companyCategoryArray = [
    "DeepTech",
    "MedTech",
    "FinTech",
    "InsurTech",
    "HealthTech",
    "Entertainment",
    "Climate",
    "SusTech",
    "Student Organisation",
    "Other",
  ] as const;

  export type CompanyCategory = typeof companyCategoryArray[number];

  // * Supporter Categories
  export const supporterCategories = [
    "Funding",
    "Cap Table Management",
    "Coworking Space",
    "Insurance Solutions",
    "Legal Services",
    "Banking",
    "Marketing & Design Services",
    "Mentorship & Networking",
    "Development & IT",
    "Industrialization & Workspace",
  ];

  export type SupporterCategory = typeof supporterCategories[number];

  // * Invitation Code
  export type InvitationCodeType = {
    group: UserGroupType;
    companyId: string;
    used: boolean;
  };
}

export namespace API {
  // sendMail
  export namespace RequestInternetAccess {
    export type Request = {
      companyName: string;
      firstName: string;
      lastName: string;
      email: string;
      fullAddress: string;
      dateOfBirth: string;
    };

    // eslint-disable-next-line @typescript-eslint/ban-types
    export type Response = {};
  }

  // createAccount
  export namespace CreateAccount {
    export type Request = {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      position: string;
      invitationCode: string;
      linkedInURL: string;
    };

    export type Response = {
      group: string;
      companyId: string;
    };
  }

  // createCompany
  // * fill
  export namespace CreateCompany {
    export type Request = {
      application: Database.ApplicationType;
    };
    export type Response = {
      id: string;
    };
  }

  // verifyInvitationCode
  export namespace VerifyInvitationCode {
    export type Request = {
      invitationCode: string;
    };

    export type Response = {
      isValid: boolean;
      companyId: string;
    };
  }

  // generateInvitationCode
  export namespace GenerateInvitationCode {
    export type Request = {
      email: string;
    };

    export type Response = {
      invitationCode: string;
    };
  }

  export namespace ApproveCompany {
    export type Request = {
      companyId: string;
    };

    export type Response = unknown;
  }

  export namespace DisableUsers {
    export type Request = {
      userIds: string[];
    };

    // eslint-disable-next-line @typescript-eslint/ban-types
    export type Response = {};
  }

  export namespace ContactMentor {
    export type Request = {
      mentorName: string;
      mentorEmail: string;
      userName: string;
      userEmail: string;
      companyName: string;
      companyDescription: string;
      topic: string;
      meetingDates: string[];
      preferredMeetingType: string;
    };

    // eslint-disable-next-line @typescript-eslint/ban-types
    export type Response = {};
  }
}

export namespace Auth {
  export type UserCustomClaims = {
    group: Database.UserGroupType;
    companyId: string;
  };
}
