'use client';

import { useAppDispatch } from "@/app/lib/hooks";
import { ROUTES } from "@/constant";
import { Grid, useMatches } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getOnlineClassesApi, getRecordingsByRoomIdApi } from "../../app/api/common";
import RecordedLectureCard from "./RecordedLectureCard/RecordedLectureCard";

const RecordedLectures = (props) => {
    const { recordedAssets = [] } = props
    const [state, setState] = useState({ assets: [], rooms: [], recordings: [], showNoRecordingFound: false, apiCallInProgress: false })
    const dispatch = useAppDispatch()
    const router = useRouter()

    const updateState = (obj) => {
        setState(prevState => ({ ...prevState, ...obj }))
    }

    useEffect(() => {
        if (recordedAssets.length) {
            // setState(prevState => ({ ...prevState, assets: recordedAssets }))
        }
    }, [recordedAssets])


    useEffect(() => {
        getOnlineClasses()
    }, [])

    const getOnlineClasses = async () => {
        const data = await getOnlineClassesApi()
        if (data?.length) {
            setState(prevState => ({ ...prevState, rooms: data }))
        }
    }

    const handleViewRecording = async (data = { hmsRoomInfo: { id: '' }, }, apiCallInProgressKey = '') => {
        try {
            const { hmsRoomInfo } = data
            updateState({ apiCallInProgress: true, apiCallInProgressKey: apiCallInProgressKey })
            const recordings = await getRecordingsByRoomIdApi(hmsRoomInfo.id)
            updateState({ apiCallInProgress: false, })
            if (recordings.length) {
                router.push(ROUTES.RECORDED_CLASS_BY_ROOM_ID.replace(":roomId", hmsRoomInfo.id))
            } else {
                updateState({ showNoRecordingFound: true })
            }
        } catch (error) {
            console.log(error)
            updateState({ apiCallInProgress: false, })
        }
    }

    const cardStyle = useMatches({ sm: 1, md: 6, lg: 3 })

    return (
        <div>
            Recorded Classes
            {/* <div>
                <h1>Video on Demand</h1>
                <VODPlayerV2 url={"https://vod-in.100ms.live/66b2186633ce74ab9be938e8/66b2186633ce74ab9be938e9/66b71e309928c864eafbfcec/room-vod/20240817/66c048d24b92b6b97503e283/master.m3u8"} />
            </div> */}
            <Grid>
                {
                    state.rooms?.map(roomData => (
                        <Grid.Col key={roomData._id} span={cardStyle}>
                            <RecordedLectureCard
                                data={roomData}
                                handleViewRecording={handleViewRecording}
                                showNoRecordingFound={state.showNoRecordingFound}
                                apiCallInProgress={state.apiCallInProgress}
                                cardKey={roomData._id}
                                apiCallInProgressKey={state.apiCallInProgressKey}
                            />
                        </Grid.Col>
                    ))
                }
            </Grid>
        </div>
    );
};

export default RecordedLectures;