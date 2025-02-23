import { useAppSelector } from '@/app/lib/hooks';
import { APIS } from '@/constant';
import { ActionIcon, Button, Card, Group, Stack, Text } from '@mantine/core';
import { IconClock, IconPencil, IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import Link from 'next/link';
import { formatDate } from "../../constant/utils";
import classes from './OnlineClassCard.module.css';

interface ScheduledClassCardPropsType {
    data: {
        _id: string;
        title: string;
        scheduledDate: string;
        startTime: string;
        endTime: string;
        description: string;
        hmsRoomInfo: {
            name: string;
            id: string;
        };
        class: {
            className: string;
        };
        teacher: {
            firstName: string;
            lastName: string;
        };
    };
    handleJoinLiveClass: (roomId: string) => void;
    roomsCodeData: any;
    handleDeleteLiveClass: (roomId: string) => void;
    handleEditLiveClass: (data: object) => void;
}

interface LiveClassFormData {
    [id: string]: {
        [key: string]: Date;
    };
}

interface AppState {
    store: {
        liveClassFormData: LiveClassFormData;
    };
}

export function ScheduledClassCard(props: ScheduledClassCardPropsType) {
    const { data, handleJoinLiveClass, roomsCodeData, handleDeleteLiveClass, handleEditLiveClass } = props;
    const store = useAppSelector((state: AppState) => state.store);

    dayjs.extend(utc);
    dayjs.extend(timezone);

    const getLiveClassFormData = (id = '', key = '') => {
        if (id && key) {
            return store.liveClassFormData?.[id]?.[key];
        }
    };

    const isClassActive = () => {
        const now = dayjs();
        const { scheduledDate, startTime, endTime } = data
        const classDate = dayjs(scheduledDate).format('YYYY-MM-DD');
        const startDateTime = dayjs(`${classDate}T${startTime}`, 'YYYY-MM-DDTHH:mm');
        const endDateTime = dayjs(`${classDate}T${endTime}`, 'YYYY-MM-DDTHH:mm');

        return now.isAfter(startDateTime) && now.isBefore(endDateTime);
    };

    return (
        <Card withBorder radius="md" p="md" className={classes.card}>
            <Card.Section className={classes.section} mt="md">
                <Group justify="apart">
                    <Text fz="lg" fw={500}>
                        {data.title}
                    </Text>
                    <Group>
                        <ActionIcon variant='white' size={'xs'} onClick={() => handleEditLiveClass(data)}>
                            <IconPencil />
                        </ActionIcon>
                        <ActionIcon variant='white' size={'xs'} onClick={() => handleDeleteLiveClass(data._id)}>
                            <IconTrash />
                        </ActionIcon>
                    </Group>
                </Group>
                <Text fz="sm" mt="xs">
                    {data.description}
                </Text>
            </Card.Section>

            <Card.Section className={classes.section}>
                <Stack spacing="xs">
                    <Text className={classes.label} c="dimmed">
                        Class: {data.class.className}
                    </Text>
                    <Text className={classes.label} c="dimmed">
                        Teacher: {`${data.teacher?.firstName || ''} ${data.teacher?.lastName || ''}`}
                    </Text>
                    <Group spacing="xs">
                        <IconClock size={14} />
                        <Text className={classes.label} c="dimmed">
                            {formatDate(data.scheduledDate, 'DD-MM-YYYY')} {data.startTime} - {data.endTime}
                        </Text>
                    </Group>
                    <Text className={classes.label} c="dimmed">
                        Room ID: {data.hmsRoomInfo.id}
                    </Text>
                    {roomsCodeData?.[0]?.code && (
                        <Text c="dimmed">
                            Link: <Link target='_blank' referrerPolicy='no-referrer' href={APIS.LIVE_CLASS.replace(":roomCode", roomsCodeData[0].code)}>{APIS.LIVE_CLASS.replace(":roomCode", roomsCodeData[0].code)}</Link>
                        </Text>
                    )}
                </Stack>
            </Card.Section>

            <Group mt="xs">
                {isClassActive() && (
                    <Button onClick={() => handleJoinLiveClass(data.hmsRoomInfo.id)}>
                        Join class
                    </Button>
                )}
            </Group>
        </Card>
    );
}