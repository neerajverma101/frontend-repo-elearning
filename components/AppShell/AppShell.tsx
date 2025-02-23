"use client"
import restClient from '@/app/api/restClient';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { setUserData } from '@/app/lib/slice';
import { APIS, ROUTES } from '@/constant';
import { HMSRoomProvider } from '@100mslive/react-sdk';
import { AppShell, Avatar, Burger, Container, Flex, Group, LoadingOverlay, Menu, rem } from '@mantine/core';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import { IconSettings, IconUser } from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import AddClassForm from '../AddClassForm/AddClassForm';
import AddStudentForm from '../AddStudentForm/AddStudentForm';
import AddTeacherForm from '../AddTeacherForm/AddTeacherForm';
import AppLogo from '../AppLogo/AppLogo';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { FooterMenu } from '../FooterMenu/FooterMenu';
import { HeaderMenu } from '../HeaderMenu/HeaderMenu';
import LandingPage from '../LandingPage/LandingPage';
import LoginFormModal from '../LoginForm/LoginForm';
import Navbar from '../Navbar/Navbar';
import AddParentForm from '../Parents/AddParentForm/AddParentForm';
import ScheduleOnlineClass from '../ScheduleOnlineClass/ScheduleOnlineClassModal';
import AssignToClass from '../common/DynamicForm/AssignToClass/AssignToClass';
import BackLink from '../ui/BackLink';


export function AppShellLayout({ children }: { children: React.ReactNode }) {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure();
    const router = useRouter()
    const pathname = usePathname()
    const store = useAppSelector(state => state.store)
    const [accessToken] = useLocalStorage({ key: 'accessToken' })
    const dispatch = useAppDispatch()

    const isDashboard = pathname.includes("/dashboard");
    const showBack = !(pathname === '/' || pathname === '/dashboard')

    useEffect(() => {
        toggleMobile()
    }, [pathname]);

    useEffect(() => {
        const getUserData = async () => {
            if (accessToken) {
                try {
                    const { data } = await restClient.get(APIS.WHOAMI)
                    if (data) {
                        dispatch(setUserData(data))
                    }
                } catch (error) {
                    console.log(error)
                }

            }
        }
        getUserData()
    }, [accessToken]);

    const HeaderMenuWithSideBar = () => {
        return (
            <Flex justify="space-between">
                <Group h="100%" px="md">
                    <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                    <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                    <AppLogo path={isDashboard ? '/dashboard' : ''} />
                </Group>
                <Group px="md">
                    {store.userData?.username ?
                        <>
                            <Menu trigger="click-hover" shadow="md" width={200}>
                                <Menu.Target>
                                    <Avatar size={"md"} color='blue'>{store.userData?.username.toUpperCase().charAt(0)}</Avatar>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />} onClick={() => { router.push(ROUTES.USER_SETTINGS) }}>
                                        Settings
                                    </Menu.Item>
                                    <Menu.Item leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />} onClick={() => { router.push(ROUTES.USER_PROFILE) }}>Profile</Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </>
                        : null}
                </Group>
            </Flex>
        )
    }

    return (
        <HMSRoomProvider>
            {isDashboard ? <AppShell
                header={{ height: 60 }}
                navbar={{
                    width: 250,
                    breakpoint: 'sm',
                    collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
                }}
                padding="md"
            >
                <AppShell.Header bg='#C9CEF5'>
                    {isDashboard ? <HeaderMenuWithSideBar /> : <HeaderMenu />}
                </AppShell.Header>
                {isDashboard ?
                    <AppShell.Navbar   >
                        <Navbar toggleDesktop={toggleDesktop} />
                    </AppShell.Navbar> : null
                }
                <AppShell.Main
                    style={{
                        paddingLeft: isDashboard && desktopOpened ? 260 : 24,
                    }}
                >
                    <Container fluid>
                        {showBack && <BackLink />}
                    </Container>
                    {children}
                </AppShell.Main>
                <AppShell.Footer >
                    {isDashboard ? null : <FooterMenu></FooterMenu>}
                </AppShell.Footer>
                {store.loginModalState.show && <LoginFormModal></LoginFormModal>}
                {store.scheduleOnlineClassModalState.show ? <ScheduleOnlineClass></ScheduleOnlineClass> : null}
                {store.addTeacherModalState.show ? <AddTeacherForm></AddTeacherForm> : null}
                {store.addStudentModalState.show ? <AddStudentForm></AddStudentForm> : null}
                {store.addClassModalState.show ? <AddClassForm></AddClassForm> : null}
                {store.confirmationModal.isOpen ? <ConfirmationModal></ConfirmationModal> : null}
                {/* {store.isLoading && <AppLoader />} */}
                {store.addParentModalState.show ? <AddParentForm></AddParentForm> : null}
                {store.assignToClassModalState.show ? <AssignToClass></AssignToClass> : null}
                <LoadingOverlay visible={store.isLoading} loaderProps={{ children: 'Loading...' }} />
            </AppShell> : <LandingPage>{store.loginModalState.show && <LoginFormModal></LoginFormModal>}</LandingPage>}
        </HMSRoomProvider>
    );
}