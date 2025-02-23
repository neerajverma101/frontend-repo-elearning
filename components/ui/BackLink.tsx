import { Anchor, Group } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

const BackLink: FC = () => {
    const router = useRouter();

    return (
        <Anchor onClick={() => router.back()} style={{ cursor: 'pointer' }}>
            <Group spacing="xs">
                <IconArrowLeft size={16} />
                <span>Back</span>
            </Group>
        </Anchor>
    );
};

export default BackLink;