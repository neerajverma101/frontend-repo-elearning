"use client"
import { getOnlineClassesApi } from '@/app/api/common';
import restClient from '@/app/api/restClient';
import { getRoomCodeByRoomIdAction } from '@/app/dashboard/online-classes/page';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { setRoomsCodeData, setScheduleOnlineClassModalState } from '@/app/lib/slice';
import withAuth from '@/app/lib/withAuth';
import { APIS } from '@/constant';
import { Button, Grid, Group, useMatches } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { ScheduledClassCard } from '../OnlineClassCard/OnlineClassCard';

const OnlineClasses = ({ rooms = { data: [] } }) => {
    const [roomsData, setRoomsData] = useState([])
    const store = useAppSelector(state => state.store);
    const dispatch = useAppDispatch()

    useEffect(() => {
        getOnlineClasses()
    }, [])

    useEffect(() => {
        if (store.scheduleOnlineClassModalState.callbackFunctionName) {
            const callbacks = {
                getOnlineClasses: getOnlineClasses
            }
            callbacks[store.scheduleOnlineClassModalState.callbackFunctionName] && callbacks[store.scheduleOnlineClassModalState.callbackFunctionName]()
        }
    }, [store.scheduleOnlineClassModalState])

    const getOnlineClasses = async () => {
        const data = await getOnlineClassesApi()
        if (data?.length) {
            setRoomsData(data)
        }
    }

    const cardStyle = useMatches({ sm: 1, md: 4, lg: 3 })

    const createRoomCodeByRoomId = async (roomId = '') => {
        if (roomId) {
            const data: {} = await getRoomCodeByRoomIdAction(roomId)
            return data
        }
    }

    const handleJoinLiveClass = async (roomId = '') => {
        if (roomId && store.userData.userType) {
            let roomCodeResponse = await createRoomCodeByRoomId(roomId)
            if (roomCodeResponse) {
                dispatch(setRoomsCodeData({ id: roomId, data: roomCodeResponse }))
                const { code = '' } = roomCodeResponse?.find((d = { role: '', code: '' }) => d.role === store.userData.userType.toLowerCase() || "viewer-near-realtime") || {}
                if (code) {
                    window.open(APIS.LIVE_CLASS.replace(":roomCode", code), '_blank', 'noopener noreferrer')
                }
            }
        }
    }

    const handleDeleteLiveClass = (roomId = '') => {
        restClient.delete(APIS.DELETE_ONLINE_CLASS_BY_ROOM_ID.replace(":roomId", roomId)).then(() => {
            getOnlineClasses()
            notifications.show({ title: 'Success', message: 'Online class deleted successfully', color: 'green' })
        }).catch(err => {
            console.log(err)
            notifications.show({ title: 'Error', message: 'Error deleting online class', color: 'red' })
        })
    }

    const handleEditLiveClass = (data: {}) => {
        dispatch(setScheduleOnlineClassModalState({ show: true, data, cb: getOnlineClasses() }))
    }

    return (
        <div>
            <Group mb={"md"}>
                <h1>Scheduled classes</h1>
                <Button size={"sm"} onClick={() => dispatch(setScheduleOnlineClassModalState({ show: true }))} >Schedule online class</Button>
            </Group>
            <Grid >
                {
                    roomsData?.map((liveClass: { id: string }, liveClassIndex: number) => (
                        <Grid.Col span={cardStyle} key={"card-" + liveClassIndex + "-" + liveClass.id} >
                            <ScheduledClassCard data={liveClass}
                                roomsCodeData={store.roomsCodeData[liveClass.id]}
                                handleJoinLiveClass={handleJoinLiveClass}
                                handleDeleteLiveClass={handleDeleteLiveClass}
                                handleEditLiveClass={handleEditLiveClass}
                            ></ScheduledClassCard>

                        </Grid.Col>
                    ))
                }

            </Grid>
        </div>
    );
};

export default withAuth(OnlineClasses);