import restClient from '@/app/api/restClient';
import { useAppSelector } from '@/app/lib/hooks';
import { setAddClassModalState } from '@/app/lib/slice';
import { APIS } from '@/constant';
import { Button, Divider, Group, Modal, Paper, ScrollArea, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { upperFirst, useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const AddClassForm = (props) => {
    const form = useForm({
        initialValues: { className: '' }
    })
    const router = useRouter()
    const dispatch = useDispatch()
    const store = useAppSelector(state => state.store)
    const [, { close }] = useDisclosure(false);

    useEffect(() => {
        form.setValues({ className: store.addClassModalState.data?.className || '' })
    }, [store.addClassModalState.data]);

    return (
        <Modal opened={Boolean(store.addClassModalState.show)} onClose={() => { dispatch(setAddClassModalState({ show: false, data: null })); close() }} title={store.addClassModalState.data ? "Edit class" : "Add class"} >
            <Paper radius="md" p="xl" withBorder {...props}>
                <Text size="lg" fw={500}>
                    Welcome to eLearning
                </Text>
                <Divider label="" labelPosition="center" my="lg" />
                <ScrollArea style={{ height: "20vh", paddingRight: '1rem' }} offsetScrollbars>
                    <Stack>
                        <form onSubmit={form.onSubmit(async (values) => {
                            const { className } = values
                            try {
                                const { data } = await restClient({
                                    url: store.addClassModalState.data?._id ? `${APIS.CREATE_CLASS}/${store.addClassModalState.data._id}` : APIS.CREATE_CLASS,
                                    method: store.addClassModalState.data?._id ? 'PUT' : 'POST',
                                    data: { className }
                                })
                                const successMsg = store.addClassModalState.data?._id ? "Edited cLass" : 'Created class'
                                const failMsg = store.addClassModalState.data?._id ? 'Failed to edit class' : 'Failed to create class'
                                if (data) {
                                    dispatch(setAddClassModalState({ show: false }));
                                    notifications.show({ title: successMsg, color: 'green' })
                                    store.addClassModalState.cb && store.addClassModalState.cb()
                                } else {
                                    notifications.show({ title: failMsg, color: 'red' })
                                }
                            } catch (error) {
                                console.log(error)
                                notifications.show({ title: failMsg, color: 'red' })
                            }
                        })}>
                            <TextInput
                                required
                                label="Class Name"
                                radius="md"
                                {...form.getInputProps('className')}
                            />
                            <Group justify="space-between" mt="xl">
                                <Button type="submit" radius="xl">
                                    {upperFirst(store.addClassModalState.data ? 'Edit' : 'Add')}
                                </Button>
                            </Group>
                        </form>
                    </Stack>
                </ScrollArea>
            </Paper>
        </Modal >
    );
};

export default AddClassForm;