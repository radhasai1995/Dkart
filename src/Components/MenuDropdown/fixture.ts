import * as IconGallery from "@iconsGallery";
import * as GlobalFixture from "@globalFixture";
const { TRAINING, REPORTS, USERS, PROFILE, LOGOUT } =
  GlobalFixture.TOTAL_CONTENTS;

export const defaultMenuList = [
  {
    id: "Training",
    name: TRAINING,
    icon: IconGallery.ITrainingIcon,
    requiredPermission: "Training Module",
    showOption: true,
  },
  {
    id: "Reports",
    name: REPORTS,
    icon: IconGallery.IReportsIcon,
    requiredPermission: "Transactions",
    showOption: true,
  },
  {
    id: "Users",
    name: USERS,
    icon: IconGallery.IUsersIcon,
    requiredPermission: "Create User",
    showOption: true,
  },
  {
    id: "Profile",
    name: PROFILE,
    icon: IconGallery.IProfileIcon,
    requiredPermission: null,
    showOption: true,
  },
  {
    id: "Logout",
    name: LOGOUT,
    icon: IconGallery.ILogoutIcon,
    requiredPermission: null,
    showOption: true,
  },
];
