export type Merge<P, T> = Omit<P, keyof T> & T;

// // validateInvitationCode
// export namespace ValidateInvitationCode {
//   export type Request = {
//     invitationCode: string;
//   };

//   export type Response = {
//     isValid: boolean;
//     startupId: string;
//   };
// }

// // Always keep corresponding array in shared sharedConstants up to date
// export type CompanyCategory =
//   | "FinTech"
//   | "MedTech"
//   | "Climate"
//   | "Crypto"
//   | "DeepTech"
//   | "InsurTech"
//   | "HealthTech"
//   | "Entertainment"
//   | "SusTech"
//   | "Other"; // Please add more, always keep Other

// export type UpdateFilterType = "All" | "Favorites" | "Latest";

// export type UserGroupType = "startup" | "admin" | "supporter" | "vc";

// export type UserType = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   profilePictureURL?: string;
//   position: string;
//   userGroup: UserGroupType;
//   linkedin?: string;
//   companyId: string;
// };

// // * Event Type

// export type EventType = {
//   id: string;
//   timestamp: number; // We use miliseconds here and convert it to a Date type later (unix time)
//   title: string;
//   description: string;
//   link: string;
//   location: string;
//   imageUrl: string;
// };

// // * Company Type
// export type CompanyType = {
//   id: string;
//   name: string;
//   category: CompanyCategory;
//   missionStatement: string;
//   imageSource: string;
//   isApproved: boolean;
//   type: CompanyTypes;
// };

// export type CompanyTypes = "startup" | "vc" | "supporter" | "admin";

// export type CategorizedStartupsType = {
//   category: string;
//   startups: CompanyType[];
// };

// // * Supporter Types

// export type SupporterCategory =
//   | "Funding"
//   | "Cap Table Management"
//   | "Coworking Space"
//   | "Insurance Solutions"
//   | "Legal Services"
//   | "Banking"
//   | "Marketing & Design Services"
//   | "Mentorship & Networking"
//   | "Development & IT"
//   | "Industrialization & Workspace";

// export type SupporterType = {
//   id: string;
//   category: string;
//   desc: string;
//   publicEmail?: string;
//   privateEmail?: string;
//   landingPage?: string;
//   imageSource: string;
//   name: string;
//   perks?: PerkType[];
// };

// export type PerkType = {
//   title: string;
//   description: string;
// };

// export type CategorizedSupportersType = {
//   category: string;
//   supporters: SupporterType[];
// };

// // Make this more rigid later, only allowing certain feature types
// export type MeetingRoomFeauture = {
//   featureDescription: string;
//   order: number;
// };

// export type MeetingRoom = {
//   id: string;
//   name: string;
//   buildingName: typeof buildingNames[number];
//   meetingRoomPicture: string;
//   bookingLink: string;
//   features: MeetingRoomFeauture[];
// };

// // * Metrics
// export interface MetricType {
//   id: string;
//   name: string;
//   value: string;
//   icon: React.ReactElement;
// }
