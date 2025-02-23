import { useAppSelector } from '@/app/lib/hooks';
import { setAddClassModalState, setAddStudentModalState, setAddTeacherModalState } from '@/app/lib/slice';
import { ScrollArea } from '@mantine/core';
import {
  IconAi,
  IconBrandYoutubeFilled,
  IconBriefcaseFilled,
  IconChartPieFilled,
  IconCirclePlusFilled,
  IconDeviceDesktop,
  IconEyeFilled,
  IconFileStack,
  IconIdBadge2,
  IconLogout,
  IconUsers,
  IconVideo
} from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { LinksGroup } from './NavbarLinks';
import classes from './style.module.css';

const Navbar = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { userData } = useAppSelector(state => state.store)

  let data = [
    { link: '/dashboard', label: 'Dashboard', icon: IconChartPieFilled },
    {
      link: '', label: 'Manage Teachers', icon: IconBriefcaseFilled, options: [{ label: 'Teachers', icon: <IconEyeFilled />, onClick: () => { router.push("/dashboard/teachers") } },
      {
        label: 'Add Teacher', icon: <IconCirclePlusFilled />, onClick: () => {
          dispatch(setAddTeacherModalState({ show: true }))
        }
      }]
    },
    {
      link: '', label: 'Manage Students', icon: IconIdBadge2, options: [{ label: 'Students', icon: <IconEyeFilled />, onClick: () => { router.push("/dashboard/students") } }, {
        label: 'Add Student', icon: <IconCirclePlusFilled />, onClick: () => {
          dispatch(setAddStudentModalState({ show: true, studentData: null, isEdit: false, makeRequest: null }))
        }
      }]
    },
    {
      link: '', label: 'Manage Classes', icon: IconDeviceDesktop, options: [{ label: 'Classes', icon: <IconEyeFilled />, onClick: () => { router.push("/dashboard/classes") } },
      { label: 'Add Classes', icon: <IconCirclePlusFilled />, onClick: () => { dispatch(setAddClassModalState({ show: true })) } }]
    },
    { link: '/dashboard/online-classes', label: 'Online Classes', icon: IconBrandYoutubeFilled },
    { link: '/dashboard/questionnaire/create-questions', label: 'Questionnaire', icon: IconFileStack },
    { link: '/dashboard/ai-assistance', label: 'AI Assistance', icon: IconAi },

    { link: '/dashboard/recorded-classes', label: 'Recorded Classes', icon: IconVideo },
    { link: '/dashboard/parents', label: 'Manage Parents', icon: IconUsers },

  ];

  if (userData?.userType === "STUDENT") {
    data = data.filter(item => item.label !== "Manage Parents" && item.label !== "Manage Classes" && item.label !== "Manage Students" && item.label !== "Manage Teachers" && item.label !== "Questionnaire")
  }

  const links = data.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <nav className={classes.navbar}>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        {/* <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a> */}

        <Link href="/" className={classes.link} onClick={(e) => {
          // e.preventDefault();
          // props.toggleDesktop()
          localStorage.removeItem('accessToken')
        }} >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;