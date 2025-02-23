'use client';
import restClient from '@/app/api/restClient';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { hideLoader, setScheduleOnlineClassModalState, showLoader } from '@/app/lib/slice';
import { APIS, SCHEMA_APIS } from '@/constant';
import { getThumbnail } from '@/constant/utils';
import { Button, Divider, Group, Modal, Paper, Stack, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import isObject from "lodash/isObject";
import mapValues from "lodash/mapValues";
import { useEffect, useState } from 'react';
import DynamicForm from '../common/DynamicForm/DynamicForm';

const ScheduleOnlineClass = () => {
    const store = useAppSelector(state => state.store)
    const dispatch = useAppDispatch()
    const close = () => {
        dispatch(setScheduleOnlineClassModalState({ show: false, data: null, cb: null }))
    }

    const [onlineClassSchema, setOnlineClassSchema] = useState([])

    useEffect(() => {
        getSchemaData()
    }, [])

    const getSchemaData = async () => {
        try {
            dispatch(showLoader())
            const { data } = await restClient.get(SCHEMA_APIS.ONLINE_CLASS)
            if (data) {
                setOnlineClassSchema(data)
            }
            dispatch(hideLoader())
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (values) => {
        const payload = mapValues(values, (value) => {
            if (isObject(value) && (value.id || value._id)) {
                return value.id || value._id;
            }
            return value;
        });

        payload.thumbnail = await getThumbnail(values.classId.className + " " + values.title)

        try {
            const apiUrl = APIS.CREATE_ONLINE_CLASS
            const { data } = await restClient.post(apiUrl, payload)
            if (data) {
                notifications.show({ title: 'Added online class' })
                dispatch(setScheduleOnlineClassModalState({ show: false, onlineClassData: null, callbackFunctionName: "getOnlineClasses" }))
            }
        } catch (error) {
            console.log(error)
            notifications.show({ title: 'Failed to create online class', color: 'red' })
        }
    }

    return (
        <div>
            <Modal size='lg' opened={Boolean(store.scheduleOnlineClassModalState.show)} onClose={close} title="Schedule Online class">
                <Paper radius="md" p="xl" withBorder >
                    <Text size="lg" fw={500}>
                        {store.scheduleOnlineClassModalState.onlineClassData ? "Edit Online class" : "Add Online Class"}
                    </Text>
                    <Divider label="" labelPosition="center" my="lg" />

                    <Stack>
                        <>
                            <DynamicForm
                                formData={onlineClassSchema}
                                formSubmit={handleSubmit}
                                formSubmitButtonJsx={
                                    <>
                                        <Group justify="space-between" mt="md">
                                            <Button type="submit" radius="xl">
                                                {store.scheduleOnlineClassModalState.onlineClassData ? "Edit" : "Add"}
                                            </Button>
                                        </Group>
                                    </>
                                }
                            // formValues={store.scheduleOnlineClassModalState.data}
                            // isEdit={store.scheduleOnlineClassModalState.data ? true : false}
                            />
                        </>
                    </Stack>
                </Paper>
            </Modal>
        </div>
    );
};

export default ScheduleOnlineClass;