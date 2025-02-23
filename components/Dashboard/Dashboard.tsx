"use client"
import restClient from '@/app/api/restClient';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import withAuth from '@/app/lib/withAuth';
import { APIS, MODULES_MAPPING } from '@/constant';
import { Card, Container, Grid, SimpleGrid, Text, Title, useMatches } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DashboardCards from './DashboardCards/DashboardCards';

const Dashboard = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [modules, setModules] = useState([])
    const [dashboardCounts, setDashboardCounts] = useState({})
    const { userData } = useAppSelector(state => state.store)

    useEffect(() => {
        getModules()
        getCounts()
    }, [])

    const getModules = async () => {
        const { data } = await restClient.post(APIS.MODULE_MANAGEMENT_MODULES, {})
        if (data.modules.length) {
            setModules(data.modules)
        }
    }

    const getCounts = async () => {
        const { data } = await restClient.post(APIS.DASHBOARD_COUNTS, {})
        if (data) {
            setDashboardCounts(data)
        }
    }

    const cardStyle = useMatches({ sm: 1, md: 4, lg: 3 })

    return (
        <div>
            <Container fluid className='border border-gray-300 border-opacity-30 rounded-md p-4'>
                <Title order={3}>Modules</Title>
                <Grid>
                    {modules.map((module: any) => (
                        <Grid.Col span={cardStyle} key={module.id}>
                            <DashboardCards data={module}></DashboardCards>
                        </Grid.Col>
                    ))}
                </Grid>
            </Container>
            <Container fluid className='border border-gray-300 border-opacity-30 rounded-md mt-4'>
                <Title order={3}>Counts</Title>
                <SimpleGrid cols={5} spacing="lg" breakpoints={[
                    { maxWidth: 'md', cols: 3, spacing: 'md' },
                    { maxWidth: 'sm', cols: 2, spacing: 'sm' },
                    { maxWidth: 'xs', cols: 1, spacing: 'sm' },
                ]}>
                    {dashboardCounts && Object.entries(dashboardCounts).map(([key, value]: [string, any]) => (
                        <Card
                            key={key}
                            shadow="sm"
                            padding="lg"
                            radius="md"
                            withBorder
                            onClick={() => {
                                const path = MODULES_MAPPING[key];
                                if (path && userData?.userType !== "STUDENT") {
                                    router.push(path);
                                }
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            <Text size="xl" fw={500}>{value.label}</Text>
                            <Text size="lg" mt="md">{value.count}</Text>
                        </Card>
                    ))}
                </SimpleGrid>
            </Container>
        </div>
    );
};

export default withAuth(Dashboard);