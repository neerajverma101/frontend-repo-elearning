'use client';
import restClient from "@/app/api/restClient";
import { setAddClassModalState } from "@/app/lib/slice";
import { APIS } from "@/constant";
import { getRandomMantineColor } from "@/constant/utils";
import { ActionIcon, Anchor, Avatar, Badge, Button, Card, Grid, Group, Paper, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TableWithSelection from '../TableWithSelection/TableWithSelection';

interface Teacher {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

interface Student {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

interface ClassObject {
    _id: string;
    className: string;
    teachers: Teacher[];
    students: Student[];
}

const Classes = () => {
    const [classes, setClasses] = useState<ClassObject[]>([]);
    const [selectedClass, setSelectedClass] = useState<ClassObject | null>(null);
    const router = useRouter();
    const { classId } = useParams();  // Get classId from the URL
    const dispatch = useDispatch();

    useEffect(() => {
        getClasses();
    }, []);

    useEffect(() => {
        if (classId) {
            const matchedClass = classes.find(c => c._id === classId);
            setSelectedClass(matchedClass || null);  // Automatically select class if classId is present
        }
    }, [classId, classes]);

    const getClasses = async () => {
        const { data } = await restClient.post<ClassObject[]>(APIS.FETCH_CLASS, classId ? { _id: classId } : {});
        if (data?.length) {
            setClasses(data);
        }
    };

    const colSpan = { base: 12, md: 6, lg: 3 }; // Adjust based on your grid requirements

    const teacherColumns = [
        {
            key: 'firstName', label: 'Name', render: (data = { firstName: '', lastName: '' }) => {
                const { firstName, lastName } = data;
                return <Group gap={"sm"}>
                    <Avatar size={"sm"} color={getRandomMantineColor()}>{firstName.charAt(0) + lastName.charAt(0)}</Avatar>
                    <Text size="sm" fw={500}>{data.firstName + " " + data.lastName}</Text>
                </Group>;
            }
        },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
    ];

    const studentColumns = [
        {
            key: 'firstName', label: 'Name', render: (data = { firstName: '', lastName: '' }) => {
                const { firstName, lastName } = data;
                return <Group gap={"sm"}>
                    <Avatar size={"sm"} color={getRandomMantineColor()}>{firstName.charAt(0) + lastName.charAt(0)}</Avatar>
                    <Text size="sm" fw={500}>{data.firstName + " " + data.lastName}</Text>
                </Group>;
            }
        },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
    ];

    return (
        <div>
            {!classId ? (
                <>
                    <div className="flex items-center mb-8">
                        <Text size="xl" fw={700} >Class List</Text>
                        <Anchor className="ml-4" onClick={() => dispatch(setAddClassModalState({ show: true, cb: getClasses() }))}>+Add Class</Anchor>
                    </div>
                    <Grid>
                        {classes.map((classObj, classObjIndex) => (
                            <Grid.Col span={colSpan} key={classObj._id + "-" + classObjIndex}>
                                <ClassCard
                                    data={classObj}
                                    handleViewDetails={() => router.push(`/dashboard/classes/${classObj._id}`)}
                                    handleEditClass={() => dispatch(setAddClassModalState({ show: true, data: classObj }))}
                                    handleDeleteClass={() => {
                                        modals.openConfirmModal({
                                            title: 'Delete Class',
                                            children: (<Text size="sm">Are you sure you want to delete this class?</Text>),
                                            labels: { confirm: 'Confirm', cancel: 'Cancel' },
                                            onConfirm: () => {
                                                restClient.delete(APIS.DELETE_CLASS.replace(':classId', classObj._id)).then(() => {
                                                    getClasses();
                                                });
                                            },
                                        })

                                    }}
                                />
                            </Grid.Col>
                        ))}
                    </Grid>
                </>
            ) : (
                selectedClass && (
                    <>
                        <Paper p="md" withBorder>
                            <Group >
                                {/* <Grid key={selectedClass._id} span={6}> */}
                                {/* <Stack spacing="xs"> */}
                                <Text>Class: </Text>
                                <Text fw={700} size="sm" c="dimmed">{selectedClass.className}</Text>
                                {/* <Text>{detail.value}</Text> */}
                                {/* </Stack> */}
                                {/* </Grid> */}
                            </Group>
                        </Paper>
                        {selectedClass.teachers?.length ? (
                            <>
                                <Text size="lg" fw={600} mt="xl" mb="md">
                                    {selectedClass.className} - Teachers
                                </Text>
                                <TableWithSelection
                                    rows={selectedClass.teachers}
                                    columns={teacherColumns}
                                    autoWidth={true}
                                    rowClick={(teacher) => router.push(`/dashboard/teachers/${teacher._id}`)}
                                />
                            </>
                        ) : null}

                        {selectedClass.students?.length ? (
                            <>
                                <Text size="lg" fw={600} mt="xl" mb="md">
                                    {selectedClass.className} - Students
                                </Text>
                                <TableWithSelection
                                    rows={selectedClass.students}
                                    columns={studentColumns}
                                    autoWidth={true}
                                    rowClick={(student) => router.push(`/dashboard/students/${student._id}`)}
                                />
                            </>
                        ) : null}
                    </>
                )
            )}
        </div>
    );
};

export default Classes;

interface ClassCardProps {
    data: ClassObject;
    handleViewDetails: (data: ClassObject) => void;
}

function ClassCard({ data, handleViewDetails, handleEditClass, handleDeleteClass }: ClassCardProps) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder >
            <Group justify="space-between">
                <Text fw={500}>{data.className}</Text>
                <Group>
                    <ActionIcon variant='white' size={'xs'} onClick={() => handleEditClass(data)}>
                        <IconPencil />
                    </ActionIcon>
                    <ActionIcon variant='white' size={'xs'} onClick={() => handleDeleteClass(data._id)}>
                        <IconTrash />
                    </ActionIcon>
                </Group>
            </Group>
            <Badge color="blue" variant="light">
                {data.teachers.length} Teachers
            </Badge>
            <Badge color="green" variant="light">
                {data.students.length} Students
            </Badge>
            <Button variant="outline" fullWidth mt="md" radius="md" onClick={() => handleViewDetails(data)}>
                View Details
            </Button>
        </Card>
    );
}
