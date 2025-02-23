'use client';

import { AspectRatio, Badge, Button, Card, Group, Image, Loader, Text } from '@mantine/core';
import Link from 'next/link';

interface RecordedLectureCardProps {
    data: {
        title: string;
        description: string;
        scheduledDate: string;
        startTime: string;
        endTime: string;
        class?: { className: string };
        teacher?: { firstName: string; lastName: string };
        urlDetails?: { url: string };
        status?: string;
        assets?: Array<{
            id: string;
            type: string;
            urlDetails?: { url: string };
        }>;
    };
    handleViewRecording: (data: RecordedLectureCardProps['data']) => void;
    showNoRecordingFound: boolean;
    apiCallInProgress: boolean;
}

const RecordedLectureCard: React.FC<RecordedLectureCardProps> = ({ data, handleViewRecording, showNoRecordingFound = false, apiCallInProgress = false, cardKey, apiCallInProgressKey }) => {
    // Format the date
    const formattedDate = new Date(data.scheduledDate).toLocaleDateString();

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder >
            <Card.Section>
                {
                    data.urlDetails?.url ?
                        <video src={data.urlDetails.url} controls height={"100%"} width={"100%"} autoPlay={false} controlsList="nodownload noremoteplayback" ></video>
                        :
                        <AspectRatio ratio={16 / 9}>
                            <Image
                                src={data.thumbnail}
                                height={160}
                                width={240}
                                alt={data.class?.className}
                            />
                        </AspectRatio>
                }
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{data.title}</Text>
                {data.status && <Badge color="pink">{data.status}</Badge>}
            </Group>

            <Text size="sm" c="dimmed">{data.description}</Text>

            <Text size="sm" mt="xs">
                <strong>Date:</strong> {formattedDate}
            </Text>
            <Text size="sm">
                <strong>Time:</strong> {data.startTime} - {data.endTime}
            </Text>
            {data.class && (
                <Text size="sm">
                    <strong>Class:</strong> {data.class.className}
                </Text>
            )}
            {data.teacher && (
                <Text size="sm">
                    <strong>Teacher:</strong> {data.teacher.firstName} {data.teacher.lastName}
                </Text>
            )}

            <Text size="sm" c="dimmed">
                {data.assets?.map((asset, index) => (
                    <div key={asset.id + "-" + index} className='assets' style={{
                        border: '1px solid red',
                        padding: '1rem 0px',
                        margin: '1rem 0px',
                    }}>
                        <Text style={{
                            wordBreak: "break-word",
                            fontWeight: "bold",
                        }}>
                            {asset.urlDetails?.url && (
                                <Link href={asset.urlDetails.url} target='_blank'>{asset.type}</Link>
                            )}
                        </Text>
                    </div>
                ))}
            </Text>

            <Button color="blue" fullWidth mt="md" radius="md" onClick={() => handleViewRecording(data, cardKey)} rightSection={apiCallInProgress && cardKey === apiCallInProgressKey ? <Loader size={"sm"} color='dark' /> : null}>
                View Recordings
            </Button>
            {showNoRecordingFound && cardKey === apiCallInProgressKey && <Text size='sm' fs={"italic"}>no recordings found</Text>}
        </Card>
    );
};

export default RecordedLectureCard;