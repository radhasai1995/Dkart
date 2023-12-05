import { useTranslation } from "react-i18next";
import * as IconGallery from "@iconsGallery";
import * as GlobalFixture from "@globalFixture";
export const useAppHeaderFixture = () => {
  const { t } = useTranslation();
  const defaultMenuList = [
    {
      id: 'Training',
      name: t('TRAINING'),
      icon: IconGallery.ITrainingIcon,
      requiredPermission: GlobalFixture.MODULE_PERMISSIONS_KEY_FIXTURE.TRAINING_READ,
      showOption: true
    },
    {
      id: 'Reports',
      name: t('REPORTS'),
      icon: IconGallery.IReportsIcon,
      requiredPermission: GlobalFixture.MODULE_PERMISSIONS_KEY_FIXTURE.REPORTS_READ,
      showOption: true
    },
    {
      id: 'Users',
      name: t('USERS'),
      icon: IconGallery.IUsersIcon,
      requiredPermission: GlobalFixture.MODULE_PERMISSIONS_KEY_FIXTURE.USERS_READ,
      showOption: true
    },
    {
      id: 'Profile',
      name: t('PROFILE'),
      icon: IconGallery.IProfileIcon,
      requiredPermission: GlobalFixture.MODULE_PERMISSIONS_KEY_FIXTURE.PROFILE_READ,
      showOption: true
    },
    {
      id: 'Logout',
      name: t('LOGOUT'),
      icon: IconGallery.ILogoutIcon,
      requiredPermission: null,
      showOption: true
    },
  ];
  return { defaultMenuList };
};
